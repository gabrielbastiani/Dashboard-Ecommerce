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
    TotalArticles,
    TextTotal,
    ContainerArticlesPages,
    Previus,
    ButtonPage,
    TextPage,
    Next,
    CategoryBox,
    NameCategory
} from "./styles";
import Pesquisa from "../../components/Pesquisa";
import { setupAPIClient } from '../../services/api';


const Categorias: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [results, setResults] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    console.log("LISTA", list)

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
                setResults(data.results || []);

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


    useEffect(() => {
        try {
            if (searchText === '') {
                setList([]);
            } else {
                setList(
                    results.filter(
                        (item) =>
                            item.categoryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    )
                );
            }
        } catch (error) {
            console.error(error);
            alert('Error call results');
        }
    }, [results, searchText]);

    console.log(searchText)


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <TitleText>Categorias</TitleText>
                    <Pesquisa
                        valor={searchText}
                        placeholder={"Pesquise aqui pelo nome da categoria..."}
                        /* @ts-ignore */
                        onChange={(t: any) => setSearchText(t)}
                        onClick={() => alert("Pesquisar")}
                    />

                    <SelectItem onChange={limits}>
                        <OptionValue value="4">4</OptionValue>
                        <OptionValue value="8">8</OptionValue>
                        <OptionValue value="999999">Todos as categorias</OptionValue>
                    </SelectItem>

                    <ContainerPagination>
                        <TotalArticles key={total}>
                            <TextTotal>Total de artigos: {total}</TextTotal>
                        </TotalArticles>
                        <ContainerArticlesPages>

                            {results.map((item) => {
                                return (
                                    <CategoryBox key={item.id}>
                                        <NameCategory>{item.categoryName}</NameCategory>
                                    </CategoryBox>
                                )
                            })}

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

                            {currentPage < results.length && (
                                <Next>
                                    <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                        Avançar
                                    </ButtonPage>
                                </Next>
                            )}

                        </ContainerArticlesPages>
                    </ContainerPagination>
                </Card>
            </Container>
        </Grid>
    )
}

export default Categorias;