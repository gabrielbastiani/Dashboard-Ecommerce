import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Painel from './pages/Painel';
import Pedidos from './pages/Pedidos';


const RoutesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={ <Dashboard /> } />
            <Route path='/painel' element={ <Painel /> } />
            <Route path='/pedidos' element={ <Pedidos /> } />
        </Routes>
    );
}

export default RoutesAuth;