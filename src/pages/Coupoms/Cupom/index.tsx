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
import { BoxConditional, ConditionalText, ContainerConditional, TextContent } from "../styles";
import { BsFillTrashFill, BsTrash } from "react-icons/bs";
import { ModalDeleteCupomProduct } from "../../../components/popups/ModalDeleteCupomProduct";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";
import { ModalDeleteCupomConditional } from "../../../components/popups/ModalDeleteCupomConditional";
import Warnings from "../../../components/Warnings";


export type DeleteProductCupon = {
    id: string;
}

export type DeleteConditional = {
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

    const [conditionalCupom, setConditionalCupom] = useState<any[]>([]);

    const [conditionalSelected, setConditionalSelected] = useState();

    function handleChangeConditional(e: any) {
        setConditionalSelected(e.target.value);
    }

    const [value, setValue] = useState("");

    const [productInCupon, setProductInCupon] = useState<any[]>([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleProduct, setModalVisibleProduct] = useState(false);
    const [modalItem, setModalItem] = useState("");

    const [modalVisibleConditional, setModalVisibleConditional] = useState(false);
    const [modalItemConditional, setModalItemConditional] = useState("");

    var valueFormated = String(value);
    valueFormated = valueFormated + '';
    /* @ts-ignore */
    valueFormated = parseInt(valueFormated.replace(/[\D]+/g, ''));
    valueFormated = valueFormated + '';
    valueFormated = valueFormated.replace(/([0-9]{2})$/g, ",$1");

    if (valueFormated.length > 6) {
        valueFormated = valueFormated.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    /* @ts-ignore */
    // eslint-disable-next-line eqeqeq
    if (valueFormated == 'NaN') valueFormated = '';
    const formatedValue = valueFormated.replace(".", "");
    const formatedValuePonto = formatedValue.replace(",", ".");
    const numberValue = formatedValuePonto;

    const apiClient = setupAPIClient();

    useEffect(() => {
        async function loadConditional() {
            try {
                const { data } = await apiClient.get(`/allConditionalCoupon?cupon_id=${cupon_id}`);
                setConditionalCupom(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadConditional();
    }, [cupon_id]);

    useEffect(() => {
        async function loadProductsInCupoms() {
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

    async function loadCupom() {
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

    async function cuponProgramedActiveAndDesactive() {
        try {
            await apiClient.get(`/activeDesactiveCuponProgramed?cupon_id=${cupon_id}`);
            toast.success('Datas atualizadas com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a data.');
        }
    }

    async function updateDatasCupon() {
        try {
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

                loadCupom();

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
            await apiClient.put(`/updateProductCoupom?cuponProduct_id=${id}`, { product_id: productSelected });

            toast.success('Produto atualizado com sucesso.');

            loadCupom();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o produto.');
        }
    }

    async function updateStatus() {
        try {
            await apiClient.put(`/statusCoupom?cupon_id=${cupon_id}`);

            loadCupom();

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
        try {
            await apiClient.post(`/createConditionalCoupon`, {
                cupon_id: cupon_id,
                conditional: conditionalSelected,
                value: Number(numberValue)
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

        if (conditionalCupom.length >= 1) {
            toast.error("Delete a condição do cupom vinculada antes, para poder deletar o cupom!!!");
            return;
        }
        setModalVisible(true);
    }

    function handleCloseModalDeleteProduct() {
        setModalVisibleProduct(false);
    }

    async function handleOpenModalDeleteProductCupom(id: string) {
        const response = await apiClient.get('/findUniqueProductCoupon', {
            params: {
                cuponProduct_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisibleProduct(true);
    }

    function handleCloseModalDeleteConditional() {
        setModalVisibleConditional(false);
    }

    async function handleOpenModalDeleteConditional(id: string) {
        const response = await apiClient.get('/findUniqueConditionalCupon', {
            params: {
                couponConditional_id: id
            }
        });
        setModalItemConditional(response.data || "");
        setModalVisibleConditional(true);
    }

    Modal.setAppElement('body');



    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
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
                                                dado={active}
                                                handleSubmit={updateStatus}
                                                showElement={active}
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
                                {conditionalCupom?.length >= 1 ? (
                                    <ContainerConditional>
                                        <br />
                                        <Titulos tipo="h4" titulo="Condição do cupom:" />
                                        <br />
                                        {conditionalCupom.map((con, index) => {
                                            return (
                                                <BoxConditional
                                                    key={index}
                                                >
                                                    {con?.conditional === "productsValue" ? (
                                                        <>
                                                            <ConditionalText>Valor de desconto</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "allProductsValue" ? (
                                                        <>
                                                            <ConditionalText>Valor de desconto em todos os produtos da loja</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "totalValue" ? (
                                                        <>
                                                            <ConditionalText>Valor de desconto no valor total</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "freeShipping" ? (
                                                        <>
                                                            <ConditionalText>Frete grátis total</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "valueShipping" ? (
                                                        <>
                                                            <ConditionalText>Valor de desconto no valor do frete</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "shippingPercent" ? (
                                                        <>
                                                            <ConditionalText>Percentual de desconto no valor do frete</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "percentProduct" ? (
                                                        <>
                                                            <ConditionalText>Percentual de desconto</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "totalPercent" ? (
                                                        <>
                                                            <ConditionalText>Percentual de desconto no valor total</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }

                                                    {con?.conditional === "allProductsValuePercent" ? (
                                                        <>
                                                            <ConditionalText>Percentual de desconto em todos os produtos da loja</ConditionalText>
                                                            <BsFillTrashFill color="red" size={25} onClick={() => handleOpenModalDeleteConditional(con?.id)} />
                                                        </>
                                                    ) :
                                                        null
                                                    }
                                                </BoxConditional>
                                            )
                                        })}
                                    </ContainerConditional>
                                ) :
                                    <>
                                        <Block>
                                            <br />
                                            <Etiqueta>Defina a condicional para esse cupom/promoção:</Etiqueta>
                                            <Select
                                                value={conditionalSelected}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },
                                                        { label: "Valor de desconto (Produto(s) selecionado(s) para essa promoção)", value: "productsValue" },
                                                        { label: "Valor de desconto em todos os produtos da loja", value: "allProductsValue" },
                                                        { label: "Valor de desconto no valor total", value: "totalValue" },
                                                        { label: "Frete grátis total", value: "freeShipping" },
                                                        { label: "Valor de desconto no valor do frete", value: "valueShipping" },
                                                        { label: "Percentual de desconto no valor do frete", value: "shippingPercent" },
                                                        { label: "Percentual de desconto (Produto(s) selecionado(s) para essa promoção)", value: "percentProduct" },
                                                        { label: "Percentual de desconto no valor total", value: "totalPercent" },
                                                        { label: "Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent" }
                                                    ]
                                                }/* @ts-ignore */
                                                onChange={handleChangeConditional}
                                            />
                                        </Block>

                                        {conditionalSelected === "productsValue" || conditionalSelected === "allProductsValue" || conditionalSelected === "totalValue" || conditionalSelected === "valueShipping" ? (
                                            <Block>
                                                <Etiqueta>Qual é o valor em preço(R$) para essa ação:</Etiqueta>
                                                <InputPost
                                                    maxLength={9}
                                                    type="text"
                                                    placeholder="Digite aqui..."
                                                    value={valueFormated}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setValue(e.target.value)}
                                                />
                                                {conditionalCupom?.length >= 1 ? (
                                                    <Avisos texto="Apague a condição existente para cadastrar outra..." />
                                                ) :
                                                    <Button
                                                        onClick={handleRegisterConditionalCoupon}
                                                    >
                                                        Salvar
                                                    </Button>
                                                }
                                            </Block>
                                        ) :
                                            null
                                        }

                                        {conditionalSelected === "shippingPercent" || conditionalSelected === "percentProduct" || conditionalSelected === "totalPercent" || conditionalSelected === "allProductsValuePercent" ? (
                                            <Block>
                                                <Etiqueta>Porcentagem(%) para essa ação:</Etiqueta>
                                                <InputPost
                                                    maxLength={9}
                                                    type="text"
                                                    placeholder="Digite aqui..."
                                                    value={valueFormated}
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

                                        {conditionalSelected === "freeShipping" ? (
                                            <Button
                                                onClick={handleRegisterConditionalCoupon}
                                            >
                                                Salvar
                                            </Button>
                                        ) :
                                            null
                                        }

                                        <Avisos texto="Não há condição aplicada a esse cupom ainda..." />

                                    </>
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
                            {productInCupon.map((item, index) => {
                                return (
                                    <>
                                        <Card
                                            key={index}
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
            {modalVisibleConditional && (
                <ModalDeleteCupomConditional
                    isOpen={modalVisibleConditional}
                    onRequestClose={handleCloseModalDeleteConditional}
                    /* @ts-ignore */
                    cuponConditionalId={modalItemConditional}
                />
            )}
        </>
    )
}

export default Cupom;