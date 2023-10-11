import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
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
import { BoxPix, BoxTopStatusGeral, ButtoQRCode, ButtonPix, GridOrder, ImagePay, ImagePay1, InputPix, Linked, SectionOrder, StatusTop, TotalFrete, TotalTop, WhatsButton } from "./styles";
import { FaRegCopy, FaTruckMoving } from "react-icons/fa";
import boleto from '../../../assets/boleto.png';
import master from '../../../assets/mastercard.png';
import visa from '../../../assets/visa.png';
import american from '../../../assets/american.png';
import pix from '../../../assets/pix.png';
import { BlockData, TextData, TextStrong } from "../../Clientes/Contrapropostas/styles";
import { BsWhatsapp } from "react-icons/bs";
import copy from "copy-to-clipboard";
import { ModalQRCodePayment } from "../../../components/popups/ModalQRCodePayment";


interface CustomerProps {
    id: string;
    name: string;
    slug: string;
    email: string;
    cpf: string;
    cnpj: string;
    stateRegistration: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    created_at: string;
}

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
    weight: number;
}

interface DeliveryPropos {
    id: string;
    customer_id: string;
    addressee: string;
    address: string;
    number: string;
    complement: string;
    reference: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
    phone: string;
    deliverySelected: string;
    created_at: string;
}

interface FreteProps {
    id: string;
    order_id: string;
    code_tracking: string;
    delivery_history: string;
    created_at: string;
}

