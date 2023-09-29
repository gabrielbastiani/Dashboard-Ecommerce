import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../services/api";
import moment from "moment";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import {
    AddButton,
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next, Previus,
    SpanText,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../Categorias/styles";
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
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";


const CarrinhoAbandonado: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(99999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allConfigsAbandonedsCart?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.configs || []);

            } catch (error) {
                console.error(error);
            }
        }
        allConfigs();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Assunto": item.subject,
            "Tempo de disparo": item.time_send_email,
            "Cupom no e-mail": item.code_cupom,
            "botaoDetalhes": `/carrinho/configuracoes/${item.id}`
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
                            <Link to="/carrinho/configuracoes/novo" >
                                <SpanText>Criar Configuração</SpanText>
                            </Link>
                        </AddButton>

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há configurações de carrinhos abandonados cadastradas aqui..."
                                />
                            </>
                        ) :
                            <>
                                <Titulos
                                    tipo="h1"
                                    titulo="Configurações de Carrinhos Abandonados"
                                />

                                <TextTotal>configurações por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "Todas configurações", value: "99999" },
                                        { label: "15", value: "15" },
                                        { label: "30", value: "30" }
                                    ]}
                                />

                                <TabelaSimples
                                    cabecalho={["Assunto", "Tempo de disparo", "Cupom no e-mail"]}
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

export default CarrinhoAbandonado;