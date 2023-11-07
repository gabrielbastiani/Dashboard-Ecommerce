import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { BlockDados, IconSpanCatgoryImagens, ImagensCategoryPreviewUrl, ImagensCategoryUpload } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { EtiquetaTextImagem, FormUpdateImage, InputLogoTextImagem, TextPhoto } from "../../Configuracoes/ImagensInstitucionais/Imagem/styles";
import { MdFileUpload } from "react-icons/md";
import { BlockImagem, EtiquetaImagens, FormImagens, InputImagens, TextImagens } from "../../Configuracoes/ImagensInstitucionais/styles";
import { ModalDeleteFiltroCategory } from "../../../components/popups/ModalDeleteFiltroCategory";
import { ModalDeleteFiltroAndImageCategory } from "../../../components/popups/ModalDeleteFiltroAndImageCategory";
import { ModalDeleteImagemFiltroCateg } from "../../../components/popups/ModalDeleteImagemFiltroCateg";
import Warnings from "../../../components/Warnings";


export type DeleteFiltroCateg = {
    filterCategory_id: string;
}

export type DeleteImagemAtributoCateg = {
    iDImage: string;
}

export type DeleteFiltroAndImageCateg = {
    filterCategory_id: string;
    iDImage: string;
}

const EditCategoryFiltro: React.FC = () => {

    let { filterCategory_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState(Number);
    const [status, setStatus] = useState("");

    const [imageCategory, setImageCategory] = useState(null);
    const [imageCategoryUrl, setImageCategoryUrl] = useState('');

    const [imageCategoryUpload, setImageCategoryUpload] = useState(null);
    const [imageCategoryUploadUrl, setImageCategoryUploadUrl] = useState('');

    const [imageCategoryLoad, setImageCategoryLoad] = useState("");
    const [iDImage, setIDImage] = useState("");

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [modalItens, setModalItens] = useState("");
    const [modalVisibleItens, setModalVisibleItens] = useState(false);

    const [modalItemImagem, setModalItemImagem] = useState("");
    const [modalVisibleImagem, setModalVisibleImagem] = useState(false);


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value);
    }

    useEffect(() => {
        async function loadItemDate() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueFilterCategory?filterCategory_id=${filterCategory_id}`);

                setNameGroup(response.data.groupFilter.nameGroup);
                setOrder(response.data.order);
                setStatus(response.data.status);
                setImageCategoryLoad(response.data.imageFilterCategories ? response.data.imageFilterCategories[0].imageCategory : response.data.imageFilterCategories.imageCategory);
                setImageCategoryUpload(response.data.imageFilterCategories ? response.data.imageFilterCategories[0].imageCategory : response.data.imageFilterCategories.imageCategory);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadItemDate();
    }, [filterCategory_id]);

    useEffect(() => {
        async function loadMoreDates() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueFilterCategory?filterCategory_id=${filterCategory_id}`);

                setCategory(response.data.name);
                setIDImage(response.data.imageFilterCategories ? response.data.imageFilterCategories[0].id : response.data.imageFilterCategories.id);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadMoreDates();
    }, [filterCategory_id]);

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/listCategorysDisponivel');
                setCategories(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, []);

    async function updateValorAtributo() {
        try {
            if (categorySelected === "") {
                toast.error(`Selecione a categoria, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateCategoryNameFilter?filterCategory_id=${filterCategory_id}`, { name: categorySelected });

            toast.success('A categoria foi atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a categoria.');
        }
    }

    async function updateOrder() {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateFilterOrderCategory?filterCategory_id=${filterCategory_id}`, { order: Number(order) });
                toast.success('Ordem da categoria no grupo/filtro atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria no grupo/filtro.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateFilterStatusCategory?filterCategory_id=${filterCategory_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade da categoria/filtro nesse grupo.');
        }

        if (status === "Indisponivel") {
            toast.success(`A categoria/filtro se encontra Disponivel no grupo.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`A categoria/filtro se encontra Indisponivel no grupo.`);
            return;
        }
    }

    async function handleCreateImageFiltro(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageCategory);/* @ts-ignore */
            data.append('filterCategory_id', filterCategory_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageFilterCategory`, data);

            toast.success('Imagem cadastrada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a imagem!!!');
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
            setImageCategory(image)
            setImageCategoryUrl(URL.createObjectURL(image))
        }

    }

    async function handleImageUpload(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageCategoryUpload);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageFilterCategory?imageFilterCategory_id=${iDImage}`, data);

            toast.success('Imagem atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao atualizar a imagem da categoria/filtro!!!');
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
            setImageCategoryUpload(image);
            setImageCategoryUploadUrl(URL.createObjectURL(image));
        }

    }

    function handleCloseModalDeleteFiltro() {
        setModalVisibleItens(false);
    }

    async function handleOpenModalDeleteFiltro(filterCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueFilterCategory', {
            params: {
                filterCategory_id: filterCategory_id,
            }
        });
        setModalItens(response.data || "");
        setModalVisibleItens(true);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(filterCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueFilterCategory', {
            params: {
                filterCategory_id: filterCategory_id,
            }
        });
        setModalItem(response.data || "");
        setIDImage(response.data.imageFilterCategories[0].id || "");
        setModalVisible(true);
    }

    function handleCloseModalDeleteImagem() {
        setModalVisibleImagem(false);
    }

    async function handleOpenModalDeleteImagem(filterCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueFilterCategory', {
            params: {
                filterCategory_id: filterCategory_id,
            }
        });
        setModalItemImagem(response.data.imageFilterCategories[0].id || "");
        setModalVisibleImagem(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>
                        <VoltarNavagation />
                        <BlockTop>
                            <Titulos
                                tipo="h4"
                                titulo={`Grupo = ${nameGroup}`}
                            />
                        </BlockTop>
                        <br />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={`Editar filtro/categoria - ${category}`}
                            />

                            {imageCategoryLoad ? (
                                <Button
                                    style={{ backgroundColor: 'red' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDelete(filterCategory_id)}
                                >
                                    Deletar filtro
                                </Button>
                            ) :
                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDeleteFiltro(filterCategory_id)}
                                >
                                    Deletar filtro
                                </Button>
                            }

                        </BlockTop>

                        <GridDate>
                            <SectionDate>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Categoria filtro"}
                                        dados={
                                            <SelectUpdate
                                                dado={category}
                                                handleSubmit={updateValorAtributo}
                                                value={categorySelected}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                        ...(categories || []).map((item) => ({ label: item.name, value: item.name }))
                                                    ]
                                                }/* @ts-ignore */
                                                onChange={handleChangeCategory}
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
                                                handleSubmit={updateOrder}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Ativo?"}
                                        dados={
                                            <ButtonSelect
                                                dado={status}
                                                handleSubmit={updateStatus}
                                                showElement={status}
                                            />
                                        }
                                    />
                                </BlockDados>
                                <br />
                                <br />
                                {imageCategoryLoad ? (
                                    <Button
                                        /* @ts-ignore */
                                        onClick={() => handleOpenModalDeleteImagem(filterCategory_id)}
                                    >
                                        Deletar imagem
                                    </Button>
                                ) :
                                    null
                                }

                            </SectionDate>

                            <SectionDate>
                                {imageCategoryLoad ? (
                                    <>
                                        <FormUpdateImage onSubmit={handleImageUpload}>
                                            <EtiquetaTextImagem>
                                                {imageCategoryUploadUrl ? (
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
                                                {imageCategoryUploadUrl ? (
                                                    <>
                                                        <ImagensCategoryUpload
                                                            src={imageCategoryUploadUrl}
                                                        />
                                                    </>
                                                ) :
                                                    <>
                                                        <TextPhoto>Clique para carregar uma nova imagem</TextPhoto>
                                                        <ImagensCategoryPreviewUrl src={"http://localhost:3333/files/" + imageCategoryUpload} />
                                                    </>
                                                }
                                            </EtiquetaTextImagem>
                                        </FormUpdateImage>
                                    </>
                                ) :
                                    <>
                                        <FormImagens onSubmit={handleCreateImageFiltro}>
                                            <BlockImagem>
                                                <EtiquetaImagens>
                                                    {imageCategoryUrl ? (
                                                        <Button
                                                            style={{ backgroundColor: 'green' }}
                                                            type="submit"
                                                        >
                                                            Salvar Imagem
                                                        </Button>
                                                    ) : null}
                                                    <IconSpanCatgoryImagens>
                                                        <MdFileUpload size={50} />
                                                    </IconSpanCatgoryImagens>
                                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="imagem do Valor/filtro" />
                                                    {imageCategoryUrl ? (
                                                        <ImagensCategoryPreviewUrl
                                                            src={imageCategoryUrl}
                                                            alt="imagem do Valor/filtro"
                                                        />
                                                    ) :
                                                        <>
                                                            <ImagensCategoryUpload src={"http://localhost:3333/files/" + imageCategory} />
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
                    </Card>
                </Container>
            </Grid >

            {modalVisibleItens && (
                <ModalDeleteFiltroCategory
                    isOpen={modalVisibleItens}
                    onRequestClose={handleCloseModalDeleteFiltro}
                    /* @ts-ignore */
                    relationIDS={modalItens}
                />
            )}

            {modalVisible && (
                <ModalDeleteFiltroAndImageCategory
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relationIDS={modalItem}
                    /* @ts-ignore */
                    idGroupImage={iDImage}
                />
            )}

            {modalVisibleImagem && (
                <ModalDeleteImagemFiltroCateg
                    isOpen={modalVisibleImagem}
                    onRequestClose={handleCloseModalDeleteImagem}
                    /* @ts-ignore */
                    idImage={modalItemImagem}
                />
            )}
        </>
    )
}

export default EditCategoryFiltro;