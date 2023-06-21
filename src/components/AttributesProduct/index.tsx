import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { setupAPIClient } from "../../services/api";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
    ContainerCategories,
    ContainerCategoriesBox,
    GridContainer,
    TextNotFound
} from "../CategoriesProduct/styles";
import { BsTrash } from "react-icons/bs";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { ButtonSelect } from "../ui/ButtonSelect";
import { TextoDados } from "../TextoDados";
import { InputUpdate } from "../ui/InputUpdate";
import SelectUpdate from "../ui/SelectUpdate";
import { Block, Etiqueta } from "../../pages/Categorias/styles";
import { InputPost } from "../ui/InputPost";
import Select from "../ui/Select";
import Titulos from "../Titulos";
import { ModalDeleteAttributeProduct } from "../popups/ModalDeleteAttributeProduct";
import {
    AttributeImg,
    ButtonImg,
    EtiquetaImg,
    FormImage,
    IconSpanUpload,
    PreviewImageAttribute,
    TextUpdate
} from "./styles";
import { InputLogo, TextLogo } from "../../pages/Configuracoes/styles";
import { MdFileUpload } from "react-icons/md";
import { ModalDeleteImageAttributeProduct } from "../popups/ModalDeleteImageAttributeProduct";



export type DeleteRelationsAttribute = {
    id: string;
}

export type DeleteImageAttribute = {
    id: string;
}

interface AtributeRequest {
    product_id: any;
}

