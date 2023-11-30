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
    BoxIcons,
    LinkNotification,
    Viewed,
    AllViewd,
    ClearNotifications,
    BlockButtonsNotification,
    ButtonAllNotifications,
    BoxButtonAll,
    AmountItens
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { FaBell, FaCartPlus, FaRegBell, FaRegClock } from 'react-icons/fa';
import { setupAPIClient } from '../../services/api';
import moment from 'moment';
import { Avisos } from '../Avisos';
import { MdOutlineDashboard } from 'react-icons/md';


const MainHeader: React.FC = () => {

    const { admin } = useContext(AuthContext);

    const { toggleTheme, theme } = useTheme();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [openNotification, setOpenNotification] = useState(true);
    const [viewd, setViewd] = useState<any[]>([]);
    const [newFalse, setNewFalse] = useState(Number);
    const [newEmployee, setNewEmployee] = useState(Number);

    console.log(newEmployee)

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
        function loadNumberNotifications() {
            const booleanArray = viewd.map(fal => fal.viewed);
            const falseValues = booleanArray.filter(value => value === false);
            setNewFalse(falseValues.length);
        }
        loadNumberNotifications();
    }, [viewd]);

    useEffect(() => {
        function loadNumberNotificationsEmployee() {
            const booleanArray = viewd.map(fal => fal);
            const falseValues = booleanArray.filter(value => value.viewed === false && value.user === "EMPLOYEE");
            setNewEmployee(falseValues.length);
        }
        loadNumberNotificationsEmployee();
    }, [viewd]);

    function loadNumberNotifications() {
        const booleanArray = viewd.map(fal => fal.viewed);
        const falseValues = booleanArray.filter(value => value === false);
        setNewFalse(falseValues.length);
    }

    useEffect(() => {
        async function findNotificationsAdmin() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/notificationPainelAdmin`);

                setNotifications(data.slice(0, 15));
                setViewd(data);

            } catch (error) {
                console.error(error);
            }
        }
        findNotificationsAdmin();
    }, []);

    async function findNotificationsAdmin() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/notificationPainelAdmin`);

            setNotifications(data.slice(0, 15));

        } catch (error) {
            console.error(error);
        }
    }

    async function notificationsViewd(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateViewdNotification?notificationAdmin_id=${id}`);
            loadNumberNotifications();
            findNotificationsAdmin();
        } catch (error) {
            console.error(error);
        }
    }

    async function notificationsAllViewd() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllViewdNotification`);
            loadNumberNotifications();
            findNotificationsAdmin();
        } catch (error) {
            console.error(error);
        }
    }

    async function clearAllnotifications() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/clearAllNotificationsAdmin`);
            loadNumberNotifications();
            findNotificationsAdmin();
        } catch (error) {
            console.error(error);
        }
    }




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

                {admin.role === "EMPLOYEE" ?
                    <NotificationBell onClick={handleNotificationOpen}>
                        {newEmployee === 0 ?
                            <FaRegBell size={20} />
                            :
                            <>
                                <AmountItens>
                                    <span>{newEmployee}</span>
                                </AmountItens>
                                <FaBell size={20} />
                            </>
                        }
                    </NotificationBell>
                    :
                    <NotificationBell onClick={handleNotificationOpen}>
                        {newFalse === 0 ?
                            <FaRegBell size={20} />
                            :
                            <>
                                <AmountItens>
                                    <span>{newFalse}</span>
                                </AmountItens>
                                <FaBell size={20} />
                            </>
                        }
                    </NotificationBell>
                }

            </Profile>

            {openNotification ?
                null
                :
                <>
                    {admin.role === "EMPLOYEE" ?
                        <>
                            <DropDownContent>

                                <Title>Notificações</Title>

                                {notifications.length === 0 ?
                                    <Avisos texto='Sem notificações ainda...' />
                                    :
                                    <>
                                        {notifications.map((item, index) => {
                                            return (
                                                <>
                                                    {item.block_bell === true && item.user === "EMPLOYEE" ?
                                                        <LinkNotification
                                                            key={index}
                                                            href={item.link}
                                                            onClick={() => notificationsViewd(item.id)}
                                                        >
                                                            <BlockNotification style={{ background: item.viewed === true ? '#ff000052' : 'unset' }}>
                                                                <BoxIcons>
                                                                    <FaCartPlus size={28} />
                                                                </BoxIcons>
                                                                <Block>
                                                                    {item.viewed === true ? <Viewed>VISUALIZADA</Viewed> : null}
                                                                    <Menssages
                                                                        dangerouslySetInnerHTML={{ __html: item.message }}
                                                                    ></Menssages>
                                                                    <ClockBlock>
                                                                        <FaRegClock size={20} />
                                                                        <DataNotification>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DataNotification>
                                                                    </ClockBlock>
                                                                </Block>
                                                            </BlockNotification>
                                                        </LinkNotification>
                                                        :
                                                        null
                                                    }
                                                </>
                                            )
                                        })}
                                    </>
                                }
                            </DropDownContent>
                        </>
                        :
                        <>
                            <DropDownContent>
                                <Title>Notificações</Title>
                                <BlockButtonsNotification>
                                    <AllViewd
                                        onClick={notificationsAllViewd}
                                    >
                                        Marcar todas como lidas
                                    </AllViewd>
                                    <ClearNotifications
                                        onClick={clearAllnotifications}
                                    >
                                        Limpar todas notificações
                                    </ClearNotifications>
                                </BlockButtonsNotification>

                                {notifications.length === 0 ?
                                    <Avisos texto='Sem notificações ainda...' />
                                    :
                                    <>
                                        {notifications.map((item, index) => {
                                            return (
                                                <>
                                                    {item.block_bell === true ?
                                                        <LinkNotification
                                                            key={index}
                                                            href={item.link}
                                                            onClick={() => notificationsViewd(item.id)}
                                                        >
                                                            <BlockNotification style={{ background: item.viewed === true ? '#ff000052' : 'unset' }}>
                                                                <BoxIcons>
                                                                    <FaCartPlus size={28} />
                                                                </BoxIcons>
                                                                <Block>
                                                                    {item.viewed === true ? <Viewed>VISUALIZADA</Viewed> : null}
                                                                    <Menssages
                                                                        dangerouslySetInnerHTML={{ __html: item.message }}
                                                                    ></Menssages>
                                                                    <ClockBlock>
                                                                        <FaRegClock size={20} />
                                                                        <DataNotification>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DataNotification>
                                                                    </ClockBlock>
                                                                </Block>
                                                            </BlockNotification>
                                                        </LinkNotification>
                                                        :
                                                        null
                                                    }
                                                </>
                                            )
                                        })}
                                    </>
                                }
                                <BoxButtonAll>
                                    <ButtonAllNotifications
                                        href='/configuracoes/notificacoes'
                                    >
                                        <MdOutlineDashboard size={25} />
                                        VER TUDO
                                    </ButtonAllNotifications>
                                </BoxButtonAll>
                            </DropDownContent>
                        </>
                    }
                </>
            }
        </Container>
    );
}

export default MainHeader;