import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import noImage from '../../../assets/semfoto.png';
import { AuthContext } from "../../../contexts/AuthContext";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta, ImagensCategorys } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { BlockDados, TextButton } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";



const AtributosGrupo: React.FC = () => {

    let { groupFilterAtributo_id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loja_id] = useState(user.loja_id);

    const [nameGroup, setNameGroup] = useState("");
    const [slugCategoryOrItem, setSlugCategoryOrItem] = useState("");
    const [atributos, setAtributos] = useState<any[]>([]);
    const [atributosSelected, setAtributosSelected] = useState();
    const [order, setOrder] = useState(Number);
    const [itemName, setItemName] = useState("");
    const [nameItem, setNameItem] = useState("");

    const [LoadIDGroup, setLoadIDGroup] = useState<any[]>([]);


    function handleChangeAtributos(e: any) {
        setAtributosSelected(e.target.value);
    }

    useEffect(() => {
        async function findGroupDate() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/filterUniqueGroup?groupFilterAtributo_id=${groupFilterAtributo_id}`);

                setNameGroup(response.data.nameGroup || "");
                setNameItem(response.data.itemName || "");
                setSlugCategoryOrItem(response.data.slugCategoryOrItem || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findGroupDate();
    }, [groupFilterAtributo_id]);

    useEffect(() => {
        async function loadAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allAtributos');
                setAtributos(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAtributos();
    }, []);

    async function handleFiltrosAtributos() {
        const apiClient = setupAPIClient();
        try {
            if (atributosSelected === "") {
                toast.error('Não deixe campos em branco.');
                return;
            }
            await apiClient.post('/createFilter', {
                nameGroup: nameGroup,
                itemName: itemName,
                atributo_id: atributosSelected,
                groupId: groupFilterAtributo_id,
                slugCategoryOrItem: slugCategoryOrItem,
                order: Number(order),
                nivel: 1,
                loja_id: loja_id
            });

            toast.success('Filtro cadastrado com sucesso no grupo!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar o filtro atributo no grupo!!!');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function findLoadIDGroup() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findIDGroupFilter?groupId=${groupFilterAtributo_id}`);

                setLoadIDGroup(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadIDGroup();
    }, [groupFilterAtributo_id]);




    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <VoltarNavagation />
                        <BlockTop>

                            {nameItem ? (
                                <Titulos
                                    tipo="h1"
                                    titulo={`Insira novos atributos/filtros em = ${nameItem}`}
                                />
                            ) :
                                <Titulos
                                    tipo="h1"
                                    titulo={`Escolha uma atributos/filtros para o grupo = ${nameGroup}`}
                                />
                            }

                        </BlockTop>

                        <Etiqueta>Escolha um valor de atributo:</Etiqueta>
                        <Select
                            value={atributosSelected}
                            /* @ts-ignore */
                            onChange={handleChangeAtributos}
                            opcoes={
                                [
                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                    ...(atributos || []).map((item) => ({ label: item.valor, value: item.id }))
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
                            onClick={handleFiltrosAtributos}
                        >
                            Cadastrar atributo/filtro
                        </Button>
                        <br />
                        <br />
                        {LoadIDGroup.map((item) => {
                            return (
                                <>
                                    <Card>
                                        <Titulos
                                            tipo="h2"
                                            titulo={item.atributo.valor}
                                        />
                                        <br />
                                        <br />
                                        <GridDate key={item.id}>

                                            <SectionDate>
                                                {item.imageAtributoGroups[0] ? (
                                                    <ImagensCategorys
                                                        src={"http://localhost:3333/files/" + item.imageAtributoGroups[0].imageAtributo}
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
                                                    <Link to={`/grupo/filtroAtributo/edit/${item.id}`}
                                                    >
                                                        <TextButton>Editar filtro</TextButton>
                                                    </Link>
                                                </Button>
                                            </SectionDate>
                                        </GridDate>
                                    </Card>
                                </>
                            )
                        })}
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default AtributosGrupo;