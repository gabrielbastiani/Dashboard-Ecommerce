import { SetStateAction, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { useParams } from "react-router-dom";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import Modal from 'react-modal';
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { ModalDeleteTemplateEmailOrderStatus } from "../../../components/popups/ModalDeleteTemplateEmailOrderStatus";
import SelectUpdate from "../../../components/ui/SelectUpdate";


const EditTemplateOrderStatus: React.FC = () => {

    let { slug_name_file_email } = useParams();

    const [idTemplate, setIdTemplate] = useState("");
    const [name_file_email, setName_file_email] = useState("");
    const [template, setTemplate] = useState<string>("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState("");
    const [statusSelected, setStatusSelected] = useState();
    const [active, setActive] = useState('');

    function handleChangeStatus(e: any) {
        setStatusSelected(e.target.value)
    }

    const [modalVisible, setModalVisible] = useState(false);

    function handleValueEditor(value: SetStateAction<string>, event: any) {
        setTemplate(value)
    }

    async function refreshConfig() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/findUniqueEmailOrder?slug_name_file_email=${slug_name_file_email}`);

            setName_file_email(data?.name_file_email);
            setSubject(data?.subject);
            setStatus(data?.status_order);
            setActive(data?.active);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function loadDatesTemplate() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/getUniqueTemplateEmailStatus?slug_name_file_email=${slug_name_file_email}`);

                setName_file_email(data?.name_file_email);
                setSubject(data?.subject);
                setStatus(data?.status_order);
                setActive(data?.active);
                setIdTemplate(data?.id);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadDatesTemplate();
    }, [slug_name_file_email]);

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueEmailOrder?slug_name_file_email=${slug_name_file_email}`);

                setTemplate(data);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        };
        loadTemplate();
    }, [slug_name_file_email]);

    async function updateContentTemplate() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateTemplateOrderEmail?slug_name_file_email=${slug_name_file_email}`, {
                content: template
            });

            toast.success("Arquivo do template atualizado com sucesso");

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
            toast.error("Erro ao atualizar o arquivo do template");
        }
    }

    async function updatenametemplate() {
        try {
            const apiClient = setupAPIClient();
            if (name_file_email === "") {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameTemplateEmailOrderStatus?slug_name_file_email=${slug_name_file_email}`,
                    {
                        name_file_email: name_file_email
                    });

                toast.success('Nome atualizado com sucesso.');

                refreshConfig();
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o nome do template.');
        }
    }

    async function updateDateTemplate() {
        try {
            const apiClient = setupAPIClient();
            if (subject === "") {
                toast.error('Não deixe o campo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateDateAllEmailOrderStatus?templateOrderEmail_id=${idTemplate}`,
                    {
                        status_order: statusSelected,
                        subject: subject
                    });

                toast.success('Dados atualizado com sucesso.');

                refreshConfig();
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o dados do template.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateActiveStatusTemplateEmailOrder?templateOrderEmail_id=${idTemplate}`);

            refreshConfig();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o status.');
        }

        if (active === "Nao") {
            toast.success(`Esse e-mail está ativado.`);
            return;
        }

        if (active === "Sim") {
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

                        <Voltar url='/pedidos/emailStausOrder' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={`Editar template do e-mail = ${name_file_email}`}
                            />
                            <Button
                                onClick={handleOpenModalDelete}
                            >
                                Deletar
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Nome do E-mail"}
                                dados={
                                    <InputUpdate
                                        dado={name_file_email}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={name_file_email}
                                        value={name_file_email}
                                        /* @ts-ignore */
                                        onChange={(e) => setName_file_email(e.target.value)}
                                        handleSubmit={updatenametemplate}
                                    />
                                }
                            />
                        </BlockDados>

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
                                        handleSubmit={updateDateTemplate}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Posição dessa rede"}
                                dados={
                                    <SelectUpdate
                                        dado={status}
                                        value={statusSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangeStatus}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Pendente", value: "PENDING" },
                                                { label: "Aprovado", value: "CONFIRMED" },
                                                { label: "Processando", value: "inprocess" || "inmediation" },
                                                { label: "Rejeitado", value: "rejected" },
                                                { label: "Cancelado", value: "cancelled" },
                                                { label: "Devolvido", value: "refunded" },
                                                { label: "Estornado", value: "chargedback" }
                                            ]
                                        }
                                        handleSubmit={updateDateTemplate}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Template ativado?"}
                                dados={
                                    <ButtonSelect
                                        dado={active}
                                        handleSubmit={updateStatus}
                                        showElement={active}
                                    />
                                }
                            />
                        </BlockDados>

                        <Block
                            style={{ width: '100%' }}
                        >
                            <Etiqueta>Atualize abaixo o template do e-mail</Etiqueta>
                            <br />
                            <Button
                                onClick={updateContentTemplate}
                            >
                                Atualizar
                            </Button>
                            <br />
                            <Editor
                                height="80vh"
                                width="100%"
                                theme="vs-dark"
                                defaultLanguage="html"
                                value={template}/* @ts-ignore */
                                onChange={handleValueEditor}
                            />
                        </Block>
                    </Card>
                </Container >
            </Grid >
            {modalVisible && (
                <ModalDeleteTemplateEmailOrderStatus
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    template_data={slug_name_file_email}
                />
            )}
        </>
    )
}

export default EditTemplateOrderStatus;