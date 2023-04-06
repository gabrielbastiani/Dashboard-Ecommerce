import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import { AddButton, Container, SpanText } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { Link } from "react-router-dom";
import Pesquisa from "../../../components/Pesquisa";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";


const TextosInstitucionais: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);


    useEffect(() => {
        async function allTextos() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/listAllTextos`);

                setSearch(response.data || []);
                setInitialFilter(response.data);

            } catch (error) {
                console.error(error);
            }
        }
        allTextos();
    }, []);

    /* @ts-ignore */
    const handleChange = ({ target }) => {
        if (!target.value) {/* @ts-ignore */
            setSearch(initialFilter);

            return;
        }
        /* @ts-ignore */
        const filterTextos = search.filter((filt) => filt.title.toLowerCase().includes(target.value));
        setSearch(filterTextos);
    }

    console.log(search)

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Possui Imagens?": item.imagesloja ? item.imagesloja.length + " imagem" : "SEM IMAGEM",
            "Titulo": item.title,
            "Ordem": String(item.order),
            "Posição no Site": item.posicao,
            "Disponivel?": item.disponibilidade === "Disponivel" ? "SIM" : "NÃO",
            "botaoDetalhes": `/texto/${item.id}`
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
                        titulo="Textos Institucionais"
                    />

                    {dados.length < 1 ? (
                        null
                    ) :
                        <Pesquisa
                            placeholder={"Pesquise aqui pelo titulo do texto..."}
                            /* @ts-ignore */
                            onChange={handleChange}
                        />
                    }

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/textosInstitucionais/novo" >
                            <SpanText>Novo Texto</SpanText>
                        </Link>
                    </AddButton>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há textos cadastrados aqui..."
                            />
                        </>
                    ) :
                        <TabelaSimples
                            cabecalho={["Possui Imagens?", "Titulo", "Ordem", "Posição no Site", "Disponivel?"]}
                            /* @ts-ignore */
                            dados={dados}
                            textbutton={"Detalhes"}
                        />
                    }
                </Card>
            </Container >
        </Grid >
    )
}

export default TextosInstitucionais;