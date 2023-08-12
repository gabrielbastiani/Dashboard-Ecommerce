import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { TextoDados } from "../../../components/TextoDados";
import { Avisos } from "../../../components/Avisos";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { Block, BlockTop, Etiqueta, ImagensCategorys } from "../../Categorias/styles";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { BsTrash } from "react-icons/bs";
import { ModalDeleteBuyTogether } from "../../../components/popups/ModalDeleteBuyTogether";
import { ContainerCompreJunto } from "./styles";


export type DeleteBuy = {
    id: string;
}

const ProdutosGrupo: React.FC = () => {

    let { buyTogether_id } = useParams();

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [store_id] = useState(admin.store_id);

    const [nameProduct, setNameProduct] = useState("");

    const [nameGroup, setNameGroup] = useState("");
    const [products, setProducts] = useState<any[]>([]);

    const [productsSelected, setProductsSelected] = useState();
    const [productsSelectedUpdate, setProductsSelectedUpdate] = useState();
    const [order, setOrder] = useState(Number);

    const [orderUpdate, setOrderUpdate] = useState(Number);

    const [loadIDMenu, setloadIDMenu] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function handleChangeProducts(e: any) {
        setProductsSelected(e.target.value);
    }

    function handleChangeProductsUpdate(e: any) {
        setProductsSelectedUpdate(e.target.value);
    }

    useEffect(() => {
        async function findGroupDate() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueBuyTogether?buyTogether_id=${buyTogether_id}`);

                setNameGroup(response.data.nameGroup || "");
                setNameProduct(response.data.product.name || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findGroupDate();
    }, [buyTogether_id]);

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allProductsStore');
                setProducts(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadProducts();
    }, []);

    async function handleRegisterProductsGruop() {
        const apiClient = setupAPIClient();
        try {
            if (productsSelected === undefined || productsSelected === null || productsSelected === "") {
                toast.error('Não deixe campos em branco.');
                return;
            }
            await apiClient.post('/createBuyTogether', {
                product_id: productsSelected,
                nivel: 1,
                parentId: buyTogether_id,
                order: Number(order),
                store_id: store_id
            });

            toast.success('Produto cadastrado com sucesso no grupo compre junto!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar o produto no grupo!!!');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function findLoadIDMenu() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findItensGroupBuyTogether?parentId=${buyTogether_id}`);

                setloadIDMenu(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadIDMenu();
    }, [buyTogether_id]);

    async function updateProduct(id: string) {
        try {
            if (productsSelectedUpdate === "" || productsSelectedUpdate === null || productsSelectedUpdate === undefined) {
                toast.error(`Selecione o produto, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateProductBuyTogether?buyTogether_id=${id}`, { product_id: productsSelectedUpdate });

            toast.success('Produto atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o produto.');
        }
    }

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderBuyTogether?buyTogether_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem do produto no grupo atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 2800);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do produto.');
        }
    }

    async function updateStatus(id: string, status: string) {
        console.log(id)
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusBuyTogether?buyTogether_id=${id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar o status do produto no grupo.');
        }

        if (status === "Indisponivel") {
            toast.success(`O produto no grupo se encontra disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`O produto no grupo se encontra indisponivel.`);
            return;
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueBuyTogether', {
            params: {
                buyTogether_id: id,
            }
        });
        setModalItem(response.data || "");
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
                        <VoltarNavagation />
                        <BlockTop>

                            {nameProduct ? (
                                <Titulos
                                    tipo="h1"
                                    titulo={`Insira novos produtos no grupo compre junto do produto = ${nameProduct}`}
                                />
                            ) :
                                <Titulos
                                    tipo="h1"
                                    titulo={`Escolha um produto para o grupo compre junto = ${nameGroup}`}
                                />
                            }

                        </BlockTop>

                        <Etiqueta>Escolha um produto:</Etiqueta>
                        <Select
                            value={productsSelected}
                            /* @ts-ignore */
                            onChange={handleChangeProducts}
                            opcoes={
                                [
                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                    ...(products || []).map((item) => ({ label: item.name, value: item.id }))
                                ]
                            }
                        />
                        <br />
                        <Block>
                            <Etiqueta>Ordem:</Etiqueta>
                            <InputPost
                                type="number"
                                placeholder="0"
                                value={order}/* @ts-ignore */
                                onChange={(e) => setOrder(e.target.value)}
                            />
                        </Block>
                        <br />
                        <Button
                            onClick={handleRegisterProductsGruop}
                        >
                            Cadastrar produto
                        </Button>
                        <br />
                        <br />
                        {loadIDMenu.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há produtos cadastrados no grupo ainda..."
                                />
                            </>
                        ) :
                            <>
                                {loadIDMenu.map((item, index) => {
                                    return (
                                        <ContainerCompreJunto key={index}>
                                            <Card>
                                                <Titulos
                                                    tipo="h2"
                                                    titulo={item.product.name}
                                                />

                                                <BlockDados>
                                                    <TextoDados
                                                        chave={"Atualizar Produto"}
                                                        dados={
                                                            <SelectUpdate
                                                                dado={item.product.name}
                                                                handleSubmit={() => updateProduct(item.id)}
                                                                value={productsSelectedUpdate}
                                                                opcoes={
                                                                    [
                                                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                        ...(products || []).map((item) => ({ label: item.name, value: item.id }))
                                                                    ]
                                                                }/* @ts-ignore */
                                                                onChange={handleChangeProductsUpdate}
                                                            />
                                                        }
                                                    />
                                                </BlockDados>

                                                <GridDate>
                                                    <SectionDate>
                                                        {item.product.photoproducts.map((img: any, index: any) => {
                                                            return (
                                                                <ImagensCategorys
                                                                    key={index}
                                                                    src={"http://localhost:3333/files/" + img.image}
                                                                    width={170}
                                                                    height={80}
                                                                />
                                                            )
                                                        })}
                                                    </SectionDate>

                                                    <SectionDate>
                                                        <BlockDados>
                                                            <TextoDados
                                                                chave={"Status"}
                                                                dados={
                                                                    <ButtonSelect
                                                                        /* @ts-ignore */
                                                                        dado={item.status}
                                                                        handleSubmit={() => updateStatus(item.id, item.status)}
                                                                    />
                                                                }
                                                            />
                                                            &nbsp;
                                                            &nbsp;
                                                            <TextoDados
                                                                chave={"Ordem"}
                                                                dados={
                                                                    <InputUpdate
                                                                        dado={String(item.order)}
                                                                        type="number"
                                                                        /* @ts-ignore */
                                                                        placeholder={String(item.order)}
                                                                        value={orderUpdate}
                                                                        /* @ts-ignore */
                                                                        onChange={(e) => setOrderUpdate(e.target.value)}
                                                                        handleSubmit={() => updateOrder(item.id)}
                                                                    />
                                                                }
                                                            />
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            <BsTrash
                                                                onClick={() => handleOpenModalDelete(item.id)}
                                                                style={{ cursor: 'pointer', margin: '13px 0' }}
                                                                color="red"
                                                                size={35}
                                                            />
                                                        </BlockDados>
                                                    </SectionDate>
                                                </GridDate>
                                            </Card>
                                        </ContainerCompreJunto>
                                    )
                                })}
                            </>
                        }
                        {modalVisible && (
                            <ModalDeleteBuyTogether
                                isOpen={modalVisible}
                                onRequestClose={handleCloseModalDelete}
                                /* @ts-ignore */
                                relation={modalItem}
                            />
                        )}
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default ProdutosGrupo;