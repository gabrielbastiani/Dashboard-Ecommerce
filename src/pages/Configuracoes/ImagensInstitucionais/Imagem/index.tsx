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
import { EtiquetaTextImagem, FormUpdateImage, IconSpanTextImage, ImageTextPhoto, InputLogoTextImagem, PreviewTextImagem, TextPhoto } from "../../TextosInstitucionais/Texto/ImagemTexto/styles";
import { MdFileUpload } from "react-icons/md";
import SelectUpdate from "../../../../components/ui/SelectUpdate";


export type ImagemDelete = {
    imageloja_id: string;
}

const Imagem: React.FC = () => {

    const navigate = useNavigate();
    let { imageloja_id } = useParams();

    const [titleImage, setTitleImage] = useState('');
    const [imageTexto, setImageTexto] = useState(null);
    const [imageTextoUrl, setImageTextoUrl] = useState('');
    const [order, setOrder] = useState(Number);
    const [disponibilidade, setDisponibilidade] = useState('');
    const [posicao, setPosicao] = useState('');
    const [imagemPosicaoSelected, setImagemPosicaoSelected] = useState();

    const [loading, setLoading] = useState(false);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadImage() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listExactPhotoTextoInstitucional?imageloja_id=${imageloja_id}`);

                setTitleImage(response.data.titleImage || "");
                setImageTexto(response.data.image || null);
                setOrder(response.data.order);
                setDisponibilidade(response.data.disponibilidade);
                setPosicao(response.data.posicao || "");

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

    async function updateDisponibilidade() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadePhotoTexto?imageloja_id=${imageloja_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade da imagem.');
        }

        if (disponibilidade === "Indisponivel") {
            toast.success(`Essa imagem está disponivel para o texto agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 3000);
        }

        if (disponibilidade === "Disponivel") {
            toast.error(`Essa imagem NÃO está disponivel para o texto agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 3000);
        }
    }

    function handleChangePosicao(e: any) {
        setImagemPosicaoSelected(e.target.value)
    }

    async function updatePosicao() {
        try {
            if (imagemPosicaoSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePosicaoImageTextoInstitucional?imageloja_id=${imageloja_id}`, { posicao: imagemPosicaoSelected });
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

    async function handleOpenModalDelete(imageloja_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/listExactPhotoTextoInstitucional', {
            params: {
                imageloja_id: imageloja_id,
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

                        <BlockDados>
                            <TextoDados
                                chave={"Posição dessa imagem"}
                                dados={
                                    <SelectUpdate
                                        dado={posicao}
                                        value={imagemPosicaoSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangePosicao}
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
                                        handleSubmit={updatePosicao}
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
                                        dado={disponibilidade}
                                        handleSubmit={updateDisponibilidade}
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