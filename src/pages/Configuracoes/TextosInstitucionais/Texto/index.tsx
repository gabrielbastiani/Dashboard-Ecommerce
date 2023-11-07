import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillImageResize from 'quill-image-resize';
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../../Dashboard/styles";
import MainHeader from "../../../../components/MainHeader";
import Aside from "../../../../components/Aside";
import { BlockTop, Container } from "../../../Categorias/styles";
import { Card } from "../../../../components/Content/styles";
import Voltar from "../../../../components/Voltar";
import Titulos from "../../../../components/Titulos";
import { Button } from "../../../../components/ui/Button";
import { BlockDados } from "../../../Categorias/Categoria/styles";
import { TextoDados } from "../../../../components/TextoDados";
import { InputUpdate } from "../../../../components/ui/InputUpdate";
import SelectUpdate from "../../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../../components/ui/ButtonSelect";
import { setupAPIClient } from "../../../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { ModalDeleteTextoInstitucional } from "../../../../components/popups/ModalDeleteTextoInstitucional";
import Warnings from "../../../../components/Warnings";


export type DeleteTexto = {
    institutionalText_id: string;
}

const Texto: React.FC = () => {

    Quill.register('modules/imageResize', QuillImageResize);

    const navigate = useNavigate();
    let { institutionalText_id } = useParams();

    const [title, setTitle] = useState('');
    const [order, setOrder] = useState(Number);
    const [positionSelected, setPositionSelected] = useState();
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (html: string) => {
        setDescription(html);
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
        async function loadTexto() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findUniqueInstitutionalText?institutionalText_id=${institutionalText_id}`);

                setTitle(response.data.title || "");
                setOrder(response.data.order);
                setPosition(response.data.position || "");
                setStatus(response.data.status);
                setDescription(response.data.description);

            } catch (error) {
                console.log(error);
            }
        }
        loadTexto();
    }, [institutionalText_id]);

    async function updateTitle() {
        try {
            const apiClient = setupAPIClient();
            if (title === "") {
                toast.error('Não deixe o titulo do texto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTitleInstitutionalText?institutionalText_id=${institutionalText_id}`, { title: title });
                toast.success('Titulo do texto atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o titulo do texto.');
        }
    }

    async function updateOrder() {
        try {
            const apiClient = setupAPIClient();
            if (order === null) {
                toast.error('Não deixe a ordem do texto em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderInstitutionalText?institutionalText_id=${institutionalText_id}`, { order: Number(order) });
                toast.success('Ordem do texto atualizado com sucesso.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do texto.');
        }
    }

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value);
    }

    async function updatePosition() {
        try {
            if (positionSelected === "") {
                toast.error(`Selecione uma posição, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePositionInstitutionalText?institutionalText_id=${institutionalText_id}`, { position: positionSelected });

            toast.success('Posição atualizada com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a posição.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function updateDescription() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/updateDescriptionInstitutionalText?institutionalText_id=${institutionalText_id}`, { description: description });
            toast.success('Descrição do texto atualizado com sucesso.');

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descrição do texto.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusInstitutionalText?institutionalText_id=${institutionalText_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a status do texto.');
        }

        if (status === "Indisponivel") {
            toast.success(`Esse texto está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }

        if (status === "Disponivel") {
            toast.error(`Esse texto NÃO está disponivel em sua posição agora.`);
            setTimeout(() => {
                navigate(0);
                return;
            }, 2000);
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(institutionalText_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/findUniqueInstitutionalText', {
            params: {
                institutionalText_id: institutionalText_id,
            }
        });
        setModalItem(responseDelete.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>
                        <Voltar
                            url="/textosInstitucionais"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo='Editar - Texto Institucional'
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(institutionalText_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Titulo do texto"}
                                dados={
                                    <InputUpdate
                                        dado={title}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={title}
                                        value={title}
                                        /* @ts-ignore */
                                        onChange={(e) => setTitle(e.target.value)}
                                        handleSubmit={updateTitle}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Ordem"}
                                dados={
                                    <InputUpdate
                                        dado={String(order)}
                                        type="number"
                                        /* @ts-ignore */
                                        placeholder={String(order)}
                                        value={order}
                                        /* @ts-ignore */
                                        onChange={(e) => setOrder(e.target.value)}
                                        handleSubmit={updateOrder}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Posição desse texto"}
                                dados={
                                    <SelectUpdate
                                        dado={position}
                                        value={positionSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangePosition}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Rodapé Loja", value: "Rodapé Loja" },
                                                { label: "PopUp Menu Topo", value: "PopUp Menu Topo" },
                                                { label: "Header Topo", value: "Header Topo" },
                                                { label: "Página Sobre", value: "Página Sobre" },
                                                { label: "Politicas de Privacidade", value: "Politicas de Privacidade" },
                                                { label: "Página Contato", value: "Página Contato" },
                                                { label: "Trocas e Devoluções", value: "Trocas e Devoluções" },
                                                { label: "Como Comprar", value: "Como Comprar" },
                                                { label: "Segurança", value: "Segurança" },
                                                { label: "Envios e Prazo de Entrega", value: "Envios e Prazo de Entrega" },
                                                { label: "Perguntas Frequentes", value: "Perguntas Frequentes" },
                                                { label: "Formas de Pagamento", value: "Formas de Pagamento" }
                                            ]
                                        }
                                        handleSubmit={updatePosition}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Disponibilidade"}
                                dados={
                                    <ButtonSelect
                                        dado={status}
                                        handleSubmit={updateStatus}
                                        showElement={status}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados style={{ flexDirection: 'column' }}>
                        <ReactQuill
                            style={{ backgroundColor: 'white', color: 'black', height: '500px' }}
                            theme="snow"
                            value={description}
                            onChange={handleChange}
                            modules={module}
                        />
                        <br />
                        <br />
                        <br />
                        <br />
                            <Button
                                onClick={updateDescription}
                            >
                                Atualizar descrição
                            </Button>
                        </BlockDados>

                    </Card>
                </Container>
            </Grid>
            {modalVisible && (
                <ModalDeleteTextoInstitucional
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    texto={modalItem}
                />
            )}
        </>
    )
}

export default Texto;