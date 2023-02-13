import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    BlockTop,
    Card,
    Container,
} from "../styles";
import {
    BlockDados,
} from "./styles"
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { toast } from 'react-toastify';
import { setupAPIClient } from "../../../services/api";
import { useParams } from "react-router-dom";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { TextoDados } from "../../../components/TextoDados";
import { Button } from "../../../components/ui/Button";
import { InputSelect } from "../../../components/ui/InputSelect";


const Categoria: React.FC = () => {

    let { category_id, categoryName, codigo } = useParams();

    const [categoryNames, setCategoryNames] = useState(categoryName);
    const [dataName, setDataName] = useState('');

    const [codigos, setCodigos] = useState(codigo);
    const [dataCodigo, setDataCodigo] = useState('');

    const [disponibilidades, setDisponibilidades] = useState(false);
    const [status, setStatus] = useState("");

    console.log(status)

    useEffect(() => {
        refreshCategory();
        statusInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function updateCategoryName() {
        try {
            const apiClient = setupAPIClient();

            if (categoryNames === '') {
                toast.error('Não deixe em branco!!!');
                return;
            } else {
                await apiClient.put(`/categoryNameUpdate?category_id=${category_id}`, { categoryName: categoryNames || dataName });

                toast.success('Nome da categoria atualizada com sucesso.');

                refreshCategory();
            }

        } catch (err) {
            toast.error('Ops erro ao atualizar o nome da categoria.');
        }
    }

    async function updateCategoryCodigo() {
        try {
            const apiClient = setupAPIClient();

            if (codigos === '') {
                toast.error('Não deixe em branco!!!');
                return;
            } else {
                await apiClient.put(`/categoryCodigoUpdate?category_id=${category_id}`, { codigo: codigos || dataCodigo });

                toast.success('Nome do código atualizado com sucesso.');

                refreshCategory();
            }

        } catch (err) {
            toast.error('Ops erro ao atualizar o codigo da categoria.');
        }
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
    
            await apiClient.put(`/updateDisponibilidadeCategory?category_id=${category_id}`);
              
            toast.success(`Categoria alterada para ${status} com sucesso.`);

            refreshCategory();
            statusInitial();

        } catch (err) {
            toast.error('Ops erro ao atualizar a disponibilidade da categoria.');
        }
    }

    async function refreshCategory() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/exactCategory?category_id=${category_id}`);

        setCategoryNames(response?.data?.categoryName);
        setDataName(response?.data?.categoryName);
        setDataCodigo(response?.data?.codigo);
        setDisponibilidades(response?.data?.disponibilidade);

    }

    function statusInitial() {
        if (!disponibilidades) {
            setStatus('Disponivel');
        } else {
            setStatus('Indisponivel');
        }
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Voltar
                        url="/categorias"
                    />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={dataName}
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: '#FB451E' }}
                            onClick={() => alert('delete')}
                        >
                            Remover
                        </Button>
                    </BlockTop>

                    <BlockDados>
                        <TextoDados
                            chave={"Nome"}
                            dados={
                                <InputUpdate
                                    dado={categoryNames || dataName}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={categoryName}
                                    value={categoryNames}
                                    /* @ts-ignore */
                                    onChange={(e) => setCategoryNames(e.target.value)}
                                    handleSubmit={updateCategoryName}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Código"}
                            dados={
                                <InputUpdate
                                    dado={codigos || dataCodigo}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={codigo}
                                    value={codigos}
                                    /* @ts-ignore */
                                    onChange={(e) => setCodigos(e.target.value)}
                                    handleSubmit={updateCategoryCodigo}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Disponibilidade"}
                            dados={
                                <InputSelect
                                    dado={status}
                                    handleSubmit={updateStatus}
                                />
                            }
                        />
                    </BlockDados>
                </Card>
            </Container>
        </Grid>
    )
}

export default Categoria;