import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { TextButton } from "../styles";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { toast } from "react-toastify";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import Modal from 'react-modal';
import { ModalDeleteRelationsCategorys } from "../../../components/popups/ModalDeleteRelationsCategorys";
import { BsTrash } from "react-icons/bs";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { AuthContext } from "../../../contexts/AuthContext";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";


export type DeleteRelations = {
    id: string;
}

const AtualizarCategoria: React.FC = () => {

    let { product_id } = useParams();
    const navigate = useNavigate();

    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [order, setOrder] = useState(Number);

    const [allFindOrderRelationIDAsc, setAllFindOrderRelationIDAsc] = useState<any[]>([]);

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();

    const [orderUpdate, setOrderUpdate] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

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

    useEffect(() => {
        async function findDataProduct() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueProduct?product_id=${product_id}`);

                setName(response.data.name || "");
                setSlug(response.data.slug || "");

            } catch (error) {
                console.error(error);
            }
        }
        findDataProduct();
    }, [product_id]);

    useEffect(() => {
        async function findAllRelation() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findAllRelationsProductAndCategory?product_id=${product_id}`);

                setAllFindOrderRelationIDAsc(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findAllRelation();
    }, [product_id]);

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelation?productCategory_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem da categoria atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 2800);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria.');
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

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a categoria.');
        }
    }

    async function updateStatus(id: string, status: string) {
        console.log(id)
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusCategoryProduct?productCategory_id=${id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

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

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            /* @ts-ignore */
            console.log(error.response.data);
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



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Link to={`/produto/${slug}/${product_id}`} >
                        <Button>
                            Voltar para o produto
                        </Button>
                    </Link>
                    <br />
                    <br />
                    <br />
                    <br />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={`Atualizar categoria(s) para - ${name}`}
                        />

                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRelations}
                        >
                            Salvar categoria no produto
                        </Button>
                    </BlockTop>

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

                    {allFindOrderRelationIDAsc.map((item) => {
                        return (
                            <>
                                <Card key={item.id}>
                                    <Titulos
                                        tipo="h2"
                                        titulo={item.category.name}
                                    />

                                    <GridDate>
                                        <SectionDate >
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
                                        </SectionDate>

                                        <SectionDate>
                                            <BlockDados style={{ marginLeft: "40px" }} >
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
                                            </BlockDados>
                                        </SectionDate>

                                        <SectionDate>
                                            <BsTrash
                                                onClick={() => handleOpenModalDelete(item.id)}
                                                style={{ cursor: 'pointer' }}
                                                color="red"
                                                size={35}
                                            />
                                        </SectionDate>

                                    </GridDate>
                                </Card>
                                {modalVisible && (
                                    <ModalDeleteRelationsCategorys
                                        isOpen={modalVisible}
                                        onRequestClose={handleCloseModalDelete}
                                        /* @ts-ignore */
                                        relation={modalItem}
                                    />
                                )}
                            </>
                        )
                    })}
                </Card>
            </Container>
        </Grid>
    )
}

export default AtualizarCategoria;