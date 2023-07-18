import { useEffect, useState } from "react";
import Modal from 'react-modal';
import {
    TableSection,
    Cabecalho,
    TituloTop,
    TabContents,
    EditBoxDesc,
    TextButton
} from './styles';
import { setupAPIClient } from "../../services/api";
import { ButtonConfirm } from "../ui/SelectUpdate/styles";
import { ValueText } from "../ui/ButtonSelect/styles";
import { GiConfirmed } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ModalDeleteDescriptionProduct } from "../popups/ModalDeleteDescriptionProduct";
import { Editor } from "@tinymce/tinymce-react";
import { InputUpdate } from "../ui/InputUpdate";
import { TextoDados } from "../TextoDados";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";


export type DeleteDescriptions = {
    id: string;
}

interface DescriptionRequest {
    product_id: any;
}

const DescriptionsProduct = ({ product_id }: DescriptionRequest) => {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(Number);

    const [toogle, setToogle] = useState(!activeTab);
    const [cor, setCor] = useState('#999494');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setCor(toogle ? '#c3c3c3' : '');
    }, [toogle]);

    const handleClick = (id: string) => {
        setActiveTab(id);
        setToogle(state => !state)
    };

    const [descriptions, setDescriptions] = useState<any[]>([]);

    useEffect(() => {
        async function loadDescriptions() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsDescriptionsStore?product_id=${product_id}`);
                setDescriptions(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadDescriptions();
    }, [product_id]);

    async function handleUpdateDescription(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDescriptionProduct?descriptionProduct_id=${id}`, {
                description: description
            });

            toast.success('Descrição do produto atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a descrição do produto.');
        }
    }

    async function handleUpdateStatus(id: string, status: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusDescriptionProduct?descriptionProduct_id=${id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a status da descrição.');
        }

        if (status === "Indisponivel") {
            toast.success(`A descrição se encontra Disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`A descrição se encontra Indisponivel.`);
            return;
        }
    }

    async function updateTitleDescription(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (title === "") {
                toast.error('Não deixe o titulo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTitleDescription?descriptionProduct_id=${id}`,
                    {
                        title: title
                    });

                toast.success('Titulo da descrição atualizada com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o titulo dessa descrição.');
        }
    }

    async function updateOrderDescription(id: string) {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateOrderDescription?descriptionProduct_id=${id}`,
                { order: Number(order) }
            );

            toast.success('Ordem da descrição atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a ordem dessa descrição.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueDescriptionProduct', {
            params: {
                descriptionProduct_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <TableSection>
                <Cabecalho>
                    {descriptions.map((item) => {
                        return (
                            <>
                                <BlockDados
                                    style={{ marginTop: '8px' }}
                                >
                                    <InputUpdate
                                        dado={item.title}
                                        type="text"
                                        value={title}
                                        /* @ts-ignore */
                                        onChange={(e) => setTitle(e.target.value)}
                                        handleSubmit={() => updateTitleDescription(item.id)}
                                    />
                                </BlockDados>

                                <BlockDados
                                    style={{ marginTop: '-5px' }}
                                >
                                    <TextoDados
                                        chave={"Ordem"}
                                        dados={
                                            <InputUpdate
                                                dado={item.order}
                                                type="number"
                                                value={order}
                                                /* @ts-ignore */
                                                onChange={(e) => setOrder(e.target.value)}
                                                handleSubmit={() => updateOrderDescription(item.id)}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <TituloTop
                                    key={item.id}
                                    style={{ backgroundColor: cor }}
                                    onClick={() => handleClick(item.id)}
                                >
                                    {item.title}
                                </TituloTop>
                            </>
                        )
                    })}
                </Cabecalho>

                {descriptions.map((item) => {
                    return (
                        <>
                            {activeTab === item.id ?
                                <TabContents key={item.id}>
                                    <Editor
                                        apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                                        onInit={(editor) => {/* @ts-ignore */
                                            setText(editor.getContent({ format: 'text' }));
                                        }}
                                        initialValue={item.description}
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
                                    <br />
                                    <br />
                                    <EditBoxDesc>
                                        <ValueText style={{ marginBottom: '12px' }}>Salvar edição:</ValueText>
                                        <ButtonConfirm onClick={() => handleUpdateDescription(item.id)}><GiConfirmed /></ButtonConfirm>
                                        <ValueText style={{ marginBottom: '12px' }}>Decrição ativa?:</ValueText>
                                        <ButtonConfirm onClick={() => handleUpdateStatus(item.id, item.status)}><GrStatusUnknown /><TextButton>{item.status}</TextButton></ButtonConfirm>
                                        <ValueText style={{ marginBottom: '12px' }}>Deletar descrição acima:</ValueText>&nbsp;&nbsp;
                                        <Button onClick={() => handleOpenModalDelete(item.id)}>Deletar</Button>
                                    </EditBoxDesc>
                                </TabContents>
                                :
                                null
                            }
                        </>
                    )
                })}

            </TableSection>
            {modalVisible && (
                <ModalDeleteDescriptionProduct
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relation={modalItem}
                />
            )}
        </>
    )
}

export default DescriptionsProduct;