import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { useParams } from "react-router-dom";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import Modal from 'react-modal';
import { ModalDeleteConfigAbandonedCart } from "../../../components/popups/ModalDeleteConfigAbandonedCart";


const EditConfiguracao: React.FC = () => {

    let { configAbandonedCart_id } = useParams();

    const [time_send_email, setTime_send_email] = useState<number>(Number);
    const [subject, setSubject] = useState('');
    const [code_cupom, setCode_cupom] = useState('');
    const [activeConfig, setActiveConfig] = useState('');

    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadConfig() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueConfigCartAbandoned?configAbandonedCart_id=${configAbandonedCart_id}`);

                setTime_send_email(data.time_send_email);
                setSubject(data.subject || "");
                setCode_cupom(data.code_cupom || "");
                setActiveConfig(data.active || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadConfig();
    }, [configAbandonedCart_id]);

    async function refreshConfig() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/findUniqueConfigCartAbandoned?configAbandonedCart_id=${configAbandonedCart_id}`);

            setTime_send_email(data.time_send_email);
            setSubject(data.subject || "");
            setCode_cupom(data.code_cupom || "");
            setActiveConfig(data.active || "");

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateDatasConfig() {
        try {
            const apiClient = setupAPIClient();
            if (subject === "") {
                toast.error('Não deixe o assunto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateDatasAllConfigAbandonedCart?configAbandonedCart_id=${configAbandonedCart_id}`,
                    {
                        time_send_email: time_send_email * 60,
                        subject: subject,
                        code_cupom: code_cupom
                    });

                toast.success('Dado da configuração atualizado com sucesso.');

                refreshConfig();
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar os dados da configuração.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusConfigAbandonedCart?configAbandonedCart_id=${configAbandonedCart_id}`);

            refreshConfig();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o status.');
        }

        if (activeConfig === "Nao") {
            toast.success(`Esse e-mail está ativado.`);
            return;
        }

        if (activeConfig === "Sim") {
            toast.error(`Esse e-mail não está ativado.`);
            return;
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
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

                        <Voltar url='/carrinho/configuracoes' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={`Editar configuração do e-mail = ${subject}`}
                            />
                            <Button
                                onClick={handleOpenModalDelete}
                            >
                                Deletar
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Assunto do E-mail"}
                                dados={
                                    <InputUpdate
                                        dado={subject}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={subject}
                                        value={subject}
                                        /* @ts-ignore */
                                        onChange={(e) => setSubject(e.target.value)}
                                        handleSubmit={updateDatasConfig}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Código cupom de desconto"}
                                dados={
                                    <InputUpdate
                                        dado={code_cupom}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={code_cupom}
                                        value={code_cupom}
                                        /* @ts-ignore */
                                        onChange={(e) => setCode_cupom(e.target.value)}
                                        handleSubmit={updateDatasConfig}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Tempo de envio desse E-mail"}
                                dados={
                                    <InputUpdate
                                        dado={time_send_email}
                                        type="number"
                                        /* @ts-ignore */
                                        placeholder={time_send_email}
                                        value={time_send_email}
                                        /* @ts-ignore */
                                        onChange={(e) => setTime_send_email(e.target.value)}
                                        handleSubmit={updateDatasConfig}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Ativado?"}
                                dados={
                                    <ButtonSelect
                                        /* @ts-ignore */
                                        dado={activeConfig}
                                        handleSubmit={updateStatus}
                                    />
                                }
                            />
                        </BlockDados>
                    </Card>
                </Container >
            </Grid >
            {modalVisible && (
                <ModalDeleteConfigAbandonedCart
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    configsAbandoned={configAbandonedCart_id}
                />
            )}
        </>
    )
}

export default EditConfiguracao;