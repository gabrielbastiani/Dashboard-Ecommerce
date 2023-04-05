import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Titulos from "../../components/Titulos";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Card, Container } from "../../components/Content/styles";
import { AddButton, SpanText } from "../Categorias/styles";


const Banners: React.FC = () => {

 


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Banners"
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/banners/novo" >
                            <SpanText>Novo Banner</SpanText>
                        </Link>
                    </AddButton>

                    


                </Card>
            </Container >
        </Grid >
    )
}

export default Banners;