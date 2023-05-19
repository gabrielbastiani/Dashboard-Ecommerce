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
import { Avisos } from "../../../components/Avisos";


const CategoryFiltro: React.FC = () => {

    let { groupFilter_id } = useParams();

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [idGroupFilter, setIdGroupFilter] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();
    const [order, setOrder] = useState(Number);
    const [loja_id] = useState(user.loja_id);

    const [loadGruop, setLoadGruop] = useState<any[]>([]);

    function handleChangeCategorie(e: any) {
        setCategorySelected(e.target.value);
    }

    useEffect(() => {
        async function findGroupDate() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueIDGroup?groupFilter_id=${groupFilter_id}`);

                setNameGroup(response.data.nameGroup || "");
                setIdGroupFilter(response.data.id || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findGroupDate();
    }, [groupFilter_id]);

    useEffect(() => {
        async function findGroupDate() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findManyNameFiltroCategory?groupFilter_id=${groupFilter_id}`);

                setLoadGruop(response.data || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findGroupDate();
    }, [groupFilter_id]);

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

    async function handleFiltrosCategoy() {
        const apiClient = setupAPIClient();
        try {
            if (categorySelected === "" || categorySelected === undefined || categorySelected === null) {
                toast.error('Não deixe campos em branco.');
                return;
            }
            await apiClient.post('/createFiltroCategory', {
                groupFilter_id: idGroupFilter,
                categoryName: categorySelected,
                order: Number(order),
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


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <VoltarNavagation />
                        <BlockTop>

                                <Titulos
                                    tipo="h1"
                                    titulo={`Escolha uma categoria/filtro para o grupo = ${nameGroup}`}
                                />
                            
                        </BlockTop>
                        <br />
                        <br />
                        <Etiqueta>Escolha uma categoria:</Etiqueta>
                        <Select
                            value={categorySelected}
                            /* @ts-ignore */
                            onChange={handleChangeCategorie}
                            opcoes={
                                [
                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                    ...(categories || []).map((item) => ({ label: item.categoryName, value: item.categoryName }))
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
                            onClick={handleFiltrosCategoy}
                        >
                            Cadastrar categoria/filtro
                        </Button>
                        <br />
                        <br />
                        {loadGruop.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há filtros cadastrados nesse grupo ainda..."
                                />
                            </>
                        ) :
                            <>
                                {loadGruop.map((item) => {
                                    return (
                                        <>
                                            <Card>
                                                <Titulos
                                                    tipo="h2"
                                                    titulo={item.categoryName}
                                                />
                                                <br />
                                                <br />
                                                <GridDate key={item.id}>

                                                    <SectionDate>
                                                        {item.imageFilterCategory[0] ? (
                                                            <ImagensCategorys
                                                                src={"http://localhost:3333/files/" + item.imageFilterCategory[0].imageCategory}
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
                                                            <Link to={`/filtroCategory/edit/${item.id}`}
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
                            </>
                        }
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default CategoryFiltro;