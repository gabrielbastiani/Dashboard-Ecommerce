import React, { useContext, useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { AddButton, Block, BlockTop, Etiqueta, SpanText } from "../Categorias/styles";
import { InputPost, TextAreaPost } from "../../components/ui/InputPost";
import Select from "../../components/ui/Select";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrSubtractCircle } from 'react-icons/gr';
import { SectionDate } from "../Configuracoes/styles";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { GridDate } from "../Perfil/styles";


const NovoProduto: React.FC = () => {

    const { user } = useContext(AuthContext);

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

    const [showElement1, setShowElement1] = useState(false);
    const [showElement2, setShowElement2] = useState(false);
    const [showElement3, setShowElement3] = useState(false);
    const [showElement4, setShowElement4] = useState(false);
    const [showElement5, setShowElement5] = useState(false);
    const [showElementDescriptions, setShowElementDescriptions] = useState(false);


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
                altura === '' ||
                loja_id === ''
            ) {
                toast.error('Preencha todos os campos')
                return
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

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar produto!')
        }
    }

    const showOrHide1 = () => {
        setShowElement1(!showElement1);
    }

    const showOrHide2 = () => {
        setShowElement2(!showElement2);
    }

    const showOrHide3 = () => {
        setShowElement3(!showElement3);
    }

    const showOrHide4 = () => {
        setShowElement4(!showElement4);
    }

    const showOrHide5 = () => {
        setShowElement5(!showElement5);
    }

    const showOrHideDescriptions = () => {
        setShowElementDescriptions(!showElementDescriptions);
    }

    function formatPreco() {
        var elemento = document.getElementById('valor');
        /* @ts-ignore */
        var valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elemento.value = valor;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valor == 'NaN') elemento.value = '';
    }

    function formatPromocao() {
        var elementoPromocao = document.getElementById('valorPromocao');
        /* @ts-ignore */
        var valorPromocao = elementoPromocao.value;

        valorPromocao = valorPromocao + '';
        valorPromocao = parseInt(valorPromocao.replace(/[\D]+/g, ''));
        valorPromocao = valorPromocao + '';
        valorPromocao = valorPromocao.replace(/([0-9]{2})$/g, ",$1");

        if (valorPromocao.length > 6) {
            valorPromocao = valorPromocao.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementoPromocao.value = valorPromocao;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorPromocao == 'NaN') elementoPromocao.value = '';
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
                                <Etiqueta>1° Descrição:</Etiqueta>
                                <TextAreaPost
                                    style={{ resize: "none" }}
                                    placeholder="Digite aqui..."
                                    value={descriptionProduct1}
                                    onChange={(e) => setDescriptionProduct1(e.target.value)}
                                >
                                </TextAreaPost>
                            </Block>

                            {showElementDescriptions ?
                                <>
                                    <AddButton
                                        style={{ backgroundColor: 'red' }}
                                    >
                                        <AiOutlinePlusCircle />
                                        <SpanText onClick={showOrHideDescriptions}>Fechar descrições extras</SpanText>
                                    </AddButton>

                                    {showElement1 ?
                                        <Block>
                                            <AddButton
                                                style={{ backgroundColor: 'red' }}
                                            >
                                                <GrSubtractCircle />
                                                <SpanText onClick={showOrHide1}>Fechar a opção de segunda descrição</SpanText>
                                            </AddButton>
                                            <Etiqueta>2° Descrição:</Etiqueta>
                                            <TextAreaPost
                                                style={{ resize: "none", width: "120%" }}
                                                placeholder="Digite aqui..."
                                                value={descriptionProduct2}
                                                onChange={(e) => setDescriptionProduct2(e.target.value)}
                                            >
                                            </TextAreaPost>
                                        </Block>
                                        :
                                        <AddButton
                                            style={{ backgroundColor: '#f6ba24' }}
                                        >
                                            <AiOutlinePlusCircle />
                                            <SpanText onClick={showOrHide1}>Adicionar segunda descrição...</SpanText>
                                        </AddButton>
                                    }

                                    {showElement2 ?
                                        <Block>
                                            <AddButton
                                                style={{ backgroundColor: 'red' }}
                                            >
                                                <GrSubtractCircle />
                                                <SpanText onClick={showOrHide2}>Fechar a opção de terceira descrição</SpanText>
                                            </AddButton>
                                            <Etiqueta>3° Descrição:</Etiqueta>
                                            <TextAreaPost
                                                style={{ resize: "none", width: "120%" }}
                                                placeholder="Digite aqui..."
                                                value={descriptionProduct3}
                                                onChange={(e) => setDescriptionProduct3(e.target.value)}
                                            >
                                            </TextAreaPost>
                                        </Block>
                                        :
                                        <AddButton
                                            style={{ backgroundColor: '#f6ba24' }}
                                        >
                                            <AiOutlinePlusCircle />
                                            <SpanText onClick={showOrHide2}>Adicionar terceira descrição...</SpanText>
                                        </AddButton>
                                    }

                                    {showElement3 ?
                                        <Block>
                                            <AddButton
                                                style={{ backgroundColor: 'red' }}
                                            >
                                                <GrSubtractCircle />
                                                <SpanText onClick={showOrHide3}>Fechar a opção de quarta descrição</SpanText>
                                            </AddButton>
                                            <Etiqueta>4° Descrição:</Etiqueta>
                                            <TextAreaPost
                                                style={{ resize: "none", width: "120%" }}
                                                placeholder="Digite aqui..."
                                                value={descriptionProduct4}
                                                onChange={(e) => setDescriptionProduct4(e.target.value)}
                                            >
                                            </TextAreaPost>
                                        </Block>
                                        :
                                        <AddButton
                                            style={{ backgroundColor: '#f6ba24' }}
                                        >
                                            <AiOutlinePlusCircle />
                                            <SpanText onClick={showOrHide3}>Adicionar quarta descrição...</SpanText>
                                        </AddButton>
                                    }

                                    {showElement4 ?
                                        <Block>
                                            <AddButton
                                                style={{ backgroundColor: 'red' }}
                                            >
                                                <GrSubtractCircle />
                                                <SpanText onClick={showOrHide4}>Fechar a opção de quinta descrição</SpanText>
                                            </AddButton>
                                            <Etiqueta>5° Descrição:</Etiqueta>
                                            <TextAreaPost
                                                style={{ resize: "none", width: "120%" }}
                                                placeholder="Digite aqui..."
                                                value={descriptionProduct5}
                                                onChange={(e) => setDescriptionProduct5(e.target.value)}
                                            >
                                            </TextAreaPost>
                                        </Block>
                                        :
                                        <AddButton
                                            style={{ backgroundColor: '#f6ba24' }}
                                        >
                                            <AiOutlinePlusCircle />
                                            <SpanText onClick={showOrHide4}>Adicionar quinta descrição...</SpanText>
                                        </AddButton>
                                    }

                                    {showElement5 ?
                                        <Block>
                                            <AddButton
                                                style={{ backgroundColor: 'red' }}
                                            >
                                                <GrSubtractCircle />
                                                <SpanText onClick={showOrHide5}>Fechar a opção de sexta descrição</SpanText>
                                            </AddButton>
                                            <Etiqueta>6° Descrição:</Etiqueta>
                                            <TextAreaPost
                                                style={{ resize: "none", width: "120%" }}
                                                placeholder="Digite aqui..."
                                                value={descriptionProduct6}
                                                onChange={(e) => setDescriptionProduct6(e.target.value)}
                                            >
                                            </TextAreaPost>
                                        </Block>
                                        :
                                        <AddButton
                                            style={{ backgroundColor: '#f6ba24' }}
                                        >
                                            <AiOutlinePlusCircle />
                                            <SpanText onClick={showOrHide5}>Adicionar sexta descrição...</SpanText>
                                        </AddButton>
                                    }
                                </>
                                :
                                <AddButton>
                                    <AiOutlinePlusCircle />
                                    <SpanText onClick={showOrHideDescriptions}>Inserir descrições extras</SpanText>
                                </AddButton>
                            }

                        </SectionDate>

                        <SectionDate>
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
                                <Etiqueta>Peso (Grama):</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="Peso em Gramas"
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                />
                            </Block>

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
                                    style={{ maxWidth: "170px" }}
                                    id="valor"
                                    type="text"
                                    /* @ts-ignore */
                                    onKeyUp={formatPreco}
                                    maxLength={10}
                                    placeholder="R$00.000,00"
                                    value={preco}/* @ts-ignore */
                                    onChange={(e) => setPreco(e.target.value)}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Valor em Promoção:</Etiqueta>
                                <InputPost
                                    style={{ maxWidth: "170px" }}
                                    id="valorPromocao"
                                    type="text"
                                    /* @ts-ignore */
                                    onKeyUp={formatPromocao}
                                    maxLength={10}
                                    placeholder="R$00.000,00"
                                    value={promocao}/* @ts-ignore */
                                    onChange={(e) => setPromocao(e.target.value)}
                                />
                            </Block>

                        </SectionDate>
                    </GridDate>
                </Card>
            </Container>
        </Grid>
    )
}

export default NovoProduto;