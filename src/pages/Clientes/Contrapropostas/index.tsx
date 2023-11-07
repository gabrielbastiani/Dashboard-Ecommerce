import { useEffect, useState, useCallback } from "react";
import moment from 'moment';
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    BlockTop,
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
import { Avisos } from "../../../components/Avisos";
import Select from "../../../components/ui/Select";
import TabelaSimples from "../../../components/Tabelas";
import Warnings from "../../../components/Warnings";


const Contrapropostas: React.FC = () => {

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(15);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [countersproposals, setCountersproposals] = useState<any[]>([]);


    useEffect(() => {
        async function allCountersproposals() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pagePropousalList?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setCountersproposals(data.counterProposals || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allCountersproposals();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (countersproposals || []).forEach((item) => {
        dados.push({
            "Data de solicitação": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Nome": item.name,
            "SKU": item.sku,
            "Nome do produto": item.nameProduct,
            "Preço atual": item.currentPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            "Preço proposto": item.counterOfferPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            "Status da proposta": item.status,
            "botaoDetalhes": `/contraproposta/${item.id}`
        });
    });

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Contraproposta"
                        />
                    </BlockTop>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há contrapropostas ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Contrapropostas por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todas contraproposta", value: "15" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Data de solicitação", "Nome", "SKU", "Nome do produto", "Preço atual", "Preço proposto", "Status da proposta"]}
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de contrapropostas: {total}</TextTotal>
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

                                    {currentPage < countersproposals.length && (
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

export default Contrapropostas;