import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta, ImagensCategorys } from "../styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputPost } from "../../../components/ui/InputPost";
import { BlockDados, TextButton } from "./styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { TextArea } from "../../../components/ui/Input";
import VoltarNavagation from "../../../components/VoltarNavagation";
import noImage from '../../../assets/semfoto.png';
import { Avisos } from "../../../components/Avisos";
import Warnings from "../../../components/Warnings";


const SubCategoria: React.FC = () => {

    let { parentId } = useParams();
    const { admin } = useContext(AuthContext);

    const [storeID] = useState(admin.store_id);

    const [nameCategory, setNameCategory] = useState("");

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(Number);
    const [orderUpdate, setOrderUpdate] = useState();

    const [parentIdCategories, setParentIdCategories] = useState<any[]>([]);

    useEffect(() => {
        async function findLoadRelation() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/parentIDCategoryAll?parentId=${parentId}`);

                setParentIdCategories(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadRelation();
    }, [parentId]);

    async function loadCategorys() {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/parentIDCategoryAll?parentId=${parentId}`);

            setParentIdCategories(response.data || []);

        } catch (error) {
            console.error(error);
        }
    }

    async function handleRegisterCategory() {
        try {
            if (name === '') {
                toast.error('Digite algum nome para sua categoria!');
                return;
            }

            if (storeID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createCategory', {
                name: name,
                description: description,
                order: Number(order),
                nivel: 1,
                parentId: parentId,
                store_id: storeID
            });

            toast.success('Subcategoria cadastrada com sucesso');

            setName('');
            setDescription('');

            loadCategorys();

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function loadDataCategory() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/finduniqueCategory?category_id=${parentId}`);

                setNameCategory(data.name || "");

            } catch (error) {
                console.error(error);
            }
        }
        loadDataCategory();
    }, [parentId]);

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderCategory?category_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem da categoria atualizada com sucesso.');
                loadCategorys();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem da categoria.');
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusCategory?category_id=${id}`);

        } catch (err) {
            toast.error('Ops erro ao ativar a relação de categoria.');
        }

        if (status === "Indisponivel") {
            toast.success(`A subcategoria se encontra ativa.`);
            loadCategorys();
        }

        if (status === "Disponivel") {
            toast.error(`A subcategoria se encontra desativada.`);
            loadCategorys();
        }
    }



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>

                    <VoltarNavagation />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={`Cadastre uma subcategoria para = ${nameCategory}`}
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterCategory}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Nome:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o nome da subcategoria"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Descrição da categoria:</Etiqueta>
                        <TextArea
                            style={{ height: '150px', padding: '15px' }}
                            placeholder="Digite aqui..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                    <br />
                    {parentIdCategories.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há subcategorias cadastradas nessa categoria ainda..."
                            />
                        </>
                    ) :
                        <>
                            {parentIdCategories.map((item, index) => {
                                return (
                                    <Card key={index}>
                                        <Titulos
                                            tipo="h3"
                                            titulo={item.name}
                                        />
                                        <GridDate>
                                            <SectionDate>
                                                {item.imagecategories[0] ? (
                                                    <ImagensCategorys
                                                        src={"http://localhost:3333/files/" + item.imagecategories[0].image}
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
                                                    <Link to={`/categoria/subCategoria/${item.id}`} >
                                                        <TextButton>Cadastre uma<br />nova subcategoria</TextButton>
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
                                                                dado={item.status} /* @ts-ignore */
                                                                handleSubmit={() => updateStatus(item.id, item.status)}
                                                                showElement={item.status}
                                                            />
                                                        }
                                                    />
                                                </BlockDados>
                                            </SectionDate>

                                            <SectionDate
                                                style={{ textAlign: 'center' }}
                                            >
                                                <TextButton>Qtd. de Produtos</TextButton>
                                                <br />
                                                <br />
                                                <TextButton>{String(item.productcategories.length)}</TextButton>
                                            </SectionDate>

                                            <SectionDate>
                                                <Button
                                                    style={{ backgroundColor: '#FB451E', padding: '5px' }}
                                                >
                                                    <Link to={`/categoria/subCategoria/edit/${item.id}`}
                                                    >
                                                        <TextButton>Editar subcategoria</TextButton>
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
    )
}

export default SubCategoria;