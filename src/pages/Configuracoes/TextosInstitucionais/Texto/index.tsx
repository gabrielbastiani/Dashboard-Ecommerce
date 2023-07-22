import { useEffect, useState } from "react";
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
import { AreaTexto } from "./styles";
import Modal from 'react-modal';
import { ModalDeleteTextoInstitucional } from "../../../../components/popups/ModalDeleteTextoInstitucional";
import { Editor } from "@tinymce/tinymce-react";


export type DeleteTexto = {
    institutionalText_id: string;
}

const Texto: React.FC = () => {

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
                                        /* @ts-ignore */
                                        dado={status}
                                        handleSubmit={updateStatus}
                                    />
                                }
                            />
                        </BlockDados>

                        <BlockDados style={{ flexDirection: 'column' }}>
                            <TextoDados
                                chave={"Texto institucional"}
                                dados={
                                    <Editor
                                        apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                                        onInit={(editor) => {/* @ts-ignore */
                                            setText(editor.getContent({ format: 'text' }));
                                        }}
                                        initialValue={description}
                                        init={{/* @ts-ignore */
                                            selector: "textarea.editor",
                                            mode: 'textarea',
                                            height: 900,
                                            menubar: true,
                                            images_upload_credentials: true,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'image code', 'charmap',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | link image | code' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            image_title: true,
                                            automatic_uploads: true,
                                            file_picker_types: 'image',
                                            file_picker_callback: function (cb, value, meta) {
                                                var input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.setAttribute('accept', 'image/*');
                                                input.onchange = function () {/* @ts-ignore */
                                                    var file = this.files[0];
                                                    var reader = new FileReader();
                                                    reader.onload = function () {
                                                        var id = 'blobid' + (new Date()).getTime();/* @ts-ignore */
                                                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;/* @ts-ignore */
                                                        var base64 = reader.result.split(',')[1];
                                                        var blobInfo = blobCache.create(id, file, base64);
                                                        blobCache.add(blobInfo);
                                                        cb(blobInfo.blobUri(), { title: file.name });
                                                    };
                                                    reader.readAsDataURL(file);
                                                };

                                                input.click();
                                            },
                                            content_style: '.left { text-align: left; } ' +
                                                'img.left, audio.left, video.left { float: left; } ' +
                                                'table.left { margin-left: 0px; margin-right: auto; } ' +
                                                '.right { text-align: right; } ' +
                                                'img.right, audio.right, video.right { float: right; } ' +
                                                'table.right { margin-left: auto; margin-right: 0px; } ' +
                                                '.center { text-align: center; } ' +
                                                'img.center, audio.center, video.center { display: block; margin: 0 auto; } ' +
                                                'table.center { margin: 0 auto; } ' +
                                                '.full { text-align: justify; } ' +
                                                'img.full, audio.full, video.full { display: block; margin: 0 auto; } ' +
                                                'table.full { margin: 0 auto; } ' +
                                                '.bold { font-weight: bold; } ' +
                                                '.italic { font-style: italic; } ' +
                                                '.underline { text-decoration: underline; } ' +
                                                '.example1 {} ' +
                                                'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }' +
                                                '.tablerow1 { background-color: #D3D3D3; }',
                                            formats: {
                                                alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'left' },
                                                aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'center' },
                                                alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'right' },
                                                alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video', classes: 'full' },
                                                bold: { inline: 'span', classes: 'bold' },
                                                italic: { inline: 'span', classes: 'italic' },
                                                underline: { inline: 'span', classes: 'underline', exact: true },
                                                strikethrough: { inline: 'del' },
                                                customformat: { inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format' }, classes: 'example1' }
                                            },
                                            style_formats: [
                                                { title: 'Custom format', format: 'customformat' },
                                                { title: 'Align left', format: 'alignleft' },
                                                { title: 'Align center', format: 'aligncenter' },
                                                { title: 'Align right', format: 'alignright' },
                                                { title: 'Align full', format: 'alignfull' },
                                                { title: 'Bold text', inline: 'strong' },
                                                { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                                                { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                                                { title: 'Badge', inline: 'span', styles: { display: 'inline-block', border: '1px solid #2276d2', 'border-radius': '5px', padding: '2px 5px', margin: '0 2px', color: '#2276d2' } },
                                                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' },
                                                { title: 'Image formats' },
                                                { title: 'Image Left', selector: 'img', styles: { 'float': 'left', 'margin': '0 10px 0 10px' } },
                                                { title: 'Image Right', selector: 'img', styles: { 'float': 'right', 'margin': '0 0 10px 10px' } },
                                            ]
                                        }}
                                        onEditorChange={(description, editor) => {
                                            setDescription(description);
                                        }}
                                    />
                                }
                            />
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