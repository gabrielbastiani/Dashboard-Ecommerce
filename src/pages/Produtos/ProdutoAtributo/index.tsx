import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../../Categorias/styles";
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


export type DeleteRelations = {
    id: string;
}

const ProdutoAtributo: React.FC = () => {

    let { variacao_id, product_id } = useParams();
    const navigate = useNavigate();

    const [nameProduct, setNameProduct] = useState("");
    const [allFindOrderRelationIDAsc, setAllFindOrderRelationIDAsc] = useState<any[]>([]);

    const [orderUpdate, setOrderUpdate] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/allAtributosProductRelation?variacao_id=${variacao_id}`);

                setAllFindOrderRelationIDAsc(response.data || []);
                setNameProduct(response.data.product.nameProduct || "");

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [variacao_id]);

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelationProductAtributo?relationProductAtributo_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem do atributo atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do atributo.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueRelationAtributoProduct', {
            params: {
                relationProductCategory_id: id,
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
                            titulo={`Cadastro de categoria para - ${nameProduct}`}
                        />
                        <Button
                            style={{ backgroundColor: 'green' }}
                        >
                            <AiOutlinePlusCircle />
                            <Link to={`/produto/novo/categorias/novaCategoriaProduto/${product_id}`} >
                                <TextButton>Cadastre uma nova categoria</TextButton>
                            </Link>
                        </Button>
                    </BlockTop>

                    {allFindOrderRelationIDAsc.map((IDRelation) => {
                        return (
                            <>
                                <Card key={IDRelation.id}>
                                    <Titulos
                                        tipo="h3"
                                        titulo={IDRelation.category.categoryName}
                                    />

                                    <GridDate>
                                        <SectionDate>
                                            <Button
                                                style={{ backgroundColor: 'orange' }}
                                            >
                                                <AiOutlinePlusCircle />
                                                <Link to={`/produto/categorias/newNivelCategoryProduct/${product_id}/${IDRelation.id}`} >
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
                                                            dado={String(IDRelation.order)}
                                                            type="number"
                                                            /* @ts-ignore */
                                                            placeholder={String(IDRelation.order)}
                                                            value={orderUpdate}
                                                            /* @ts-ignore */
                                                            onChange={(e) => setOrderUpdate(e.target.value)}
                                                            handleSubmit={() => updateOrder(IDRelation.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>
                                        </SectionDate>

                                        <SectionDate>
                                            <BsTrash
                                                onClick={() => handleOpenModalDelete(IDRelation.id)}
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

export default ProdutoAtributo;