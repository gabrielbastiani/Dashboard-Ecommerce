import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { Button } from "../../../components/ui/Button";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { Grid } from "../../Dashboard/styles";
import { GridDate } from "../../Perfil/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import moment from "moment";
import Modal from 'react-modal';
import { TextArea } from "../../../components/ui/Input";
import { ModalDeleteCupom } from "../../../components/popups/ModalDeleteCupom";
import { Avisos } from "../../../components/Avisos";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { TextContent } from "../styles";
import { BsTrash } from "react-icons/bs";
import { ModalDeleteCupomProduct } from "../../../components/popups/ModalDeleteCupomProduct";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";


export type DeleteProductCupon = {
    id: string;
}

const Cupom: React.FC = () => {

    const navigate = useNavigate();
    let { cupon_id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [amountCoupon, setAmountCoupon] = useState(Number);
    const [productSelected, setProductSelected] = useState();
    const [product, setProduct] = useState<any[]>([]);
    const [active, setActive] = useState("");

    const [conditionalSelected, setConditionalSelected] = useState();

    function handleChangeConditional(e: any) {
        setConditionalSelected(e.target.value);
    }

    const [value, setValue] = useState(Number);

    const [productInCupon, setProductInCupon] = useState<any[]>([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleProduct, setModalVisibleProduct] = useState(false);
    const [modalItem, setModalItem] = useState("");


    useEffect(() => {
        async function loadProductsInCupoms() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/allProductsInCoupom?cupon_id=${cupon_id}`);
                setProductInCupon(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadProductsInCupoms();
    }, [cupon_id]);

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allProductsStore');
                setProduct(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadProducts();
    }, []);

    function handleChangeProduct(e: any) {
        setProductSelected(e.target.value);
    }

    useEffect(() => {
        async function loadCupom() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findUniqueCoupom?cupon_id=${cupon_id}`);

                setName(data.name || "");
                setDescription(data.description || "");
                setCode(data.code || "");
                setAmountCoupon(data.amountCoupon);
                setStartDate(data.startDate || "");
                setEndDate(data.endDate || "");
                setActive(data.active || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCupom();
    }, [cupon_id]);

    async function cuponProgramedActiveAndDesactive() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.get(`/activeDesactiveCuponProgramed?cupon_id=${cupon_id}`);
            toast.success('Datas atualizadas com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a data.');
        }
    }

    async function updateDatasCupon() {
        try {
            const apiClient = setupAPIClient();
            if (name === "") {
                toast.error('Não deixe o nome do cupom em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAllDataCupon?cupon_id=${cupon_id}`,
                    {
                        name: name,
                        description: description,
                        code: code,
                        startDate: startDate,
                        endDate: endDate,
                        amountCoupon: Number(amountCoupon),
                        active: active
                    });
                toast.success('Dado do cupom atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o dado do cupom.');
        }
    }

    async function updateProducts(id: string) {
        try {
            if (productSelected === "") {
                toast.error(`Selecione um produto, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateProductCoupom?cuponProduct_id=${id}`, { product_id: productSelected });
            toast.success('Produto atualizado com sucesso.');
            setTimeout(() => {
                navigate(0);
            }, 3000);
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o produto.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/statusCoupom?cupon_id=${cupon_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade do cupon.');
        }

        if (active === "Nao") {
            toast.success(`O cupon se encontra disponivel.`);
            return;
        }

        if (active === "Sim") {
            toast.error(`O cupon se encontra indisponivel.`);
            return;
        }
    }

    async function handleRegisterProductInCupom() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/createProductCoupon`, {
                cupon_id: cupon_id,
                product_id: productSelected
            });

            toast.success('Produto cadastrado no cupom com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o produto no cupom.');
        }

    }

    async function handleRegisterConditionalCoupon() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post(`/createConditionalCoupon`, {
                cupon_id: cupon_id,
                conditional: conditionalSelected,
                value: value
            });

            toast.success(`Valor salvo com sucesso.`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o valor no cupom.');
        }

    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
        if (productInCupon.length >= 1) {
            toast.error("Delete todos produtos vinculados a esse cupom antes, para poder deletar o cupom!!!");
            return;
        }
        setModalVisible(true);
    }

    function handleCloseModalDeleteProduct() {
        setModalVisibleProduct(false);
    }

    async function handleOpenModalDeleteProductCupom(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueProductCoupon', {
            params: {
                cuponProduct_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisibleProduct(true);
    }

    Modal.setAppElement('body');



    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>

                        <Voltar url='/coupoms' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Cupom"
                            />
                            <Button
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={handleOpenModalDelete}
                            >
                                Remover
                            </Button>
                        </BlockTop>
                        <br />
                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Nome do Cupom"}
                                        dados={
                                            <InputUpdate
                                                dado={name}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={name}
                                                value={name}
                                                /* @ts-ignore */
                                                onChange={(e) => setName(e.target.value)}
                                                handleSubmit={updateDatasCupon}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Código do Cupom"}
                                        dados={
                                            <InputUpdate
                                                dado={code}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={code}
                                                value={code}
                                                /* @ts-ignore */
                                                onChange={(e) => setCode(e.target.value)}
                                                handleSubmit={updateDatasCupon}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Quantidade de Cupons"}
                                        dados={
                                            <InputUpdate
                                                dado={amountCoupon}
                                                type="number"
                                                /* @ts-ignore */
                                                placeholder={amountCoupon}
                                                value={amountCoupon}
                                                /* @ts-ignore */
                                                onChange={(e) => setAmountCoupon(e.target.value)}
                                                handleSubmit={updateDatasCupon}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Cupom ativado?"}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={active}
                                                handleSubmit={updateStatus}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <Block>
                                    <Etiqueta>Descrição do Cupom:</Etiqueta>
                                    <TextArea
                                        style={{ height: '250px', padding: '15px' }}
                                        placeholder="Digite aqui..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <br />
                                    <Button
                                        onClick={updateDatasCupon}
                                    >
                                        Atualizar Descrição
                                    </Button>
                                </Block>
                            </SectionDate>

                            <SectionDate>
                                <Block>
                                    <Etiqueta>Vincule esse cupom algun(s) produto(s) se desejar:</Etiqueta>
                                    <Select
                                        value={productSelected}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                ...(product || []).map((item) => ({ label: item.name, value: item.id }))
                                            ]
                                        }/* @ts-ignore */
                                        onChange={handleChangeProduct}
                                    />
                                    <Button
                                        onClick={handleRegisterProductInCupom}
                                    >
                                        Salvar Produto no Cupom
                                    </Button>
                                </Block>
                                <br />
                                <Etiqueta
                                    style={{ color: 'red', fontSize: '15px' }}
                                >
                                    PROGRAME A DATA DESSE CUPOM ABAIXO SE DESEJAR<br />
                                    (OBS: NÃO ATIVE O CUPOM NO CHECKBOX ACIMA PARA PODER<br />
                                    PROGRAMAR ABAIXO), MAS CASO QUEIRA ATIVAR O CUPOM NA LOJA SEM PROGRAMAÇÃO, ATIVE O CHECKBOX ACIMA E SALVE NORMALMENTE.
                                </Etiqueta>
                                <br />
                                <br />
                                <BlockDados>
                                    <TextoDados
                                        chave={"Data de início"}
                                        dados={
                                            <InputUpdate
                                                dado={startDate ? moment(startDate).format('DD/MM/YYYY - HH:mm') : "Sem Programação"}
                                                type="datetime-local"
                                                /* @ts-ignore */
                                                placeholder={startDate}
                                                value={startDate}
                                                /* @ts-ignore */
                                                onChange={(e) => setStartDate(e.target.value)}
                                                handleSubmit={updateDatasCupon}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Data do fim"}
                                        dados={
                                            <InputUpdate
                                                dado={endDate ? moment(endDate).format('DD/MM/YYYY - HH:mm') : "Sem Programação"}
                                                type="datetime-local"
                                                /* @ts-ignore */
                                                placeholder={endDate}
                                                value={endDate}
                                                /* @ts-ignore */
                                                onChange={(e) => setEndDate(e.target.value)}
                                                handleSubmit={updateDatasCupon}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <Button
                                    onClick={cuponProgramedActiveAndDesactive}
                                >
                                    Ativar programação
                                </Button>
                                <br />
                                <br />
                                <Block>
                                    <Etiqueta>Defina a condicional para esse cupom/promoção:</Etiqueta>
                                    <Select
                                        value={conditionalSelected}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Valor de desconto em todos os produtos da loja", value: "allProductsValue" },
                                                { label: "Valor de desconto no valor total (soma dos produtos)", value: "valor" },
                                                { label: "Frete grátis total", value: "freeShipping" },
                                                { label: "Valor de desconto no valor do frete", value: "valor" },
                                                { label: "Percentual de desconto no valor do frete", value: "porcento" },
                                                { label: "Percentual de desconto no valor total (soma dos produtos)", value: "porcento" },
                                                { label: "Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent" }
                                            ]
                                        }/* @ts-ignore */
                                        onChange={handleChangeConditional}
                                    />
                                </Block>

                                {conditionalSelected === "valor" ? (
                                    <Block>
                                        <Etiqueta>Qual é o valor em preço(R$) para essa ação:</Etiqueta>
                                        <InputPost
                                            type="number"
                                            placeholder="Digite aqui..."
                                            /* @ts-ignore */
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                        <Button
                                            onClick={handleRegisterConditionalCoupon}
                                        >
                                            Salvar
                                        </Button>
                                    </Block>
                                ) :
                                    null
                                }

                                {conditionalSelected === "porcento" ? (
                                    <Block>
                                        <Etiqueta>Porcentagem(%) para essa ação:</Etiqueta>
                                        <InputPost
                                            type="number"
                                            placeholder="Digite aqui..."
                                            /* @ts-ignore */
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                        <br />
                                        <Button
                                            onClick={handleRegisterConditionalCoupon}
                                        >
                                            Salvar
                                        </Button>
                                    </Block>
                                ) :
                                    null
                                }

                            </SectionDate>
                        </GridDate>
                    </Card>

                    {productInCupon.length < 1 ? (
                        <Card>
                            <Avisos texto="Não há produtos vinculados a esse cupon de desconto..." />
                        </Card>
                    ) :
                        <Card>
                            {productInCupon.map((item) => {
                                return (
                                    <>
                                        <Card
                                            key={item.id}
                                        >
                                            <Titulos tipo="h1" titulo={item.product.name} />
                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Atualizar produto"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={item.product.name}
                                                            value={productSelected}
                                                            /* @ts-ignore */
                                                            onChange={handleChangeProduct}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },
                                                                    ...(product || []).map((item) => ({ label: item.name, value: item.id }))
                                                                ]
                                                            }
                                                            handleSubmit={() => updateProducts(item.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>
                                            <SectionDate>
                                                <SectionDate>
                                                    <BlockDados>
                                                        <TextContent>SKU: {item.product.sku}</TextContent>
                                                    </BlockDados>
                                                </SectionDate>
                                                <BlockDados>
                                                    <BsTrash
                                                        onClick={() => handleOpenModalDeleteProductCupom(item.id)}
                                                        style={{ cursor: 'pointer', margin: '13px 0' }}
                                                        color="red"
                                                        size={35}
                                                    />
                                                </BlockDados>

                                            </SectionDate>
                                        </Card>
                                    </>
                                )
                            })}
                        </Card>
                    }

                </Container>
            </Grid>
            {modalVisible && (
                <ModalDeleteCupom
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    cuponId={cupon_id}
                />
            )}
            {modalVisibleProduct && (
                <ModalDeleteCupomProduct
                    isOpen={modalVisibleProduct}
                    onRequestClose={handleCloseModalDeleteProduct}
                    /* @ts-ignore */
                    cuponProductId={modalItem}
                />
            )}
        </>
    )
}

export default Cupom;