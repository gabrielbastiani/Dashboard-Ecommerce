import React from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { AddButton, BlockTop, SpanText } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { MdOutlineAssessment } from "react-icons/md";
import { Link } from "react-router-dom";


const Produto: React.FC = () => {



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={'/produtos'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Produto"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            /* onClick={''} */
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <AddButton
                        style={{ backgroundColor: '#f6ba24' }}
                    >
                        <MdOutlineAssessment />
                        <Link to="/produto/novo" >
                            <SpanText>Ver avaliações</SpanText>
                        </Link>
                    </AddButton>

                </Card>
            </Container>
        </Grid>
    )
}

export default Produto;