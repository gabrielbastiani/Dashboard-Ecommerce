import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { BlockTop, ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import Titulos from "../../components/Titulos";
import { GridDate } from "../Perfil/styles";
import { SectionDate } from "../Configuracoes/styles";
import { BlockDados, IconSpanCatgoryImagens, ImagensCategoryPreviewUrl, ImagensCategoryUpload } from "../Categorias/Categoria/styles";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import { ButtonSelect } from "../../components/ui/ButtonSelect";
import { EtiquetaTextImagem, FormUpdateImage, InputLogoTextImagem, TextPhoto } from "../Configuracoes/TextosInstitucionais/Texto/ImagemTexto/styles";
import { Button } from "../../components/ui/Button";
import { MdFileUpload } from "react-icons/md";
import { BlockImagem, EtiquetaImagens, FormImagens, InputImagens, TextImagens } from "../Configuracoes/ImagensInstitucionais/styles";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import { Avisos } from "../../components/Avisos";
import TabelaSimples from "../../components/Tabelas";



const EditAtributo: React.FC = () => {

    let { atributo_id } = useParams();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");
    const [order, setOrder] = useState(Number);
    const [disponibilidade, setDisponibilidade] = useState('');

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(10);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [imageAtributo, setImageAtributo] = useState(null);
    const [atributoImageUrl, setAtributoImageUrl] = useState('');

    const [atributoImageUpload, setAtributoImageUpload] = useState(null);
    const [atributoImageUploadUrl, setAtributoImageUploadUrl] = useState('');

    const [imageAtributes, setImageAtributes] = useState("");
    const [iDImage, setIDImage] = useState("");


    useEffect(() => {
        async function refreshAtributos() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/exactAtributo?atributo_id=${atributo_id}`);
            setTipo(response.data.tipo || "");
            setValor(response.data.valor || "");
            setOrder(response.data.order);
            setDisponibilidade(response.data.disponibilidade || "");
            setImageAtributes(response.data.imageatributos[0].imageAtributo);
            setAtributoImageUpload(response.data.imageatributos[0].imageAtributo);
            setIDImage(response.data.imageatributos[0].id);
        }
        refreshAtributos();
    }, [atributo_id]);

    async function updateTipoAtributo() {
        try {
            const apiClient = setupAPIClient();
            if (tipo === '') {
                toast.error('Não deixe o tipo do atributo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTipoAtributo?atributo_id=${atributo_id}`, { tipo: tipo });
                toast.success('Tipo do atributo atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o tipo do atributo.');
        }
    }

    async function updateValorAtributo() {
        try {
            const apiClient = setupAPIClient();
            if (valor === '') {
                toast.error('Não deixe o valor do atributo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateValorAtribute?atributo_id=${atributo_id}`, { valor: valor });
                toast.success('Valor do atributo atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o valor do atributo.');
        }
    }

    async function updateOrderCategory() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderAtributo?atributo_id=${atributo_id}`, { order: Number(order) });
                toast.success('Ordem atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar a ordem do atributo.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusAtributo?atributo_id=${atributo_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade do atributo.');
        }

        if (disponibilidade === "Indisponivel") {
            toast.success(`O atributo se encontra Disponivel.`);
            return;
        }

        if (disponibilidade === "Disponivel") {
            toast.error(`O atributo se encontra Indisponivel.`);
            return;
        }
    }

    useEffect(() => {
        async function allProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageListAtributosRelations?page=${currentPage}&limit=${limit}&atributo_id=${atributo_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.allFindAscAtributos || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.data.response);
            }
        }
        allProducts();
    }, [atributo_id, currentPage, limit, total]);

    async function handleImageAtributo(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', imageAtributo);/* @ts-ignore */
            data.append('atributo_id', atributo_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageAtributo`, data);

            toast.success('Imagem cadastrada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a imagem no atributo!!!');
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
            setAtributoImageUrl(URL.createObjectURL(image))
        }

    }

    async function handleImageUpload(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', atributoImageUpload);

            const apiClient = setupAPIClient();
            await apiClient.put(`/updateImageAtributo?imageAtributo_id=${iDImage}`, data);

            toast.success('Imagem atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao atualizar a imagem do atributo!!!');
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
            setAtributoImageUpload(image);
            setAtributoImageUploadUrl(URL.createObjectURL(image));
        }

    }

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Produto": item.product.nameProduct,
            "SKU": item.product.sku,
            "Disponibilidade": item.product.disponibilidade,
            "botaoDetalhes": `/produto/${item.product.slug}/${item.product.id}`
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
                            url="/atributos"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Editar atributo"
                            />
                        </BlockTop>

                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Tipo"}
                                        dados={
                                            <InputUpdate
                                                dado={tipo}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={tipo}
                                                value={tipo}
                                                /* @ts-ignore */
                                                onChange={(e) => setTipo(e.target.value)}
                                                handleSubmit={updateTipoAtributo}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Valor"}
                                        dados={
                                            <InputUpdate
                                                dado={valor}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={valor}
                                                value={valor}
                                                /* @ts-ignore */
                                                onChange={(e) => setValor(e.target.value)}
                                                handleSubmit={updateValorAtributo}
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
                                                handleSubmit={updateOrderCategory}
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
                                                handleSubmit={updateStatus}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                {imageAtributes ? (
                                    <>
                                        <FormUpdateImage onSubmit={handleImageUpload}>
                                            <EtiquetaTextImagem>
                                                {atributoImageUploadUrl ? (
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
                                                {atributoImageUploadUrl ? (
                                                    <>
                                                        <ImagensCategoryUpload
                                                            src={atributoImageUploadUrl}
                                                        />
                                                    </>
                                                ) :
                                                    <>
                                                        <TextPhoto>Clique para carregar uma nova imagem</TextPhoto>
                                                        <ImagensCategoryPreviewUrl src={"http://localhost:3333/files/" + atributoImageUpload} />
                                                    </>
                                                }
                                            </EtiquetaTextImagem>
                                        </FormUpdateImage>
                                    </>
                                ) :
                                    <>
                                        <FormImagens onSubmit={handleImageAtributo}>
                                            <BlockImagem>
                                                <EtiquetaImagens>
                                                    {atributoImageUrl ? (
                                                        <Button
                                                            type="submit"
                                                        >
                                                            Salvar Imagem
                                                        </Button>
                                                    ) : null}
                                                    <IconSpanCatgoryImagens>
                                                        <MdFileUpload size={50} />
                                                    </IconSpanCatgoryImagens>
                                                    <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="imagem da categoria loja" />
                                                    {atributoImageUrl ? (
                                                        <ImagensCategoryPreviewUrl
                                                            src={atributoImageUrl}
                                                            alt="imagem da categoria loja"
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
                        <br />
                        <br />
                        <br />
                        <br />
                        <DivisorHorizontal />

                        <Titulos
                            tipo="h2"
                            titulo="Produtos com esse atributo"
                        />
                        <br />
                        <br />
                        {search.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há produtos cadastradas aqui..."
                                />
                            </>
                        ) :
                            <>
                                <TabelaSimples
                                    cabecalho={["Produto", "SKU", "Disponibilidade"]}
                                    dados={dados}
                                    textbutton={"Detalhes"}
                                />

                                <ContainerPagination>
                                    <TotalBoxItems key={total}>
                                        <TextTotal>Total de produtos: {total}</TextTotal>
                                    </TotalBoxItems>
                                    <ContainerCategoryPage>
                                        {currentPage > 1 && (
                                            <Previus>
                                                <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                                    Voltar
                                                </ButtonPage>
                                            </Previus>
                                        )}

                                        {pages.map((page) => (
                                            <TextPage
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </TextPage>
                                        ))}

                                        {currentPage < search.length && (
                                            <Next>
                                                <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                                    Avançar
                                                </ButtonPage>
                                            </Next>
                                        )}
                                    </ContainerCategoryPage>
                                </ContainerPagination>
                            </>
                        }
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default EditAtributo;