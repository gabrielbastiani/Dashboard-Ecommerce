import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { BlockDados, IconSpanCatgoryImagens, ImagensCategoryPreviewUrl, ImagensCategoryUpload } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { EtiquetaTextImagem, FormUpdateImage, InputLogoTextImagem, TextPhoto } from "../../Configuracoes/TextosInstitucionais/Texto/ImagemTexto/styles";
import { MdFileUpload } from "react-icons/md";
import { BlockImagem, EtiquetaImagens, FormImagens, InputImagens, TextImagens } from "../../Configuracoes/ImagensInstitucionais/styles";
import { ModalDeleteFiltroAndImage } from "../../../components/popups/ModalDeleteFiltroAndImage";
import { ModalDeleteImagemFiltro } from "../../../components/popups/ModalDeleteImagemFiltro";
import { ModalDeleteFiltro } from "../../../components/popups/ModalDeleteFiltro";


export type DeleteFiltro = {
    groupFilterAtributo_id: string;
}

export type DeleteImagemAtributo = {
    iDImage: string;
}

export type DeleteFiltroAndImage = {
    groupFilterAtributo_id: string;
    iDImage: string;
}

const EditFiltro: React.FC = () => {

    let { groupFilterAtributo_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [atributos, setAtributos] = useState<any[]>([]);
    const [atributosSelected, setAtributosSelected] = useState();
    const [valor, setValor] = useState("");
    const [order, setOrder] = useState(Number);
    const [status, setStatus] = useState("");

    const [imageAtributo, setImageAtributo] = useState(null);
    const [imageAtributoUrl, setImageAtributoUrl] = useState('');

    const [imageAtributoUpload, setImageAtributoUpload] = useState(null);
    const [imageAtributoUploadUrl, setImageAtributoUploadUrl] = useState('');

    const [imageAtributoLoad, setImageAtributoLoad] = useState("");
    const [iDImage, setIDImage] = useState("");

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [modalItens, setModalItens] = useState("");
    const [modalVisibleItens, setModalVisibleItens] = useState(false);

    const [modalItemImagem, setModalItemImagem] = useState("");
    const [modalVisibleImagem, setModalVisibleImagem] = useState(false);


    function handleChangeValorAtributo(e: any) {
        setAtributosSelected(e.target.value);
    }

    useEffect(() => {
        async function loadItemDate() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/filterUniqueGroup?groupFilterAtributo_id=${groupFilterAtributo_id}`);

                setOrder(data.order);
                setStatus(data.status);
                setImageAtributoLoad(data.imageAtributoGroups ? data.imageAtributoGroups[0].imageAtributo : data.imageAtributoGroups.imageAtributo);
                setImageAtributoUpload(data.imageAtributoGroups ? data.imageAtributoGroups[0].imageAtributo : data.imageAtributoGroups.imageAtributo);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadItemDate();
    }, [groupFilterAtributo_id]);

    useEffect(() => {
        async function loadMoreDates() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/filterUniqueGroup?groupFilterAtributo_id=${groupFilterAtributo_id}`);

                setValor(data.atributo.valor);
                setNameGroup(data.nameGroup || "");
                setIDImage(data.imageAtributoGroups ? data.imageAtributoGroups[0].id : data.imageAtributoGroups.id);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadMoreDates();
    }, [groupFilterAtributo_id]);

    useEffect(() => {
        async function loadAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allAtributos');
                setAtributos(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAtributos();
    }, []);

    async function updateValorAtributo() {
        try {
            if (atributosSelected === "") {
                toast.error(`Selecione o valor de atributo, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAtributoValorFilterGrupo?groupFilterAtributo_id=${groupFilterAtributo_id}`, { atributo_id: atributosSelected });

            toast.success('O valor foi atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o atributo.');
        }
    }

    async function updateOrder() {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderFiltro?groupFilterAtributo_id=${groupFilterAtributo_id}`, { order: Number(order) });
                toast.success('Ordem do valor no grupo/filtro atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do valor em grupo/filtro.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusFiltroGrupo?groupFilterAtributo_id=${groupFilterAtributo_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade do valor/filtro nesse grupo.');
        }

        if (status === "Inativo") {
            toast.success(`O item valor/filtro se encontra Disponivel no grupo.`);
            return;
        }

        if (status === "Ativo") {
            toast.error(`O valor/filtro se encontra Indisponivel no grupo.`);
            return;
        }
    }

    async function handleCreateImageFiltro(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageAtributo);/* @ts-ignore */
            data.append('groupFilterAtributo_id', groupFilterAtributo_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageFitroAtributoGrupo`, data);

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
            setImageAtributo(image)
            setImageAtributoUrl(URL.createObjectURL(image))
        }

    }

    async function handleImageUpload(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageAtributoUpload);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageFitroAtributoGrupo?imageAtributoGroup_id=${iDImage}`, data);

            toast.success('Imagem atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao atualizar a imagem do valor/filtro!!!');
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
            setImageAtributoUpload(image);
            setImageAtributoUploadUrl(URL.createObjectURL(image));
        }

    }

    function handleCloseModalDeleteFiltro() {
        setModalVisibleItens(false);
    }

    async function handleOpenModalDeleteFiltro(groupFilterAtributo_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/filterUniqueGroup', {
            params: {
                groupFilterAtributo_id: groupFilterAtributo_id,
            }
        });
        setModalItens(response.data || "");
        setModalVisibleItens(true);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(groupFilterAtributo_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/filterUniqueGroup', {
            params: {
                groupFilterAtributo_id: groupFilterAtributo_id,
            }
        });
        setModalItem(response.data || "");
        setIDImage(response.data.imageAtributoGroups[0].id || "");
        setModalVisible(true);
    }

    function handleCloseModalDeleteImagem() {
        setModalVisibleImagem(false);
    }

    async function handleOpenModalDeleteImagem(groupFilterAtributo_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/filterUniqueGroup', {
            params: {
                groupFilterAtributo_id: groupFilterAtributo_id,
            }
        });
        setModalItemImagem(response.data.imageAtributoGroups[0].id || "");
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
                                titulo={`Editar filtro/valor - ${valor}`}
                            />

                            {imageAtributoLoad ? (
                                <Button
                                    style={{ backgroundColor: 'red' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDelete(groupFilterAtributo_id)}
                                >
                                    Deletar filtro
                                </Button>
                            ) :
                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDeleteFiltro(groupFilterAtributo_id)}
                                >
                                    Deletar filtro
                                </Button>
                            }

                        </BlockTop>

                        <GridDate>
                            <SectionDate>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Valor/filtro atributo"}
                                        dados={
                                            <SelectUpdate
                                                dado={valor}
                                                handleSubmit={updateValorAtributo}
                                                value={atributosSelected}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                        ...(atributos || []).map((item) => ({ label: item.valor, value: item.id }))
                                                    ]
                                                }/* @ts-ignore */
                                                onChange={handleChangeValorAtributo}
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
                                <br />
                                <br />
                                {imageAtributoLoad ? (
                                    <Button
                                        /* @ts-ignore */
                                        onClick={() => handleOpenModalDeleteImagem(groupFilterAtributo_id)}
                                    >
                                        Deletar imagem
                                    </Button>
                                ) :
                                    null
                                }

                            </SectionDate>

                            <SectionDate>
                                {imageAtributoLoad ? (
                                    <>
                                        <FormUpdateImage onSubmit={handleImageUpload}>
                                            <EtiquetaTextImagem>
                                                {imageAtributoUploadUrl ? (
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
                                                {imageAtributoUploadUrl ? (
                                                    <>
                                                        <ImagensCategoryUpload
                                                            src={imageAtributoUploadUrl}
                                                        />
                                                    </>
                                                ) :
                                                    <>
                                                        <TextPhoto>Clique para carregar uma nova imagem</TextPhoto>
                                                        <ImagensCategoryPreviewUrl src={"http://localhost:3333/files/" + imageAtributoUpload} />
                                                    </>
                                                }
                                            </EtiquetaTextImagem>
                                        </FormUpdateImage>
                                    </>
                                ) :
                                    <>
                                        <FormImagens onSubmit={handleCreateImageFiltro}>
                                            <BlockImagem>
                                                <EtiquetaImagens>
                                                    {imageAtributoUrl ? (
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
                                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="imagem do Valor/filtro" />
                                                    {imageAtributoUrl ? (
                                                        <ImagensCategoryPreviewUrl
                                                            src={imageAtributoUrl}
                                                            alt="imagem do Valor/filtro"
                                                        />
                                                    ) :
                                                        <>
                                                            <ImagensCategoryUpload src={"http://localhost:3333/files/" + imageAtributo} />
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
                    </Card>
                </Container>
            </Grid >

            {modalVisibleItens && (
                <ModalDeleteFiltro
                    isOpen={modalVisibleItens}
                    onRequestClose={handleCloseModalDeleteFiltro}
                    /* @ts-ignore */
                    relationIDS={modalItens}
                />
            )}

            {modalVisible && (
                <ModalDeleteFiltroAndImage
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relationIDS={modalItem}
                    /* @ts-ignore */
                    idGroupImage={iDImage}
                />
            )}

            {modalVisibleImagem && (
                <ModalDeleteImagemFiltro
                    isOpen={modalVisibleImagem}
                    onRequestClose={handleCloseModalDeleteImagem}
                    /* @ts-ignore */
                    idImage={modalItemImagem}
                />
            )}
        </>
    )
}

export default EditFiltro;