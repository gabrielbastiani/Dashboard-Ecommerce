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

    const [userNames, setUserNames] = useState(user.nameComplete);
    const [dataName, setDataName] = useState('');

    const [emails, setEmails] = useState(user.email);
    const [dataEmail, setDataEmail] = useState('');

    const [showElement, setShowElement] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);


    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (userNames === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/nameUserUpdate?user_id=${user.id}`, { nameComplete: userNames || dataName });
                toast.success('Nome do usuario atualizado com sucesso.');
                refreshUserLoad();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    async function updateEmail() {
        try {
            const apiClient = setupAPIClient();
            if (emails === '') {
                toast.error('Não deixe email em branco!!!');
                return;
            } else {
                await apiClient.put(`/emailUserUpdate?user_id=${user.id}`, { email: emails || dataEmail });
                toast.success('Email do usuario atualizado com sucesso.');
                refreshUserLoad();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    useEffect(() => {
        async function refreshUser() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/listExactUser?user_id=${user.id}`)
            setUserNames(response?.data?.nameComplete);
            setDataName(response?.data?.nameComplete);
            setDataEmail(response?.data?.email);
        }
        refreshUser();
    }, [user.id])

    async function refreshUserLoad() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/listExactUser?user_id=${user.id}`)
        setUserNames(response?.data?.nameComplete);
        setDataName(response?.data?.nameComplete);
        setDataEmail(response?.data?.email);
    }

    async function handleRecovery() {
        const apiClient = setupAPIClient();
        try {
            setLoading(true);
            await apiClient.post('/recoverDashboard', { email: user.email });
            setLoading(false);

            showOrHide();

        } catch (err) {
            console.log(err);
        }
    }

    async function deleteRecoverID() {
        const apiClient = setupAPIClient();
        try {
            setLoading(true);
            const response = await apiClient.get('/recoverFind');
            const recoverID = response?.data?.id;

            await apiClient.delete(`/deleteRecoverID?recovery_id=${recoverID}`);

            setLoading(false);

            showOrHide();

        } catch (error) {
            console.log(error);
        }
    }

    async function handleRecoveryPassword() {
        const apiClient = setupAPIClient();
        try {
            // eslint-disable-next-line eqeqeq
            if (newPassword != password) {
                toast.error('Senhas diferentes')
                return;
            }
            const response = await apiClient.get('/recoverFind');
            const recoverID = response?.data?.id;

            await apiClient.put(`/recover?recovery_id=${recoverID}`, { password });

            toast.success('Senha atualizada com sucesso.');

            setNewPassword("");
            setPassword("");

            if (!recoverID) {
                await apiClient.delete(`/deleteRecoverID?recovery_id=${recoverID}`);
                return;
            }

            showOrHide();

        } catch (err) {
            console.log(err);
            toast.error('Erro ao atualizar a sua senha');
        }

    }

    const showOrHide = () => {
        setShowElement(!showElement);
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
                        {showElement ?
                            <Button
                                type="submit"
                                style={{ backgroundColor: 'green' }}
                                onClick={handleRecoveryPassword}
                            >
                                Salvar
                            </Button>
                            :
                            <>
                            </>
                        }

                    </BlockTop>

                    <GridDate>
                        <SectionDate>
                            <BlockDados>
                                <TextoDados
                                    chave={"Nome"}
                                    dados={
                                        <InputUpdate
                                            dado={dataName}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={user.nameComplete}
                                            value={userNames}
                                            /* @ts-ignore */
                                            onChange={(e) => setUserNames(e.target.value)}
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
                                            dado={dataEmail}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={user.email}
                                            value={emails}
                                            /* @ts-ignore */
                                            onChange={(e) => setEmails(e.target.value)}
                                            handleSubmit={updateEmail}
                                        />
                                    }
                                />
                            </BlockDados>
                        </SectionDate>

                        {showElement ?
                            <SectionDate>
                                <Button
                                    onClick={deleteRecoverID}
                                >
                                    Cancelar redefinição de senha
                                </Button>
                                <br />
                                <br />
                                <Block>
                                    <Etiqueta>Nova Senha:</Etiqueta>
                                    <InputPost
                                        type='password'
                                        placeholder="Digite nova senha"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Block>

                                <Block>
                                    <Etiqueta>Confirme nova senha:</Etiqueta>
                                    <InputPost
                                        type='password'
                                        placeholder='Repetir a nova senha'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Block>
                            </SectionDate>
                            :
                            <SectionDate>
                                <Block>
                                    <Button
                                        type="submit"
                                        /* @ts-ignore */
                                        loading={loading}
                                        onClick={handleRecovery}
                                    >
                                        Redefinir sua senha
                                    </Button>
                                </Block>
                            </SectionDate>
                        }
                    </GridDate>
                </Card>
            </Container>
        </Grid>
    )
}

export default Perfil;