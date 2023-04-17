import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    BlockTop,
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    Previus,
    TextPage,
    TextTotal,
    TotalBoxItems,
} from "../styles";
import {
    BlockDados,
} from "./styles"
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { toast } from 'react-toastify';
import { setupAPIClient } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { TextoDados } from "../../../components/TextoDados";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { Card } from "../../../components/Content/styles";
import { Button } from "../../../components/ui/Button";
import { DivisorHorizontal } from "../../../components/ui/DivisorHorizontal";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";


const Categoria: React.FC = () => {

    let { category_id } = useParams();
    const navigate = useNavigate();

    const [categoryNames, setCategoryNames] = useState("");
    const [order, setOrder] = useState(Number);
    const [disponibilidades, setDisponibilidades] = useState('');

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function refreshCategoryLoad() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/exactCategory?category_id=${category_id}`);
            setCategoryNames(response.data.categoryName || "");
            setOrder(response.data.order);
            setDisponibilidades(response.data.disponibilidade || "");
        }
        refreshCategoryLoad();
    }, [category_id]);

    async function updateCategoryName() {
        try {
            const apiClient = setupAPIClient();
            if (categoryNames === '') {
                toast.error('Não deixe o nome da categoria em branco!!!');
                return;
            } else {
                await apiClient.put(`/categoryNameUpdate?category_id=${category_id}`, { categoryName: categoryNames });
                toast.success('Nome da categoria atualizada com sucesso.');
                
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o nome da categoria.');
        }
    }

    async function updateOrderCategory() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderCategory?category_id=${category_id}`, { order: Number(order) });
                toast.success('Ordem atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar a ordem da categoria.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadeCategory?category_id=${category_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {
            toast.error('Ops erro ao atualizar a disponibilidade da categoria.');
        }

        if (disponibilidades === "Indisponivel") {
            toast.success(`A categoria se encontra Disponivel.`);
            return;
        }

        if (disponibilidades === "Disponivel") {
            toast.error(`A categoria se encontra Indisponivel.`);
            return;
        }
    }


    useEffect(() => {
        async function allProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageRelationsCategorys?page=${currentPage}&limit=${limit}&category_id=${category_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.allFindAscCategorys || []);

            } catch (error) {
                console.error(error);
            }
        }
        allProducts();
    }, [category_id, currentPage, limit, total]);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.product.nameProduct,
            "SKU": item.product.sku,
            "Disponibilidade": item.product.disponibilidade,
            "botaoDetalhes": `/produto/${item.product.slug}/${item.product.id}`
        });
    });


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Voltar
                            url="/categorias"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={`Editar categoria - ${categoryNames}`}
                            />
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Nome"}
                                dados={
                                    <InputUpdate
                                        dado={categoryNames}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={categoryNames}
                                        value={categoryNames}
                                        /* @ts-ignore */
                                        onChange={(e) => setCategoryNames(e.target.value)}
                                        handleSubmit={updateCategoryName}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Ordem"}
                                dados={
                                    <InputUpdate
                                        dado={order}
                                        type="number"
                                        /* @ts-ignore */
                                        placeholder={order}
                                        value={order}
                                        /* @ts-ignore */
                                        onChange={(e) => setOrder(e.target.value)}
                                        handleSubmit={updateOrderCategory}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Disponibilidade"}
                                dados={
                                    <ButtonSelect
                                        /* @ts-ignore */
                                        dado={disponibilidades}
                                        handleSubmit={updateStatus}
                                    />
                                }
                            />
                        </BlockDados>

                        <DivisorHorizontal />

                        <Titulos
                            tipo="h2"
                            titulo="Produtos da Categoria"
                        />
                        <br />
                        <br />
                        {search.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há produtos cadastradas aqui..."
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
                                <TabelaSimples
                                    cabecalho={["Produto", "SKU", "Disponibilidade"]}
                                    dados={dados}
                                    textbutton={"Detalhes"}
                                />

                                <ContainerPagination>
                                    <TotalBoxItems key={total}>
                                        <TextTotal>Total de produtos: {total}</TextTotal>
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
                </Container>
            </Grid>
        </>
    )
}

export default Categoria;