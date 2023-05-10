import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../../services/api";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { AddButton, ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, SpanText, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Avisos } from "../../../components/Avisos";
import Select from "../../../components/ui/Select";
import TabelaSimples from "../../../components/Tabelas";


const GrupoFiltroAtributo: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allGroups() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/listPageFilterGroups?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.filter || []);

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
            "Cod. Grupo": item.groupNumber,
            "Nome do Grupo/Filtro": item.nameGroup,
            "Posição Filtro": item.slugCategoryOrItem,
            "Ativo?": item.status,
            "Editar Grupo/Filtro": <Link to={`/grupoFiltro/edit/${item.id}`}><Button style={{ padding: '5px' }} >Editar</Button></Link>,
            "botaoDetalhes": `/grupoFiltro/${item.id}/${item.groupNumber}`
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
                        titulo="Grupos de atributos/filtros"
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/grupoFiltro/novo" >
                            <SpanText>Novo Grupo/Filtro</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há grupos de atributos/filtros cadastrados na loja ainda..."
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
                                cabecalho={["Cod. Grupo", "Nome do Grupo/Filtro", "Posição Filtro", "Ativo?", "Editar Grupo/Filtro"]}
                                dados={dados}
                                textbutton={"Ver itens do grupo"}
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

export default GrupoFiltroAtributo;