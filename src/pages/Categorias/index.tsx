import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import {
    Container,
    Card,
    TitleText,
    SelectItem,
    OptionValue,
    ContainerPagination,
    TotalCategorys,
    TextTotal,
    ContainerCategoryPage,
    Previus,
    ButtonPage,
    TextPage,
    Next,
    CategoryBox,
    NameCategory,
    ContainerCategorys
} from "./styles";
import Pesquisa from "../../components/Pesquisa";
import { setupAPIClient } from '../../services/api';


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


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <TitleText>Categorias</TitleText>
                    <Pesquisa
                        placeholder={"Pesquise aqui pelo nome da categoria..."}
                        /* @ts-ignore */
                        onChange={handleChange}
                    />

                    <SelectItem onChange={limits}>
                        <OptionValue value="4">4</OptionValue>
                        <OptionValue value="8">8</OptionValue>
                        <OptionValue value="999999">Todos as categorias</OptionValue>
                    </SelectItem>

                    <ContainerPagination>
                        <TotalCategorys key={total}>
                            <TextTotal>Total de categorias: {total}</TextTotal>
                        </TotalCategorys>
                        <ContainerCategoryPage>

                            {search.length !== 0 && (
                                <ContainerCategorys>
                                    {search.map((value) => {
                                        return (
                                            <CategoryBox key={value.id}>
                                                <NameCategory>{value.categoryName}</NameCategory>
                                            </CategoryBox>
                                        );
                                    })}
                                </ContainerCategorys>
                            )}

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