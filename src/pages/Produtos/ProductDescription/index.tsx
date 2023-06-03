import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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


const ProductDescription: React.FC = () => {

    let { slug, product_id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("");


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

                    <Block>
                        <Etiqueta>Escreva a descrição:</Etiqueta>
                        <TextArea
                            style={{ height: '450px', padding: '15px' }}
                            placeholder="Digite aqui..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Block>
                </Card>
            </Container >
        </Grid >
    )
}

export default ProductDescription;