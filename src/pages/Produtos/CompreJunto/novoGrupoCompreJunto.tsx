import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputPost } from "../../../components/ui/InputPost";
import Select from "../../../components/ui/Select";
import { Block, BlockTop, Etiqueta } from "../../Categorias/styles";
import { BlockCategory, TextButton } from "../styles";
import Warnings from "../../../components/Warnings";


const NovoGrupoCompreJunto: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const [storeID] = useState(admin.store_id);

    const [findFirstMenu, setFindFirstMenu] = useState("");

    const [nameGroup, setNameGroup] = useState('');

    const [products, setProducts] = useState<any[]>([]);
    const [productsSelected, setProductsSelected] = useState();

    const [findProduct, setFindProduct] = useState("");

    const [showProducts, setShowProducts] = useState(false);

    const showProductsOrHide = () => {
        setShowProducts(!showProducts);
    }

    function handleChangeProducts(e: any) {
        setProductsSelected(e.target.value);
    }

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allProductsStore');
                setProducts(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadProducts();
    }, []);

    async function loadMenu() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstGroupBuyTogether');
            setFindFirstMenu(response.data.id || "");
            setFindProduct(response.data.product_id || "");
        } catch (error) {
            console.log(error);
        }
    }

    async function buyAndProduct() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateAllDateProduct?product_id=${findProduct}`,
                {buyTogether_id: findFirstMenu}
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterGrupo() {
        try {
            if (nameGroup === '') {
                toast.error('Não deixe o nome do grupo em branco!!!')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createBuyTogether', {
                nameGroup: nameGroup,
                product_id: productsSelected,
                nivel: 0,
                store_id: storeID
            });

            toast.success('Grupo compre junto cadastrado no produto com sucesso!!!');

            setNameGroup("");

            loadMenu();
            showProductsOrHide();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o grupo');
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                {showProducts ? (
                    <Card>
                        <BlockCategory>
                            <Button
                                style={{ backgroundColor: 'green' }}
                            >
                                <AiOutlinePlusCircle size={25} />
                                <Link to={`/compreJunto/grupo/${findFirstMenu}`} >
                                    <TextButton
                                        onClick={buyAndProduct}
                                    >
                                        Clique aqui, para cadastrar os produtos para esse grupo
                                    </TextButton>
                                </Link>
                            </Button>
                        </BlockCategory>
                    </Card>
                ) :
                    <Card>

                        <Voltar url='/compreJunto' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Novo Grupo Compre Junto"
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterGrupo}
                            >
                                Salvar
                            </Button>
                        </BlockTop>

                        <Block>
                            <Etiqueta>Nome do grupo compre junto:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome aqui..."
                                value={nameGroup}
                                onChange={(e) => setNameGroup(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Escolha:</Etiqueta>
                            <Select
                                value={productsSelected}
                                /* @ts-ignore */
                                onChange={handleChangeProducts}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                        ...(products || []).map((item) => ({ label: item.name, value: item.id }))
                                    ]
                                }
                            />
                            <br />
                        </Block>

                    </Card>
                }
            </Container>
        </Grid>
    )

}

export default NovoGrupoCompreJunto;