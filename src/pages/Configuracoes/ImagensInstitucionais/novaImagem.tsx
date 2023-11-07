import { ChangeEvent, FormEvent, useState } from "react"
import Aside from "../../../components/Aside"
import { Card } from "../../../components/Content/styles"
import MainHeader from "../../../components/MainHeader"
import Titulos from "../../../components/Titulos"
import { Button } from "../../../components/ui/Button"
import { InputPost } from "../../../components/ui/InputPost"
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles"
import { Grid } from "../../Dashboard/styles"
import { setupAPIClient } from "../../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Select from "../../../components/ui/Select"
import { BlockImagem, EtiquetaImagens, FormImagens, IconSpanImagens, ImagensPreviewUrl, ImagensUpload, InputImagens, TextImagens } from "./styles"
import { MdFileUpload } from "react-icons/md"
import Warnings from "../../../components/Warnings"



const NovaImagem: React.FC = () => {

    const navigate = useNavigate();

    const [titleImage, setTitleImage] = useState('');
    const [images, setImages] = useState(null);
    const [imagesUrl, setImagesUrl] = useState('');
    const [order, setOrder] = useState(Number);
    const [positionSelected, setPositionSelected] = useState();

    const [loading, setLoading] = useState(false);


    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value);
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
            setImages(image)
            setImagesUrl(URL.createObjectURL(image));
        }

    }

    async function handleRegisterImage(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (titleImage === "") {
                toast.error('Não deixe o titulo em branco!');
                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', images);
            data.append('titleImage', titleImage);/* @ts-ignore */
            data.append('order', Number(order));/* @ts-ignore */
            data.append('position', positionSelected);

            setLoading(true);

            await apiClient.post(`/createImageStore`, data);

            toast.success('Imagem cadastrada com sucesso.');

            setTimeout(() => {
                navigate('/ImagensInstitucionais');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a imagem.');
        }

        setLoading(false);

    }

    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Nova Imagem"
                            />
                            <Button
                                type="submit"
                                loading={loading}
                                style={{ backgroundColor: 'green' }}
                                form="form-imagem"
                            >
                                Salvar imagem
                            </Button>
                        </BlockTop>

                        <FormImagens id="form-imagem" onSubmit={handleRegisterImage}>
                            <Block>
                                <Etiqueta>Titulo da imagem:</Etiqueta>
                                <InputPost
                                    type="text"
                                    placeholder="Digite o titulo aqui..."
                                    onChange={(e) => setTitleImage(e.target.value)}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Ordem da imagem:</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="0"/* @ts-ignore */
                                    onChange={(e) => setOrder(e.target.value)}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Posição desse texto:</Etiqueta>
                                <Select
                                    value={positionSelected}
                                    opcoes={
                                        [
                                            { label: "Selecionar...", value: "" },
                                            { label: "Rodapé Loja", value: "Rodapé Loja" },
                                            { label: "PopUp Menu Topo", value: "PopUp Menu Topo" },
                                            { label: "Header Topo", value: "Header Topo" },
                                            { label: "Página Contato", value: "Página Contato" },
                                            { label: "Página Sobre", value: "Página Sobre" }
                                        ]
                                    }/* @ts-ignore */
                                    onChange={handleChangePosition}
                                />
                            </Block>

                            <BlockImagem>
                                <EtiquetaImagens>
                                    <IconSpanImagens>
                                        <MdFileUpload size={50} />
                                    </IconSpanImagens>
                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="imagem da loja" />
                                    {imagesUrl ? (
                                        <ImagensPreviewUrl
                                            src={imagesUrl}
                                            alt="imagem da loja"
                                        />
                                    ) :
                                        <>
                                            <ImagensUpload src={"http://localhost:3333/files/" + images} />
                                            <TextImagens>Clique na seta e insira<br /> uma imagem</TextImagens>
                                        </>
                                    }
                                </EtiquetaImagens>
                            </BlockImagem>
                        </FormImagens>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default NovaImagem;