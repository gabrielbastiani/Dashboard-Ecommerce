import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TextButton } from "../styles";
import { InputPost } from "../../../components/ui/InputPost";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Modal from 'react-modal';
import { ModalDeleteRelationsCategorys } from "../../../components/popups/ModalDeleteRelationsCategorys";
import { BsTrash } from "react-icons/bs";


export type DeleteRelations = {
    id: string;
}

const NewNivelCategoryProduct: React.FC = () => {

    let { product_id, IDRelation } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loja_id] = useState(user.loja_id);

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();
    const [order, setOrder] = useState(Number);
    const [orderUpdate, setOrderUpdate] = useState();

    const [allRelationIDOrderAsc, setAllRelationIDOrderAsc] = useState<any[]>([]);

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

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            if (categorySelected === null) {
                toast.error('Não deixe a categoria em branco.');
                return;
            }
            await apiClient.post('/createRelation', {
                product_id: product_id,
                category_id: categorySelected,
                posicao: "",
                order: Number(order),
                nivel: 0,
                relationId: IDRelation,
                loja_id: loja_id
            });

            toast.success('Subcategoria cadastrada com sucesso!');

            setTimeout(() => {
                navigate(0);
            }, 2800);

        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria no produto!!!');
            console.log(error);
        }
    }

    useEffect(() => {
        async function findLoadRelation() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findLastIdRelations?relationId=${IDRelation}`);

                setAllRelationIDOrderAsc(data.allRelationIDOrderAsc || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadRelation();
    }, [IDRelation]);

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelation?relationProductCategory_id=${id}`, { order: Number(orderUpdate) });
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

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const { data } = await apiClient.get('/findIdsRelations', {
            params: {
                relationProductCategory_id: id,
            }
        });
        setModalItem(data.findUniqueRelation || "");
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
                            <Titulos
                                tipo="h1"
                                titulo={`Escolha uma subcategoria para essa categoria ${''}`}
                            />
                        </BlockTop>

                        <Etiqueta>Escolha uma subcategoria:</Etiqueta>
                        <Select
                            value={categorySelected}
                            /* @ts-ignore */
                            onChange={handleChangeCategory}
                            opcoes={
                                [
                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                    ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
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
                            onClick={handleRelations}
                        >
                            Cadastrar sub categoria
                        </Button>
                        <br />
                        <br />
                        {allRelationIDOrderAsc.map((item) => {
                            return (
                                <>
                                    <Card>
                                        <Titulos
                                            tipo="h3"
                                            titulo={item.category.categoryName}
                                        />
                                        <GridDate>
                                            <SectionDate>
                                                <Button
                                                    style={{ backgroundColor: 'green' }}
                                                >
                                                    <AiOutlinePlusCircle />
                                                    <Link to={`/produto/categorias/newNivelCategoryProduct/${product_id}/${item.id}`} >
                                                        <TextButton>Cadastre um novo nivel</TextButton>
                                                    </Link>
                                                </Button>
                                            </SectionDate>

                                            <SectionDate>
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
                                </>
                            )
                        })}
                    </Card>
                </Container>
            </Grid>
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
}

export default NewNivelCategoryProduct;