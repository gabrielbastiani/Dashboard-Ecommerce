import { useEffect, useState, useCallback } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import moment from "moment";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { AddButton, ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, SpanText, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import { Avisos } from "../../../components/Avisos";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import TabelaSimples from "../../../components/Tabelas";


const TemplatesEmailAbandonedCart: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(99999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allTemplates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageTemplatesCartAbandoned?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.templates || []);

            } catch (error) {
                console.error(error);
            }
        }
        allTemplates();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Nome do arquivo": item.name_file_email,
            "Data de criação": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "botaoDetalhes": `/carrinho/templateEmail/${item.id}`
        });
    });


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>

                        <AddButton>
                            <AiOutlinePlusCircle />
                            <Link to="/carrinho/templateEmail/novo" >
                                <SpanText>Criar Template</SpanText>
                            </Link>
                        </AddButton>

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há templates de emails para carrinhos abandonados cadastradas aqui..."
                                />
                            </>
                        ) :
                            <>
                                <Titulos
                                    tipo="h1"
                                    titulo="Templates de e-mails para carrinhos abandonados"
                                />

                                <TextTotal>Templates por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "Todos templates", value: "99999" },
                                        { label: "15", value: "15" },
                                        { label: "30", value: "30" }
                                    ]}
                                />

                                <TabelaSimples
                                    cabecalho={["Nome do arquivo", "Data de criação"]}
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
                                        <TextTotal>Total de templates: {total}</TextTotal>
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

export default TemplatesEmailAbandonedCart;