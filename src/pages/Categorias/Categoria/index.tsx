import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { DivisorHorizontal } from "../../../components/ui/DivisorHorizontal";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";
import { Button } from "../../../components/ui/Button";
import { BlockImagem, EtiquetaImagens, FormImagens, IconSpanImagens, ImagensPreviewUrl, ImagensUpload, InputImagens, TextImagens } from "../../Configuracoes/ImagensInstitucionais/styles";
import { MdFileUpload } from "react-icons/md";



const Categoria: React.FC = () => {

    let { category_id } = useParams();
    const navigate = useNavigate();

    const [categoryNames, setCategoryNames] = useState("");
    const [order, setOrder] = useState(Number);
    const [disponibilidades, setDisponibilidades] = useState('');

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(10);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryImageUrl, setCategoryImageUrl] = useState('');


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

    async function handleRegisterImageCategory(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', categoryImage);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageCategory?category_id=${category_id}`, data);

            toast.success('Imagem atualizada com sucesso.');

            setTimeout(() => {
                navigate('/categorias');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao atualizar a imagem da categoria!!!');
        }

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setCategoryImage(image)
            setCategoryImageUrl(URL.createObjectURL(image))
        }

    }

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

                        {categoryImageUrl ? (
                            <Button
                                type="submit"
                                form="form-category"
                            >
                                Salvar Imagem
                            </Button>
                        ) : null}

                        <FormImagens id="form-category" onSubmit={handleRegisterImageCategory}>
                            <BlockImagem>
                                <EtiquetaImagens>
                                    <IconSpanImagens>
                                        <MdFileUpload size={50} />
                                    </IconSpanImagens>
                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt={categoryNames} />
                                    {categoryImageUrl ? (
                                        <ImagensPreviewUrl
                                            src={categoryImageUrl}
                                            alt={categoryNames}
                                        />
                                    ) :
                                        <>
                                            <ImagensUpload src={"http://localhost:3333/files/" + categoryImage} />
                                            <TextImagens>Clique na seta e insira<br /> uma imagem</TextImagens>
                                        </>
                                    }
                                </EtiquetaImagens>
                            </BlockImagem>
                        </FormImagens>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Categoria;