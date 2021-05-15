import { HTMLProps } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'constants/ui';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '12px',
    border: `1px solid ${Colors.border}`,
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

export const Input = ({ className, ...props}: HTMLProps<HTMLInputElement>) => {
  const classes = useStyles();

  return <input className={`${classes.input} ${className}`} {...props}/>
}
