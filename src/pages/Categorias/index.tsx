import React, { useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Container, Card, TitleText } from "./styles";
import Pesquisa from "../../components/Pesquisa";
import { setupAPIClient } from '../../services/api';


const Categorias: React.FC = () => {

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results);

    useEffect(() => {
        async function allCategorys() {

            const apiClient = setupAPIClient();
            const response = await apiClient.get('/allCategorysPage');

            setResults(response.data);

        }
        allCategorys();
    }, []);

    useEffect(() => {
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
    }, [searchText]);

    
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
                </Card>
            </Container>
        </Grid>
    )
}

export default Categorias;