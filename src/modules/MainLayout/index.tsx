import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';

const useStyles = makeStyles((theme) => ({
  layoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  }
}))



export const MainLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <Header />
      {children}
    </div>
  )
}
