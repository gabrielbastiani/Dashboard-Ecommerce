import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, useTheme } from './contexts/theme';
import { AuthProvider } from './contexts/AuthContext';

import App from './App';

const {theme} = useTheme();

ReactDOM.render(
  <React.StrictMode>    
    <ThemeProvider toggleTheme={function (): void {
      throw new Error('Function not implemented.');
    } } theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);