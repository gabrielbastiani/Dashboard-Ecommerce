import React, { useCallback, useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { TextoDados } from "../../../components/TextoDados";
import { Button } from "../../../components/ui/Button";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { DivisorHorizontal } from "../../../components/ui/DivisorHorizontal";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";
import Pesquisa from "../../../components/Pesquisa";
import { Card } from "../../../components/Content/styles";
import Select from "../../../components/ui/Select";
import Modal from 'react-modal';
import { ModalDeleteCategory } from "../../../components/popups/ModalDeleteCategory";


export type DeleteCategory = {
    category_id: string;
}

const Categoria: React.FC = () => {

    let { category_id, categoryName, codigo } = useParams();

    const [categoryNames, setCategoryNames] = useState(categoryName);
    const [dataName, setDataName] = useState('');

    const [codigos, setCodigos] = useState(codigo);
    const [order, setOrder] = useState(Number);
    const [dataCodigo, setDataCodigo] = useState('');

    const [disponibilidades, setDisponibilidades] = useState('');


    const [initialFilter, setInitialFilter] = useState();
    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    async function updateCategoryName() {
        try {
            const apiClient = setupAPIClient();
            if (categoryNames === '') {
                toast.error('Não deixe o nome da categoria em branco!!!');
                return;
            } else {
                await apiClient.put(`/categoryNameUpdate?category_id=${category_id}`, { categoryName: categoryNames || dataName });
                toast.success('Nome da categoria atualizada com sucesso.');
                refreshCategory();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o nome da categoria.');
        }
    }

    async function updateCategoryCodigo() {
        try {
            const apiClient = setupAPIClient();
            if (codigos === '') {
                toast.error('Não deixe o codigo em branco!!!');
                return;
            } else {
                await apiClient.put(`/categoryCodigoUpdate?category_id=${category_id}`, { codigo: codigos || dataCodigo });
                toast.success('Nome do código atualizado com sucesso.');
                refreshCategory();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o codigo da categoria.');
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
                refreshCategory();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar a ordem da categoria.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadeCategory?category_id=${category_id}`);

            refreshCategory();

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
        async function refreshCategoryLoad() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/exactCategory?category_id=${category_id}`);
            setCategoryNames(response?.data?.categoryName || "");
            setDataName(response?.data?.categoryName || "");
            setDataCodigo(response?.data?.codigo || "");
            setOrder(response?.data?.order);
            setDisponibilidades(response?.data?.disponibilidade || "");
        }
        refreshCategoryLoad();
    }, [category_id])

    async function refreshCategory() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/exactCategory?category_id=${category_id}`);
        setCategoryNames(response?.data?.categoryName || "");
        setDataName(response?.data?.categoryName || "");
        setDataCodigo(response?.data?.codigo || "");
        setOrder(response?.data?.order);
        setDisponibilidades(response?.data?.disponibilidade || "");
    }

    useEffect(() => {
        async function listProductCategory() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allProductsPageExact?page=${currentPage}&limit=${limit}&category_id=${category_id}`);

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
                alert('Error call api list ALL Products');
            }
        }
        listProductCategory();
    }, [category_id, currentPage, limit, total]);

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
        const filterProducts = search.filter((filt) => filt.nameProduct.toLowerCase().includes(target.value));
        setSearch(filterProducts);
    }

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.nameProduct,
            "SKU": item.sku,
            "Status": item.disponibilidade,
            "botaoDetalhes": `/produto/${item.nameProduct}/${item.id}`
        });
    });

    useEffect(() => {
        refreshCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(category_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/exactCategory', {
            params: {
                category_id: category_id,
            }
        });
        setModalItem(responseDelete.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');


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
                                titulo={dataName}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(category_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Nome"}
                                dados={
                                    <InputUpdate
                                        dado={dataName}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={categoryName}
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
                                chave={"Código"}
                                dados={
                                    <InputUpdate
                                        dado={dataCodigo}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={codigo}
                                        value={codigos}
                                        /* @ts-ignore */
                                        onChange={(e) => setCodigos(e.target.value)}
                                        handleSubmit={updateCategoryCodigo}
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

                        {search.length > 0 && (
                            <>
                                <DivisorHorizontal />

                                <Titulos
                                    tipo="h3"
                                    titulo="Produtos da Categoria"
                                />

                                <Pesquisa
                                    placeholder={"Pesquise aqui pelo nome do produto..."}
                                    /* @ts-ignore */
                                    onChange={handleChange}
                                />

                                <br />

                                <TextTotal>Produtos por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "4", value: "4" },
                                        { label: "8", value: "8" },
                                        { label: "Todos produtos", value: "999999" }
                                    ]}
                                />

                                <TabelaSimples
                                    cabecalho={["Produto", "SKU", "Status"]}
                                    /* @ts-ignore */
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
                        )}

                        {search.length < 1 && (
                            <Avisos
                                texto="Não há produtos nessa categoria"
                            />
                        )}
                    </Card>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteCategory
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    category={modalItem}
                />
            )}
        </>
    )
}

export default Categoria;