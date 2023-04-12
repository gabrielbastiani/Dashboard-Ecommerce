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
import { BsTrash } from "react-icons/bs";
import Modal from 'react-modal';
import { ModalDeleteRelacaoCategoryDelete } from "../../../components/popups/ModalDeleteRelacaoCategoryDelete";


export type DeleteRelation = {
    id: string;
}

const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
    const navigate = useNavigate();

    const [nameProduct, setNameProduct] = useState("");
    const [slug, setSlug] = useState("");
    const [allFindAsc, setAllFindOrderAsc] = useState<any[]>([]);

    const [orderUpdate, setOrderUpdate] = useState();

    const [modalItem, setModalItem] = useState<DeleteRelation[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    

    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);

                setAllFindOrderAsc(data.allFindOrderAsc || []);
                setNameProduct(data.findUniqueProduct.nameProduct || "");
                setSlug(data.findUniqueProduct.slug || "");

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [product_id]);

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
        const responseData = await apiClient.get('/findAllExactRelationID', {
            params: {
                relationProductCategory_id: id,
            }
        });
        setModalItem(responseData.data || []);
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

                    {allFindAsc.map((IDRelation) => {
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
                                                <Link to={`/produto/categorias/newNivel/${product_id}/${IDRelation.id}`} >
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
                                                style={{ cursor: 'pointer' }}
                                                onClick={ () => handleOpenModalDelete(IDRelation.id)}
                                                size={32}
                                                color="red"
                                            />
                                        </SectionDate>
                                        
                                    </GridDate>
                                </Card>

                                {modalVisible && (
                                    <ModalDeleteRelacaoCategoryDelete
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

export default ProdutoCategoria;