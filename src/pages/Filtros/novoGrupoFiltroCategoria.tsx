import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import { BlockCategory, TextButton } from "../Categorias/Categoria/styles";
import { Button } from "../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Voltar from "../../components/Voltar";
import { Block, BlockTop, Etiqueta } from "../Categorias/styles";
import Titulos from "../../components/Titulos";
import { InputPost } from "../../components/ui/InputPost";
import Select from "../../components/ui/Select";



const NovoGrupoFiltroCategoria: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [nameGroup, setNameGroup] = useState('');

    const [categories, setCategories] = useState<any[]>([]);
    const [slugCategoryOrItem, setSlugCategoryOrItem] = useState();

    const [lojaID] = useState(user.loja_id);

    const [showCategories, setShowCategories] = useState(false);

    const showOrHideCategory = () => {
        setShowCategories(!showCategories);
    }

    const [findFirstGroup, setFindFirstGroup] = useState("");

    function handleChangeSlug(e: any) {
        setSlugCategoryOrItem(e.target.value);
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

    async function loadGroup() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/filterFirstGroupFiltro');
            setFindFirstGroup(response.data.id || "");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterGroupCategory() {
        try {
            if (nameGroup === "") {
                toast.error('Não deixe campo em branco!!!');
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createGroupFilter', {
                nameGroup: nameGroup,
                slugCategoryOrItem: slugCategoryOrItem,
                loja_id: lojaID
            });

            toast.success('Grupo/Filtro cadastrado com sucesso');

            setNameGroup("");

            loadGroup();
            showOrHideCategory();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao cadastrar o grupo.");
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>

                {showCategories ? (
                    <Card>
                        <BlockCategory>
                            <Button
                                style={{ backgroundColor: 'green' }}
                            >
                                <AiOutlinePlusCircle size={25} />
                                <Link to={`/grupoFiltro/categorias/${findFirstGroup}`} >
                                    <TextButton>Clique aqui, para cadastrar as categorias para esse grupo/filtro</TextButton>
                                </Link>
                            </Button>
                        </BlockCategory>
                    </Card>
                ) :
                    <Card>

                        <Voltar url='/filterGrupos' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Novo Grupo/Filtro"
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterGroupCategory}
                            >
                                Salvar
                            </Button>
                        </BlockTop>

                        <Block>
                            <Etiqueta>Nome do grupo/filtro:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome aqui..."
                                value={nameGroup}
                                onChange={(e) => setNameGroup(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Indique em qual página esse grupo de filtro vai aparecer:</Etiqueta>
                            <Select
                                value={slugCategoryOrItem}
                                /* @ts-ignore */
                                onChange={handleChangeSlug}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
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

export default NovoGrupoFiltroCategoria;