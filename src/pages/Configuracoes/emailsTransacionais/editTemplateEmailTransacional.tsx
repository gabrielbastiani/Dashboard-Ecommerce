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
import Warnings from "../../../components/Warnings";


const EditTemplateEmailTransacional: React.FC = () => {

    let { emailTransacional } = useParams();

    const [template, setTemplate] = useState<string>("");

    function handleValueEditor(value: SetStateAction<string>, event: any) {
        setTemplate(value)
    }

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findTemplateEmailTransacional?emailTransacional=${emailTransacional}`);

                setTemplate(data);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        };
        loadTemplate();
    }, [emailTransacional]);

    async function updateContentTemplate() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateContentTemplateEmailTransacional?emailTransacional=${emailTransacional}`, {
                content: template
            });

            toast.success("Arquivo do template atualizado com sucesso");

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
            toast.error("Erro ao atualizar o arquivo do template");
        }
    }



    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>

                        <Voltar url='/configuracoes/emailstransacionais' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"/* @ts-ignore */
                                titulo={`Editar template do e-mail = ${emailTransacional.slice(0, -4).replace(/_/g, ' ').replace(/-/g, ' ')}`}
                            />
                        </BlockTop>

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
            </Grid>
        </>
    )
}

export default EditTemplateEmailTransacional;