import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { Button } from "../../../components/ui/Button";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { setupAPIClient } from "../../../services/api";
import moment from 'moment';
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import TabelaSimples from "../../../components/Tabelas";
import { ContainerPedido, BoxButton, BolckStatus, Status } from "./styles";
import { InputPost } from "../../../components/ui/InputPost";
import { BsPlus } from "react-icons/bs";
import Modal from 'react-modal';
import { ModalCancelarPedido } from "../../../components/popups/ModalCancelarPedido";


export type CancelPedido = {
    pedido_id: string;
    cancelados: string;
}

const Pedido: React.FC = () => {

    let { pedido_id } = useParams();

    const navigate = useNavigate();

    const [names, setNames] = useState('');
    const [datePedidos, setDatePedidos] = useState();
    const [cpfs, setCpfs] = useState('');
    const [phones, setPhones] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');

    const [enderecos, setEnderecos] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState('');
    const [ceps, setCeps] = useState('');

    const [taxaEntregas, setTaxaEntregas] = useState('');
    const taxaEntrega = Number(taxaEntregas);
    const [valorDoPedidos, setValorDoPedidos] = useState('');
    const [valorTotals, setValorTotals] = useState('');
    const [formaDePagamentos, setFormaDePagamentos] = useState('');

    const [codigoRastreios, setCodigoRastreios] = useState('');
    const [pagamentos, setPagamentos] = useState('');

    const [cancelados, setCancelados] = useState('');
    const [statusPedido, setStatusPedido] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [search, setSearch] = useState<any[]>([]);

    const cancelNo = String("Cancelado");
    const cancelYes = String("Valido");
    const statusAtual = String(statusPedido);

   

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
                setCeps(response.data.pagamentos[0].cepPagamento);
                setTaxaEntregas(response.data.carrinhos[0].custoEntrega);
                setValorDoPedidos(response.data.carrinhos[0].valorPagamento);
                setValorTotals(response.data.pagamentos[0].valor);
                setFormaDePagamentos(response.data.pagamentos[0].formaDePagamento);
                setCodigoRastreios(response.data.entregas[0].codigoRastreamento);
                setPagamentos(response.data.pagamentos[0].status);
                setStatusPedido(response.data.cancelado);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadPedido()
    }, [pedido_id])

    async function refreshPedido() {
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
            setCeps(response.data.pagamentos[0].cepPagamento);
            setTaxaEntregas(response.data.carrinhos[0].custoEntrega);
            setValorDoPedidos(response.data.carrinhos[0].valorPagamento);
            setValorTotals(response.data.pagamentos[0].valor);
            setFormaDePagamentos(response.data.pagamentos[0].formaDePagamento);
            setCodigoRastreios(response.data.entregas[0].codigoRastreamento);
            setPagamentos(response.data.pagamentos[0].status);
            setStatusPedido(response.data.cancelado);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }


    console.log(search)

    const mentirinha = [{
        produto: "Produto Principal M",
        precoUnd: "R$158,66",
        quantidade: "4",
        precoTotal: "R$658,22",
    }]

    /* @ts-ignore */
    const dados = [];
    (mentirinha || []).forEach((item) => {
        dados.push({
            "Produto": item.produto,
            "Preço Und.": item.precoUnd,
            "Quantidade": item.quantidade,
            "Preço Total": item.precoTotal
        });
    });

    function handleCloseModaCancel() {
        setModalVisible(false);
        refreshPedido();
    }

    async function handleOpenModalCancel(pedido_id: string) {
        const apiClient = setupAPIClient();
        const responseCancel = await apiClient.get('/exactPedidoUser', {
            params: {
                pedido_id: pedido_id,
            }
        });
        setModalItem(responseCancel.data);
        setCancelados(responseCancel.data.cancelado);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


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
                            {cancelNo === statusAtual && (
                                <>
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: 'green' }}
                                        /* @ts-ignore */
                                        onClick={() => handleOpenModalCancel(pedido_id)}
                                    >
                                        Ativar Pedido
                                    </Button>
                                </>
                            )}

                            {cancelYes === statusAtual && (
                                <>
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: '#FB451E' }}
                                        /* @ts-ignore */
                                        onClick={() => handleOpenModalCancel(pedido_id)}
                                    >
                                        Cancelar Pedido
                                    </Button>
                                </>
                            )}

                        </BlockTop>
                        <br />
                        <br />
                        <GridDate>
                            <SectionDate>
                                <Titulos
                                    tipo="h3"
                                    titulo="Dados do cliente"
                                />

                                <BlockDados
                                    style={{ marginTop: '50px' }}
                                >
                                    <TextoDados
                                        chave="Nome"
                                        dados={names}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="CPF"
                                        dados={cpfs}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Telefone"
                                        dados={phones}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Data de Nascimento"
                                        dados={dataNascimentos}
                                    />
                                </BlockDados>
                                <br />
                                <br />
                                <Titulos
                                    tipo="h3"
                                    titulo="Dados de Entrega"
                                />

                                <BlockDados
                                    style={{ marginTop: '50px' }}
                                >
                                    <TextoDados
                                        chave="Endereço"
                                        dados={enderecos}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Número"
                                        dados={numeros}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Bairro"
                                        dados={bairros}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Cidade"
                                        dados={cidades}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Estado"
                                        dados={estados}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="CEP"
                                        dados={ceps}
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                <Titulos
                                    tipo="h3"
                                    titulo="Carrinho"
                                />
                                <br />
                                <br />
                                <TabelaSimples
                                    cabecalho={["Produto", "Preço Und.", "Quantidade", "Preço Total"]}
                                    /* @ts-ignore */
                                    dados={dados}
                                />
                                <br />
                                <br />
                                <Titulos
                                    tipo="h3"
                                    titulo="Dados de Pagamento"
                                />

                                <BlockDados
                                    style={{ marginTop: '50px' }}
                                >
                                    <TextoDados
                                        chave="Taxa de Entrega"/* @ts-ignore */
                                        dados={taxaEntrega.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Valor do Pedido"/* @ts-ignore */
                                        dados={valorDoPedidos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Valor Total"/* @ts-ignore */
                                        dados={valorTotals.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave="Forma de Pagamento"
                                        dados={formaDePagamentos}
                                    />
                                </BlockDados>
                            </SectionDate>
                        </GridDate>
                    </Card>

                    <ContainerPedido>
                        <SectionDate>
                            <Card>
                                <Titulos
                                    tipo="h1"
                                    titulo="Entrega"
                                />

                                <Block
                                    style={{ marginTop: '50px' }}
                                >
                                    <Etiqueta>Código de Rastreio</Etiqueta>

                                    <Status>{codigoRastreios}</Status>

                                    <BolckStatus>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o código..."
                                            value={codigoRastreios}/* @ts-ignore */
                                            onChange={(e) => setCodigoRastreios(e.target.value)}
                                        />
                                        <BoxButton
                                            onClick={() => alert('clicou')}
                                        >
                                            <BsPlus size={20} />
                                        </BoxButton>
                                    </BolckStatus>

                                </Block>
                            </Card>
                        </SectionDate>

                        <SectionDate>
                            <Card>
                                <Titulos
                                    tipo="h1"
                                    titulo="Pagamento"
                                />

                                <Block
                                    style={{ marginTop: '50px' }}
                                >

                                    <Status>{pagamentos}</Status>

                                    <BolckStatus>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o status..."
                                            value={pagamentos} /* @ts-ignore */
                                            onChange={(e) => setPagamentos(e.target.value)}
                                        />
                                        <BoxButton
                                            onClick={() => alert('clicou')}
                                        >
                                            <BsPlus size={20} />
                                        </BoxButton>
                                    </BolckStatus>
                                </Block>
                            </Card>
                        </SectionDate>
                    </ContainerPedido>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalCancelarPedido
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModaCancel}
                    /* @ts-ignore */
                    pedido={modalItem}
                    /* @ts-ignore */
                    cancelado={cancelados}
                />
            )}
        </>
    )
}

export default Pedido;