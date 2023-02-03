import React from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Container, Card, TitleText } from "./styles";
import Pesquisa from "../../components/Pesquisa";


const Categorias: React.FC = () => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <TitleText>Categorias</TitleText>
                    <Pesquisa
                        valor={''}
                        placeholder={"Pesquise aqui pelo nome da categoria..."}
                        onChange={() => alert("Pesquisar")}
                        onClick={() => alert("Pesquisar")}
                    />
                </Card>
            </Container>
        </Grid>
    )
}

export default Categorias;