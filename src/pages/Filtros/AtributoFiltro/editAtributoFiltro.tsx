import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { BlockDados, IconSpanCatgoryImagens, ImagensCategoryPreviewUrl, ImagensCategoryUpload } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { EtiquetaTextImagem, FormUpdateImage, InputLogoTextImagem, TextPhoto } from "../../Configuracoes/ImagensInstitucionais/Imagem/styles";
import { MdFileUpload } from "react-icons/md";
import { BlockImagem, EtiquetaImagens, FormImagens, InputImagens, TextImagens } from "../../Configuracoes/ImagensInstitucionais/styles";
import { ModalDeleteFiltro } from "../../../components/popups/ModalDeleteFiltro";
import { ModalDeleteFiltroAndImage } from "../../../components/popups/ModalDeleteFiltroAndImage";
import { ModalDeleteImagemFiltro } from "../../../components/popups/ModalDeleteImagemFiltro";


export type DeleteFiltro = {
    filterAttribute_id: string;
}

export type DeleteImagemAtributo = {
    iDImage: string;
}

export type DeleteFiltroAndImage = {
    filterAttribute_id: string;
    iDImage: string;
}

const EditAtributoFiltro: React.FC = () => {

    let { filterAttribute_id } = useParams();
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

    const newArray = atributos.map((item) => {return(item.value)});

    const attArray = newArray.filter((este, i) => newArray.indexOf(este) === i);


    function handleChangeValorAtributo(e: any) {
        setAtributosSelected(e.target.value);
    }

    useEffect(() => {
        async function loadItemDate() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueFilterAttribute?filterAttribute_id=${filterAttribute_id}`);

                setNameGroup(response.data.groupFilter.nameGroup);
                setOrder(response.data.order);
                setStatus(response.data.status);
                setImageAtributoLoad(response.data.imagefilteratributos ? response.data.imagefilteratributos[0].imageAttribute : response.data.imagefilteratributos.imageAttribute);
                setImageAtributoUpload(response.data.imagefilteratributos ? response.data.imagefilteratributos[0].imageAttribute : response.data.imagefilteratributos.imageAttribute);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadItemDate();
    }, [filterAttribute_id]);

    useEffect(() => {
        async function loadMoreDates() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueFilterAttribute?filterAttribute_id=${filterAttribute_id}`);

                setValor(response.data.value);
                setIDImage(response.data.imagefilteratributos ? response.data.imagefilteratributos[0].id : response.data.imagefilteratributos.id);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadMoreDates();
    }, [filterAttribute_id]);

    useEffect(() => {
        async function loadAttributes() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allValueAttributesValue');
                setAtributos(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAttributes();
    }, []);

    async function updateValorAtributo() {
        try {
            if (atributosSelected === "") {
                toast.error(`Selecione o valor de atributo, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateValueFilterAttribute?filterAttribute_id=${filterAttribute_id}`, { value: atributosSelected });

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
                await apiClient.put(`/updateOrderFilterAttribute?filterAttribute_id=${filterAttribute_id}`, { order: Number(order) });
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
            await apiClient.put(`/updateStatusFilterAttribute?filterAttribute_id=${filterAttribute_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade do valor/filtro nesse grupo.');
        }

        if (status === "Indisponivel") {
            toast.success(`O item valor/filtro se encontra Disponivel no grupo.`);
            return;
        }

        if (status === "Disponivel") {
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
            data.append('filterAttribute_id', filterAttribute_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageFilterAttribute`, data);

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
            await apiClient.put(`/updateImageFilterAttribute?imageFilterAttribute_id=${iDImage}`, data);

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

    async function handleOpenModalDeleteFiltro(filterAttribute_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueFilterAttribute', {
            params: {
                filterAttribute_id: filterAttribute_id,
            }
        });
        setModalItens(response.data || "");
        setModalVisibleItens(true);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(filterAttribute_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueFilterAttribute', {
            params: {
                filterAttribute_id: filterAttribute_id,
            }
        });
        setModalItem(response.data || "");
        setIDImage(response.data.imagefilteratributos[0].id || "");
        setModalVisible(true);
    }

    function handleCloseModalDeleteImagem() {
        setModalVisibleImagem(false);
    }

    async function handleOpenModalDeleteImagem(filterAttribute_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueFilterAttribute', {
            params: {
                filterAttribute_id: filterAttribute_id,
            }
        });
        setModalItemImagem(response.data.imagefilteratributos[0].id || "");
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
                                    onClick={() => handleOpenModalDelete(filterAttribute_id)}
                                >
                                    Deletar filtro
                                </Button>
                            ) :
                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDeleteFiltro(filterAttribute_id)}
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
                                                        ...(attArray || []).map((item) => ({ label: item, value: item }))
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
                                        onClick={() => handleOpenModalDeleteImagem(filterAttribute_id)}
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

export default EditAtributoFiltro;