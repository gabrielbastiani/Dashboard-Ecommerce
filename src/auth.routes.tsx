import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Painel from './pages/Painel';
import Pedidos from './pages/Pedidos';
import Clientes from './pages/Clientes';
import Categorias from './pages/Categorias';
import Produtos from './pages/Produtos';
import Configuracoes from './pages/Configuracoes';
import Perfil from './pages/Perfil';
import NovaCategoria from './pages/Categorias/novaCategoria';
import Categoria from './pages/Categorias/Categoria';


const RoutesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/painel' element={ <Painel /> } />
            <Route path='/pedidos' element={ <Pedidos /> } />
            <Route path='/clientes' element={ <Clientes /> } />
            <Route path='/painel' element={ <Painel /> } />

            <Route path='/categorias' element={ <Categorias /> } />
            <Route path='/categoria/nova' element={ <NovaCategoria /> } />
            <Route path='/categoria/:categoryName/:codigo/:category_id' element={ <Categoria /> } />

            <Route path='/produtos' element={ <Produtos /> } />
            <Route path='/configuracoes' element={ <Configuracoes /> } />
            <Route path='/perfil' element={ <Perfil /> } />
        </Routes>
    );
}

export default RoutesAuth;