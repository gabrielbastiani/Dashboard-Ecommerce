import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../../services/api';
import { useParams } from 'react-router-dom';
import { Grid } from '../../Dashboard/styles';
import MainHeader from '../../../components/MainHeader';
import Aside from '../../../components/Aside';
import { Container } from '../../Categorias/styles';
import { Card } from '../../../components/Content/styles';
import Titulos from '../../../components/Titulos';
import { BlockData, TextData, TextStrong } from '../../Clientes/Contrapropostas/styles';
import TabelaSimples from '../../../components/Tabelas';
import VoltarNavagation from '../../../components/VoltarNavagation';


const DetalheCarrinhoAbandonado: React.FC = () => {

    let { abandonedCart_id } = useParams();

    const [search, setSearch] = useState<any[]>([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        async function abandonedCart() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueAbandonedCart?abandonedCart_id=${abandonedCart_id}`);

                setSearch(data || []);

                setName(data.customer.name || "");
                setEmail(data.customer.email || "");
                setPhone(data.customer.phone || "");
                setCart(data.cart_abandoned || []);

            } catch (error) {
                console.error(error);
            }
        }
        abandonedCart();
    }, [abandonedCart_id]);

    const dados: any = [];
    (cart || []).forEach((item: any) => {
        dados.push({
            "SKU": item.product.sku,
            "Produto": item.product.name,
            "Qtde.": item.amount,
            "Valor": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.promotion)
        });
    });


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>

                        <VoltarNavagation />

                        <Titulos
                            tipo="h1"
                            titulo="Detalhes do carrinho"
                        />
                        <br />
                        <BlockData>
                            <TextStrong style={{ fontSize: '19.5px' }}>{name}</TextStrong>
                        </BlockData>

                        <BlockData>
                            <TextStrong>E-mail: </TextStrong>
                            <TextData>{email}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Telefone: </TextStrong>
                            <TextData>{phone}</TextData>
                        </BlockData>

                        <TabelaSimples
                            cabecalho={["SKU", "Produto", "Qtde.", "Valor"]}
                            dados={dados}
                            textbutton={"Detalhes"}
                        />

                    </Card>
                </Container>
            </Grid >
        </>
    )
}

export default DetalheCarrinhoAbandonado;