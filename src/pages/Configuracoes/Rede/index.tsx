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


export type DeleteRede = {
    redesocial_id: string;
}

const Rede: React.FC = () => {

    const navigate = useNavigate();
    let { redesocial_id } = useParams();

    const [redeImage, setRedeImage] = useState(null);
    const [redeImageUrl, setRedeImageUrl] = useState('');

    const [redeName, setRedeName] = useState('');
    const [link, setLink] = useState('');
    const [order, setOrder] = useState();
    const [posicao, setPosicao] = useState('');
    const [disponibilidade, setDisponibilidade] = useState('');

    const [redePosicaoSelected, setRedePosicaoSelected] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadRede() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listExactRedesSociais?redesocial_id=${redesocial_id}`);

                setRedeName(response.data.redeName || "");
                setLink(response.data.link || "");
                setRedeImage(response.data.imageRede || "");
                setOrder(response.data.order);
                setPosicao(response.data.posicao || "");
                setDisponibilidade(response.data.disponibilidade);

            } catch (error) {
                console.log(error);
            }
        }
        loadRede();
    }, [redesocial_id]);

    async function updateNameRede() {
        try {
            const apiClient = setupAPIClient();
            if (redeName === "") {
                toast.error('Não deixe o nome da rede em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateRedeName?redesocial_id=${redesocial_id}`, { redeName: redeName });
                toast.success('Nome da rede atualizada com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome da rede.');
        }
    }

    async function updateLinkRede() {
        try {
            const apiClient = setupAPIClient();
            if (link === "") {
                toast.error('Não deixe o link da rede em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateLinkRedeSocial?redesocial_id=${redesocial_id}`, { link: link });
                toast.success('Link da rede atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o link da rede.');
        }
    }

    async function updateOrder() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem da rede em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRedeSocial?redesocial_id=${redesocial_id}`, { order: Number(order) });
                toast.success('Ordem da rede atualizada com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da rede.');
        }
    }

    function handleChangePosicao(e: any) {
        setRedePosicaoSelected(e.target.value)
    }

    async function updatePosicao() {
        try {
            if (redePosicaoSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePosicaoRedeSocial?redesocial_id=${redesocial_id}`, { posicao: redePosicaoSelected });
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a posição.');
        }
        setTimeout(() => {
            navigate(0);
        }, 2000);
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

    async function handleImageRede(event: FormEvent) {
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
            await apiClient.put(`/updateImageRedeSocial?redesocial_id=${redesocial_id}`, data);

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

    async function updateDisponibilidade() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadeRedeSocial?redesocial_id=${redesocial_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade da rede.');
        }

        if (disponibilidade === "Indisponivel") {
            toast.success(`Essa rede social está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }

        if (disponibilidade === "Disponivel") {
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

    async function handleOpenModalDelete(redesocial_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/listExactRedesSociais', {
            params: {
                redesocial_id: redesocial_id,
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
                                onClick={() => handleOpenModalDelete(redesocial_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <FormUploadLogo onSubmit={handleImageRede}>
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
                                        dado={redeName}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={redeName}
                                        value={redeName}
                                        /* @ts-ignore */
                                        onChange={(e) => setRedeName(e.target.value)}
                                        handleSubmit={updateNameRede}
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
                                        handleSubmit={updateLinkRede}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Posição dessa rede"}
                                dados={
                                    <SelectUpdate
                                        dado={posicao}
                                        value={redePosicaoSelected}
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
                                        handleSubmit={updateOrder}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Rede social esta ativada em sua posição? "}
                                dados={
                                    <ButtonSelect
                                        /* @ts-ignore */
                                        dado={disponibilidade}
                                        handleSubmit={updateDisponibilidade}
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