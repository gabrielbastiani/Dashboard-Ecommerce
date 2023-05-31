import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { InputPost } from "../../../components/ui/InputPost";
import { TextArea } from "../../../components/ui/Input";


const ProdutoDescricao: React.FC = () => {

    let { slug, product_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        async function findDataProduct() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueProduct?product_id=${product_id}`);

                setName(response.data.name || "");

            } catch (error) {
                console.error(error);
            }
        }
        findDataProduct();
    }, [product_id]);

    async function handleRegisterDescription() {
        const apiClient = setupAPIClient();
        try {
            if (title === "") {
                toast.error('Não deixe o titulo em branco!');
                return;
            }

            await apiClient.post(`/createDescriptionProduct`, {
                product_id: product_id,
                title: title,
                description: description,
            }
            );

            toast.success('Descrição cadastrada com sucesso.');

            setTimeout(() => {
                navigate(`/produto/${slug}/${product_id}`);
            }, 3000);

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a descrição no produto.');
        }
    }



    return (
        <>
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
                        <br />
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
                            <Etiqueta>Descrição:</Etiqueta>
                            <TextArea
                                style={{ height: '450px', padding: '15px' }}
                                placeholder="Digite aqui..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Block>

                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default ProdutoDescricao;