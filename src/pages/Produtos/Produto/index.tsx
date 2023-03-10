import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { CardResponsive, Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
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
import SelectUpdate from "../../../components/ui/SelectUpdate";
import DescriptionsProductUpdate from "../../../components/ui/DescriptionsProductUpdate";
import { SectionDate } from "../../Configuracoes/styles";
import { GridDate } from "../../Perfil/styles";
import PhotosProduct from "../../../components/PhotosProduct";
import { ContainerVariacao, ButtonVariacao, RenderOk, RenderNo, ButtonVariacaoDetalhes } from "../styles";
import NovaVariacao from "../Variacao";
import { Avisos } from "../../../components/Avisos";
import VariacaoDetalhes from "../Variacao/variacaoDetalhes";
import Modal from 'react-modal';
import { ModalDeleteProduct } from '../../../components/popups/ModalDeleteProduct';


export type DeleteProduct = {
    product_id: string;
}

const Produto: React.FC = () => {

    let { nameProduct, product_id } = useParams();

    const navigate = useNavigate();

    const [nameProducts, setNameProducts] = useState(nameProduct);
    const [dataName, setDataName] = useState('');
    const [descriptionProducts1, setDescriptionProducts1] = useState('');
    const [descriptionProducts2, setDescriptionProducts2] = useState('');
    const [descriptionProducts3, setDescriptionProducts3] = useState('');
    const [descriptionProducts4, setDescriptionProducts4] = useState('');
    const [descriptionProducts5, setDescriptionProducts5] = useState('');
    const [descriptionProducts6, setDescriptionProducts6] = useState('');
    const [precos, setPrecos] = useState('');
    const [skus, setSkus] = useState('');
    const [estoques, setEstoques] = useState(Number);
    const [pesoKGs, setPesoKGs] = useState('');
    const [larguraCMs, setLarguraCMs] = useState('');
    const [alturaCMs, setAlturaCMs] = useState('');
    const [profundidadeCMs, setProfundidadeCMs] = useState('');
    const [promocoes, setPromocoes] = useState('');
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState();
    const [categorieName, setCategorieName] = useState('');
    const [disponibilidades, setDisponibilidades] = useState('');

    const [variacoes, setVariacoes] = useState<any[]>([]);

    const [iDVariacao, setIDVariacao] = useState('');

    const [nameVariacao, setNameVariacao] = useState('');
    const [descriptionVariacao1, setDescriptionVariacao1] = useState('');
    const [descriptionVariacao2, setDescriptionVariacao2] = useState('');
    const [descriptionVariacao3, setDescriptionVariacao3] = useState('');
    const [descriptionVariacao4, setDescriptionVariacao4] = useState('');
    const [descriptionVariacao5, setDescriptionVariacao5] = useState('');
    const [descriptionVariacao6, setDescriptionVariacao6] = useState('');
    const [precoVariacao, setPrecoVariacao] = useState('');
    const [skuVariacao, setSkuVariacao] = useState('');
    const [estoqueVariacao, setEstoqueVariacao] = useState('');
    const [pesoKgVariacao, setPesoKgVariacao] = useState('');
    const [larguraCmVariacao, setLarguraCmVariacao] = useState('');
    const [profundidadeCmVariacao, setProfundidadeCmVariacao] = useState('');
    const [alturaCmVariacao, setAlturaCmVariacao] = useState('');
    const [promocaoVariacao, setPromocaoVariacao] = useState('');

    const [showElement, setShowElement] = useState(false);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allCategorys');
                setCategories(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, [])

    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/exactProduct?product_id=${product_id}`)
                const {
                    nameProduct,
                    descriptionProduct1,
                    descriptionProduct2,
                    descriptionProduct3,
                    descriptionProduct4,
                    descriptionProduct5,
                    descriptionProduct6,
                    preco,
                    sku,
                    estoque,
                    pesoKG,
                    larguraCM,
                    profundidadeCM,
                    alturaCM,
                    promocao,
                    disponibilidade
                } = responseProduct.data

                setDataName(nameProduct);
                setDescriptionProducts1(descriptionProduct1);
                setDescriptionProducts2(descriptionProduct2);
                setDescriptionProducts3(descriptionProduct3);
                setDescriptionProducts4(descriptionProduct4);
                setDescriptionProducts5(descriptionProduct5);
                setDescriptionProducts6(descriptionProduct6);
                setPrecos(preco);
                setSkus(sku);
                setEstoques(estoque);
                setPesoKGs(pesoKG);
                setLarguraCMs(larguraCM);
                setProfundidadeCMs(profundidadeCM);
                setAlturaCMs(alturaCM);
                setPromocoes(promocao);
                setDisponibilidades(disponibilidade);
                setCategorieName(responseProduct.data.category.categoryName);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadProduct();
    }, [product_id])

    async function refreshProduct() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/exactProduct?product_id=${product_id}`);
        setNameProducts(response?.data?.nameProduct);
        setDataName(response?.data?.nameProduct);
        setDisponibilidades(response?.data?.disponibilidade);
    }

    async function updateNameProduct() {
        try {
            const apiClient = setupAPIClient();
            if (nameProducts === '') {
                toast.error('N??o deixe o nome do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameProduct?product_id=${product_id}`, { nameProduct: nameProducts || dataName });
                toast.success('Nome do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do produto.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/diponibilidadeProduct?product_id=${product_id}`);

            refreshProduct();

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

    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    async function updateCategory() {
        try {
            if (categorySelected === "") {
                toast.error(`Selecione uma nova categoria, ou cancele a atualiza????o apertando no bot??o vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateCategory?product_id=${product_id}`, { category_id: categorySelected });
            toast.success('Categoria atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a categoria.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function updateDescriptions() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllDescription?product_id=${product_id}`, {
                descriptionProduct1: descriptionProducts1,
                descriptionProduct2: descriptionProducts2,
                descriptionProduct3: descriptionProducts3,
                descriptionProduct4: descriptionProducts4,
                descriptionProduct5: descriptionProducts5,
                descriptionProduct6: descriptionProducts6,
            });
            toast.success('Descri????o atualizada com sucesso.');
            refreshProduct();
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descri????o.');
        }
    }

    async function updateSKUProduct() {
        try {
            const apiClient = setupAPIClient();
            if (skus === '') {
                toast.error('N??o deixe o c??digo do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateSKU?product_id=${product_id}`, { sku: skus });
                toast.success('C??digo do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o c??digo do produto.');
        }
    }

    async function updateEstoqueProduct() {
        try {
            const apiClient = setupAPIClient();
            if (Number(estoques) < 0) {
                toast.error('N??o deixe o estoque do produto negativo... minimo de 0.');
                return;
            } else {
                await apiClient.put(`/updateEstoque?product_id=${product_id}`, { estoque: Number(estoques) });
                toast.success('Estoque do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o estoque do produto.');
        }
    }

    async function updatePesoProduct() {
        try {
            const apiClient = setupAPIClient();
            if (pesoKGs === "") {
                toast.error('N??o deixe o peso do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updatePeso?product_id=${product_id}`, { pesoKG: pesoKGs });
                toast.success('Peso do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o peso do produto.');
        }
    }

    async function updateLarguraProduct() {
        try {
            const apiClient = setupAPIClient();
            if (larguraCMs === "") {
                toast.error('N??o deixe a largura do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateLargura?product_id=${product_id}`, { larguraCM: larguraCMs });
                toast.success('Largura do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a largura do produto.');
        }
    }

    async function updateProfundidadeProduct() {
        try {
            const apiClient = setupAPIClient();
            if (profundidadeCMs === "") {
                toast.error('N??o deixe o comprimento do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateProfundidade?product_id=${product_id}`, { profundidadeCM: profundidadeCMs });
                toast.success('Comprimento do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o comprimento do produto.');
        }
    }

    async function updateAlturaProduct() {
        try {
            const apiClient = setupAPIClient();
            if (alturaCMs === "") {
                toast.error('N??o deixe a altura do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAltura?product_id=${product_id}`, { alturaCM: alturaCMs });
                toast.success('Altura do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a altura do produto.');
        }
    }

    async function updatePrecoProduct() {
        try {
            const apiClient = setupAPIClient();
            if (precos === "") {
                toast.error('N??o deixe o pre??o do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updatePrice?product_id=${product_id}`, { preco: Number(precos.replace(/[^\d]+/g, '')) });
                toast.success('Pre??o do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o pre??o do produto.');
        }
    }

    async function updatePromocaoProduct() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/productPromocao?product_id=${product_id}`, { promocao: Number(promocoes.replace(/[^\d]+/g, '')) });
            toast.success('Promo????o do produto atualizado com sucesso.');
            refreshProduct();
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a promo????o do produto.');
        }
    }

    function formatPrecoUpdate() {
        var elementoUpdate = document.getElementById('valorupdate');
        /* @ts-ignore */
        var valorupdate = elementoUpdate.value;

        valorupdate = valorupdate + '';
        valorupdate = parseInt(valorupdate.replace(/[\D]+/g, ''));
        valorupdate = valorupdate + '';
        valorupdate = valorupdate.replace(/([0-9]{2})$/g, ",$1");

        if (valorupdate.length > 6) {
            valorupdate = valorupdate.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementoUpdate.value = valorupdate;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorupdate == 'NaN') elementoUpdate.value = '';
    }

    function formatPromocaoUpdate() {
        var elementopromocaoupdate = document.getElementById('valorpromocaoupdate');
        /* @ts-ignore */
        var valorpromocaoupdate = elementopromocaoupdate.value;

        valorpromocaoupdate = valorpromocaoupdate + '';
        valorpromocaoupdate = parseInt(valorpromocaoupdate.replace(/[\D]+/g, ''));
        valorpromocaoupdate = valorpromocaoupdate + '';
        valorpromocaoupdate = valorpromocaoupdate.replace(/([0-9]{2})$/g, ",$1");

        if (valorpromocaoupdate.length > 6) {
            valorpromocaoupdate = valorpromocaoupdate.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementopromocaoupdate.value = valorpromocaoupdate;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorpromocaoupdate == 'NaN') elementopromocaoupdate.value = '';
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
    }, [product_id])

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
        return <RenderOk>Cancelar cadastro<br /> de varia????o</RenderOk>
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

                        <Voltar url={'/produtos'} />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={dataName}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                onClick={ () => handleOpenModalDelete(product_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <MdOutlineAssessment />
                            <Link to={"/produto/avaliacoes/" + nameProduct + '/' + product_id} >
                                <SpanText>Ver avalia????es</SpanText>
                            </Link>
                        </AddButton>

                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Nome"}
                                        dados={
                                            <InputUpdate
                                                dado={dataName}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={nameProduct}
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
                                        chave={"Categoria"}
                                        dados={
                                            <SelectUpdate
                                                dado={categorieName}
                                                value={categorySelected}
                                                /* @ts-ignore */
                                                onChange={handleChangeCategory}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                        ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
                                                    ]
                                                }
                                                handleSubmit={updateCategory}
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
                                                handleSubmit={updateSKUProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Estoque"}
                                        dados={
                                            <InputUpdate
                                                dado={estoques}
                                                type="number"
                                                /* @ts-ignore */
                                                placeholder={estoques}
                                                value={estoques}
                                                /* @ts-ignore */
                                                onChange={(e) => setEstoques(e.target.value)}
                                                handleSubmit={updateEstoqueProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Peso (Kg)"}
                                        dados={
                                            <InputUpdate
                                                dado={pesoKGs}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={pesoKGs}
                                                value={pesoKGs}
                                                /* @ts-ignore */
                                                onChange={(e) => setPesoKGs(e.target.value)}
                                                handleSubmit={updatePesoProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Largura (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={larguraCMs}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={larguraCMs}
                                                value={larguraCMs}
                                                /* @ts-ignore */
                                                onChange={(e) => setLarguraCMs(e.target.value)}
                                                handleSubmit={updateLarguraProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Comprimento (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={profundidadeCMs}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={profundidadeCMs}
                                                value={profundidadeCMs}
                                                /* @ts-ignore */
                                                onChange={(e) => setProfundidadeCMs(e.target.value)}
                                                handleSubmit={updateProfundidadeProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Altura (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={alturaCMs}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={alturaCMs}
                                                value={alturaCMs}
                                                /* @ts-ignore */
                                                onChange={(e) => setAlturaCMs(e.target.value)}
                                                handleSubmit={updateAlturaProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Pre??o"}
                                        dados={
                                            <InputUpdate
                                                id="valorupdate"
                                                /* @ts-ignore */
                                                onKeyUp={formatPrecoUpdate}
                                                maxLength={10}
                                                dado={precos}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={precos}
                                                value={precos}
                                                /* @ts-ignore */
                                                onChange={(e) => setPrecos(e.target.value)}
                                                handleSubmit={updatePrecoProduct}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Valor em Promo????o"}
                                        dados={
                                            <InputUpdate
                                                id="valorpromocaoupdate"
                                                /* @ts-ignore */
                                                onKeyUp={formatPromocaoUpdate}
                                                maxLength={10}
                                                dado={promocoes}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={promocoes}
                                                value={promocoes}
                                                /* @ts-ignore */
                                                onChange={(e) => setPromocoes(e.target.value)}
                                                handleSubmit={updatePromocaoProduct}
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
                            handleSubmit1={updateDescriptions}
                            handleSubmit2={updateDescriptions}
                            handleSubmit3={updateDescriptions}
                            handleSubmit4={updateDescriptions}
                            handleSubmit5={updateDescriptions}
                            handleSubmit6={updateDescriptions}
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

                            <Titulos tipo="h1" titulo="Varia????es" />

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
                                            texto="N??o h?? varia????es cadastradas para esse produto..."
                                        />
                                    )}

                                    {!iDVariacao && variacoes.length >= 1 && (
                                        <Titulos
                                            tipo="h3"
                                            titulo="Cadastre uma varia????o, ou selecione uma varia????o existente para ver os detalhes."
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