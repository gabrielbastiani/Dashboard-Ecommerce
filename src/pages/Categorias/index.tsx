import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
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
    SpanText
} from "./styles";
import Pesquisa from "../../components/Pesquisa";
import { setupAPIClient } from '../../services/api';
import Titulos from "../../components/Titulos";
import TabelaSimples from "../../components/Tabelas";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Card } from "../../components/Content/styles";
import Select from "../../components/ui/Select";
import { Avisos } from "../../components/Avisos";
import { BodyTable, Cabeca, Celula, CelulaLinha, Linha, Simples, TabelasSimples } from "../../components/Tabelas/styles";
import { InputUpdate } from "../../components/ui/InputUpdate";
import { toast } from "react-toastify";
import { ButtonSelect } from "../../components/ui/ButtonSelect";


const Categorias: React.FC = () => {

    const navigate = useNavigate();

    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [orderUpdate, setOrderUpdate] = useState();


    useEffect(() => {
        async function allCategorys() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageRelationsCategorys?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.allFindAsc || []);
                setInitialFilter(data.allFindAsc.category[0]);

            } catch (error) {
                console.error(error);
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
        const filterCategory = search.filter((filt) => filt.category.categoryName.toLowerCase().includes(target.value));
        setSearch(filterCategory);
    }

    /* const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Categoria": item.category.categoryName,
            "Subcategoria(s)": String(item.relationId.length),
            "Produto(s)": item.product ? String(item.product.length) : "0",
            "Ordem": String(item.order),
            "Ativo?": item.status
        });
    });*/

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelation?relationProductCategory_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem da categoria atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 2800);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria.');
        }
    }

    async function updateStatus(id: string, status: string) {
        console.log(status)
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusRelation?relationProductCategory_id=${id}`);

        } catch (err) {
            toast.error('Ops erro ao ativar a relação de categoria.');
        }

        if (status === "Inativo") {
            toast.success(`A relação de categoria se encontra ativa.`);
            setTimeout(() => {
                navigate(0);
            }, 2000);
            return;
        }

        if (status === "Ativo") {
            toast.error(`A relação de categoria se encontra inativa.`);
            setTimeout(() => {
                navigate(0);
            }, 2000);
            return;
        }
    }



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

                    {search.length < 1 ? (
                        null
                    ) :
                        <Pesquisa
                            placeholder={"Pesquise aqui pelo nome da categoria..."}
                            /* @ts-ignore */
                            onChange={handleChange}
                        />
                    }

                    <AddButton>
                        <AiOutlinePlusCircle />
                        <Link to="/categoria/nova" >
                            <SpanText>Nova Categoria</SpanText>
                        </Link>
                    </AddButton>

                    {search.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há categorias cadastradas aqui..."
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
                            <TextTotal>Categorias por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" },
                                    { label: "Todas categorias", value: "999999" }
                                ]}
                            />

                            {/* <TabelaSimples
                                cabecalho={["Categoria", "Subcategoria(s)", "Produto(s)", "Ordem", "Ativo?"]}
                                
                                dados={dados}
                                textbutton={"Detalhes"}
                            /> */}


                            <TabelasSimples>
                                <Simples>
                                    <Cabeca>
                                        <Linha>
                                            <Celula>Categoria</Celula>
                                            <Celula>Subcategoria(s)</Celula>
                                            <Celula>Produto(s)</Celula>
                                            <Celula>Ordem</Celula>
                                            <Celula>Ativo?</Celula>
                                        </Linha>
                                    </Cabeca>
                                    {search.map((item) => {
                                        return (
                                            <BodyTable key={item.id}>
                                                <Linha>
                                                    <CelulaLinha>
                                                        <Link style={{ color: 'white' }} to={`/produto/categorias/newNivel/${item.id}`}>
                                                            {item.category.categoryName}
                                                        </Link>
                                                    </CelulaLinha>
                                                    <CelulaLinha>{String(item.relationId.length)}</CelulaLinha>
                                                    <CelulaLinha>{item.product ? String(item.product.length) : "0"}</CelulaLinha>
                                                    <CelulaLinha>
                                                        <InputUpdate
                                                            dado={String(item.order)}
                                                            type="number"
                                                            /* @ts-ignore */
                                                            placeholder={String(item.order)}
                                                            value={orderUpdate}
                                                            /* @ts-ignore */
                                                            onChange={(e) => setOrderUpdate(e.target.value)}
                                                            handleSubmit={() => updateOrder(item.id)}
                                                        />
                                                    </CelulaLinha>
                                                    <CelulaLinha>
                                                        <ButtonSelect
                                                            /* @ts-ignore */
                                                            dado={item.status}/* @ts-ignore */
                                                            handleSubmit={() => updateStatus(item.id, item.status)}
                                                        />
                                                    </CelulaLinha>
                                                </Linha>
                                            </BodyTable>
                                        )
                                    })}
                                </Simples>
                            </TabelasSimples>


                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de categorias: {total}</TextTotal>
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

export default Categorias;