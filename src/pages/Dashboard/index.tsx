import React, { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Content, Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { BlockTop, Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import WalletBox from "../../components/WalletBox";
import moment from 'moment';
import dolarImg from '../../assets/dolar.svg';
import WalletBoxDate from "../../components/WalletBoxDate";
import cart from '../../assets/cart.svg';
import orders from '../../assets/orders.svg';
import productsImg from '../../assets/products.svg';
import usersVisited from '../../assets/user.svg';
import taxConvert from '../../assets/tax.svg';
import WalletBoxTax from "../../components/WalletBoxTax";


const Dashboard: React.FC = () => {

    const [totalPaymentsStatus, setTotalPaymentsStatus] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [visited, setVisited] = useState<any[]>([]);

    useEffect(() => {
        async function loadDates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/totalStorePayments`);

                setProducts(data?.product);
                setTotalPaymentsStatus(data?.statusOrder);
                setVisited(data?.visitedUser);

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

    const paymentsDayTotal = filteredDataDayConfirmed.map(item => item.order.payment.total_payment_juros ? item.order.payment.total_payment_juros : item.order.payment.total_payment);

    const paymentsDay = filteredDataDay.map(item => item.order.payment.total_payment_juros ? item.order.payment.total_payment_juros : item.order.payment.total_payment);

    const totalfaturamentoDayTotal: number = paymentsDayTotal.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const totalfaturamentoDayConfirmed: number = paymentsDay.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const ticketDay = (filteredDataDay.length / totalfaturamentoDayConfirmed) * 100;


    // PRODUTOS


    const valuesProducts: number = products.reduce((acumulador, objeto) => {
        return acumulador + objeto.promotion
    }, 0);


    // VISITANTES NA LOJA


    const visitedStore = visited.filter((item) => {
        const visitedItem = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return visitedItem >= startDateObjDay && visitedItem <= endDateObjDay;
    });

    const visitedUser: number = visitedStore.reduce((acumulador, objeto) => {
        return acumulador + objeto.visited
    }, 0);

    const convert_users: number = (filteredDataDay.length / visitedUser) * 100;





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
                        />

                        <WalletBoxDate
                            title={`Qtd. pedidos confirmados hoje ${dayAtual}`}
                            color="#5faf40"
                            amount={filteredDataDay.length}
                            footerlabel="todos os pedidos pagos e confirmados do dia"
                            image={orders}
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

                        <WalletBoxDate
                            title={`Visitantes do dia ${dayAtual}`}
                            color="#c9cc00"
                            amount={visitedUser}
                            footerlabel="total de visitantes na loja virtual"
                            image={usersVisited}
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
                            footerlabel="Todos produtos cadastrados na loja"
                            image={productsImg}
                        />

                        <WalletBox
                            title="Valor em produtos"
                            color="#F7931B"
                            amount={valuesProducts}
                            footerlabel="Valor total monetario em produtos"
                            image={dolarImg}
                        />

                    </Content>

                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;