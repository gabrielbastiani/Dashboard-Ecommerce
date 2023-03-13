import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import Pesquisa from "../../components/Pesquisa";
import TabelaSimples from "../../components/Tabelas";
import { setupAPIClient } from "../../services/api";
import Select from "../../components/ui/Select";
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Avisos } from "../../components/Avisos";


const Pedidos: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allClientes() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allPedidosPage?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setSearch(data.pedidos);
                setInitialFilter(data.pedidos);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
                alert('Error call api list ALL pedidos');
            }
        }
        allClientes();
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
        const filterCliente = search.filter((filt) => filt.user.nameComplete.toLowerCase().includes(target.value));
        setSearch(filterCliente);
    }

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Cliente": [item.user.nameComplete],/* @ts-ignore */
            "Valor Total": [item.carrinhos[0].valorPagamento].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Status": [item.pagamentos[0].status],
            "botaoDetalhes": `/pedido/${item.id}`
        });
    });


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Pedidos"
                        />
                    </BlockTop>

                    {dados.length < 1 ? (
                        null
                    ) :
                        <Pesquisa
                            placeholder={"Pesquise aqui pelo nome do cliente..."}
                            /* @ts-ignore */
                            onChange={handleChange}
                        />
                    }
                    <br />
                    <br />
                    {dados.length < 1 ? (
                        <Avisos
                            texto="Não há pedidos na loja ainda..."
                        />
                    ) :
                        <>
                            <TextTotal>Pedidos por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" },
                                    { label: "Todos pedidos", value: "999999" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Cliente", "Valor Total", "Data", "Status"]}
                                /* @ts-ignore */
                                dados={dados}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de pedidos: {total}</TextTotal>
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
        </Grid>
    )
}

export default Pedidos;