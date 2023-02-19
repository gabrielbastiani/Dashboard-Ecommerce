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


const NovaCategoria: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [categoryName, setCategoryName] = useState('');
    const [codigo, setCodigo] = useState('');

    function removerAcentos(s: any) {
        return s.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/ +/g, "-")
            .replace(/-{2,}/g, "-")
            .replace(/[/]/g, "-");
    }

    async function handleRegisterCategory() {
        try {
            if (categoryName === '') {
                toast.error('Digite algum nome para sua categoria!')
                return;
            }

            if (codigo === '') {
                toast.error('Digite o codigo para sua categoria!')
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/category', {
                categoryName: categoryName.replace(/[/]/g, "-"),
                codigo: removerAcentos(codigo),
                loja_id: user.loja_id
            })

            toast.success('Categoria cadastrada com sucesso!');
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

                    <Block>
                        <Etiqueta>Código:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </Block>

                </Card>
            </Container>
        </Grid>
    )

}

export default NovaCategoria;