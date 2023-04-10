import React, { useContext, useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { Block, BlockTop, Etiqueta } from "../Categorias/styles";
import { InputPost } from "../../components/ui/InputPost";
import { SectionDate } from "../Configuracoes/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { GridDate } from "../Perfil/styles";
import DescriptionsProduct from "../../components/ui/DescriptionsProduct";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import Select from "../../components/ui/Select";


const NovoProduto: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [loja_id] = useState(user.loja_id);
    const [nameProduct, setNameProduct] = useState('');
    const [order] = useState(0);
    const [posicao] = useState("");
    const [descriptionProduct1, setDescriptionProduct1] = useState('');
    const [descriptionProduct2, setDescriptionProduct2] = useState('');
    const [descriptionProduct3, setDescriptionProduct3] = useState('');
    const [descriptionProduct4, setDescriptionProduct4] = useState('');
    const [descriptionProduct5, setDescriptionProduct5] = useState('');
    const [descriptionProduct6, setDescriptionProduct6] = useState('');
    const [preco, setPreco] = useState('');
    const [sku, setSku] = useState('');
    const [promocao, setPromocao] = useState('');

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();

    const [lastID, setLastID] = useState('');
    const [firstId, setFirstId] = useState('');

    const [findFirstProduct, setFindFirstProduct] = useState("");

    const [allRelations, setAllRelations] = useState<any[]>([]);
    const [searchIDs, setSearchIDs] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(1);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const IDnext = searchIDs.map((item) => {
        return item.id
    });

    const IDprev = searchIDs.map((item) => {
        return item.id
    });

    useEffect(() => {
        setLastID([...IDnext].shift());
        setFirstId([...IDprev].pop())
    }, [IDnext, IDprev]);


    useEffect(() => {
        async function allCategorys() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/nextBlockRelationCategory?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearchIDs(data.relationsIDs || []);
                setAllRelations(data.relationsIDs || []);

            } catch (error) {
                console.error(error);
            }
        }
        allCategorys();
    }, [currentPage, limit, total]);

    const [showCategory, setShowCategory] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false);

    const showOrHideCategory = () => {
        setShowCategory(!showCategory);
    }

    const showOrHideNewCategory = () => {
        setShowNewCategory(!showNewCategory);
    }


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    async function loadRelations() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/allRelationsProductCategory?product_id=${findFirstProduct}`);
            setTotal(data.length);
        } catch (error) {
            console.log(error);
        }
    }

    async function loadLastID() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/findFirstRelation?product_id=${findFirstProduct}`);
            setLastID(response.data.id);
        } catch (error) {
            console.log(error);
        }
    }

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

    async function handleRegisterProduct() {
        try {
            if (nameProduct === '' ||
                descriptionProduct1 === '' ||
                preco === null ||
                sku === ''
            ) {
                toast.error('Preencha todos os campos')
                return
            }

            if (loja_id === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar um produto');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createProduct', {
                nameProduct: nameProduct,
                descriptionProduct1: descriptionProduct1,
                descriptionProduct2: descriptionProduct2,
                descriptionProduct3: descriptionProduct3,
                descriptionProduct4: descriptionProduct4,
                descriptionProduct5: descriptionProduct5,
                descriptionProduct6: descriptionProduct6,
                preco: Number(preco.replace(/[^\d]+/g, '')),
                sku: sku,
                order: order,
                posicao: posicao,
                promocao: Number(promocao.replace(/[^\d]+/g, '')),
                loja_id: loja_id
            })

            toast.success('Produto cadastrado com sucesso');

            setNameProduct('');
            setDescriptionProduct1('');
            setDescriptionProduct2('');
            setDescriptionProduct3('');
            setDescriptionProduct4('');
            setDescriptionProduct5('');
            setDescriptionProduct6('');
            setPreco('');
            setSku('');
            setPromocao('');

            setTimeout(() => {
                loadProduct();
                showOrHideCategory();
                toast.warning('Cadastre uma categoria para esse produto, ou escolha uma já cadastrada no sistema para esse produto!');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar produto!');
        }
    }

    async function loadProduct() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstProduct');
            setFindFirstProduct(response.data.id || "");
        } catch (error) {
            console.log(error);
        }
    }

    async function loadIDcategory() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.get('/findFirstCategory');
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                nivel: 1,
                relationId: firstId || ""
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Categoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar categoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNext() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                nivel: 2,
                relationId: firstId
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Subcategoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNew() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                nivel: 1,
                relationId: ""
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Categoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar categoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNextNew() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                nivel: 2,
                relationId: lastID || ""
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Subcategoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria no produto!!!');
            console.log(error);
        }
    }

    function nextBlock() {
        handleRelationsNext();
        setCurrentPage(currentPage + 1);
    }

    function nextBlockNew() {
        handleRelationsNextNew();
        setCurrentPage(currentPage + 1);
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    {showCategory ? (
                        <>
                            <Titulos
                                tipo="h2"
                                titulo="Escolha uma categoria para esse produto"
                            />
                            <br />
                            <br />
                            <Etiqueta>Escolha uma categoria:</Etiqueta>
                            <Select
                                value={categorySelected}
                                /* @ts-ignore */
                                onChange={handleChangeCategory}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                        ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
                                    ]
                                }
                            />
                            <br />
                            <Button
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRelations}
                            >
                                Salvar com essa categoria
                            </Button>

                            {pages.map(() => (
                                <>
                                    <Card>
                                        <Titulos
                                            tipo="h2"
                                            titulo="Escolha uma sub categoria para esse produto"
                                        />
                                        <br />
                                        <br />
                                        <Etiqueta>Escolha uma categoria já existente:</Etiqueta>
                                        <Select
                                            value={categorySelected}
                                            /* @ts-ignore */
                                            onChange={handleChangeCategory}
                                            opcoes={
                                                [
                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                    ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
                                                ]
                                            }
                                        />
                                        <br />
                                        <Button
                                            style={{ backgroundColor: 'orange' }}
                                            onClick={nextBlock}
                                        >
                                            Salvar subcategoria
                                        </Button>
                                    </Card>
                                </>
                            ))}
                        </>
                    ) :
                        <>
                            <Voltar url={'/produtos'} />

                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo="Novo Produto"
                                />
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: 'green' }}
                                    onClick={handleRegisterProduct}
                                >
                                    Salvar
                                </Button>
                            </BlockTop>

                            <GridDate>
                                <SectionDate>
                                    <Block>
                                        <Etiqueta>Nome:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o nome do produto"
                                            value={nameProduct}
                                            onChange={(e) => setNameProduct(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>SKU:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o código do produto"
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                        />
                                    </Block>

                                </SectionDate>

                                <SectionDate>

                                    <Block>
                                        <Etiqueta>Preço:</Etiqueta>
                                        <InputPost
                                            style={{ maxWidth: "310px" }}
                                            maxLength={10}
                                            placeholder="Digite aqui o valor sem pontos e sem virgulas"/* @ts-ignore */
                                            value={preco}/* @ts-ignore */
                                            onChange={(e) => setPreco(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Valor em Promoção:</Etiqueta>
                                        <InputPost
                                            style={{ maxWidth: "310px" }}
                                            maxLength={10}
                                            placeholder="Digite aqui o valor sem pontos e sem virgulas"
                                            value={promocao}/* @ts-ignore */
                                            onChange={(e) => setPromocao(e.target.value)}
                                        />
                                    </Block>

                                </SectionDate>
                            </GridDate>

                            <DivisorHorizontal />

                            <DescriptionsProduct
                                valor1={descriptionProduct1}
                                valor2={descriptionProduct2}
                                valor3={descriptionProduct3}
                                valor4={descriptionProduct4}
                                valor5={descriptionProduct5}
                                valor6={descriptionProduct6}
                                /* @ts-ignore */
                                onChange1={(e) => setDescriptionProduct1(e.target.value)}
                                /* @ts-ignore */
                                onChange2={(e) => setDescriptionProduct2(e.target.value)}
                                /* @ts-ignore */
                                onChange3={(e) => setDescriptionProduct3(e.target.value)}
                                /* @ts-ignore */
                                onChange4={(e) => setDescriptionProduct4(e.target.value)}
                                /* @ts-ignore */
                                onChange5={(e) => setDescriptionProduct5(e.target.value)}
                                /* @ts-ignore */
                                onChange6={(e) => setDescriptionProduct6(e.target.value)}
                                placeholder1="Digite aqui a 1º descrição"
                                placeholder2="Digite aqui a 2º descrição"
                                placeholder3="Digite aqui a 3º descrição"
                                placeholder4="Digite aqui a 4º descrição"
                                placeholder5="Digite aqui a 5º descrição"
                                placeholder6="Digite aqui a 6º descrição"
                            />
                        </>
                    }
                </Card>

                <Card>
                    {showCategory ? (
                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={showOrHideNewCategory}
                        >
                            Cadastrar mais categoria
                        </Button>
                    ) :
                        null
                    }

                    {showNewCategory ? (
                        <>
                            <Titulos
                                tipo="h2"
                                titulo="Escolha uma categoria para esse produto"
                            />
                            <br />
                            <br />
                            <Etiqueta>Escolha uma categoria:</Etiqueta>
                            <Select
                                value={categorySelected}
                                /* @ts-ignore */
                                onChange={handleChangeCategory}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                        ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
                                    ]
                                }
                            />
                            <br />
                            <Button
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRelationsNew}
                            >
                                Salvar com essa categoria
                            </Button>


                            {pages.map(() => (
                                <>
                                    <Card>
                                        <Titulos
                                            tipo="h2"
                                            titulo="Escolha uma sub categoria para esse produto"
                                        />
                                        <br />
                                        <br />
                                        <Etiqueta>Escolha uma categoria já existente:</Etiqueta>
                                        <Select
                                            value={categorySelected}
                                            /* @ts-ignore */
                                            onChange={handleChangeCategory}
                                            opcoes={
                                                [
                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                    ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
                                                ]
                                            }
                                        />
                                        <br />
                                        <Button
                                            style={{ backgroundColor: 'orange' }}
                                            onClick={nextBlockNew}
                                        >
                                            Salvar subcategoria
                                        </Button>
                                    </Card>
                                </>
                            ))}
                        </>
                    ) :
                        null
                    }
                </Card>
            </Container>
        </Grid>
    )
}

export default NovoProduto;