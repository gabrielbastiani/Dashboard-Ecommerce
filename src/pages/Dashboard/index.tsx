import React from "react";
import { Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Content from "../../components/Content";
import Warnings from "../../components/Warnings";

const Dashboard: React.FC = () => {
    return (
        <Grid>
            <MainHeader />
            <Warnings />
            <Aside />
            <Content />
        </Grid>
    )
}

export default Dashboard;