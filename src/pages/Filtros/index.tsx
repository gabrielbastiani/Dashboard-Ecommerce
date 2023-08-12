import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../services/api";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import { AddButton, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, SpanText, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Avisos } from "../../components/Avisos";
import Select from "../../components/ui/Select";
import TabelaSimples from "../../components/Tabelas";
import { GridDate } from "../Perfil/styles";



const Filtros: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allGroups() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pagesGroupFilter?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.filtrosGroups || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allGroups();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Nome do Grupo/Filtro": item.nameGroup,
            "Tipo de Filtro": item.type ? "Atributos de Produtos = " + item.type : "Categorias de Produtos",
            "Pág. do Grupo do Filtro": item.slugCategory,
            "Ativo?": item.status,
            "Editar Grupo/Filtro": item.type ? <Link to={`/grupoFiltroAtributo/edit/${item.id}`}><Button style={{ padding: '5px' }} >Editar</Button></Link> : <Link to={`/grupoFiltroCategoria/edit/${item.id}`}><Button style={{ padding: '5px' }} >Editar</Button></Link>,
            "botaoDetalhes": item.type ? `/grupoFiltro/atributos/${item.id}` : `/grupoFiltro/categorias/${item.id}`
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
                        titulo="Grupos de filtros"
                    />

                    <GridDate>
                        <AddButton>
                            <AiOutlinePlusCircle />
                            <Link to="/grupoFiltro/atributos/novo" >
                                <SpanText>Novo Grupo/Filtro Para Atributos</SpanText>
                            </Link>
                        </AddButton>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <AddButton>
                            <AiOutlinePlusCircle />
                            <Link to="/grupoFiltro/categorias/novo" >
                                <SpanText>Novo Grupo/Filtro Para Categorias</SpanText>
                            </Link>
                        </AddButton>
                    </GridDate>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há grupos/filtros cadastrados na loja ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Grupos/Filtros por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos grupos/filtros", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Nome do Grupo/Filtro", "Tipo de Filtro", "Pág. do Grupo do Filtro", "Ativo?", "Editar Grupo/Filtro"]}
                                dados={dados}
                                textbutton={"Ver filtros desse grupo"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de grupos/filtros: {total}</TextTotal>
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

export default Filtros;