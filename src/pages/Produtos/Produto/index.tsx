import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
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
import { ContainerVariacao, ButtonVariacao } from "../styles";
import NovaVariacao from "../Variacao/novaVariacao";


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

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allCategorys');
                setCategories(response.data);
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

    async function deleteProduct() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete(`/deleteProduct?product_id=${product_id}`);
            toast.success(`Produto deletado com sucesso.`);
            refreshProduct();
            navigate('/produtos');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao deletar o produto.');
        }
    }

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
                toast.error('Não deixe o nome do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameProduct?product_id=${product_id}`, { nameProduct: nameProducts || dataName });
                toast.success('Nome da categoria atualizada com sucesso.');
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
                toast.error(`Selecione uma nova categoria, ou cancele a atualização apertando no botão vermelho!`);
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
            toast.success('Descrição atualizada com sucesso.');
            refreshProduct();
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descrição.');
        }
    }

    async function updateSKUProduct() {
        try {
            const apiClient = setupAPIClient();
            if (skus === '') {
                toast.error('Não deixe o código do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateSKU?product_id=${product_id}`, { sku: skus });
                toast.success('Código do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o código do produto.');
        }
    }

    async function updateEstoqueProduct() {
        try {
            const apiClient = setupAPIClient();
            if (Number(estoques) < 0) {
                toast.error('Não deixe o estoque do produto negativo... minimo de 0.');
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
                toast.error('Não deixe o peso do produto em branco!!!');
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
                toast.error('Não deixe a largura do produto em branco!!!');
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
                toast.error('Não deixe o comprimento do produto em branco!!!');
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
                toast.error('Não deixe a altura do produto em branco!!!');
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
                toast.error('Não deixe o preço do produto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updatePrice?product_id=${product_id}`, { preco: Number(precos.replace(/[^\d]+/g, '')) });
                toast.success('Preço do produto atualizado com sucesso.');
                refreshProduct();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o preço do produto.');
        }
    }

    async function updatePromocaoProduct() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/productPromocao?product_id=${product_id}`, { promocao: Number(promocoes.replace(/[^\d]+/g, '')) });
            toast.success('Promoção do produto atualizado com sucesso.');
            refreshProduct();
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a promoção do produto.');
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

    return (
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
                            style={{ backgroundColor: '#FB451E' }}
                            onClick={deleteProduct}
                        >
                            Remover
                        </Button>
                    </BlockTop>

                    <AddButton
                        style={{ backgroundColor: '#f6ba24' }}
                    >
                        <MdOutlineAssessment />
                        <Link to="/produto/avaliacao" >
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
                                    chave={"Preço"}
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
                                    chave={"Valor em Promoção"}
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
                    <Card style={{ width: '305px', textAlign: 'center' }} >
                        <Titulos tipo="h1" titulo="Variações" />

                        <ButtonVariacao
                            onClick={() => alert('Clicou')}
                        >
                            + Nova
                        </ButtonVariacao>
                    </Card>

                    <Card style={{ width: '100%' }}>
                        <NovaVariacao />
                    </Card>
                </ContainerVariacao>

            </Container>
        </Grid>
    )
}

export default Produto;