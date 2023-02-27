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
import DescriptionsProductUpdateMobile from "../../../components/ui/DescriptionsProductUpdateMobile";
import { BlockMobile } from "../styles";


const Produto: React.FC = () => {

    let { nameProduct, product_id } = useParams();

    const navigate = useNavigate();

    const [nameProducts, setNameProducts] = useState(nameProduct);
    const [dataName, setDataName] = useState('');

    const [descriptionProducts1, setDescriptionProducts1] = useState('');
    const [dataDescriptionProducts1, setDataDescriptionProducts1] = useState('');

    const [descriptionProducts2, setDescriptionProducts2] = useState('');
    const [dataDescriptionProducts2, setDataDescriptionProducts2] = useState('');

    const [descriptionProducts3, setDescriptionProducts3] = useState('');
    const [dataDescriptionProducts3, setDataDescriptionProducts3] = useState('');

    const [descriptionProducts4, setDescriptionProducts4] = useState('');
    const [dataDescriptionProducts4, setDataDescriptionProducts4] = useState('');

    const [descriptionProducts5, setDescriptionProducts5] = useState('');
    const [dataDescriptionProducts5, setDataDescriptionProducts5] = useState('');

    const [descriptionProducts6, setDescriptionProducts6] = useState('');
    const [dataDescriptionProducts6, setDataDescriptionProducts6] = useState('');

    const [precos, setPrecos] = useState('');
    const [dataPrecos, setDataPrecos] = useState('');

    const [skus, setSkus] = useState('');
    const [dataSkus, setDataSkus] = useState('');

    const [estoques, setEstoques] = useState('');
    const [dataEstoques, setDataEstoques] = useState('');

    const [pesoKGs, setPesoKGs] = useState('');
    const [dataPesoKGs, setDataPesoKGs] = useState('');

    const [larguraCMs, setLarguraCMs] = useState('');
    const [dataLarguraCMs, setDataLarguraCMs] = useState('');

    const [alturaCMs, setAlturaCMs] = useState('');
    const [dataAlturaCMs, setDataAlturaCMs] = useState('');

    const [profundidadeCMs, setProfundidadeCMs] = useState('');
    const [dataProfundidadeCMs, setDataProfundidadeCMs] = useState('');

    const [promocoes, setPromocoes] = useState('');
    const [dataPromocoes, setDataPromocoes] = useState('');

    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState();
    const [categoryID, setCategoryID] = useState('');
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
                    disponibilidade,
                    category_id
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
                setCategoryID(category_id);
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
        setDataDescriptionProducts1(response?.data?.descriptionProduct1);
        setDataDescriptionProducts2(response?.data?.descriptionProduct2);
        setDataDescriptionProducts3(response?.data?.descriptionProduct3);
        setDataDescriptionProducts4(response?.data?.descriptionProduct4);
        setDataDescriptionProducts5(response?.data?.descriptionProduct5);
        setDataDescriptionProducts6(response?.data?.descriptionProduct6);
        setDataPrecos(response?.data?.preco);
        setDataSkus(response?.data?.sku);
        setDataEstoques(response?.data?.estoque);
        setDataPesoKGs(response?.data?.pesoKG);
        setDataLarguraCMs(response?.data?.larguraCM);
        setDataAlturaCMs(response?.data?.alturaCM);
        setDataProfundidadeCMs(response?.data?.profundidadeCM);
        setDataPromocoes(response?.data?.promocao);
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
                    
                    <BlockMobile>
                        <DescriptionsProductUpdateMobile
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
                            handleSubmit1={ updateDescriptions }
                            handleSubmit2={ updateDescriptions }
                            handleSubmit3={ updateDescriptions }
                            handleSubmit4={ updateDescriptions }
                            handleSubmit5={ updateDescriptions }
                            handleSubmit6={ updateDescriptions }
                        />
                    </BlockMobile>
                    

                </Card>
            </Container>
        </Grid>
    )
}

export default Produto;