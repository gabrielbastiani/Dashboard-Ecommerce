import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Titulos from "../Titulos";
import { Block, Etiqueta } from "../../pages/Categorias/styles";
import Select from "../ui/Select";
import { Button } from "../ui/Button";
import { ContainerCategories, ContainerCategoriesBox, GridContainer, TextNotFound } from "../CategoriesProduct/styles";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { TextoDados } from "../TextoDados";
import SelectUpdate from "../ui/SelectUpdate";
import { BsTrash } from "react-icons/bs";
import { InputPost } from "../ui/InputPost";
import { InputUpdate } from "../ui/InputUpdate";
import { ModalDeleteRelationAttributeProduct } from "../popups/ModalDeleteRelationAttributeProduct";
import { ContainerAttributes } from "./styles";


export type DeleteAttribute = {
    id: string;
}

interface AtributeRequest {
    product_id: any;
}

const AttributesProduct = ({ product_id }: AtributeRequest) => {

    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [atributes, setAtributes] = useState<any[]>([]);
    const [atributesSelected, setAtributesSelected] = useState();

    const [values, setValues] = useState<any[]>([]);
    const [valueSelected, setValueSelected] = useState();

    const [order, setOrder] = useState(Number);
    const [orderUpdate, setOrderUpdate] = useState();
    const [attributesProducts, setAttributesProducts] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function handleChangeTypeAttribute(e: any) {
        setAtributesSelected(e.target.value);
    }

    function handleChangeValueAttribute(e: any) {
        setValueSelected(e.target.value);
    }

    useEffect(() => {
        async function loadAtributosTypes() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allTypeAttributes');
                setAtributes(response.data || []);
            } catch (error) {
                /* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadAtributosTypes();
    }, []);

    useEffect(() => {
        async function loadAtributosValues() {
            const apiClient = setupAPIClient();
            try {/* @ts-ignore */
                const response = await apiClient.get(`/getAllValuesAttributes`);
                setValues(response.data || []);
            } catch (error) {
                /* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadAtributosValues();
    }, []);

    useEffect(() => {
        async function findAllRelation() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/getAllAttributesProduct?product_id=${product_id}`);

                setAttributesProducts(response.data || []);

            } catch (error) {
                /* @ts-ignore */
                console.log(error.response.data);
            }
        }
        findAllRelation();
    }, [product_id]);

    async function findAllRelation() {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/getAllAttributesProduct?product_id=${product_id}`);

            setAttributesProducts(response.data || []);

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function handleRegisterAttribute() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelationAttributeProduct', {
                product_id: product_id,
                type: atributesSelected,
                valueAttribute_id: valueSelected,
                order: Number(order),
                store_id: store_id
            });

            toast.success('Atributo cadastrado com sucesso!');

            findAllRelation();

        } catch (error) {/* @ts-ignore */
            toast.error('Ops, erro ao cadastrar o atributo no produto');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateType(id: string) {
        try {
            if (atributesSelected === "" || atributesSelected === null || atributesSelected === undefined) {
                toast.error(`Selecione o tipo, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateTypeRelationAttributeProduct?relationAttributeProduct_id=${id}`, { type: atributesSelected });

            toast.success('Tipo de atributo atualizado com sucesso.');

            findAllRelation();

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o tipo do atributo no produto.');
        }
    }

    async function updateValue(id: string) {
        try {
            if (valueSelected === "" || valueSelected === null || valueSelected === undefined) {
                toast.error(`Selecione o valor, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateValueRelationAttributeProduct?relationAttributeProduct_id=${id}`, { valueAttribute_id: valueSelected });

            toast.success('Valor de atributo atualizado com sucesso.');

            findAllRelation();

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o valor do atributo no produto.');
        }
    }

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelationAttributeProduct?relationAttributeProduct_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem do atributo atualizado com sucesso.');
                findAllRelation();
            }
        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a ordem do atributo.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueRelationAttributeProduct', {
            params: {
                relationAttributeProduct_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');



    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Cadastre atributos para o produto"
            />
            <br />
            <br />
            <Etiqueta>Escolha tipo de atributo:</Etiqueta>
            <Select
                value={atributesSelected}
                /* @ts-ignore */
                onChange={handleChangeTypeAttribute}
                opcoes={
                    [
                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                        ...(atributes || []).map((item) => ({ label: item.type, value: item.type }))
                    ]
                }
            />
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Etiqueta>Escolha valor do atributo:</Etiqueta>
            <Select
                value={valueSelected}
                /* @ts-ignore */
                onChange={handleChangeValueAttribute}
                opcoes={
                    [
                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                        ...(values || []).map((item) => ({ label: item.value, value: item.id }))
                    ]
                }
            />

            <Block>
                <Etiqueta>Ordem:</Etiqueta>
                <InputPost
                    type="number"
                    placeholder="0"
                    value={order}/* @ts-ignore */
                    onChange={(e) => setOrder(e.target.value)}
                />
            </Block>

            <Button
                style={{ backgroundColor: 'green' }}
                onClick={handleRegisterAttribute}
            >
                Salvar atributo
            </Button>
            <br />
            <br />
            <GridContainer>
                {attributesProducts.length < 1 ? (
                    <>
                        <TextNotFound>Não há atributos cadastrados no produto ainda...</TextNotFound>
                    </>
                ) :
                    <>
                        {attributesProducts.map((item, index) => {
                            return (
                                <ContainerAttributes key={index}>
                                    <ContainerCategories key={item.id}>
                                        <ContainerCategoriesBox>
                                            <BlockDados
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <TextoDados
                                                    chave={"Tipo do atributo"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={item.type}
                                                            handleSubmit={() => updateType(item.id)}
                                                            value={atributesSelected}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                    ...(atributes || []).map((item) => ({ label: item.type, value: item.type }))
                                                                ]
                                                            }/* @ts-ignore */
                                                            onChange={handleChangeTypeAttribute}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <TextoDados
                                                    chave={"Valor do atributo"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={item.valueAttribute.value}
                                                            handleSubmit={() => updateValue(item.id)}
                                                            value={valueSelected}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                    ...(values || []).map((item) => ({ label: item.value, value: item.id }))
                                                                ]
                                                            }/* @ts-ignore */
                                                            onChange={handleChangeValueAttribute}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
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
                                            </BlockDados>

                                            <BlockDados>
                                                <BsTrash
                                                    onClick={() => handleOpenModalDelete(item.id)}
                                                    style={{ cursor: 'pointer', margin: '13px 0' }}
                                                    color="red"
                                                    size={35}
                                                />
                                            </BlockDados>
                                        </ContainerCategoriesBox>
                                    </ContainerCategories>
                                </ContainerAttributes>
                            )
                        })}
                    </>
                }
                {modalVisible && (
                    <ModalDeleteRelationAttributeProduct
                        isOpen={modalVisible}
                        reloadAtributes={findAllRelation}
                        onRequestClose={handleCloseModalDelete}
                        /* @ts-ignore */
                        relation={modalItem}
                    />
                )}
            </GridContainer>
        </>
    )
}

export default AttributesProduct;