import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../services/api";
import { ImgInstitucional } from "../Configuracoes/ImagensInstitucionais/styles";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { AddButton, ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, SpanText, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Avisos } from "../../components/Avisos";
import Select from "../../components/ui/Select";
import TabelaSimples from "../../components/Tabelas";



const Atributos: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allAtributos() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageListAtributos?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.atributos || []);
        
            } catch (error) {/* @ts-ignore */
                console.error(error.data.response);
            }
        }
        allAtributos();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Imagem": item.imageatributos[0] ? <ImgInstitucional src={"http://localhost:3333/files/" + item.imageatributos[0].imageAtributo} /> : "Sem Imagem",
            "Tipo de atributo": item.tipo,
            "Valor do atributo": item.valor,
            "Qtd. de Produtos": item.relationProductAtributos ? String(item.relationProductAtributos.length) : "Sem produto(s)",
            "Status": item.disponibilidade,
            "botaoDetalhes": `/atributo/${item.id}`
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
                        <Link to="/atributo/novo" >
                            <SpanText>Novo Atributo</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há atributos cadastrados ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Atributos por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos atributos", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Imagem", "Tipo de atributo", "Valor do atributo", "Qtd. de Produtos", "Status"]}
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de categorias: {total}</TextTotal>
                                </TotalBoxItems>
                                <ContainerCategoryPage>
                                    {currentPage > 1 && (
                                        <Previus>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                                Voltar
                                            </ButtonPage>
                                        </Previus>
                                    )}

                                    {pages.map((page) => (
                                        <TextPage
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </TextPage>
                                    ))}

                                    {currentPage < search.length && (
                                        <Next>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                                Avançar
                                            </ButtonPage>
                                        </Next>
                                    )}

                                </ContainerCategoryPage>
                            </ContainerPagination>
                        </>
                    }
                </Card>
            </Container >
        </Grid >
    )
}

export default Atributos;