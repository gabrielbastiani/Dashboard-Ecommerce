import React, { FormEvent, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../styles";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { toast } from 'react-toastify';
import { setupAPIClient } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { TextoDados } from "../../../components/TextoDados";


const Categoria: React.FC = () => {

    let { category_id, categoryName, codigo } = useParams();
    const navigate = useNavigate();

    const [categoryNames, setCategoryNames] = useState(categoryName);
    const [codigos, setCodigos] = useState('');


    async function updateCategoryName(event: FormEvent) {
        event.preventDefault();
        try {
            if (categoryNames === '') {
                toast.error('Não deixe em branco!!!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.put(`/categoryNameUpdate?category_id=${category_id}`, { categoryName: categoryNames });

            toast.success('Nome da categoria atualizada com sucesso.');

            setTimeout(function () {
                navigate('/categorias');
            }, 2500);

        } catch (err) {
            toast.error('Ops erro ao atualizar o nome da categoria.');
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
                    <Titulos
                        tipo="h1"
                        titulo={categoryName}
                    />

                    <TextoDados
                        chave={"Nome"}
                        dados={
                            <InputUpdate
                                onSubmit={updateCategoryName}
                                dado={categoryName}
                                type="text"
                                /* @ts-ignore */
                                placeholder={categoryName}
                                value={categoryNames}
                                /* @ts-ignore */
                                onChange={(e) => setCategoryNames(e.target.value)}
                            />
                        }
                    />

                </Card>
            </Container>
        </Grid>
    )
}

export default Categoria;