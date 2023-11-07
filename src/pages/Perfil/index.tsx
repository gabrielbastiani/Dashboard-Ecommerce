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
import Warnings from "../../components/Warnings";


const Perfil: React.FC = () => {

    const { admin } = useContext(AuthContext);

    const [userNames, setUserNames] = useState(admin.name);
    const [dataName, setDataName] = useState('');

    const [emails, setEmails] = useState(admin.email);
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
                await apiClient.put(`/admin/updateNameAdminOrEmployee?admin_id=${admin.id}`, { name: userNames || dataName });
                if (admin.role === "EMPLOYEE") {
                    toast.success('Nome do empregado atualizado com sucesso.');
                    refreshUserLoad();
                    return;
                }

                toast.success('Nome do administrador atualizado com sucesso.');
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
                await apiClient.put(`/admin/updateDateAdmin?admin_id=${admin.id}`, { email: emails || dataEmail });
                if (admin.role === "EMPLOYEE") {
                    toast.success('E-mail do empregado atualizado com sucesso.');
                    refreshUserLoad();
                    return;
                }
                toast.success('Email do administrador atualizado com sucesso.');
                refreshUserLoad();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    useEffect(() => {
        async function refreshUser() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/admin/listExactAdminID?admin_id=${admin.id}`)
            setUserNames(response?.data?.name);
            setDataName(response?.data?.name);
            setDataEmail(response?.data?.email);
        }
        refreshUser();
    }, [admin.id])

    async function refreshUserLoad() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/admin/listExactAdminID?admin_id=${admin.id}`)
        setUserNames(response?.data?.name);
        setDataName(response?.data?.name);
        setDataEmail(response?.data?.email);
    }

    async function handleRecovery() {
        const apiClient = setupAPIClient();
        try {
            setLoading(true);
            await apiClient.post('/admin/recoverPasswordDashboard', { email: admin.email });
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
            const response = await apiClient.get('/admin/findFirstAdmin');
            const recoverID = response?.data?.id;

            await apiClient.delete(`/admin/deleteRecoveryIDAdmin?passwordRecoveryAdmin_id=${recoverID}`);

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
            const response = await apiClient.get('/admin/findFirstAdmin');
            const recoverID = response?.data?.id;

            await apiClient.put(`/admin/recoverAdmin?passwordRecoveryAdmin_id=${recoverID}`, { password: password });

            toast.success('Senha atualizada com sucesso.');

            setNewPassword("");
            setPassword("");

            if (!recoverID) {
                await apiClient.delete(`/admin/deleteRecoveryIDAdmin?passwordRecoveryAdmin_id=${recoverID}`);
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
                <Warnings />
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
                            null
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
                                            placeholder={admin.name}
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
                                            placeholder={admin.email}
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