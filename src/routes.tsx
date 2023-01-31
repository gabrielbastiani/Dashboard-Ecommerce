import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Dashboard from './pages/Dashboard';
import LoginAdmin from './pages/LoginAdmin';

const Mainroutes: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/loginAdmin" /> } />;
            <Route path="/loginAdmin" element={<LoginAdmin />} />;
        </Routes>
    );
}

export default Mainroutes;