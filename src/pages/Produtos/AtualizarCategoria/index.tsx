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
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";


export type DeleteRelations = {
    id: string;
}

const AtualizarCategoria: React.FC = () => {

    let { product_id } = useParams();
    const navigate = useNavigate();

    const [nameProduct, setNameProduct] = useState("");
    const [slug, setSlug] = useState("");
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
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);

                setAllFindOrderRelationIDAsc(data.allFindOrderRelationIDAsc || []);
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

    async function updateCategory(id: string) {
        try {
            if (categorySelected === "" || categorySelected === null || categorySelected === undefined) {
                toast.error(`Selecione a categoria, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateCategoryIDrelation?relationProductCategory_id=${id}`, { category_id: categorySelected });

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
            await apiClient.put(`/updateStatusRelation?relationProductCategory_id=${id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar o status da relação de categorias.');
        }

        if (status === "Inativo") {
            toast.success(`A relação de categorias se encontra disponivel.`);
            return;
        }

        if (status === "Ativo") {
            toast.error(`A relação de categorias se encontra indisponivel.`);
            return;
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
                            titulo={`Atualizar categoria(s) para - ${nameProduct}`}
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
                                                <Link to={`/produto/atualizar/categorias/updateNivelCategoryProduct/${product_id}/${IDRelation.id}`} >
                                                    <TextButton>Niveis da categorias</TextButton>
                                                </Link>
                                            </Button>
                                        </SectionDate>

                                        <SectionDate >
                                            <BlockDados style={{ marginLeft: "10px" }} >
                                                <TextoDados
                                                    chave={"Categoria"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={IDRelation.category.categoryName}
                                                            handleSubmit={() => updateCategory(IDRelation.id)}
                                                            value={categorySelected}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                    ...(categories || []).map((item) => ({ label: item.categoryName, value: item.id }))
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
                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Status"}
                                                    dados={
                                                        <ButtonSelect
                                                            /* @ts-ignore */
                                                            dado={IDRelation.status}
                                                            handleSubmit={() => updateStatus(IDRelation.id, IDRelation.status)}
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

export default AtualizarCategoria;