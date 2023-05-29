import { useNavigate, useParams } from "react-router-dom";
import Aside from "../../../../components/Aside";
import { Card } from "../../../../components/Content/styles";
import MainHeader from "../../../../components/MainHeader";
import Titulos from "../../../../components/Titulos";
import Voltar from "../../../../components/Voltar";
import { Button } from "../../../../components/ui/Button";
import { BlockTop, Container } from "../../../Categorias/styles";
import { Grid } from "../../../Dashboard/styles";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setupAPIClient } from "../../../../services/api";
import Modal from 'react-modal';
import { ModalDeleteImagem } from "../../../../components/popups/ModalDeleteImagem";
import { toast } from "react-toastify";
import { BlockDados } from "../../../Categorias/Categoria/styles";
import { TextoDados } from "../../../../components/TextoDados";
import { InputUpdate } from "../../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../../components/ui/ButtonSelect";
import { MdFileUpload } from "react-icons/md";
import SelectUpdate from "../../../../components/ui/SelectUpdate";
import {
    EtiquetaTextImagem,
    FormUpdateImage,
    IconSpanTextImage,
    ImageTextPhoto,
    InputLogoTextImagem,
    PreviewTextImagem,
    TextPhoto
} from "./styles";


export type ImagemDelete = {
    imageStore_id: string;
}

const Imagem: React.FC = () => {

    const navigate = useNavigate();
    let { imageStore_id } = useParams();

    const [titleImage, setTitleImage] = useState('');
    const [imageTexto, setImageTexto] = useState(null);
    const [imageTextoUrl, setImageTextoUrl] = useState('');
    const [order, setOrder] = useState(Number);
    const [status, setStatus] = useState('');
    const [position, setPosition] = useState('');
    const [imagePositionSelected, setImagePositionSelected] = useState();

    const [loading, setLoading] = useState(false);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadImage() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueImageStore?imageStore_id=${imageStore_id}`);

                setTitleImage(response.data.titleImage || "");
                setImageTexto(response.data.image || null);
                setOrder(response.data.order);
                setStatus(response.data.status);
                setPosition(response.data.position || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadImage();
    }, [imageStore_id]);

    async function updateTitle() {
        try {
            const apiClient = setupAPIClient();
            if (titleImage === "") {
                toast.error('Não deixe o titulo da imagem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTitleImageStore?imageStore_id=${imageStore_id}`, { titleImage: titleImage });
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
                await apiClient.put(`/updateOrderImageStore?imageStore_id=${imageStore_id}`, { order: Number(order) });
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
            await apiClient.put(`/updateImageStore?imageStore_id=${imageStore_id}`, data);

            toast.success('Image atualizada com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {
            console.log(err);
            toast.error('Ops erro ao atualizar a imagem!');
        }

        setLoading(false);

    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusImageStore?imageStore_id=${imageStore_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a status da imagem.');
        }

        if (status === "Indisponivel") {
            toast.success(`Essa imagem está disponivel para o texto agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 3000);
        }

        if (status === "Disponivel") {
            toast.error(`Essa imagem NÃO está disponivel para o texto agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 3000);
        }
    }

    function handleChangePosition(e: any) {
        setImagePositionSelected(e.target.value)
    }

    async function updatePosition() {
        try {
            if (imagePositionSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePositionImageTextoInstitucional?imageStore_id=${imageStore_id}`, { position: imagePositionSelected });
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a posição.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(imageStore_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/findUniqueImageStore', {
            params: {
                imageStore_id: imageStore_id,
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
                            url='/ImagensInstitucionais'
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo='Editar - Imagem'
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(imageStore_id)}
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

                        <BlockDados>
                            <TextoDados
                                chave={"Posição dessa imagem"}
                                dados={
                                    <SelectUpdate
                                        dado={position}
                                        value={imagePositionSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangePosition}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Rodapé Loja", value: "Rodapé Loja" },
                                                { label: "PopUp Menu Topo", value: "PopUp Menu Topo" },
                                                { label: "Header Topo", value: "Header Topo" },
                                                { label: "Página Contato", value: "Página Contato" },
                                                { label: "Página Sobre", value: "Página Sobre" }
                                            ]
                                        }
                                        handleSubmit={updatePosition}
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
                <ModalDeleteImagem
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    imagem={modalItem}
                />
            )}
        </>
    )
}

export default Imagem;