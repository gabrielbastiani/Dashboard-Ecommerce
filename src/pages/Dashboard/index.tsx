import React from "react";
import { Content, Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { BlockTop, Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import WalletBox from "../../components/WalletBox";


const Dashboard: React.FC = () => {

    



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

                        

                    </BlockTop>
                    <br />
                    <Content>
                        <WalletBox
                            title="Faturamento total"
                            color="#5faf40"
                            amount={111122343}
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
                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;