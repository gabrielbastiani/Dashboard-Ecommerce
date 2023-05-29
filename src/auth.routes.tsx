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
import ProdutoCategoria from './pages/Produtos/ProdutoCategoria';
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
import EditItem from './pages/Categorias/GruposCategorias/editItem';
import EditGroup from './pages/Categorias/GruposCategorias/editGroup';
import Atributos from './pages/Produtos/Atributos'; 
import NovoAtributo from './pages/Produtos/Atributos/novoAtributo'; 
import EditAtributo from './pages/Produtos/Atributos/editAtributo'; 
import ProdutoAtributo from './pages/Produtos/ProdutoAtributo';
import Filtros from './pages/Filtros'; 
import NovoGrupoFiltroAtributo from './pages/Filtros/novoGrupoFiltroAtributo';
import AtributoFiltro from './pages/Filtros/AtributoFiltro';
import EditAtributoFiltro from './pages/Filtros/AtributoFiltro/editAtributoFiltro';
import EditGroupFiltroAtributo from './pages/Filtros/editGroupFiltroAtributo';
import NovoGrupoFiltroCategoria from './pages/Filtros/novoGrupoFiltroCategoria';
import CategoryFiltro from './pages/Filtros/CategoryFiltro';
import EditCategoryFiltro from './pages/Filtros/CategoryFiltro/editCategoryFiltro';


const RoutesAuth: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/painel' element={<Painel />} />

            <Route path='/categorias' element={<Categorias />} />
            <Route path='/categoria/nova' element={<NovaCategoria />} />
            <Route path='/categoria/:category_id' element={<Categoria />} />
            <Route path='/categoria/newNivelCategory/:IDRelation' element={<NewNivelCategory />} />
            <Route path='/groups' element={<GruposCategorias />} />
            <Route path='/grupo/novo' element={<NovoGrupo />} />
            <Route path='/grupo/edit/:groupCategoy_id' element={<EditGroup />} />
            <Route path='/grupo/:groupCategoy_id' element={<CategoriasGrupo />} />
            <Route path='/grupo/item/edit/:groupCategoy_id' element={<EditItem />} />

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
            <Route path='/produto/atributo/:variacao_id/:productId' element={<ProdutoAtributo />} />
            <Route path='/atributos' element={<Atributos />} />
            <Route path='/atributo/novo' element={<NovoAtributo />} />
            <Route path='/atributo/:atributo_id' element={<EditAtributo />} />

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