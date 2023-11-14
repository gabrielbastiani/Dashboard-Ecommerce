import { Key, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import MainHeader from "../../../components/MainHeader";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import Modal from 'react-modal';
import moment from "moment";
import {
    AtributeProduct,
    BoxComment,
    BoxData,
    BoxDataProduct,
    BoxPix,
    BoxPriceProductCart,
    BoxPrices,
    BoxPricesTotalProduct,
    BoxProductCart,
    BoxTopStatusGeral,
    BoxTotal,
    BoxTracking,
    ButtoQRCode,
    ButtonPix,
    ButtonSendComment,
    Comments,
    ContainerComments,
    ContainerCommets,
    DataComment,
    DateTracking,
    EtiquetaComment,
    GridOrder,
    ImageComment,
    ImagePay,
    ImagePay1,
    ImageProduct,
    ImageProductCart,
    InputPix,
    Linked,
    NameProduct,
    PriceProduct,
    PriceProductData,
    SectionOrder,
    Sku,
    StatusTop,
    TextComment,
    TextDataOrder,
    TextTotal,
    TextUser,
    TotalFrete,
    TotalOrder,
    TotalTop,
    WhatsButton
} from "./styles";
import { FaCommentDots, FaRegCopy, FaTruckMoving } from "react-icons/fa";
import boleto from '../../../assets/boleto.png';
import MASTERCARD from '../../../assets/mastercard.png';
import VISA from '../../../assets/visa.png';
import american from '../../../assets/american.png';
import pix from '../../../assets/pix.png';
import { BlockData, TextData, TextStrong } from "../../Clientes/Contrapropostas/styles";
import { BsWhatsapp } from "react-icons/bs";
import copy from "copy-to-clipboard";
import { ModalQRCodePayment } from "../../../components/popups/ModalQRCodePayment";
import { Block, Etiqueta } from "../../Categorias/styles";
import { BlockInputs, BoxActive, RadioBotton } from "../../Banners/styles";
import privateComment from "../../../assets/user-comment-private.png";
import { AuthContext } from "../../../contexts/AuthContext";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import { DivisorHorizontal } from "../../../components/ui/DivisorHorizontal";


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
    created_at: string;
    cardholder_name: string;
    cardholder_identification_cpfCnpj: string;
    cardholder_cpfCnpj: string;
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
    name_cupom: string;
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

const Pedido: React.FC = () => {

    const { admin } = useContext(AuthContext);
    let { order_id } = useParams();

    const [order, setOrder] = useState<OrderProps>();
    const [idOrder, setIdOrder] = useState(Number);
    const [orderStatus, setOrderStatus] = useState("");
    const [dataOrder, setDataOrder] = useState();
    const [customerDate, setCustomerDate] = useState<CustomerProps>();
    const [cartItens, setCartItens] = useState<any[]>([]);
    const [orderPayment, setOrderPayment] = useState<PaymentProps>();
    const [deliveryOrder, setDeliveryOrder] = useState<DeliveryPropos>();

    const [keyPix, setKeyPix] = useState("");
    const [keyPixQRCode, setKeyPixQRCode] = useState("");

    const [store, setStore] = useState("");
    const [logoStore, setLogoStore] = useState("");
    const [commentOrder, setCommentOrder] = useState("");
    const [comments, setComments] = useState<any[]>([]);

    const [trackingHistory, setTrackingHistory] = useState<any[]>([]);
    const [codeTracking, setCodeTracking] = useState("");

    const [statusSelected, setStatusSelected] = useState();
    const [orderStatusID, setOrderStatusID] = useState("");
    const [statusOrderSelected, setStatusOrderSelected] = useState();

    function handleChangeStatus(e: any) {
        setStatusSelected(e.target.value);
    }

    function handleChangeStatusOrder(e: any) {
        setStatusOrderSelected(e.target.value);
    }

    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    const [trackingShow, setTrackingShow] = useState(false);

    const showTracking = () => {
        setTrackingShow(!trackingShow)
    }

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
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/store`);
                setStore(data.name || "");
                setLogoStore(data.logo || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, []);

    useEffect(() => {
        async function loadorderdata() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactOrder?order_id=${order_id}`);

                setOrder(data || []);

                setIdOrder(data.id_order_store);
                setCustomerDate(data.customer || {});
                setDataOrder(data.created_at);
                setCartItens(data.cart || []);
                setOrderPayment(data.payment || {});
                setDeliveryOrder(data.deliveryAddressCustomer || {});
                setKeyPix(data?.payment?.key_payment_pix || "");
                setKeyPixQRCode(data?.payment?.qr_code_pix || "");
                setOrderStatus(data?.statusOrder[0]?.status_order || "");
                setOrderStatusID(data?.statusOrder[0]?.id || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadorderdata();
    }, [order_id]);

    async function loadOrderData() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/exactOrder?order_id=${order_id}`);

            setOrderStatus(data?.statusOrder[0]?.status_order || "");

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    /* @ts-ignore */
    const idShips = String(order?.shipmentsTrackings[0]?.id);

    useEffect(() => {
        async function loadRastreio() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findAllDateTracking?shippingTracking_id=${idShips}`);

                setTrackingHistory(data || []);
                setCodeTracking(data.code_tracking);

            } catch (error) {
                console.log(error);
            }
        }
        loadRastreio();
    }, [idShips]);

    async function updateStatusOrder() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateStatusOrder?statusOrder_id=${orderStatusID}`, {
                status_order: statusOrderSelected
            });

            loadOrderData();
            toast.success("Status do pedido alterado com sucesso");

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("OPS... Erro ao alterar o status do pedido");
        }
    }

    async function loadRastreio() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/findAllDateTracking?shippingTracking_id=${idShips}`);

            setTrackingHistory(data || []);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleTracking() {
        const apiClient = setupAPIClient();
        try {
            if (codeTracking === "") {
                toast.error("Não deixe o campo código de rastreio em branco!!!");
                return;
            }
            await apiClient.post(`/codeTrackingShipping`, {
                shippingTracking_id: idShips,
                code_tracking: codeTracking,
                status_frete: "postado"
            });

            toast.success("Código aplicado com sucesso...");

            setCodeTracking("");
            showTracking();
            loadRastreio();

            await apiClient.get(`/sendEmailOrderFreteStatus?order_id=${order_id}&status_frete=postado`);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao aplicar o código");
        }
    }

    async function handleTrackingNext() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/codeTrackingShipping`, {
                shippingTracking_id: idShips,
                status_frete: statusSelected
            });

            toast.success("Rastreio atualizado com sucesso...");

            loadRastreio();

            await apiClient.get(`/sendEmailOrderFreteStatus?order_id=${order_id}&status_frete=${statusSelected}`);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao aplicar o código");
        }
    }

    async function updateCodeTracking() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateCodeTracking?shippingTracking_id=${idShips}`, {
                code_tracking: codeTracking
            });

            toast.success("Código atualizado com sucesso...");

            loadRastreio();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao aplicar o código");
        }
    }

    useEffect(() => {
        async function loadCommentsOrder() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/orderComments?order_id=${order_id}`);
                setComments(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCommentsOrder();
    }, [order_id]);

    async function loadCommentsOrder() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/orderComments?order_id=${order_id}`);
            setComments(data || []);
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    const storeCommentUser = `${store} / ${admin.name}`

    async function handleCommentsOrder() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/createOrderComments`, {
                comment: commentOrder,
                order_id: order_id,
                user_comment: storeCommentUser,
                active: active
            });

            toast.success("Comentários adicionado com sucesso");
            setCommentOrder("");
            loadCommentsOrder();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Ops... erro ao adicionar esse comentario");
        }
    }

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

                <Titulos tipo="h2" titulo={`Pedido - #${idOrder} | Data: ${moment(dataOrder).format('DD/MM/YYYY - HH:mm')}`} />

                <BoxTopStatusGeral>
                    {orderStatus === "PENDING" ?
                        <StatusTop style={{
                            backgroundColor: 'yellow',
                            color: 'black'
                        }}>
                            Pendente de Pagamento
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "CONFIRMED" ?
                        <StatusTop style={{
                            backgroundColor: 'green',
                            color: 'white'
                        }}>
                            Pago
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "AWAITING_RISK_ANALYSIS" ?
                        <StatusTop style={{
                            backgroundColor: 'orange',
                            color: 'white'
                        }}>
                            Procesando
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "REFUNDED" ?
                        <StatusTop style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}>
                            Rejeitado
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "RECEIVED" ?
                        <StatusTop style={{
                            backgroundColor: 'orange',
                            color: 'white'
                        }}>
                            Saldo creditado
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "OVERDUE" ?
                        <StatusTop style={{
                            backgroundColor: 'blue',
                            color: 'white'
                        }}>
                            Cobrança vencida
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "CANCELLED" ?
                        <StatusTop style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}>
                            Cancelado
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "CANCELLED" ?
                        <StatusTop style={{
                            backgroundColor: 'brown',
                            color: 'white'
                        }}>
                            Devolvido
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "CHARGEBACK_REQUESTED" ?
                        <StatusTop style={{
                            backgroundColor: 'white',
                            color: 'black'
                        }}>
                            Estornado
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "REFUND_REQUESTED" ?
                        <StatusTop style={{
                            backgroundColor: 'gray',
                            color: 'white'
                        }}>
                            Estorno Solicitado
                        </StatusTop>
                        :
                        null
                    }

                    {orderStatus === "REFUND_IN_PROGRESS" ?
                        <StatusTop style={{
                            backgroundColor: 'violet',
                            color: 'white'
                        }}>
                            Estorno em processo
                        </StatusTop>
                        :
                        null
                    }

                    <TotalFrete>
                        <FaTruckMoving size={20} />
                        Frete: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}
                    </TotalFrete>

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "MASTERCARD" ?
                        <TotalTop>
                            <ImagePay src={MASTERCARD} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "VISA" ?
                        <TotalTop>
                            <ImagePay src={VISA} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "AMEX" ?
                        <TotalTop>
                            <ImagePay src={american} alt="pagamento" />
                            Total + {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}
                        </TotalTop>
                        :
                        null
                    }

                    {orderPayment?.type_payment === "Boleto bancário" ?
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
                <br />
                <br />
                <Block
                    style={{ width: '20%' }}
                >
                    <Etiqueta>Alterar status do pedido</Etiqueta>
                    <Select
                        value={statusOrderSelected}
                        opcoes={
                            [
                                { label: "Pendente", value: "PENDING" },
                                { label: "Aprovado", value: "CONFIRMED" },
                                { label: "Recebida (saldo já creditado na conta)", value: "RECEIVED" },
                                { label: "Cobrança Vencida", value: "OVERDUE" },
                                { label: "Cobrança Estornada", value: "REFUNDED" },
                                { label: "Estorno Solicitado", value: "REFUND_REQUESTED" },
                                { label: "Estorno em processamento (liquidação já está agendada, cobrança será estornada após executar a liquidação)", value: "REFUND_IN_PROGRESS" },
                                { label: "Pagamento em análise", value: "AWAITING_RISK_ANALYSIS" },
                                { label: "Pedido Cancelado", value: "CANCELLED" }
                            ]
                        }/* @ts-ignore */
                        onChange={handleChangeStatusOrder}
                    />

                    <Button
                        onClick={updateStatusOrder}
                    >
                        Alterar
                    </Button>
                </Block>

                <GridOrder>
                    <Card>
                        <Titulos tipo="h2" titulo="Cliente" />

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong>{customerDate?.cnpj ? "Empresa" : "Nome"}</TextStrong>
                            <TextDataOrder>{customerDate?.name}</TextDataOrder>
                        </BlockData>

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong>Cliente desde</TextStrong>
                            <TextDataOrder>{moment(customerDate?.created_at).format('DD/MM/YYYY')}</TextDataOrder>
                        </BlockData>

                        {customerDate?.stateRegistration ?
                            <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextStrong>Inscrição Estadual</TextStrong>
                                <TextDataOrder>{customerDate?.stateRegistration}</TextDataOrder>
                            </BlockData>
                            :
                            null
                        }

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong>{customerDate?.cnpj ? "CNPJ" : "CPF"}</TextStrong>
                            <TextDataOrder>{customerDate?.cnpj ? customerDate?.cnpj : customerDate?.cpf}</TextDataOrder>
                        </BlockData>

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong>E-mail</TextStrong>
                            <TextDataOrder>{customerDate?.email}</TextDataOrder>
                        </BlockData>

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong>Telefone</TextStrong>
                            <TextDataOrder>{customerDate?.phone}</TextDataOrder>
                            <Linked href={`https://api.whatsapp.com/send?phone=55${tel}`} target="_blank">
                                <WhatsButton>
                                    <BsWhatsapp /> WhatsApp
                                </WhatsButton>
                            </Linked>
                        </BlockData>

                    </Card>

                    <Card>
                        <Titulos tipo="h2" titulo="Envio" />

                        <BlockData>
                            <TextDataOrder style={{ display: 'flex', fontWeight: '800' }}>{deliveryOrder?.addressee}</TextDataOrder>
                            <TextDataOrder>{deliveryOrder?.address} - {deliveryOrder?.number} - {deliveryOrder?.complement} - {deliveryOrder?.reference}</TextDataOrder>
                            <br />
                            <br />
                            <TextStrong style={{ fontWeight: '800' }}>Frete</TextStrong>
                            <br />
                            <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payFrete)}</TextDataOrder>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <TextDataOrder>{order?.data_delivery}</TextDataOrder>
                            <br />
                            <br />
                            <TextDataOrder>Peso Total: {order?.weight}Kg</TextDataOrder>
                        </BlockData>

                        {trackingHistory.length >= 1 ?
                            <>
                                <Block>
                                    <Etiqueta>Status da entrega:</Etiqueta>
                                    <Select
                                        value={statusSelected}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Pedido postado", value: "postado" },
                                                { label: "Em transito", value: "transito" },
                                                { label: "Aguardando retirada", value: "aguardando" },
                                                { label: "Entregue", value: "entregue" }
                                            ]
                                        }/* @ts-ignore */
                                        onChange={handleChangeStatus}
                                    />

                                    <Button
                                        onClick={handleTrackingNext}
                                    >
                                        Cadastrar
                                    </Button>
                                </Block>

                                <DivisorHorizontal />

                                <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                    <br />
                                    <TextDataOrder>STATUS: {trackingHistory[0].status_frete}</TextDataOrder>
                                    <br />
                                    <TextDataOrder>CÓDIGO: {trackingHistory[0].code_tracking}</TextDataOrder>
                                    <br />
                                    <DateTracking>DATA DA POSTAGEM: {moment(trackingHistory[0].created_at).format('DD/MM/YYYY - HH:mm')}</DateTracking>
                                    <br />
                                    <TextoDados
                                        chave={"Código de rastreio"}
                                        dados={
                                            <InputUpdate
                                                dado={trackingHistory[0].code_tracking}
                                                type="text"
                                                placeholder={codeTracking}
                                                value={codeTracking}
                                                onChange={(e) => setCodeTracking(e.target.value)}
                                                handleSubmit={updateCodeTracking}
                                            />
                                        }
                                    />
                                </BlockData>

                                <DivisorHorizontal />
                            </>
                            :
                            <>
                                <Block>
                                    <Etiqueta>Código de rastreio:</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite aqui..."
                                        value={codeTracking}
                                        onChange={(e) => setCodeTracking(e.target.value)}
                                    />
                                </Block>

                                <Button
                                    onClick={handleTracking}
                                >
                                    Cadastrar
                                </Button>
                            </>
                        }

                        {trackingHistory.map((item, index) => {
                            return (
                                <>
                                    <BoxTracking key={index}>
                                        <TextDataOrder>STATUS: {item.status_frete}</TextDataOrder>
                                        <DateTracking>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DateTracking>
                                        <DivisorHorizontal />
                                    </BoxTracking>
                                </>
                            )
                        })}

                    </Card>

                    <Card>
                        <Titulos tipo="h2" titulo="Pagamento" />

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong>Forma de Pagamento</TextStrong>

                            {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "MASTERCARD" ?
                                <>
                                    <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                        Cartão de Crédito = Master
                                        <ImagePay1 src={MASTERCARD} alt="pagamento" />
                                    </TextDataOrder>

                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        {orderPayment?.cardholder_name}
                                    </TextDataOrder>
                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                    </TextDataOrder>
                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                    </TextDataOrder>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor parcelado</TextStrong>
                                        <TextDataOrder>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextDataOrder>{orderPayment?.transaction_id}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "VISA" ?
                                <>
                                    <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                        Cartão de Crédito = Visa
                                        <ImagePay1 src={VISA} alt="pagamento" />
                                    </TextDataOrder>

                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        {orderPayment?.cardholder_name}
                                    </TextDataOrder>
                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                    </TextDataOrder>
                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                    </TextDataOrder>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor parcelado</TextStrong>
                                        <TextDataOrder>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextDataOrder>{orderPayment?.transaction_id}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "Cartão de Crédito" && orderPayment.flag_credit_card === "AMEX" ?
                                <>
                                    <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                        Cartão de Crédito = American Express
                                        <ImagePay1 src={american} alt="pagamento" />
                                    </TextDataOrder>

                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        {orderPayment?.cardholder_name}
                                    </TextDataOrder>
                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        {orderPayment?.first_number_credit_card}******{orderPayment?.last_number_credit_card}
                                    </TextDataOrder>
                                    <TextDataOrder style={{ marginBottom: '8px' }}>
                                        Expira em {orderPayment?.expiration_month}/{orderPayment?.expiration_year}
                                    </TextDataOrder>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor parcelado</TextStrong>
                                        <TextDataOrder>{orderPayment?.installment}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payInstallment)}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextDataOrder>{orderPayment?.transaction_id}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "Boleto bancário" ?
                                <>
                                    <TextDataOrder style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                        Boleto
                                        <ImagePay1 src={boleto} alt="pagamento" />
                                    </TextDataOrder>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextDataOrder>{orderPayment?.transaction_id}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                    </BlockData>
                                </>
                                :
                                null
                            }

                            {orderPayment?.type_payment === "PIX" ?
                                <>
                                    <BoxPix>
                                        <TextData style={{ display: 'inline-flex', alignItems: 'center', marginTop: '13px' }}>
                                            PIX
                                            <ImagePay1 src={pix} alt="pagamento" />
                                        </TextData>
                                        <TextData>Chave Pix</TextData>
                                        <InputPix type="text" value={keyPix} />
                                        <ButtonPix onClick={copyToClipboard}>
                                            <FaRegCopy size={25} />
                                        </ButtonPix>
                                    </BoxPix>

                                    <ButtoQRCode onClick={handleOpenModalQRCode}>
                                        Abrir QR Code
                                    </ButtoQRCode>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Chave Válida até</TextStrong>
                                        <TextDataOrder>{moment(orderPayment?.key_valid_pix).format('DD/MM/YYYY - HH:mm')}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>Valor Total</TextStrong>
                                        <TextDataOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TextDataOrder>
                                    </BlockData>

                                    <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextStrong>ID Transação</TextStrong>
                                        <TextDataOrder>{orderPayment?.transaction_id}</TextDataOrder>
                                    </BlockData>
                                </>
                                :
                                null
                            }
                        </BlockData>

                    </Card>
                </GridOrder>

                {order?.cupom ? (
                    <Card>
                        <Titulos tipo="h2" titulo="Detalhes Adicionais" />

                        <BlockData style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextStrong style={{ fontSize: '20px', marginBottom: '5px' }}>Promoções</TextStrong>
                            <br />
                            <TextDataOrder style={{ fontWeight: '00' }}>Nome do cupom: {order?.name_cupom}</TextDataOrder>
                            <br />
                            <TextDataOrder style={{ fontWeight: '00' }}>Código de cupom: {order?.cupom}</TextDataOrder>
                        </BlockData>

                    </Card>
                ) :
                    null
                }

                {cartItens.map((prod, index: Key) => {
                    return (
                        <BoxProductCart key={index}>
                            <ImageProductCart>
                                <ImageProduct src={'http://localhost:3333/files/' + prod?.product?.photoproducts[0]?.image} width={80} height={80} alt={prod?.product?.name} />
                            </ImageProductCart>

                            <BoxDataProduct>
                                <BoxData>
                                    <Sku>SKU: {prod?.product?.sku}</Sku>
                                    <NameProduct>{prod?.product?.name}</NameProduct>
                                    {prod?.product?.relationattributeproducts.map((atr: any, index: Key) => {
                                        return (
                                            <AtributeProduct key={index}>{atr?.valueAttribute?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                        )
                                    })}
                                </BoxData>
                            </BoxDataProduct>

                            <BoxPricesTotalProduct>
                                <BoxPrices>
                                    <PriceProductData
                                        style={{ fontSize: '16px' }}
                                    >
                                        {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion ? prod?.product?.promotion : prod?.product?.price)}
                                    </PriceProductData>
                                </BoxPrices>
                            </BoxPricesTotalProduct>

                            <BoxPriceProductCart>
                                <PriceProduct>Qtd: {prod?.amount}</PriceProduct>
                            </BoxPriceProductCart>

                            <BoxPricesTotalProduct>
                                <BoxPrices>
                                    <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion ? prod?.product?.promotion * prod?.amount : prod?.product?.price * prod?.amount)}</PriceProductData>
                                </BoxPrices>
                            </BoxPricesTotalProduct>
                        </BoxProductCart>
                    )
                })}

                <Card>
                    <BoxTotal>
                        <TextTotal>TOTAL:</TextTotal>
                        <TotalOrder>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPay)}</TotalOrder>
                    </BoxTotal>
                </Card>

                <Card>
                    <Titulos tipo="h3" titulo="Comentários" />

                    <ContainerCommets>
                        <TextComment
                            value={commentOrder}
                            onChange={(e) => setCommentOrder(e.target.value)}
                        />

                        <ButtonSendComment
                            onClick={handleCommentsOrder}
                        >
                            <FaCommentDots size={25} />
                            POSTAR
                        </ButtonSendComment>
                    </ContainerCommets>

                    <Block>
                        <BlockInputs>
                            <BoxActive>
                                <EtiquetaComment>Deixar comentário público para o cliente</EtiquetaComment>
                                <RadioBotton
                                    type="checkbox"
                                    value={active}
                                    onClick={handleChecked}
                                    onChange={() => setActive(check ? "Nao" : "Sim")}
                                    checked={check}
                                />
                            </BoxActive>
                        </BlockInputs>
                    </Block>

                    {comments.map((item, index: Key) => {
                        return (
                            <ContainerComments key={index}>
                                <DataComment>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</DataComment>
                                <BoxComment>
                                    <ImageComment src={item.active === "Sim" ? 'http://localhost:3333/files/' + logoStore : privateComment} alt="foto-comentario" />
                                    <Comments><TextUser>{item.user_comment} = </TextUser>{item.comment}</Comments>
                                </BoxComment>
                            </ContainerComments>
                        )
                    })}

                </Card>

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