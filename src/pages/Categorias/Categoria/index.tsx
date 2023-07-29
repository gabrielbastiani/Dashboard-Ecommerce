import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import Modal from 'react-modal';
import {
    Block,
    BlockTop,
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Etiqueta,
    Next,
    Previus,
    TextPage,
    TextTotal,
    TotalBoxItems,
} from "../styles";
import {
    BlockDados, IconSpanCatgoryImagens, ImagensCategoryPreviewUrl, ImagensCategoryUpload,
} from "./styles"
import Titulos from "../../../components/Titulos";
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
import { BlockImagem, EtiquetaImagens, FormImagens, InputImagens, TextImagens } from "../../Configuracoes/ImagensInstitucionais/styles";
import { MdFileUpload } from "react-icons/md";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { EtiquetaTextImagem, FormUpdateImage, InputLogoTextImagem, TextPhoto } from "../../Configuracoes/ImagensInstitucionais/Imagem/styles";
import { ModalDeleteImagemCategory } from "../../../components/popups/ModalDeleteImagemCategory";
import VoltarNavagation from "../../../components/VoltarNavagation";
import { TextArea } from "../../../components/ui/Input";


export type DeleteCategoryImage = {
    iDImage: string;
}

const Categoria: React.FC = () => {

    let { category_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState('');

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(10);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryImageUrl, setCategoryImageUrl] = useState('');

    const [categoryImageUpload, setCategoryImageUpload] = useState(null);
    const [categoryImageUploadUrl, setCategoryImageUploadUrl] = useState('');

    const [imageCategories, setImageCategories] = useState("");
    const [iDImage, setIDImage] = useState("");

    const [modalItemImagem, setModalItemImagem] = useState("");
    const [modalVisibleImagem, setModalVisibleImagem] = useState(false);
    

    useEffect(() => {
        async function refreshCategoryLoad() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/finduniqueCategory?category_id=${category_id}`);
            setName(response.data.name || "");
            setStatus(response.data.status || "");
            setDescription(response.data.description || "");
            setImageCategories(response.data.imagecategories[0].image);
            setCategoryImageUpload(response.data.imagecategories[0].image);
            setIDImage(response.data.imagecategories[0].id);
        }
        refreshCategoryLoad();
    }, [category_id]);

    async function updateCategoryName() {
        try {
            const apiClient = setupAPIClient();
            if (name === '') {
                toast.error('Não deixe o nome da categoria em branco!!!');
                return;
            } else {
                await apiClient.put(`/categoryNameUpdate?category_id=${category_id}`, { name: name });
                toast.success('Nome da categoria atualizada com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o nome da categoria.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusCategory?category_id=${category_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a status da categoria.');
        }

        if (status === "Indisponivel") {
            toast.success(`A categoria se encontra Disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`A categoria se encontra Indisponivel.`);
            return;
        }
    }

    async function updateDescription() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/updateDescription?category_id=${category_id}`, { description: description });
            toast.success('Descrição do categoria atualizada com sucesso.');

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descrição da categoria.');
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
            data.append('file', categoryImage);/* @ts-ignore */
            data.append('category_id', category_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageCategory`, data);

            toast.success('Imagem cadastrada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a imagem da categoria!!!');
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

    async function handleImageUpload(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', categoryImageUpload);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageCategory?imageCategory_id=${iDImage}`, data);

            toast.success('Imagem atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao atualizar a imagem da categoria!!!');
        }
    }

    function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0]
        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setCategoryImageUpload(image);
            setCategoryImageUploadUrl(URL.createObjectURL(image));
        }

    }

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.product.name,
            "SKU": item.product.sku,
            "Disponibilidade": item.product.status,
            "botaoDetalhes": `/produto/${item.product.slug}/${item.product.id}`
        });
    });

    function handleCloseModalDeleteImagem() {
        setModalVisibleImagem(false);
    }

    async function handleOpenModalImageDelete(category_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/finduniqueCategory', {
            params: {
                category_id: category_id,
            }
        });
        setModalItemImagem(response.data.imagecategories[0].id || "");
        setModalVisibleImagem(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>

                        <VoltarNavagation />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={`Editar categoria - ${name}`}
                            />
                        </BlockTop>

                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Nome"}
                                        dados={
                                            <InputUpdate
                                                dado={name}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={name}
                                                value={name}
                                                /* @ts-ignore */
                                                onChange={(e) => setName(e.target.value)}
                                                handleSubmit={updateCategoryName}
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
                                                dado={status}
                                                handleSubmit={updateStatus}
                                            />
                                        }
                                    />
                                </BlockDados>

                                {imageCategories ? (
                                    <Button
                                        /* @ts-ignore */
                                        onClick={() => handleOpenModalImageDelete(category_id)}
                                    >
                                        Deletar imagem
                                    </Button>
                                ) :
                                    null
                                }
                                <br />
                                <br />
                                <br />
                                <Block>
                                    <Etiqueta>Descrição da categoria:</Etiqueta>
                                    <TextArea
                                        style={{ height: '250px', padding: '15px' }}
                                        placeholder="Digite aqui..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Block>
                                <br />
                                <Button
                                    onClick={updateDescription}
                                >
                                    Atualizar descrição
                                </Button>

                            </SectionDate>

                            <SectionDate>
                                {imageCategories ? (
                                    <>
                                        <FormUpdateImage onSubmit={handleImageUpload}>
                                            <EtiquetaTextImagem>
                                                {categoryImageUploadUrl ? (
                                                    <Button
                                                        type="submit"
                                                    >
                                                        Salvar nova imagem
                                                    </Button>
                                                ) :
                                                    null
                                                }
                                                <IconSpanCatgoryImagens>
                                                    <MdFileUpload size={50} />
                                                </IconSpanCatgoryImagens>
                                                <InputLogoTextImagem type="file" accept="image/png, image/jpeg" onChange={handleFileUpload} />
                                                {categoryImageUploadUrl ? (
                                                    <>
                                                        <ImagensCategoryUpload
                                                            src={categoryImageUploadUrl}
                                                        />
                                                    </>
                                                ) :
                                                    <>
                                                        <TextPhoto>Clique para carregar uma nova imagem</TextPhoto>
                                                        <ImagensCategoryPreviewUrl src={"http://localhost:3333/files/" + categoryImageUpload} />
                                                    </>
                                                }
                                            </EtiquetaTextImagem>
                                        </FormUpdateImage>
                                    </>
                                ) :
                                    <>
                                        <FormImagens onSubmit={handleRegisterImageCategory}>
                                            <BlockImagem>
                                                <EtiquetaImagens>
                                                    {categoryImageUrl ? (
                                                        <Button
                                                            type="submit"
                                                        >
                                                            Salvar Imagem
                                                        </Button>
                                                    ) : null}
                                                    <IconSpanCatgoryImagens>
                                                        <MdFileUpload size={50} />
                                                    </IconSpanCatgoryImagens>
                                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="imagem da categoria loja" />
                                                    {categoryImageUrl ? (
                                                        <ImagensCategoryPreviewUrl
                                                            src={categoryImageUrl}
                                                            alt="imagem da categoria loja"
                                                        />
                                                    ) :
                                                        <>
                                                            <ImagensCategoryUpload src={"http://localhost:3333/files/" + categoryImage} />
                                                            <TextImagens>Clique na seta e insira<br /> uma imagem</TextImagens>
                                                        </>
                                                    }
                                                </EtiquetaImagens>
                                            </BlockImagem>
                                        </FormImagens>
                                    </>
                                }
                            </SectionDate>
                        </GridDate>
                        <br />
                        <br />
                        <br />
                        <br />
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
                    </Card>
                </Container>
            </Grid>
            {modalVisibleImagem && (
                <ModalDeleteImagemCategory
                    isOpen={modalVisibleImagem}
                    onRequestClose={handleCloseModalDeleteImagem}
                    /* @ts-ignore */
                    idImage={modalItemImagem}
                />
            )}
        </>
    )
}

export default Categoria;