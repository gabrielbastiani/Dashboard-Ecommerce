import React, { FormEvent, useContext, useState } from 'react';
import Titulos from '../../components/Titulos';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Grid } from '../Dashboard/styles';
import MainHeader from '../../components/MainHeader';
import Aside from '../../components/Aside';
import { Card, Container } from './styles';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';


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

    /* renderCabecalho(){
        const { nome } = this.state;
        return (
            <div className="flex">
                <div className="flex-1 flex">
                    <Titulo tipo="h1" titulo={nome || "Nova Categoria"} />
                </div>
                <div className="flex-1 flex flex-end">
                    <ButtonSimples onClick={() => this.salvarCategoria()} type="success" label="Salvar" />
                </div>
            </div>
        )
    }

    onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate());

    renderDados(){
        const { nome, codigo, erros } = this.state;
        return (
            <div className="flex-2">
                <InputSimples
                    name="nome"
                    label="Nome:"
                    value={nome}
                    erro={erros.nome}
                    onChange={(ev) => this.onChangeInput("nome", ev.target.value)} />
                <InputSimples
                    name="codigo"
                    label="Código:"
                    value={codigo}
                    erro={erros.codigo}
                    onChange={(ev) => this.onChangeInput("codigo", ev.target.value)} />
            </div>
        )
    }

    render(){
        return (
            <div className="Nova-Categoria full-width">
                <div className="Card">
                    <Voltar history={this.props.history} />
                    <AlertGeral aviso={this.state.aviso} />
                    {this.renderCabecalho()}
                    <div className="flex horizontal">
                        {this.renderDados()}
                        <div className="flex-1"></div>
                    </div>
                </div>
            </div>
        )
    }

*/

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Nova Categoria"
                    />

                    <form onSubmit={handleRegister}>
                        <Input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />

                        <Input
                            type="text"
                            placeholder="Digite o código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />

                        <Button type="submit">
                            Cadastrar
                        </Button>
                    </form>

                </Card>
            </Container>
        </Grid>
    )

}

export default NovaCategoria;