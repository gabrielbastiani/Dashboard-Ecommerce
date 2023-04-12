import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { BlockCategory, BlockCategorys, Categ, TextButton } from "../styles";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";


const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
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



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <BlockCategory>
                        <Button
                            style={{ backgroundColor: 'green' }}
                        >
                            <AiOutlinePlusCircle />
                            <Link to={`/produto/novo/categorias/novaCategoriaProduto/${product_id}`} >
                                <TextButton>Cadastre uma nova categoria</TextButton>
                            </Link>
                        </Button>
                    </BlockCategory>

                    <BlockCategorys>
                        {allFindAsc.map((name) => {
                            return (
                                <Categ key={name.id}>{name.category.categoryName} - </Categ>
                            )
                        })}
                    </BlockCategorys>

                    {allFindAsc.map((IDRelation) => {
                        return (
                            <>
                                <Card key={IDRelation.id}>
                                    <Titulos
                                        tipo="h3"
                                        titulo={IDRelation.category.categoryName}
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