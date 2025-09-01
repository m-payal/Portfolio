// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#14b8a6' }, // teal
    secondary: { main: '#7dd3fc' }, // sky
    background: {
      default: '#0a2240',           // dark blue
      paper:   '#0f1f3a',           // surface
    },
    text: {
      primary:   '#e6f0ff',
      secondary: '#c9d8f4',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 12 },
      },
    },
  },
});
