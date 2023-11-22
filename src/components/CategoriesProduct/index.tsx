import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { ModalDeleteRelationsCategorys } from "../popups/ModalDeleteRelationsCategorys";
import {
    BlockCatSub,
    BlockSub,
    ButtonSubCat,
    ButtonSubCatSave,
    ContainerCategories,
    ContainerCategoriesBox,
    ContainerCateroiesProducts,
    GridContainer,
    TextNotFound,
    TextSub
} from "./styles";
import { Block, Etiqueta } from "../../pages/Categorias/styles";
import Select from "../ui/Select";
import { InputPost } from "../ui/InputPost";
import { Button } from "../ui/Button";
import Titulos from "../Titulos";
import { BsTrash } from "react-icons/bs";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { ButtonSelect } from "../ui/ButtonSelect";
import { TextoDados } from "../TextoDados";
import { InputUpdate } from "../ui/InputUpdate";
import SelectUpdate from "../ui/SelectUpdate";


export type DeleteRelations = {
    id: string;
}

interface CategoriesRequest {
    product_id: any;
}

const CategoriesProduct = ({ product_id }: CategoriesRequest) => {

    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();
    const [order, setOrder] = useState(Number);

    const [allCategoriesProduct, setAllCategoriesProduct] = useState<any[]>([]);
    const [loadSubcateg, setLoadSubcateg] = useState<any[]>([]);

    const [orderUpdate, setOrderUpdate] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [activeTab, setActiveTab] = useState("");
    const [activeTabSub, setActiveTabSub] = useState("");


    const handleClick: any = (id: string) => {
        setActiveTab(id);
        loadSubCategories(id);
    };

    const handleClickSub: any = (id: string) => {
        setActiveTabSub(id);
        loadSubCategories(id);
    };

    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value);
    };

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/listCategorysDisponivel');
                setCategories(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, []);

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            if (categorySelected === "" || categorySelected === null || categorySelected === undefined) {
                toast.error('Favor, selecione uma categoria!');
                return;
            }

            await apiClient.post('/createProductCategory', {
                product_id: product_id,
                name: categorySelected,
                order: Number(order),
                store_id: store_id
            });

            toast.success('Categoria cadastrada com sucesso!');

            findAllRelation();

        } catch (error) {/* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function handleSubCateg(name: string) {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createProductCategory', {
                product_id: product_id,
                name: name,
                order: 0,
                store_id: store_id
            });

            toast.success('Subcategoria cadastrada com sucesso!');

            findAllRelation();

        } catch (error) {/* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function findAllRelation() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findAllRelationsProductAndCategory?product_id=${product_id}`);

                setAllCategoriesProduct(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findAllRelation();
    }, [product_id]);

    async function findAllRelation() {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/findAllRelationsProductAndCategory?product_id=${product_id}`);

            setAllCategoriesProduct(response.data || []);

        } catch (error) {
            console.error(error);
        }
    }

    async function updateCategory(id: string) {
        try {
            if (categorySelected === "" || categorySelected === null || categorySelected === undefined) {
                toast.error(`Selecione a categoria, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateCategoryNameProduct?productCategory_id=${id}`, { name: categorySelected });

            toast.success('Categoria atualizada com sucesso.');

            findAllRelation();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a categoria.');
        }
    }

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelation?productCategory_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem da categoria atualizada com sucesso.');
                findAllRelation();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria.');
        }
    }

    async function updateMainCategory(id: string, mainCategory: string, product_id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/mainCategoryProduct?productCategory_id=${id}&product_id=${product_id}`);

            findAllRelation();

        } catch (error) {
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            return;
        }

        if (mainCategory === "Nao") {
            toast.success(`Está será a categoria principal do produto.`);
            return;
        }

        if (mainCategory === "Sim") {
            toast.error(`Está categoria não será mais a principal do produto.`);
            return;
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusCategoryProduct?productCategory_id=${id}`);

            findAllRelation();

        } catch (error) {
            toast.error('Ops erro ao atualizar o status da relação de categorias.');
        }

        if (status === "Indisponivel") {
            toast.success(`A relação de categorias se encontra disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`A relação de categorias se encontra indisponivel.`);
            return;
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueRelationCategoryProduct', {
            params: {
                productCategory_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');

    async function loadSubCategories(id: string) {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/parentIDCategoryAll?parentId=${id}`);
            setLoadSubcateg(response.data || []);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Cadastre categorias para o produto"
            />
            <br />
            <br />
            <Etiqueta>Escolha uma categoria:</Etiqueta>
            <Select
                value={categorySelected}
                /* @ts-ignore */
                onChange={handleChangeCategory}
                opcoes={
                    [
                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                        ...(categories || []).map((item) => ({ label: item.name, value: item.name }))
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
                onClick={handleRelations}
            >
                Salvar categoria no produto
            </Button>
            <br />
            <br />
            <GridContainer>
                {allCategoriesProduct.length < 1 ? (
                    <>
                        <TextNotFound>Não há categorias cadastrados no produto ainda...</TextNotFound>
                    </>
                ) :
                    <>
                        {allCategoriesProduct.map((item, index) => {
                            return (
                                <ContainerCateroiesProducts key={index}>
                                    <ContainerCategories>
                                        <ContainerCategoriesBox>
                                            <BlockDados style={{ marginLeft: "10px" }} >
                                                <TextoDados
                                                    chave={"Categoria"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={item.category.name}
                                                            handleSubmit={() => updateCategory(item.id)}
                                                            value={categorySelected}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                    ...(categories || []).map((item) => ({ label: item.name, value: item.name }))
                                                                ]
                                                            }/* @ts-ignore */
                                                            onChange={handleChangeCategory}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
                                                <Button
                                                    style={{ backgroundColor: 'orange' }}
                                                    onClick={() => handleClick(item.category.id)}
                                                >
                                                    Subcategorias?
                                                </Button>
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
                                                <TextoDados
                                                    chave={"Status"}
                                                    dados={
                                                        <ButtonSelect
                                                            dado={item.status}
                                                            handleSubmit={() => updateStatus(item.id, item.status)}
                                                            showElement={item.status}
                                                        />
                                                    }
                                                />

                                                <TextoDados
                                                    chave={"Principal?"}
                                                    dados={
                                                        <ButtonSelect
                                                            dado={item.mainCategory}
                                                            handleSubmit={() => updateMainCategory(item.id, item.mainCategory, item.product_id)}
                                                            showElement={item.mainCategory}
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

                                            <BlockSub>
                                                {loadSubcateg.map((sub) => {
                                                    return (
                                                        <>
                                                            {activeTab === item.category.id ?
                                                                <>
                                                                    <BlockSub key={sub.id}>
                                                                        <TextSub>{sub.name}</TextSub>
                                                                        <BlockCatSub>
                                                                            <ButtonSubCat
                                                                                onClick={() => handleClickSub(sub.id)}
                                                                            >
                                                                                Mais...
                                                                            </ButtonSubCat>
                                                                            <ButtonSubCatSave
                                                                                onClick={() => handleSubCateg(sub.name)}
                                                                            >
                                                                                Salvar
                                                                            </ButtonSubCatSave>
                                                                        </BlockCatSub>
                                                                    </BlockSub>
                                                                </>
                                                                :
                                                                null
                                                            }

                                                            {activeTabSub === sub.id ?
                                                                <BlockSub key={sub.id}>
                                                                    <TextSub>{sub.name}</TextSub>
                                                                    <BlockCatSub>
                                                                        <ButtonSubCat
                                                                            onClick={() => handleClickSub(sub.id)}
                                                                        >
                                                                            Mais...
                                                                        </ButtonSubCat>
                                                                        <ButtonSubCatSave
                                                                            onClick={() => handleSubCateg(sub.name)}
                                                                        >
                                                                            Salvar
                                                                        </ButtonSubCatSave>
                                                                    </BlockCatSub>
                                                                </BlockSub>
                                                                :
                                                                null
                                                            }
                                                            <br />
                                                        </>
                                                    )
                                                })}
                                            </BlockSub>
                                        </ContainerCategoriesBox>
                                    </ContainerCategories>
                                </ContainerCateroiesProducts>
                            )
                        })}
                    </>
                }
            </GridContainer>
            {modalVisible && (
                <ModalDeleteRelationsCategorys
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    reloadCategorys={findAllRelation}
                    /* @ts-ignore */
                    relation={modalItem}
                />
            )}
        </>
    )
}

export default CategoriesProduct;