import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
import QuillImageResize from 'quill-image-resize';
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { InputPost } from "../../components/ui/InputPost";
import { useNavigate } from "react-router-dom";
import { BlockInputs, BoxActive, EtiquetaInput, RadioBotton } from "../Banners/styles";


const NovaConfiguracao: React.FC = () => {

    Quill.register('modules/imageResize', QuillImageResize);

    const navigate = useNavigate();

    const [subject, setSubject] = useState('');
    const [code_cupom, setCode_cupom] = useState('');
    const [template, setTemplate] = useState<string>('');
    const [startDate, setStartDate] = useState<number>(1);

    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    const handleChange = (html: string) => {
        setTemplate(html);
    };

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['formula', 'link', 'image', 'video']
    ];

    const module = {
        toolbar: toolbarOptions,
        imageResize: {
            handleStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
            },
        },
    }


    async function handleConfigAbandoned() {
        const apiClient = setupAPIClient();
        try {
            if (subject === "") {
                toast.error('Não deixe o assunto em branco!');
                return;
            }

            if (template === "") {
                toast.error('Não o email em branco!');
                return;
            }

            await apiClient.post(`/createConfigAbandonedCart`, {
                subject: subject,
                template: template,
                code_cupom: code_cupom,
                time_send_email: startDate * 60,
                active: active
            }
            );

            toast.success('Configuração cadastrada com sucesso.');

            setSubject("");
            setTemplate("");

            setTimeout(() => {
                navigate('/carrinho/configuracoes');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a configuração.');
        }
    }



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card
                    style={{ height: '200%' }}
                >

                    <Voltar url='/carrinho/configuracoes' />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Cadastrar configuração"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleConfigAbandoned}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Assunto do E-mail:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o assunto..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Código do cupom:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Código do cupom..."
                            value={code_cupom}
                            onChange={(e) => setCode_cupom(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Tempo do envio:</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="0"
                            value={startDate}/* @ts-ignore */
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <BlockInputs>
                            <BoxActive>
                                <EtiquetaInput>Ativar disparo do e-mail?</EtiquetaInput>
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
                        <ReactQuill
                            style={{ backgroundColor: 'white', color: 'black', height: '700px' }}
                            theme="snow"
                            value={template}
                            onChange={handleChange}
                            modules={module}
                        />
                    </Block>
                </Card>
            </Container >
        </Grid >
    )
}

export default NovaConfiguracao;