import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import App from './app.routes';
import Auth from './auth.routes';

const Routes: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <BrowserRouter>
            { isAuthenticated ? <App/> : <Auth /> }
        </BrowserRouter>
    );
}

export default Routes;