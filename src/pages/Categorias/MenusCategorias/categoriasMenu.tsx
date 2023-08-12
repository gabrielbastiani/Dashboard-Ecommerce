import { useContext, useEffect, useState } from "react";
import noImage from '../../../assets/semfoto.png';
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta, ImagensCategorys } from "../styles";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BlockDados, TextButton } from "../Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { Avisos } from "../../../components/Avisos";


const CategoriasMenu: React.FC = () => {

    let { menuCategory_id } = useParams();
    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [store_id] = useState(admin.store_id);

    const [nameGroup, setNameGroup] = useState("");
    const [position, setPosition] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState("");
    const [order, setOrder] = useState(Number);
    const [categoryName, setCategoryName] = useState("");

    const [loadIDMenu, setloadIDMenu] = useState<any[]>([]);

    const valueArray = categorySelected.split(",");


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    useEffect(() => {
        async function findGroupDate() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueMenu?menuCategory_id=${menuCategory_id}`);

                setNameGroup(response.data.nameGroup || "");
                setCategoryName(response.data.categoryName || "");
                setPosition(response.data.position || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findGroupDate();
    }, [menuCategory_id]);

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

    async function handleGroupCategories() {
        const apiClient = setupAPIClient();
        try {
            if (categorySelected === undefined || categorySelected === null || categorySelected === "") {
                toast.error('Não deixe campos em branco.');
                return;
            }
            await apiClient.post('/createMenuCategory', {
                nameGroup: nameGroup,
                categoryName: valueArray[1],
                name: valueArray[1],
                parentId: menuCategory_id,
                position: position,
                order: Number(order),
                nivel: 1,
                store_id: store_id
            });

            toast.success('Item de categoria cadastrada com sucesso no menu!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar o item categoria no menu!!!');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function findLoadIDMenu() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findMenuID?parentId=${menuCategory_id}`);

                setloadIDMenu(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadIDMenu();
    }, [menuCategory_id]);




    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <VoltarNavagation />
                        <BlockTop>

                            {categoryName ? (
                                <Titulos
                                    tipo="h1"
                                    titulo={`Insira novas categorias em = ${categoryName}`}
                                />
                            ) :
                                <Titulos
                                    tipo="h1"
                                    titulo={`Escolha uma categoria para o menu = ${nameGroup}`}
                                />
                            }

                        </BlockTop>

                        <Etiqueta>Escolha uma categoria:</Etiqueta>
                        <Select
                            value={categorySelected}
                            /* @ts-ignore */
                            onChange={handleChangeCategory}
                            opcoes={
                                [
                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                    ...(categories || []).map((item) => ({ label: item.name, value: [item.id, item.name] }))
                                ]
                            }
                        />
                        <br />
                        <Block>
                            <Etiqueta>Ordem:</Etiqueta>
                            <InputPost
                                type="number"
                                placeholder="0"
                                value={order}/* @ts-ignore */
                                onChange={(e) => setOrder(e.target.value)}
                            />
                        </Block>
                        <br />
                        <Button
                            onClick={handleGroupCategories}
                        >
                            Cadastrar categoria
                        </Button>
                        <br />
                        <br />
                        {loadIDMenu.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há categorias cadastrados nesse menu ainda..."
                                />
                            </>
                        ) :
                            <>
                                {loadIDMenu.map((item, index) => {
                                    return (
                                        <Card key={index}>
                                            <Titulos
                                                tipo="h3"
                                                titulo={item.categoryName}
                                            />

                                            <GridDate key={item.id}>

                                                <SectionDate>
                                                    {item.imagemenucategories[0] ? (
                                                        <ImagensCategorys
                                                            src={"http://localhost:3333/files/" + item.imagemenucategories[0].image}
                                                            width={170}
                                                            height={80}
                                                        />
                                                    ) :
                                                        <ImagensCategorys
                                                            src={noImage}
                                                            width={170}
                                                            height={80}
                                                        />
                                                    }
                                                </SectionDate>

                                                <SectionDate>
                                                    <Button
                                                        style={{ backgroundColor: 'green' }}
                                                    >
                                                        <AiOutlinePlusCircle />
                                                        <Link to={`/menu/${item.id}`} >
                                                            <TextButton>Item</TextButton>
                                                        </Link>
                                                    </Button>
                                                </SectionDate>

                                                <SectionDate>
                                                    <BlockDados>
                                                        <TextoDados
                                                            chave={"Ordem"}
                                                            dados={item.order}
                                                        />
                                                    </BlockDados>
                                                </SectionDate>

                                                <SectionDate>
                                                    <BlockDados>
                                                        <TextoDados
                                                            chave={"Ativo?"}
                                                            dados={item.status}
                                                        />
                                                    </BlockDados>
                                                </SectionDate>

                                                <SectionDate>
                                                    <Button
                                                        style={{ backgroundColor: '#FB451E', padding: '5px' }}
                                                    >
                                                        <Link to={`/menu/categoriaMenu/edit/${item.id}`}
                                                        >
                                                            <TextButton>Editar item</TextButton>
                                                        </Link>
                                                    </Button>
                                                </SectionDate>
                                            </GridDate>
                                        </Card>
                                    )
                                })}
                            </>
                        }
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default CategoriasMenu;