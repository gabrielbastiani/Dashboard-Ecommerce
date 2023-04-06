import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../../../Dashboard/styles";
import MainHeader from "../../../../../components/MainHeader";
import Aside from "../../../../../components/Aside";
import { BlockTop, Container } from "../../../../Categorias/styles";
import { Card } from "../../../../../components/Content/styles";
import Voltar from "../../../../../components/Voltar";
import Titulos from "../../../../../components/Titulos";
import { Button } from "../../../../../components/ui/Button";
import { BlockDados } from "../../../../Categorias/Categoria/styles";
import { TextoDados } from "../../../../../components/TextoDados";
import { InputUpdate } from "../../../../../components/ui/InputUpdate";
import {
    FormUpdateImage,
    EtiquetaTextImagem,
    IconSpanTextImage,
    InputLogoTextImagem,
    PreviewTextImagem,
    ImageTextPhoto,
    TextPhoto
} from "./styles";
import { setupAPIClient } from "../../../../../services/api";
import { toast } from "react-toastify";
import { MdFileUpload } from "react-icons/md";
import Modal from 'react-modal';
import { ModalDeleteImagemTexto } from "../../../../../components/popups/ModalDeleteImagemTexto";



export type DeleteImagem = {
    imageloja_id: string;
    textoinstitucional_id: string;
}

const ImagemTexto: React.FC = () => {

    const navigate = useNavigate();
    let { imageloja_id } = useParams();

    const [titleImage, setTitleImage] = useState('');
    const [imageTexto, setImageTexto] = useState(null);
    const [imageTextoUrl, setImageTextoUrl] = useState('');
    const [order, setOrder] = useState(Number);

    const [loading, setLoading] = useState(false);

    const [modalItem, setModalItem] = useState('');
    const [modalItemTexto, setModalItemTexto] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [textoId, setTextoId] = useState('');


    useEffect(() => {
        async function loadImage() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listExactPhotoTextoInstitucional?imageloja_id=${imageloja_id}`);

                setTitleImage(response.data.titleImage || "");
                setImageTexto(response.data.image || null);
                setOrder(response.data.order);
                setTextoId(response.data.textoinstitucional_id);

            } catch (error) {
                console.log(error);
            }
        }
        loadImage();
    }, [imageloja_id]);


    async function updateTitle() {
        try {
            const apiClient = setupAPIClient();
            if (titleImage === "") {
                toast.error('Não deixe o titulo da imagem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTitleImageTextoInstitucional?imageloja_id=${imageloja_id}`, { titleImage: titleImage });
                toast.success('Titulo da imagem atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o titulo da imagem.');
        }
    }

    async function updateOrder() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem da imagem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderImageTextoInstitucional?imageloja_id=${imageloja_id}`, { order: Number(order) });
                toast.success('Ordem da imagem atualizada com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da imagem.');
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
            setImageTexto(image)
            setImageTextoUrl(URL.createObjectURL(image))
        }

    }

    async function handleImageTexto(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (imageTexto === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', imageTexto);

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageTextoInstitucional?imageloja_id=${imageloja_id}`, data);

            toast.success('Image do texto atualizada com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {
            console.log(err);
            toast.error('Ops erro ao atualizar a imagem do texto!');
        }

        setLoading(false);

    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(imageloja_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/listExactPhotoTextoInstitucional', {
            params: {
                imageloja_id: imageloja_id,
            }
        });
        setModalItem(responseDelete.data || "");
        setModalItemTexto(responseDelete.data || "");
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
                            url={`/texto/${textoId}`}
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo='Editar - Imagem do Texto'
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(imageloja_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Titulo da imagem"}
                                dados={
                                    <InputUpdate
                                        dado={titleImage}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={titleImage}
                                        value={titleImage}
                                        /* @ts-ignore */
                                        onChange={(e) => setTitleImage(e.target.value)}
                                        handleSubmit={updateTitle}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Ordem"}
                                dados={
                                    <InputUpdate
                                        dado={String(order)}
                                        type="number"
                                        /* @ts-ignore */
                                        placeholder={String(order)}
                                        value={order}
                                        /* @ts-ignore */
                                        onChange={(e) => setOrder(e.target.value)}
                                        handleSubmit={updateOrder}
                                    />
                                }
                            />
                        </BlockDados>

                        <FormUpdateImage onSubmit={handleImageTexto}>
                            {imageTextoUrl ? (
                                <Button
                                    type="submit"
                                    loading={loading}
                                >
                                    Salvar nova imagem
                                </Button>
                            ) :
                                null
                            }
                            <EtiquetaTextImagem>
                                <IconSpanTextImage>
                                    <MdFileUpload size={50} />
                                </IconSpanTextImage>
                                <InputLogoTextImagem type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                                {imageTextoUrl ? (
                                    <>
                                        <PreviewTextImagem
                                            src={imageTextoUrl}
                                        />
                                    </>
                                ) :
                                    <>
                                        <TextPhoto>Clique para carregar uma nova imagem</TextPhoto>
                                        <ImageTextPhoto src={"http://localhost:3333/files/" + imageTexto} />
                                    </>
                                }
                            </EtiquetaTextImagem>
                        </FormUpdateImage>
                    </Card>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteImagemTexto
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    textoImagem={modalItem}
                    /* @ts-ignore */
                    texto={modalItemTexto}
                />
            )}
        </>
    )
}

export default ImagemTexto;