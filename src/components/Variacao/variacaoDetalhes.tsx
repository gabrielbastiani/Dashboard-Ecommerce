import { useEffect, useState } from "react";
import PhotosVariacoes from "../PhotosVariacoes";
import { TextoDados } from "../TextoDados";
import Titulos from "../Titulos";
import { Button } from "../ui/Button";
import { ButtonSelect } from "../ui/ButtonSelect";
import { setupAPIClient } from "../../services/api";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { BlockTop } from "../../pages/Categorias/styles";
import { SectionDate } from "../../pages/Configuracoes/styles";
import { GridDate } from "../../pages/Perfil/styles";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { ModalDeleteVariacao } from '../popups/ModalDeleteVariacao';
import SelectUpdate from "../ui/SelectUpdate";
import { InputUpdate } from "../ui/InputUpdate";
import { useNavigate } from "react-router-dom";


interface ItemsVariacao {
    variation_id: string;
    photoVariacaoID: string;
    reloadVariation: () => void;
    close: () => void;
}

const VariacaoDetalhes = ({ variation_id, photoVariacaoID, reloadVariation, close }: ItemsVariacao) => {

    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [updateName, setUpdateName] = useState("");
    const [productVariation, setProductVariation] = useState("");

    const [products, setProducts] = useState<any[]>([]);
    const [productsSelected, setProductsSelected] = useState("");

    const [status, setStatus] = useState('');
    const [orderVariation, setOrderVariation] = useState(Number);
    const [updateOrder, setUpdateOrder] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    function handleChangeProducts(e: any) {
        setProductsSelected(e.target.value)
    }

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsStore`);
                setProducts(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadProducts();
    }, []);

    useEffect(() => {
        async function loadVariation() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findUniqueVariation?productVariation_id=${variation_id}`);

                if (data === null) {
                    navigate(0);
                    return;
                }

                setName(data.variationName || "");
                setProductVariation(data.variationProduct || "");
                setOrderVariation(data.order);
                setStatus(data.status || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadVariation();
    }, [navigate, variation_id]);

    async function loadDataVariation() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/findUniqueVariation?productVariation_id=${variation_id}`);

            setName(data.variationName || "");
            setProductVariation(data.variationProduct || "");
            setOrderVariation(data.order);
            setStatus(data.status || "");

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateNameVariation() {
        try {
            const apiClient = setupAPIClient();
            if (updateName === '') {
                toast.error('Não deixe o nome da variação em branco!!!');
                return;
            }

            await apiClient.put(`/updateNameVariation?productVariation_id=${variation_id}`, { variationName: updateName });

            toast.success('Nome da variação atualizada com sucesso.');

            loadDataVariation();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do produto.');
        }
    }

    async function updateOrderVariation() {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderVariacao?productVariation_id=${variation_id}`, { order: Number(updateOrder) });
                toast.success('Ordem da variação atualizada com sucesso.');
                loadDataVariation();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusVariation?productVariation_id=${variation_id}`);

            loadDataVariation();

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

    async function updateProductVariation() {
        try {
            const apiClient = setupAPIClient();
            if (productsSelected === undefined || productsSelected === null || productsSelected === "") {
                toast.error('Preencha todos os campos')
                return
            }

            await apiClient.put(`/updateVariationName?productVariation_id=${variation_id}`, { variationProduct: productsSelected });

            toast.success('Produto variação atualizado com sucesso.');

            loadDataVariation();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a variação do produto.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

   async function handleOpemModalDelete() {
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
                    onClick={handleOpemModalDelete}
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
                            chave={"Atualizar produto dessa variação"}
                            dados={
                                <SelectUpdate
                                    dado={productVariation}
                                    handleSubmit={updateProductVariation}
                                    value={productsSelected}
                                    opcoes={
                                        [
                                            { label: "Selecionar...", value: "" },/* @ts-ignore */
                                            ...(products || []).map((item) => ({ label: item.name, value: item.name }))
                                        ]
                                    }/* @ts-ignore */
                                    onChange={handleChangeProducts}
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
                                    placeholder={orderVariation}
                                    value={updateOrder}
                                    /* @ts-ignore */
                                    onChange={(e) => setUpdateOrder(e.target.value)}
                                    handleSubmit={updateOrderVariation}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Disponibilidade"}
                            dados={
                                <ButtonSelect
                                    dado={status}
                                    handleSubmit={updateStatus}
                                    showElement={status}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>

                <SectionDate>
                    <PhotosVariacoes
                        variation_id={photoVariacaoID}
                    />
                </SectionDate>
            </GridDate>
            {modalVisible && (
                <ModalDeleteVariacao
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    variacao={variation_id}
                    variationReload={reloadVariation}
                    deleteClose={close}
                />
            )}
        </>
    )
}

export default VariacaoDetalhes;