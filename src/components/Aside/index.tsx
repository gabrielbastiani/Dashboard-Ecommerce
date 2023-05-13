import React, { useContext, useState } from 'react';
import Toggle from '../Toggle';
import {
    MdDashboard,
    MdExitToApp,
    MdClose,
    MdMenu,
    MdDescription,
    MdPeople,
    MdOutlineCategory,
    MdOutlineProductionQuantityLimits,
    MdSettingsSuggest,
    MdPlayArrow,
    MdContactMail
} from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import logoImgWhite from '../../assets/LogoBuilderWhite.png';
import logoImgBlack from '../../assets/LogoBuilderBlack.png';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/theme';
import {
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter,
    LojaFrontMobile,
    SubMenuItemLink,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftSquareFill, BsImages } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';


const Aside: React.FC = () => {

    const navigate = useNavigate();

    const { signOut } = useContext(AuthContext);
    const { toggleTheme, theme } = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const [submenu, setSubmenu] = useState(false);
    const [submenu1, setSubmenu1] = useState(false);
    const [submenu2, setSubmenu2] = useState(false);
    const [submenu3, setSubmenu3] = useState(false);

    const handleSubMenu = () => {
        setSubmenu(!submenu);
    }

    const handleSubMenu1 = () => {
        setSubmenu1(!submenu1);
    }

    const handleSubMenu2 = () => {
        setSubmenu2(!submenu2);
    }

    const handleSubMenu3 = () => {
        setSubmenu3(!submenu3);
    }

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
                </ToggleMenu>

                {theme?.title === 'dark' && (
                    <LogImg src={logoImgWhite} alt="Logo Builder Seu Negócio Online" />
                )}

                {theme?.title === 'light' && (
                    <LogImg src={logoImgBlack} alt="Logo Builder Seu Negócio Online" />
                )}

                <Title>E-commerce Builder</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/painel">
                    <MdDashboard />
                    Painel
                </MenuItemLink>

                <MenuItemLink href="/pedidos">
                    <MdDescription />
                    Pedidos
                </MenuItemLink>

                <MenuItemLink href="/clientes">
                    <MdPeople />
                    Clientes
                </MenuItemLink>

                <MenuItemLink onClick={handleSubMenu2} style={{ cursor: 'pointer' }} >
                    <MdOutlineCategory />
                    Categorias
                </MenuItemLink>

                {submenu2 ? (
                    <>
                        <SubMenuItemLink href="/categorias" >
                            <MdPlayArrow />
                            Categorias
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/groups' >
                            <MdPlayArrow />
                            Menus de Categorias
                        </SubMenuItemLink>
                    </>
                ) : null}

                <MenuItemLink onClick={handleSubMenu1} style={{ cursor: 'pointer' }} >
                    <MdOutlineProductionQuantityLimits />
                    Produtos
                </MenuItemLink>

                {submenu1 ? (
                    <>
                        <SubMenuItemLink href="/produtos" >
                            <MdPlayArrow />
                            Produtos
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/avaliacoes' >
                            <MdPlayArrow />
                            Todas Avaliações
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/atributos' >
                            <MdPlayArrow />
                            Atributos
                        </SubMenuItemLink>

                    </>
                ) : null}

                <MenuItemLink onClick={handleSubMenu3} style={{ cursor: 'pointer' }} >
                    <FaFilter />
                    Filtros
                </MenuItemLink>

                {submenu3 ? (
                    <>
                        <SubMenuItemLink href='/filterGrupos' >
                            <MdPlayArrow />
                            Grupos de Filtros
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/filterCategories' >
                            <MdPlayArrow />
                            Filtros de Categorias
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/filterAtributos' >
                            <MdPlayArrow />
                            Filtros de Atributos
                        </SubMenuItemLink>
                    </>
                ) : null}

                <MenuItemLink href='/banners'>
                    <BsImages />
                    Banners
                </MenuItemLink>

                <MenuItemLink href="/newsletters">
                    <BsNewspaper />
                    Newsletters
                </MenuItemLink>

                <MenuItemLink href="/contatos">
                    <MdContactMail />
                    Contatos
                </MenuItemLink>

                <MenuItemLink onClick={handleSubMenu} style={{ cursor: 'pointer' }} >
                    <MdSettingsSuggest />
                    Configurações
                </MenuItemLink>

                {submenu ?
                    <>
                        <SubMenuItemLink href='/configuracoes' >
                            <MdPlayArrow />
                            Dados da Loja
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/textosInstitucionais' >
                            <MdPlayArrow />
                            Textos Institucionais
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/imagensInstitucionais' >
                            <MdPlayArrow />
                            Imagens Institucionais
                        </SubMenuItemLink>
                    </>
                    : null}

                <MenuItemLink href="/perfil">
                    <CgProfile />
                    Perfil
                </MenuItemLink>

                <MenuItemButton onClick={() => [signOut(), navigate("/loginAdmin"), navigate(0)]}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <LojaFrontMobile href='http://localhost:3001'><BsFillArrowLeftSquareFill size={20} />Ver Loja</LojaFrontMobile>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    );
}

export default Aside;