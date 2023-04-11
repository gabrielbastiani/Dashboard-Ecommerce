import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { InputPost } from "../../../components/ui/InputPost";



const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
    const { user } = useContext(AuthContext);

    const [loja_id] = useState(user.loja_id);
    const [order, setOrder] = useState(Number);

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();

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


    console.log(firstId)


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

                setAllFindAsc(data.allFindAsc || []);
                setAllFindDesc(data.allFindDesc || []);

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [product_id]);

    async function loadRelationsProducts() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);

            setAllFindAsc(data.allFindAsc || []);

        } catch (error) {
            console.error(error);
        }
    }

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: product_id,
                category_id: categorySelected,
                posicao: "",
                order: 0,
                nivel: 1,
                relationId: "",
                loja_id: loja_id
            });

            toast.success('Categoria cadastrada com sucesso!');
            loadRelationsProducts();

        } catch (error) {
            toast.error('Erro ao cadastrar categoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNext() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: product_id,
                category_id: categorySelected,
                posicao: "",
                order: Number(order),
                nivel: 2,
                relationId: firstId,
                loja_id: loja_id
            });

            toast.success('Subcategoria cadastrada com sucesso!');
            loadRelationsProducts();

        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria no produto!!!');
            console.log(error);
        }
    }

   
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h2"
                        titulo="Escolha uma categoria para esse produto"
                    />
                    <br />
                    <br />
                    <Etiqueta>Escolha uma categoria:</Etiqueta>
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
                    <Button
                        style={{ backgroundColor: 'green' }}
                        onClick={handleRelations}
                    >
                        Salvar com essa categoria
                    </Button>

                    {allFindAsc.map((relation) => {
                        return (
                            <>
                                <Card key={relation.id}>
                                    <Titulos
                                        tipo="h2"
                                        titulo="Escolha uma sub categoria para esse produto"
                                    />
                                    <br />
                                    <br />
                                    <Etiqueta>Escolha uma categoria já existente:</Etiqueta>
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
                                            type="number"/* @ts-ignore */
                                            value={Number(order)}/* @ts-ignore */
                                            placeholder="0"/* @ts-ignore */
                                            onChange={ (e) => setOrder(e.target.value) }
                                        />
                                    </Block>
                                    <br />
                                    <Button
                                        style={{ backgroundColor: 'orange' }}/* @ts-ignore */
                                        onClick={() => handleRelationsNext()}
                                    >
                                        Salvar subcategoria
                                    </Button>
                                    <br />
                                    <br />
                                    <br />
                                    <Button
                                    /* @ts-ignore */
                                    /* onClick={ () => handleRelationsNext(relation.id)} *///-- AQUI ABRIR UMA NOVA TELA? //
                                    >
                                        Novo nivel
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