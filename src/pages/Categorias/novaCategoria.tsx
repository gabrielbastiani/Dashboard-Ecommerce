import React, { FormEvent, useContext, useState } from 'react';
import Titulos from '../../components/Titulos';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Grid } from '../Dashboard/styles';
import MainHeader from '../../components/MainHeader';
import Aside from '../../components/Aside';
import {
    Card,
    Container,
    Formulario,
    Etiqueta
} from './styles';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import Voltar from '../../components/Voltar';


const NovaCategoria: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [categoryName, setCategoryName] = useState('');
    const [codigo, setCodigo] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            if (categoryName === '' || codigo === '') {
                toast.error('Digite algum nome para sua categoria!')
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                categoryName: categoryName,
                codigo: codigo,
                loja_id: user.loja_id
            })

            toast.success('Categoria cadastrada com sucesso!')
            setCategoryName('');
            setCodigo('');
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    
                    <Voltar url={'/categorias'}/>

                    <Titulos
                        tipo="h1"
                        titulo="Nova Categoria"
                    />

                    <Formulario onSubmit={handleRegister}>
                        <Etiqueta>Nome:</Etiqueta>
                        <Input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <Etiqueta>Código:</Etiqueta>
                        <Input
                            type="text"
                            placeholder="Digite o código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />

                        <Button
                            type="submit"
                            style={ {backgroundColor: 'green'} }
                        >
                            Cadastrar
                        </Button>
                    </Formulario>

                </Card>
            </Container>
        </Grid>
    )

}

export default NovaCategoria;