import { VidOn } from 'components/Icons/VidOn';
import { VidOff } from 'components/Icons/VidOff';
import { IControlToggleButtonProps } from './types';
import { useStyles } from './controlButtonStyles';

export const ToggleVideoButton = ({ value, onClick }: IControlToggleButtonProps) => {
  const classes = useStyles();

  return (
    <div onClick={onClick} className={classes.controlButtonContainer}>
      {value ? <VidOn /> : <VidOff />}
    </div>
  )
}
