import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    BlockTop,
    ButtonPage,
    Card,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    Previus,
    TextPage,
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


const Categoria: React.FC = () => {

    let { category_id, categoryName, codigo } = useParams();

    const [categoryNames, setCategoryNames] = useState(categoryName);
    const [dataName, setDataName] = useState('');

    const [codigos, setCodigos] = useState(codigo);
    const [dataCodigo, setDataCodigo] = useState('');

    const [disponibilidades, setDisponibilidades] = useState(Boolean);
    const [status, setStatus] = useState("");

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    async function updateCategoryName() {
        try {
            const apiClient = setupAPIClient();
            if (categoryNames === '') {
                toast.error('Não deixe em branco!!!');
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
                toast.error('Não deixe em branco!!!');
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

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadeCategory?category_id=${category_id}`);
            if (status === "Indisponivel") {
                toast.success('Categoria foi habilitada com sucesso');
                return;
            } else {
                toast.warning('Categoria foi desabilitada com sucesso.');
            }
            refreshCategory();
            statusInitial();
        } catch (err) {
            toast.error('Ops erro ao atualizar a disponibilidade da categoria.');
        }
    }

    async function refreshCategory() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/exactCategory?category_id=${category_id}`);
        setCategoryNames(response?.data?.categoryName);
        setDataName(response?.data?.categoryName);
        setDataCodigo(response?.data?.codigo);
        setDisponibilidades(response?.data?.disponibilidade);
    }

    function statusInitial() {
        if (!disponibilidades) {
            setStatus('Disponivel');
        } else {
            setStatus('Indisponivel');
        }
    }

    useEffect(() => {
        async function categoryAtual() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/exactCategoryPage?page=${currentPage}&limit=${limit}&category_id=${category_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setSearch(data.categorys);

            } catch (error) {
                console.error(error);
                alert('Error call api list ALL categoyes');
            }
        }
        categoryAtual();
    }, [category_id, currentPage, limit, total]);

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.products,
            "SKU": item.products.length,
            "Disponibilidade": item.disponibilidade
        });
    });

    useEffect(() => {
        refreshCategory();
        statusInitial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
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
                            onClick={() => alert('delete')}
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
                                    dado={status}
                                    handleSubmit={updateStatus}
                                />
                            }
                        />
                    </BlockDados>

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h3"
                        titulo="Produtos da Categoria"
                    />

                    <TabelaSimples
                        cabecalho={["Produto", "SKU", "Disponibilidade"]}
                        /* @ts-ignore */
                        dados={dados}
                    />
                    
                    <ContainerPagination>
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

export default Categoria;