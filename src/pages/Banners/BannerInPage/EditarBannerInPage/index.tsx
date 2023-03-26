import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from 'react-modal';
import { setupAPIClient } from "../../../../services/api";
import { Grid } from "../../../Dashboard/styles";
import Aside from "../../../../components/Aside";
import MainHeader from "../../../../components/MainHeader";
import { Card, Container } from "../../../../components/Content/styles";
import Voltar from "../../../../components/Voltar";
import { BannerPreview, BlockButton, BlockTop, EtiquetaBannerInsert, FormBanner, IconSpan, InputBanner } from "../styles";
import Titulos from "../../../../components/Titulos";
import { Button } from "../../../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ModalDeleteBannerInPage } from "../../../../components/popups/ModalDeleteBannerInPage";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { BlockDados } from "../../../Categorias/Categoria/styles";
import { TextoDados } from "../../../../components/TextoDados";
import { InputUpdate } from "../../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../../components/ui/ButtonSelect";


export type DeleteBannerInPage = {
    bannerInPage_id: string;
}

const EditarBannerInPage: React.FC = () => {

    const navigate = useNavigate();
    let { bannerInPage_id } = useParams();

    const [bannerInPage, setBannerInPage] = useState('');
    const [urls, setUrls] = useState('');
    const [active, setActive] = useState('');

    const [banner, setBanner] = useState(null);
    const [bannerInsertUrl, setBannerInsertUrl] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadBanner() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/exactBannerInPage?bannerInPage_id=${bannerInPage_id}`);

                setBannerInPage(response.data.bannerPage);
                setUrls(response.data.url);
                setActive(response.data.active);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data)
            }
        }
        loadBanner()
    }, [bannerInPage_id]);

    function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0];
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setBanner(image);
            setBannerInsertUrl(URL.createObjectURL(image));
        }
    }

    async function handleBannerUpdate(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (banner === null) {
                toast.error('Carregue uma imagem!');
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', banner);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateBannerInPage?bannerInPage_id=${bannerInPage_id}`, data);

            toast.success('Banner atualizado com sucesso');

            setTimeout(() => {
                navigate('/banners/bannerInPage');
            }, 3000);

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao inserir o banner!');
        }
    }

    async function updateActive() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusBannerInPage?bannerInPage_id=${bannerInPage_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar status do banner.');
        }

        if (active === "Nao") {
            toast.success(`Esse banner está ativo na loja.`);

            setTimeout(() => {
                navigate('/banners/bannerInPage');
            }, 3000);

            return;
        }

        if (active === "Sim") {
            toast.error(`Esse banner está desativado na loja.`);

            setTimeout(() => {
                navigate('/banners/bannerInPage');
            }, 3000);

            return;
        }

    }

    async function updateLinkBanner() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateUrlBannerInPage?bannerInPage_id=${bannerInPage_id}`, { url: urls });
            toast.success('O link do banner foi atualizado com sucesso.');
        } catch (err) {
            toast.error('Ops erro ao atualizar o link do banner.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(bannerInPage_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/exactBannerInPage', {
            params: {
                bannerInPage_id: bannerInPage_id,
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
                            url="/banners/bannerInPage"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo='Editar - Banner na página'
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(bannerInPage_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Banner ativo na loja? "}
                                dados={
                                    <ButtonSelect
                                        /* @ts-ignore */
                                        dado={active}
                                        handleSubmit={updateActive}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Link do banner"}
                                dados={
                                    <InputUpdate
                                        dado={urls}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={urls}
                                        value={urls}
                                        /* @ts-ignore */
                                        onChange={(e) => setUrls(e.target.value)}
                                        handleSubmit={updateLinkBanner}
                                    />
                                }
                            />
                        </BlockDados>

                        <FormBanner onSubmit={handleBannerUpdate}>
                            <EtiquetaBannerInsert>
                                <IconSpan>
                                    <MdFileUpload size={35} />
                                </IconSpan>
                                <InputBanner type="file" accept="image/png, image/jpeg" onChange={handleFileInput} alt="banner da loja" />
                                {bannerInsertUrl ? (
                                    <>
                                        <BannerPreview
                                            src={bannerInsertUrl}
                                            alt="banner loja"
                                        />
                                        <BlockButton>
                                            <Button
                                                type="submit"
                                                style={{ backgroundColor: 'green' }}
                                            >
                                                Salvar Banner</Button>
                                        </BlockButton>
                                    </>
                                ) :
                                    <BannerPreview src={"http://localhost:3333/files/" + bannerInPage} alt="banner home loja virtual" />
                                }
                            </EtiquetaBannerInsert>
                        </FormBanner>
                    </Card>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteBannerInPage
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    bannerId={modalItem}
                />
            )}
        </>
    )
}

export default EditarBannerInPage;