import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginAdmin from './pages/LoginAdmin';
import SignupAdmin from './pages/SignupAdmin';
import RecoveryPassword from './pages/RecoveryPassword';

const RaoutesApp: React.FC = () => {

    return (
        <Routes>      
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/signupAdmin" element={<SignupAdmin />} />
            <Route path="/recoveryPassword" element={<RecoveryPassword />} />
        </Routes>
    );
}

export default RaoutesApp;