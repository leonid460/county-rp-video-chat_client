import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useVideoChatContext } from 'modules/Context';
import { Colors } from 'constants/ui';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '66px',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 16px',
    background: Colors.surface,

    [theme.breakpoints.up('md')]: {
      padding: '0 50px',
    },

    [theme.breakpoints.up('lg')]: {
      padding: '0 170px',
    }
  },

  headerTitle: {
    color: Colors.onSurface
  }
}));

export const Header = () => {
  const classes = useStyles();
  const { username } = useVideoChatContext();

  return (
    <div className={classes.headerContainer}>
      <Typography className={classes.headerTitle} variant="h1">
        County RP Video Chat
      </Typography>
      <Typography className={classes.headerTitle} variant="body1">
        {username}
      </Typography>
    </div>
  );
}
