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
    const [productCupom, setProductCupom] = useState("");

    const [productInCupon, setProductInCupon] = useState<any[]>([]);

    const [modalVisible, setModalVisible] = useState(false);


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
                setProductCupom(data.cupomsproducts || "");

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

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
        setModalVisible(true);
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
                                        chave={"Banner ativado?"}
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
                                </Block>
                            </SectionDate>

                            <SectionDate>
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

                                            <GridDate>
                                                <SectionDate>
                                                    <TextContent>SKU: {item.product.sku}</TextContent>
                                                </SectionDate>
                                            </GridDate>
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
        </>
    )
}

export default Cupom;