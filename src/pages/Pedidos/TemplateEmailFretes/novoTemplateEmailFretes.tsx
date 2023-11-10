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
import Select from "../../../components/ui/Select";
import { BlockInputs, BoxActive, EtiquetaInput, RadioBotton } from "../../Banners/styles";
import Warnings from "../../../components/Warnings";


const NovoTemplateEmailFretes: React.FC = () => {

    const navigate = useNavigate();

    const [name_file_email, setName_file_email] = useState('');
    const [template_frete_email, setTemplate_frete_email] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [statusSelected, setStatusSelected] = useState();

    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    function handleValueEditor(value: SetStateAction<string>, event: any) {
        setTemplate_frete_email(value)
    }

    function handleChangeStatus(e: any) {
        setStatusSelected(e.target.value);
    }

    async function handleRegisterTemplate() {
        const apiClient = setupAPIClient();
        try {
            if (name_file_email === "") {
                toast.error('Não deixe o nome em branco!');
                return;
            }

            if (template_frete_email === "") {
                toast.error('Não deixe o template em branco!');
                return;
            }

            await apiClient.post(`/createTemplateEmailFreteOrderStatus`, {
                status_frete: statusSelected,
                subject: subject,
                name_file_email: name_file_email,
                template_frete_email: template_frete_email,
                active: active,
            }
            );

            toast.success('Template de e-mail cadastrado com sucesso.');

            setTimeout(() => {
                navigate('/pedidos/emailFretes');
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

                        <Voltar url='/pedidos/emailFretes' />

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

                        <Block>
                            <Etiqueta>Qual o assunto do email</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite aqui..."
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Status do frete:</Etiqueta>
                            <Select
                                value={statusSelected}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },
                                        { label: "Pedido postado", value: "postado" },
                                        { label: "Em transito", value: "transito" },
                                        { label: "Aguardando retirada", value: "aguardando" },
                                        { label: "Entregue", value: "entregue" }
                                    ]
                                }/* @ts-ignore */
                                onChange={handleChangeStatus}
                            />
                        </Block>

                        <Block>
                            <BlockInputs>
                                <BoxActive>
                                    <EtiquetaInput>Ativar e-mail?</EtiquetaInput>
                                    <RadioBotton
                                        type="checkbox"
                                        value={active}
                                        onClick={handleChecked}
                                        onChange={() => setActive(check ? "Nao" : "Sim")}
                                        checked={check}
                                    />
                                </BoxActive>
                            </BlockInputs>
                        </Block>
                        <br />
                        <br />

                        <Block
                            style={{ width: '100%' }}
                        >
                            <Etiqueta>Escreva o E-mail:</Etiqueta>
                            <Editor
                                height="80vh"
                                width="100%"
                                theme="vs-dark"
                                defaultLanguage="html"
                                value={template_frete_email}/* @ts-ignore */
                                onChange={handleValueEditor}
                            />
                        </Block>
                    </Card>
                </Container >
            </Grid >
        </>
    )
}

export default NovoTemplateEmailFretes;