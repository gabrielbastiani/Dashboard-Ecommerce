import { useContext, useState } from "react";
import { GridDateForm, SectionDate } from "../../Configuracoes/styles";
import { Block, BlockTop, Etiqueta } from "../../Categorias/styles";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import Titulos from "../../../components/Titulos";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import DescriptionsProduct from "../../../components/ui/DescriptionsProduct";
import { useNavigate } from "react-router-dom";


interface VariacaoRequest {
    product_id: string;
}

const NovaVariacao = ({ product_id }: VariacaoRequest) => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [loja_id] = useState(user.loja_id);
    const [product_ids] = useState(product_id);
    const [nameVariacao, setNameVariacao] = useState('');
    const [descriptionVariacao1, setDescriptionVariacao1] = useState('');
    const [descriptionVariacao2, setDescriptionVariacao2] = useState('');
    const [descriptionVariacao3, setDescriptionVariacao3] = useState('');
    const [descriptionVariacao4, setDescriptionVariacao4] = useState('');
    const [descriptionVariacao5, setDescriptionVariacao5] = useState('');
    const [descriptionVariacao6, setDescriptionVariacao6] = useState('');
    const [preco, setPreco] = useState('');
    const [skuVariacao, setSkuVariacao] = useState('');
    const [estoqueVariacao, setEstoqueVariacao] = useState(Number);
    const [pesoKg, setPesoKg] = useState('');
    const [larguraCm, setLarguraCm] = useState('');
    const [profundidadeCm, setProfundidadeCm] = useState('');
    const [alturaCm, setAlturaCm] = useState('');
    const [promocao, setPromocao] = useState('');


    async function handleRegisterVariacao() {
        try {
            if (nameVariacao === '' ||
                descriptionVariacao1 === '' ||
                preco === null ||
                skuVariacao === '' ||
                estoqueVariacao === null ||
                pesoKg === '' ||
                larguraCm === '' ||
                profundidadeCm === '' ||
                alturaCm === '' ||
                loja_id === '' ||
                product_ids === ''
            ) {
                toast.error('Preencha todos os campos')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/variacao', {
                nameVariacao: nameVariacao.replace(/[/]/g, "-"),
                descriptionVariacao1: descriptionVariacao1,
                descriptionVariacao2: descriptionVariacao2,
                descriptionVariacao3: descriptionVariacao3,
                descriptionVariacao4: descriptionVariacao4,
                descriptionVariacao5: descriptionVariacao5,
                descriptionVariacao6: descriptionVariacao6,
                preco: Number(preco.replace(/[^\d]+/g, '')),
                skuVariacao: skuVariacao,
                estoqueVariacao: Number(estoqueVariacao),
                pesoKg: pesoKg,
                larguraCm: larguraCm,
                profundidadeCm: profundidadeCm,
                alturaCm: alturaCm,
                promocao: Number(promocao.replace(/[^\d]+/g, '')),
                loja_id: loja_id,
                product_id: product_ids
            })

            toast.success('Variação cadastrada com sucesso')

            setNameVariacao('');
            setDescriptionVariacao1('');
            setDescriptionVariacao2('');
            setDescriptionVariacao3('');
            setDescriptionVariacao4('');
            setDescriptionVariacao5('');
            setDescriptionVariacao6('');
            setPreco('');
            setSkuVariacao('');
            setEstoqueVariacao(0);
            setPesoKg('');
            setLarguraCm('');
            setProfundidadeCm('');
            setAlturaCm('');
            setPromocao('');

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar a variação!')
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }
    

    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Nova Variação"
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: 'green' }}
                    onClick={handleRegisterVariacao}
                >
                    Salvar
                </Button>
            </BlockTop>

            <GridDateForm>
                <SectionDate>
                    <Block>
                        <Etiqueta>SKU:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o código da variação..."
                            value={skuVariacao}
                            onChange={(e) => setSkuVariacao(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Nome:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o nome da variação..."
                            value={nameVariacao}
                            onChange={(e) => setNameVariacao(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Estoque:</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Estoque do produto"
                            value={estoqueVariacao}/* @ts-ignore */
                            onChange={(e) => setEstoqueVariacao(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Peso (Kg):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Peso em Kg"
                            value={pesoKg}
                            onChange={(e) => setPesoKg(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Largura (Cm):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Largura em CM"
                            value={larguraCm}
                            onChange={(e) => setLarguraCm(e.target.value)}
                        />
                    </Block>
                </SectionDate>

                <SectionDate>
                    <Block>
                        <Etiqueta>Comprimento (Cm):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Comprimento em CM"
                            value={profundidadeCm}
                            onChange={(e) => setProfundidadeCm(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Altura (Cm):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Altura em CM"
                            value={alturaCm}
                            onChange={(e) => setAlturaCm(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Preço:</Etiqueta>
                        <InputPost
                            style={{ maxWidth: "310px" }}
                            maxLength={10}
                            placeholder="Digite aqui o valor sem pontos e sem virgulas"
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
            </GridDateForm>
            <br />
            <DescriptionsProduct
                valor1={descriptionVariacao1}
                valor2={descriptionVariacao2}
                valor3={descriptionVariacao3}
                valor4={descriptionVariacao4}
                valor5={descriptionVariacao5}
                valor6={descriptionVariacao6}
                /* @ts-ignore */
                onChange1={(e) => setDescriptionVariacao1(e.target.value)}
                /* @ts-ignore */
                onChange2={(e) => setDescriptionVariacao2(e.target.value)}
                /* @ts-ignore */
                onChange3={(e) => setDescriptionVariacao3(e.target.value)}
                /* @ts-ignore */
                onChange4={(e) => setDescriptionVariacao4(e.target.value)}
                /* @ts-ignore */
                onChange5={(e) => setDescriptionVariacao5(e.target.value)}
                /* @ts-ignore */
                onChange6={(e) => setDescriptionVariacao6(e.target.value)}
                placeholder1="Digite aqui a 1º descrição"
                placeholder2="Digite aqui a 2º descrição"
                placeholder3="Digite aqui a 3º descrição"
                placeholder4="Digite aqui a 4º descrição"
                placeholder5="Digite aqui a 5º descrição"
                placeholder6="Digite aqui a 6º descrição"
            />
        </>
    )
}

export default NovaVariacao;