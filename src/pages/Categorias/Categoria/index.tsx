import React, { FormEvent, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../styles";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { toast } from 'react-toastify';
import { setupAPIClient } from "../../../services/api";
import { useParams } from "react-router-dom";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";


const Categoria: React.FC = () => {

    let { category_id, categoryName, codigo } = useParams();

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
            await apiClient.put(`/categoryNameUpdate?category_id=${category_id}`, { categoryName: categoryNames })

            toast.success('Nome da categoria atualizada com sucesso.');

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
                        titulo="Categoria"
                    />

                    <TextoDados
                        chave="Nome"
                        valor={(
                            <InputUpdate
                                type="text"
                                /* @ts-ignore */
                                placeholder={categoryName}
                                value={categoryNames}
                                /* @ts-ignore */
                                onChange={(e) => setCategoryNames(e.target.value)}

        
                            />
                        )}
                    />


                    {/* <form onSubmit={updateCategoryName}>
                        <input
                            type="text"
                            placeholder={categoryName}
                            value={categoryNames}
                            onChange={(e) => setCategoryNames(e.target.value)}
                        />

                        <div>
                            <button
                                type="submit"
                            >
                                Atualizar
                            </button>
                        </div>
                    </form> */}

                </Card>
            </Container>
        </Grid>
    )
}

export default Categoria;