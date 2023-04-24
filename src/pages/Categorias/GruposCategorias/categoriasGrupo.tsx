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
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { BsTrash } from "react-icons/bs";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import Modal from 'react-modal';
import { DivisorHorizontal } from "../../../components/ui/DivisorHorizontal";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ModalDeleteGroup } from "../../../components/popups/ModalDeleteGroup";


export type DeleteGroups = {
    groupCategoy_id: string;
}

const CategoriasGrupo: React.FC = () => {

    let { groupCategoy_id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loja_id] = useState(user.loja_id);

    const [categories, setCategories] = useState<any[]>([]);
    const [categorySelected, setCategorySelected] = useState();
    const [order, setOrder] = useState(Number);
    const [itemName, setItemName] = useState("");

    const [nameGroup, setNameGroup] = useState("");
    const [posicao, setPosicao] = useState([]);
    const [posicaoSelected, setPosicaoSelected] = useState();

    const [LoadIDGroup, setLoadIDGroup] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState<DeleteGroups>();
    const [modalVisible, setModalVisible] = useState(false);


    function handleChangeCategory(e: any) {
        setCategorySelected(e.target.value)
    }

    function handleChangePosicao(e: any) {
        setPosicaoSelected(e.target.value)
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
        async function findDdatesGroups() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueGroup?groupCategoy_id=${groupCategoy_id}`);

                setNameGroup(response.data.nameGroup || "");
                setPosicao(response.data.posicao || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findDdatesGroups();
    }, [groupCategoy_id]);

    async function handleGroupCategories() {
        const apiClient = setupAPIClient();
        try {
            if (categorySelected === "") {
                toast.error('Não deixe a categoria em branco.');
                return;
            }
            await apiClient.post('/group', {
                nameGroup: "",
                itemName: itemName,
                category_id: categorySelected,
                groupId: groupCategoy_id,
                posicao: "",
                order: Number(order),
                nivel: 1,
                loja_id: loja_id
            });

            toast.success('Item de categoria cadastrada com sucesso no grupo!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Erro ao cadastrar o item categoria no grupo!!!');
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function findLoadIDGroup() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findGroupID?groupId=${groupCategoy_id}`);

                setLoadIDGroup(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findLoadIDGroup();
    }, [groupCategoy_id]);

    async function updateNameGroup() {
        try {
            const apiClient = setupAPIClient();
            if (nameGroup === "") {
                toast.error('Não deixe o nome do grupo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameGroup?groupCategoy_id=${groupCategoy_id}`, { nameGroup: nameGroup });

                toast.success('Nome do grupo atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do grupo.');
        }
    }

    async function updatePosicao() {
        try {
            if (posicaoSelected === "") {
                toast.error(`Selecione a posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePosicaoGroup?groupCategoy_id=${groupCategoy_id}`, { posicao: posicaoSelected });
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function updateCategory(id: string) {
        try {
            if (categorySelected === "") {
                toast.error(`Selecione a categoria, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateCategoryGroup?groupCategoy_id=${id}`, { category_id: categorySelected });

            toast.success('Categoria atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a categoria.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(groupCategoy_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueGroup', {
            params: {
                groupCategoy_id: groupCategoy_id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');



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
                                titulo="Escolha uma categoria/item para o grupo"
                            />

                            <Button
                                style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                onClick={() => handleOpenModalDelete(groupCategoy_id)}
                            >
                                Remover grupo
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Atualizar nome do grupo"}
                                dados={
                                    <InputUpdate
                                        dado={nameGroup}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={nameGroup}
                                        value={nameGroup}
                                        /* @ts-ignore */
                                        onChange={(e) => setNameGroup(e.target.value)}
                                        handleSubmit={updateNameGroup}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Atualizar posição do grupo"}
                                dados={
                                    <SelectUpdate
                                        dado={posicao}
                                        value={posicaoSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangePosicao}
                                        opcoes={
                                            [
                                                { label: "Menu Topo", value: "Menu Topo" },
                                                { label: "Lateral esquerda", value: "Lateral esquerda" }
                                            ]
                                        }
                                        handleSubmit={updatePosicao}
                                    />
                                }
                            />
                        </BlockDados>

                        <DivisorHorizontal />

                        <Block>
                            <Etiqueta>Nome da categoria ou item:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome aqui..."
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Block>

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
                        {LoadIDGroup.map((item) => {
                            return (
                                <>
                                    <Card>
                                        <Titulos
                                            tipo="h3"
                                            titulo={item.itemName}
                                        />

                                        <GridDate>

                                            <SectionDate>
                                                {item.imagegroupcategories[0] ? (
                                                    <ImagensCategorys
                                                        src={"http://localhost:3333/files/" + item.imagegroupcategories[0].imageGroup}
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
                                                    <Link to={`/grupo/${item.id}`} >
                                                        <TextButton>Cadastre item</TextButton>
                                                    </Link>
                                                </Button>
                                            </SectionDate>

                                            <SectionDate>
                                                <BlockDados>
                                                    <TextoDados
                                                        chave={"Categoria"}
                                                        dados={item.category.categoryName}
                                                    />
                                                </BlockDados>
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
                                                    <Link to={`/grupo/item/edit/${item.id}`}
                                                    >
                                                        <TextButton>Editar item</TextButton>
                                                    </Link>
                                                </Button>
                                            </SectionDate>
                                        </GridDate>
                                    </Card>
                                    {modalVisible && (
                                        <ModalDeleteGroup
                                            isOpen={modalVisible}
                                            onRequestClose={handleCloseModalDelete}
                                            /* @ts-ignore */
                                            groupId={modalItem}
                                        />
                                    )}
                                </>
                            )
                        })}
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default CategoriasGrupo;