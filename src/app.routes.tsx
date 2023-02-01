import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginAdmin from './pages/LoginAdmin';

const RaoutesApp: React.FC = () => {

    return (
        <Routes>      
            <Route path="/loginAdmin" element={<LoginAdmin />} />
        </Routes>
    );
}

export default RaoutesApp;