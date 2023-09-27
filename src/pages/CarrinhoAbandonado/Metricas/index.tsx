import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../../services/api";
import moment from "moment";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
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
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import Pesquisa from "../../../components/Pesquisa";
import { BlockExport, ButtonExit } from "../styles";
import { Button } from "../../../components/ui/Button";
import { FaTimesCircle } from "react-icons/fa";
import { Avisos } from "../../../components/Avisos";
import TabelaSimples from "../../../components/Tabelas";
import Select from "../../../components/ui/Select";



const Metricas: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);
    const [metrics, setMetrics] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(15);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [showElement, setShowElement] = useState(false);

    const showOrHide = () => {
        setShowElement(!showElement)
    }

    useEffect(() => {
        async function allAbandoned() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageAbandonedCart?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.abandoned || []);
                setMetrics(data.abandonedFirst || []);

            } catch (error) {
                console.error(error);
            }
        }
        allAbandoned();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    console.log(search)

    const dados: any = [];
    (search || []).forEach((item: any) => {
        dados.push({
            "Data do Abandono": item.day_cart,
            "Total do Dia": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total_day),
            "Qtd. Pedidos do Dia": "",
            "botaoDetalhes": `/carrinho/metricas/${item.nivel === "0" ? item.created_at : null}`
        });
    });

    console.log("Dados da tabela", dados)

    /* async function handleExportContacts() {
        try {
            setLoading(true);
            const apiClient = setupAPIClient();
            await apiClient.get('/exportContacts');
            toast.success('Lista de contatos gerada com sucesso!');
            setLoading(false);

            showOrHide();

        } catch (error) {
            console.log(error);
        }
    } */



    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Titulos
                            tipo="h1"
                            titulo="Métricas"
                        />

                        {/* {dados.length < 1 ? (
                            null
                        ) :
                            <>
                                {showElement ?
                                    <BlockExport>
                                        <Button
                                            type="submit"
                                            
                                            loading={loading}
                                            onClick={handleExportContactEmail}
                                        >
                                            Exportar arquivo para o seu email
                                        </Button>
                                        <ButtonExit onClick={showOrHide}><FaTimesCircle />Cancelar exportação</ButtonExit>
                                    </BlockExport>
                                    :
                                    <BlockExport>
                                        <Button
                                            style={{ backgroundColor: 'green' }}
                                            type="submit"
                                            
                                            loading={loading}
                                            onClick={handleExportContacts}
                                        >
                                            Gerar arquivo para exportar contatos
                                        </Button>
                                    </BlockExport>
                                }
                            </>
                        } */}

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há carrinhos abandonados por clientes ainda..."
                                />
                            </>
                        ) :
                            <>
                                <TextTotal>Metricas por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "Todas métricas", value: "15" },
                                        { label: "15", value: "15" },
                                        { label: "30", value: "30" }
                                    ]}
                                    value={undefined}
                                />

                                <TabelaSimples
                                    cabecalho={["Data do Abandono", "Total do Dia", "Qtd. Pedidos do Dia"]}
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
                                        <TextTotal>Total de contatos: {total}</TextTotal>
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
                            </>
                        }
                    </Card>
                </Container>
            </Grid >
        </>
    )
}

export default Metricas;