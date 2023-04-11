import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { BlockCategory, TextButton } from "../styles";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";


const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
    const { user } = useContext(AuthContext);

    const [loja_id] = useState(user.loja_id);
    const [allFindAsc, setAllFindAsc] = useState<any[]>([]);


    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);

                setAllFindAsc(data.allFindAsc || []);

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [product_id]);

    useEffect(() => {
        async function findLoadRelation() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findIdsRelations?relationProductCategory_id=${''}`);



            } catch (error) {
                console.error(error);
            }
        }
        findLoadRelation();
    }, []);


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <BlockCategory>
                        <Button>
                            <AiOutlinePlusCircle />
                            <Link to={`/produto/novo/categorias/novaCategoriaProduto/${product_id}`} >
                                <TextButton>Cadastre uma nova categoria</TextButton>
                            </Link>
                        </Button>
                    </BlockCategory>
                    {allFindAsc.map((IDRelation) => {
                        return (
                            <>
                                <Card>
                                    <Titulos
                                        tipo="h3"
                                        titulo="NIVEL 1"
                                    />
                                    <br />
                                    <Button
                                        style={{ backgroundColor: 'orange' }}
                                    >
                                        <AiOutlinePlusCircle />
                                        <Link to={`/produto/categorias/newNivel/${product_id}/${IDRelation.id}`} >
                                            <TextButton>Cadastre um novo nivel</TextButton>
                                        </Link>
                                    </Button>
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