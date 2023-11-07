import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { Block, BlockTop, Etiqueta } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { AuthContext } from "../../../contexts/AuthContext";
import { DivisorHorizontal } from "../../../components/ui/DivisorHorizontal";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import { Avisos } from "../../../components/Avisos";
import { GridDate } from "../../Perfil/styles";
import {
    InputLogo,
    SectionDate,
    TextLogo
} from "../../Configuracoes/styles";
import {
    AttributeImg,
    ButtonImg,
    EtiquetaImg,
    FormImage,
    IconSpanUpload,
    PreviewImageAttribute,
    TextUpdate
} from "../../../components/AttributesProduct/styles";
import { MdFileUpload } from "react-icons/md";
import { ModalDeleteImageAttributeProduct } from "../../../components/popups/ModalDeleteImageAttributeProduct";
import { BsTrash } from "react-icons/bs";
import { ModalDeleteAttributeProduct } from "../../../components/popups/ModalDeleteAttributeProduct";
import { ContainerCupon } from "./styles";
import Warnings from "../../../components/Warnings";


export type DeleteRelationsAttribute = {
    id: string;
}

export type DeleteImageAttribute = {
    id: string;
}

const Atributo: React.FC = () => {

    let { typeAttribute_id } = useParams();
    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [typeUpdate, setTypeUpdate] = useState("");

    const [value, setValue] = useState("");
    const [valueUpdate, setValueUpdate] = useState("");
    const [order, setOrder] = useState(Number);
    const [orderUpdate, setOrderUpdate] = useState();

    const [imageAttr, setImageAttr] = useState(null);
    const [imageAttrUrl, setImageAttrUrl] = useState('');

    const [imageAttrUpdate, setImageAttrUpdate] = useState(null);
    const [imageAttrUpdateUrl, setImageAttrUpdateUrl] = useState('');

    const [modalItemImage, setModalItemImage] = useState('');
    const [modalVisibleImage, setModalVisibleImage] = useState(false);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [loadValueType, setLoadValueType] = useState<any[]>([]);


    useEffect(() => {
        async function loadType() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueTypeAttribute?typeAttribute_id=${typeAttribute_id}`);
                setType(response.data.type || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadType();
    }, [typeAttribute_id]);

    useEffect(() => {
        async function loadAllAttributeType() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allValuesTypeAttribute?type=${type}`);
                setLoadValueType(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAllAttributeType();
    }, [type]);

    async function updateType() {
        try {
            const apiClient = setupAPIClient();
            if (type === '') {
                toast.error('Não deixe o campo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTypeAttribute?typeAttribute_id=${typeAttribute_id}`, { type: typeUpdate });
                toast.success('Tipo do atributo atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o tipo do atributo.');
        }
    }

    async function handleRegisterValueAtribute() {
        try {
            if (value === "") {
                toast.error('Não deixe o campo em branco!!!');
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createValueAttribute', {
                value: value,
                type: type,
                order: Number(order),
                store_id: admin.store_id
            });

            toast.success('Valor de atributo cadastrado com sucesso');

            setValue("");

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar o valor de atributo!');
        }

    }

    async function updateValue(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (valueUpdate === '') {
                toast.error('Não deixe o campo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateValueAttribute?valueAttribute_id=${id}`, { value: valueUpdate });
                toast.success('Valor do atributo atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
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
                await apiClient.put(`/updateOrderValueAttribute?valueAttribute_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem do valor atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do atributo.');
        }
    }

    async function handleImageAttribute(event: FormEvent, id: string) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageAttr);
            data.append('valueAttribute_id', id);

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

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueValueAttribute', {
            params: {
                valueAttribute_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
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
                        <Voltar
                            url="/atributos"
                        />
                        <BlockTop>
                            <Titulos
                                /* @ts-ignore */
                                type="h1"
                                titulo={`Editar tipo de atributo = ${type}`}
                            />
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Tipo de atributo"}
                                dados={
                                    <InputUpdate
                                        dado={type}
                                        type="text"
                                        placeholder={type}
                                        value={typeUpdate}
                                        onChange={(e) => setTypeUpdate(e.target.value)}
                                        handleSubmit={updateType}
                                    />
                                }
                            />
                        </BlockDados>

                        <DivisorHorizontal />

                        <Block>
                            <Etiqueta>Valor para esse tipo de atributo:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o valor"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Ordem:</Etiqueta>
                            <InputPost
                                type="number"
                                placeholder="0"
                                value={order}/* @ts-ignore */
                                onChange={(e) => setOrder(e.target.value)}
                            />
                        </Block>

                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterValueAtribute}
                        >
                            Salvar valor
                        </Button>
                        <br />
                        <br />

                        {loadValueType.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há valores cadastrados nesse tipo de atributo ainda..."
                                />
                            </>
                        ) :
                            <>
                                {loadValueType.map((item, index) => {
                                    return (
                                        <ContainerCupon key={index}>
                                            <Card>
                                                <Titulos
                                                    tipo="h3"
                                                    titulo={item.value}
                                                />
                                                <GridDate>
                                                    <SectionDate>
                                                        <BlockDados>
                                                            {item.imageAttribute[0] ? (
                                                                <>
                                                                    <FormImage key={item.id} onSubmit={(event) => handleImageAttributeUpdate(event, item.imageAttribute[0].id)} >
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
                                                                                    <AttributeImg src={"http://localhost:3333/files/" + item.imageAttribute[0].image} />
                                                                                </>
                                                                            }
                                                                        </EtiquetaImg>
                                                                    </FormImage>
                                                                    &nbsp;
                                                                    &nbsp;
                                                                    <ButtonImg
                                                                        style={{ backgroundColor: 'red' }}
                                                                        onClick={() => handleOpenModalDeleteImage(item.imageAttribute[0].id)}
                                                                    >
                                                                        Deletar<br />Imagem
                                                                    </ButtonImg>
                                                                </>
                                                            ) :
                                                                <FormImage onSubmit={(event) => handleImageAttribute(event, item.id)} >
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
                                                    </SectionDate>

                                                    <SectionDate>
                                                        <BlockDados>
                                                            <TextoDados
                                                                chave={"Editar valor"}
                                                                dados={
                                                                    <InputUpdate
                                                                        dado={item.value}
                                                                        type="text"
                                                                        placeholder={item.value}
                                                                        value={valueUpdate}
                                                                        onChange={(e) => setValueUpdate(e.target.value)}
                                                                        handleSubmit={() => updateValue(item.id)}
                                                                    />
                                                                }
                                                            />
                                                        </BlockDados>
                                                    </SectionDate>

                                                    <SectionDate>
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
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            <BsTrash
                                                                onClick={() => handleOpenModalDelete(item.id)}
                                                                style={{ cursor: 'pointer', margin: '13px 0' }}
                                                                color="red"
                                                                size={35}
                                                            />
                                                        </BlockDados>
                                                    </SectionDate>
                                                </GridDate>
                                            </Card>
                                        </ContainerCupon>
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
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Atributo;