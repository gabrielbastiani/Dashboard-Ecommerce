import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Voltar from "../../../components/Voltar";
import { InputPost } from "../../../components/ui/InputPost";
import { BlockDados, TextButton } from "./styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";



const NewNivelCategory: React.FC = () => {

    let { IDRelation } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [lojaID] = useState(user.loja_id);

    const [categoryName, setCategoryName] = useState('');
    const [order, setOrder] = useState(Number);
    const [orderUpdate, setOrderUpdate] = useState();

    const [categoryID, setCategoryID] = useState("");

    const [allRelationIDOrderAsc, setAllRelationIDOrderAsc] = useState<any[]>([]);

    const [buttonRelation, setButtonRelation] = useState(false);

    const showButton = () => {
        setButtonRelation(!buttonRelation);
    }


    async function loadCategory() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstCategory');
            setCategoryID(response.data.id);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterCategory() {
        try {
            if (categoryName === '') {
                toast.error('Digite algum nome para sua categoria!');
                return;
            }

            if (lojaID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                categoryName: categoryName.replace(/[/]/g, "-"),
                posicao: "",
                order: 0,
                loja_id: lojaID
            })

            setCategoryName('');

            setTimeout(() => {
                loadCategory();
                showButton();
            }, 2000);

        } catch (error) {
            console.log(error)
        }
    }

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                category_id: categoryID,
                posicao: "",
                order: Number(order),
                nivel: 0,
                relationId: IDRelation,
                loja_id: lojaID
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

                setAllRelationIDOrderAsc(data.allRelationIDOrderAsc || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadRelation();
    }, [IDRelation]);

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelation?relationProductCategory_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem da categoria atualizada com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 2800);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria.');
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusRelation?relationProductCategory_id=${id}`);

        } catch (err) {
            toast.error('Ops erro ao ativar a relação de categoria.');
        }

        if (status === "Inativo") {
            toast.success(`A relação de categoria se encontra ativa.`);
            setTimeout(() => {
                navigate(0);
            }, 2000);
            return;
        }

        if (status === "Ativo") {
            toast.error(`A relação de categoria se encontra inativa.`);
            setTimeout(() => {
                navigate(0);
            }, 2000);
            return;
        }
    }



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Voltar
                        url={`/categorias`}
                    />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={`Cadastre uma categoria`}
                        />
                    </BlockTop>

                    <Block>
                        <Etiqueta>Nome:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Block>
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
                    {buttonRelation ? (
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRelations}
                        >
                            Confirme
                        </Button>
                    ) :
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'orange' }}
                            onClick={handleRegisterCategory}
                        >
                            Salvar
                        </Button>
                    }
                    <br />
                    <br />
                    {allRelationIDOrderAsc.map((item) => {
                        return (
                            <>
                                <Card>
                                    <Titulos
                                        tipo="h3"
                                        titulo={item.category.categoryName}
                                    />
                                    <GridDate>
                                        <SectionDate>
                                            <Button
                                                style={{ backgroundColor: 'green' }}
                                            >
                                                <AiOutlinePlusCircle />
                                                <Link to={`/categoria/newNivel/${item.id}`} >
                                                    <TextButton>Cadastre um novo nivel</TextButton>
                                                </Link>
                                            </Button>
                                        </SectionDate>

                                        <SectionDate>
                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Ordem"}
                                                    dados={
                                                        <InputUpdate
                                                            dado={String(item.order)}
                                                            type="number"
                                                            /* @ts-ignore */
                                                            placeholder={String(item.order)}
                                                            value={orderUpdate}
                                                            /* @ts-ignore */
                                                            onChange={(e) => setOrderUpdate(e.target.value)}
                                                            handleSubmit={() => updateOrder(item.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>
                                        </SectionDate>

                                        <SectionDate>
                                            <BlockDados>
                                                <TextoDados
                                                    chave={"Status"}
                                                    dados={
                                                        <ButtonSelect
                                                            /* @ts-ignore */
                                                            dado={item.status}/* @ts-ignore */
                                                            handleSubmit={() => updateStatus(item.id, item.status)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>
                                        </SectionDate>
                                    </GridDate>
                                </Card>
                            </>
                        )
                    })}
                </Card>
            </Container>
        </Grid>
    )
}

export default NewNivelCategory;