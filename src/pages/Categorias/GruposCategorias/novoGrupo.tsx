import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../styles";
import { Card } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { BlockCategory, TextButton } from "../Categoria/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { InputPost } from "../../../components/ui/InputPost";
import Select from "../../../components/ui/Select";


const NovoGrupo: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [nameGroup, setNameGroup] = useState('');
    const [selectedPosicao, setSelectedPosicao] = useState();

    const [lojaID] = useState(user.loja_id);

    const [showCategory, setShowCategory] = useState(false);

    const showOrHideCategory = () => {
        setShowCategory(!showCategory);
    }

    const [findFirstGroup, setFindFirstGroup] = useState("");

    function handleChangePosicao(e: any) {
        setSelectedPosicao(e.target.value);
    }

    async function loadGroup() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstGroup');
            setFindFirstGroup(response.data.id || "");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterGroup() {
        try {
            if (nameGroup === '') {
                toast.error('Não deixe o nome do grupo em branco!!!')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/group', {
                nameGroup: nameGroup,
                itemName: "",
                nivel: 0,
                order: 0,
                posicao: selectedPosicao,
                loja_id: lojaID
            });

            toast.success('Grupo cadastrado com sucesso');

            setNameGroup("");

            loadGroup();
            showOrHideCategory();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>

                {showCategory ? (
                    <Card>
                        <BlockCategory>
                            <Button
                                style={{ backgroundColor: 'green' }}
                            >
                                <AiOutlinePlusCircle size={25} />
                                <Link to={`/grupo/${findFirstGroup}`} >
                                    <TextButton>Clique aqui, para cadastrar as categorias para esse grupo</TextButton>
                                </Link>
                            </Button>
                        </BlockCategory>
                    </Card>
                ) :
                    <Card>

                        <Voltar url='/groups' />

                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Novo Grupo"
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRegisterGroup}
                            >
                                Salvar
                            </Button>
                        </BlockTop>

                        <Block>
                            <Etiqueta>Nome do grupo:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome aqui..."
                                value={nameGroup}
                                onChange={(e) => setNameGroup(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Posição desse grupo:</Etiqueta>
                            <Select
                                value={selectedPosicao}
                                opcoes={
                                    [
                                        { label: "Menu Topo", value: "Menu Topo" },
                                        { label: "Lateral esquerda", value: "Lateral esquerda" }
                                    ]
                                }/* @ts-ignore */
                                onChange={handleChangePosicao}
                            />
                        </Block>

                    </Card>
                }
            </Container>
        </Grid>
    )

}

export default NovoGrupo;