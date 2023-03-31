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
import Select from "../../components/ui/Select";
import { SectionDate } from "../Configuracoes/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { GridDate } from "../Perfil/styles";
import DescriptionsProduct from "../../components/ui/DescriptionsProduct";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import { useNavigate } from "react-router-dom";


const NovoProduto: React.FC = () => {

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loja_id, setLoja_id] = useState(user.loja_id);
    const [nameProduct, setNameProduct] = useState('');
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState();
    const [descriptionProduct1, setDescriptionProduct1] = useState('');
    const [descriptionProduct2, setDescriptionProduct2] = useState('');
    const [descriptionProduct3, setDescriptionProduct3] = useState('');
    const [descriptionProduct4, setDescriptionProduct4] = useState('');
    const [descriptionProduct5, setDescriptionProduct5] = useState('');
    const [descriptionProduct6, setDescriptionProduct6] = useState('');
    const [preco, setPreco] = useState('');
    const [sku, setSku] = useState('');
    const [estoque, setEstoque] = useState(Number);
    const [peso, setPeso] = useState('');
    const [largura, setLargura] = useState('');
    const [profundidade, setProfundidade] = useState('');
    const [altura, setAltura] = useState('');
    const [promocao, setPromocao] = useState('');


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

    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    async function handleRegisterProduct() {
        try {
            if (nameProduct === '' ||
                descriptionProduct1 === '' ||
                preco === null ||
                sku === '' ||
                estoque === null ||
                peso === '' ||
                largura === '' ||
                profundidade === '' ||
                altura === '' 
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
                category_id: categorySelected,
                nameProduct: nameProduct.replace(/[/]/g, "-"),
                descriptionProduct1: descriptionProduct1,
                descriptionProduct2: descriptionProduct2,
                descriptionProduct3: descriptionProduct3,
                descriptionProduct4: descriptionProduct4,
                descriptionProduct5: descriptionProduct5,
                descriptionProduct6: descriptionProduct6,
                preco: Number(preco.replace(/[^\d]+/g, '')),
                sku: sku,
                estoque: Number(estoque),
                pesoKG: peso,
                larguraCM: largura,
                profundidadeCM: profundidade,
                alturaCM: altura,
                promocao: Number(promocao.replace(/[^\d]+/g, '')),
                loja_id: loja_id
            })

            toast.success('Produto cadastrado com sucesso')

            setNameProduct('');
            setDescriptionProduct1('');
            setDescriptionProduct2('');
            setDescriptionProduct3('');
            setDescriptionProduct4('');
            setDescriptionProduct5('');
            setDescriptionProduct6('');
            setPreco('');
            setSku('');
            setEstoque(0);
            setPeso('');
            setLargura('');
            setProfundidade('');
            setAltura('');
            setPromocao('');

            navigate('/produtos');

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar produto!')
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
                            <br />
                            <Etiqueta>Categoria:</Etiqueta>
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

                            <Block>
                                <Etiqueta>Estoque:</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="Estoque do produto"
                                    value={estoque}/* @ts-ignore */
                                    onChange={(e) => setEstoque(e.target.value)}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Peso (Kg):</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="Peso em Kg"
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                />
                            </Block>

                        </SectionDate>

                        <SectionDate>
                            <Block>
                                <Etiqueta>Largura (Cm):</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="Largura em CM"
                                    value={largura}
                                    onChange={(e) => setLargura(e.target.value)}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Comprimento (Cm):</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="Comprimento em CM"
                                    value={profundidade}
                                    onChange={(e) => setProfundidade(e.target.value)}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Altura (Cm):</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="Altura em CM"
                                    value={altura}
                                    onChange={(e) => setAltura(e.target.value)}
                                />
                            </Block>

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

                </Card>
            </Container>
        </Grid>
    )
}

export default NovoProduto;