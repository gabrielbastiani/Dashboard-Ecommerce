import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { Button } from "../../../components/ui/Button";
import { InputPost } from "../../../components/ui/InputPost";
import Select from "../../../components/ui/Select";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { setupAPIClient } from "../../../services/api";
import { TextArea } from "../../../components/ui/Input";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { Editor } from "@tinymce/tinymce-react";


const NovoTexto: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [order, setOrder] = useState(Number);
    const [positionSelected, setPositionSelected] = useState();
    const [description, setDescription] = useState('');


    async function handleTexto() {
        const apiClient = setupAPIClient();
        try {
            if (title === "") {
                toast.error('Não deixe o titulo em branco!');
                return;
            }

            await apiClient.post(`/createInstitutionalText`, {
                title: title,
                order: Number(order),
                position: positionSelected,
                description: description,
                store_id: admin.store_id
            }
            );

            toast.success('Texto institucional cadastrado com sucesso.');

            setTitle("");
            setDescription("");

            setTimeout(() => {
                navigate('/textosInstitucionais');
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o texto institucional.');
        }
    }

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value);
    }

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url='/textosInstitucionais' />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Novo Texto Institucional"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleTexto}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Titulo do texto:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o titulo do texto..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Ordem:</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="0"
                            value={order}/* @ts-ignore */
                            onChange={(e) => setOrder(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Posição desse texto:</Etiqueta>
                        <Select
                            value={positionSelected}
                            opcoes={
                                [
                                    { label: "Selecionar...", value: "" },
                                    { label: "Rodapé Loja", value: "Rodapé Loja" },
                                    { label: "PopUp Menu Topo", value: "PopUp Menu Topo" },
                                    { label: "Header Topo", value: "Header Topo" },
                                    { label: "Página Contato", value: "Página Contato" },
                                    { label: "Página Sobre", value: "Página Sobre" }
                                ]
                            }/* @ts-ignore */
                            onChange={handleChangePosition}
                        />
                    </Block>

                    <Block
                        style={{ width: '100%' }}
                    >
                        <Etiqueta>Escreva o texto:</Etiqueta>
                        <Editor
                            apiKey='3uadxc7du623dpn0gcvz8d1520ngvsigncyxnuj5f580qyz4'
                            value={description}
                            onInit={(evt, editor) => {/* @ts-ignore */
                                setText(editor.getContent({ format: 'text' }));
                            }}

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
                    </Block>
                </Card>
            </Container >
        </Grid >
    )
}

export default NovoTexto;