import React, { useContext, useEffect, useMemo, useState } from 'react';
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
    BoxProfile,
    DropDownContent,
    BlockNotification,
    Menssages,
    DataNotification,
    Block,
    Title,
    ClockBlock,
    BoxIcons
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { FaBell, FaCartPlus, FaRegBell, FaRegClock } from 'react-icons/fa';
import { setupAPIClient } from '../../services/api';
import moment from 'moment';
import { Avisos } from '../Avisos';


const MainHeader: React.FC = () => {

    const { admin } = useContext(AuthContext);

    const { toggleTheme, theme } = useTheme();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [openNotification, setOpenNotification] = useState(true);

    const handleNotificationOpen = () => {
        setOpenNotification(!openNotification);
    }

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, []);

    useEffect(() => {
        async function findNotificationsAdmin() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/notificationPainelAdmin`);

                setNotifications(data);

            } catch (error) {
                console.error(error);
            }
        }
        findNotificationsAdmin();
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
                    <FaBell size={20} onClick={handleNotificationOpen} />
                </NotificationBell>
            </Profile>

            {openNotification ?
                null
                :
                <DropDownContent>
                    <Title>Notificações</Title>
                    {notifications.length === 0 ?
                        <Avisos texto='Sem notificações ainda...' />
                        :
                        <>
                            {notifications.slice(0, 20).map((item, index) => {
                                return (
                                    <BlockNotification key={index}>
                                        <BoxIcons>
                                            <FaCartPlus size={28} />
                                        </BoxIcons>
                                        <Block>
                                            <Menssages
                                                dangerouslySetInnerHTML={{ __html: item.message }}
                                            ></Menssages>
                                            <ClockBlock>
                                                <FaRegClock size={20} />
                                                <DataNotification>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DataNotification>
                                            </ClockBlock>
                                        </Block>
                                    </BlockNotification>
                                )
                            })}
                        </>
                    }
                </DropDownContent>
            }
        </Container>
    );
}

export default MainHeader;