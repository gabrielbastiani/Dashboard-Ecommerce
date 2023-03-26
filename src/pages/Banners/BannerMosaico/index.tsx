import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    Container,
    ContainerPagination,
    TotalBoxItems,
    TextTotal,
    ContainerCategoryPage,
    Previus,
    ButtonPage,
    TextPage,
    Next,
    AddButton,
    SpanText,
    ImgBanner
} from "./styles";
import { setupAPIClient } from '../../../services/api';
import Titulos from "../../../components/Titulos";
import TabelaSimples from "../../../components/Tabelas";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Card } from "../../../components/Content/styles";
import Select from "../../../components/ui/Select";
import { Avisos } from "../../../components/Avisos";
import moment from 'moment';


const BannerMosaico: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function allBannerMosaico() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageListBannerMosaico?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.bannersMosaico || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allBannerMosaico();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Imagem": <ImgBanner src={"http://localhost:3333/files/" + item.bannerMosaico} alt="banner home loja virtual" />,
            "Link de destino?": item.url ? "Existe Link" : "Não Existe Link",
            "Data do Banner": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Banner Ativo?": item.active === "Sim" ? "ATIVADO" : "DESATIVADO",
            "botaoDetalhes": `/banners/editarBannerMosaico/${item.id}`
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
                        titulo="Banners em Mosaico"
                    />

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/banners/bannerMosaico/novo" >
                            <SpanText>Novo Banner para Mosaicos</SpanText>
                        </Link>
                    </AddButton>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há banners cadastrados aqui..."
                            />
                            {currentPage > 1 && (
                                <Previus>
                                    <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                        Voltar
                                    </ButtonPage>
                                </Previus>
                            )}
                        </>
                    ) :
                        <>
                            <TextTotal>Banners por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" },
                                    { label: "Todos banners", value: "999999" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Imagem", "Link de destino?", "Banner Ativo?", "Data do Banner"]}
                                /* @ts-ignore */
                                dados={dados}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de banners: {total}</TextTotal>
                                </TotalBoxItems>
                                <ContainerCategoryPage>

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

export default BannerMosaico;