const AttributesProduct = ({ product_id }: AtributeRequest) => {

    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [typesAttributes, setTypesAttributes] = useState<any[]>([]);
    const [attributesLoad, setAttributesLoad] = useState<any[]>([]);
    const [attributesparentId, setAttributesparentId] = useState<any[]>([]);

    const [typeSelected, setTypeSelected] = useState();
    const [value, setValue] = useState("");
    const [valueUpdate, setValueUpdate] = useState("");
    const [order, setOrder] = useState();
    const [orderUpdate, setOrderUpdate] = useState(Number);

    const [imageAttr, setImageAttr] = useState(null);
    const [imageAttrUrl, setImageAttrUrl] = useState('');

    const [imageAttrUpdate, setImageAttrUpdate] = useState(null);
    const [imageAttrUpdateUrl, setImageAttrUpdateUrl] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [modalItemImage, setModalItemImage] = useState('');
    const [modalVisibleImage, setModalVisibleImage] = useState(false);

    const [activeTab, setActiveTab] = useState("");

    const handleClick: any = (id: string) => {
        setActiveTab(id);
        loadAttributesParentId(id);
    };

    function handleChangeTypeAttribute(e: any) {
        setTypeSelected(e.target.value);
    }

    useEffect(() => {
        async function loadTypes() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allTypeAttributes');
                setTypesAttributes(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadTypes();
    }, [product_id]);

    useEffect(() => {
        async function loadAttributes() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allAttributeProduct?product_id=${product_id}`);
                setAttributesLoad(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAttributes();
    }, [product_id]);

    async function loadAttributesParentId(id: string) {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/findManyParentIDattributes?parentId=${id}`);
            setAttributesparentId(response.data || []);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterAttributeZero() {
        const apiClient = setupAPIClient();
        try {
            if (typeSelected === "" || typeSelected === null || typeSelected === undefined) {
                toast.error('Favor, selecione um tipo!');
                return;
            }

            await apiClient.post('/createRelationAttributeProduct', {
                product_id: product_id,
                type: typeSelected,
                value: "",
                nivel: 0,
                order: Number(order),
                store_id: store_id
            });

            toast.success('Tipo do atributo cadastrado com sucesso!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar tipo de atributo');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function handleRegisterAttributeUm(id: string) {
        const apiClient = setupAPIClient();
        try {
            if (value === "") {
                toast.error('Favor, não deixe em branco');
                return;
            }

            await apiClient.post('/createRelationAttributeProduct', {
                product_id: product_id,
                value: value,
                nivel: 1,
                order: Number(order),
                parentId: id,
                store_id: store_id
            });

            toast.success('Valor do atributo cadastrado com sucesso!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar valo de atributo no produto');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateTypeAttribute(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateTypeRelationAttributeProduct?relationAttributeProduct_id=${id}`, {
                type: typeSelected
            });

            toast.success('Tipo do atributo atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o tipo do produto.');
        }
    }

    async function updateValueAttribute(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateValueRelationAttributeProduct?relationAttributeProduct_id=${id}`, { value: valueUpdate });

            toast.success('Valor do atributo atualizado com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o valor do atributo.');
        }
    }

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelationAttributeProduct?relationAttributeProduct_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem do atributo atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 2800);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do atributo.');
        }
    }

    async function updateStatus(id: string, status: string) {
        console.log(id)
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusRelationAttributeProduct?relationAttributeProduct_id=${id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar o status do atributo no produto.');
        }

        if (status === "Indisponivel") {
            toast.success(`O atributo do produto se encontra disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`O atributo do produto se encontra indisponivel.`);
            return;
        }
    }

    async function handleImageAttribute(event: FormEvent, id: string) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageAttr);
            data.append('relationAttributeProduct_id', id);
            data.append('product_id', product_id);

            await apiClient.post(`/createImageAttributeProduct`, data);

            toast.success('Imagem cadastrada no atributo com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a imagem.');
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
            setImageAttr(image);
            setImageAttrUrl(URL.createObjectURL(image));
        }

    }

    async function handleImageAttributeUpdate(event: FormEvent, id: string) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageAttrUpdate);

            await apiClient.put(`/updateImageAttribute?imageAttribute_id=${id}`, data);

            toast.success('Imagem atualizada no atributo com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao atualizar a imagem.');
        }

    }

    function handleFileUpdate(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setImageAttrUpdate(image)
            setImageAttrUpdateUrl(URL.createObjectURL(image))
        }

    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueRelationAttributeProduct', {
            params: {
                relationAttributeProduct_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    function handleCloseModalDeleteImage() {
        setModalVisibleImage(false);
    }

    async function handleOpenModalDeleteImage(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueImageAttribute', {
            params: {
                imageAttribute_id: id,
            }
        });
        setModalItemImage(response.data || "");
        setModalVisibleImage(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Cadastre atributos para o produto"
            />
            <br />
            <br />
            <Etiqueta>Escolha tipo de atributo:</Etiqueta>
            <Select
                value={typeSelected}
                /* @ts-ignore */
                onChange={handleChangeTypeAttribute}
                opcoes={
                    [
                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                        ...(typesAttributes || []).map((item) => ({ label: item.type, value: item.type }))
                    ]
                }
            />
            <Block>
                <Etiqueta>Ordem do tipo:</Etiqueta>
                <InputPost
                    type="number"
                    placeholder="0"
                    value={order}/* @ts-ignore */
                    onChange={(e) => setOrder(e.target.value)}
                />
            </Block>

            <Button
                style={{ backgroundColor: 'green' }}
                onClick={handleRegisterAttributeZero}
            >
                Continuar...
            </Button>
            <br />
            <br />
            <GridContainer>
                {attributesLoad.length < 1 ? (
                    <>
                        <TextNotFound>Não há atributos cadastrados no produto ainda...</TextNotFound>
                    </>
                ) :
                    <>
                        {attributesLoad.map((item) => {
                            return (
                                <>
                                    <ContainerCategories key={item.id}>
                                        <ContainerCategoriesBox>
                                            <BlockDados
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <TextoDados
                                                    chave={"Tipo do atributo"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={item.type}
                                                            handleSubmit={() => updateTypeAttribute(item.id)}
                                                            value={typeSelected}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                    ...(typesAttributes || []).map((item) => ({ label: item.type, value: item.type }))
                                                                ]
                                                            }/* @ts-ignore */
                                                            onChange={() => handleChangeTypeAttribute(item.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Ordem"}
                                                    dados={
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
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Status"}
                                                    dados={
                                                        <ButtonSelect
                                                            /* @ts-ignore */
                                                            dado={item.status}
                                                            handleSubmit={() => updateStatus(item.id, item.status)}
                                                        />
                                                    }
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                                <BsTrash
                                                    onClick={() => handleOpenModalDelete(item.id)}
                                                    style={{ cursor: 'pointer', margin: '13px 0' }}
                                                    color="red"
                                                    size={35}
                                                />
                                            </BlockDados>

                                            <Button
                                                style={{ height: '50px', backgroundColor: 'green' }}
                                                onClick={() => handleClick(item.id)}
                                            >
                                                Inserir valor
                                            </Button>

                                        </ContainerCategoriesBox>
                                    </ContainerCategories>
                                </>
                            )
                        })}
                        <br />
                        {attributesLoad.map((item) => {
                            return (
                                <>
                                    {activeTab === item.id ?
                                        <>
                                            <Block key={item.id}>
                                                <Etiqueta>Valor:</Etiqueta>
                                                <InputPost
                                                    type="text"
                                                    placeholder="Digite aqui..."
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                />
                                            </Block>

                                            <Block>
                                                <Etiqueta>Ordem do atributo:</Etiqueta>
                                                <InputPost
                                                    type="number"
                                                    placeholder="0"
                                                    value={order}/* @ts-ignore */
                                                    onChange={(e) => setOrder(e.target.value)}
                                                />
                                            </Block>

                                            <Button
                                                style={{ backgroundColor: 'green' }}
                                                onClick={() => handleRegisterAttributeUm(item.id)}
                                            >
                                                Salvar
                                            </Button>
                                        </>
                                        :
                                        null
                                    }
                                </>
                            )
                        })}
                        <br />
                        <br />
                        {attributesparentId.map((valu) => {
                            return (
                                <>
                                    <ContainerCategories key={valu.id}>
                                        <ContainerCategoriesBox>
                                            <BlockDados>
                                                {valu.imageattributes[0] ? (
                                                    <>
                                                        <FormImage onSubmit={(event) => handleImageAttributeUpdate(event, valu.imageattributes[0].id)} >
                                                            <EtiquetaImg>
                                                                <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFileUpdate} alt="atributo loja virtual" />
                                                                {imageAttrUpdateUrl ? (
                                                                    <>
                                                                        <PreviewImageAttribute
                                                                            src={imageAttrUpdateUrl}
                                                                            alt="atributo loja virtual"
                                                                        />
                                                                        <ButtonImg
                                                                            style={{ backgroundColor: 'orange' }}
                                                                            type="submit"
                                                                        >
                                                                            Atualizar
                                                                        </ButtonImg>
                                                                    </>
                                                                ) :
                                                                    <>
                                                                        <TextUpdate>Atualize a imagem</TextUpdate>
                                                                        <AttributeImg src={"http://localhost:3333/files/" + valu.imageattributes[0].image} />
                                                                    </>
                                                                }
                                                            </EtiquetaImg>
                                                        </FormImage>
                                                        &nbsp;
                                                        &nbsp;
                                                        <ButtonImg
                                                            style={{ backgroundColor: 'red' }}
                                                            onClick={() => handleOpenModalDeleteImage(valu.imageattributes[0].id)}
                                                        >
                                                            Deletar<br />Imagem
                                                        </ButtonImg>
                                                    </>
                                                ) :
                                                    <FormImage onSubmit={(event) => handleImageAttribute(event, valu.id)} >
                                                        <EtiquetaImg>
                                                            <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="atrbuto loja virtual" />
                                                            {imageAttrUrl ? (
                                                                <>
                                                                    <PreviewImageAttribute
                                                                        src={imageAttrUrl}
                                                                        alt="atrbuto loja virtual"
                                                                    />
                                                                    <ButtonImg
                                                                        type="submit"
                                                                    >
                                                                        Salvar
                                                                    </ButtonImg>
                                                                </>
                                                            ) :
                                                                <>
                                                                    <IconSpanUpload>
                                                                        <MdFileUpload size={30} />
                                                                    </IconSpanUpload>
                                                                    <TextLogo>Insira uma imagem</TextLogo>
                                                                </>
                                                            }
                                                        </EtiquetaImg>
                                                    </FormImage>
                                                }
                                            </BlockDados>

                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Valor"}
                                                    dados={
                                                        <InputUpdate
                                                            dado={valu.value}
                                                            type="text"
                                                            placeholder={valu.value}
                                                            value={valueUpdate}
                                                            onChange={(e) => setValueUpdate(e.target.value)}
                                                            handleSubmit={() => updateValueAttribute(valu.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Ordem"}
                                                    dados={
                                                        <InputUpdate
                                                            dado={String(valu.order)}
                                                            type="number"
                                                            /* @ts-ignore */
                                                            placeholder={String(valu.order)}
                                                            value={orderUpdate}
                                                            /* @ts-ignore */
                                                            onChange={(e) => setOrderUpdate(e.target.value)}
                                                            handleSubmit={() => updateOrder(valu.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
                                                <BsTrash
                                                    onClick={() => handleOpenModalDelete(valu.id)}
                                                    style={{ cursor: 'pointer', margin: '13px 0' }}
                                                    color="red"
                                                    size={35}
                                                />
                                            </BlockDados>
                                        </ContainerCategoriesBox>
                                    </ContainerCategories>
                                </>
                            )
                        })}
                    </>
                }
                {modalVisible && (
                    <ModalDeleteAttributeProduct
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModalDelete}
                        /* @ts-ignore */
                        relation={modalItem}
                    />
                )}
                {modalVisibleImage && (
                    <ModalDeleteImageAttributeProduct
                        isOpen={modalVisibleImage}
                        onRequestClose={handleCloseModalDeleteImage}
                        /* @ts-ignore */
                        relationImage={modalItemImage}
                    />
                )}
            </GridContainer>
        </>
    )
}

export default AttributesProduct;