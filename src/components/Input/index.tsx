import { HTMLProps } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '12px',
    border: '1px solid #E6EBEE',
    borderRadius: '4px',
    outline: 'none',
    background: 'white',
    color: 'black',
    transition: 'border-color 0.2s ease',
    ...theme.typography.body1,

    '&::placeholder': {
      color: '#717E96'
    },

    '&:hover': {
      borderColor: '#717E96'
    },

    '&:focus': {
      borderColor: '#0653C0'
    },
  }
}))

export const Input = ({ className, ...props}: HTMLProps<HTMLInputElement>) => {
  const classes = useStyles();

  return <input className={`${classes.input} ${className}`} {...props}/>
}
