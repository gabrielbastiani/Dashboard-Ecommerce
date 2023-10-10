import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import Modal from 'react-modal';
import { IMaskInput } from "react-imask";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { InuptCheck } from "../../../components/ui/InuptCheck";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { ModalDeleteCustomer } from "../../../components/popups/ModalDeleteCustomer";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";
import Select from "../../../components/ui/Select";
import moment from "moment";
import { BoxTopStatusGeral, GridOrder, ImagePay, SectionOrder, StatusTop, TotalFrete, TotalTop } from "./styles";
import { FaTruckMoving } from "react-icons/fa";
import boleto from '../../../assets/boleto.png';
import master from '../../../assets/mastercard.png';
import visa from '../../../assets/visa.png';
import elo from '../../../assets/elo.png';
import pix from '../../../assets/pix.png';

interface PaymentProps {
    customer_id: string;
    store_cart_id: string;
    transaction_id: number;
    type_payment: string;
    key_payment_pix: string;
    qr_code_pix: string;
    key_valid_pix: string;
    external_resource_url: string;
    expiration_boleto: string;
    first_number_credit_card: string;
    last_number_credit_card: string;
    expiration_month: number;
    expiration_year: number;
    date_created: string;
    cardholder_name: string;
    cardholder_identification: {
        name: string;
        identification: any;
    }
    flag_credit_card: string;
    installment: number;
    installment_amount: number;
    total_payment_juros: number;
    total_payment: number;
    status: string;
}

interface OrderProps {
    cart: any;
    created_at: string;
    cupom: string;
    data_delivery: string;
    frete: number;
    id_order_store: number;
}

const Pedido: React.FC = () => {

    let { order_id } = useParams();

    const [order, setOrder] = useState<OrderProps>();
    const [idOrder, setIdOrder] = useState(Number);
    const [dataOrder, setDataOrder] = useState();
    const [cupom, setCupom] = useState('');
    const [cartItens, setCartItens] = useState<any[]>([]);
    const [shipments, setShipments] = useState<any[]>([]);
    const [orderComments, setOrderComments] = useState<any[]>([]);
    const [orderPayment, setOrderPayment] = useState<PaymentProps>();

    const payFrete = Number(order?.frete);
    const totalPay = Number(orderPayment?.total_payment_juros ? orderPayment?.total_payment_juros : orderPayment?.total_payment);

    console.log(orderPayment)

    useEffect(() => {
        async function loadorderdata() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactOrder?order_id=${order_id}`);

                setOrder(data || []);

                setIdOrder(data.id_order_store);
                setDataOrder(data.created_at);
                setCupom(data.cupom);
                setCartItens(data.cart || []);
                setShipments(data.shipmentsTrackings || []);
                setOrderComments(data.orderComments || []);
                setOrderPayment(data.payment || []);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadorderdata();
    }, [order_id]);




    /* const dados: any = [];
    (order || []).forEach((item) => {
        dados.push({
            "Pedido": item.id_order_store,
            "Valor Total": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.cart.map((car: { total: any; }) => car.total).reduce((acumulador: any, valorAtual: any) => acumulador + valorAtual, 0)),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Situação": item.shipmentsTrackings[0].delivery_history,
            "botaoDetalhes": `/cliente/pedido/${item.id}`
        });
    }); */



    return (
        <SectionOrder>

            <MainHeader />

            <Card>

                <VoltarNavagation />

                <Titulos
                    tipo="h1"
                    titulo={`Pedido -  #${idOrder} | Data: ${moment(dataOrder).format('DD/MM/YYYY - HH:mm')}`}
                />

                <BoxTopStatusGeral>
                    {orderPayment?.status === "pending" ?
                        <StatusTop style={{
                            backgroundColor: 'yellow',
                            color: 'black'
                        }}
                        >
                            Pendente de Pagamento
                        </StatusTop>
                        :
                        null
                    }

                    {orderPayment?.status === "approved" ?
                        <StatusTop style={{
                            backgroundColor: 'green',
                            color: 'white'
                        }}
                        >
                            Pago
                        </StatusTop>
                        :
                        null
                    }

                    {orderPayment?.status === "inprocess" || orderPayment?.status === "inmediation" ?
                        <StatusTop style={{
                            backgroundColor: 'orange',
                            color: 'white'
                        }}
                        >
                            Procesando
                        </StatusTop>
                        :
                        null
                    }

                    {orderPayment?.status === "rejected" ?
                        <StatusTop style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                        >
                            Rejeitado
                        </StatusTop>
                        :
                        null
                    }

                    {orderPayment?.status === "cancelled" ?
                        <StatusTop style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                        >
                            Cancelado
                        </StatusTop>
                        :
                        null
                    }

                    {orderPayment?.status === "refunded" || orderPayment?.status === "chargedback" ?
                        <StatusTop style={{
                            backgroundColor: 'brown',
                            color: 'white'
                        }}
                        >
                            Devolvido
                        </StatusTop>
                        :
                        null
                    }

                    {orderPayment?.status === "chargedback" ?
                        <StatusTop style={{
                            backgroundColor: 'white',
                            color: 'black'
                        }}
                        >
                            Estornado
                        </StatusTop>
                        :
                        null
                    }

                    <TotalFrete>
                        <FaTruckMoving size={20} />
                        Frete: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}
                    </TotalFrete>

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "master" ?
                        <TotalTop>
                            <ImagePay src={master} alt="Logo Builder Seu Negócio Online" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "visa" ?
                        <TotalTop>
                            <ImagePay src={visa} alt="Logo Builder Seu Negócio Online" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "amex" ?
                        <TotalTop>
                            <ImagePay src={elo} alt="Logo Builder Seu Negócio Online" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Boleto" ?
                        <TotalTop>
                            <ImagePay src={boleto} alt="Logo Builder Seu Negócio Online" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "PIX" ?
                        <TotalTop>
                            <ImagePay src={pix} alt="Logo Builder Seu Negócio Online" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                </BoxTopStatusGeral>

                <GridOrder>
                    <Card>
                        <Titulos
                            tipo="h2"
                            titulo="Cliente"
                        />



                    </Card>

                    <Card>
                        <Titulos
                            tipo="h2"
                            titulo="Envio"
                        />



                    </Card>

                    <Card>
                        <Titulos
                            tipo="h2"
                            titulo="Pagamento"
                        />



                    </Card>
                </GridOrder>

            </Card>
        </SectionOrder>
    )
}

export default Pedido;