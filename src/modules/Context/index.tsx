/* eslint-disable */
import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

interface ISocketContextValue {
  call: {isReceivingCall: boolean, from: string, name: string, signal: string};
  callAccepted: boolean
  myVideo: React.MutableRefObject<HTMLVideoElement | null>;
  userVideo: React.MutableRefObject<HTMLVideoElement | null>;
  stream?: MediaStream;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
  sendMessage: (text: string) => void;
  messages: {sender: string, text: string}[]
}

const SocketContext = createContext<ISocketContextValue | null>(null);

const socket = io('http://localhost:5000');

export const ContextProvider: React.FC = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState('');
  const [call, setCall] = useState({ isReceivingCall: false, from: '', name: '', signal: '' });
  const [me, setMe] = useState('');
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([])

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance>();

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('data', (data: string) => setMessages([...messages, { sender: "Other", text: data.toString() }]))

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, objectMode: true, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('data', data => setMessages([...messages, { sender: "Other", text: data.toString() }]))

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const sendMessage = (text: string) => {
    if (connectionRef.current) {
      connectionRef.current.send(text)
    }
  }

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    window.location.reload();
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      sendMessage,
      messages
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export function useSocketContext() {
  const contextValue = useContext(SocketContext);

  if (!contextValue) {
    throw new Error('useSocketContext must be used within ContextProvider');
  }

  return contextValue;
}
