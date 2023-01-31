import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import Dashboard from './pages/Dashboard';
import LoginAdmin from './pages/LoginAdmin';

const Mainroutes: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            {isAuthenticated ?

                <Route path="/" element={<Dashboard />} />

                :

                <Route path="/loginAdmin" element={<LoginAdmin />} />

            }
        </Routes>
    );
}

export default Mainroutes;