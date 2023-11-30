import React, { useContext, useState } from 'react';
import Toggle from '../Toggle';
import {
    MdDashboard,
    MdExitToApp,
    MdClose,
    MdMenu,
    MdOutlineCategory,
    MdOutlineProductionQuantityLimits,
    MdSettingsSuggest,
    MdPlayArrow,
    MdContactMail,
    MdRemoveShoppingCart
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
import { IoIosPeople } from 'react-icons/io';
import { RiCoupon2Fill } from 'react-icons/ri';
import { AiFillWallet } from 'react-icons/ai';


const Aside: React.FC = () => {

    const navigate = useNavigate();

    const { signOut, admin } = useContext(AuthContext);
    const { toggleTheme, theme } = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const [submenu, setSubmenu] = useState(false);
    const [submenu1, setSubmenu1] = useState(false);
    const [submenu2, setSubmenu2] = useState(false);
    const [submenu3, setSubmenu3] = useState(false);
    const [submenu4, setSubmenu4] = useState(false);
    const [submenu5, setSubmenu5] = useState(false);
    const [submenu6, setSubmenu6] = useState(false);

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

    const handleSubMenu4 = () => {
        setSubmenu4(!submenu4);
    }

    const handleSubMenu5 = () => {
        setSubmenu5(!submenu5);
    }

    const handleSubMenu6 = () => {
        setSubmenu6(!submenu6);
    }

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    function signOutSystem() {
        signOut();
        navigate("/loginAdmin");

        setTimeout(() => {
            navigate(0)
        }, 2500);
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

                <MenuItemLink onClick={handleSubMenu6} style={{ cursor: 'pointer' }} >
                    <AiFillWallet />
                    Pedidos
                </MenuItemLink>

                {submenu6 ? (
                    <>
                        <SubMenuItemLink href="/pedidos">
                            <MdPlayArrow />
                            Pedidos
                        </SubMenuItemLink>

                        {admin.role === "EMPLOYEE" ?
                            null
                            :
                            <>
                                <SubMenuItemLink href="/pedidos/emailStausOrder" >
                                    <MdPlayArrow />
                                    E-mail status pedidos
                                </SubMenuItemLink>

                                <SubMenuItemLink href="/pedidos/emailFretes" >
                                    <MdPlayArrow />
                                    E-mail fretes pedidos
                                </SubMenuItemLink>
                            </>
                        }
                    </>
                ) : null}

                <MenuItemLink onClick={handleSubMenu3} style={{ cursor: 'pointer' }} >
                    <IoIosPeople />
                    Clientes
                </MenuItemLink>

                {submenu3 ? (
                    <>
                        {admin.role === "EMPLOYEE" ?
                            null
                            :
                            <SubMenuItemLink href="/clientes" >
                                <MdPlayArrow />
                                Clientes
                            </SubMenuItemLink>
                        }

                        <SubMenuItemLink href="/contrapropostas" >
                            <MdPlayArrow />
                            Contrapropostas
                        </SubMenuItemLink>
                    </>
                ) : null}

                {admin.role === "EMPLOYEE" ?
                    null
                    :
                    <>
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

                                <SubMenuItemLink href='/menus' >
                                    <MdPlayArrow />
                                    Menus de categorias
                                </SubMenuItemLink>
                            </>
                        ) : null}
                    </>
                }

                <MenuItemLink onClick={handleSubMenu1} style={{ cursor: 'pointer' }} >
                    <MdOutlineProductionQuantityLimits />
                    Produtos
                </MenuItemLink>

                {submenu1 ? (
                    <>
                        {admin.role === "EMPLOYEE" ?
                            null
                            :
                            <>
                                <SubMenuItemLink href='/atributos' >
                                    <MdPlayArrow />
                                    Atributos
                                </SubMenuItemLink>

                                <SubMenuItemLink href="/compreJunto" >
                                    <MdPlayArrow />
                                    Compre junto
                                </SubMenuItemLink>
                            </>
                        }

                        <SubMenuItemLink href="/produtos" >
                            <MdPlayArrow />
                            Produtos
                        </SubMenuItemLink>

                        <SubMenuItemLink href='/avaliacoes' >
                            <MdPlayArrow />
                            Todas avaliações
                        </SubMenuItemLink>

                    </>
                ) : null}

                <MenuItemLink href='/coupoms' >
                    <RiCoupon2Fill />
                    Cupoms
                </MenuItemLink>

                <MenuItemLink onClick={handleSubMenu5} style={{ cursor: 'pointer' }} >
                    <MdRemoveShoppingCart />
                    Carrinho abandonado
                </MenuItemLink>

                {submenu5 ? (
                    <>
                        <SubMenuItemLink href='/carrinho/metricas' >
                            <MdPlayArrow />
                            Métricas
                        </SubMenuItemLink>

                        {admin.role === "EMPLOYEE" ?
                            null
                            :
                            <>
                                <SubMenuItemLink href="/carrinho/emails" >
                                    <MdPlayArrow />
                                    Templates e-mails
                                </SubMenuItemLink>

                                <SubMenuItemLink href="/carrinho/configuracoes" >
                                    <MdPlayArrow />
                                    Configurações
                                </SubMenuItemLink>
                            </>
                        }
                    </>
                ) : null}

                {admin.role === "EMPLOYEE" ?
                    null
                    :
                    <MenuItemLink href='/filterGrupos' >
                        <FaFilter />
                        Filtros
                    </MenuItemLink>
                }

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

                {admin.role === "EMPLOYEE" ?
                    null
                    :
                    <>
                        <MenuItemLink onClick={handleSubMenu} style={{ cursor: 'pointer' }} >
                            <MdSettingsSuggest />
                            Configurações
                        </MenuItemLink>

                        {submenu ?
                            <>
                                <SubMenuItemLink href='/configuracoes' >
                                    <MdPlayArrow />
                                    Dados da loja
                                </SubMenuItemLink>

                                <SubMenuItemLink href='/textosInstitucionais' >
                                    <MdPlayArrow />
                                    Textos institucionais
                                </SubMenuItemLink>

                                <SubMenuItemLink href='/imagensInstitucionais' >
                                    <MdPlayArrow />
                                    Imagens institucionais
                                </SubMenuItemLink>

                                <SubMenuItemLink href='/configuracoes/emailstransacionais' >
                                    <MdPlayArrow />
                                    E-mails transacionais
                                </SubMenuItemLink>

                                <SubMenuItemLink href='/configuracoes/loja' >
                                    <MdPlayArrow />
                                    Configurações na loja
                                </SubMenuItemLink>

                                <SubMenuItemLink href='/configuracoes/notificacoes' >
                                    <MdPlayArrow />
                                    Central de notificações
                                </SubMenuItemLink>
                            </>
                            : null}
                    </>
                }

                {admin.role === "ADMIN" ? (
                    <>
                        <MenuItemLink onClick={handleSubMenu4} style={{ cursor: 'pointer' }} >
                            <CgProfile />
                            Perfil
                        </MenuItemLink>

                        {submenu4 ?
                            <>
                                <SubMenuItemLink href="/perfil" >
                                    <MdPlayArrow />
                                    Perfil
                                </SubMenuItemLink>

                                <SubMenuItemLink href='/usuarios' >
                                    <MdPlayArrow />
                                    Usuarios
                                </SubMenuItemLink>
                            </>
                            : null}
                    </>
                ) :
                    <>
                        <MenuItemLink href="/perfil">
                            <CgProfile />
                            Perfil
                        </MenuItemLink>
                    </>
                }

                <MenuItemButton onClick={() => signOutSystem()}>
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