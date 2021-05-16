import { Stop } from 'components/Icons/Stop';
import { IControlButtonProps } from './types';
import { useStyles } from './controlButtonStyles';

export const StopCallButton = ({ onClick }: IControlButtonProps) => {
  const classes = useStyles();

  return (
    <div onClick={onClick} className={classes.controlButtonContainer}>
      <Stop />
    </div>
  )
}
