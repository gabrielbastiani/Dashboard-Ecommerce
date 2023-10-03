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
import Modal from 'react-modal';


const EditTemplate: React.FC = () => {

    let { templateAbandonedCartEmail_id } = useParams();

    const [name_file_email, setName_file_email] = useState("");

    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadTemplates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueTemplateEmailAbandonedCart?templateAbandonedCartEmail_id=${templateAbandonedCartEmail_id}`);

                setName_file_email(data.name_file_email || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadTemplates();
    }, [templateAbandonedCartEmail_id]);

    async function refreshConfig() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/findUniqueTemplateEmailAbandonedCart?templateAbandonedCartEmail_id=${templateAbandonedCartEmail_id}`);

            setName_file_email(data.name_file_email);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
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
                    </Card>
                </Container >
            </Grid >
        </>
    )
}

export default EditTemplate;