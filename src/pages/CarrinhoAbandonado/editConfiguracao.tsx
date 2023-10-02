import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { BlockDados } from "../Categorias/Categoria/styles";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import { ButtonSelect } from "../../components/ui/ButtonSelect";
import Modal from 'react-modal';
import { ModalDeleteConfigAbandonedCart } from "../../components/popups/ModalDeleteConfigAbandonedCart";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import { InputPost } from "../../components/ui/InputPost";


const EditConfiguracao: React.FC = () => {

    Quill.register('modules/imageResize', QuillImageResize);

    let { configAbandonedCart_id } = useParams();

    const navigate = useNavigate();

    const [time_send_email, setTime_send_email] = useState<number>(Number);
    const [subject, setSubject] = useState('');
    const [code_cupom, setCode_cupom] = useState('');
    const [activeConfig, setActiveConfig] = useState('');

    const [name_file_email, setName_file_email] = useState('');
    const [template_cart_email, setTemplate_cart_email] = useState<string>('');

    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (html: string) => {
        setTemplate_cart_email(html);
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
                configAbandonedCart_id: configAbandonedCart_id,
                name_file_email: name_file_email,
                template_cart_email: template_cart_email
            }
            );

            toast.success('Template de e-mail cadastrado com sucesso.');

            setTimeout(() => {
                navigate('/carrinho/configuracoes');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o template.');
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
                    <Card
                        style={{ height: '200%' }}
                    >

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

                        <DivisorHorizontal />

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
                            <ReactQuill
                                style={{ backgroundColor: 'white', color: 'black', height: '700px' }}
                                theme="snow"
                                value={template_cart_email}
                                onChange={handleChange}
                                modules={module}
                            />
                        </Block>
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