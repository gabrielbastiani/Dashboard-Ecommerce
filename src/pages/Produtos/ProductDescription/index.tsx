import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
import QuillImageResize from 'quill-image-resize';
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { Button } from "../../../components/ui/Button";
import { InputPost } from "../../../components/ui/InputPost";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";


const ProductDescription: React.FC = () => {

    Quill.register('modules/imageResize', QuillImageResize);

    let { slug, product_id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("");

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
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/findUniqueProduct?product_id=${product_id}`)

                setName(responseProduct.data.name || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadProduct();
    }, [product_id]);

    async function handleRegisterDescription() {
        const apiClient = setupAPIClient();
        try {
            if (title === "" || description === "") {
                toast.error('Não deixe campo em branco!');
                return;
            }

            await apiClient.post(`/createDescriptionProduct`, {
                product_id: product_id,
                title: title,
                order: 0,
                description: description,
            }
            );

            toast.success('Descrição do produto cadastrado com sucesso.');

            setTitle("");
            setDescription("");

            setTimeout(() => {
                navigate(`/produto/${slug}/${product_id}`);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar essa descrição.');
        }
    }

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={`/produto/${slug}/${product_id}`} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={`Nova descrição para o produto = ${name}`}
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterDescription}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Titulo da descrição:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o titulo aqui..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Block>

                    <Block
                        style={{ width: '100%' }}
                    >
                        <Etiqueta>Escreva a descrição:</Etiqueta>
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
                    </Block>
                </Card>
            </Container >
        </Grid >
    )
}

export default ProductDescription;