import { useParams } from "react-router-dom";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";


const Avaliacao: React.FC = () => {

    let { nameProduct, pontuacao, product_id, avaliacao_id } = useParams();



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Voltar
                        url={'/produto/avaliacoes/' + nameProduct + '/' + product_id}
                    />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={"Avaliação - " + nameProduct + ' - ' + pontuacao}
                        />

                        <Button
                            type="submit"
                            style={{ backgroundColor: '#FB451E' }}
                            /* @ts-ignore */
                            onClick={ () => alert(avaliacao_id) }
                        >
                            Remover
                        </Button>
                    </BlockTop>


                </Card>
            </Container>
        </Grid>
    )
}

export default Avaliacao;