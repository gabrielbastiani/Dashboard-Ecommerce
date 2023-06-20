import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { Block, BlockTop, Etiqueta } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { InputPost } from "../../../components/ui/InputPost";


const NovoAtributo: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [storeID] = useState(admin.store_id);


    async function handleRegisterTypeAtribute() {
        try {
            if (type === "") {
                toast.error('Não deixe o campo em branco!!!');
                return
            }

            if (storeID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar um tipo de atributo!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createTypeAttribute', {
                type: type,
                store_id: storeID
            });

            toast.success('Tipo de atributo cadastrado com sucesso');

            setType("");

            setTimeout(() => {
                navigate('/atributos');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar o tipo de atributo!');
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url='/atributos' />

                    <BlockTop>
                        <Titulos
                            /* @ts-ignore */
                            type="h1"
                            titulo="Novo tipo de atributo"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterTypeAtribute}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Tipo de atributo:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite aqui..."
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Block>
                </Card>
            </Container>
        </Grid>
    )

}

export default NovoAtributo;