import React, { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { Content, Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { BlockTop, Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import WalletBox from "../../components/WalletBox";
import moment from 'moment';


const Dashboard: React.FC = () => {

    const [totalPayments, setTotalPayments] = useState<any[]>([]);

    useEffect(() => {
        async function loadDates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/totalStorePayments`);

                setTotalPayments(data);

            } catch (error) {
                console.error(error);
            }
        }
        loadDates();
    }, []);

    // VALORES TOTAIS

    const datesFilter = totalPayments.map(item => item.payment);
    const paymentsTotal = datesFilter.map(item => item.total_payment_juros ? item.total_payment_juros : item.total_payment);

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
    }, 0);

    // VALORES DIA

    const dayAtual = moment(new Date()).format('DD/MM/YYYY');
    const startDateObjDay = new Date(moment().format('YYYY-MM-DD'));
    const endDateObjDay = new Date(moment().format('YYYY-MM-DD'));

    const filteredDataDay = datesFilter.filter((item) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= startDateObjDay && itemDateDay <= endDateObjDay;
    });

    const paymentsDay = filteredDataDay.map(item => item.total_payment_juros ? item.total_payment_juros : item.total_payment);

    const totalfaturamentoDay: number = paymentsDay.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    console.log("Array de dados", datesFilter)
    console.log("Filtro mês", filteredDataDay)
    console.log("Filtrado", datesFilter)




    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Dashboard"
                        />

                        <div>
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

                        </div>

                    </BlockTop>
                    <br />
                    <Content>
                        <WalletBox
                            title="Faturamento total"
                            color="#5faf40"
                            amount={totalfaturamento === 0 ? totalfaturamentopayments : totalfaturamento}
                            footerlabel="faturamento total da loja"
                        />

                        <WalletBox
                            title="Faturamento do mês"
                            color="#F7931B"
                            amount={11111111111}
                            footerlabel="faturamento total do mês"
                        />

                        <WalletBox
                            title={`Faturamento do dia ${dayAtual}`}
                            color="#4E41F0"
                            amount={totalfaturamentoDay}
                            footerlabel="faturamento total do dia"
                        />
                    </Content>

                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;