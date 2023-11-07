import { useEffect, useState } from 'react';
import {
    Container, LinkPage, TextWarning
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

            } catch (error) {
                console.log(error);
            }
        }
        loadNotificationsConfigs();
    }, []);



    return (
        <>
            <Container style={{ display: socialMedia.length === 0 ? 'block' : 'none' }}>
                <TextWarning>
                    ATENÇÃO!!! Não deixe de cadastrar suas redes sociais em sua loja.&nbsp;
                    <LinkPage href='/configuracoes'>CLIQUE AQUI</LinkPage>
                </TextWarning>
            </Container>
        </>
    );
}

export default Warnings;