import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginAdmin from './pages/LoginAdmin';
import SignupAdmin from './pages/SignupAdmin';
import RecoveryPassword from './pages/RecoveryPassword';
import Recover from './pages/Recover';
import UserAuthenticatedAdmin from './pages/UserAuthenticatedAdmin';
import WhaitAuthenticatedAdmin from './pages/WhaitAuthenticatedAdmin';


const RaoutesApp: React.FC = () => {

    return (
        <Routes>      
            <Route path="/" element={<LoginAdmin />} />
            <Route path="/signupAdmin" element={<SignupAdmin />} />
            <Route path="/recoveryPassword" element={<RecoveryPassword />} />
            <Route path="/recover/:recovery_id" element={<Recover />} />
            <Route path="/authenticated/:authenticated" element={<UserAuthenticatedAdmin />} />
            <Route path="/whaitAuthenticatedAdmin" element={<WhaitAuthenticatedAdmin />} />
        </Routes>
    );
}

export default RaoutesApp;