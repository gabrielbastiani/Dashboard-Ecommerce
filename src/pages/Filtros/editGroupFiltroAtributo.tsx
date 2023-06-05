import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import VoltarNavagation from "../../components/VoltarNavagation";
import { BlockTop } from "../Categorias/styles";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { BlockDados } from "../Categorias/Categoria/styles";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import SelectUpdate from "../../components/ui/SelectUpdate";
import { ModalDeleteGroupFiltro } from "../../components/popups/ModalDeleteGroupFiltro";
import { ButtonSelect } from "../../components/ui/ButtonSelect";


export type DeleteFitrosGrupo = {
    groupFilter_id: string;
}

const EditGroupFiltroAtributo: React.FC = () => {

    let { groupFilter_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [atributoName, setAtributoName] = useState("");
    const [status, setStatus] = useState("");

    const [allAtributos, setAllatributos] = useState<any[]>([]);

    const [categories, setCategories] = useState<any[]>([]);
    const [slugCategory, setSlugCategory] = useState();

    const [type, setType] = useState<any[]>([]);
    const [typeSelected, setTypeSelected] = useState();

    const [modalItem, setModalItem] = useState<DeleteFitrosGrupo>();
    const [modalVisible, setModalVisible] = useState(false);

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
        async function findDdatesGroups() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueIDGroup?groupFilter_id=${groupFilter_id}`);

                setNameGroup(response.data.nameGroup || "");
                setAtributoName(response.data.type || "");
                setSlugCategory(response.data.slugCategory || "");
                setStatus(response.data.status);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findDdatesGroups();
    }, [groupFilter_id]);

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

    async function updateNameGroup() {
        try {
            const apiClient = setupAPIClient();
            if (nameGroup === "") {
                toast.error('Não deixe o nome do grupo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameGroupFilter?groupFilter_id=${groupFilter_id}`, { nameGroup: nameGroup });

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

    async function updateAtributoName() {
        try {
            if (typeSelected === "") {
                toast.error('Não deixe o tipo de atributo do filtro em branco!!!');
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateTypeAttributeGroup?groupFilter_id=${groupFilter_id}`, { type: typeSelected });
            toast.success('Tipo do atributo atualizado com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao atualizar o tipo do atributo.");
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusGroupFilter?groupFilter_id=${groupFilter_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error('Ops erro ao atualizar a disponibilidade do grupo.');
        }

        if (status === "Indisponivel") {
            toast.success(`O Grupo se encontra Disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`O Grupo se encontra Indisponivel.`);
            return;
        }
    }

    async function updateSlugGroup() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateSlugGroupFilter?groupFilter_id=${groupFilter_id}`, { slugCategory: slugCategory });
            toast.success('Caminho atualizado com sucesso.');
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao atualizar a posição do grupo.");
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    useEffect(() => {
        async function findAllFilterAtributos() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findManyNameFilterAttribute?groupFilter_id=${groupFilter_id}`);

                setAllatributos(response.data || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        findAllFilterAtributos();
    }, [groupFilter_id]);

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(groupFilter_id: string) {
        if (allAtributos.length >= 1) {
            toast.error("Delete todos os filtros desse grupo antes de deletar esse grupo!!!");
            return;
        }
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueIDGroup', {
            params: {
                groupFilter_id: groupFilter_id,
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
                                    onClick={() => handleOpenModalDelete(groupFilter_id)}
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
                                    chave={"Atualizar o tipo de atributo"}
                                    dados={
                                        <SelectUpdate
                                            dado={atributoName}
                                            handleSubmit={updateAtributoName}
                                            value={typeSelected}
                                            opcoes={
                                                [
                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                    ...(type || []).map((item) => ({ label: item.type, value: item.type }))
                                                ]
                                            }/* @ts-ignore */
                                            onChange={handleChangeType}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Atualizar página de categoria que esse grupo de filtro vai aparecer"}
                                    dados={
                                        <SelectUpdate
                                            dado={slugCategory}
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
                                            handleSubmit={updateSlugGroup}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Disponibilidade"}
                                    dados={
                                        <ButtonSelect
                                            /* @ts-ignore */
                                            dado={status}
                                            handleSubmit={updateStatus}
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

export default EditGroupFiltroAtributo;