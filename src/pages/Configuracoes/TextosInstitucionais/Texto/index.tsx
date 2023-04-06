import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../../Dashboard/styles";
import MainHeader from "../../../../components/MainHeader";
import Aside from "../../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../../../Categorias/styles";
import { Card } from "../../../../components/Content/styles";
import Voltar from "../../../../components/Voltar";
import Titulos from "../../../../components/Titulos";
import { Button } from "../../../../components/ui/Button";
import { BlockDados } from "../../../Categorias/Categoria/styles";
import { TextoDados } from "../../../../components/TextoDados";
import { InputUpdate } from "../../../../components/ui/InputUpdate";
import SelectUpdate from "../../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../../components/ui/ButtonSelect";
import { setupAPIClient } from "../../../../services/api";
import { toast } from "react-toastify";
import { DivisorHorizontal } from "../../../../components/ui/DivisorHorizontal";
import { InputPost } from "../../../../components/ui/InputPost";
import { GridDateForm, SectionDate, TextLogo } from "../../styles";
import { MdFileUpload } from "react-icons/md";
import {
    AreaTexto,
    BlockImagem,
    EtiquetaImagem,
    IconSpanImage,
    InputLogoImagem,
    PreviewImagem,
    ImagemTextoInsti,
    ImgTextos
} from "./styles";
import TabelaSimples from "../../../../components/Tabelas";


