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
    ToggleDesktop
}  from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';


const MainHeader: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    },[]);

    return (
        <Container>
            <LojaFront href={'https://loja.builderseunegocioonline.com.br'}><BsFillArrowLeftSquareFill size={20} />Ver Loja</LojaFront>
            <ToggleDesktop>
                <Toggle
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ToggleDesktop>
            

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>{user?.nameComplete}</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;