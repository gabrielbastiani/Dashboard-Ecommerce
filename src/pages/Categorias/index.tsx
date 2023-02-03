import React from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Content from "../../components/Content";


const Categorias: React.FC = () => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content />
        </Grid>
    )
}

export default Categorias;