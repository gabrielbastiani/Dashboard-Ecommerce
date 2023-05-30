import { useEffect, useState, useCallback } from "react";
import { setupAPIClient } from "../../services/api";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Titulos from "../../components/Titulos";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Card, Container } from "../../components/Content/styles";
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
    TotalBoxItems
} from "../Categorias/styles";
import { ImgInstitucional } from "../Configuracoes/ImagensInstitucionais/styles";
import Pesquisa from "../../components/Pesquisa";
import TabelaSimples from "../../components/Tabelas";
import Select from "../../components/ui/Select";
import { Avisos } from "../../components/Avisos";
import moment from "moment";


const Banners: React.FC = () => {

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(99999);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allBanners() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageListBanner?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.banners || []);
                setInitialFilter(data.banners);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allBanners();
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
        const filterBanner = search.filter((filt) => filt.title.toLowerCase().includes(target.value));
        setSearch(filterBanner);
    }

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Imagem": item.banner ? <ImgInstitucional src={"http://localhost:3333/files/" + item.banner} /> : "Sem banner",
            "Titulo": item.title,
            "Data Inicio": item.startDate ? moment(item.startDate).format('DD/MM/YYYY - HH:mm') : "Sem Programação",
            "Data Fim": item.startDate ? moment(item.endDate).format('DD/MM/YYYY - HH:mm') : "Sem Programação",
            "Ordem": String(item.order),
            "Posição": item.position,
            "Ativado?": item.active,
            "botaoDetalhes": `/banner/${item.id}`
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
                        titulo="Banners"
                    />

                    {search.length < 1 ? (
                        null
                    ) :
                        <Pesquisa
                            placeholder={"Pesquise aqui pelo titulo do banner..."}
                            /* @ts-ignore */
                            onChange={handleChange}
                        />
                    }

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/banners/novo" >
                            <SpanText>Novo Banner</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há banners cadastrados na loja ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Banners por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos banners", value: "999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Imagem", "Titulo", "Data Inicio", "Data Fim", "Ordem", "Posição", "Ativado?"]}
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de banners: {total}</TextTotal>
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

export default Banners;