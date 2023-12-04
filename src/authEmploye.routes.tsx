import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Perfil from './pages/Perfil';
import Avaliacoes from './pages/Avaliacoes';
import Avaliacao from './pages/Avaliacoes/Avaliacao';
import Newsletters from './pages/Newsletters';
import Newsletter from './pages/Newsletters/Newsletter';
import Contatos from './pages/Contatos';
import Contato from './pages/Contatos/Contato';
import Banners from './pages/Banners';
import TodasAvaliacoes from './pages/Avaliacoes/TodasAvaliacoes';
import NovoBanner from './pages/Banners/novoBanner';
import Banner from './pages/Banners/Banner';
import Contrapropostas from './pages/Clientes/Contrapropostas';
import Contraproposta from './pages/Clientes/Contrapropostas/contraproposta';
import Coupoms from './pages/Coupoms';
import Metricas from './pages/CarrinhoAbandonado/Metricas';
import MetricaDetalhes from './pages/CarrinhoAbandonado/Metricas/metricaDetalhes';
import DetalheCarrinhoAbandonado from './pages/CarrinhoAbandonado/Metricas/detalheCarrinhoAbandonado';
import Pedidos from './pages/Pedidos';
import Pedido from './pages/Pedidos/Pedido';


const RoutesEmployesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />

            <Route path='/pedidos' element={<Pedidos />} />
            <Route path='/pedido/:order_id' element={<Pedido />} />

            <Route path='/contrapropostas' element={<Contrapropostas />} />
            <Route path='/contraproposta/:counterproposal_id' element={<Contraproposta />} />

            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produto/avaliacoes/:slug/:product_id' element={<Avaliacoes />} />
            <Route path='/avaliacao/:slug/:avalietion_id' element={<Avaliacao />} />
            <Route path='/avaliacoes' element={<TodasAvaliacoes />} />

            <Route path='/coupoms' element={<Coupoms />} />

            <Route path='/carrinho/metricas' element={<Metricas />} />
            <Route path='/carrinho/metricas/:slug_day' element={<MetricaDetalhes />} />
            <Route path='/carrinho/metricas/detalhes/:abandonedCart_id' element={<DetalheCarrinhoAbandonado />} />

            <Route path='/banners' element={<Banners />} />
            <Route path='/banners/novo' element={<NovoBanner />} />
            <Route path='/banner/:banner_id' element={<Banner />} />

            <Route path='/newsletters' element={<Newsletters />} />
            <Route path='/newsletter/:newsletter_id' element={<Newsletter />} />

            <Route path='/contatos' element={<Contatos />} />
            <Route path='/contato/:contact_id' element={<Contato />} />

            <Route path='/perfil' element={<Perfil />} />
        </Routes>
    );
}

export default RoutesEmployesAuth;