import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  controlButtonContainer: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: '20px',

    '&:last-child': {
      marginRight: '0',
    }
  }
})
