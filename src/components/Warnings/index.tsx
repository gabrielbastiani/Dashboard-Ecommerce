import { useEffect, useState } from 'react';
import {
    Container, LinkPage, TextWarning, Warn
} from './styles';
import { setupAPIClient } from '../../services/api';


const Warnings: React.FC = () => {

    const [category, setCategory] = useState<any[]>([]);
    const [configAbandonedCart, setConfigAbandonedCart] = useState<any[]>([]);
    const [imageStore, setImageStore] = useState<any[]>([]);
    const [institutionalText, setInstitutionalText] = useState<any[]>([]);
    const [menuCategory, setMenuCategory] = useState<any[]>([]);
    const [socialMedia, setSocialMedia] = useState<any[]>([]);
    const [store, setStore] = useState<any[]>([]);
    const [templateAbandonedCartEmail, setTemplateAbandonedCartEmail] = useState<any[]>([]);
    const [templateOrderEmail, setTemplateOrderEmail] = useState<any[]>([]);
    const [templateFreteEmail, setTemplateFreteEmail] = useState<any[]>([]);

    useEffect(() => {
        const apiClient = setupAPIClient();
        async function loadNotificationsConfigs() {
            try {
                const { data } = await apiClient.get(`/notificationsRegister`);

                setCategory(data.category);
                setConfigAbandonedCart(data.configAbandonedCart);
                setImageStore(data.imageStore);
                setInstitutionalText(data.institutionalText);
                setMenuCategory(data.menuCategory);
                setSocialMedia(data.socialMedia);
                setStore(data.store);
                setTemplateAbandonedCartEmail(data.templateAbandonedCartEmail);
                setTemplateOrderEmail(data.templateOrderEmail);
                setTemplateFreteEmail(data.templateFreteEmail);

            } catch (error) {
                console.log(error);
            }
        }
        loadNotificationsConfigs();
    }, []);



    return (
        <>
            <Container style={{ display: store.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> PRIMEIRO ANTES DE QUALQUER COISA AQUI... CADASTRE OS DADOS DA SUA LOJA VIRTUAL POR FAVOR!!!&nbsp;
                    <LinkPage href='/configuracoes'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: category.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> É preferevel que cadastre categorias de produtos antes que cadastre seus produtos&nbsp;
                    <LinkPage href='/categoria/nova'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: menuCategory.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar menus de categorias, depois de ter cadastrado suas categorias&nbsp;
                    <LinkPage href='/menu/novo'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: templateAbandonedCartEmail.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar templates de e-mails para os carrinhos abandonados&nbsp;
                    <LinkPage href='/carrinho/templateEmail/novo'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: configAbandonedCart.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar configurações de disparo para e-mails de carrinho abandonado aos seus clientes&nbsp;
                    <LinkPage href='/carrinho/configuracoes/novo'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: templateFreteEmail.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar templates de e-mails para os rastreio de pedidos&nbsp;
                    <LinkPage href='/pedidos/TemplateEmailFretes/novo'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: imageStore.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar imagens em pontos chaves da sua loja virtual, images como bandeiras de pagamento, selos de segurança etc...&nbsp;
                    <LinkPage href='/imagensInstitucionais/nova'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: institutionalText.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar os textos da sua loja virtual, textos como por exemplo politicas de privacidade, como comprar, politicas de devoluções ou trocas etc...&nbsp;
                    <LinkPage href='/imagensInstitucionais/nova'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: socialMedia.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> Não deixe de cadastrar suas redes sociais em sua loja.&nbsp;
                    <LinkPage href='/configuracoes'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>

            <Container style={{ display: templateOrderEmail.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    <Warn>ATENÇÃO!!!</Warn> É OBRIGATÓRIO QUE CADASTRE PELO MENOS UM TEMPLATE DE E-MAIL PARA SINALIZAR O CLIENTE REFERENTE AO SEU PEDIDO.&nbsp;
                    <LinkPage href='/pedidos/TemplateEmailOrderStatus/novo'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>
        </>
    );
}

export default Warnings;