const Texto: React.FC = () => {

    const navigate = useNavigate();
    let { textoinstitucional_id } = useParams();

    const [title, setTitle] = useState('');
    const [order, setOrder] = useState(Number);
    const [posicaoSelected, setPosicaoSelected] = useState();
    const [posicao, setPosicao] = useState('');
    const [disponibilidade, setDisponibilidade] = useState('');
    const [description, setDescription] = useState('');

    const [titleImage, setTitleImage] = useState('');
    const [imageText, setImageText] = useState(null);
    const [imageTextUrl, setImageTextUrl] = useState('');
    const [orderImage, setOrderImage] = useState(Number);

    const [imagesTextos, setImagesTextos] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadTexto() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listExactTextoInstitucional?textoinstitucional_id=${textoinstitucional_id}`);

                setTitle(response.data.title || "");
                setOrder(response.data.order);
                setPosicao(response.data.posicao || "");
                setDisponibilidade(response.data.disponibilidade);
                setDescription(response.data.description);

            } catch (error) {
                console.log(error);
            }
        }
        loadTexto();
    }, [textoinstitucional_id]);

    useEffect(() => {
        async function loadImagesText() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allImagesTextoInstitucional?textoinstitucional_id=${textoinstitucional_id}`);

                setImagesTextos(response.data || []);

            } catch (error) {
                console.log(error);
            }
        }
        loadImagesText();
    }, [textoinstitucional_id]);

    async function updateTitle() {
        try {
            const apiClient = setupAPIClient();
            if (title === "") {
                toast.error('Não deixe o titulo do texto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTitleTextoInstitucional?textoinstitucional_id=${textoinstitucional_id}`, { title: title });
                toast.success('Titulo do texto atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o titulo do texto.');
        }
    }

    async function updateOrder() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem do texto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderTextoInstitucional?textoinstitucional_id=${textoinstitucional_id}`, { order: Number(order) });
                toast.success('Ordem do texto atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do texto.');
        }
    }

    function handleChangePosicao(e: any) {
        setPosicaoSelected(e.target.value);
    }

    async function updatePosicao() {
        try {
            if (posicaoSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePosicaoTextoInstitucional?textoinstitucional_id=${textoinstitucional_id}`, { posicao: posicaoSelected });
            
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a posição.');
        }
        setTimeout(() => {
            navigate(0);
        }, 2000);
    }

    async function updateDescription() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/updateDescriptionTextoInstitucional?textoinstitucional_id=${textoinstitucional_id}`, { description: description });
            toast.success('Descrição do texto atualizado com sucesso.');

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descrição do texto.');
        }
    }

    async function updateDisponibilidade() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadeTexto?textoinstitucional_id=${textoinstitucional_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade do texto.');
        }

        if (disponibilidade === "Indisponivel") {
            toast.success(`Esse texto está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }

        if (disponibilidade === "Disponivel") {
            toast.error(`Esse texto NÃO está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }
    }

    // ------- IMAGENS -------- //


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
            setImageText(image)
            setImageTextUrl(URL.createObjectURL(image));
        }

    }

    async function handleImagenTexto(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (titleImage === "") {
                toast.error('Não deixe o titulo em branco!')
                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageText);
            data.append('titleImage', titleImage);/* @ts-ignore */
            data.append('order', Number(orderImage));/* @ts-ignore */
            data.append('posicao', posicao);/* @ts-ignore */
            data.append('textoinstitucional_id', textoinstitucional_id);

            setLoading(true);

            await apiClient.post(`/createImageTextoInstitucional`, data);

            toast.success('Imagem cadastrada com sucesso.');

            setTitleImage('');

            setTimeout(() => {
                navigate(0);
            }, 2000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a imagem.');
        }

        setLoading(false);

    }

    /* @ts-ignore */
    const dados = [];
    (imagesTextos || []).forEach((item) => {
        dados.push({
            "Imagem": <ImgTextos src={"http://localhost:3333/files/" + item.image} alt={item.titleImage} />,
            "Titulo da Imagem": item.titleImage,
            "Ordem": String(item.order),
            "Disponivel?": item.disponibilidade === "Disponivel" ? "SIM" : "NÃO",
            "botaoDetalhes": `/imagemTexto/${item.id}`
        });
    });


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Voltar
                            url="/textosInstitucionais"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo='Editar - Texto Institucional'
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(textoinstitucional_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Titulo do texto"}
                                dados={
                                    <InputUpdate
                                        dado={title}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={title}
                                        value={title}
                                        /* @ts-ignore */
                                        onChange={(e) => setTitle(e.target.value)}
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
                                chave={"Posição desse texto"}
                                dados={
                                    <SelectUpdate
                                        dado={posicao}
                                        value={posicaoSelected}
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

                        <BlockDados style={{ flexDirection: 'column' }}>
                            <TextoDados
                                chave={"Texto institucional"}
                                dados={
                                    <AreaTexto
                                        spellCheck='true'
                                        value={description}
                                        placeholder={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                }
                            />
                            <Button
                                onClick={updateDescription}
                            >
                                Atualizar descrição
                            </Button>
                        </BlockDados>

                        {imagesTextos.length < 1 ? (
                            null
                        ) :
                            <>
                                <DivisorHorizontal />

                                <TabelaSimples
                                    cabecalho={["Imagem", "Titulo da Imagem", "Ordem", "Disponivel?"]}
                                    /* @ts-ignore */
                                    dados={dados}
                                    textbutton={"Detalhes"}
                                />
                            </>
                        }

                        <DivisorHorizontal />

                        <Titulos
                            tipo="h2"
                            titulo='Insira imagens para esse texto'
                        />
                        <br />
                        <br />
                        <GridDateForm onSubmit={handleImagenTexto}>
                            <SectionDate>
                                <Block>
                                    <Etiqueta>Titulo da imagem:</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite o titulo da imagem..."
                                        value={titleImage}
                                        onChange={(e) => setTitleImage(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Ordem:</Etiqueta>
                                    <InputPost
                                        type="number"
                                        placeholder="0"
                                        value={orderImage}/* @ts-ignore */
                                        onChange={(e) => setOrderImage(e.target.value)}
                                    />
                                </Block>

                            </SectionDate>

                            <SectionDate>

                                <BlockImagem>
                                    <EtiquetaImagem>
                                        <IconSpanImage>
                                            <MdFileUpload size={40} />
                                        </IconSpanImage>
                                        <InputLogoImagem type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                                        {imageTextUrl ? (
                                            <PreviewImagem
                                                src={imageTextUrl}
                                            />
                                        ) :
                                            <>
                                                <ImagemTextoInsti src={"http://localhost:3333/files/" + imageText} />
                                                <TextLogo>Clique na seta e insira<br /> uma imagem</TextLogo>
                                            </>
                                        }
                                    </EtiquetaImagem>
                                </BlockImagem>

                                {imageTextUrl ? (
                                    <>
                                        <Button
                                            type="submit"
                                            loading={loading}
                                            style={{ backgroundColor: 'green', width: '100%' }}
                                        >
                                            Salvar imagem
                                        </Button>
                                    </>
                                ) :
                                    null
                                }
                            </SectionDate>
                        </GridDateForm>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Texto;