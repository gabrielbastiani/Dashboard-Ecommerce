import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import Titulos from "../../components/Titulos";
import Pesquisa from "../../components/Pesquisa";
import TabelaSimples from "../../components/Tabelas";
import Select from "../../components/ui/Select";
import { Avisos } from "../../components/Avisos";
import { setupAPIClient } from "../../services/api";


const Clientes: React.FC = () => {

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
                const { data } = await apiClient.get(`/allUsersPage?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setSearch(data.users);
                setInitialFilter(data.users);

            } catch (error) {
                console.error(error);
                alert('Error call api list ALL clientes');
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
        const filterCliente = search.filter((filt) => filt.nameComplete.toLowerCase().includes(target.value));
        setSearch(filterCliente);
    }

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Cliente": item.nameComplete,
            "E-mail": item.email,
            "Telefone": item.phone,
            "CPF/CNPJ": item.cpfOrCnpj,
            "botaoDetalhes": `/cliente/${item.nameComplete}/${item.id}`
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
                            titulo="Clientes"
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
                        <>
                            <Avisos
                                texto="Não há clientes na loja..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Clientes por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" },
                                    { label: "Todos clientes", value: "999999" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Cliente", "E-mail", "Telefone", "CPF/CNPJ"]}
                                /* @ts-ignore */
                                dados={dados}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de clientes: {total}</TextTotal>
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

export default Clientes;