import { useState } from "react";
import moment from "moment";
import { BlockTop } from "../../../pages/Categorias/styles";
import Titulos from "../../Titulos";
import { BoxFilterData, ButtonFilterData, Content, InputData } from "./styles";
import WalletBoxDate from "../../WalletBoxDate";
import WalletBox from "../../WalletBox";
import dolarImg from '../../../assets/dolar.svg';
import orders from '../../../assets/orders.svg';
import usersVisited from '../../../assets/user.svg';
import boleto from '../../../assets/boleto.png';
import cartao from '../../../assets/credit-card.png';
import pix from '../../../assets/pix.png';


interface CurrentDate {
    totalPaymentsStatus: any;
    visited: any;
    typesPayments: any;
}

const CurrentTotalDateStore = ({ totalPaymentsStatus, visited, typesPayments }: CurrentDate) => {

    const datesFilter = totalPaymentsStatus.map((item: any) => item);

    const [data_total, setData_total] = useState<any[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filterData = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const filteredData = datesFilter.filter((item: any) => {
            const itemDate = new Date(moment(item.created_at).format('YYYY-MM-DD'));
            return itemDate >= startDateObj && itemDate <= endDateObj;
        });

        setData_total(filteredData);
    };

    const total_date = data_total.length === 0 ? totalPaymentsStatus : data_total.filter((item) => {
        const item_total = item.status_order === "CONFIRMED";
        return item_total;
    });

    const visitedStoreAll = visited.filter((item: any) => {
        const visitedItem = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return visitedItem >= new Date(startDate) && visitedItem <= new Date(endDate);
    });

    const total_faturamento: number = total_date.reduce(function (acumulador: any, objetoAtual: any) {
        return acumulador + objetoAtual.order.payment.total_payment;
    }, 0);

    const typesPaymentFilter: any[] = typesPayments.filter((item: any) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= new Date(startDate) && itemDateDay <= new Date(endDate);
    });

    const total_boleto_sem_filtro = typesPayments.reduce((total: any, item: any) => total + item.qtd_type_boleto, 0);
    const total_cartao_sem_filtro = typesPayments.reduce((total: any, item: any) => total + item.qtd_type_cartao, 0);
    const total_pix_sem_filtro = typesPayments.reduce((total: any, item: any) => total + item.qtd_type_pix, 0);

    const total_boleto = typesPaymentFilter.reduce((total: any, item: any) => total + item.qtd_type_boleto, 0);
    const total_cartao = typesPaymentFilter.reduce((total: any, item: any) => total + item.qtd_type_cartao, 0);
    const total_pix = typesPaymentFilter.reduce((total: any, item: any) => total + item.qtd_type_pix, 0);



    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Números totais"
                />

                <BoxFilterData>
                    <InputData
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <InputData
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    <ButtonFilterData onClick={filterData}>Filtrar</ButtonFilterData>
                </BoxFilterData>
            </BlockTop>
            <br />
            <br />
            <Content>
                <WalletBox
                    title="Faturamento total"
                    color="#1595eb"
                    amount={total_faturamento}
                    footerlabel="faturamento total da loja"
                    image={dolarImg}
                    width={32}
                />

                <WalletBoxDate
                    title="Total de pedidos"
                    color="#5faf40"
                    amount={total_date.length}
                    footerlabel="todos os pedidos efetivados na loja"
                    image={orders}
                    width={32}
                />
                <WalletBoxDate
                    title="Acessos totais"
                    color="#c9cc00"
                    amount={visitedStoreAll.length === 0 ? visited.length : visitedStoreAll.length}
                    footerlabel="quantidade total de acessos na loja"
                    image={usersVisited}
                    width={32}
                />

                <WalletBoxDate
                    title="Pagamentos por boleto bancario"
                    color="#F7931B"
                    amount={total_boleto === 0 ? total_boleto_sem_filtro : total_boleto}
                    footerlabel="total de pagamentos feitos com boletos bancarios"
                    image={boleto}
                    width={32}
                />

                <WalletBoxDate
                    title="Pagamentos por cartão de crédito"
                    color="#e0232a"
                    amount={total_cartao === 0 ? total_cartao_sem_filtro : total_cartao}
                    footerlabel="total de pagamentos feitos com cartão de crédito"
                    image={cartao}
                    width={32}
                />

                <WalletBoxDate
                    title="Pagamentos por PIX"
                    color="#1595eb"
                    amount={total_pix === 0 ? total_pix_sem_filtro : total_pix}
                    footerlabel="total de pagamentos feitos com pix"
                    image={pix}
                    width={32}
                />
            </Content>
        </>
    )
}

export default CurrentTotalDateStore