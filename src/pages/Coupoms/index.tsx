import { useEffect, useState, useCallback } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import {
    AddButton,
    BlockTop,
    ButtonPage,
    ContainerCategoryPage,
    ContainerPagination,
    Next, Previus,
    SpanText,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../Categorias/styles";
import Titulos from "../../components/Titulos";
import { setupAPIClient } from "../../services/api";
import { Avisos } from "../../components/Avisos";
import Select from "../../components/ui/Select";
import TabelaSimples from "../../components/Tabelas";
import moment from 'moment';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Warnings from "../../components/Warnings";


const Coupoms: React.FC = () => {

    const [coupoms, setCoupoms] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(15);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allCoupoms() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageCoupons?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setCoupoms(data.coupons || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allCoupoms();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (coupoms || []).forEach((item) => {
        dados.push({
            "Nome do Cupom": item.name,
            "Código do Cupom": item.code,
            "Qtd. de Cupoms": item.amountCoupon,
            "Data Inicio": item.startDate ? moment(item.startDate).format('DD/MM/YYYY - HH:mm') : "Sem data",
            "Data Fim": item.startDate ? moment(item.endDate).format('DD/MM/YYYY - HH:mm') : "Sem data",
            "Ativado?": item.active,
            "botaoDetalhes": `/cupom/${item.id}`
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
                            titulo="Cupoms de Desconto"
                        />
                    </BlockTop>

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/cupom/novo" >
                            <SpanText>Novo Cupom</SpanText>
                        </Link>
                    </AddButton>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há cupoms de desconto ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Cupoms por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos cupoms", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Nome do Cupom", "Código do Cupom", "Qtd. de Cupoms", "Data Inicio", "Data Fim", "Ativado?"]}
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de cupoms: {total}</TextTotal>
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

                                    {currentPage < coupoms.length && (
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

export default Coupoms;