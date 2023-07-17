import { useContext, useEffect, useState } from "react";
import PhotosVariacoes from "../PhotosVariacoes";
import { TextoDados } from "../TextoDados";
import Titulos from "../Titulos";
import { Button } from "../ui/Button";
import { ButtonSelect } from "../ui/ButtonSelect";
import { setupAPIClient } from "../../services/api";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { BlockTop, Etiqueta } from "../../pages/Categorias/styles";
import { SectionDate } from "../../pages/Configuracoes/styles";
import { GridDate } from "../../pages/Perfil/styles";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { ModalDeleteVariacao } from '../popups/ModalDeleteVariacao';
import { useNavigate } from "react-router-dom";
import SelectUpdate from "../ui/SelectUpdate";
import Select from "../ui/Select";
import { InputPost } from "../ui/InputPost";
import { AuthContext } from "../../contexts/AuthContext";
import { DivisorHorizontal } from "../ui/DivisorHorizontal";
import { InputUpdate } from "../ui/InputUpdate";


export type DeleteVariacao = {
    variation_id: any;
}

interface ItemsVariacao {
    productId: any;
    variation_id: string;
    photoVariacaoID: string;
    nameVariacao: string;
}

const VariacaoDetalhes = ({
    variation_id,
    productId,
    photoVariacaoID,
}: ItemsVariacao) => {

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [updateName, setUpdateName] = useState("");

    const [products, seProducts] = useState<any[]>([]);
    const [productsSelected, setProductsSelected] = useState("");

    const [status, setStatus] = useState('');
    const [statusVariation, setStatusVariation] = useState('');

    const [nameProductVariation, setNameProductVariation] = useState("");
    const [order, setOrder] = useState(Number);
    const [orderVariation, setOrderVariation] = useState(Number);
    const [updateOrder, setUpdateOrder] = useState();
    const [updateVariationOrder, setUpdateVariationOrder] = useState(Number);
    const [orderUpdateproductVariation, setOrderUpdateproductVariation] = useState();

    const [productVariationID, setProductVariationID] = useState("");

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function handleChangeProducts(e: any) {
        setProductsSelected(e.target.value)
    }

    useEffect(() => {
        async function loadVariations() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsStore`);
                seProducts(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadVariations();
    }, []);

    useEffect(() => {
        async function loadVariation() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueVariation?variation_id=${variation_id}`);

                setName(response.data.name || "");
                setOrderVariation(response.data.order);
                setStatus(response.data.status);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadVariation();
    }, [variation_id]);

    useEffect(() => {
        async function loadFirstVariation() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findFirstProductVariation?variation_id=${variation_id}`);

                setNameProductVariation(response.data.product.name || "");
                setProductVariationID(response.data.id || "");
                setUpdateVariationOrder(response.data.order);
                setStatusVariation(response.data.status || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadFirstVariation();
    }, [variation_id]);

    async function updateNameVariation() {
        try {
            const apiClient = setupAPIClient();
            if (updateName === '') {
                toast.error('Não deixe o nome da variação em branco!!!');
                return;
            }

            await apiClient.put(`/updateNameVariation?variation_id=${variation_id}`, { name: updateName });

            toast.success('Nome da variação atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do produto.');
        }
    }

    async function updateOrderProductVariation() {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderVariacao?variation_id=${variation_id}`, { order: Number(updateOrder) });
                toast.success('Ordem da variação atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusVariation?variation_id=${variation_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade da variacão.');
        }

        if (status === "Indisponivel") {
            toast.success(`A variação se encontra Disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`A variação se encontra Indisponivel.`);
            return;
        }
    }

    async function handleRegisterProductVariation() {
        try {
            if (productsSelected === undefined || productsSelected === null || productsSelected === "") {
                toast.error('Preencha todos os campos')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createProductVariation', {
                variation_id: variation_id,
                product_id: productsSelected,
                order: order,
                store_id: admin.store_id
            })

            toast.success('Produto cadastrado como variação com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar o produto como variação!')
        }
    }

    async function updateNameProductVariation() {
        try {
            const apiClient = setupAPIClient();
            if (productsSelected === undefined || productsSelected === null || productsSelected === "") {
                toast.error('Preencha todos os campos')
                return
            }

            await apiClient.put(`/updateProductVariationName?productVariation_id=${productVariationID}`, { product_id: productsSelected });

            toast.success('Produto variação atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a variação do produto.');
        }
    }

    async function updateProductVariationOrder() {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderProductVariationName?productVariation_id=${productVariationID}`, { order: Number(orderUpdateproductVariation) });
                toast.success('Ordem do produto na variação atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem.');
        }
    }

    async function updateStatusProductVariation() {
        try {
            const apiClient = setupAPIClient();/* @ts-ignore */
            await apiClient.put(`/updateStatusProductVariation?productVariation_id=${productVariationID}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade da variacão.');
        }

        if (statusVariation === "Indisponivel") {
            toast.success(`A variação se encontra Disponivel.`);
            return;
        }

        if (statusVariation === "Disponivel") {
            toast.error(`A variação se encontra Indisponivel.`);
            return;
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpemModalDelete(variation_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/findUniqueVariation', {
            params: {
                variation_id: variation_id,
            }
        });
        setModalItem(responseDelete.data);
        setModalVisible(true);
    }

    Modal.setAppElement('body');



    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h3"
                    titulo={'Variação - ' + name}
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: '#FB451E' }}
                    onClick={() => handleOpemModalDelete(variation_id)}
                >
                    Remover
                </Button>
            </BlockTop>
            <br />
            <br />
            <GridDate>
                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"Atualizar nome da variação"}
                            dados={
                                <InputUpdate
                                    dado={name}
                                    type="text"
                                    placeholder={name}
                                    value={updateName}
                                    onChange={(e) => setUpdateName(e.target.value)}
                                    handleSubmit={updateNameVariation}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Ordem da variação"}
                            dados={
                                <InputUpdate
                                    dado={orderVariation}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={order}
                                    value={updateOrder}
                                    /* @ts-ignore */
                                    onChange={(e) => setUpdateOrder(e.target.value)}
                                    handleSubmit={updateOrderProductVariation}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Disponibilidade"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={status}
                                    handleSubmit={updateStatus}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>

                <SectionDate>
                    <PhotosVariacoes
                        variation_id={photoVariacaoID}
                        product_id={productId}
                    />
                </SectionDate>
            </GridDate>

            {productVariationID ? (
                <>
                    <DivisorHorizontal />

                    <BlockDados>
                        <TextoDados
                            chave={"Atualizar produto variação"}
                            dados={
                                <SelectUpdate
                                    dado={nameProductVariation}
                                    handleSubmit={updateNameProductVariation}
                                    value={productsSelected}
                                    opcoes={
                                        [
                                            { label: "Selecionar...", value: "" },/* @ts-ignore */
                                            ...(products || []).map((item) => ({ label: item.name, value: item.id }))
                                        ]
                                    }/* @ts-ignore */
                                    onChange={handleChangeProducts}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Ordem do produto variação"}
                            dados={
                                <InputUpdate
                                    dado={updateVariationOrder}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={updateVariationOrder}
                                    value={orderUpdateproductVariation}
                                    /* @ts-ignore */
                                    onChange={(e) => setOrderUpdateproductVariation(e.target.value)}
                                    handleSubmit={updateProductVariationOrder}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Disponibilidade"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={statusVariation}
                                    handleSubmit={updateStatusProductVariation}
                                />
                            }
                        />
                    </BlockDados>
                </>
            ) :
                <>
                    <DivisorHorizontal />

                    <GridDate>
                        <SectionDate>
                            <BlockDados>
                                <Etiqueta>Confirme qual seria o produto para servir como variação:</Etiqueta>
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
                            </BlockDados>

                            <BlockDados>
                                <Etiqueta>Ordem:</Etiqueta>
                                <InputPost
                                    type="number"
                                    placeholder="0"
                                    value={order}/* @ts-ignore */
                                    onChange={(e) => setOrder(e.target.value)}
                                />
                            </BlockDados>

                            <Button
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterProductVariation}
                            >
                                Salvar Variação
                            </Button>
                        </SectionDate>
                    </GridDate>
                </>
            }
            {modalVisible && (
                <ModalDeleteVariacao
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    variacao={modalItem}
                />
            )}
        </>
    )
}

export default VariacaoDetalhes;