import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import Titulos from "../../Titulos";
import { Content } from "./styles";
import WalletBoxDate from "../../WalletBoxDate";
import WalletBox from "../../WalletBox";
import WalletBoxTax from "../../WalletBoxTax";
import dolarImg from '../../../assets/dolar.svg';
import orders from '../../../assets/orders.svg';
import usersVisited from '../../../assets/user.svg';
import taxConvert from '../../../assets/tax.svg';

interface Month {
    totalPaymentsStatus: any;
    visited: any;
}

const MonthCurrent = ({ totalPaymentsStatus, visited }: Month) => {

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const dadosDoMes = totalPaymentsStatus.filter((item: any) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const dadosAgrupados = dadosDoMes.reduce((acc: any, item: any) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDia = Object.keys(dadosAgrupados).map(dia => {
        const faturamento = dadosAgrupados[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { dia, faturamento };
    });

    const dados_do_mes: any = [];
    (somatoriosPorDia || []).forEach((item) => {
        dados_do_mes.push({
            "Dia_do_mes": item.dia,
            "Faturamento": item.faturamento
        });
    });

    const total_mes: number = dados_do_mes.reduce(function (acumulador: any, objetoAtual: { Faturamento: any; }) {
        return acumulador + objetoAtual.Faturamento;
    }, 0);

    const visitedStoreMonth = visited.filter((item: any) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const visitedUserMonth: number = visitedStoreMonth.reduce((acumulador: any, objeto: any) => {
        return acumulador + objeto.visited
    }, 0);

    const ticketMonth = total_mes / dadosDoMes.length;

    const convert_users_month: number = (dadosDoMes.length / visitedUserMonth) * 100;



    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Números do mês"
            />
            <br />
            <br />
            <Content>
                <WalletBox
                    title="Vendas do mês"
                    color="#1595eb"
                    amount={total_mes}
                    footerlabel="vendas totais desse mês"
                    image={dolarImg}
                    width={49}
                />

                <WalletBoxDate
                    title="Pedidos do mês"
                    color="#5faf40"
                    amount={dadosDoMes.length}
                    footerlabel="total de pedidos desse mês"
                    image={orders}
                    width={49}
                />
                <WalletBoxDate
                    title="Acessos do mês"
                    color="#c9cc00"
                    amount={visitedStoreMonth.length}
                    footerlabel="total de acessos desse mês"
                    image={usersVisited}
                    width={49}
                />

                <WalletBoxTax
                    title="Taxa de conversão do mês"
                    color="#F7931B"
                    amount={convert_users_month}
                    footerlabel="total de conversões de pedidos desse mês"
                    image={taxConvert}
                    width={49}
                />

                <WalletBox
                    title="Ticket médio do mês"
                    color="#e0232a"
                    amount={ticketMonth}
                    footerlabel="montante médio relativo desse mês"
                    image={dolarImg}
                    width={100}
                />
            </Content>
            <br />
            <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                    width={500}
                    height={200}
                    data={dados_do_mes}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey="Dia_do_mes" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Faturamento" stackId="1" stroke='#82caed' fill="#5faf40" />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}

export default MonthCurrent