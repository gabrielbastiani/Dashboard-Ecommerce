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
} from 'react-icons/md';
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
    LojaFrontMobile
} from './styles';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';


const Aside: React.FC = () => {
    const { signOut } = useContext(AuthContext);
    const { toggleTheme, theme } = useTheme();

    const navigate = useNavigate();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

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

                <MenuItemLink href="/categorias">
                    <MdOutlineCategory />
                    Categorias
                </MenuItemLink>

                <MenuItemLink href="/produtos">
                    <MdOutlineProductionQuantityLimits />
                    Produtos
                </MenuItemLink>

                <MenuItemLink href="/configuracoes">
                    <MdSettingsSuggest />
                    Configurações
                </MenuItemLink>

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
            <LojaFrontMobile href={'https://loja.builderseunegocioonline.com.br'}><BsFillArrowLeftSquareFill size={20} />Ver Loja</LojaFrontMobile>
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