import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { AddButton, Container, SpanText } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Avisos } from "../../../components/Avisos";
import TabelaSimples from "../../../components/Tabelas";
import { Button } from "../../../components/ui/Button";
import Warnings from "../../../components/Warnings";

const CompreJunto: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    useEffect(() => {
        async function allGruops() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/allBuyTogether`);

                setSearch(response.data || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.data.response);
            }
        }
        allGruops();
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Nome do Grupo": item.nameGroup,
            "Produtos": <Link to={`/compreJunto/grupo/${item.id}`}><Button style={{ padding: '5px' }} >Ver</Button></Link>,
            "botaoDetalhes": `/compreJunto/grupo/edit/${item.id}`
        });
    });


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Compre Junto"
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/compreJunto/grupo/novo" >
                            <SpanText>Novo grupo compre junto</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há grupos de compre junto cadastrados ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TabelaSimples
                                cabecalho={["Nome do Grupo", "Produtos"]}
                                dados={dados}
                                textbutton={"Editar grupo"}
                            />
                        </>
                    }
                </Card>
            </Container >
        </Grid >
    )
}

export default CompreJunto;