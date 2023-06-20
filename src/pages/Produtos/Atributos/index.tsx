import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { AddButton, SpanText } from "../../Categorias/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Avisos } from "../../../components/Avisos";
import TabelaSimples from "../../../components/Tabelas";


const Atributos: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    useEffect(() => {
        async function allAtributes() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/allTypeAttributes`);

                setSearch(response.data || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.data.response);
            }
        }
        allAtributes();
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Tipo de atributo": item.type,
            "botaoDetalhes": `/tipoAtributo/edit/${item.id}`
        });
    });


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Atributos"
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/tipoAtributo/novo" >
                            <SpanText>Novo atributo</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há tipos de atributos cadastrados ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TabelaSimples
                                cabecalho={["Tipo de atributo"]}
                                dados={dados}
                                textbutton={"Editar ou inserir atributo"}
                            />
                        </>
                    }
                </Card>
            </Container >
        </Grid >
    )
}

export default Atributos;