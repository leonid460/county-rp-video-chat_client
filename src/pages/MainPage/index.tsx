import { MainLayout } from 'modules/MainLayout';
import { makeStyles } from '@material-ui/core/styles';
import { VideoPlayer } from 'components/VideoPlayer';
import {Typography} from "@material-ui/core";
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';
import { Colors, boxShadow } from 'constants/ui';

const useStyles = makeStyles({
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
    textAlign: 'center'
  },
  controlPanelUserInput: {
    marginBottom: '16px'
  }
});

export const MainPage = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <div className={classes.mainPageContainer }>
        <VideoPlayer className={classes.videoPlayer} />

        <div className={classes.controlPanelContainer}>
          <Typography className={classes.controlPanelTitle} variant="h3">Кому позвонить?</Typography>

          <Input className={classes.controlPanelUserInput} placeholder="Логин пользователя" />

          <PrimaryButton>Позвонить</PrimaryButton>
        </div>
      </div>
    </MainLayout>
  );
}