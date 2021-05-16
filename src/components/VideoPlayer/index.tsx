import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Colors, boxShadow } from 'constants/ui';
import { IVideoPlayerProps } from './types';

const useStyles = makeStyles((theme) => ({
  videoPlayerContainer: {
    height: '331px',
    width: '476px',
    padding: '16px',
    borderRadius: '4px',
    boxSizing: 'border-box',
    background: Colors.surface,
    boxShadow
  },
  video: {
    height: '100%',
    width: '100%',
    borderRadius: '4px',
    background: 'black',
    transform: 'scaleX(-1)'
  }
}));

export const VideoPlayer = ({ className, video }: IVideoPlayerProps) => {
  const classes = useStyles();

  return (
    <div className={`${classes.videoPlayerContainer} ${className}`}>
      <video playsInline muted ref={video} autoPlay className={classes.video} />
    </div>
  );
}
