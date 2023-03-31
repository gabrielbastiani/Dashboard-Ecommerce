import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../services/api";
import moment from "moment";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import Pesquisa from "../../components/Pesquisa";
import { Avisos } from "../../components/Avisos";
import Select from "../../components/ui/Select";
import TabelaSimples from "../../components/Tabelas";
import { Button } from "../../components/ui/Button";
import { BlockExport, ButtonExit } from './styles';
import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";


const Newsletters: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [showElement, setShowElement] = useState(false);

    const showOrHide = () => {
        setShowElement(!showElement)
    }

    useEffect(() => {
        async function allNewsletters() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageNewsletter?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.news || []);
                setInitialFilter(data.news);

            } catch (error) {
                console.error(error);
            }
        }
        allNewsletters();
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
        const filterNews = search.filter((filt) => filt.name.toLowerCase().includes(target.value));
        setSearch(filterNews);
    }

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Nome": item.name,
            "E-mail": item.email,
            "Data de Cadastro": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "botaoDetalhes": `/newsletter/${item.id}`
        });
    });

    async function handleExportNewsletter() {
        try {
            setLoading(true);
            const apiClient = setupAPIClient();
            await apiClient.get('/exportNews');
            toast.success('Lista de newsletters gerada com sucesso!');
            setLoading(false);

            showOrHide();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleExportNewslatterEmail() {
        try {
            setLoading(true);
            const apiClient = setupAPIClient();
            await apiClient.get('/sendEmailNewsletters');
            toast.success('Lista de newsletters exportada para seu EMAIL com sucesso!');
            setLoading(false);

            showOrHide();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Titulos
                            tipo="h1"
                            titulo="Newsletters"
                        />

                        {dados.length < 1 ? (
                            null
                        ) :
                            <Pesquisa
                                placeholder={"Pesquise aqui pelo nome da pessoa..."}
                                /* @ts-ignore */
                                onChange={handleChange}
                            />
                        }

                        {dados.length < 1 ? (
                            null
                        ) :
                            <>
                                {showElement ?
                                    <BlockExport>
                                        <Button
                                            type="submit"
                                            /* @ts-ignore */
                                            loading={loading}
                                            onClick={handleExportNewslatterEmail}
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
                                            /* @ts-ignore */
                                            loading={loading}
                                            onClick={ () => handleExportNewsletter}
                                        >
                                            Gerar arquivo para exportar newsletters
                                        </Button>
                                    </BlockExport>
                                }
                            </>
                        }

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há newsletters cadastradas aqui..."
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
                                <TextTotal>Newsletters por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "4", value: "4" },
                                        { label: "8", value: "8" },
                                        { label: "Todas newsletters", value: "999999" }
                                    ]}
                                />

                                <TabelaSimples
                                    cabecalho={["Nome", "E-mail", "Data de Cadastro"]}
                                    /* @ts-ignore */
                                    dados={dados}
                                    textbutton={"Deletar"}
                                />

                                <ContainerPagination>
                                    <TotalBoxItems key={total}>
                                        <TextTotal>Total de categorias: {total}</TextTotal>
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
                </Container >
            </Grid >
        </>
    )
}

export default Newsletters;