import { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from 'modules/MainLayout';
import { Messenger } from 'modules/ChatPage/Messenger';
import { useVideoChatContext } from 'modules/Context';
import { CallControlPanel } from 'modules/ChatPage/CallControlPanel';
import { VideoPlayer } from 'components/VideoPlayer';
import { Colors, boxShadow } from 'constants/ui';

const useStyles = makeStyles((theme) => ({
  callPageContainer: {
    display: 'grid',
    gridTemplateColumns: '268px repeat(3, calc((100% - 268px - 20px * 3) / 3))',
    gridTemplateRows: '196px calc(100% - 20px * 2 - 196px - 77px) 77px',
    columnGap: '20px',
    rowGap: '20px',
    width: '100%',
    height: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  userPlayer: {
    gridColumn: '1 / span 1',
    gridRow: '1 / span 1',
    width: 'unset',
    height: 'unset',
    boxSizing: 'border-box',
  },
  companionPlayer: {
    gridColumn: '1 / span 3',
    gridRow: '2 / span 1',
    width: 'unset',
    height: 'unset',
    boxSizing: 'border-box',
  },
  controlPanelContainer: {
    gridColumn: '1 / span 3',
    gridRow: '3 / span 1',
    borderRadius: '4px',
    background: Colors.secondary,
    boxShadow
  }
}))

export const CallPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const personToCallVideoRef = useRef<HTMLVideoElement | null>(null);
  const { userStream, personToCallStream } = useVideoChatContext();

  const classes = useStyles();

  useEffect(() => {
    if (videoRef.current) {
      console.log('user stream connected');
      console.log(userStream);
      videoRef.current.srcObject = userStream;
    }
  }, [userStream]);

  useEffect(() => {
    if (personToCallVideoRef.current) {
      console.log('person to call stream connected');
      console.log(personToCallStream);
      personToCallVideoRef.current.srcObject = personToCallStream;

      if (personToCallStream) {
        const ctx = new AudioContext();
        const audio = new Audio();
        audio.srcObject = personToCallStream;
        const gainNode = ctx.createGain();
        gainNode.gain.value = .5;

        audio.onloadedmetadata = function() {
          const source = ctx.createMediaStreamSource(personToCallStream);
          audio.play();
          audio.muted = true;
          source.connect(gainNode);
          gainNode.connect(ctx.destination);
        }
      }
    }
  }, [personToCallStream]);

  return (
    <MainLayout>
      <div className={classes.callPageContainer}>
        <VideoPlayer className={classes.userPlayer} video={videoRef} />
        <VideoPlayer className={classes.companionPlayer} video={personToCallVideoRef} />
        <Messenger />
        <CallControlPanel />
      </div>
    </MainLayout>
  );
}
