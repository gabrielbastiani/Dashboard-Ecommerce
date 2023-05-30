import { MdFileUpload } from "react-icons/md";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { Button } from "../../../components/ui/Button";
import { BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import {
    BlockImagem,
    EtiquetaImagens,
    FormImagens,
    IconSpanImagens,
    ImagensPreviewUrl,
    ImagensUpload,
    InputImagens,
    TextImagens
} from "../../Configuracoes/ImagensInstitucionais/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { Grid } from "../../Dashboard/styles";
import { GridDate } from "../../Perfil/styles";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import moment from "moment";
import Modal from 'react-modal';
import { ModalDeleteBanner } from "../../../components/popups/ModalDeleteBanner";



export type DeleteBanner = {
    banner_id: string;
}

const Banner: React.FC = () => {

    const navigate = useNavigate();
    let { banner_id } = useParams();

    const [title, setTitle] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [banner, setBanner] = useState(null);
    const [bannerUrl, setBannerUrl] = useState("");
    const [order, setOrder] = useState(Number);
    const [url, setUrl] = useState("");
    const [position, setPosition] = useState("");
    const [positionSelected, setPositionSelected] = useState();
    const [active, setActive] = useState("");

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadBanner() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/exactBanner?banner_id=${banner_id}`);

                setTitle(response.data.title || "");
                setWidth(response.data.width || "");
                setHeight(response.data.height || "");
                setBanner(response.data.banner || null);
                setOrder(response.data.order);
                setUrl(response.data.url || "");
                setStartDate(response.data.startDate || "");
                setEndDate(response.data.endDate || "");
                setPosition(response.data.position || "");
                setActive(response.data.active || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadBanner();
    }, [banner_id]);

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value);
    }

    async function bannerPublish() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.get(`/updatePublishBanner?banner_id=${banner_id}`);
            toast.success('Data de programação atualizada com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a data.');
        }
    }

    async function updateBannerData() {
        try {
            const apiClient = setupAPIClient();
            if (title === "") {
                toast.error('Não deixe o titulo do banner em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAllDateBanner?banner_id=${banner_id}`,
                    {
                        title: title,
                        width: width,
                        height: height,
                        startDate: startDate,
                        endDate: endDate,
                        order: Number(order),
                        url: url,
                        active: active
                    });
                toast.success('Dado do banner atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o dado do banner.');
        }
    }

    async function updatePosition() {
        try {
            if (positionSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePositionBanner?banner_id=${banner_id}`, { position: positionSelected });
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a posição.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusBanner?banner_id=${banner_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade do produto.');
        }

        if (active === "Nao") {
            toast.success(`O banner se encontra disponivel.`);
            return;
        }

        if (active === "Sim") {
            toast.error(`O banner se encontra indisponivel.`);
            return;
        }
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0]
        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setBanner(image);
            setBannerUrl(URL.createObjectURL(image));
        }

    }

    async function handleUpdateBanner(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (banner === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', banner);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateBanner?banner_id=${banner_id}`, data);

            toast.success('Banner atualizado com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o banner!');
        }

    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(banner_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/exactBanner', {
            params: {
                banner_id: banner_id,
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

                        <Voltar url='/banners' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Editar Banner"
                            />
                            <Button
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(banner_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>
                        <br />
                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Titulo do banner"}
                                        dados={
                                            <InputUpdate
                                                dado={title}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={title}
                                                value={title}
                                                /* @ts-ignore */
                                                onChange={(e) => setTitle(e.target.value)}
                                                handleSubmit={updateBannerData}
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
                                                handleSubmit={updateBannerData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Posição desse banner"}
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
                                                        { label: "Página Sobre", value: "Página Sobre" },
                                                        { label: "Banner Topo", value: "Banner Topo" },
                                                        { label: "Banner Mosaico Página Principal", value: "Banner Mosaico Página Principal" },
                                                        { label: "Banner Páginas", value: "Banner Páginas" }
                                                    ]
                                                }
                                                handleSubmit={updatePosition}
                                            />
                                        }
                                    />
                                </BlockDados>

                                {position === "Banner Topo" ? (
                                    null
                                ) :
                                    <>
                                        <BlockDados>
                                            <TextoDados
                                                chave={"Largura (px)"}
                                                dados={
                                                    <InputUpdate
                                                        dado={width}
                                                        type="text"
                                                        /* @ts-ignore */
                                                        placeholder={width}
                                                        value={width}
                                                        /* @ts-ignore */
                                                        onChange={(e) => setWidth(e.target.value)}
                                                        handleSubmit={updateBannerData}
                                                    />
                                                }
                                            />
                                        </BlockDados>

                                        <BlockDados>
                                            <TextoDados
                                                chave={"Altura (px)"}
                                                dados={
                                                    <InputUpdate
                                                        dado={height}
                                                        type="text"
                                                        /* @ts-ignore */
                                                        placeholder={height}
                                                        value={height}
                                                        /* @ts-ignore */
                                                        onChange={(e) => setHeight(e.target.value)}
                                                        handleSubmit={updateBannerData}
                                                    />
                                                }
                                            />
                                        </BlockDados>
                                    </>
                                }
                            </SectionDate>

                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Link de redirecionamento"}
                                        dados={
                                            <InputUpdate
                                                dado={url}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={url}
                                                value={url}
                                                /* @ts-ignore */
                                                onChange={(e) => setUrl(e.target.value)}
                                                handleSubmit={updateBannerData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Banner ativado?"}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={active}
                                                handleSubmit={updateStatus}
                                            />
                                        }
                                    />
                                </BlockDados>
                                <br />

                                {active === "Sim" ? (
                                    null
                                ) :
                                    <>
                                        <Etiqueta
                                            style={{ color: 'red', fontSize: '15px' }}
                                        >
                                            PROGRAME A PUBLICAÇÃO DO BANNER ABAIXO SE DESEJAR<br />
                                            (OBS: NÃO ATIVE O BANNER NO CHECKBOX ACIMA PARA PODER<br />
                                            PROGRAMAR ABAIXO), MAS CASO QUEIRA ATIVAR O BANNER NA LOJA<br />
                                            SEM PROGRAMAÇÃO, ATIVE O CHECKBOX ACIMA.
                                        </Etiqueta>
                                        <br />
                                        <br />
                                        <BlockDados>
                                            <TextoDados
                                                chave={"Data de início"}
                                                dados={
                                                    <InputUpdate
                                                        dado={startDate ? moment(startDate).format('DD/MM/YYYY - HH:mm') : "Sem Programação"}
                                                        type="datetime-local"
                                                        /* @ts-ignore */
                                                        placeholder={startDate}
                                                        value={startDate}
                                                        /* @ts-ignore */
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        handleSubmit={updateBannerData}
                                                    />
                                                }
                                            />
                                        </BlockDados>

                                        <BlockDados>
                                            <TextoDados
                                                chave={"Data do fim"}
                                                dados={
                                                    <InputUpdate
                                                        dado={endDate ? moment(endDate).format('DD/MM/YYYY - HH:mm') : "Sem Programação"}
                                                        type="datetime-local"
                                                        /* @ts-ignore */
                                                        placeholder={endDate}
                                                        value={endDate}
                                                        /* @ts-ignore */
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        handleSubmit={updateBannerData}
                                                    />
                                                }
                                            />
                                        </BlockDados>

                                        <Button
                                            onClick={bannerPublish}
                                        >
                                            Ativar programação
                                        </Button>
                                    </>
                                }
                            </SectionDate>
                        </GridDate>
                        <br />
                        <br />
                        <br />
                        <FormImagens id="banner-form" onSubmit={handleUpdateBanner}>
                            <BlockImagem>
                                <EtiquetaImagens>
                                    {bannerUrl ? (
                                        <Button
                                            style={{ backgroundColor: 'green' }}
                                            type="submit"
                                        >
                                            Salvar novo banner
                                        </Button>
                                    ) :
                                        null
                                    }
                                    <IconSpanImagens>
                                        <MdFileUpload size={50} />
                                    </IconSpanImagens>
                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="banner da loja" />
                                    {bannerUrl ? (
                                        <ImagensPreviewUrl
                                            src={bannerUrl}
                                            alt="banner da loja"
                                        />
                                    ) :
                                        <>
                                            <ImagensUpload src={"http://localhost:3333/files/" + banner} />
                                            <TextImagens>Clique na seta e insira<br /> um novo banner</TextImagens>
                                        </>
                                    }
                                </EtiquetaImagens>
                            </BlockImagem>
                        </FormImagens>
                    </Card>
                </Container>
            </Grid>
            {modalVisible && (
                <ModalDeleteBanner
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    bannerId={modalItem}
                />
            )}
        </>
    )
}

export default Banner;