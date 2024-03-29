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
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { ModalImageVideo } from "../../components/popups/ModalImageVideo";
import Warnings from "../../components/Warnings";


const NovoProduto: React.FC = () => {

    const navigate = useNavigate();
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

    const [modalItem, setModalItem] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


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
                weight: peso,
                width: width,
                height: height,
                depth: depth,
                urlVideo: urlVideo,
                price: Number(numberPrice),
                promotion: Number(numberPromotion),
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

            setTimeout(() => {
                navigate('/produtos')
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar produto!');
        }

    }

    function handleCloseModalImageVideo() {
        setModalVisible(false);
    }

    async function handleOpenModalImageVideo() {
        setModalItem(urlVideo);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
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
                                    <Etiqueta>Peso (Kg):</Etiqueta>
                                    <InputPost
                                        maxLength={7}
                                        type="text"
                                        placeholder="Digite o peso do produto"
                                        value={peso}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Largura (Cm):</Etiqueta>
                                    <InputPost
                                        type="text"
                                        maxLength={2}
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
                                        maxLength={2}
                                        placeholder="Digite a altura do produto"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Comprimento (Cm):</Etiqueta>
                                    <InputPost
                                        type="text"
                                        maxLength={2}
                                        placeholder="Digite o comprimento do produto"
                                        value={depth}
                                        onChange={(e) => setDepth(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Link video apresentação:</Etiqueta>
                                    <Button
                                        style={{ padding: '5px', fontSize: '10px', marginBottom: '10px' }}
                                        onClick={handleOpenModalImageVideo}
                                    >
                                        ATENÇÃO CLIQUE AQUI ANTES DE INSERIR O LINK
                                    </Button>
                                    <InputPost
                                        type="text"
                                        placeholder="Ex: https://xxx.xxxxx.xxx/watch?v=mxFtJIFMhGE"
                                        value={urlVideo}
                                        onChange={(e) => setUrlVideo(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Preço:</Etiqueta>
                                    <InputPost
                                        style={{ maxWidth: "310px" }}
                                        maxLength={9}
                                        placeholder="Digite aqui..."
                                        value={priceFormated}/* @ts-ignore */
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Valor em Promoção:</Etiqueta>
                                    <InputPost
                                        style={{ maxWidth: "310px" }}
                                        maxLength={9}
                                        placeholder="Digite aqui..."
                                        value={promotionFormated}/* @ts-ignore */
                                        onChange={(e) => setPromotion(e.target.value)}
                                    />
                                </Block>

                            </SectionDate>
                        </GridDate>
                    </Card>
                </>
            </Container>
            {modalVisible && (
                <ModalImageVideo
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalImageVideo}
                    video={modalItem}
                />
            )}
        </Grid>
    )
}

export default NovoProduto;