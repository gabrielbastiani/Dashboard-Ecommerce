import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../services/api";
import moment from "moment";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import {
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next, Previus,
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
import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";
import { BlockExport, ButtonExit } from "../Newsletters/styles";


const Pedidos: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [showElement, setShowElement] = useState(false);

    const showOrHide = () => {
        setShowElement(!showElement)
    }

    useEffect(() => {
        async function allOrdersCustomers() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageAllOrdersCustomers?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.orders || []);
                setInitialFilter(data.orders);

            } catch (error) {
                console.error(error);
            }
        }
        allOrdersCustomers();
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
        const filterContact = search.filter((filt) => filt.name.toLowerCase().includes(target.value));
        setSearch(filterContact);
    }

    console.log(search)

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Pedido": item.id_order_store,
            "Cliente": item.customer.name,
            "Valor Total": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.payment.total_payment_juros ? item.payment.total_payment_juros : item.payment.total_payment),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Situação": item.statusOrder[0].status_order === "PENDING" ? "Pendente de pagamento" : item.statusOrder[0].status_order === "CONFIRMED" ? "Aprovado" : "Reprovado ou Cancelado",
            "botaoDetalhes": `/pedido/${item.id}`
        });
    });

    async function handleExportorders() {
        try {
            setLoading(true);
            const apiClient = setupAPIClient();
            await apiClient.get('/exportListAllOrdersCustomers');
            toast.success('Lista de pedidos gerada com sucesso!');
            setLoading(false);

            showOrHide();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function handleExportOrdersCustomers() {
        try {
            setLoading(true);
            const apiClient = setupAPIClient();
            await apiClient.get('/sendEmailListordersCustomers');
            toast.success('Lista de clientes exportada para seu EMAIL com sucesso!');
            setLoading(false);

            showOrHide();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
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
                            titulo="Pedidos"
                        />

                        {dados.length < 1 ? (
                            null
                        ) :
                            <Pesquisa
                                placeholder={"Pesquise aqui pelo nome do cliente..."}
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
                                            onClick={handleExportOrdersCustomers}
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
                                            onClick={handleExportorders}
                                        >
                                            Gerar arquivo para exportar clientes
                                        </Button>
                                    </BlockExport>
                                }
                            </>
                        }

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há pedidos na loja ainda..."
                                />
                            </>
                        ) :
                            <>
                                <TextTotal>Pedidos por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "Todas pedidos", value: "99999" },
                                        { label: "15", value: "15" },
                                        { label: "30", value: "30" }
                                    ]}
                                />

                                <TabelaSimples
                                    cabecalho={["Pedido", "Cliente", "Valor Total", "Data", "Situação"]}
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
                                        <TextTotal>Total de pedidos: {total}</TextTotal>
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

export default Pedidos;