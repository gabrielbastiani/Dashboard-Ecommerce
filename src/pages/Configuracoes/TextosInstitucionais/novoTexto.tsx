import { useContext, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
import QuillImageResize from 'quill-image-resize';
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
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";


const NovoTexto: React.FC = () => {

    Quill.register('modules/imageResize', QuillImageResize);

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [order, setOrder] = useState(Number);
    const [positionSelected, setPositionSelected] = useState();
    const [description, setDescription] = useState<any>('');

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
                <Card
                    style={{ height: '150%' }}
                >

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
                            }/* @ts-ignore */
                            onChange={handleChangePosition}
                        />
                    </Block>

                    <Block
                        style={{ width: '100%' }}
                    >
                        <Etiqueta>Escreva o texto:</Etiqueta>
                        <ReactQuill
                            style={{ backgroundColor: 'white', color: 'black', height: '500px' }}
                            theme="snow"
                            value={description}
                            onChange={handleChange}
                            modules={module}
                        />
                    </Block>
                </Card>
            </Container >
        </Grid >
    )
}

export default NovoTexto;