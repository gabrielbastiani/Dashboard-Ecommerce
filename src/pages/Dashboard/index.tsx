import React from "react";
import { Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";

const Dashboard: React.FC = () => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>

                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;