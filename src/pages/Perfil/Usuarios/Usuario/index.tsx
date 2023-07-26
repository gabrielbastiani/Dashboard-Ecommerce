import React, { useEffect, useState } from "react";
import { setupAPIClient } from "../../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../../Dashboard/styles";
import MainHeader from "../../../../components/MainHeader";
import Aside from "../../../../components/Aside";
import { Card, Container } from "../../../../components/Content/styles";
import { Block, BlockTop, Etiqueta } from "../../../Categorias/styles";
import Titulos from "../../../../components/Titulos";
import { Button } from "../../../../components/ui/Button";
import { GridDate } from "../../styles";
import { SectionDate } from "../../../Configuracoes/styles";
import { BlockDados } from "../../../Categorias/Categoria/styles";
import { TextoDados } from "../../../../components/TextoDados";
import { InputUpdate } from "../../../../components/ui/InputUpdate";
import { InputPost } from "../../../../components/ui/InputPost";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonSelect } from "../../../../components/ui/ButtonSelect";


const Usuario: React.FC = () => {

    let { admin_id } = useParams();
    const navigate = useNavigate();

    const [userNames, setUserNames] = useState("");
    const [dataName, setDataName] = useState("");

    const [emails, setEmails] = useState("");
    const [dataEmail, setDataEmail] = useState("");

    const [role, setRole] = useState("");
    const [status, setStatus] = useState(Boolean);

    const [showElement, setShowElement] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const apiClient = setupAPIClient();
        async function loadEmployee() {
            try {
                const { data } = await apiClient.get(`/admin/listExactAdminID?admin_id=${admin_id}`)
                setUserNames(data?.name);
                setDataName(data?.name);
                setEmails(data?.email);
                setRole(data?.role);
                setStatus(data?.authenticated);
            } catch (error) {
                console.log(error);
            }
        }
        loadEmployee();
    }, [admin_id])

    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (userNames === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/admin/updateNameAdminOrEmployee?admin_id=${admin_id}`, { name: userNames || dataName });

                toast.success('Nome do empregado atualizado com sucesso.');
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
                await apiClient.put(`/admin/updateDateAdmin?admin_id=${admin_id}`, { email: emails || dataEmail });

                toast.success('Email do empregado atualizado com sucesso.');
                refreshUserLoad();
            }
        } catch (err) {
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    useEffect(() => {
        async function refreshUser() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/admin/listExactAdminID?admin_id=${admin_id}`)
            setUserNames(response?.data?.name);
            setDataName(response?.data?.name);
            setDataEmail(response?.data?.email);
        }
        refreshUser();
    }, [admin_id])

    async function refreshUserLoad() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/admin/listExactAdminID?admin_id=${admin_id}`)
        setUserNames(response?.data?.name);
        setDataName(response?.data?.name);
        setDataEmail(response?.data?.email);
    }

    async function handleRecovery() {
        const apiClient = setupAPIClient();
        try {
            setLoading(true);
            await apiClient.post('/admin/recoverPasswordDashboard', { email: emails });
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

    async function updateRole() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/admin/updateRoleEmployee?admin_id=${admin_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o cargo do usuario.');
        }

        if (role === "EMPLOYEE") {
            toast.success(`Esse usuario agora é um ADMINISTRADOR.`);
            return;
        }

        if (role === "ADMIN") {
            toast.success(`Esse usuario agora é um EMPREGADO.`);
            return;
        }
    }

    async function activeDesactiveUser() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/admin/activeOrDesactiveAdmin?admin_id=${admin_id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao ativar ou desativar o usuario.');
        }

        if (status === true) {
            toast.success(`Usuario desativado.`);
            return;
        }

        if (status === false) {
            toast.success(`Usuario ativado.`);
            return;
        }
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
                            titulo="Usuario"
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
                                            placeholder={dataName}
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
                                            placeholder={dataEmail}
                                            value={emails}
                                            /* @ts-ignore */
                                            onChange={(e) => setEmails(e.target.value)}
                                            handleSubmit={updateEmail}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Cargo do usuario"}
                                    dados={
                                        <ButtonSelect
                                            /* @ts-ignore */
                                            dado={role === "EMPLOYEE" ? "Empregado" : role === "ADMIN" ? "Administrador" : null}
                                            handleSubmit={updateRole}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Status do usuario"}
                                    dados={
                                        <ButtonSelect
                                            /* @ts-ignore */
                                            dado={status === false ? "Desativado" : status === true ? "Ativado" : null}
                                            handleSubmit={activeDesactiveUser}
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

export default Usuario;