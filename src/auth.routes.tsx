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
import NovoProduto from './pages/Produtos/novoProduto';
import Produto from './pages/Produtos/Produto';
import Avaliacoes from './pages/Avaliacoes';
import Avaliacao from './pages/Avaliacoes/Avaliacao';
import Cliente from './pages/Clientes/Cliente';
import Pedido from './pages/Pedidos/Pedido';
import BannerHome from './pages/Banners/BannerHome';
import NovoBannerHome from './pages/Banners/BannerHome/NovoBannerHome';
import EditarBannerHome from './pages/Banners/BannerHome/EditarBannerHome';
import BannerInPage from './pages/Banners/BannerInPage';
import NovoBannerInPage from './pages/Banners/BannerInPage/NovoBannerInPage';
import EditarBannerInPage from './pages/Banners/BannerInPage/EditarBannerInPage';
import BannerMosaico from './pages/Banners/BannerMosaico';
import NovoBannerMosaico from './pages/Banners/BannerMosaico/NovoBannerMosaico';
import EditarBannerMosaico from './pages/Banners/BannerMosaico/EditarBannerMosaico';
import Newsletters from './pages/Newsletters';
import Newsletter from './pages/Newsletters/Newsletter';
import Contatos from './pages/Contatos';
import Contato from './pages/Contatos/Contato';
import Rede from './pages/Configuracoes/Rede';


const RoutesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/painel' element={<Painel />} />
            <Route path='/painel' element={<Painel />} />


            <Route path='/pedidos' element={<Pedidos />} />
            <Route path='/pedido/:pedido_id' element={<Pedido />} />

            <Route path='/clientes' element={<Clientes />} />
            <Route path='/cliente/:nameComplete/:user_id' element={<Cliente />} />

            <Route path='/categorias' element={<Categorias />} />
            <Route path='/categoria/nova' element={<NovaCategoria />} />
            <Route path='/categoria/:categoryName/:codigo/:category_id' element={<Categoria />} />

            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produto/novo' element={<NovoProduto />} />
            <Route path='/produto/:nameProduct/:product_id' element={<Produto />} />

            <Route path='/produto/avaliacoes/:nameProduct/:product_id' element={<Avaliacoes />} />
            <Route path='/avaliacao/:nameProduct/:avaliacao_id' element={<Avaliacao />} />

            <Route path='/banners/bannerHome' element={<BannerHome />} />
            <Route path='/banners/bannerHome/novo' element={<NovoBannerHome />} />
            <Route path='/banners/editarBannerHome/:bannerHome_id' element={<EditarBannerHome />} />
            <Route path='/banners/bannerInPage' element={<BannerInPage />} />
            <Route path='/banners/bannerInPage/novo' element={<NovoBannerInPage />} />
            <Route path='/banners/editarBannerInPage/:bannerInPage_id' element={<EditarBannerInPage />} />
            <Route path='/banners/bannerMosaico' element={<BannerMosaico />} />
            <Route path='/banners/bannerMosaico/novo' element={<NovoBannerMosaico />} />
            <Route path='/banners/editarBannerMosaico/:bannerMosaico_id' element={<EditarBannerMosaico />} />

            <Route path='/newsletters' element={<Newsletters />} />
            <Route path='/newsletter/:newsletter_id' element={<Newsletter />} />

            <Route path='/contatos' element={<Contatos />} />
            <Route path='/contato/:contato_id' element={<Contato />} />

            <Route path='/configuracoes' element={<Configuracoes />} />
            <Route path='/rede/:redesocial_id' element={<Rede />} />

            <Route path='/perfil' element={<Perfil />} />
        </Routes>
    );
}

export default RoutesAuth;