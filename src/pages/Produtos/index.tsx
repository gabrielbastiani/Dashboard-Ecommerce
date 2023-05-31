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
    Previus,
    SpanText,
    TextPage,
    TextTotal,
    TotalBoxItems,
    SectionTop,
    Block,
    BlockSection
} from "../Categorias/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Pesquisa from "../../components/Pesquisa";
import TabelaSimples from "../../components/Tabelas";
import { setupAPIClient } from "../../services/api";
import Select from "../../components/ui/Select";
import { Avisos } from "../../components/Avisos";
import { ImgRedes } from "../Configuracoes/styles";


const Produtos: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [order, setOrder] = useState(() => {
        const orderSaved = localStorage.getItem('@storeorderproduct');

        if (orderSaved) {
            return String(orderSaved);
        } else {
            return "alfabeticaAZ"
        }
    });

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

                setPages(arrayPages || []);
                setSearch(data.products || []);
                setInitialFilter(data.products);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allProducts();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    /* @ts-ignore */
    switch (order) {/* @ts-ignore */
        case "alfabeticaAZ":
            search.sort((a, z) => a.nameProduct.localeCompare(z.nameProduct));
            localStorage.setItem('@storeorderproduct', String(order));
            break;/* @ts-ignore */
        case "alfabeticaZA":
            search.sort((a, z) => z.nameProduct.localeCompare(a.nameProduct));
            localStorage.setItem('@storeorderproduct', String(order));
            break;/* @ts-ignore */
        case "precoCrescente":
            search.sort((n1, n9) => n9.preco - n1.preco);
            localStorage.setItem('@storeorderproduct', String(order));
            break;/* @ts-ignore */
        case "precoDecrescente":
            search.sort((n1, n9) => n1.preco - n9.preco);
            localStorage.setItem('@storeorderproduct', String(order));
            break;
        default:
            search.sort((a, z) => a.nameProduct.localeCompare(z.nameProduct));
    }

    /* @ts-ignore */
    const handleChange = ({ target }) => {
        if (!target.value) {/* @ts-ignore */
            setSearch(initialFilter);

            return;
        }
        /* @ts-ignore */
        const filterProducts = search.filter((filt) => filt.name.toLowerCase().includes(target.value));
        setSearch(filterProducts);
    }

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Imagem": item.photoproducts[0] ? <ImgRedes src={"http://localhost:3333/files/" + item.photoproducts[0].image} /> : "Sem imagem",
            "Produto": item.name,
            "Qtd. de Categorias": item.productcategories ? String(item.productcategories.length) : "Sem categoria",
            "Status": item.status,
            "botaoDetalhes": `/produto/${item.slug}/${item.id}`
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

                    {dados.length < 1 ? (
                        null
                    ) :
                        <SectionTop>
                            <Block>
                                <Pesquisa
                                    placeholder={"Pesquise aqui pelo nome do produto..."}
                                    /* @ts-ignore */
                                    onChange={handleChange}
                                />
                            </Block>

                            <BlockSection>
                                <TextTotal>Ordenar por</TextTotal>
                                <Select
                                    value={order}
                                    /* @ts-ignore */
                                    onChange={e => setOrder(e.target.value)}
                                    opcoes={[
                                        { label: "Alfabética A-Z", value: "alfabeticaAZ" },
                                        { label: "Alfabética Z-A", value: "alfabeticaZA" },
                                        { label: "Preço Menor", value: "precoDecrescente" },
                                        { label: "Preço Maior", value: "precoCrescente" }
                                    ]}
                                />
                            </BlockSection>
                        </SectionTop>
                    }

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/produto/novo" >
                            <SpanText>Novo Produto</SpanText>
                        </Link>
                    </AddButton>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há produtos cadastrados na loja ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Produtos por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos produtos", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Imagem", "Produto", "Qtd. de Categorias", "Status"]}
                                dados={dados}
                                textbutton={"Detalhes"}
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
                        </>
                    }
                </Card>
            </Container>
        </Grid>
    )
}

export default Produtos;