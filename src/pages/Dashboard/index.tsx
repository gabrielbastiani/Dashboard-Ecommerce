import { Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import DayDate from "../../components/Dashboard/DayDate";
import MonthCurrent from "../../components/Dashboard/MonthCurrent";
import PaymentsTypes from "../../components/Dashboard/PaymentsTypes";
import MonthsRelations from "../../components/Dashboard/MonthsRelations";
import MonthsWithBilling from "../../components/Dashboard/MonthsWithBilling";
import CurrentTotalDateStore from "../../components/Dashboard/CurrentTotalDateStore";
import CustomersDate from "../../components/Dashboard/CustomersDate";
import ProductsDate from "../../components/Dashboard/ProductsDate";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";


const Dashboard: React.FC = () => {

    const [totalPaymentsStatus, setTotalPaymentsStatus] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [visited, setVisited] = useState<any[]>([]);
    const [customersDate, setCustomersDate] = useState<any[]>([]);
    const [typesPayments, setTypesPayments] = useState<any[]>([]);


    useEffect(() => {
        async function loadDates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/totalStorePayments`);

                setProducts(data?.product);
                setTotalPaymentsStatus(data?.statusOrder);
                setVisited(data?.visitedUser);
                setCustomersDate(data?.customer);
                setTypesPayments(data?.typespayment);

            } catch (error) {
                console.error(error);
            }
        }
        loadDates();
    }, []);

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>

                    <DayDate
                        totalPaymentsStatus={totalPaymentsStatus}
                        visited={visited}
                        customersDate={customersDate}
                    />

                    <DivisorHorizontal />

                    <MonthCurrent
                        totalPaymentsStatus={totalPaymentsStatus}
                        visited={visited}
                    />
                    <br />
                    <br />
                    <PaymentsTypes
                        typesPayments={typesPayments}
                    />
                    <br />
                    <br />
                    <MonthsRelations
                        totalPaymentsStatus={totalPaymentsStatus}
                    />
                    <br />
                    <br />
                    <MonthsWithBilling
                        totalPaymentsStatus={totalPaymentsStatus}
                    />

                    <DivisorHorizontal />

                    <CurrentTotalDateStore
                        totalPaymentsStatus={totalPaymentsStatus}
                        visited={visited}
                        typesPayments={typesPayments}
                    />

                    <DivisorHorizontal />

                    <CustomersDate
                        customersDate={customersDate}
                    />

                    <DivisorHorizontal />

                    <ProductsDate
                        products={products}
                    />
                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;