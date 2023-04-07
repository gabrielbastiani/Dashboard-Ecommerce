import { AiOutlinePlusCircle } from "react-icons/ai";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import { AddButton, Container, SpanText } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { Link } from "react-router-dom";
import { Avisos } from "../../../components/Avisos";
import TabelaSimples from "../../../components/Tabelas";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { ImgInstitucional } from "./styles";



const ImagensInstitucionais: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    useEffect(() => {
        async function allImagensInstitucionais() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/allImages`);

                setSearch(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        allImagensInstitucionais();
    }, []);

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Imagem": <ImgInstitucional src={"http://localhost:3333/files/" + item.image} alt={item.titleImage} />,
            "Titulo da Imagem": item.titleImage,
            "Ordem": String(item.order),
            "Disponivel?": item.disponibilidade === "Disponivel" ? "SIM" : "NÃO",
            "Posição no Site": item.posicao,
            "botaoDetalhes": `/imagem/${item.id}`
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
                        titulo="Imagens Institucionais"
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/imagensInstitucionais/nova" >
                            <SpanText>Nova imagem</SpanText>
                        </Link>
                    </AddButton>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há imagens institucionais cadastradas aqui..."
                            />
                        </>
                    ) :
                        <TabelaSimples
                            cabecalho={["Imagem", "Titulo da Imagem", "Ordem", "Disponivel?", "Posição no Site"]}
                            /* @ts-ignore */
                            dados={dados}
                            textbutton={"Detalhes"}
                        />
                    }
                </Card>
            </Container>
        </Grid>
    )
}

export default ImagensInstitucionais;