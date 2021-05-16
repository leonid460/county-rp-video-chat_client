import { MicOff } from 'components/Icons/MicOff';
import { MicOn } from 'components/Icons/MicOn';
import { IControlToggleButtonProps } from './types';
import { useStyles } from './controlButtonStyles';

export const ToggleMicButton = ({ value, onClick }: IControlToggleButtonProps) => {
  const classes = useStyles();

  console.log({ value });

  return (
    <div onClick={onClick} className={classes.controlButtonContainer}>
      {value ? <MicOn/> : <MicOff />}
    </div>
  )
}
