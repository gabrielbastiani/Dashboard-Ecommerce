import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../../services/api";
import Select from "../../../components/ui/Select";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    AddButton,
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    Previus,
    SpanText,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import Pesquisa from "../../../components/Pesquisa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Avisos } from "../../../components/Avisos";
import TabelaSimples from "../../../components/Tabelas";
import { Button } from "../../../components/ui/Button";



const MenusCategorias: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(999999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allMenus() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageMenu?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.menus || []);
                setInitialFilter(data.menus);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allMenus();
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

        const filterMenus = search.filter((filt) => filt.nameGroup.toLowerCase().includes(target.value));
        setSearch(filterMenus);
    }

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Nome do Menu": item.nameGroup,
            "Posição": item.position,
            "Ativo?": item.status,
            "Editar Menu": <Link to={`/menu/edit/${item.id}`}><Button style={{ padding: '5px' }} >Editar</Button></Link>,
            "botaoDetalhes": `/menu/${item.id}`
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
                        titulo="Menu de categorias"
                    />

                    {search.length < 1 ? (
                        null
                    ) :
                        <Pesquisa
                            placeholder={"Pesquise aqui pelo nome do menu..."}
                            /* @ts-ignore */
                            onChange={handleChange}
                        />
                    }

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/menu/novo" >
                            <SpanText>Novo Menu</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há menus de categorias cadastrados na loja ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Grupos por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos menus", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Nome do Menu", "Posição", "Ativo?", "Editar Menu"]}
                                dados={dados}
                                textbutton="Ver"
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de menus: {total}</TextTotal>
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
            </Container >
        </Grid >
    )
}

export default MenusCategorias;