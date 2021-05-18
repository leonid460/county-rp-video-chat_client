import {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { MainLayout } from 'modules/MainLayout';
import { useVideoChatContext } from 'modules/Context';
import { VideoPlayer } from 'components/VideoPlayer';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';
import { Colors, boxShadow } from 'constants/ui';

const useStyles = makeStyles((theme) => ({
  mainPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayer: {
    width: '476px',
    height: '331px',
    marginBottom: '20px'
  },
  controlPanelContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '476px',
    padding: '16px',
    borderRadius: '4px',
    boxSizing: 'border-box',
    background: Colors.surface,
    boxShadow,
  },
  controlPanelTitle: {
    margin: 0,
    marginBottom: '32px',
    ...theme.typography.h3,
    textAlign: 'center',
  },
  controlPanelUserInput: {
    marginBottom: '16px'
  },
  select: {
    marginBottom: '16px'
  },
  controlPanelText: {
    marginBottom: '16px',
    ...theme.typography.body1,
    fontWeight: 'bold',
    textAlign: 'center',
  }
}));

export const MainPage = () => {
  const [userToCall, setUserToCall] = useState('');
  const { userStream, setReceiverName, callUser, availableUsers, username } = useVideoChatContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selectedUser, setSelectedUser] = useState('');

  const classes = useStyles();

  const handleCall = () => {
    setReceiverName(userToCall);
    callUser(userToCall);
  };

  const handleSelect = (value: string) => {
    console.log(value);
    setSelectedUser(value);
    setUserToCall(value);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = userStream;
    }
  }, [userStream]);

  return (
    <MainLayout>
      <div className={classes.mainPageContainer }>
        <VideoPlayer className={classes.videoPlayer} video={videoRef} />

        <div className={classes.controlPanelContainer}>
          <Typography className={classes.controlPanelTitle} variant="h3">Кому позвонить?</Typography>

          <Input
            className={classes.controlPanelUserInput}
            placeholder="Логин пользователя"
            value={userToCall}
            onChange={event => setUserToCall(event.currentTarget.value)}
          />

          <span className={classes.controlPanelText}>или</span>

          <select
            className={classes.select}
            onChange={event => handleSelect(event.currentTarget.value)}
            value={selectedUser}
          >
            <option value={''}>-</option>
            {availableUsers.map(username => (
              <option value={username} key={username}>
                {username}
              </option>
            ))}
          </select>

          <PrimaryButton onClick={handleCall} disabled={username === userToCall}>
            Позвонить
          </PrimaryButton>
        </div>
      </div>
    </MainLayout>
  );
}
