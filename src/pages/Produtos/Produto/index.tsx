import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { CardResponsive, Card, Container } from "../../../components/Content/styles";
import { AddButton, BlockTop, SpanText } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { MdOutlineAssessment } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { toast } from "react-toastify";
import DescriptionsProduct from "../../../components/DescriptionsProduct";
import { SectionDate } from "../../Configuracoes/styles";
import { GridDate } from "../../Perfil/styles";
import PhotosProduct from "../../../components/PhotosProduct";
import { ContainerVariacao, ButtonVariacao, RenderOk, RenderNo, ButtonVariacaoDetalhes, ButtonUpdateCategory, BoxCategory, NameCategory, GridContainer, TextNotFound, ContatinerDescription, ContatinerButton } from "../styles";
import NovaVariacao from "../Variacao";
import { Avisos } from "../../../components/Avisos";
import VariacaoDetalhes from "../Variacao/variacaoDetalhes";
import Modal from 'react-modal';
import { ModalDeleteProduct } from '../../../components/popups/ModalDeleteProduct';
import VoltarNavagation from "../../../components/VoltarNavagation";


export type DeleteProduct = {
    product_id: string;
}

const Produto: React.FC = () => {

    let { slug, product_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(Number);
    const [sku, setSku] = useState("");
    const [promotion, setPromotion] = useState(Number);
    const [stock, setStock] = useState(Number);
    const [weight, setWeight] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [depth, setDepth] = useState("");
    const [urlVideo, setUrlVideo] = useState("");
    const [freeShipping, setFreeShipping] = useState("");
    const [buyTogether_id, setBuyTogether_id] = useState("");
    const [status, setStatus] = useState("");
    const [emphasis, setEmphasis] = useState("");
    const [offer, setOffer] = useState("");

    const [categories, setCategories] = useState<any[]>([]);
    const [descriptions, setDescriptions] = useState<any[]>([]);

    const [variation, setVariation] = useState<any[]>([]);
    const [idVariation, setIdVariation] = useState("");

    const [productIDvariation, setProductIDvariation] = useState("");
    const [nameVariation, setNameVariation] = useState("");
    const [slugVariation, setSlugVariation] = useState("");
    const [orderVariation, setOrderVariation] = useState();
    const [statusVariation, setStatusVariation] = useState("");

    const [showElement, setShowElement] = useState(false);

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findAllRelationsProductAndCategory?product_id=${product_id}`);
                setCategories(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, [product_id]);

    useEffect(() => {
        async function loadDescriptions() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsDescriptionsStore?product_id=${product_id}`);
                setDescriptions(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadDescriptions();
    }, [product_id]);

    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/findUniqueProduct?product_id=${product_id}`)

                setName(responseProduct.data.name || "");
                setPrice(responseProduct.data.price);
                setSku(responseProduct.data.sku || "");
                setPromotion(responseProduct.data.promotion);
                setStock(responseProduct.data.stock);
                setWeight(responseProduct.data.weight || "");
                setWidth(responseProduct.data.width || "");
                setHeight(responseProduct.data.height || "");
                setDepth(responseProduct.data.depth || "");
                setUrlVideo(responseProduct.data.urlVideo || "");
                setFreeShipping(responseProduct.data.freeShipping);
                setBuyTogether_id(responseProduct.data.buyTogether_id);
                setStatus(responseProduct.data.status || "");
                setEmphasis(responseProduct.data.emphasis);
                setOffer(responseProduct.data.offer);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadProduct();
    }, [product_id]);

    async function updateNameProduct() {
        try {
            const apiClient = setupAPIClient();
            if (name === '') {
                toast.error('Não deixe o nome do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameProduct?product_id=${product_id}`, { name: name });
                toast.success('Nome do produto atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do produto.');
        }
    }

    async function updateProductData() {
        try {
            const apiClient = setupAPIClient();
            if (sku === "") {
                toast.error('Não deixe o código do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAllDateProduct?product_id=${product_id}`,
                    {
                        name: name,
                        price: Number(price),
                        promotion: Number(promotion),
                        sku: sku,
                        stock: Number(stock),
                        weight: weight,
                        width: width,
                        height: height,
                        depth: depth,
                        urlVideo: urlVideo,
                        buyTogether_id: buyTogether_id
                    });

                toast.success('Dado do produto atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o dado do produto.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusProduct?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a status do produto.');
        }

        if (status === "Indisponivel") {
            toast.success(`O produto se encontra Disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`O produto se encontra Indisponivel.`);
            return;
        }
    }

    async function updateEmphasis() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/emphasis?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar produto destaque.');
        }

        if (emphasis === "Nao") {
            toast.success(`Esse produto é um destaque na loja.`);
            return;
        }

        if (emphasis === "Sim") {
            toast.error(`Esse produto não está como destaque na loja.`);
            return;
        }
    }

    async function updateOffer() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/offer?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar produto oferta.');
        }

        if (offer === "Nao") {
            toast.success(`Esse produto esta agora como oferta na loja.`);
            return;
        }

        if (offer === "Sim") {
            toast.error(`Esse produto não está agora como oferta na loja.`);
            return;
        }
    }

    async function updateFreeShipping() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateFreeShipping?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o frete grátis desse produto.');
        }

        if (freeShipping === "Nao") {
            toast.success(`Esse produto SIM ESTÁ agora com o frete grátis.`);
            return;
        }

        if (freeShipping === "Sim") {
            toast.error(`Esse produto NÃO ESTÁ como frete grátis.`);
            return;
        }
    }

    useEffect(() => {
        async function loadVariations() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allVariationProduct?product_id=${product_id}`);
                setVariation(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadVariations();
    }, [product_id]);

    async function loadVariationProduct(id: string) {
        setIdVariation(id)
        const apiClient = setupAPIClient();
        try {
            const responseVariation = await apiClient.get(`/findUniqueVariation?variation_id=${id}`);

            setProductIDvariation(responseVariation.data.id || "");
            setSlugVariation(responseVariation.data.slug || "");
            setNameVariation(responseVariation.data.name || "");
            setOrderVariation(responseVariation.data.order);
            setStatusVariation(responseVariation.data.status || "");

        } catch (error) {
            console.log(error);
        }
    }

    const showOrHide = () => {
        setShowElement(!showElement)
    }

    const renderOk = () => {
        return <RenderOk>Cancelar cadastro<br /> de variação</RenderOk>
    }

    const renderNo = () => {
        return <RenderNo>+ Nova</RenderNo>
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(product_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/findUniqueProduct', {
            params: {
                product_id: product_id,
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

                        <VoltarNavagation />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={name}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                onClick={() => handleOpenModalDelete(product_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <MdOutlineAssessment />
                            <Link to={`/produto/avaliacoes/${slug}/${product_id}`} >
                                <SpanText>Ver avaliações</SpanText>
                            </Link>
                        </AddButton>

                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Nome"}
                                        dados={
                                            <InputUpdate
                                                dado={name}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={name}
                                                value={name}
                                                /* @ts-ignore */
                                                onChange={(e) => setName(e.target.value)}
                                                handleSubmit={updateNameProduct}
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
                                                dado={status}
                                                handleSubmit={updateStatus}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"SKU"}
                                        dados={
                                            <InputUpdate
                                                dado={sku}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={sku}
                                                value={sku}
                                                /* @ts-ignore */
                                                onChange={(e) => setSku(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Preço"}
                                        dados={
                                            <InputUpdate
                                                /* @ts-ignore */
                                                dado={price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={price}
                                                /* @ts-ignore */
                                                value={price}
                                                /* @ts-ignore */
                                                onChange={(e) => setPrice(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Valor em promoção"}
                                        dados={
                                            <InputUpdate
                                                /* @ts-ignore */
                                                dado={promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                /* @ts-ignore */
                                                value={promotion}
                                                /* @ts-ignore */
                                                onChange={(e) => setPromotion(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Produto em destaque? "}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={emphasis}
                                                handleSubmit={updateEmphasis}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Produto em oferta? "}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={offer}
                                                handleSubmit={updateOffer}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Link vídeo do produto"}
                                        dados={
                                            <InputUpdate
                                                dado={urlVideo}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={urlVideo}
                                                value={urlVideo}
                                                /* @ts-ignore */
                                                onChange={(e) => setUrlVideo(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <GridContainer>
                                    {categories.length < 1 ? (
                                        <>
                                            <TextNotFound>Não há categorias cadastrados no produto ainda...</TextNotFound>
                                        </>
                                    ) :
                                        <>
                                            {categories.map((categ) => {
                                                return (
                                                    <BoxCategory key={categ.id}>
                                                        <NameCategory>{categ.category.name}</NameCategory>
                                                    </BoxCategory>
                                                )
                                            })}
                                        </>
                                    }
                                </GridContainer>

                                <ButtonUpdateCategory href={`/produto/atualizar/categorias/${product_id}`}>
                                    Atualizar Categorias
                                </ButtonUpdateCategory>

                            </SectionDate>

                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Fréte Grátis "}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={freeShipping}
                                                handleSubmit={updateFreeShipping}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Estoque"}
                                        dados={
                                            <InputUpdate
                                                dado={stock}
                                                type="number"
                                                /* @ts-ignore */
                                                placeholder={stock}
                                                value={stock}
                                                /* @ts-ignore */
                                                onChange={(e) => setStock(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Peso (Kg)"}
                                        dados={
                                            <InputUpdate
                                                dado={weight}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={weight}
                                                value={weight}
                                                /* @ts-ignore */
                                                onChange={(e) => setWeight(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Largura (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={width}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={width}
                                                value={width}
                                                /* @ts-ignore */
                                                onChange={(e) => setWidth(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Altura (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={height}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={height}
                                                value={height}
                                                /* @ts-ignore */
                                                onChange={(e) => setHeight(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Comprimento (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={depth}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={depth}
                                                value={depth}
                                                /* @ts-ignore */
                                                onChange={(e) => setDepth(e.target.value)}
                                                handleSubmit={updateProductData}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                <PhotosProduct
                                    product_id={product_id}
                                />
                            </SectionDate>
                        </GridDate>
                        <br />
                        <br />
                        <ContatinerDescription>
                            <ContatinerButton>
                                <Link to={`/produto/descricao/nova/${slug}/${product_id}`}>
                                    <Button
                                        style={{ width: '350px' }}
                                    >
                                        Cadastrar descrição para o produto
                                    </Button>
                                </Link>
                            </ContatinerButton>
                            <br />
                            <br />
                            <br />
                            <br />
                            {descriptions.length < 1 ? (
                                <>
                                    <Avisos texto="Não há descrições cadastradas no produto ainda..." />
                                </>
                            ) :
                                <>
                                    <DescriptionsProduct
                                        product_id={product_id}
                                        handleSubmit={() => alert('clicou')}
                                    />
                                </>
                            }
                        </ContatinerDescription>
                    </Card>

                    <ContainerVariacao>
                        <CardResponsive>

                            <Titulos tipo="h1" titulo="Variações" />

                            <ButtonVariacao
                                onClick={showOrHide}
                            >
                                {showElement && renderOk() || renderNo()}
                            </ButtonVariacao>

                            {variation.map((names) => {
                                return (
                                    <ButtonVariacaoDetalhes key={names.id}
                                        onClick={() => loadVariationProduct(names.id)}
                                    >
                                        {names.nameVariacao}
                                    </ButtonVariacaoDetalhes>
                                )
                            })}

                        </CardResponsive>

                        <Card style={{ width: '100%' }}>
                            {showElement ? (
                                <NovaVariacao
                                    /* @ts-ignore */
                                    product_id={product_id}
                                />
                            ) :
                                <>
                                    {variation.length < 1 && (
                                        <Avisos
                                            texto="Não há variações cadastradas para esse produto..."
                                        />
                                    )}

                                    {!idVariation && variation.length >= 1 && (
                                        <Titulos
                                            tipo="h3"
                                            titulo="Cadastre uma variação, ou selecione uma variação existente para ver os detalhes."
                                        />
                                    )}

                                    {!!idVariation && (
                                        <VariacaoDetalhes
                                            /* @ts-ignore */
                                            productId={product_id}
                                            variacao_id={idVariation}
                                            photoVariacaoID={idVariation}
                                            nameVariacao={nameVariation}
                                        />
                                    )}
                                </>
                            }
                        </Card>
                    </ContainerVariacao>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteProduct
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    product={modalItem}
                />
            )}
        </>
    )
}

export default Produto;