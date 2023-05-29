import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { ModalDeleteIDSCategoryGroup } from "../../../components/popups/ModalDeleteIDSCategoryGroup";
import { ModalDeleteCategoryGroup } from "../../../components/popups/ModalDeleteCategoryGroup";
import { ModalDeleteImagemCategoryGroup } from "../../../components/popups/ModalDeleteImagemCategoryGroup";
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


export type DeleteImagemItem = {
    iDImage: string;
}

export type DeleteCategoriesGroups = {
    groupCategoy_id: string;
    iDImage: string;
}

export type DeleteItens = {
    groupCategoy_id: string;
}

const EditItem: React.FC = () => {

    let { groupCategoy_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [order, setOrder] = useState(Number);
    const [status, setStatus] = useState("");
    const [itemName, setItemName] = useState("");

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
                const { data } = await apiClient.get(`/findUniqueGroup?groupCategoy_id=${groupCategoy_id}`);

                setItemName(data.itemName || "");
                setOrder(data.order);
                setStatus(data.status);
                setImageCategories(data.imagegroupcategories ? data.imagegroupcategories[0].imageGroup : data.imagegroupcategories.imageGroup);
                setCategoryImageUpload(data.imagegroupcategories ? data.imagegroupcategories[0].imageGroup : data.imagegroupcategories.imageGroup);
                
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadItemDate();
    }, [groupCategoy_id]);

    useEffect(() => {
        async function loadCategory() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findUniqueGroup?groupCategoy_id=${groupCategoy_id}`);

                setCategoryName(data.category.categoryName);
                setNameGroup(data.nameGroup || "");
                setIDImage(data.imagegroupcategories ? data.imagegroupcategories[0].id : data.imagegroupcategories.id);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCategory();
    }, [groupCategoy_id]);

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
            await apiClient.put(`/updateItemName?groupCategoy_id=${groupCategoy_id}`, { itemName: valueArray[1] });
            await apiClient.put(`/updateCategoryGroup?groupCategoy_id=${groupCategoy_id}`, { category_id: valueArray[0] });

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
                await apiClient.put(`/updateOrderItemGroup?groupCategoy_id=${groupCategoy_id}`, { order: Number(order) });
                toast.success('Ordem da categoria no grupo atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria no grupo.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusGroup?groupCategoy_id=${groupCategoy_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade do item categoria nesse grupo.');
        }

        if (status === "Inativo") {
            toast.success(`O item categoria se encontra Disponivel no grupo.`);
            return;
        }

        if (status === "Ativo") {
            toast.error(`O item categoria se encontra Indisponivel no grupo.`);
            return;
        }
    }

    async function handleRegisterImageCategory(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', categoryImage);/* @ts-ignore */
            data.append('groupCategoy_id', groupCategoy_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageGroup`, data);

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
            await apiClient.put(`/updateImageGroup?imageGroupCategory_id=${iDImage}`, data);

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

    async function handleOpenModalDelete(groupCategoy_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueGroup', {
            params: {
                groupCategoy_id: groupCategoy_id,
            }
        });
        setModalItem(response.data || "");
        setIDImage(response.data.imagegroupcategories[0].id || "")
        setModalVisible(true);
    }

    function handleCloseModalDeleteItens() {
        setModalVisibleItens(false);
    }

    async function handleOpenModalDeleteItens(groupCategoy_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueGroup', {
            params: {
                groupCategoy_id: groupCategoy_id,
            }
        });
        setModalItens(response.data || "");
        setModalVisibleItens(true);
    }

    function handleCloseModalDeleteImagem() {
        setModalVisibleImagem(false);
    }

    async function handleOpenModalDeleteImagem(groupCategoy_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueGroup', {
            params: {
                groupCategoy_id: groupCategoy_id,
            }
        });
        setModalItemImagem(response.data.imagegroupcategories[0].id || "");
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
                                tipo="h4"
                                titulo={`Grupo = ${nameGroup}`}
                            />
                        </BlockTop>
                        <br />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={`Editar item - ${itemName}`}
                            />

                            {imageCategories ? (
                                <Button
                                    style={{ backgroundColor: 'red' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDelete(groupCategoy_id)}
                                >
                                    Deletar item
                                </Button>
                            ) :
                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDeleteItens(groupCategoy_id)}
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
                                                dado={categoryName}
                                                handleSubmit={updateCategory}
                                                value={categorySelected}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                        ...(categories || []).map((item) => ({ label: item.categoryName, value: [item.id, item.categoryName] }))
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
                                        onClick={() => handleOpenModalDeleteImagem(groupCategoy_id)}
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
                <ModalDeleteIDSCategoryGroup
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relationIDS={modalItem}
                    /* @ts-ignore */
                    idGroupImage={iDImage}
                />
            )}

            {modalVisibleItens && (
                <ModalDeleteCategoryGroup
                    isOpen={modalVisibleItens}
                    onRequestClose={handleCloseModalDeleteItens}
                    /* @ts-ignore */
                    itensIds={modalItens}
                />
            )}

            {modalVisibleImagem && (
                <ModalDeleteImagemCategoryGroup
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