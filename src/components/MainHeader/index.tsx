import React, { useContext, useMemo, useState } from 'react';
import Toggle from '../Toggle';
import emojis from '../../utils/emojis';
import { useTheme } from '../../contexts/theme';
import {
    Container,
    Profile,
    Welcome,
    UserName,
    LojaFront,
    ToggleDesktop,
    NotificationBell,
    BoxProfile
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { FaBell, FaRegBell } from 'react-icons/fa';


const MainHeader: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, []);

    return (
        <Container>
            <LojaFront href='http://localhost:3001'><BsFillArrowLeftSquareFill size={20} />Ver Loja</LojaFront>
            <ToggleDesktop>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ToggleDesktop>

            <Profile>
                <BoxProfile>
                    <Welcome>Olá, {emoji}</Welcome>
                    <UserName href='/perfil'>{admin?.name}</UserName>
                </BoxProfile>

                <NotificationBell>
                    <FaRegBell size={20} />
                    <FaBell size={20} />
                </NotificationBell>
            </Profile>
        </Container>
    );
}

export default MainHeader;