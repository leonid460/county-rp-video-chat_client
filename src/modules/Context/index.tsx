import { createContext, useState, useEffect, useContext, useRef, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';
import { CallNotification } from 'modules/CallNotification';
import { Url } from 'constants/socket';

interface IVideoChatContext {
  username: string;
  setUsername: (value: string) => void;
  receiverName: string;
  setReceiverName: (value: string) => void;
  callUser: (username: string) => void;
  answerCall: () => void;
  callAccepted: boolean;
  userStream: MediaStream | null;
  personToCallStream: MediaStream | null;
  call: {isReceivingCall: boolean, from: string, signal: string};
  messages: { sender: string, text: string }[];
  sendMessage: (message: string) => void;
  declineCall: () => void;
  leaveCall: () => void;
  availableUsers: string[];
}

const VideoChatContext = createContext<IVideoChatContext | null>(null);

let socket: Socket | null = null;

export const VideoChatContextProvider: FC = ({ children }) => {
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const [personToCallStream, setPersonToCallStream] = useState<MediaStream | null>(null);
  const [username, setUsername] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [call, setCall] = useState({ isReceivingCall: false, from: '', signal: '' });
  const [callAccepted, setCallAccepted] = useState(false);
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [availableUsers, setAvailableUsers] = useState<string[]>([]);
  const history = useHistory();

  const connectionRef = useRef<Peer.Instance | null>(null);

  const connectToSocket = (username: string) => {
    socket = io(Url);
    socket.emit('setUsername', { username });

    socket!.on('callUser', ({ callerUsername, signal }) => {
      setCall({ isReceivingCall: true, from: callerUsername, signal });
      setReceiverName(callerUsername);
    });

    socket.on('userConnect', ({ currentUsers }) => {
      setAvailableUsers(currentUsers.filter((user: string) => user !== username));
    });

    socket.on('userDisconnect', ({ currentUsers }) => {
      setAvailableUsers(currentUsers.filter((user: string) => user !== username));
    });
  }

  const disconnectFromSocket = () => {
    socket?.disconnect();
  }

  const callUser = (userToCall: string) => {
    if (!(userStream && socket)) {
      return;
    }

    connectionRef.current = new Peer({ initiator: true, trickle: false, objectMode: true, stream: userStream });

    connectionRef.current.on('signal', (data) => {
      socket?.emit('callUser', { userToCall, signalData: data, callerUsername: username });
    });

    connectionRef.current.on('data', data => {
      const messageText = data.toString();

      setMessages(messagesList => {
        console.log({ messages, messageText });

        return [...messagesList, { sender: userToCall, text: messageText }]
      })
    });

    connectionRef.current.on('stream', (currentStream) => {
      setPersonToCallStream(currentStream);
      history.push('/call');
    });

    connectionRef.current.on('close', () => {
      console.log('CLOSE');
      closeCall();
    })

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setReceiverName(userToCall);

      connectionRef.current?.signal(signal);
    });
  };

  const answerCall = () => {
    if (!(userStream && socket)){
      return;
    }

    setCallAccepted(true);

    connectionRef.current = new Peer({ initiator: false, trickle: false, stream: userStream });

    connectionRef.current.on('signal', (data) => {
      socket?.emit('answerCall', { signal: data, to: call.from });
    });

    connectionRef.current.on('data', (data: string) => setMessages(state => {
      return [...state, { sender: call.from, text: data.toString() }]
    }));

    connectionRef.current.on('stream', (currentStream) => {
      setPersonToCallStream(currentStream);
      history.push('/call');
    });

    connectionRef.current.on('close', () => {
      console.log('CLOSE');
      closeCall();
    })

    console.log(call.signal);
    connectionRef.current.signal(call.signal);
  };

  const sendMessage = (text: string) => {
    if (connectionRef.current) {
      setMessages([...messages, { sender: username, text }])
      connectionRef.current.send(text);
    }
  };

  const closeCall = () => {
    setCall({ isReceivingCall: false, from: '', signal: '' });
    setReceiverName('');
    connectionRef.current?.destroy();
    connectionRef.current = null;
    setCallAccepted(false);
    setPersonToCallStream(null);
    disconnectFromSocket();
    connectToSocket(username);
    history.push('/');
  }

  const leaveCall = () => {
    connectionRef.current?.emit('close');
  }

  useEffect(() => {
    if (!username) {
      return;
    }

    if (!navigator) {
      return;
    }

    let newStream: MediaStream | null = null;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setUserStream(stream);
        newStream = stream;

        const audioTracks = newStream?.getAudioTracks();

        console.log(audioTracks);

        const ctx = new AudioContext();
        const audio = new Audio();
        audio.srcObject = stream;
        const gainNode = ctx.createGain();
        gainNode.gain.value = .5;

        audio.onloadedmetadata = function() {
          const source = ctx.createMediaStreamSource(stream);
          audio.play();
          audio.muted = true;
          source.connect(gainNode);
          gainNode.connect(ctx.destination);
        }
      });


    return () => {
      const audioTracks = newStream?.getAudioTracks();
      const videoTracks = newStream?.getVideoTracks();

      audioTracks?.forEach(track => track.stop());
      videoTracks?.forEach(track => track.stop());
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      connectToSocket(username);
    }
  }, [username]);

  return (
    <VideoChatContext.Provider
      value={{
        username,
        setUsername,
        receiverName,
        setReceiverName,
        callAccepted,
        callUser,
        answerCall,
        userStream,
        personToCallStream,
        call,
        messages,
        sendMessage,
        declineCall: closeCall,
        leaveCall,
        availableUsers
      }}
    >
      <CallNotification />
      {children}
    </VideoChatContext.Provider>
  )
}

export function useVideoChatContext() {
  const contextValue = useContext(VideoChatContext);

  if (!contextValue) {
    throw new Error('useVideoChatContext must be used within VideoChatContextProvider');
  }

  return contextValue;
}
