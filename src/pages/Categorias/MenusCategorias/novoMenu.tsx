import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../styles";
import { Card } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { BlockCategory, TextButton } from "../Categoria/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputPost } from "../../../components/ui/InputPost";
import Select from "../../../components/ui/Select";
import Warnings from "../../../components/Warnings";


const NovoMenu: React.FC = () => {

    const { admin } = useContext(AuthContext);

    const [nameGroup, setNameGroup] = useState('');
    const [selectedPosition, setSelectedPosition] = useState();

    const [categories, setCategories] = useState<any[]>([]);
    const [slugCategory, setSlugCategory] = useState();

    const [storeID] = useState(admin.store_id);

    const [showCategory, setShowCategory] = useState(false);

    const showOrHideCategory = () => {
        setShowCategory(!showCategory);
    }

    const [findFirstMenu, setFindFirstMenu] = useState("");

    function handleChangePosition(e: any) {
        setSelectedPosition(e.target.value);
    }

    function handleChangeSlug(e: any) {
        setSlugCategory(e.target.value);
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

    async function loadMenu() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstMenu');
            setFindFirstMenu(response.data.id || "");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterMenu() {
        try {
            if (nameGroup === '') {
                toast.error('Não deixe o nome do menu em branco!!!')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createMenuCategory', {
                nameGroup: nameGroup,
                slugCategory: slugCategory,
                categoryName: "",
                nivel: 0,
                position: selectedPosition,
                store_id: storeID
            });

            toast.success('Menu cadastrado com sucesso');

            setNameGroup("");

            loadMenu();
            showOrHideCategory();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                {showCategory ? (
                    <Card>
                        <BlockCategory>
                            <Button
                                style={{ backgroundColor: 'green' }}
                            >
                                <AiOutlinePlusCircle size={25} />
                                <Link to={`/menu/${findFirstMenu}`} >
                                    <TextButton>Clique aqui, para cadastrar as categorias para esse menu</TextButton>
                                </Link>
                            </Button>
                        </BlockCategory>
                    </Card>
                ) :
                    <Card>

                        <Voltar url='/menus' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Novo Menu"
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterMenu}
                            >
                                Salvar
                            </Button>
                        </BlockTop>

                        <Block>
                            <Etiqueta>Nome do menu:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome aqui..."
                                value={nameGroup}
                                onChange={(e) => setNameGroup(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Posição desse menu:</Etiqueta>
                            <Select
                                value={selectedPosition}
                                opcoes={
                                    [
                                        { label: "Selecione...", value: "" },
                                        { label: "Menu Topo", value: "Menu Topo" },
                                        { label: "Lateral esquerda", value: "Lateral esquerda" },
                                        { label: "Home Page", value: "Home Page" }
                                    ]
                                }/* @ts-ignore */
                                onChange={handleChangePosition}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Indique em qual página de categoria esse menu vai aparecer:</Etiqueta>
                            <Select
                                value={slugCategory}
                                /* @ts-ignore */
                                onChange={handleChangeSlug}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },
                                        { label: "Neutro", value: "neutro" },/* @ts-ignore */
                                        ...(categories || []).map((item) => ({ label: item.slug, value: item.slug }))
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

export default NovoMenu;