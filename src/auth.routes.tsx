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
import ProdutoCategoria from './pages/Produtos/ProdutoCategoria';
import Produto from './pages/Produtos/Produto';
import Avaliacoes from './pages/Avaliacoes';
import Avaliacao from './pages/Avaliacoes/Avaliacao';
import Cliente from './pages/Clientes/Cliente';
import Pedido from './pages/Pedidos/Pedido';
import Newsletters from './pages/Newsletters';
import Newsletter from './pages/Newsletters/Newsletter';
import Contatos from './pages/Contatos';
import Contato from './pages/Contatos/Contato';
import Rede from './pages/Configuracoes/Rede';
import TextosInstitucionais from './pages/Configuracoes/TextosInstitucionais';
import Banners from './pages/Banners';
import NovoTexto from './pages/Configuracoes/TextosInstitucionais/novoTexto';
import Texto from './pages/Configuracoes/TextosInstitucionais/Texto';
import ImagemTexto from './pages/Configuracoes/TextosInstitucionais/Texto/ImagemTexto';
import ImagensLoja from './pages/Configuracoes/ImagensInstitucionais';
import Imagem from './pages/Configuracoes/ImagensInstitucionais/Imagem';
import NovaImagem from './pages/Configuracoes/ImagensInstitucionais/novaImagem';
import NovaCategoriaProduto from './pages/Produtos/ProdutoCategoria/novaCategoriaProduto';
import NewNivelCategory from './pages/Categorias/Categoria/newNivelCategory';
import NewNivelCategoryProduct from './pages/Produtos/ProdutoCategoria/newNivelCategoryProduct';
import AtualizarCategoria from './pages/Produtos/AtualizarCategoria';
import UpdateNivelCategoryProduct from './pages/Produtos/AtualizarCategoria/updateNivelCategoryProduct';
import TodasAvaliacoes from './pages/Avaliacoes/TodasAvaliacoes';
import NovoBanner from './pages/Banners/novoBanner';
import Banner from './pages/Banners/Banner';
import GruposCategorias from './pages/Categorias/GruposCategorias';
import NovoGrupo from './pages/Categorias/GruposCategorias/novoGrupo';
import CategoriasGrupo from './pages/Categorias/GruposCategorias/categoriasGrupo';
import DeletePageGroup from './pages/Categorias/GruposCategorias/deletePageGroup';


const RoutesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/painel' element={<Painel />} />
            <Route path='/painel' element={<Painel />} />

            <Route path='/pedidos' element={<Pedidos />} />
            <Route path='/pedido/:pedido_id' element={<Pedido />} />

            <Route path='/clientes' element={<Clientes />} />
            <Route path='/cliente/:slug/:user_id' element={<Cliente />} />

            <Route path='/categorias' element={<Categorias />} />
            <Route path='/categoria/nova' element={<NovaCategoria />} />
            <Route path='/categoria/:category_id' element={<Categoria />} />
            <Route path='/categoria/newNivelCategory/:IDRelation' element={<NewNivelCategory />} />
            <Route path='/groups' element={<GruposCategorias />} />
            <Route path='/grupo/novo' element={<NovoGrupo />} />
            <Route path='/grupo/:groupCategoy_id' element={<CategoriasGrupo />} />
            <Route path='/grupo/delete/:groupCategoy_id' element={<DeletePageGroup />} />

            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produto/novo' element={<NovoProduto />} />
            <Route path='/produto/novo/categorias/:product_id' element={<ProdutoCategoria />} />
            <Route path='/produto/novo/categorias/novaCategoriaProduto/:product_id' element={<NovaCategoriaProduto />} />
            <Route path='/produto/categorias/newNivelCategoryProduct/:product_id/:IDRelation' element={<NewNivelCategoryProduct />} />
            <Route path='/produto/atualizar/categorias/:product_id' element={<AtualizarCategoria />} />
            <Route path='/produto/atualizar/categorias/updateNivelCategoryProduct/:product_id/:IDRelation' element={<UpdateNivelCategoryProduct />} />
            <Route path='/produto/:slug/:product_id' element={<Produto />} />
            <Route path='/produto/avaliacoes/:slug/:product_id' element={<Avaliacoes />} />
            <Route path='/avaliacao/:slug/:avaliacao_id' element={<Avaliacao />} />
            <Route path='/avaliacoes' element={<TodasAvaliacoes />} />

            <Route path='/banners' element={<Banners />} />
            <Route path='/banners/novo' element={<NovoBanner />} />
            <Route path='/banner/:banner_id' element={<Banner />} />

            <Route path='/newsletters' element={<Newsletters />} />
            <Route path='/newsletter/:newsletter_id' element={<Newsletter />} />

            <Route path='/contatos' element={<Contatos />} />
            <Route path='/contato/:contato_id' element={<Contato />} />

            <Route path='/configuracoes' element={<Configuracoes />} />
            <Route path='/rede/:redesocial_id' element={<Rede />} />
            <Route path='/textosInstitucionais' element={<TextosInstitucionais />} />
            <Route path='/textosInstitucionais/novo' element={<NovoTexto />} />
            <Route path='/texto/:textoinstitucional_id' element={<Texto />} />
            <Route path='/ImagemTexto/:imageloja_id' element={<ImagemTexto />} />
            <Route path='/imagensInstitucionais' element={<ImagensLoja />} />
            <Route path='/imagensInstitucionais/nova' element={<NovaImagem />} />
            <Route path='/imagem/:imageloja_id' element={<Imagem />} />

            <Route path='/perfil' element={<Perfil />} />
        </Routes>
    );
}

export default RoutesAuth;