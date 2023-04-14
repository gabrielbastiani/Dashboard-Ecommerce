import React, { useContext, useEffect, useState } from 'react';
import Titulos from '../../components/Titulos';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Grid } from '../Dashboard/styles';
import MainHeader from '../../components/MainHeader';
import Aside from '../../components/Aside';
import {
    Container,
    Etiqueta,
    Block,
    BlockTop
} from './styles';
import { Button } from '../../components/ui/Button';
import Voltar from '../../components/Voltar';
import { InputPost } from '../../components/ui/InputPost';
import { Card } from '../../components/Content/styles';
import { useNavigate } from 'react-router-dom';


const NovaCategoria: React.FC = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState('');
    const [lojaID] = useState(user.loja_id);

    const [categoryID, setCategoryID] = useState("");

    const [buttonRelation, setButtonRelation] = useState(false);

    const showButton = () => {
        setButtonRelation(!buttonRelation);
    }


    async function loadCategory() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstCategory');
            setCategoryID(response.data.id);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterCategory() {
        try {
            if (categoryName === '') {
                toast.error('Digite algum nome para sua categoria!');
                return;
            }

            if (lojaID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                categoryName: categoryName.replace(/[/]/g, "-"),
                posicao: "",
                order: 0,
                loja_id: lojaID
            })

            setCategoryName('');

            setTimeout(() => {
                loadCategory();
                showButton();
            }, 2000);

        } catch (error) {
            console.log(error)
        }
    }

    async function handleRelations() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelation', {
                category_id: categoryID,
                posicao: "",
                order: 0,
                nivel: 0,
                relationId: "",
                loja_id: lojaID
            });

            toast.success('Categoria cadastrada com sucesso!');

            setTimeout(() => {
                navigate('/categorias');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={'/categorias'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Nova Categoria"
                        />

                        {buttonRelation ? (
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRelations}
                            >
                                Confirme
                            </Button>
                        ) :
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'orange' }}
                                onClick={handleRegisterCategory}
                            >
                                Salvar
                            </Button>
                        }
                    </BlockTop>

                    <Block>
                        <Etiqueta>Nome:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Block>
                </Card>
            </Container>
        </Grid>
    )

}

export default NovaCategoria;