import React, { useContext, useState } from "react";
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


const NovoProduto: React.FC = () => {

    const { admin } = useContext(AuthContext);

    const [store_id] = useState(admin.store_id);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [sku, setSku] = useState('');
    const [promotion, setPromotion] = useState('');
    const [stock, setStock] = useState();
    const [weight, setWeight] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
    const [urlVideo, setUrlVideo] = useState('');

    async function handleRegisterProduct() {
        try {
            if (name === '' ||
                price === null ||
                sku === ''
            ) {
                toast.error('Preencha todos os campos')
                return
            }

            if (store_id === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar um produto');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createProduct', {
                name: name,
                sku: sku,
                stock: Number(stock),
                weight: weight,
                width: width,
                height: height,
                depth: depth,
                urlVideo: urlVideo,
                price: Number(price.replace(/[^\d]+/g, '')),
                promotion: Number(promotion.replace(/[^\d]+/g, '')),
                store_id: store_id
            });

            toast.success('Produto cadastrado com sucesso');

            setName('');
            setPrice('');
            setSku('');
            setPromotion('');
            setDepth('');
            setHeight('');
            setUrlVideo('');

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar produto!');
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <>
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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

                                <Block>
                                    <Etiqueta>Estoque:</Etiqueta>
                                    <InputPost
                                        type="number"
                                        placeholder="Digite o estoque do produto"
                                        value={stock}/* @ts-ignore */
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Peso:</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite o peso do produto"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Largura (Cm):</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite a largura do produto"
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                    />
                                </Block>

                            </SectionDate>

                            <SectionDate>

                                <Block>
                                    <Etiqueta>Altura (Cm):</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite a altura do produto"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Comprimento (Cm):</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Digite o comprimento do produto"
                                        value={depth}
                                        onChange={(e) => setDepth(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Link video apresentação:</Etiqueta>
                                    <InputPost
                                        type="text"
                                        placeholder="Ex: https://www.video.com.br"
                                        value={urlVideo}
                                        onChange={(e) => setUrlVideo(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Preço:</Etiqueta>
                                    <InputPost
                                        style={{ maxWidth: "310px" }}
                                        maxLength={10}
                                        placeholder="Digite aqui o valor sem pontos e sem virgulas"/* @ts-ignore */
                                        value={price}/* @ts-ignore */
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Valor em Promoção:</Etiqueta>
                                    <InputPost
                                        style={{ maxWidth: "310px" }}
                                        maxLength={10}
                                        placeholder="Digite aqui o valor sem pontos e sem virgulas"
                                        value={promotion}/* @ts-ignore */
                                        onChange={(e) => setPromotion(e.target.value)}
                                    />
                                </Block>

                            </SectionDate>
                        </GridDate>
                    </Card>
                </>
            </Container>
        </Grid>
    )
}

export default NovoProduto;