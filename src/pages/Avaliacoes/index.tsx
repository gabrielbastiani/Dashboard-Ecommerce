import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import Titulos from "../../components/Titulos";
import { setupAPIClient } from "../../services/api";
import { Avisos } from "../../components/Avisos";
import Select from "../../components/ui/Select";
import TabelaSimples from "../../components/Tabelas";
import moment from 'moment';


const Avaliacoes: React.FC = () => {

    let { nameProduct, product_id } = useParams();

    const [avaliations, setAvaliations] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function allAvaliations() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allAvaliacao?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setAvaliations(data.allAvaliacao || []);

            } catch (error) {
                console.error(error);
                alert('Error call api list ALL avalientions');
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
    const dados = [];
    (avaliations || []).forEach((item) => {
        dados.push({
            "Cliente": item.clientName,
            "Data da avaliação": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "botaoDetalhes": `/avaliacao/${nameProduct}/${item.id}`
        });
    });

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Voltar
                        url={'/produto/' + nameProduct + '/' + product_id}
                    />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={"Avaliações do produto - " + nameProduct}
                        />
                    </BlockTop>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há avaliações aqui..."
                            />
                            {currentPage > 1 && (
                                <Previus>
                                    <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                        Voltar
                                    </ButtonPage>
                                </Previus>
                            )}
                        </>
                    ) :
                        <>
                            <TextTotal>Avaliações por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" },
                                    { label: "Todas avaliações", value: "999999" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Cliente", "Data da avaliação"]}
                                /* @ts-ignore */
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de avaliações: {total}</TextTotal>
                                </TotalBoxItems>
                                <ContainerCategoryPage>

                                    {pages.map((page) => (
                                        <TextPage
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </TextPage>
                                    ))}

                                    {currentPage < avaliations.length && (
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
            </Container>
        </Grid>
    )
}

export default Avaliacoes;