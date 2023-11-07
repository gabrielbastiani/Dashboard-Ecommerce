import { useEffect, useState, useCallback } from 'react';
import { setupAPIClient } from '../../../services/api';
import { useParams } from 'react-router-dom';
import { Grid } from '../../Dashboard/styles';
import MainHeader from '../../../components/MainHeader';
import Aside from '../../../components/Aside';
import { ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from '../../Categorias/styles';
import { Card } from '../../../components/Content/styles';
import Titulos from '../../../components/Titulos';
import Select from '../../../components/ui/Select';
import TabelaSimples from '../../../components/Tabelas';
import moment from 'moment';
import VoltarNavagation from '../../../components/VoltarNavagation';
import Warnings from '../../../components/Warnings';


const MetricaDetalhes: React.FC = () => {

    let { slug_day } = useParams();

    const [search, setSearch] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(15);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allAbandoned() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/detailsDataCartAbandoned?page=${currentPage}&limit=${limit}&slug_day=${slug_day}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.abandonedDetails || []);

            } catch (error) {
                console.error(error);
            }
        }
        allAbandoned();
    }, [slug_day, currentPage, limit, total]);

    const limits = useCallback((e: any) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (search || []).forEach((item: any) => {
        dados.push({
            "Data": moment(item.created_cart).format('DD/MM/YYYY - HH:mm'),
            "Cliente": item.customer.name,
            "E-mail": item.customer.email,
            "Qtd. Produtos": item.cart_abandoned.length,
            "Receita": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total_cart),
            "botaoDetalhes": `/carrinho/metricas/detalhes/${item.id}`
        });
    });


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>

                        <VoltarNavagation />

                        <Titulos
                            tipo="h1"
                            titulo={`Detalhes do carrinho abandonado ${search[0]?.created_at}`}
                        />

                        <TextTotal>Detalhes por página: &nbsp;</TextTotal>

                        <Select
                            /* @ts-ignore */
                            onChange={limits}
                            opcoes={[
                                { label: "Todas métricas", value: "15" },
                                { label: "25", value: "25" },
                                { label: "35", value: "35" }
                            ]}
                        />

                        <TabelaSimples
                            cabecalho={["Data", "Cliente", "E-mail", "Qtd. Produtos", "Receita"]}
                            dados={dados}
                            textbutton={"Detalhes"}
                        />

                        <ContainerPagination>
                            {currentPage > 1 && (
                                <Previus>
                                    <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                        Voltar
                                    </ButtonPage>
                                </Previus>
                            )}

                            <TotalBoxItems key={total}>
                                <TextTotal>Total de métricas: {total}</TextTotal>
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

                                {currentPage < search.length && (
                                    <Next>
                                        <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                            Avançar
                                        </ButtonPage>
                                    </Next>
                                )}

                            </ContainerCategoryPage>
                        </ContainerPagination>
                    </Card>
                </Container>
            </Grid >
        </>
    )
}

export default MetricaDetalhes;