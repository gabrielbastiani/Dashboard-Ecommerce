import { SetStateAction, useState } from "react";
import Editor from '@monaco-editor/react';
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
import { useNavigate } from "react-router-dom";
import { InputPost } from "../../../components/ui/InputPost";
import Warnings from "../../../components/Warnings";


const NovoTemplate: React.FC = () => {

    const navigate = useNavigate();

    const [name_file_email, setName_file_email] = useState('');
    const [template_cart_email, setTemplate_cart_email] = useState<string>('');

    function handleValueEditor(value: SetStateAction<string>, event: any) {
        setTemplate_cart_email(value)
    }

    async function handleRegisterTemplate() {
        const apiClient = setupAPIClient();
        try {
            if (name_file_email === "") {
                toast.error('Não deixe o nome em branco!');
                return;
            }

            if (template_cart_email === "") {
                toast.error('Não deixe o template em branco!');
                return;
            }

            await apiClient.post(`/createFileTemplate`, {
                name_file_email: name_file_email,
                template_cart_email: template_cart_email
            }
            );

            toast.success('Template de e-mail cadastrado com sucesso.');

            setTimeout(() => {
                navigate('/carrinho/emails');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o template.');
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

                        <Voltar url='/carrinho/emails' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Escreva seu e-mail"
                            />
                            <Button
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterTemplate}
                            >
                                Salvar E-mail
                            </Button>
                        </BlockTop>

                        <Block>
                            <Etiqueta>Digite o nome do arquivo desse e-mail:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome do arquivo..."
                                value={name_file_email}
                                onChange={(e) => setName_file_email(e.target.value)}
                            />
                        </Block>

                        <Block
                            style={{ width: '100%' }}
                        >
                            <Etiqueta>Escreva o E-mail:</Etiqueta>
                            <Editor
                                height="80vh"
                                width="100%"
                                theme="vs-dark"
                                defaultLanguage="html"
                                value={template_cart_email}/* @ts-ignore */
                                onChange={handleValueEditor}
                            />
                        </Block>
                    </Card>
                </Container >
            </Grid >
        </>
    )
}

export default NovoTemplate;