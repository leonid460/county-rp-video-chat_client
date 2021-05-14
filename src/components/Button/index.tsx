import { ButtonHTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'constants/ui';

const useStyles = makeStyles((theme) => {
  const textColor = Colors.onPrimary;
  const backgroundColor = Colors.primary;
  const borderRadius = '4px';

  return {
    primary: {
      position: 'relative',
      padding: '10px 20px',
      border: 'none',
      outline: 'none',
      borderRadius,
      background: backgroundColor,
      color: textColor,
      fontSize: '13px',
      fontWeight: 500,
      textTransform: 'capitalize',
      cursor: 'pointer',
      ...theme.typography.button,

      '&:before': {
        position: 'absolute',
        content: `''`,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0,
        borderRadius,
        background: textColor,
        transition: 'opacity 0.2s ease'
      },

      '&:hover:before': {
        opacity: 0.15
      },

      '&:active:before': {
        opacity: 0.3,
      },

      '&:disabled': {
        cursor: 'not-allowed',

        '&:before': {
          opacity: 0.3,
          background: textColor
        }
      }
    }
  };
});

export const PrimaryButton = ({ className, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = useStyles();

  return <button className={`${classes.primary} ${className}`} {...props} />;
};
