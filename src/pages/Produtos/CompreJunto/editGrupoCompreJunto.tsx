import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { Button } from "../../../components/ui/Button";
import { ModalDeleteGroupBuyTogether } from "../../../components/popups/ModalDeleteGroupBuyTogether";


export type DeleteBuyGroup = {
    buyTogether_id: string;
}

const EditGrupoCompreJunto: React.FC = () => {

    let { buyTogether_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [productID, setProductID] = useState("");
    const [nameGroupUpdate, setNameGroupUpdate] = useState("");

    const [products, setProducts] = useState<any[]>([]);
    const [productsSelectedUpdate, setProductsSelectedUpdate] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function handleChangeProductsUpdate(e: any) {
        setProductsSelectedUpdate(e.target.value)
    }

    useEffect(() => {
        async function loadGroupBuyTogether() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueBuyTogether?buyTogether_id=${buyTogether_id}`);
                setNameGroup(response.data.nameGroup || "");
                setProductID(response.data.product.name || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadGroupBuyTogether();
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

    async function updateNameGroup() {
        try {
            const apiClient = setupAPIClient();
            if (nameGroupUpdate === '') {
                toast.error('Não deixe o campo em branco!!!');
                return;
            }
            await apiClient.put(`/updateNameGroupBuyTogether?buyTogether_id=${buyTogether_id}`, { nameGroup: nameGroupUpdate });
            toast.success('Nome do grupo atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {
            toast.error('Ops erro ao atualizar o type do atributo.');
            console.log(err);
        }
    }

    async function updateProduct() {
        try {
            if (productsSelectedUpdate === "" || productsSelectedUpdate === null || productsSelectedUpdate === undefined) {
                toast.error(`Selecione o produto, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateProductBuyTogether?buyTogether_id=${buyTogether_id}`, { product_id: productsSelectedUpdate });

            toast.success('Produto desse grupo atualizado com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o produto.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(buyTogether_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueBuyTogether', {
            params: {
                buyTogether_id: buyTogether_id,
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
                        <Voltar
                            url="/compreJunto"
                        />
                        <BlockTop>
                            <Titulos
                                /* @ts-ignore */
                                type="h1"
                                titulo={`Editar grupo = ${nameGroup}`}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                onClick={() => handleOpenModalDelete(buyTogether_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Nome desse grupo compre junto"}
                                dados={
                                    <InputUpdate
                                        dado={nameGroup}
                                        type="text"
                                        placeholder={nameGroup}
                                        value={nameGroupUpdate}
                                        onChange={(e) => setNameGroupUpdate(e.target.value)}
                                        handleSubmit={updateNameGroup}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Atualizar Produto"}
                                dados={
                                    <SelectUpdate
                                        dado={productID}
                                        handleSubmit={updateProduct}
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

                    </Card>
                </Container>
            </Grid>
            {modalVisible && (
                <ModalDeleteGroupBuyTogether
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relation={modalItem}
                />
            )}
        </>
    )
}

export default EditGrupoCompreJunto;