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


const EditTemplate: React.FC = () => {

    let { templateAbandonedCartEmail_id } = useParams();

    const [name_file_email, setName_file_email] = useState("");
    const [slugName, setSlugName] = useState("");
    const [template, setTemplate] = useState<string>("");

    console.log(template)

    const [modalVisible, setModalVisible] = useState(false);

    function handleValueEditor(value: SetStateAction<string>, event: any) {
        setTemplate(value)
    }

    async function refreshConfig() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/findUniqueTemplateEmailAbandonedCart?templateAbandonedCartEmail_id=${templateAbandonedCartEmail_id}`);

            setName_file_email(data.name_file_email);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function loadNameTemplates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueTemplateEmailAbandonedCart?templateAbandonedCartEmail_id=${templateAbandonedCartEmail_id}`);

                setName_file_email(data.name_file_email || "");
                setSlugName(data.slug_name_file_email || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadNameTemplates();
    }, [templateAbandonedCartEmail_id]);

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const response = await fetch(`/getTemplateEmailAbandoned?slug_name=${slugName}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados da API');
                }
                const content = await response.text();
                setTemplate(content);
            } catch (erro) {
                console.error('Erro ao buscar dados da API:', erro);
            }
        };
        loadTemplate();
    }, [slugName]);

    async function updateContentTemplate() {
        try {
            const response = await fetch(`/updateFileTemplateAbandonedCart?slug_name=${slugName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Defina o tipo de conteúdo como JSON
                },
                body: JSON.stringify({
                    content: template
                }), // Converte os dados para JSON e envia no corpo
            });

            if (response.ok) {
                console.log('Dados atualizados com sucesso');
                refreshConfig();
            } else {
                console.error('Falha ao atualizar dados');
            }
        } catch (error) {/* @ts-ignore */
            console.error('Erro ao fazer a solicitação:', error.response.data);
        }
    }

    async function updatenametemplate() {
        try {
            const apiClient = setupAPIClient();
            if (name_file_email === "") {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTemplateAbandonedCart?templateAbandonedCartEmail_id=${templateAbandonedCartEmail_id}`,
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

                        <Voltar url='/carrinho/emails' />

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

                        <Block
                            style={{ width: '100%' }}
                        >
                            <Etiqueta>Atualize abaixo o template do e-mail</Etiqueta>
                            <br />
                            <br />
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
        </>
    )
}

export default EditTemplate;