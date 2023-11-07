import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { EtiquetaLogo, FormUploadLogo, IconSpan, InputLogo, PreviewImageRede, RedeLojaImg } from "../styles";
import { MdFileUpload } from "react-icons/md";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import Modal from 'react-modal';
import { ModalDeleteRedeSocial } from '../../../components/popups/ModalDeleteRedeSocial';
import Warnings from "../../../components/Warnings";


export type DeleteRede = {
    socialMedia_id: string;
}

const Rede: React.FC = () => {

    const navigate = useNavigate();
    let { socialMedia_id } = useParams();

    const [redeImage, setRedeImage] = useState(null);
    const [redeImageUrl, setRedeImageUrl] = useState('');

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [order, setOrder] = useState();
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');

    const [positionSelected, setPositionSelected] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadSocialMedia() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueSocialMedia?socialMedia_id=${socialMedia_id}`);

                setName(response.data.name || "");
                setLink(response.data.link || "");
                setRedeImage(response.data.image || "");
                setOrder(response.data.order);
                setPosition(response.data.position || "");
                setStatus(response.data.status);

            } catch (error) {
                console.log(error);
            }
        }
        loadSocialMedia();
    }, [socialMedia_id]);

    async function updateNameSocialMedia() {
        try {
            const apiClient = setupAPIClient();
            if (name === "") {
                toast.error('Não deixe o nome da rede em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateSocialMediaName?socialMedia_id=${socialMedia_id}`, { name: name });
                toast.success('Nome da rede atualizada com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome da rede.');
        }
    }

    async function updateLinkSocialMedia() {
        try {
            const apiClient = setupAPIClient();
            if (link === "") {
                toast.error('Não deixe o link da rede em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateLinkSocialMedia?socialMedia_id=${socialMedia_id}`, { link: link });
                toast.success('Link da rede atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o link da rede.');
        }
    }

    async function updateOrderSocialMedia() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem da rede em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderSocialMedia?socialMedia_id=${socialMedia_id}`, { order: Number(order) });
                toast.success('Ordem da rede atualizada com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da rede.');
        }
    }

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value)
    }

    async function updatePositionSocialMedia() {
        try {
            if (positionSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePositionSocialMedia?socialMedia_id=${socialMedia_id}`, { position: positionSelected });
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a posição.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
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
            setRedeImage(image)
            setRedeImageUrl(URL.createObjectURL(image))
        }

    }

    async function handleImageSocialMedia(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (redeImage === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', redeImage);

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageSocialMedia?socialMedia_id=${socialMedia_id}`, data);

            toast.success('Image da rede atualizada com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {
            console.log(err);
            toast.error('Ops erro ao atualizar a imagem da rede!');
        }

        setLoading(false);

    }

    async function updateStatusSocialMedia() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusSocialMedia?socialMedia_id=${socialMedia_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a status da rede.');
        }

        if (status === "Indisponivel") {
            toast.success(`Essa rede social está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }

        if (status === "Disponivel") {
            toast.error(`Essa rede social NÃO está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(socialMedia_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/findUniqueSocialMedia', {
            params: {
                socialMedia_id: socialMedia_id,
            }
        });
        setModalItem(responseDelete.data);
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
                            url="/configuracoes"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo='Editar - Rede Social'
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(socialMedia_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <FormUploadLogo onSubmit={handleImageSocialMedia}>
                            <EtiquetaLogo>
                                <IconSpan>
                                    <MdFileUpload size={20} />
                                </IconSpan>
                                <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="rede social loja virtual" />
                                {redeImageUrl ? (
                                    <>
                                        <PreviewImageRede
                                            src={redeImageUrl}
                                            alt="rede social loja virtual"
                                            width={170}
                                            height={100}
                                        />
                                        <Button
                                            type="submit"
                                            loading={loading}
                                        >
                                            Salvar nova imagem
                                        </Button>
                                    </>
                                ) :
                                    <RedeLojaImg src={"http://localhost:3333/files/" + redeImage} alt="rede social loja virtual" />
                                }
                            </EtiquetaLogo>
                        </FormUploadLogo>

                        <BlockDados>
                            <TextoDados
                                chave={"Nome da rede social"}
                                dados={
                                    <InputUpdate
                                        dado={name}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={name}
                                        value={name}
                                        /* @ts-ignore */
                                        onChange={(e) => setName(e.target.value)}
                                        handleSubmit={updateNameSocialMedia}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Link da rede social"}
                                dados={
                                    <InputUpdate
                                        dado={link}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={link}
                                        value={link}
                                        /* @ts-ignore */
                                        onChange={(e) => setLink(e.target.value)}
                                        handleSubmit={updateLinkSocialMedia}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Posição dessa rede"}
                                dados={
                                    <SelectUpdate
                                        dado={position}
                                        value={positionSelected}
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
                                        handleSubmit={updatePositionSocialMedia}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Ordem dessa rede"}
                                dados={
                                    <InputUpdate
                                        dado={String(order)}
                                        type="number"
                                        /* @ts-ignore */
                                        placeholder={String(order)}
                                        value={order}
                                        /* @ts-ignore */
                                        onChange={(e) => setOrder(e.target.value)}
                                        handleSubmit={updateOrderSocialMedia}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Rede social esta ativada em sua posição? "}
                                dados={
                                    <ButtonSelect
                                        dado={status}
                                        handleSubmit={updateStatusSocialMedia}
                                        showElement={status}
                                    />
                                }
                            />
                        </BlockDados>
                    </Card>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteRedeSocial
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    rede={modalItem}
                />
            )}
        </>
    )
}

export default Rede;