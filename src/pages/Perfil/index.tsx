import React, { useContext, useEffect, useState } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import { Block, BlockTop, Etiqueta } from "../Categorias/styles";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { BlockDados } from "../Categorias/Categoria/styles";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import { SectionDate } from "../Configuracoes/styles";
import { InputPost } from "../../components/ui/InputPost";
import { GridDate } from "./styles";
import { AuthContext } from '../../contexts/AuthContext';
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";


const Perfil: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [nameCompleto, setNameCompleto] = useState('');
    const [name, setName] = useState(user.nameComplete);
    const [emailDate, setEmailDate] = useState();
    const [email, setEmail] = useState(user.email);


    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (name === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/nameUserUpdate?user_id=${user.id}`, { nameCompleto: name || nameCompleto });
                toast.success('Nome do usuario atualizado com sucesso.');
                refreshUser();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    async function updateEmail() {
        try {
            const apiClient = setupAPIClient();
            if (email === '') {
                toast.error('Não deixe email em branco!!!');
                return;
            } else {
                await apiClient.put(`/emailUserUpdate?user_id=${user.email}`, { email: emailDate || email });
                toast.success('Email do usuario atualizado com sucesso.');
                refreshUser();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    async function refreshUser() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/listExactUser?user_id=${user.id}`);
        setName(response?.data?.nameCompleto);
        setNameCompleto(response?.data?.nameCompleto);
        setEmailDate(response?.data?.email);
    }

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Perfil"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            /* onClick={() => alert('clicou')} */
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <GridDate>
                        <SectionDate>
                            <BlockDados>
                                <TextoDados
                                    chave={"Nome"}
                                    dados={
                                        <InputUpdate
                                            dado={name}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={user.nameComplete}
                                            value={nameCompleto}
                                            /* @ts-ignore */
                                            onChange={ (e) => setName(e.target.value) }
                                            handleSubmit={updateName}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"E-mail"}
                                    dados={
                                        <InputUpdate
                                            dado={emailDate}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={user.email}
                                            value={email}
                                            /* @ts-ignore */
                                            onChange={ (e) => setEmail(e.target.value) }
                                            handleSubmit={updateEmail}
                                        />
                                    }
                                />
                            </BlockDados>
                        </SectionDate>

                        <SectionDate>
                            <Block>
                                <Etiqueta>Nova Senha:</Etiqueta>
                                <InputPost
                                    type='password'
                                    placeholder="Nova senha"
                                    onChange={() => alert('clicou')}
                                />
                            </Block>

                            <Block>
                                <Etiqueta>Confirme nova senha:</Etiqueta>
                                <InputPost
                                    type='password'
                                    placeholder='Repetir a nova senha'
                                    onChange={() => alert('clicou')}
                                />
                            </Block>
                        </SectionDate>
                    </GridDate>
                </Card>
            </Container>
        </Grid>
    )
}

export default Perfil;