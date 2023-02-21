import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import {
    AddButton,
    ButtonPage,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    OptionValue,
    Previus,
    SelectItem,
    SpanText,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../Categorias/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Pesquisa from "../../components/Pesquisa";
import TabelaSimples from "../../components/Tabelas";
import { setupAPIClient } from "../../services/api";


const Produtos: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [order, setOrder] = useState("alfabetica_a-z");

    /* console.log(search) */

    useEffect(() => {
        async function allProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allProductsPage?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setSearch(data.products);
                setInitialFilter(data.products);

            } catch (error) {
                console.error(error);
                alert('Error call api list ALL products');
            }
        }
        allProducts();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);




    const alfabeticaAZ = search.sort((a, z) => {
        return a.nameProduct.localeCompare(z.nameProduct);
    });

    const alfabeticaZA = search.sort((a, z) => {
        return z.nameProduct.localeCompare(a.nameProduct);
    });

    const precoCrescente = search.sort((n1, n9) => {
        return n9.preco - n1.preco;
    });

    const precoDecrescente = search.sort((n1, n9) => {
        return n1.preco - n9.preco;
    });




    /*  search.sort((a, z) => {
         return a.nameProduct.localeCompare(z.nameProduct);
     }); */

    /* search.sort((a, z) => {
        return z.nameProduct.localeCompare(a.nameProduct);
    }); */

    /* search.sort((n1, n9) => {
        return n9.preco - n1.preco;
    }); */

    /* search.sort((n1, n9) => {
        return n1.preco - n9.preco;
    }); */



    /* const alfabeticaAZ = search.sort((a, z) => a.nameProduct.localeCompare(z.nameProduct));

    const alfabeticaZA = search.sort((a, z) => z.nameProduct.localeCompare(a.nameProduct));

    const precoCrescente = search.sort((n1, n9) => n9.preco - n1.preco);

    const precoDecrescente = search.sort((n1, n9) => n1.preco - n9.preco); */

    /* @ts-ignore */
    const handleOrder = ({ target }) => {
        if (!target.value) {/* @ts-ignore */
            setSearch(initialFilter);
            return;
        }
        /* @ts-ignore */
        const filterProducts = search.filter((filt) => filt.nameProduct.toLowerCase().includes(target.value));
        setSearch(filterProducts);
    }


    /* @ts-ignore */
    const handleChange = ({ target }) => {
        if (!target.value) {/* @ts-ignore */
            setSearch(initialFilter);

            return;
        }
        /* @ts-ignore */
        const filterProducts = search.filter((filt) => filt.nameProduct.toLowerCase().includes(target.value));
        setSearch(filterProducts);
    }

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.nameProduct,
            "Categoria": item.categoryName || "SEM CATEGORIA",
            "Status": item.disponibilidade,
            "botaoDetalhes": `/produto/${item.nameProduct}/${item.id}`
        });
    });

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Produtos"
                    />

                    <Pesquisa
                        placeholder={"Pesquise aqui pelo nome do produto..."}
                        /* @ts-ignore */
                        onChange={handleChange}
                    />

                    {/* <button onChange={orders}>Ordenar</button> */}

                    <select value={order} onChange={''}>
                        <option value={"alfabeticaAZ"}>Alfabética A-Z</option>
                        <option value={"alfabeticaZA"}>Alfabética Z-A</option>
                        <option value={"precoCrescente"}>Preço Menor</option>
                        <option value={"precoDecrescente"}>Preço Maior</option>
                    </select>



                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/produto/novo" >
                            <SpanText>Novo Produto</SpanText>
                        </Link>
                    </AddButton>

                    <TextTotal>Produtos por página: &nbsp;</TextTotal>

                    <SelectItem onChange={limits}>
                        <OptionValue value="4">4</OptionValue>
                        <OptionValue value="8">8</OptionValue>
                        <OptionValue value="999999">Todos categorias</OptionValue>
                    </SelectItem>

                    <TabelaSimples
                        cabecalho={["Produto", "Categoria", "Status"]}
                        /* @ts-ignore */
                        dados={dados}
                    />

                    <ContainerPagination>
                        <TotalBoxItems key={total}>
                            <TextTotal>Total de produtos: {total}</TextTotal>
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
                </Card>
            </Container>
        </Grid>
    )
}

export default Produtos;