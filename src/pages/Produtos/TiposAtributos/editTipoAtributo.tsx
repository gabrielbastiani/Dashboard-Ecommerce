import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";


const EditTipoAtributo: React.FC = () => {

    let { typeAttribute_id } = useParams();
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [typeUpdate, setTypeUpdate] = useState("");


    useEffect(() => {
        async function loadType() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/findUniqueTypeAttribute?typeAttribute_id=${typeAttribute_id}`);
                setType(response.data.type || "");
            } catch (error) {
                console.log(error);
            }
        }
        loadType();
    }, [typeAttribute_id]);

    async function updateType() {
        try {
            const apiClient = setupAPIClient();
            if (type === '') {
                toast.error('Não deixe o campo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTypeAttribute?typeAttribute_id=${typeAttribute_id}`, { type: typeUpdate });
                toast.success('Tipo do atributo atualizado com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o type do atributo.');
        }
    }


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Voltar
                            url="/tiposAtributos"
                        />
                        <BlockTop>
                            <Titulos
                                /* @ts-ignore */
                                type="h1"
                                titulo={`Editar tipo de atributo = ${type}`}
                            />
                        </BlockTop>

                        <BlockDados>
                            <TextoDados
                                chave={"Tipo de atributo"}
                                dados={
                                    <InputUpdate
                                        dado={type}
                                        type="text"
                                        placeholder={type}
                                        value={typeUpdate}
                                        onChange={(e) => setTypeUpdate(e.target.value)}
                                        handleSubmit={updateType}
                                    />
                                }
                            />
                        </BlockDados>

                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default EditTipoAtributo;