import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import {
    Container,
    SelectItem,
    OptionValue,
    ContainerPagination,
    TotalBoxItems,
    TextTotal,
    ContainerCategoryPage,
    Previus,
    ButtonPage,
    TextPage,
    Next,
    AddButton,
    SpanText
} from "./styles";
import Pesquisa from "../../components/Pesquisa";
import { setupAPIClient } from '../../services/api';
import Titulos from "../../components/Titulos";
import TabelaSimples from "../../components/Tabelas";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Card } from "../../components/Content/styles";


const Categorias: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function allCategorys() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allCategorysPage?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setSearch(data.categorys);
                setInitialFilter(data.categorys);

            } catch (error) {
                console.error(error);
                alert('Error call api list ALL categoyes');
            }
        }
        allCategorys();
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
        const filterCategory = search.filter((filt) => filt.categoryName.toLowerCase().includes(target.value));
        setSearch(filterCategory);
    }

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Categoria": item.categoryName,
            "Qtd. de Produtos": item.products.length || "0",
            "botaoDetalhes": `/categoria/${item.categoryName}/${item.codigo}/${item.id}`
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
                        titulo="Categorias"
                    />
                    <Pesquisa
                        placeholder={"Pesquise aqui pelo nome da categoria..."}
                        /* @ts-ignore */
                        onChange={handleChange}
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/categoria/nova" >
                            <SpanText>Nova Categoria</SpanText>
                        </Link>
                    </AddButton>

                    <TextTotal>Categorias por página: &nbsp;</TextTotal>

                    <SelectItem onChange={limits}>
                        <OptionValue value="4">4</OptionValue>
                        <OptionValue value="8">8</OptionValue>
                        <OptionValue value="999999">Todos categorias</OptionValue>
                    </SelectItem>

                    <TabelaSimples
                        cabecalho={["Categoria", "Qtd. de Produtos"]}
                        /* @ts-ignore */
                        dados={dados}
                    />

                    <ContainerPagination>
                        <TotalBoxItems key={total}>
                            <TextTotal>Total de categorias: {total}</TextTotal>
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

export default Categorias;