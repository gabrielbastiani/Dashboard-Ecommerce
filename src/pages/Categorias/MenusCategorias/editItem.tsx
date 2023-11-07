import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { ModalDeleteIDSCategoryMenu } from "../../../components/popups/ModalDeleteIDSCategoryMenu";
import { ModalDeleteCategoryMenu } from "../../../components/popups/ModalDeleteCategoryMenu";
import { ModalDeleteImagemCategoryMenu } from "../../../components/popups/ModalDeleteImagemCategoryMenu";
import Modal from 'react-modal';
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../styles";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { GridDate } from "../../Perfil/styles";
import { Button } from "../../../components/ui/Button";
import { SectionDate } from "../../Configuracoes/styles";
import { BlockDados, IconSpanCatgoryImagens, ImagensCategoryPreviewUrl, ImagensCategoryUpload } from "../Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { EtiquetaTextImagem, FormUpdateImage, InputLogoTextImagem, TextPhoto } from "../../Configuracoes/ImagensInstitucionais/Imagem/styles";
import { MdFileUpload } from "react-icons/md";
import { BlockImagem, EtiquetaImagens, FormImagens, InputImagens, TextImagens } from "../../Configuracoes/ImagensInstitucionais/styles";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import Warnings from "../../../components/Warnings";


export type DeleteImagemItem = {
    iDImage: string;
}

export type DeleteCategoriesGroups = {
    menuCategory_id: string;
    iDImage: string;
}

export type DeleteItens = {
    menuCategory_id: string;
}

const EditItem: React.FC = () => {

    let { menuCategory_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState("");
    const [name, setName] = useState("");
    const [order, setOrder] = useState(Number);
    const [status, setStatus] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const valueArray = categorySelected.split(",");

    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryImageUrl, setCategoryImageUrl] = useState('');

    const [categoryImageUpload, setCategoryImageUpload] = useState(null);
    const [categoryImageUploadUrl, setCategoryImageUploadUrl] = useState('');

    const [imageCategories, setImageCategories] = useState("");
    const [iDImage, setIDImage] = useState("");

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [modalItens, setModalItens] = useState("");
    const [modalVisibleItens, setModalVisibleItens] = useState(false);

    const [modalItemImagem, setModalItemImagem] = useState("");
    const [modalVisibleImagem, setModalVisibleImagem] = useState(false);


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    useEffect(() => {
        async function loadItemDate() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findUniqueMenu?menuCategory_id=${menuCategory_id}`);

                setCategoryName(data.categoryName || "");
                setOrder(data.order);
                setStatus(data.status);
                setImageCategories(data.imagemenucategories ? data.imagemenucategories[0].image : data.imagemenucategories.image);
                setCategoryImageUpload(data.imagemenucategories ? data.imagemenucategories[0].image : data.imagemenucategories.image);
                
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadItemDate();
    }, [menuCategory_id]);

    useEffect(() => {
        async function loadCategory() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findUniqueMenu?menuCategory_id=${menuCategory_id}`);

                setName(data.category.name);
                setNameGroup(data.nameGroup || "");
                setIDImage(data.imagemenucategories ? data.imagemenucategories[0].id : data.imagemenucategories.id);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCategory();
    }, [menuCategory_id]);

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

    async function updateCategory() {
        try {
            if (categorySelected === "" || categorySelected === null || categorySelected === undefined) {
                toast.error(`Selecione a categoria, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateItemNameCategory?menuCategory_id=${menuCategory_id}`, { categoryName: valueArray[1] });
            await apiClient.put(`/updateNameCategory?menuCategory_id=${menuCategory_id}`, { name: valueArray[1] });

            toast.success('Categoria atualizada com sucesso.');

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
                await apiClient.put(`/updateOrderCategoryMenu?menuCategory_id=${menuCategory_id}`, { order: Number(order) });
                toast.success('Ordem da categoria no menu atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria no menu.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusMenu?menuCategory_id=${menuCategory_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade do item categoria nesse menu.');
        }

        if (status === "Indisponivel") {
            toast.success(`O item categoria se encontra Disponivel no menu.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`O item categoria se encontra Indisponivel no menu.`);
            return;
        }
    }

    async function handleRegisterImageCategory(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', categoryImage);/* @ts-ignore */
            data.append('menuCategory_id', menuCategory_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageMenuCategory`, data);

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
            await apiClient.put(`/updateImageMenuCategory?imageMenuCategory_id=${iDImage}`, data);

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

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(menuCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueMenu', {
            params: {
                menuCategory_id: menuCategory_id,
            }
        });
        setModalItem(response.data || "");
        setIDImage(response.data.imagemenucategories[0].id || "");
        setModalVisible(true);
    }

    function handleCloseModalDeleteItens() {
        setModalVisibleItens(false);
    }

    async function handleOpenModalDeleteItens(menuCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueMenu', {
            params: {
                menuCategory_id: menuCategory_id,
            }
        });
        setModalItens(response.data || "");
        setModalVisibleItens(true);
    }

    function handleCloseModalDeleteImagem() {
        setModalVisibleImagem(false);
    }

    async function handleOpenModalDeleteImagem(menuCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueMenu', {
            params: {
                menuCategory_id: menuCategory_id,
            }
        });
        setModalItemImagem(response.data.imagemenucategories[0].id || "");
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
                                titulo={`Editar item - ${categoryName}`}
                            />

                            {imageCategories ? (
                                <Button
                                    style={{ backgroundColor: 'red' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDelete(menuCategory_id)}
                                >
                                    Deletar item
                                </Button>
                            ) :
                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDeleteItens(menuCategory_id)}
                                >
                                    Deletar item
                                </Button>
                            }

                        </BlockTop>

                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Categoria"}
                                        dados={
                                            <SelectUpdate
                                                dado={name}
                                                handleSubmit={updateCategory}
                                                value={categorySelected}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                        ...(categories || []).map((item) => ({ label: item.name, value: [item.id, item.name] }))
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

                                {imageCategories ? (
                                    <Button
                                        /* @ts-ignore */
                                        onClick={() => handleOpenModalDeleteImagem(menuCategory_id)}
                                    >
                                        Deletar imagem
                                    </Button>
                                ) :
                                    null
                                }

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
                                                            style={{ backgroundColor: 'green' }}
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
                    </Card>
                </Container>
            </Grid >
            {modalVisible && (
                <ModalDeleteIDSCategoryMenu
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relationIDS={modalItem}
                    /* @ts-ignore */
                    idGroupImage={iDImage}
                />
            )}

            {modalVisibleItens && (
                <ModalDeleteCategoryMenu
                    isOpen={modalVisibleItens}
                    onRequestClose={handleCloseModalDeleteItens}
                    /* @ts-ignore */
                    itensIds={modalItens}
                />
            )}

            {modalVisibleImagem && (
                <ModalDeleteImagemCategoryMenu
                    isOpen={modalVisibleImagem}
                    onRequestClose={handleCloseModalDeleteImagem}
                    /* @ts-ignore */
                    idImage={modalItemImagem}
                />
            )}
        </>
    )
}

export default EditItem;