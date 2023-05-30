import { useContext, useEffect, useState } from "react";
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
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";


const NovoAtributo: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [storeID] = useState(admin.store_id);

    const [atributo, setAtributo] = useState([]);
    const [selectedAtributo, setSelectedAtributo] = useState();

    function handleChangeAtributo(e: any) {
        setSelectedAtributo(e.target.value)
    }

    useEffect(() => {
        async function loadAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allAtributos');
                setAtributo(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAtributos();
    }, []);

    async function handleRegisterAtributo() {
        try {
            if (valor === "") {
                toast.error('Não deixe o valor em branco!!!');
                return
            }

            if (storeID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar um atributo!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createAtributo', {
                tipo: tipo || selectedAtributo,
                valor: valor,
                store_id: storeID
            });

            toast.success('Atributo cadastrado com sucesso');

            setTipo("");
            setValor("");

            setTimeout(() => {
                navigate('/atributos');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar o atributo!');
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
                            tipo="h1"
                            titulo="Novo atributo"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterAtributo}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Etiqueta>Escolha uma tipo ja existente por aqui, para cadastrar um novo valor:</Etiqueta>
                    <Select
                        value={selectedAtributo}
                        /* @ts-ignore */
                        onChange={handleChangeAtributo}
                        opcoes={
                            [
                                { label: "Selecionar...", value: "" },/* @ts-ignore */
                                ...(atributo || []).map((item) => ({ label: item.tipo, value: item.tipo }))
                            ]
                        }
                    />
                    <br />

                    <Block>
                        <Etiqueta>Tipo:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite um novo tipo de atributo aqui..."
                            value={tipo || selectedAtributo}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Valor:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o valor do atributo"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </Block>
                </Card>
            </Container>
        </Grid>
    )

}

export default NovoAtributo;