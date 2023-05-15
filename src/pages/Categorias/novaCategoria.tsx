import React, { useContext, useState } from 'react';
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

    async function handleRegisterCategory() {
        try {
            if (categoryName === '') {
                toast.error('Não deixe o nome em branco!!!')
                return
            }

            if (lojaID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                categoryName: categoryName,
                loja_id: lojaID
            });

            toast.success('Categoria cadastrada com sucesso');

            setCategoryName("");

            setTimeout(() => {
                navigate('/categorias');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar a categoria!');
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
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterCategory}
                        >
                            Salvar
                        </Button>
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