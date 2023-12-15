import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { setupAPIClient } from "../../services/api";
import { Content, Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { BlockTop, Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import WalletBoxTax from "../../components/WalletBoxTax";
import WalletBox from "../../components/WalletBox";
import moment from 'moment';
import dolarImg from '../../assets/dolar.svg';
import WalletBoxDate from "../../components/WalletBoxDate";
import cart from '../../assets/cart.svg';
import orders from '../../assets/orders.svg';
import productsImg from '../../assets/products.svg';
import usersVisited from '../../assets/user.svg';
import taxConvert from '../../assets/tax.svg';
import fretes from "../../assets/frete.svg";
import stock from "../../assets/stock.svg";


const Dashboard: React.FC = () => {

    const [totalPaymentsStatus, setTotalPaymentsStatus] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [visited, setVisited] = useState<any[]>([]);
    const [customersDate, setCustomersDate] = useState<any[]>([]);

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Filtrar os dados do mês específico
    const dadosDoMes = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    // Agrupar os dados por dia
    const dadosAgrupados = dadosDoMes.reduce((acc, item) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    // Calcular o somatório para cada dia
    const somatoriosPorDia = Object.keys(dadosAgrupados).map(dia => {
        const faturamento = dadosAgrupados[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { dia, faturamento };
    });

    const dados_do_mes: any = [];
    (somatoriosPorDia || []).forEach((item) => {
        dados_do_mes.push({
            "Dia_do_mes": item.dia,
            "Faturamento_do_dia": item.faturamento
        });
    });

    // DADOS DO MES PASSADO

    const [primeiroDia, setPrimeiroDia] = useState(Date);
    const [ultimoDia, setUltimoDia] = useState(Date);

    useEffect(() => {
        const dataAtual = new Date();
        const primeiroDiaMesPassado = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1, 1);
        const ultimoDiaMesPassado = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
        setPrimeiroDia(primeiroDiaMesPassado.toISOString().split('T')[0]);
        setUltimoDia(ultimoDiaMesPassado.toISOString().split('T')[0]);
    }, []);

    // Filtrar os dados do mês específico
    const dadosDoMesPassado = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= new Date(primeiroDia) && itemDateDay <= new Date(ultimoDia);
    });

    // Agrupar os dados por dia
    const dadosAgrupadosPassado = dadosDoMesPassado.reduce((acc, item) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    // Calcular o somatório para cada dia
    const somatoriosPorDiaPassado = Object.keys(dadosAgrupadosPassado).map(dia => {
        const faturamento = dadosAgrupadosPassado[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { dia, faturamento };
    });
    /* @ts-ignore */
    const past_and_last = somatoriosPorDiaPassado.concat(somatoriosPorDia)

    /* const dados_do_mes_passado: any = [];
    (past_and_last || []).forEach((item) => {
        dados_do_mes_passado.push({
            "Dia do mes passado": item.dia,
            "Faturamento do dia passado": item.somatorioDia,
            "Dia do mes": item
            "Faturamento do dia": item.Faturamento_do_dia
        });
    }); */

    console.log(past_and_last)





    useEffect(() => {
        async function loadDates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/totalStorePayments`);

                setProducts(data?.product);
                setTotalPaymentsStatus(data?.statusOrder);
                setVisited(data?.visitedUser);
                setCustomersDate(data?.customer);

            } catch (error) {
                console.error(error);
            }
        }
        loadDates();
    }, []);



    // VALORES TOTAIS

    /* const datesFilter = totalPayments.map(item => item); */
    /* const paymentsTotal = datesFilter.map(item => item.total_payment_juros ? item.total_payment_juros : item.total_payment);
 
    const totalfaturamentopayments: number = paymentsTotal.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);
 
    const [data, setData] = useState<any []>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
 
    const filterData = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
 
        const filteredData = datesFilter.filter((item) => {
            const itemDate = new Date(moment(item.created_at).format('YYYY-MM-DD'));
            return itemDate >= startDateObj && itemDate <= endDateObj;
        });
 
        setData(filteredData);
    };
 
    const payments = data.map(item => item.total_payment_juros ? item.total_payment_juros : item.total_payment);
 
    const totalfaturamento: number = payments.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0); */

    // VALORES DIA

    const dayAtual = moment(new Date()).format('DD/MM/YYYY');
    const startDateObjDay = new Date(moment().format('YYYY-MM-DD'));
    const endDateObjDay = new Date(moment().format('YYYY-MM-DD'));

    const filteredDataDay = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= startDateObjDay && itemDateDay <= endDateObjDay;
    });

    const filteredDataDayConfirmed = totalPaymentsStatus.filter((item) => {
        const itemDateDayConfirmed = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDayConfirmed >= startDateObjDay && itemDateDayConfirmed <= endDateObjDay;
    });

    const customersDay = customersDate.filter((item) => {
        const itemDateDayConfirmed = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDayConfirmed >= startDateObjDay && itemDateDayConfirmed <= endDateObjDay;
    });

    const visitedStore = visited.filter((item) => {
        const visitedItem = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return visitedItem >= startDateObjDay && visitedItem <= endDateObjDay;
    });

    const paymentsDayTotal = filteredDataDayConfirmed.map(item => item.order.payment.total_payment);

    const paymentsDay = filteredDataDay.map(item => item.order.payment.total_payment);

    const fretesDay = filteredDataDay.map(item => item.order.frete_cupom === 0 ? item.order.frete : item.order.frete_cupom);

    const totalfaturamentoDayTotal: number = paymentsDayTotal.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const totalfaturamentoDayConfirmed: number = paymentsDay.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const totalfreteDayTotal: number = fretesDay.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const visitedUser: number = visitedStore.reduce((acumulador, objeto) => {
        return acumulador + objeto.visited
    }, 0);

    const ticketDay = (filteredDataDay.length / totalfaturamentoDayConfirmed) * 100;

    const convert_users: number = (filteredDataDay.length / visitedUser) * 100;


    // CLIENTES


    const customers = customersDate.filter((item) => {
        const itemCustomer = item.authenticated === true;
        return itemCustomer;
    });


    // PRODUTOS


    const valuesProducts: number = products.reduce((acumulador, objeto) => {
        return acumulador + objeto.promotion
    }, 0);

    const stockAll = products.filter((item) => {
        const itemDateDayConfirmed = item.stock === 0;
        return itemDateDayConfirmed;
    });





    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h2"
                            titulo="Dados do dia"
                        />

                        {/* <div>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />

                            <button onClick={filterData}>Filtrar</button>

                        </div> */}

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
                        />

                        <WalletBox
                            title={`Faturamento confirmado do dia ${dayAtual}`}
                            color="#F7931B"
                            amount={totalfaturamentoDayConfirmed}
                            footerlabel="faturamento total do dia confirmado"
                            image={dolarImg}
                        />

                        <WalletBox
                            title={`Valores em frete do dia ${dayAtual}`}
                            color="#1595eb"
                            amount={totalfreteDayTotal}
                            footerlabel="total em fretes dos pedidos neste dia"
                            image={fretes}
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
                        />

                        <WalletBoxTax
                            title={`Taxa de conversão do dia ${dayAtual}`}
                            color="#4E41F0"
                            amount={convert_users}
                            footerlabel="total de convertido"
                            image={taxConvert}
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

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h2"
                        titulo="Números do mês"
                    />
                    <br />
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
                            <CartesianGrid strokeDasharray="1" />
                            <XAxis dataKey="Dia_do_mes" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="Faturamento_do_dia" stackId="1" stroke='#82caed' fill="#5faf40" />
                            <Legend />
                        </AreaChart>
                    </ResponsiveContainer>
                    <br />
                    <ResponsiveContainer width="100%" aspect={3}>
                        <AreaChart
                            width={500}
                            height={200}
                            data={past_and_last}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="dia" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="faturamento" stackId="1" stroke='#82caed' fill="#5faf40" />
                            <Area type="monotone" dataKey="faturamento" stackId="1" stroke='#82caed' fill="#ffc658" />
                            <Legend />
                        </AreaChart>
                    </ResponsiveContainer>

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h2"
                        titulo="Clientes"
                    />
                    <br />
                    <Content>
                        <WalletBoxDate
                            title="Total de clientes"
                            color="#1595eb"
                            amount={customersDate.length}
                            footerlabel="total de clientes da loja"
                            image={usersVisited}
                            width={49}
                        />

                        <WalletBoxDate
                            title="Clientes ativos"
                            color="#5faf40"
                            amount={customers.length}
                            footerlabel="total de clientes ativos na loja"
                            image={usersVisited}
                            width={49}
                        />
                    </Content>

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h2"
                        titulo="Dados de produtos"
                    />
                    <br />
                    <Content>
                        <WalletBoxDate
                            title="Total de produtos"
                            color="#5faf40"
                            amount={products.length}
                            footerlabel="todos produtos cadastrados na loja"
                            image={productsImg}
                            width={32}
                        />

                        <WalletBoxDate
                            title="Estoque de produtos"
                            color="#1595eb"
                            amount={stockAll.length}
                            footerlabel="produtos faltantes de estoque"
                            image={stock}
                            width={32}
                        />

                        <WalletBox
                            title="Valor em produtos"
                            color="#F7931B"
                            amount={valuesProducts}
                            footerlabel="valor total monetario em produtos"
                            image={dolarImg}
                        />
                    </Content>



                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;