const Pedido: React.FC = () => {

    let { order_id } = useParams();

    const [order, setOrder] = useState<OrderProps>();
    const [idOrder, setIdOrder] = useState(Number);
    const [dataOrder, setDataOrder] = useState();
    const [cupom, setCupom] = useState('');
    const [customerDate, setCustomerDate] = useState<CustomerProps>();
    const [cartItens, setCartItens] = useState<{}>();
    const [shipments, setShipments] = useState<FreteProps>();
    const [orderComments, setOrderComments] = useState<{}>();
    const [orderPayment, setOrderPayment] = useState<PaymentProps>();
    const [deliveryOrder, setDeliveryOrder] = useState<DeliveryPropos>();

    const [codeRastreio, setCodeRastreio] = useState("");
    const [keyPix, setKeyPix] = useState("");
    const [keyPixQRCode, setKeyPixQRCode] = useState("");

    const [modalVisibleQRCode, setModalVisibleQRCode] = useState(false);

    const payFrete = Number(order?.frete);
    const totalPay = Number(orderPayment?.total_payment_juros ? orderPayment?.total_payment_juros : orderPayment?.total_payment);
    const payInstallment = Number(orderPayment?.installment_amount);



    const telefone = String(customerDate?.phone);

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace('(', "")
            .replace(')', "")
            .replace(' ', "")
            .replace('-', "")
            .replace('.', "")
            .replace(',', "")
    }

    const tel = removerAcentos(telefone);

    const copyToClipboard = () => {
        copy(keyPix);
        toast.success(`Você copiou o código com sucesso!!!`);
    }

    useEffect(() => {
        async function loadorderdata() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactOrder?order_id=${order_id}`);

                setOrder(data || []);

                setIdOrder(data.id_order_store);
                setCustomerDate(data.customer || {});
                setDataOrder(data.created_at);
                setCupom(data.cupom);
                setCartItens(data.cart || {});
                setShipments(data.shipmentsTrackings || {});
                setOrderComments(data.orderComments || {});
                setOrderPayment(data.payment || {});
                setDeliveryOrder(data.deliveryAddressCustomer || {});/* @ts-ignore */
                setCodeRastreio(order?.shipmentsTrackings[0]?.code_tracking || "");
                setKeyPix(data?.payment?.key_payment_pix || "");
                setKeyPixQRCode(data?.payment?.qr_code_pix || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadorderdata();/* @ts-ignore */
    }, [order?.shipmentsTrackings, order_id]);

    /* @ts-ignore */
    const idShips = String(order?.shipmentsTrackings[0]?.id);

    async function handleCodeRastreio() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/codeTrackingShipping?shippingTracking_id=${idShips}`, {
                code_tracking: codeRastreio
            });

            toast.success("Código aplicado com sucesso...");

            await apiClient.get(`/findAllDateTracking?shippingTracking_id=${idShips}`);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao aplicar o código");
        }
    }




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


    function handleCloseModalQRCode() {
        setModalVisibleQRCode(false);
    }

    async function handleOpenModalQRCode() {
        setModalVisibleQRCode(true);
    }

    Modal.setAppElement('body');


    return (
        <SectionOrder>

            <MainHeader />

            <Card>

                <VoltarNavagation />

                <Titulos
                    tipo="h2"
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
                            <ImagePay src={master} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "visa" ?
                        <TotalTop>
                            <ImagePay src={visa} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "amex" ?
                        <TotalTop>
                            <ImagePay src={american} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Boleto" ?
                        <TotalTop>
                            <ImagePay src={boleto} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "PIX" ?
                        <TotalTop>
                            <ImagePay src={pix} alt="pagamento" />
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

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextStrong>{customerDate?.cnpj ? "Empresa" : "Nome"}</TextStrong>
                            <TextData>{customerDate?.name}</TextData>
                        </BlockData>

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextStrong>Cliente desde</TextStrong>
                            <TextData>{moment(customerDate?.created_at).format('DD/MM/YYYY')}</TextData>
                        </BlockData>

                        {customerDate?.stateRegistration ?
                            <BlockData
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <TextStrong>Inscrição Estadual</TextStrong>
                                <TextData>{customerDate?.stateRegistration}</TextData>
                            </BlockData>
                            :
                            null
                        }

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextStrong>{customerDate?.cnpj ? "CNPJ" : "CPF"}</TextStrong>
                            <TextData>{customerDate?.cnpj ? customerDate?.cnpj : customerDate?.cpf}</TextData>
                        </BlockData>

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextStrong>E-mail</TextStrong>
                            <TextData>{customerDate?.email}</TextData>
                        </BlockData>

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextStrong>Telefone</TextStrong>
                            <TextData>{customerDate?.phone}</TextData>
                            <Linked href={`https://api.whatsapp.com/send?phone=55${tel}`} target="_blank">
                                <WhatsButton>
                                    <BsWhatsapp /> WhatsApp
                                </WhatsButton>
                            </Linked>
                        </BlockData>

                    </Card>

                    <Card>
                        <Titulos
                            tipo="h2"
                            titulo="Envio"
                        />

                        <BlockData>
                            <TextData style={{ display: 'flex', fontWeight: '800' }}>{deliveryOrder?.addressee}</TextData>
                            <TextData>{deliveryOrder?.address} - {deliveryOrder?.number} - {deliveryOrder?.complement} - {deliveryOrder?.reference}</TextData>
                            <br />
                            <br />
                            <TextStrong style={{ fontWeight: '800' }}>Frete</TextStrong>
                            <br />
                            <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}</TextData>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <TextData>{order?.data_delivery}</TextData>
                            <br />
                            <br />
                            <TextData>Peso Total: {order?.weight}Kg</TextData>
                        </BlockData>

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <br />
                            <TextData>CÓDIGO: {codeRastreio}</TextData>
                            <br />
                            <TextoDados
                                chave={"Código de rastreio"}
                                dados={
                                    <InputUpdate
                                        dado={codeRastreio}
                                        type="text"
                                        placeholder={codeRastreio}
                                        value={codeRastreio}
                                        onChange={(e) => setCodeRastreio(e.target.value)}
                                        handleSubmit={handleCodeRastreio}
                                    />
                                }
                            />
                        </BlockData>

                    </Card>

                    <Card>
                        <Titulos
                            tipo="h2"
                            titulo="Pagamento"
                        />

                        <BlockData
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextStrong>Forma de Pagamento</TextStrong>

                            {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "master" ?
                                <>
                                    <TextData
                                        style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}
                                    >
                                        Cartão de Crédito = Master <ImagePay1 src={master} alt="pagamento" />
                                    </TextData>

                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {orderPayment?.cardholder_name}
                                    </TextData>
                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                    </TextData>
                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                    </TextData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor parcelado</TextStrong>
                                        <TextData>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextData>{orderPayment?.transaction_id}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "visa" ?
                                <>
                                    <TextData
                                        style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}
                                    >
                                        Cartão de Crédito = Visa <ImagePay1 src={visa} alt="pagamento" />
                                    </TextData>

                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {orderPayment?.cardholder_name}
                                    </TextData>
                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                    </TextData>
                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                    </TextData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor parcelado</TextStrong>
                                        <TextData>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextData>{orderPayment?.transaction_id}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "amex" ?
                                <>
                                    <TextData
                                        style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}
                                    >
                                        Cartão de Crédito = American Express <ImagePay1 src={american} alt="pagamento" />
                                    </TextData>

                                    <TextData
                                        style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}
                                    >
                                        Cartão de Crédito = Visa <ImagePay1 src={visa} alt="pagamento" />
                                    </TextData>

                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {orderPayment?.cardholder_name}
                                    </TextData>
                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                    </TextData>
                                    <TextData
                                        style={{ marginBottom: '8px' }}
                                    >
                                        Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                    </TextData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor parcelado</TextStrong>
                                        <TextData>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextData>{orderPayment?.transaction_id}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "Boleto" ?
                                <TextData
                                    style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}
                                >
                                    Boleto <ImagePay1 src={boleto} alt="pagamento" />
                                </TextData>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "PIX" ?
                                <>
                                    <BoxPix>
                                        <TextData
                                            style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}
                                        >
                                            PIX <ImagePay1 src={pix} alt="pagamento" />
                                        </TextData>
                                        <TextData>Chave Pix</TextData>
                                        <InputPix
                                            type="text"
                                            value={keyPix}
                                        />
                                        <ButtonPix
                                            onClick={copyToClipboard}
                                        >
                                            <FaRegCopy size={25} />
                                        </ButtonPix>
                                    </BoxPix>

                                    <ButtoQRCode
                                        onClick={handleOpenModalQRCode}
                                    >
                                        Abrir QR Code
                                    </ButtoQRCode>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Chave Válida até</TextStrong>
                                        <TextData>{moment(orderPayment?.key_valid_pix).format('DD/MM/YYYY - HH:mm')}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextData>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextData>
                                    </BlockData>

                                    <BlockData
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    >
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextData>{orderPayment?.transaction_id}</TextData>
                                    </BlockData>
                                </>
                                :
                                null
                            }
                        </BlockData>

                    </Card>
                </GridOrder>

            </Card>
            {modalVisibleQRCode && (
                <ModalQRCodePayment
                    isOpen={modalVisibleQRCode}
                    onRequestClose={handleCloseModalQRCode}
                    qrCode={keyPixQRCode}
                />
            )}
        </SectionOrder>
    )
}

export default Pedido;