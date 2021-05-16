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
  const history = useHistory();

  const connectionRef = useRef<Peer.Instance | null>(null);

  const callUser = (userToCall: string) => {
    if (!(userStream && socket)) {
      return;
    }

    const peer = new Peer({ initiator: true, trickle: false, objectMode: true, stream: userStream });

    connectionRef.current = peer;

    peer.on('signal', (data) => {
      socket?.emit('callUser', { userToCall, signalData: data, callerUsername: username });
    });

    peer.on('data', data => {
      const messageText = data.toString();

      setMessages(messagesList => {
        console.log({ messages, messageText });

        return [...messagesList, { sender: userToCall, text: messageText }]
      })
    });

    peer.on('stream', (currentStream) => {
      setPersonToCallStream(currentStream);
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      history.push('/call');
      setReceiverName(userToCall);

      connectionRef.current?.signal(signal);
    });
  };

  const answerCall = () => {
    if (!(userStream && socket)){
      return;
    }

    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream: userStream });

    peer.on('signal', (data) => {
      socket?.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('data', (data: string) => setMessages(state => {
      return [...state, { sender: call.from, text: data.toString() }]
    }));

    peer.on('stream', (currentStream) => {
      console.log('stream');
      console.log({ currentStream });
      setPersonToCallStream(currentStream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    history.push('/call');
  };

  const sendMessage = (text: string) => {
    if (connectionRef.current) {
      setMessages([...messages, { sender: username, text }])
      connectionRef.current.send(text);
    }
  };

  const declineCall = () => {
    setCall({ isReceivingCall: false, from: '', signal: '' });
    setReceiverName('');
  };

  const leaveCall = () => {
    declineCall();
    connectionRef.current?.destroy();
    setCallAccepted(false);
    setPersonToCallStream(null);
    history.push('/');
  }

  useEffect(() => {
    let newStream: MediaStream | null = null;

    if (!navigator) {
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setUserStream(stream);
        newStream = stream;
      });

    return () => {
      const audioTracks = newStream?.getAudioTracks();
      const videoTracks = newStream?.getVideoTracks();

      audioTracks?.forEach(track => track.stop());
      videoTracks?.forEach(track => track.stop());
    }
  }, []);

  useEffect(() => {
    if (username) {
      socket = io(Url);
      socket.emit('setUsername', { username });

      socket.on('callUser', ({ callerUsername, signal }) => {
        setCall({ isReceivingCall: true, from: callerUsername, signal });
        setReceiverName(callerUsername);
      });
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
        declineCall,
        leaveCall,
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
