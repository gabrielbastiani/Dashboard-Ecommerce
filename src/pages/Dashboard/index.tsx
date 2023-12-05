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

    const datesFilter = totalPayments.map(item => item.payment);

    console.log("Array de dados", datesFilter)

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([...datesFilter]);

    const handleStartDateChange = (selectedDate: React.SetStateAction<string>) => {
        setStartDate(selectedDate);
        filterData(selectedDate, endDate);
    };

    const handleEndDateChange = (selectedDate: React.SetStateAction<string>) => {
        setEndDate(selectedDate);
        filterData(startDate, selectedDate);
    };

    const filterData = (start: number | React.SetStateAction<string>, end: number | React.SetStateAction<string>) => {
        const filteredList = datesFilter.filter(item => moment(item.created_at).format('YYYY-MM-DD') >= start && moment(item.created_at).format('YYYY-MM-DD') <= end);
        setFilteredData(filteredList);
    };

    const payments = filteredData.map(item => item.total_payment_juros ? item.total_payment_juros : item.total_payment);

    const totalfaturamento = payments.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    


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
                        <label htmlFor="startDateFilter">Data Inicial:</label>
                        <input
                            type="date"
                            id="startDateFilter"
                            value={startDate}
                            onChange={(e) => handleStartDateChange(e.target.value)}
                        />

                        <label htmlFor="endDateFilter">Data Final:</label>
                        <input
                            type="date"
                            id="endDateFilter"
                            value={endDate}
                            onChange={(e) => handleEndDateChange(e.target.value)}
                        />
                        </div>

                    </BlockTop>
                    <br />
                    <Content>
                        <WalletBox
                            title="Faturamento total"
                            color="#5faf40"
                            amount={totalfaturamento}
                            footerlabel="faturamento total da loja"
                        />

                        <WalletBox
                            title="Faturamento do mês"
                            color="#F7931B"
                            amount={2223367}
                            footerlabel="faturamento total do mês"
                        />

                        <WalletBox
                            title="Faturamento do dia"
                            color="#4E41F0"
                            amount={5545}
                            footerlabel="faturamento total do dia"
                        />
                    </Content>

                    <div>
                        <ul>
                            {filteredData.map(item => (
                                <li key={item}>{item.id}</li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;