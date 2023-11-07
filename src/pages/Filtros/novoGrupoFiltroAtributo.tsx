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
import Warnings from "../../components/Warnings";


const NovoGrupoFiltroAtributo: React.FC = () => {

    const { admin } = useContext(AuthContext);

    const [nameGroup, setNameGroup] = useState('');

    const [type, setType] = useState<any[]>([]);
    const [typeSelected, setTypeSelected] = useState();

    const [categories, setCategories] = useState<any[]>([]);
    const [slugCategory, setSlugCategory] = useState();
    const [order, setOrder] = useState(Number);

    const [storeID] = useState(admin.store_id);

    const [showAtributos, setShowAtributos] = useState(false);

    const showOrHideAtributo = () => {
        setShowAtributos(!showAtributos);
    }

    const [findFirstGroup, setFindFirstGroup] = useState("");

    function handleChangeSlug(e: any) {
        setSlugCategory(e.target.value);
    }

    function handleChangeType(e: any) {
        setTypeSelected(e.target.value);
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
        async function loadTypeAttribute() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allTypeAttributes');
                setType(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadTypeAttribute();
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

    async function handleRegisterGroupAtributos() {
        try {
            if (nameGroup === "") {
                toast.error('Não deixe campo em branco!!!');
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createGroupFilter', {
                nameGroup: nameGroup,
                slugCategory: slugCategory,
                type: typeSelected,
                order: Number(order),
                store_id: storeID
            });

            toast.success('Grupo/Filtro cadastrado com sucesso');

            setNameGroup("");

            loadGroup();
            showOrHideAtributo();

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
                <Warnings />
                {showAtributos ? (
                    <Card>
                        <BlockCategory>
                            <Button
                                style={{ backgroundColor: 'green' }}
                            >
                                <AiOutlinePlusCircle size={25} />
                                <Link to={`/grupoFiltro/atributos/${findFirstGroup}`} >
                                    <TextButton>Clique aqui, para cadastrar os atributos para esse grupo/filtro</TextButton>
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
                                onClick={handleRegisterGroupAtributos}
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
                            <Etiqueta>Tipo do atributo:</Etiqueta>
                            <Select
                                value={typeSelected}
                                /* @ts-ignore */
                                onChange={handleChangeType}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                                        ...(type || []).map((item) => ({ label: item.type, value: item.type }))
                                    ]
                                }
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Ordem:</Etiqueta>
                            <InputPost
                                type="number"
                                placeholder="0"
                                value={order}/* @ts-ignore */
                                onChange={(e) => setOrder(e.target.value)}
                            />
                            <br />
                        </Block>

                        <Block>
                            <Etiqueta>Indique em qual página esse grupo de filtro vai aparecer:</Etiqueta>
                            <Select
                                value={slugCategory}
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

export default NovoGrupoFiltroAtributo;