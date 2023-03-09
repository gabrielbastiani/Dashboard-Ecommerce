import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { useParams } from "react-router-dom";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { TextoDados } from "../../../components/TextoDados";
import { Button } from "../../../components/ui/Button";
import { Card, Container } from "../../../components/Content/styles";
import { BlockTop } from "../../Categorias/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { GridDate } from "../../Perfil/styles";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";


const Cliente: React.FC = () => {

    let { nameComplete, user_id } = useParams();

    const [nameCompletes, setNameCompletes] = useState(nameComplete);
    const [cpfcnpjs, setCpfcnpjs] = useState('');
    const [inscricaoEstaduals, setInscricaoEstaduals] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState('');
    const [ceps, setCeps] = useState('');
    const [generos, setGeneros] = useState('');
    const [newslatters, setNewslatters] = useState(false);


    async function refreshUser() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get(`/listExactUser?user_id=${user_id}`);

        setNameCompletes(response.data.nameComplete);
        setCpfcnpjs(response.data.cpfOrCnpj);
        setInscricaoEstaduals(response.data.inscricaoEstadual);
        setPhones(response.data.phone);
        setEmails(response.data.email);
        setDataNascimentos(response.data.dataNascimento);
        setLocals(response.data.local);
        setNumeros(response.data.numero);
        setBairros(response.data.bairro);
        setCidades(response.data.cidade);
        setEstados(response.data.estado);
        setCeps(response.data.CEP);
        setGeneros(response.data.genero);
        setNewslatters(response.data.newslatter);

    }

    useEffect(() => {
        async function loadUser() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listExactUser?user_id=${user_id}`);
                const {
                    nameComplete,
                    email,
                    cpfOrCnpj,
                    inscricaoEstadual,
                    phone,
                    dataNascimento,
                    genero,
                    newslatter,
                    local,
                    numero,
                    bairro,
                    CEP,
                    cidade,
                    estado
                } = response.data;

                setNameCompletes(nameComplete);
                setCpfcnpjs(cpfOrCnpj);
                setInscricaoEstaduals(inscricaoEstadual);
                setPhones(phone);
                setEmails(email);
                setDataNascimentos(dataNascimento);
                setLocals(local);
                setNumeros(numero);
                setBairros(bairro);
                setCidades(cidade);
                setEstados(estado);
                setCeps(CEP);
                setGeneros(genero);
                setNewslatters(newslatter);

            } catch (error) {
                console.log(error);
            }
        }
        loadUser();
    }, [user_id])

    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (nameCompletes === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/nameUserUpdate?user_id=${user_id}`, { nameComplete: nameCompletes });
                toast.success('Nome atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    async function updateCpfOrCnpj() {
        try {
            const apiClient = setupAPIClient();
            if (cpfcnpjs === '') {
                toast.error('Não deixe o CPF/CNPJ em branco!!!');
                return;
            } else {
                await apiClient.put(`/cpfOrConpjUserUpdate?user_id=${user_id}`, { cpfOrCnpj: cpfcnpjs });
                toast.success('CPF/CNPJ atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CPF/CNPJ.');
        }
    }


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Voltar
                            url="/clientes"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={nameComplete}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => alert('clicou')}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Nome"}
                                        dados={
                                            <InputUpdate
                                                dado={nameCompletes}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={nameCompletes}
                                                value={nameCompletes}
                                                /* @ts-ignore */
                                                onChange={(e) => setNameCompletes(e.target.value)}
                                                handleSubmit={updateName}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"CPF"}
                                        dados={
                                            <InputUpdate
                                                dado={cpfcnpjs}
                                                /* @ts-ignore */
                                                as={IMaskInput}
                                                /* @ts-ignore */
                                                mask="000.000.000-00"
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={cpfcnpjs}
                                                value={cpfcnpjs}
                                                /* @ts-ignore */
                                                onChange={(e) => setCpfcnpjs(e.target.value)}
                                                handleSubmit={updateCpfOrCnpj}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Inscrição estadual"}
                                        dados={
                                            <InputUpdate
                                                dado={inscricaoEstaduals}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={inscricaoEstaduals}
                                                value={inscricaoEstaduals}
                                                /* @ts-ignore */
                                                onChange={(e) => setInscricaoEstaduals(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Telefone"}
                                        dados={
                                            <InputUpdate
                                                dado={phones}
                                                type="number"
                                                /* @ts-ignore */
                                                placeholder={phones}
                                                value={phones}
                                                /* @ts-ignore */
                                                onChange={(e) => setPhones(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"E-mail"}
                                        dados={
                                            <InputUpdate
                                                dado={emails}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={emails}
                                                value={emails}
                                                /* @ts-ignore */
                                                onChange={(e) => setEmails(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Data de nascimento"}
                                        dados={
                                            <InputUpdate
                                                dado={dataNascimentos}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={dataNascimentos}
                                                value={dataNascimentos}
                                                /* @ts-ignore */
                                                onChange={(e) => setDataNascimentos(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Newslatters"}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={newslatters}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Gênero"}
                                        dados={
                                            <SelectUpdate
                                                dado={generos}
                                                value={generos}
                                                /* @ts-ignore */
                                                onChange={''}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },
                                                        { label: "Masculino", value: "Masculino" },
                                                        { label: "Feminino", value: "Feminino" },
                                                        { label: "Outro", value: "Outro" },
                                                    ]
                                                }
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Endereço"}
                                        dados={
                                            <InputUpdate
                                                dado={locals}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={locals}
                                                value={locals}
                                                /* @ts-ignore */
                                                onChange={(e) => setLocals(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Número"}
                                        dados={
                                            <InputUpdate
                                                dado={numeros}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={numeros}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setNumeros(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Bairro"}
                                        dados={
                                            <InputUpdate
                                                dado={bairros}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={bairros}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setBairros(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Cidade"}
                                        dados={
                                            <InputUpdate
                                                dado={cidades}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={cidades}
                                                value={cidades}
                                                /* @ts-ignore */
                                                onChange={(e) => setCidades(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Estado"}
                                        dados={
                                            <SelectUpdate
                                                dado={estados}
                                                value={estados}
                                                /* @ts-ignore */
                                                onChange={''}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },
                                                        { label: "Acre", value: "Acre" },
                                                        { label: "Alagoas", value: "Alagoas" },
                                                        { label: "Amapá", value: "Amapá" },
                                                        { label: "Amazonas", value: "Amazonas" },
                                                        { label: "Bahia", value: "Bahia" },
                                                        { label: "Ceara", value: "Ceara" },
                                                        { label: "Distrito Federal", value: "Distrito Federal" },
                                                        { label: "Espírito Santo", value: "Espírito Santo" },
                                                        { label: "Goiás", value: "Goiás" },
                                                        { label: "Maranhão", value: "Maranhão" },
                                                        { label: "Mato Grosso", value: "Mato Grosso" },
                                                        { label: "Mato Grosso do Sul", value: "Mato Grosso do Sul" },
                                                        { label: "Minas Gerais", value: "Minas Gerais" },
                                                        { label: "Pará", value: "Pará" },
                                                        { label: "Paraíba", value: "Paraíba" },
                                                        { label: "Paraná", value: "Paraná" },
                                                        { label: "Pernambuco", value: "Pernambuco" },
                                                        { label: "Piauí", value: "Piauí" },
                                                        { label: "Rio de Janeiro", value: "Rio de Janeiro" },
                                                        { label: "Rio Grande do Norte", value: "Rio Grande do Norte" },
                                                        { label: "Rio Grande do Sul", value: "Rio Grande do Sul" },
                                                        { label: "Rondônia", value: "Rondônia" },
                                                        { label: "Roraima", value: "Roraima" },
                                                        { label: "Santa Catarina", value: "Santa Catarina" },
                                                        { label: "São Paulo", value: "São Paulo" },
                                                        { label: "Sergipe", value: "Sergipe" },
                                                        { label: "Tocantins", value: "Tocantins" }
                                                    ]
                                                }
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"CEP"}
                                        dados={
                                            <InputUpdate
                                                dado={ceps}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={ceps}
                                                value={ceps}
                                                /* @ts-ignore */
                                                onChange={(e) => setCeps(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>
                        </GridDate>
                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Cliente;