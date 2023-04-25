import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
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
import { ModalDeleteGroup } from "../../../components/popups/ModalDeleteGroup";


export type DeleteGroups = {
    groupCategoy_id: string;
}

const EditGroup: React.FC = () => {

    let { groupCategoy_id } = useParams();
    const navigate = useNavigate();

    const [nameGroup, setNameGroup] = useState("");
    const [posicao, setPosicao] = useState([]);
    const [posicaoSelected, setPosicaoSelected] = useState();

    const [modalItem, setModalItem] = useState<DeleteGroups>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleChangePosicao(e: any) {
        setPosicaoSelected(e.target.value)
    }


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
                        <>
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
                            {modalVisible && (
                                <ModalDeleteGroup
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

export default EditGroup;