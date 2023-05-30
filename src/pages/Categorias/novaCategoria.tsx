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
import { TextArea } from '../../components/ui/Input';


const NovaCategoria: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [storeID] = useState(admin.store_id);

    async function handleRegisterCategory() {
        try {
            if (name === '') {
                toast.error('Não deixe o nome em branco!!!')
                return
            }

            if (storeID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createCategory', {
                name: name,
                description: description,
                nivel: 0,
                store_id: storeID
            });

            toast.success('Categoria cadastrada com sucesso');

            setName("");

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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Descrição da categoria:</Etiqueta>
                        <TextArea
                            style={{ height: '250px', padding: '15px' }}
                            placeholder="Digite aqui..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Block>
                </Card>
            </Container>
        </Grid>
    )

}

export default NovaCategoria;