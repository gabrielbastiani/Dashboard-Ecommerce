import { useEffect, useState, useCallback } from "react";
import Aside from "../../../components/Aside";
import { Avisos } from "../../../components/Avisos";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Pesquisa from "../../../components/Pesquisa";
import TabelaSimples from "../../../components/Tabelas";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import {
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    Previus,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { setupAPIClient } from "../../../services/api";
import moment from 'moment';
import Warnings from "../../../components/Warnings";


const TodasAvaliacoes: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allAvaliations() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageAllAvalietion?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setSearch(data.allAvalietion || []);
                setInitialFilter(data.allAvalietion);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allAvaliations();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    /* @ts-ignore */
    const handleChange = ({ target }) => {
        if (!target.value) {/* @ts-ignore */
            setSearch(initialFilter);

            return;
        }
        /* @ts-ignore */
        const filterAvaliation = search.filter((filt) => filt.product.name.toLowerCase().includes(target.value));
        setSearch(filterAvaliation);
    }

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.product.name,
            "Avaliação": item.point,
            "Comentário": item.description,
            "Data da avaliação": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Status": item.status,
            "botaoDetalhes": `/avaliacao/${item.product.slug}/${item.id}`
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
                        titulo="Avaliações dos produtos"
                    />

                    {search.length < 1 ? (
                        null
                    ) :
                        <Pesquisa
                            placeholder={"Pesquise aqui pelo nome do produto..."}
                            /* @ts-ignore */
                            onChange={handleChange}
                        />
                    }
                    <br />
                    <br />
                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há avaliações em nenhum produto ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Avaliações por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todas avaliações", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Produto", "Avaliação", "Comentário", "Data da avaliação", "Status"]}
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de avaliações: {total}</TextTotal>
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

export default TodasAvaliacoes;