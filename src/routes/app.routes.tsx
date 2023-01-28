import React from 'react';
import { Routes, Route } from "react-router-dom";

import LoginAdmin from '../pages/LoginAdmin';


const AppRoutes: React.FC = () => (

    <Routes>
        <Route path='/loginadmin' element={<LoginAdmin />} />
    </Routes>

);

export default AppRoutes;