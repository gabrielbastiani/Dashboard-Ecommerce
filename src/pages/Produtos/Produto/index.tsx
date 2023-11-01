/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { CardResponsive, Card, Container } from "../../../components/Content/styles";
import { AddButton, Block, BlockTop, Etiqueta, SpanText } from "../../Categorias/styles";
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
import {
    ContainerVariacao,
    ButtonVariacao,
    RenderOk, RenderNo,
    ButtonVariacaoDetalhes,
    ContatinerDescription,
    ContatinerButton
} from "../styles";
import NovaVariacao from "../../../components/Variacao";
import { Avisos } from "../../../components/Avisos";
import VariacaoDetalhes from "../../../components/Variacao/variacaoDetalhes";
import Modal from 'react-modal';
import { ModalDeleteProduct } from '../../../components/popups/ModalDeleteProduct';
import VoltarNavagation from "../../../components/VoltarNavagation";
import CategoriesProduct from "../../../components/CategoriesProduct";
import TagsProduct from "../../../components/TagsProduct";
import AttributesProduct from "../../../components/AttributesProduct";
import { ButtonSubCat, TextNotFound } from "../../../components/CategoriesProduct/styles";


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
    const [status, setStatus] = useState("");
    const [emphasis, setEmphasis] = useState("");
    const [offer, setOffer] = useState("");
    const [togetherBuy, setTogetherBuy] = useState("");

    const [descriptions, setDescriptions] = useState<any[]>([]);

    const [variation, setVariation] = useState<any[]>([]);
    const [idVariation, setIdVariation] = useState("");

    const [nameVariation, setNameVariation] = useState("");

    const [showElement, setShowElement] = useState(false);

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [buyTogether, setBuyTogether] = useState("");
    const [nameBuy, setNameBuy] = useState("");
    const [idBuy, setIdBuy] = useState("");


    var priceFormated = String(price);
    priceFormated = priceFormated + '';
    /* @ts-ignore */
    priceFormated = parseInt(priceFormated.replace(/[\D]+/g, ''));
    priceFormated = priceFormated + '';
    priceFormated = priceFormated.replace(/([0-9]{2})$/g, ",$1");

    if (priceFormated.length > 6) {
        priceFormated = priceFormated.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    /* @ts-ignore */
    // eslint-disable-next-line eqeqeq
    if (priceFormated == 'NaN') priceFormated = '';
    const formatedPrice = priceFormated.replace(".", "");
    const formatedPricePonto = formatedPrice.replace(",", ".");
    const numberPrice = formatedPricePonto;

    var promotionFormated = String(promotion);
    promotionFormated = promotionFormated + '';
    /* @ts-ignore */
    promotionFormated = parseInt(promotionFormated.replace(/[\D]+/g, ''));
    promotionFormated = promotionFormated + '';
    promotionFormated = promotionFormated.replace(/([0-9]{2})$/g, ",$1");

    if (promotionFormated.length > 6) {
        promotionFormated = promotionFormated.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    /* @ts-ignore */
    // eslint-disable-next-line eqeqeq
    if (promotionFormated == 'NaN') promotionFormated = '';
    const formatedPromotion = promotionFormated.replace(".", "");
    const formatedPromotionPonto = formatedPromotion.replace(",", ".");
    const numberPromotion = formatedPromotionPonto;

    var peso = weight,
        integer = peso.split(',')[0];

    peso = peso.replace(/\D/, "");
    peso = peso.replace(/^[0]+/, "");

    if (peso.length <= 3 || !integer) {
        if (peso.length === 1) peso = '0.00' + peso;
        if (peso.length === 2) peso = '0.0' + peso;
        if (peso.length === 3) peso = '0.' + peso;
    } else {
        peso = peso.replace(/^(\d{1,})(\d{3})$/, "$1.$2");
    }

    useEffect(() => {
        async function findBuyTogether() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findProductGroupBuyTogether?product_id=${product_id}`);

                setBuyTogether(response.data || "");
                setNameBuy(response.data.nameGroup || "");
                setIdBuy(response.data.id || "");

            } catch (error) {
                console.error(error);
            }
        }
        findBuyTogether();
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
                setStatus(responseProduct.data.status || "");
                setEmphasis(responseProduct.data.emphasis);
                setOffer(responseProduct.data.offer);
                setTogetherBuy(responseProduct.data.buyTogether_id || null);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadProduct();
    }, [product_id]);

    async function refreshProduct() {
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
            setStatus(responseProduct.data.status || "");
            setEmphasis(responseProduct.data.emphasis);
            setOffer(responseProduct.data.offer);
            setTogetherBuy(responseProduct.data.buyTogether_id || null);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateNameProduct() {
        try {
            const apiClient = setupAPIClient();
            if (name === '') {
                toast.error('Não deixe o nome do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameProduct?product_id=${product_id}`, { name: name });
                toast.success('Nome do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do produto.');
        }
    }

    async function updateProductStock() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStockProduct?product_id=${product_id}`, { stock: Number(stock) });

            toast.success('Estoque do produto atualizado com sucesso.');

            setTimeout(async () => {
                if (stock >= 1) {
                    await apiClient.get(`/getStockProduct?product_id=${product_id}`);
                }
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o estoque do produto.');
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
                        price: Number(numberPrice),
                        promotion: Number(numberPromotion),
                        sku: sku,
                        weight: peso,
                        width: width,
                        height: height,
                        depth: depth,
                        urlVideo: urlVideo,/* @ts-ignore */
                        buyTogether_id: buyTogether.id
                    });

                toast.success('Dado do produto atualizado com sucesso.');

                refreshProduct();
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

            refreshProduct();

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

            refreshProduct();

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

            refreshProduct();

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

            refreshProduct();

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

    async function loadVariations() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/allVariationProduct?product_id=${product_id}`);

            setVariation(response.data || []);
            
        } catch (error) {
            console.log(error);
        }
    }

    async function loadVariationProduct(id: string) {
        setIdVariation(id)
        const apiClient = setupAPIClient();
        try {
            const responseVariation = await apiClient.get(`/findUniqueVariation?productVariation_id=${id}`);

            setNameVariation(responseVariation.data.name || "");

        } catch (error) {
            console.log(error);
        }
    }

    const showOrHide = () => {
        setShowElement(!showElement);
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
        if (variation.length >= 1) {
            toast.error("Delete todas as variações vinculadas a este produto antes, para poder delatar esse produto!!!");
            return;
        }

        if (togetherBuy) {
            toast.error("Delete todos grupos compre junto vinculados a esse produto antes, para poder deletar esse produto!!!");
            return;
        }

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
                                                dado={status}
                                                handleSubmit={updateStatus}
                                                showElement={status}
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
                                                dado={new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price)}
                                                type="text"
                                                maxLength={9}
                                                /* @ts-ignore */
                                                placeholder={price}
                                                /* @ts-ignore */
                                                value={priceFormated}
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
                                                dado={new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(promotion)}
                                                maxLength={9}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={promotion}
                                                /* @ts-ignore */
                                                value={promotionFormated}
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
                                                dado={emphasis}
                                                handleSubmit={updateEmphasis}
                                                showElement={emphasis}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Produto em oferta? "}
                                        dados={
                                            <ButtonSelect
                                                dado={offer}
                                                handleSubmit={updateOffer}
                                                showElement={offer}
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
                                <br />
                                <br />
                                {buyTogether ?
                                    <>
                                        {togetherBuy === null ?
                                            <Block>
                                                <Etiqueta
                                                    style={{ fontSize: '18.1px', fontWeight: '600' }}
                                                >
                                                    Integrar grupo compre junto para esse produto:
                                                </Etiqueta>

                                                <Button
                                                    /* @ts-ignore */
                                                    value={buyTogether.nameGroup}
                                                    onClick={updateProductData}
                                                >
                                                    CLIQUE AQUI para integrar o grupo = {nameBuy}
                                                </Button>
                                            </Block>
                                            :
                                            <Block>
                                                <Etiqueta
                                                    style={{ fontSize: '18.1px', fontWeight: '600' }}
                                                >
                                                    Grupo compre junto desse produto:
                                                </Etiqueta>
                                                <Etiqueta>{nameBuy}</Etiqueta>
                                                <Link to={`/compreJunto/grupo/${idBuy}`}>
                                                    <ButtonSubCat
                                                    >
                                                        Ver grupo
                                                    </ButtonSubCat>
                                                </Link>
                                            </Block>
                                        }
                                    </>
                                    :
                                    <>
                                        <Etiqueta
                                            style={{ fontSize: '18.1px', fontWeight: '600' }}
                                        >
                                            Integrar grupo compre junto para esse produto:
                                        </Etiqueta>
                                        <br />
                                        <br />
                                        <TextNotFound
                                            style={{ color: 'red' }}
                                        >
                                            Ainda não há o grupo compre junto para esse produto
                                        </TextNotFound>
                                        <Link to={"/compreJunto"}>
                                            <ButtonSubCat
                                            >
                                                Clique aqui para cadastrar
                                            </ButtonSubCat>
                                        </Link>
                                    </>
                                }

                            </SectionDate>

                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Fréte Grátis "}
                                        dados={
                                            <ButtonSelect
                                                dado={freeShipping}
                                                handleSubmit={updateFreeShipping}
                                                showElement={freeShipping}
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
                                                handleSubmit={updateProductStock}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Peso (Kg)"}
                                        dados={
                                            <InputUpdate
                                                dado={peso}
                                                maxLength={7}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={peso}
                                                value={peso}
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
                                                maxLength={2} type="text"
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
                                                maxLength={2}
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
                                                maxLength={2}
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
                        <Card>
                            <CategoriesProduct
                                product_id={product_id}
                            />
                        </Card>
                        <Card>
                            <ContatinerDescription>
                                <ContatinerButton>
                                    <Link to={`/produto/descricao/nova/${slug}/${product_id}`}>
                                        <Button
                                            style={{ width: '350px', backgroundColor: 'green' }}
                                        >
                                            Cadastrar descrição para o produto
                                        </Button>
                                    </Link>
                                </ContatinerButton>
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
                                        />
                                    </>
                                }
                            </ContatinerDescription>
                        </Card>

                        <Card>
                            <AttributesProduct
                                product_id={product_id}
                            />
                        </Card>

                        <Card>
                            <TagsProduct
                                product_id={product_id}
                            />
                        </Card>
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
                                        {names.variationName}
                                    </ButtonVariacaoDetalhes>
                                )
                            })}

                        </CardResponsive>

                        <Card style={{ width: '100%' }}>
                            {showElement ? (
                                <NovaVariacao
                                    product_id={product_id}
                                    reloadVariation={loadVariations}
                                    close={showOrHide}
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
                                            variation_id={idVariation}
                                            photoVariacaoID={idVariation}
                                            reloadVariation={loadVariations}
                                            close={showOrHide}
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