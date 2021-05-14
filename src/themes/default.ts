import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: '20px',
  lineHeight: '23px',
  fontStyle: 'normal',
  fontWeight: 700,

  [theme.breakpoints.up('md')]: {
    fontSize: '24px',
    lineHeight: '28px'
  }
}

theme.typography.h2 = {
  fontSize: '18px',
  lineHeight: '21px',
  fontStyle: 'normal',
  fontWeight: 400,
}

theme.typography.h3 = {
  fontSize: '16px',
  lineHeight: '19px',
  fontStyle: 'normal',
  fontWeight: 700,
}

theme.typography.body1 = {
  fontSize: '14px',
  lineHeight: '16px',
  fontStyle: 'normal',
  fontWeight: 400,

  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
    lineHeight: '18px',
  }
}

theme.typography.body2 = {
  fontSize: '10px',
  lineHeight: '12px',
  fontStyle: 'normal',
  fontWeight: 400,

  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
    lineHeight: '15px',
  }
}

theme.typography.button = {
  fontSize: '13px',
  lineHeight: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
}

export const defaultTheme: Theme = { ...theme }
