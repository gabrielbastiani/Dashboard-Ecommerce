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



const NovoTexto: React.FC = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [order, setOrder] = useState(Number);
    const [posicaoSelected, setPosicaoSelected] = useState();
    const [description, setDescription] = useState('');


    async function handleTexto() {
        const apiClient = setupAPIClient();
        try {
            if (title === "") {
                toast.error('Não deixe o titulo em branco!');
                return;
            }

            await apiClient.post(`/createTextoInstitucional`, {
                title: title,
                order: Number(order),
                posicao: posicaoSelected,
                description: description,
                loja_id: user.loja_id
                }
            );

            toast.success('Texto institucional cadastrado com sucesso.');

            setTitle("");
            setDescription("");

            setTimeout(() => {
                navigate('/textosInstitucionais');
            }, 2000);

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o texto institucional.');
        }
    }

    function handleChangePosicao(e: any) {
        setPosicaoSelected(e.target.value);
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
                            value={posicaoSelected}
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
                            onChange={handleChangePosicao}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Escreva o texto:</Etiqueta>
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

export default NovoTexto;