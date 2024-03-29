import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Aside from "../../components/Aside";
import { Card } from "../../components/Content/styles";
import MainHeader from "../../components/MainHeader";
import Titulos from "../../components/Titulos";
import Voltar from "../../components/Voltar";
import { Button } from "../../components/ui/Button";
import { Block, BlockTop, Container, Etiqueta } from "../Categorias/styles";
import { Grid } from "../Dashboard/styles";
import { useNavigate } from "react-router-dom";
import { SectionDate } from "../Configuracoes/styles";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { InputPost } from "../../components/ui/InputPost";
import Select from "../../components/ui/Select";
import {
    BlockInputs,
    BoxActive,
    EtiquetaInput,
    RadioBotton
} from "./styles";
import {
    BlockImagem,
    EtiquetaImagens,
    FormImagens,
    IconSpanImagens,
    ImagensPreviewUrl,
    ImagensUpload,
    InputImagens,
    TextImagens
} from "../Configuracoes/ImagensInstitucionais/styles";
import { MdFileUpload } from "react-icons/md";
import { GridDate } from "../Perfil/styles";
import Warnings from "../../components/Warnings";


const NovoBanner: React.FC = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [banner, setBanner] = useState(null);
    const [bannerUrl, setBannerUrl] = useState("");
    const [order, setOrder] = useState(Number);
    const [url, setUrl] = useState("");
    const [positionSelected, setPositionSelected] = useState();
    const [categories, setCategories] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/listCategorysDisponivel');
                setCategories(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, []);

    async function handleRegisterBanner(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', banner);
            data.append('title', title);
            data.append('width', width);
            data.append('height', height);
            data.append('startDate', startDate);
            data.append('endDate', endDate);/* @ts-ignore */
            data.append('order', Number(order));
            data.append('url', url);/* @ts-ignore */
            data.append('position', positionSelected);
            data.append('active', active);

            await apiClient.post(`/createBanner`, data);

            setLoading(true);

            toast.success('Banner cadastrado com sucesso.');

            setLoading(false);

            setTimeout(() => {
                navigate('/banners');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o banner.');
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
            setBanner(image)
            setBannerUrl(URL.createObjectURL(image))
        }
    }

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value);
    }

    setInterval(() => {
        new Date();
    }, 1000);



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>

                    <Voltar url={'/banners'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Novo Banner"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            loading={loading}
                            form="banner-form"
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <FormImagens id="banner-form" onSubmit={handleRegisterBanner}>
                        <GridDate>
                            <SectionDate>
                                <Block>
                                    <Etiqueta>Titulo do banner:</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite o titulo aqui..."
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Ordem do banner:</Etiqueta>
                                    <InputPost
                                        type="number"
                                        placeholder="0"/* @ts-ignore */
                                        onChange={(e) => setOrder(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Posição desse banner:</Etiqueta>
                                    <Select
                                        value={positionSelected}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Banner Topo", value: "Banner Topo" },
                                                { label: "Banner Mosaico Página Principal", value: "Banner Mosaico Página Principal" },
                                                { label: "Banner Páginas Categorias", value: "Banner Páginas Categorias" },
                                                { label: "Banner Páginas de Produto", value: "Banner Páginas de Produto" },
                                                ...(categories || []).map((item) => ({ label: item.name, value: item.slug }))
                                            ]
                                        }/* @ts-ignore */
                                        onChange={handleChangePosition}
                                    />
                                </Block>

                                {positionSelected === "Banner Topo" || positionSelected === "Banner Páginas Categorias" ? (
                                    null
                                ) :
                                    <>
                                        <Block>
                                            <Etiqueta>Largura (px):</Etiqueta>
                                            <InputPost
                                                type="text"
                                                placeholder="Digite o aqui..."
                                                onChange={(e) => setWidth(e.target.value)}
                                            />
                                        </Block>

                                        <Block>
                                            <Etiqueta>Altura (px):</Etiqueta>
                                            <InputPost
                                                type="text"
                                                placeholder="Digite o aqui..."
                                                onChange={(e) => setHeight(e.target.value)}
                                            />
                                        </Block>
                                    </>
                                }
                            </SectionDate>

                            <SectionDate>
                                <Block>
                                    <Etiqueta>Link de redirecionamento:</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite o aqui..."
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <BlockInputs>
                                        <BoxActive>
                                            <EtiquetaInput>Ativar banner?</EtiquetaInput>
                                            <RadioBotton
                                                type="checkbox"
                                                value={active}
                                                onClick={handleChecked}
                                                onChange={() => setActive(check ? "Nao" : "Sim")}
                                                checked={check}
                                            />
                                        </BoxActive>
                                    </BlockInputs>
                                </Block>
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
                                            PROGRAMAR ABAIXO), MAS CASO QUEIRA ATIVAR O BANNER NA LOJA SEM PROGRAMAÇÃO, ATIVE O CHECKBOX ACIMA E SALVE NORMALMENTE.
                                        </Etiqueta>
                                        <br />
                                        <br />
                                        <Block>
                                            <Etiqueta>Data de início:</Etiqueta>
                                            <InputPost
                                                type="datetime-local"
                                                placeholder={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </Block>

                                        <Block>
                                            <Etiqueta>Data do fim:</Etiqueta>
                                            <InputPost
                                                type="datetime-local"
                                                placeholder={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </Block>
                                    </>
                                }
                            </SectionDate>
                        </GridDate>
                        <br />
                        <br />
                        <br />
                        <BlockImagem>
                            <EtiquetaImagens>
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
                                        <TextImagens>Clique na seta e insira<br /> um banner</TextImagens>
                                    </>
                                }
                            </EtiquetaImagens>
                        </BlockImagem>
                    </FormImagens>
                </Card>
            </Container>
        </Grid>
    )
}

export default NovoBanner;