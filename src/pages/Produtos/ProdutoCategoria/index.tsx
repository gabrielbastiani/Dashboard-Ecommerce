import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import { CategoryButton } from "../styles";
import Titulos from "../../../components/Titulos";



const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
    const { user } = useContext(AuthContext);

    const [loja_id] = useState(user.loja_id);

    const [lastID, setLastID] = useState('');
    const [firstId, setFirstId] = useState('');

    const [allFindAsc, setAllFindAsc] = useState<any[]>([]);
    const [allFindDesc, setAllFindDesc] = useState<any[]>([]);

    const IDnext = allFindDesc.map((item) => {
        return item.id
    });

    const IDprev = allFindDesc.map((item) => {
        return item.id
    });

    useEffect(() => {
        setLastID([...IDnext].shift());
        setFirstId([...IDprev].pop());
    }, [IDnext, IDprev]);

    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);

                setAllFindAsc(data.allFindAsc || []);
                setAllFindDesc(data.allFindDesc || []);

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

    const [showCategorys, setShowCategorys] = useState(false);

    const showOrHideCategory = () => {
        setShowCategorys(!showCategorys);
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <CategoryButton
                        style={{ backgroundColor: 'green' }}
                        href={`/produto/novo/categorias/novaCategoriaProduto/${product_id}`}
                    >
                        Cadastre uma nova categoria
                    </CategoryButton>
                    {allFindAsc.map((IDRelation) => {
                        return (
                            <>
                                <Card>
                                    <Titulos
                                        tipo="h3"
                                        titulo="NIVEL 1"                                    
                                    />
                                    <br />
                                    <CategoryButton
                                        style={{ backgroundColor: 'orange' }}
                                        href={`/produto/categorias/newNivel/${product_id}/${IDRelation.id}`}
                                    >
                                        Cadastre um novo nivel
                                    </CategoryButton>
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