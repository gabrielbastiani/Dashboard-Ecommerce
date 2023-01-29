import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme';
import { AuthProvider } from './contexts/authcontext';
import App from './App';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);