import { useVideoChatContext } from 'modules/Context';
import { makeStyles } from '@material-ui/core/styles';
import { boxShadow, Colors } from 'constants/ui';
import { ToggleMicButton } from './ToggleMicButton';
import { ToggleVideoButton } from './ToggleVideoButton';
import { StopCallButton } from './StopCallButton';
import {useEffect, useState} from "react";

const useStyles = makeStyles({
  controlPanelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumn: '1 / span 3',
    gridRow: '3 / span 1',
    borderRadius: '4px',
    background: Colors.secondary,
    boxShadow
  }
});

export const CallControlPanel = () => {
  const classes = useStyles();
  const { userStream, leaveCall } = useVideoChatContext();
  const [isMicActive, setIsMicActive] = useState(true);
  const [isVidActive, setIsVidActive] = useState(true);

  const toggleMic = () => setIsMicActive(state => !state);

  const toggleVid = () => setIsVidActive(state => !state);

  useEffect(() => {
    const track = userStream?.getVideoTracks()[0];

    if (track) {
      track.enabled = isVidActive;
    }
  }, [isVidActive]);

  useEffect(() => {
    const track = userStream?.getAudioTracks()[0];

    if (track) {
      track.enabled = isMicActive;
    }
  }, [isMicActive]);

  return (
    <div className={classes.controlPanelContainer}>
      <StopCallButton onClick={leaveCall} />
      <ToggleMicButton value={isMicActive} onClick={toggleMic} />
      <ToggleVideoButton value={isVidActive} onClick={toggleVid} />
    </div>
  );
};
