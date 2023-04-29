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
import DescriptionsProductUpdate from "../../../components/ui/DescriptionsProductUpdate";
import { SectionDate } from "../../Configuracoes/styles";
import { GridDate } from "../../Perfil/styles";
import PhotosProduct from "../../../components/PhotosProduct";
import { ContainerVariacao, ButtonVariacao, RenderOk, RenderNo, ButtonVariacaoDetalhes, ButtonUpdateCategory, BoxCategory, NameCategory, GridContainer } from "../styles";
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

    const [nameProducts, setNameProducts] = useState("");
    const [descriptionProducts1, setDescriptionProducts1] = useState("");
    const [descriptionProducts2, setDescriptionProducts2] = useState("");
    const [descriptionProducts3, setDescriptionProducts3] = useState("");
    const [descriptionProducts4, setDescriptionProducts4] = useState("");
    const [descriptionProducts5, setDescriptionProducts5] = useState("");
    const [descriptionProducts6, setDescriptionProducts6] = useState("");
    const [precos, setPrecos] = useState("");
    const [skus, setSkus] = useState("");
    const [promocoes, setPromocoes] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [disponibilidades, setDisponibilidades] = useState("");
    const [order, setOrder] = useState(Number);
    const [posicao, setPosicao] = useState("");
    const [destaques, setDestaques] = useState("");
    const [ofertas, setOfertas] = useState("");

    const [variacoes, setVariacoes] = useState<any[]>([]);

    const [iDVariacao, setIDVariacao] = useState("");

    const [nameVariacao, setNameVariacao] = useState("");
    const [orderVariacao, setOrderVariacao] = useState(Number);
    const [posicaoVariacao, setPosicaoVariacao] = useState("");
    const [descriptionVariacao1, setDescriptionVariacao1] = useState("");
    const [descriptionVariacao2, setDescriptionVariacao2] = useState("");
    const [descriptionVariacao3, setDescriptionVariacao3] = useState("");
    const [descriptionVariacao4, setDescriptionVariacao4] = useState("");
    const [descriptionVariacao5, setDescriptionVariacao5] = useState("");
    const [descriptionVariacao6, setDescriptionVariacao6] = useState("");
    const [precoVariacao, setPrecoVariacao] = useState("");
    const [skuVariacao, setSkuVariacao] = useState("");
    const [estoqueVariacao, setEstoqueVariacao] = useState("");
    const [pesoKgVariacao, setPesoKgVariacao] = useState("");
    const [larguraCmVariacao, setLarguraCmVariacao] = useState("");
    const [profundidadeCmVariacao, setProfundidadeCmVariacao] = useState("");
    const [alturaCmVariacao, setAlturaCmVariacao] = useState("");
    const [promocaoVariacao, setPromocaoVariacao] = useState("");

    const [showElement, setShowElement] = useState(false);

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);
                setCategories(data.allFindOrderAsc || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, [product_id]);

    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/exactProduct?product_id=${product_id}`)

                setNameProducts(responseProduct.data.nameProduct || "");
                setDescriptionProducts1(responseProduct.data.descriptionProduct1 || "");
                setDescriptionProducts2(responseProduct.data.descriptionProduct2 || "");
                setDescriptionProducts3(responseProduct.data.descriptionProduct3 || "");
                setDescriptionProducts4(responseProduct.data.descriptionProduct4 || "");
                setDescriptionProducts5(responseProduct.data.descriptionProduct5 || "");
                setDescriptionProducts6(responseProduct.data.descriptionProduct6 || "");
                setPrecos(responseProduct.data.preco);
                setSkus(responseProduct.data.sku || "");
                setPromocoes(responseProduct.data.promocao);
                setDisponibilidades(responseProduct.data.disponibilidade || "");
                setDestaques(responseProduct.data.produtoDestaque);
                setOfertas(responseProduct.data.produtoOferta);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadProduct();
    }, [product_id]);

    async function updateNameProduct() {
        try {
            const apiClient = setupAPIClient();
            if (nameProducts === '') {
                toast.error('Não deixe o nome do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameProduct?product_id=${product_id}`, { nameProduct: nameProducts });
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
            if (skus === "") {
                toast.error('Não deixe o código do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAllDateProduct?product_id=${product_id}`,
                    {
                        nameProduct: nameProducts,
                        descriptionProduct1: descriptionProducts1,
                        descriptionProduct2: descriptionProducts2,
                        descriptionProduct3: descriptionProducts3,
                        descriptionProduct4: descriptionProducts4,
                        descriptionProduct5: descriptionProducts5,
                        descriptionProduct6: descriptionProducts6,
                        order: Number(order),
                        preco: precos,
                        promocao: promocoes,
                        sku: skus
                    });
                toast.success('Dado do produto atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado do produto.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/diponibilidadeProduct?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade do produto.');
        }

        if (disponibilidades === "Indisponivel") {
            toast.success(`O produto se encontra Disponivel.`);
            return;
        }

        if (disponibilidades === "Disponivel") {
            toast.error(`O produto se encontra Indisponivel.`);
            return;
        }
    }

    async function updateDestaque() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/destaque?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar produto destaque.');
        }

        if (destaques === "Nao") {
            toast.success(`Esse produto é um destaque na loja.`);
            return;
        }

        if (destaques === "Sim") {
            toast.error(`Esse produto não está como destaque na loja.`);
            return;
        }
    }

    async function updateOferta() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/oferta?product_id=${product_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar produto oferta.');
        }

        if (ofertas === "Nao") {
            toast.success(`Esse produto esta agora como oferta na loja.`);
            return;
        }

        if (ofertas === "Sim") {
            toast.error(`Esse produto não está agora como oferta na loja.`);
            return;
        }
    }

    useEffect(() => {
        async function loadVariacao() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/variacoesProduct?product_id=${product_id}`);
                setVariacoes(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadVariacao();
    }, [product_id]);

    async function loadVariacaoProduct(id: string) {
        setIDVariacao(id)
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/variacoes?variacao_id=${id}`);
            setNameVariacao(response?.data?.nameVariacao);
            setDescriptionVariacao1(response?.data?.descriptionVariacao1);
            setDescriptionVariacao2(response?.data?.descriptionVariacao2);
            setDescriptionVariacao3(response?.data?.descriptionVariacao3);
            setDescriptionVariacao4(response?.data?.descriptionVariacao4);
            setDescriptionVariacao5(response?.data?.descriptionVariacao5);
            setDescriptionVariacao6(response?.data?.descriptionVariacao6);
            setPrecoVariacao(response?.data?.preco);
            setSkuVariacao(response?.data?.skuVariacao);
            setEstoqueVariacao(response?.data?.estoqueVariacao);
            setPesoKgVariacao(response?.data?.pesoKg);
            setLarguraCmVariacao(response?.data?.larguraCm);
            setProfundidadeCmVariacao(response?.data?.profundidadeCm);
            setAlturaCmVariacao(response?.data?.alturaCm);
            setPromocaoVariacao(response?.data?.promocao);
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
        const responseDelete = await apiClient.get('/exactProduct', {
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
                                titulo={nameProducts}
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
                                                dado={nameProducts}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={nameProducts}
                                                value={nameProducts}
                                                /* @ts-ignore */
                                                onChange={(e) => setNameProducts(e.target.value)}
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
                                                dado={disponibilidades}
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
                                                dado={skus}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={skus}
                                                value={skus}
                                                /* @ts-ignore */
                                                onChange={(e) => setSkus(e.target.value)}
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
                                                dado={precos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={precos}
                                                /* @ts-ignore */
                                                value={precos}
                                                /* @ts-ignore */
                                                onChange={(e) => setPrecos(e.target.value)}
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
                                                dado={promocoes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={promocoes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                                /* @ts-ignore */
                                                value={promocoes}
                                                /* @ts-ignore */
                                                onChange={(e) => setPromocoes(e.target.value)}
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
                                                dado={destaques}
                                                handleSubmit={updateDestaque}
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
                                                dado={ofertas}
                                                handleSubmit={updateOferta}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <GridContainer>
                                    {categories.map((categ) => {
                                        return (
                                            <BoxCategory key={categ.id}>
                                                <NameCategory>{categ.category.categoryName}</NameCategory>
                                            </BoxCategory>
                                        )
                                    })}
                                </GridContainer>

                                <ButtonUpdateCategory href={`/produto/atualizar/categorias/${product_id}`}>
                                    Atualizar Categorias
                                </ButtonUpdateCategory>

                            </SectionDate>

                            <SectionDate>
                                <PhotosProduct
                                    product_id={product_id}
                                />
                            </SectionDate>
                        </GridDate>
                        <br />
                        <br />
                        <DescriptionsProductUpdate
                            valor1={descriptionProducts1}
                            valor2={descriptionProducts2}
                            valor3={descriptionProducts3}
                            valor4={descriptionProducts4}
                            valor5={descriptionProducts5}
                            valor6={descriptionProducts6}
                            /* @ts-ignore */
                            onChange1={(e) => setDescriptionProducts1(e.target.value)}
                            /* @ts-ignore */
                            onChange2={(e) => setDescriptionProducts2(e.target.value)}
                            /* @ts-ignore */
                            onChange3={(e) => setDescriptionProducts3(e.target.value)}
                            /* @ts-ignore */
                            onChange4={(e) => setDescriptionProducts4(e.target.value)}
                            /* @ts-ignore */
                            onChange5={(e) => setDescriptionProducts5(e.target.value)}
                            /* @ts-ignore */
                            onChange6={(e) => setDescriptionProducts6(e.target.value)}
                            handleSubmit1={updateProductData}
                            handleSubmit2={updateProductData}
                            handleSubmit3={updateProductData}
                            handleSubmit4={updateProductData}
                            handleSubmit5={updateProductData}
                            handleSubmit6={updateProductData}
                            placeholder1={""}
                            placeholder2={""}
                            placeholder3={""}
                            placeholder4={""}
                            placeholder5={""}
                            placeholder6={""}
                        />
                    </Card>

                    <ContainerVariacao>
                        <CardResponsive>

                            <Titulos tipo="h1" titulo="Variações" />

                            <ButtonVariacao
                                onClick={showOrHide}
                            >
                                {showElement && renderOk() || renderNo()}
                            </ButtonVariacao>

                            {variacoes.map((names) => {
                                return (
                                    <ButtonVariacaoDetalhes key={names.id}
                                        onClick={() => loadVariacaoProduct(names.id)}
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
                                    {variacoes.length < 1 && (
                                        <Avisos
                                            texto="Não há variações cadastradas para esse produto..."
                                        />
                                    )}

                                    {!iDVariacao && variacoes.length >= 1 && (
                                        <Titulos
                                            tipo="h3"
                                            titulo="Cadastre uma variação, ou selecione uma variação existente para ver os detalhes."
                                        />
                                    )}

                                    {!!iDVariacao && (
                                        <VariacaoDetalhes
                                            /* @ts-ignore */
                                            productId={product_id}
                                            variacao_id={iDVariacao}
                                            photoVariacaoID={iDVariacao}
                                            nameVariacao={nameVariacao}
                                            descriptionVariacao1={descriptionVariacao1}
                                            descriptionVariacao2={descriptionVariacao2}
                                            descriptionVariacao3={descriptionVariacao3}
                                            descriptionVariacao4={descriptionVariacao4}
                                            descriptionVariacao5={descriptionVariacao5}
                                            descriptionVariacao6={descriptionVariacao6}
                                            preco={precoVariacao}
                                            skuVariacao={skuVariacao}
                                            estoqueVariacao={estoqueVariacao}
                                            pesoKg={pesoKgVariacao}
                                            larguraCm={larguraCmVariacao}
                                            alturaCm={alturaCmVariacao}
                                            profundidadeCm={profundidadeCmVariacao}
                                            promocao={promocaoVariacao}
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