import moment from "moment";
import { BlockTop } from "../../../pages/Categorias/styles";
import Titulos from "../../Titulos";
import { Content } from "./styles";
import WalletBoxDate from "../../WalletBoxDate";
import WalletBox from "../../WalletBox";
import WalletBoxTax from "../../WalletBoxTax";
import dolarImg from '../../../assets/dolar.svg';
import cart from '../../../assets/cart.svg';
import orders from '../../../assets/orders.svg';
import usersVisited from '../../../assets/user.svg';
import taxConvert from '../../../assets/tax.svg';
import fretes from "../../../assets/frete.svg";

interface Day {
    totalPaymentsStatus: any;
    visited: any;
    customersDate: any;
}

const DayDate = ({ totalPaymentsStatus, visited, customersDate }: Day) => {

    const dayAtual = moment(new Date()).format('DD/MM/YYYY');
    const startDateObjDay = new Date(moment().format('YYYY-MM-DD'));
    const endDateObjDay = new Date(moment().format('YYYY-MM-DD'));

    const filteredDataDay = totalPaymentsStatus.filter((item: any) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= startDateObjDay && itemDateDay <= endDateObjDay;
    });

    const filteredDataDayConfirmed = totalPaymentsStatus.filter((item: any) => {
        const itemDateDayConfirmed = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDayConfirmed >= startDateObjDay && itemDateDayConfirmed <= endDateObjDay;
    });

    const customersDay = customersDate.filter((item: any) => {
        const itemDateDayConfirmed = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDayConfirmed >= startDateObjDay && itemDateDayConfirmed <= endDateObjDay;
    });

    const visitedStore = visited.filter((item: any) => {
        const visitedItem = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return visitedItem >= startDateObjDay && visitedItem <= endDateObjDay;
    });

    const paymentsDayTotal = filteredDataDayConfirmed.map((item: { order: { payment: { total_payment: any; }; }; }) => item.order.payment.total_payment);

    const paymentsDay = filteredDataDay.map((item: { order: { payment: { total_payment: any; }; }; }) => item.order.payment.total_payment);

    const fretesDay = filteredDataDay.map((item: { order: { frete_cupom: number; frete: any; }; }) => item.order.frete_cupom === 0 ? item.order.frete : item.order.frete_cupom);

    const totalfaturamentoDayTotal: number = paymentsDayTotal.reduce((acumulador: any, objeto: any) => {
        return acumulador + objeto
    }, 0);

    const totalfaturamentoDayConfirmed: number = paymentsDay.reduce((acumulador: any, objeto: any) => {
        return acumulador + objeto
    }, 0);

    const totalfreteDayTotal: number = fretesDay.reduce((acumulador: any, objeto: any) => {
        return acumulador + objeto
    }, 0);

    const visitedUser: number = visitedStore.reduce((acumulador: any, objeto: any) => {
        return acumulador + objeto.visited
    }, 0);

    const ticketDay = totalfaturamentoDayConfirmed / filteredDataDay.length;

    const convert_users: number = (filteredDataDay.length / visitedUser) * 100;



    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Dados do dia"
                />

            </BlockTop>
            <br />
            <Content>
                <WalletBoxDate
                    title={`Qtd. pedidos hoje ${dayAtual}`}
                    color="#e0232a"
                    amount={filteredDataDayConfirmed.length}
                    footerlabel="todos os pedidos do dia"
                    image={cart}
                    width={32}
                />

                <WalletBoxDate
                    title={`Qtd. pedidos confirmados hoje ${dayAtual}`}
                    color="#5faf40"
                    amount={filteredDataDay.length}
                    footerlabel="todos os pedidos pagos e confirmados do dia"
                    image={orders}
                    width={32}
                />

                <WalletBox
                    title={`Valores total do dia ${dayAtual}`}
                    color="#4E41F0"
                    amount={totalfaturamentoDayTotal}
                    footerlabel="valor total do dia"
                    image={dolarImg}
                    width={32}
                />

                <WalletBox
                    title={`Faturamento confirmado do dia ${dayAtual}`}
                    color="#F7931B"
                    amount={totalfaturamentoDayConfirmed}
                    footerlabel="faturamento total do dia confirmado"
                    image={dolarImg}
                    width={32}
                />

                <WalletBox
                    title={`Valores em frete do dia ${dayAtual}`}
                    color="#1595eb"
                    amount={totalfreteDayTotal}
                    footerlabel="total em fretes dos pedidos neste dia"
                    image={fretes}
                    width={32}
                />

                <WalletBoxDate
                    title={`Visitantes do dia ${dayAtual}`}
                    color="#c9cc00"
                    amount={visitedUser}
                    footerlabel="total de visitantes na loja virtual"
                    image={usersVisited}
                    width={32}
                />

                <WalletBox
                    title={`Ticket médio do dia ${dayAtual}`}
                    color="#5faf40"
                    amount={ticketDay}
                    footerlabel="ticket médio de faturamento"
                    image={dolarImg}
                    width={32}
                />

                <WalletBoxTax
                    title={`Taxa de conversão do dia ${dayAtual}`}
                    color="#4E41F0"
                    amount={convert_users}
                    footerlabel="total de convertido"
                    image={taxConvert}
                    width={32}
                />

                <WalletBoxDate
                    title={`Novos clientes do dia ${dayAtual}`}
                    color="#e0232a"
                    amount={customersDay.length}
                    footerlabel="clientes cadastrados"
                    image={usersVisited}
                    width={32}
                />
            </Content>
        </>
    )
}

export default DayDate