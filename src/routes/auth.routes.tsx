import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Dashboard from '../pages/Dashboard';


const AuthRoutes: React.FC = () => (

    <Routes>
        <Route path='/loginadmin' element={<Dashboard />} />
    </Routes>

);

export default AuthRoutes;