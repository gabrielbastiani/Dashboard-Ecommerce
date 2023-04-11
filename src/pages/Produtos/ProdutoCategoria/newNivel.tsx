import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/Button";
import { CategoryButton } from "../styles";


const NewNivel: React.FC = () => {

    let { product_id, IDRelation } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loja_id] = useState(user.loja_id);

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();

    const [iDRelationSub, setIDRelationSub] = useState<any[]>([]);

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
            await apiClient.post('/createRelation', {
                product_id: product_id,
                category_id: categorySelected,
                posicao: "",
                order: 0,
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

                setIDRelationSub(data.allFindRelationIDAsc || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadRelation();
    }, [IDRelation]);


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h2"
                        titulo="Escolha uma sub categoria para essa categoria/produto"
                    />
                    <br />
                    <br />
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
                    <br />
                    <Button
                        onClick={handleRelations}
                    >
                        Cadastrar sub categoria
                    </Button>
                    <br />
                    <br />
                    {iDRelationSub.map((item) => {
                        return (
                            <>
                                <Card>
                                    <CategoryButton
                                        style={{ backgroundColor: 'orange' }}
                                        href={`/produto/categorias/newNivel/${product_id}/${item.id}`}
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

export default NewNivel;