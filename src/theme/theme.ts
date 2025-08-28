import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "'Get Schwifty', sans-serif"
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#171717',
      paper: '#171717'
    },
    text: {
      primary: '#ffffff'
    }
  }
});
