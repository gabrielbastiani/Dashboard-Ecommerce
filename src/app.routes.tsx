import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginAdmin from './pages/LoginAdmin';
import SignupAdmin from './pages/SignupAdmin';
import RecoveryPasswordAdmin from './pages/RecoveryPasswordAdmin';
import RecoverAdmin from './pages/RecoverAdmin';
import UserAuthenticatedAdmin from './pages/UserAuthenticatedAdmin';
import WhaitAuthenticatedEmployee from './pages/WhaitAuthenticatedEmployee';


const RaoutesApp: React.FC = () => {

    return (
        <Routes>      
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/signupAdmin" element={<SignupAdmin />} />
            <Route path="/recoveryPasswordAdmin" element={<RecoveryPasswordAdmin />} />
            <Route path="/recoverAdmin/:passwordRecoveryAdmin_id" element={<RecoverAdmin />} />
            <Route path="/authenticated/:authenticated" element={<UserAuthenticatedAdmin />} />
            <Route path="/whaitAuthenticatedEmployee" element={<WhaitAuthenticatedEmployee />} />
        </Routes>
    );
}

export default RaoutesApp;