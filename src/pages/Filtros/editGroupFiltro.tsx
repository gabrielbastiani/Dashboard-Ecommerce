import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ModalDeleteGroupFiltro } from "../../../components/popups/ModalDeleteGroupFiltro";


export type DeleteFitrosGrupo = {
    groupFilterAtributo_id: string;
}

const EditGroupFiltro: React.FC = () => {

    let { groupFilterAtributo_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [itemName, setItemName] = useState("");

    const [categories, setCategories] = useState<any[]>([]);
    const [slugCategoryOrItem, setSlugCategoryOrItem] = useState();

    const [modalItem, setModalItem] = useState<DeleteFitrosGrupo>();
    const [modalVisible, setModalVisible] = useState(false);

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

    useEffect(() => {
        async function findDdatesGroups() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/filterUniqueGroup?groupFilterAtributo_id=${groupFilterAtributo_id}`);

                setNameGroup(response.data.nameGroup || "");
                setItemName(response.data.itemName || "");
                setSlugCategoryOrItem(response.data.slugCategoryOrItem || "");

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findDdatesGroups();
    }, [groupFilterAtributo_id]);

    async function updateNameGroup() {
        try {
            const apiClient = setupAPIClient();
            if (nameGroup === "") {
                toast.error('Não deixe o nome do grupo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameGrupoFiltro?groupFilterAtributo_id=${groupFilterAtributo_id}`, { nameGroup: nameGroup });

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

    async function updateItemName() {
        try {
            if (itemName === "") {
                toast.error('Não deixe o nome do filtro em branco!!!');
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateItemNameGrupoFiltro?groupFilterAtributo_id=${groupFilterAtributo_id}`, { itemName: itemName });
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

    async function updateSlugGroup() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateSlugCategoryGrupoFiltro?groupFilterAtributo_id=${groupFilterAtributo_id}`, { slugCategoryOrItem: slugCategoryOrItem });
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

    async function handleOpenModalDelete(groupFilterAtributo_id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/filterUniqueGroup', {
            params: {
                groupFilterAtributo_id: groupFilterAtributo_id,
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
                        <>
                            <VoltarNavagation />
                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo={`Editar grupo de filtro = ${nameGroup}`}
                                />

                                <Button
                                    style={{ backgroundColor: '#FB451E' }}/* @ts-ignore */
                                    onClick={() => handleOpenModalDelete(groupFilterAtributo_id)}
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
                                    chave={"Atualizar nome do tipo do filtro"}
                                    dados={
                                        <InputUpdate
                                            dado={itemName}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={itemName}
                                            value={itemName}
                                            /* @ts-ignore */
                                            onChange={(e) => setItemName(e.target.value)}
                                            handleSubmit={updateItemName}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Atualizar página de categoria que esse grupo de filtro vai aparecer"}
                                    dados={
                                        <SelectUpdate
                                            dado={slugCategoryOrItem}
                                            value={slugCategoryOrItem}
                                            /* @ts-ignore */
                                            onChange={handleChangeSlug}
                                            opcoes={
                                                [
                                                    { label: "Selecionar...", value: "" },
                                                    { label: "Home page", value: "home-page" },/* @ts-ignore */
                                                    ...(categories || []).map((item) => ({ label: item.slug, value: item.slug }))
                                                ]
                                            }
                                            handleSubmit={updateSlugGroup}
                                        />
                                    }
                                />
                            </BlockDados>
                            {modalVisible && (
                                <ModalDeleteGroupFiltro
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

export default EditGroupFiltro;