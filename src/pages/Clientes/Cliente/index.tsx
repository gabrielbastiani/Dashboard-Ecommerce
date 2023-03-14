import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import Titulos from "../../../components/Titulos";
import Voltar from "../../../components/Voltar";
import { useNavigate, useParams } from "react-router-dom";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { TextoDados } from "../../../components/TextoDados";
import { Button } from "../../../components/ui/Button";
import { Card, Container } from "../../../components/Content/styles";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { GridDate } from "../../Perfil/styles";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";
import Modal from 'react-modal';
import { ModalDeleteCliente } from "../../../components/popups/ModalDeleteCliente";
import TabelaSimples from "../../../components/Tabelas";
import moment from 'moment';
import { Avisos } from "../../../components/Avisos";


export type DeleteCliente = {
    user_id: string;
}

const Cliente: React.FC = () => {

    const navigate = useNavigate();

    let { nameComplete, user_id } = useParams();

    const [nameCompletes, setNameCompletes] = useState(nameComplete);
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [inscricaoEstaduals, setInscricaoEstaduals] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSelected, setEstadoSelected] = useState();
    const [ceps, setCeps] = useState('');
    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();
    const [newslatters, setNewslatters] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [search, setSearch] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    function isEmail(emails: string) {
        // eslint-disable-next-line no-control-regex
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emails)
    }

    useEffect(() => {
        async function allClientes() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allPedidosPageUser?page=${currentPage}&limit=${limit}&user_id=${user_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.pedidos || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
                alert('Error call api list ALL pedidos');
            }
        }
        allClientes();
    }, [currentPage, limit, total, user_id]);

    async function refreshUser() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get(`/listExactUser?user_id=${user_id}`);

        setNameCompletes(response.data.nameComplete);
        setCpfs(response.data.cpf);
        setCnpjs(response.data.cnpj)
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
                    cpf,
                    cnpj,
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
                setCnpjs(cnpj);
                setCpfs(cpf);
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

    async function updateCpf() {
        try {
            const apiClient = setupAPIClient();
            if (cpfs === '') {
                toast.error('Não deixe o CPF em branco!!!');
                return;
            } else {
                await apiClient.put(`/cpfUserUpdate?user_id=${user_id}`, { cpf: cpfs });
                toast.success('CPF atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CPF.');
        }
    }

    async function updateCnpj() {
        try {
            const apiClient = setupAPIClient();
            if (cnpjs === '') {
                toast.error('Não deixe o CNPJ em branco!!!');
                return;
            } else {
                await apiClient.put(`/cnpjUserUpdate?user_id=${user_id}`, { cnpj: cnpjs });
                toast.success('CNPJ atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CNPJ.');
        }
    }

    async function updatePhone() {
        try {
            const apiClient = setupAPIClient();
            if (phones === '') {
                toast.error('Não deixe o telefone em branco!!!');
                return;
            } else {
                await apiClient.put(`/phoneUserUpdate?user_id=${user_id}`, { phone: phones });
                toast.success('Telefone atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o telefone.');
        }
    }

    async function updateInscricaoEstadual() {
        try {
            const apiClient = setupAPIClient();
            if (inscricaoEstaduals === '') {
                toast.error('Não deixe a inscrição estadual em branco, caro seja isento, escreva a palavra ISENTO nesse campo!!!');
                return;
            } else {
                await apiClient.put(`/inscricaoEstadualUserUpdate?user_id=${user_id}`, { inscricaoEstadual: inscricaoEstaduals });
                toast.success('Inscrição estadual atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a inscrição estadual.');
        }
    }

    async function updateEmail() {
        try {
            const apiClient = setupAPIClient();
            if (!isEmail(emails)) {
                toast.error('Por favor digite um email valido!');
                return;
            }
            if (emails === '') {
                toast.error('Não deixe o email em branco!!!');
                return;
            } else {
                await apiClient.put(`/emailUserUpdate?user_id=${user_id}`, { email: emails });
                toast.success('Email atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    async function updateDataNascimento() {
        try {
            const apiClient = setupAPIClient();
            if (dataNascimentos === '') {
                toast.error('Não deixe a data de nascimento em branco!!!');
                return;
            } else {
                await apiClient.put(`/dataDeNascimentoUserUpdate?user_id=${user_id}`, { dataNascimento: dataNascimentos });
                toast.success('Data de nascimento atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a data de nascimento.');
        }
    }

    async function updateNews() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/newslatter?user_id=${user_id}`);

            refreshUser();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o preferencia pela newslatters.');
        }

        if (newslatters === "Nao") {
            toast.success(`A preferencia pela newslatters mudou para SIM.`);
            return;
        }

        if (newslatters === "Sim") {
            toast.error(`A preferencia pela newslatters mudou para NÃO.`);
            return;
        }
    }

    function handleChangeGenero(e: any) {
        setGeneroSelected(e.target.value)
    }

    async function updateGenero() {
        try {
            if (generoSelected === "") {
                toast.error(`Selecione o genero, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/generoUserUpdate?user_id=${user_id}`, { genero: generoSelected });
            toast.success('Genero atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o genero.');
        }
        setTimeout(() => {
            navigate(0);
        }, 2000);
    }

    async function updateEndereco() {
        try {
            const apiClient = setupAPIClient();
            if (locals === '') {
                toast.error('Não deixe o endereço em branco!!!');
                return;
            } else {
                await apiClient.put(`/ruaUserUpdate?user_id=${user_id}`, { local: locals });
                toast.success('Endereço atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o endereço.');
        }
    }

    async function updateNumero() {
        try {
            const apiClient = setupAPIClient();
            if (numeros === '') {
                toast.error('Não deixe o número em branco!!!');
                return;
            } else {
                await apiClient.put(`/numeroUserUpdate?user_id=${user_id}`, { numero: numeros });
                toast.success('Número atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o número.');
        }
    }

    async function updateBairro() {
        try {
            const apiClient = setupAPIClient();
            if (bairros === '') {
                toast.error('Não deixe o bairro em branco!!!');
                return;
            } else {
                await apiClient.put(`/bairroUserUpdate?user_id=${user_id}`, { bairro: bairros });
                toast.success('Bairro atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o bairro.');
        }
    }

    async function updateCidade() {
        try {
            const apiClient = setupAPIClient();
            if (cidades === '') {
                toast.error('Não deixe a cidade em branco!!!');
                return;
            } else {
                await apiClient.put(`/cityUserUpdate?user_id=${user_id}`, { cidade: cidades });
                toast.success('Cidade atualizada com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a cidade.');
        }
    }

    function handleChangeEstado(e: any) {
        setEstadoSelected(e.target.value)
    }

    async function updateEstado() {
        try {
            if (estadoSelected === "") {
                toast.error(`Selecione o estado, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/estadoUserUpdate?user_id=${user_id}`, { estado: estadoSelected });
            toast.success('Estado atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o estado.');
        }
        setTimeout(() => {
            navigate(0);
        }, 2000);
    }

    async function updateCep() {
        try {
            const apiClient = setupAPIClient();
            if (ceps === '') {
                toast.error('Não deixe o CEP em branco!!!');
                return;
            } else {
                await apiClient.put(`/cepUserUpdate?user_id=${user_id}`, { CEP: ceps });
                toast.success('CEP atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o CEP.');
        }
    }

    console.log(search.map((item) => {
        return (
            <>
                {[item.pagamento.status]}
            </>
        )
    }))

    /* @ts-ignore */
    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "ID": [item.id],/* @ts-ignore */
            "Valor Total": [item.carrinhos[0].valorPagamento].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Status": [item.pagamento.status] || "Iniciado",
            "botaoDetalhes": `/pedido/${item.id}`
        });
    });

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(user_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/listExactUser', {
            params: {
                user_id: user_id,
            }
        });
        setModalItem(responseDelete.data);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


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
                                onClick={() => handleOpenModalDelete(user_id)}
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
                                    {cpfs ? (
                                        <TextoDados
                                            chave={"CPF"}
                                            dados={
                                                <InputUpdate
                                                    dado={cpfs}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="000.000.000-00"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cpfs}
                                                    value={cpfs}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCpfs(e.target.value)}
                                                    handleSubmit={updateCpf}
                                                />
                                            }
                                        />
                                    ) :
                                        null
                                    }

                                    {cnpjs ? (
                                        <TextoDados
                                            chave={"CNPJ"}
                                            dados={
                                                <InputUpdate
                                                    dado={cnpjs}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00.000.000/0000-00"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cnpjs}
                                                    value={cnpjs}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCnpjs(e.target.value)}
                                                    handleSubmit={updateCnpj}
                                                />
                                            }
                                        />
                                    ) :
                                        null
                                    }

                                </BlockDados>

                                {cnpjs ? (
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
                                                    handleSubmit={updateInscricaoEstadual}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                ) : null}

                                <BlockDados>
                                    <TextoDados
                                        chave={"Telefone"}
                                        dados={
                                            <InputUpdate
                                                dado={phones}
                                                type="text"
                                                /* @ts-ignore */
                                                as={IMaskInput}
                                                /* @ts-ignore */
                                                mask="(00) 0000-0000"
                                                /* @ts-ignore */
                                                placeholder={phones}
                                                value={phones}
                                                /* @ts-ignore */
                                                onChange={(e) => setPhones(e.target.value)}
                                                handleSubmit={updatePhone}
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
                                                handleSubmit={updateEmail}
                                            />
                                        }
                                    />
                                </BlockDados>

                                {cnpjs ? (
                                    null
                                ) :
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Data de nascimento"}
                                            dados={
                                                <InputUpdate
                                                    dado={dataNascimentos}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00/00/0000"
                                                    /* @ts-ignore */
                                                    placeholder={dataNascimentos}
                                                    value={dataNascimentos}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setDataNascimentos(e.target.value)}
                                                    handleSubmit={updateDataNascimento}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                }

                                <BlockDados>
                                    <TextoDados
                                        chave={"Newslatters"}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={newslatters}
                                                handleSubmit={updateNews}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                {cnpjs ? (
                                    null
                                ) :
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Gênero"}
                                            dados={
                                                <SelectUpdate
                                                    dado={generos}
                                                    value={generoSelected}
                                                    /* @ts-ignore */
                                                    onChange={handleChangeGenero}
                                                    opcoes={
                                                        [
                                                            { label: "Selecionar...", value: "" },
                                                            { label: "Masculino", value: "Masculino" },
                                                            { label: "Feminino", value: "Feminino" },
                                                            { label: "Outro", value: "Outro" },
                                                        ]
                                                    }
                                                    handleSubmit={updateGenero}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                }

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
                                                handleSubmit={updateEndereco}
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
                                                value={numeros}
                                                /* @ts-ignore */
                                                onChange={(e) => setNumeros(e.target.value)}
                                                handleSubmit={updateNumero}
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
                                                value={bairros}
                                                /* @ts-ignore */
                                                onChange={(e) => setBairros(e.target.value)}
                                                handleSubmit={updateBairro}
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
                                                handleSubmit={updateCidade}
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
                                                value={estadoSelected}
                                                /* @ts-ignore */
                                                onChange={handleChangeEstado}
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
                                                handleSubmit={updateEstado}
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
                                                as={IMaskInput}
                                                /* @ts-ignore */
                                                mask="00000-000"
                                                /* @ts-ignore */
                                                placeholder={ceps}
                                                value={ceps}
                                                /* @ts-ignore */
                                                onChange={(e) => setCeps(e.target.value)}
                                                handleSubmit={updateCep}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </SectionDate>
                        </GridDate>
                    </Card>

                    <Card>
                        <Titulos
                            tipo="h2"
                            titulo="Pedidos feitos"
                        />

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Esse cliente não tem pedidos aqui..."
                                />
                                {currentPage > 1 && (
                                    <Previus>
                                        <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                            Voltar
                                        </ButtonPage>
                                    </Previus>
                                )}
                            </>
                        ) :
                            <>
                                <TabelaSimples
                                    cabecalho={["ID", "Valor Total", "Data", "Status"]}
                                    /* @ts-ignore */
                                    dados={dados}
                                />

                                <ContainerPagination>
                                    <TotalBoxItems key={total}>
                                        <TextTotal>Total de pedidos: {total}</TextTotal>
                                    </TotalBoxItems>
                                    <ContainerCategoryPage>

                                        {pages.map((page) => (
                                            <TextPage
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </TextPage>
                                        ))}

                                        {currentPage < search.length && (
                                            <Next>
                                                <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                                    Avançar
                                                </ButtonPage>
                                            </Next>
                                        )}
                                    </ContainerCategoryPage>
                                </ContainerPagination>
                            </>
                        }


                    </Card>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteCliente
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    cliente={modalItem}
                />
            )}
        </>
    )
}

export default Cliente;