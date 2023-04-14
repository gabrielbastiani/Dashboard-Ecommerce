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


const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
    const navigate = useNavigate();

    const [nameProduct, setNameProduct] = useState("");
    const [slug, setSlug] = useState("");
    const [allFindAsc, setAllFindAsc] = useState<any[]>([]);
    const [allRelationIDOrderDesc, setAllRelationIDOrderDesc] = useState<any[]>([]);

    const [orderUpdate, setOrderUpdate] = useState();
    const [iDrelations, setIDrelations] = useState();


    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);

                setAllFindAsc(data.allFindOrderAsc || []);
                setNameProduct(data.findUniqueProduct.nameProduct || "");
                setSlug(data.findUniqueProduct.slug || "");

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [product_id]);

    useEffect(() => {
        async function loadIDsRelations() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findLastIdRelations?relationId=${iDrelations}`);

                setAllRelationIDOrderDesc(data.allRelationIDOrderDesc[0].relationId || []);

            } catch (error) {
                console.error(error);
            }
        }
        loadIDsRelations()
    }, [iDrelations]);

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
                                    </GridDate>
                                </Card>
                            </>
                        )
                    })}
                </Card>
            </Container>
        </Grid>
    )
}

export default ProdutoCategoria;