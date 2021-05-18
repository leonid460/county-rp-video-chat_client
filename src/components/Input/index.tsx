import { HTMLProps } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'constants/ui';

interface IInputProps extends HTMLProps<HTMLInputElement> {
  isInvalid?: boolean;
}

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '12px',
    border: ({ isInvalid }: { isInvalid?: boolean }) => `1px solid ${isInvalid ? Colors.error : Colors.border}`,
    borderRadius: '4px',
    outline: 'none',
    overflow: 'hidden',
    background: Colors.surface,
    color: 'black',
    transition: 'border-color 0.2s ease',
    ...theme.typography.body1,

    '&::placeholder': {
      color: Colors.secondary
    },

    '&:hover': {
      borderColor: Colors.secondary
    },

    '&:focus': {
      borderColor: Colors.primary
    },

    '&:disabled': {
      opacity: 0.5
    }
  }
}))

export const Input = ({ className, isInvalid, ...props}: IInputProps) => {
  const classes = useStyles({ isInvalid });

  return <input className={`${classes.input} ${className}`} {...props}/>
}
