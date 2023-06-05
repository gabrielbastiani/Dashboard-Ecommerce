import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Painel from './pages/Painel';
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
import Newsletters from './pages/Newsletters';
import Newsletter from './pages/Newsletters/Newsletter';
import Contatos from './pages/Contatos';
import Contato from './pages/Contatos/Contato';
import Rede from './pages/Configuracoes/Rede';
import TextosInstitucionais from './pages/Configuracoes/TextosInstitucionais';
import Banners from './pages/Banners';
import NovoTexto from './pages/Configuracoes/TextosInstitucionais/novoTexto';
import Texto from './pages/Configuracoes/TextosInstitucionais/Texto';
import ImagensLoja from './pages/Configuracoes/ImagensInstitucionais';
import Imagem from './pages/Configuracoes/ImagensInstitucionais/Imagem';
import NovaImagem from './pages/Configuracoes/ImagensInstitucionais/novaImagem';
import SubCategoria from './pages/Categorias/Categoria/subCategoria';
import TodasAvaliacoes from './pages/Avaliacoes/TodasAvaliacoes';
import NovoBanner from './pages/Banners/novoBanner';
import Banner from './pages/Banners/Banner';
import MenusCategorias from './pages/Categorias/MenusCategorias';
import NovoMenu from './pages/Categorias/MenusCategorias/novoMenu';
import CategoriasMenu from './pages/Categorias/MenusCategorias/categoriasMenu';
import EditMenu from './pages/Categorias/MenusCategorias/editMenu';
import Filtros from './pages/Filtros'; 
import NovoGrupoFiltroAtributo from './pages/Filtros/novoGrupoFiltroAtributo';
import AtributoFiltro from './pages/Filtros/AtributoFiltro';
import EditAtributoFiltro from './pages/Filtros/AtributoFiltro/editAtributoFiltro';
import EditGroupFiltroAtributo from './pages/Filtros/editGroupFiltroAtributo';
import NovoGrupoFiltroCategoria from './pages/Filtros/novoGrupoFiltroCategoria';
import CategoryFiltro from './pages/Filtros/CategoryFiltro';
import EditCategoryFiltro from './pages/Filtros/CategoryFiltro/editCategoryFiltro';
import EditItem from './pages/Categorias/MenusCategorias/editItem';
import TiposAtributos from './pages/Produtos/TiposAtributos';
import EditTipoAtributo from './pages/Produtos/TiposAtributos/editTipoAtributo';
import NovoTipoAtributo from './pages/Produtos/TiposAtributos/novoTipoAtributo';
import ProductDescription from './pages/Produtos/ProductDescription';
import CompreJunto from './pages/Produtos/CompreJunto';
import NovoGrupoCompreJunto from './pages/Produtos/CompreJunto/novoGrupoCompreJunto';
import ProdutosGrupo from './pages/Produtos/CompreJunto/produtosGrupo';
import EditGrupoCompreJunto from './pages/Produtos/CompreJunto/editGrupoCompreJunto';


const RoutesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/painel' element={<Painel />} />

            <Route path='/categorias' element={<Categorias />} />
            <Route path='/categoria/nova' element={<NovaCategoria />} />
            <Route path='/categoria/:category_id' element={<Categoria />} />
            <Route path='/categoria/subCategoria/:parentId' element={<SubCategoria />} />
            <Route path='/categoria/subCategoria/edit/:category_id' element={<Categoria />} />

            <Route path='/menus' element={<MenusCategorias />} />
            <Route path='/menu/novo' element={<NovoMenu />} />
            <Route path='/menu/edit/:menuCategory_id' element={<EditMenu />} />
            <Route path='/menu/:menuCategory_id' element={<CategoriasMenu />} />
            <Route path='/menu/categoriaMenu/edit/:menuCategory_id' element={<EditItem />} />

            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produto/novo' element={<NovoProduto />} />
            <Route path='/produto/:slug/:product_id' element={<Produto />} />
            <Route path='/produto/descricao/nova/:slug/:product_id' element={<ProductDescription />} />
            <Route path='/produto/avaliacoes/:slug/:product_id' element={<Avaliacoes />} />
            <Route path='/avaliacao/:slug/:avalietion_id' element={<Avaliacao />} />
            <Route path='/avaliacoes' element={<TodasAvaliacoes />} />
            <Route path='/tiposAtributos' element={<TiposAtributos />} />
            <Route path='/tipoAtributo/novo' element={<NovoTipoAtributo />} />
            <Route path='/tipoAtributo/edit/:typeAttribute_id' element={<EditTipoAtributo />} />
            <Route path='/compreJunto' element={<CompreJunto />} />
            <Route path='/compreJunto/grupo/novo' element={<NovoGrupoCompreJunto />} />
            <Route path='/compreJunto/grupo/edit/:buyTogether_id' element={<EditGrupoCompreJunto />} />
            <Route path='/compreJunto/grupo/:buyTogether_id' element={<ProdutosGrupo />} />

            <Route path='/filterGrupos' element={<Filtros />} />
            <Route path='/grupoFiltro/atributos/novo' element={<NovoGrupoFiltroAtributo />} />
            <Route path='/grupoFiltro/categorias/novo' element={<NovoGrupoFiltroCategoria />} />
            <Route path='/grupoFiltro/categorias/:groupFilter_id' element={<CategoryFiltro />} />
            <Route path='/filtroCategory/edit/:filterCategory_id' element={<EditCategoryFiltro />} />
            <Route path='/grupoFiltroAtributo/edit/:groupFilter_id' element={<EditGroupFiltroAtributo />} />
            <Route path='/grupoFiltro/atributos/:groupFilter_id' element={<AtributoFiltro />} />
            <Route path='/filtroAtributo/edit/:filterAtributo_id' element={<EditAtributoFiltro />} />

            <Route path='/banners' element={<Banners />} />
            <Route path='/banners/novo' element={<NovoBanner />} />
            <Route path='/banner/:banner_id' element={<Banner />} />

            <Route path='/newsletters' element={<Newsletters />} />
            <Route path='/newsletter/:newsletter_id' element={<Newsletter />} />

            <Route path='/contatos' element={<Contatos />} />
            <Route path='/contato/:contato_id' element={<Contato />} />

            <Route path='/configuracoes' element={<Configuracoes />} />
            <Route path='/rede/:socialMedia_id' element={<Rede />} />
            <Route path='/textosInstitucionais' element={<TextosInstitucionais />} />
            <Route path='/textosInstitucionais/novo' element={<NovoTexto />} />
            <Route path='/texto/:institutionalText_id' element={<Texto />} />

            <Route path='/imagensInstitucionais' element={<ImagensLoja />} />
            <Route path='/imagensInstitucionais/nova' element={<NovaImagem />} />
            <Route path='/imagem/:imageStore_id' element={<Imagem />} />

            <Route path='/perfil' element={<Perfil />} />
        </Routes>
    );
}

export default RoutesAuth;