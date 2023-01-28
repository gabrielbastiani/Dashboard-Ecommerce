import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, useTheme } from './contexts/theme';
import { AuthProvider } from './contexts/AuthContext';

import App from './App';
// eslint-disable-next-line react-hooks/rules-of-hooks
/* const { theme } = useTheme(); */

ReactDOM.render(
  <BrowserRouter>
   {/*  <ThemeProvider toggleTheme={function (): void {
      throw new Error('Function not implemented.');
    }} theme={theme}> */}
      <AuthProvider>
        <App />
      </AuthProvider>
    {/* </ThemeProvider> */}
  </BrowserRouter>,
  document.getElementById('root')
);