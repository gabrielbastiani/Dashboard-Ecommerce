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

    let { slug, product_id } = useParams();

    const [avaliations, setAvaliations] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [nameProduct, setNameProduct] = useState("");

    useEffect(() => {
        async function allAvaliations() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageAvaliacao?page=${currentPage}&limit=${limit}&product_id=${product_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setAvaliations(data.productAvaliacao || []);
                setNameProduct(data.product.nameProduct || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allAvaliations();
    }, [currentPage, limit, product_id, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (avaliations || []).forEach((item) => {
        dados.push({
            "Cliente": item.clientName,
            "Data da avaliação": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "botaoDetalhes": `/avaliacao/${item.product.slug}/${item.id}`
        });
    });

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Voltar
                        url={`/produto/${slug}/${product_id}`}
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
                                texto="Não há avaliações ainda..."
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
                                cabecalho={["Cliente", "Data da avaliação"]}
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