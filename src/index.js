import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarMessage from './components/starMessage/starMessage';
import { theme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	  <ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	  </ThemeProvider>
	</React.StrictMode>
  );
