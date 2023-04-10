import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";



const ProdutoCategoria: React.FC = () => {

    let { product_id } = useParams();
    const { user } = useContext(AuthContext);

    const [loja_id] = useState(user.loja_id);
    const [order] = useState(0);
    const [posicao] = useState("");

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();

    const [lastID, setLastID] = useState('');
    const [firstId, setFirstId] = useState('');

    const [findFirstProduct, setFindFirstProduct] = useState("");

    const [allRelations, setAllRelations] = useState<any[]>([]);
    const [searchIDs, setSearchIDs] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(1);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const IDnext = searchIDs.map((item) => {
        return item.id
    });

    const IDprev = searchIDs.map((item) => {
        return item.id
    });

    const last = IDnext

    console.log(last)

    useEffect(() => {
        setLastID([...IDnext].shift());
        setFirstId([...IDprev].pop())
    }, [IDnext, IDprev]);


    useEffect(() => {
        async function allCategorys() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/nextBlockRelationCategory?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearchIDs(data.relationsIDs || []);
                setAllRelations(data.relationsIDs || []);

            } catch (error) {
                console.error(error);
            }
        }
        allCategorys();
    }, [currentPage, limit, total]);

    const [showCategory, setShowCategory] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false);

    const showOrHideCategory = () => {
        setShowCategory(!showCategory);
    }

    const showOrHideNewCategory = () => {
        setShowNewCategory(!showNewCategory);
    }


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    async function loadRelations() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/allRelationsProductCategory?product_id=${findFirstProduct}`);
            setTotal(data.length);
        } catch (error) {
            console.log(error);
        }
    }

    async function loadLastID() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/findFirstRelation?product_id=${findFirstProduct}`);
            setLastID(response.data.id);
        } catch (error) {
            console.log(error);
        }
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

    async function loadIDcategory() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.get('/findFirstCategory');
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                posecao: "",
                order: 0,
                nivel: 1,
                relationId: firstId || "",
                loja_id: loja_id
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Categoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar categoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNext() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                posecao: "",
                order: 0,
                nivel: 2,
                relationId: firstId,
                loja_id: loja_id
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Subcategoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNew() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                posecao: "",
                order: 0,
                nivel: 1,
                relationId: "",
                loja_id: loja_id
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Categoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar categoria no produto!!!');
            console.log(error);
        }
    }

    async function handleRelationsNextNew() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                product_id: findFirstProduct,
                category_id: categorySelected,
                posecao: "",
                order: 0,
                nivel: 2,
                relationId: lastID || "",
                loja_id: loja_id
            });

            setTimeout(() => {
                loadIDcategory();
                loadRelations();
                loadLastID();
                toast.success('Subcategoria cadastrada com sucesso!');
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar a subcategoria no produto!!!');
            console.log(error);
        }
    }

    function nextBlock() {
        handleRelationsNext();
        setCurrentPage(currentPage + 1);
    }

    function nextBlockNew() {
        handleRelationsNextNew();
        setCurrentPage(currentPage + 1);
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

                    {pages.map(() => (
                        <>
                            <Card>
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
                                <Button
                                    style={{ backgroundColor: 'orange' }}
                                    onClick={nextBlock}
                                >
                                    Salvar subcategoria
                                </Button>
                            </Card>
                        </>
                    ))}
                </Card>
            </Container>
        </Grid>
    )
}

export default ProdutoCategoria;