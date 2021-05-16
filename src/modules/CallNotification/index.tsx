import { makeStyles } from '@material-ui/core/styles';
import { Colors, boxShadow } from 'constants/ui';
import { PrimaryButton, SecondaryButton  } from 'components/Button';
import { useVideoChatContext } from 'modules/Context';

const useStyles = makeStyles((theme) => {
  const width = '300px';

  return {
    notificationContainer: {
      position: 'fixed',
      top: `calc(100vh / 2)`,
      left: `calc((100vw - ${width}) / 2)`,
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      width,
      boxSizing: 'border-box',
      padding: '16px',
      border: `4px solid ${Colors.border}`,
      borderRadius: '4px',
      background: Colors.surface,
      transform: 'translateY(-50%)',
      boxShadow
    },
    callerName: {
      marginBottom: '16px',
      textAlign: 'center',
      color: Colors.onSurface,
      ...theme.typography.h1
    },
    primaryButtonWithMargin: {

    }
  };
});

export const CallNotification = () => {
  const classes = useStyles();
  const { call, answerCall, callAccepted, declineCall } = useVideoChatContext();

  if (!call.isReceivingCall || callAccepted) {
    return null;
  }

  return (
    <div className={classes.notificationContainer}>
      <div className={classes.callerName}>
        {call.from}
      </div>
      <PrimaryButton onClick={answerCall}>Ответить</PrimaryButton>
      <SecondaryButton onClick={declineCall}>Отменить</SecondaryButton>
    </div>
  );
};
