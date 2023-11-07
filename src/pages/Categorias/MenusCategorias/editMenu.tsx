import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../styles";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { BlockDados } from "../Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import Modal from 'react-modal';
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ModalDeleteMenu } from "../../../components/popups/ModalDeleteMenu";
import Warnings from "../../../components/Warnings";


export type DeleteGroups = {
    menuCategory_id: string;
}

const EditMenu: React.FC = () => {

    let { menuCategory_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [position, setPosition] = useState([]);
    const [positionSelected, setPositionSelected] = useState();

    const [categories, setCategories] = useState<any[]>([]);
    const [slug, setSlug] = useState("");
    const [slugCategory, setSlugCategory] = useState();

    const [modalItem, setModalItem] = useState<DeleteGroups>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value)
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

    useEffect(() => {
        async function findDdatesMenus() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueMenu?menuCategory_id=${menuCategory_id}`);

                setNameGroup(response.data.nameGroup || "");
                setPosition(response.data.position || "");
                setSlug(response.data.slugCategory || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findDdatesMenus();
    }, [menuCategory_id]);

    async function updateNameMenus() {
        try {
            const apiClient = setupAPIClient();
            if (nameGroup === "") {
                toast.error('Não deixe o nome do menu em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameMenu?menuCategory_id=${menuCategory_id}`, { nameGroup: nameGroup });

                toast.success('Nome do menu atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do menu.');
        }
    }

    async function updatePosition() {
        try {
            if (positionSelected === "") {
                toast.error(`Selecione a posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePositionMenu?menuCategory_id=${menuCategory_id}`, { position: positionSelected });
            toast.success('Posição atualizada com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            /* @ts-ignore */
            toast.error(error.response.data);
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function updateSlugMenu() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateSlugMenu?menuCategory_id=${menuCategory_id}`, { slugCategory: slugCategory });
            toast.success('Caminho atualizado com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            /* @ts-ignore */
            toast.error(error.response.data);
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(menuCategory_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueMenu', {
            params: {
                menuCategory_id: menuCategory_id,
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
                    <Warnings />
                    <Card>
                        <>
                            <VoltarNavagation />
                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo={`Editar menu = ${nameGroup}`}
                                />

                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDelete(menuCategory_id)}
                                >
                                    Remover menu
                                </Button>
                            </BlockTop>

                            <BlockDados>
                                <TextoDados
                                    chave={"Atualizar nome do menu"}
                                    dados={
                                        <InputUpdate
                                            dado={nameGroup}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={nameGroup}
                                            value={nameGroup}
                                            /* @ts-ignore */
                                            onChange={(e) => setNameGroup(e.target.value)}
                                            handleSubmit={updateNameMenus}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Atualizar posição do menu"}
                                    dados={
                                        <SelectUpdate
                                            dado={position}
                                            value={positionSelected}
                                            /* @ts-ignore */
                                            onChange={handleChangePosition}
                                            opcoes={
                                                [
                                                    { label: "Selecione...", value: "" },
                                                    { label: "Menu Topo", value: "Menu Topo" },
                                                    { label: "Lateral esquerda", value: "Lateral esquerda" },
                                                    { label: "Home Page", value: "Home Page" }
                                                ]
                                            }
                                            handleSubmit={updatePosition}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Atualizar página de categoria que esse menu vai aparecer"}
                                    dados={
                                        <SelectUpdate
                                            dado={slug}
                                            value={slugCategory}
                                            /* @ts-ignore */
                                            onChange={handleChangeSlug}
                                            opcoes={
                                                [
                                                    { label: "Selecionar...", value: "" },
                                                    { label: "Home page", value: "home-page" },/* @ts-ignore */
                                                    ...(categories || []).map((item) => ({ label: item.slug, value: item.slug }))
                                                ]
                                            }
                                            handleSubmit={updateSlugMenu}
                                        />
                                    }
                                />
                            </BlockDados>
                            {modalVisible && (
                                <ModalDeleteMenu
                                    isOpen={modalVisible}
                                    onRequestClose={handleCloseModalDelete}
                                    /* @ts-ignore */
                                    groupId={modalItem}
                                />
                            )}
                        </>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default EditMenu;