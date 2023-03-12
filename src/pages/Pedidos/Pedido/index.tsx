import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { Button } from "../../../components/ui/Button";
import { BlockTop, Container } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { setupAPIClient } from "../../../services/api";
import moment from 'moment';




const Pedido: React.FC = () => {

    let { pedido_id } = useParams();

    const navigate = useNavigate();

    const [names, setNames] = useState('');
    const [datePedidos, setDatePedidos] = useState();
    const [cpfs, setCpfs] = useState('');
    const [phones, setPhones] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');

    const [enderecos, setEnderecos] = useState('');
    const [numero, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState('');

    const [taxaEntregas, setTaxaEntregas] = useState('');
    const [valorDoPedidos, setValorDoPedidos] = useState('');
    const [valorTotals, setValorTotals] = useState('');
    const [formaDePagamentos, setFormaDePagamentos] = useState('');

    const [codigoRastreios, setCodigoRastreios] = useState<any[]>([]);
    const [pagamentos, setPagamentos] = useState<any[]>([]);


    useEffect(() => {
        async function loadPedido() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/exactPedidoUser?pedido_id=${pedido_id}`);

                setNames(response.data.user.nameComplete);
                setDatePedidos(response.data.created_at);
                setCpfs(response.data.pagamentos[0].cpfPagamento);
                setPhones(response.data.user.phone);
                setDataNascimentos(response.data.pagamentos[0].dataDeNascimento);
                setEnderecos(response.data.pagamentos[0].ruaPagamento);
                setNumeros(response.data.pagamentos[0].numeroPagamento);
                setBairros(response.data.pagamentos[0].bairroPagamento);
                setCidades(response.data.pagamentos[0].cityPagamento);
                setEstados(response.data.pagamentos[0].statePagamento);
                setTaxaEntregas(response.data.carrinhos[0].custoEntrega);
                setValorDoPedidos(response.data.carrinhos[0].valorPagamento);
                setValorTotals(response.data.pagamentos[0].valor);
                setFormaDePagamentos(response.data.pagamentos[0].formaDePagamento);
                setCodigoRastreios(response.data.entregas[0].codigoRastreios);
                setPagamentos(response.data.pagamentos[0].status);
                
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadPedido()
    },[pedido_id])


    console.log(pagamentos)


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Voltar
                            url="/pedidos"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={"Pedido - " + names + ' - ' + moment(datePedidos).format('DD/MM/YYYY - HH:mm')}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={ () => handleOpenModalCancel(pedido_id) }
                            >
                                Cancelar Pedido
                            </Button>
                        </BlockTop>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Pedido;