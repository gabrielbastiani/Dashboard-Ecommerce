import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import Modal from 'react-modal';
import { IMaskInput } from "react-imask";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextNews } from "./styles";
import { InuptCheck } from "../../../components/ui/InuptCheck";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { ModalDeleteCustomer } from "../../../components/popups/ModalDeleteCustomer";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";
import Select from "../../../components/ui/Select";
import moment from "moment";
import Warnings from "../../../components/Warnings";



const Cliente: React.FC = () => {

    let { customer_id } = useParams();

    const [nameCompletes, setNameCompletes] = useState('');
    const [cpfs, setCpfs] = useState('');
    const [cnpjs, setCnpjs] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [phones, setPhones] = useState('');
    const [emails, setEmails] = useState('');
    const [dataNascimentos, setDataNascimentos] = useState('');
    const [locals, setLocals] = useState('');
    const [numeros, setNumeros] = useState('');
    const [bairros, setBairros] = useState('');
    const [complements, setComplements] = useState('');
    const [references, setReferences] = useState('');
    const [cidades, setCidades] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSelected, setEstadoSelected] = useState();
    const [ceps, setCeps] = useState('');
    const [newslatters, setNewslatters] = useState("");

    const [generos, setGeneros] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    function isEmail(emails: string) {
        // eslint-disable-next-line no-control-regex
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emails)
    };

    async function refreshUser() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/customer/listExactCustomerID?customer_id=${customer_id}`);

            setNameCompletes(data?.name || "");
            setCpfs(data?.cpf || "");
            setCnpjs(data?.cnpj || "")
            setStateRegistration(data?.stateRegistration || "");
            setPhones(data?.phone || "");
            setEmails(data?.email || "");
            setDataNascimentos(data?.dateOfBirth || "");
            setLocals(data?.address || "");
            setNumeros(data?.number || "");
            setBairros(data?.neighborhood || "");
            setComplements(data?.complement || "");
            setReferences(data?.reference || "");
            setCidades(data?.city || "");
            setEstados(data?.state || "");
            setCeps(data?.cep || "");
            setGeneros(data?.gender || "");
            setNewslatters(data?.newslatter || "");

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function loadCustomers() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/customer/listExactCustomerID?customer_id=${customer_id}`);

                setNameCompletes(data?.name || "");
                setCpfs(data?.cpf || "");
                setCnpjs(data?.cnpj || "")
                setStateRegistration(data?.stateRegistration || "");
                setPhones(data?.phone || "");
                setEmails(data?.email || "");
                setDataNascimentos(data?.dateOfBirth || "");
                setLocals(data?.address || "");
                setNumeros(data?.number || "");
                setBairros(data?.neighborhood || "");
                setComplements(data?.complement || "");
                setReferences(data?.reference || "");
                setCidades(data?.city || "");
                setEstados(data?.state || "");
                setCeps(data?.cep || "");
                setGeneros(data?.gender || "");
                setNewslatters(data?.newslatter || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCustomers();
    }, [customer_id]);

    async function updateName() {
        try {
            const apiClient = setupAPIClient();
            if (nameCompletes === '') {
                toast.error('Não deixe o nome em branco!!!');
                return;
            } else {
                await apiClient.put(`/customer/updateNameCustomer?customer_id=${customer_id}`, { name: nameCompletes });
                toast.success('Nome atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome.');
        }
    }

    function handleChangeGenero(e: any) {
        setGeneroSelected(e.target.value)
    }

    function handleChangeEstado(e: any) {
        setEstadoSelected(e.target.value)
    }

    async function updateDataCustomer() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/customer/updateDateCustomer?customer_id=${customer_id}`, {
                cpf: cpfs,
                cnpj: cnpjs,
                stateRegistration: stateRegistration,
                phone: phones,
                dateOfBirth: dataNascimentos,
                gender: generoSelected,
                newslatter: newslatters,
                address: locals,
                number: numeros,
                neighborhood: bairros,
                complement: complements,
                reference: references,
                cep: ceps,
                city: cidades,
                state: estadoSelected
            });

            toast.success('Dado atualizado com sucesso.');
            refreshUser();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o dado.');
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
                await apiClient.put(`/customer/updateDateCustomer?customer_id=${customer_id}`, { email: emails });
                toast.success('Email atualizado com sucesso.');
                refreshUser();
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o email.');
        }
    }

    async function updateNews() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/customer/updateNewslatter?customer_id=${customer_id}`);

            refreshUser();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o preferencia pela newslatters.');
        }
        if (newslatters === "Sim") {
            toast.success(`A preferencia da Newslatters foi ativada.`);
            return;
        }

        if (newslatters === "Nao") {
            toast.error(`A preferencia da Newslatters foi desativada.`);
            return;
        }
    }

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function allOrders() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageListOrdersCustomer?page=${currentPage}&limit=${limit}&customer_id=${customer_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.orders || []);

            } catch (error) {
                console.error(error);
            }
        }
        allOrders();
    }, [currentPage, limit, total, customer_id]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Pedido": item.id_order_store,
            "Valor Total": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.cart.map((car: { total: any; }) => car.total).reduce((acumulador: any, valorAtual: any) => acumulador + valorAtual, 0)),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Situação": item.statusOrder[0].status_order === "PENDING" ? "Pendente de pagamento" : item.statusOrder[0].status_order === "CONFIRMED" ? "Aprovado" : "Reprovado ou Cancelado",
            "botaoDetalhes": `/cliente/pedido/${item.id}`
        });
    });

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
        setModalVisible(true);
    }

    Modal.setAppElement('body');



    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>
                        <>
                            <VoltarNavagation />
                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo={`Cliente = ${nameCompletes}`}
                                />

                                <Button
                                    style={{ backgroundColor: '#FB451E' }}
                                    onClick={handleOpenModalDelete}
                                >
                                    Deletar
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
                                                    placeholder={nameCompletes}
                                                    value={nameCompletes}
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
                                                        mask="000.000.000-00"
                                                        type="text"
                                                        placeholder={cpfs}
                                                        value={cpfs}
                                                        onChange={(e) => setCpfs(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
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
                                                        mask="00.000.000/0000-00"
                                                        type="text"
                                                        placeholder={cnpjs}
                                                        value={cnpjs}
                                                        onChange={(e) => setCnpjs(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
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
                                                        dado={stateRegistration}
                                                        type="text"
                                                        placeholder={stateRegistration}
                                                        value={stateRegistration}
                                                        onChange={(e) => setStateRegistration(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
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
                                                    mask="(00) 0000-0000"
                                                    placeholder={phones}
                                                    value={phones}
                                                    onChange={(e) => setPhones(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
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
                                                    placeholder={emails}
                                                    value={emails}
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
                                                        mask="00/00/0000"
                                                        placeholder={dataNascimentos}
                                                        value={dataNascimentos}
                                                        onChange={(e) => setDataNascimentos(e.target.value)}
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BlockDados>
                                    }

                                    <BlockDados>
                                        <TextNews>Preferencia para newslatters: </TextNews>
                                        <InuptCheck
                                            dado={newslatters}
                                            handleSubmit={updateNews}
                                        />
                                    </BlockDados>

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
                                                        handleSubmit={updateDataCustomer}
                                                    />
                                                }
                                            />
                                        </BlockDados>
                                    }
                                </SectionDate>

                                <SectionDate>
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Endereço"}
                                            dados={
                                                <InputUpdate
                                                    dado={locals}
                                                    type="text"
                                                    placeholder={locals}
                                                    value={locals}
                                                    onChange={(e) => setLocals(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
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
                                                    placeholder={numeros}
                                                    value={numeros}
                                                    onChange={(e) => setNumeros(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
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
                                                    placeholder={bairros}
                                                    value={bairros}
                                                    onChange={(e) => setBairros(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Complemento"}
                                            dados={
                                                <InputUpdate
                                                    dado={complements}
                                                    type="text"
                                                    placeholder={complements}
                                                    value={complements}
                                                    onChange={(e) => setComplements(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Referência"}
                                            dados={
                                                <InputUpdate
                                                    dado={references}
                                                    type="text"
                                                    placeholder={references}
                                                    value={references}
                                                    onChange={(e) => setReferences(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
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
                                                    placeholder={cidades}
                                                    value={cidades}
                                                    onChange={(e) => setCidades(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
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
                                                            { label: "Acre", value: "AC" },
                                                            { label: "Alagoas", value: "AL" },
                                                            { label: "Amapá", value: "AP" },
                                                            { label: "Amazonas", value: "AM" },
                                                            { label: "Bahia", value: "BA" },
                                                            { label: "Ceara", value: "CE" },
                                                            { label: "Distrito Federal", value: "DF" },
                                                            { label: "Espírito Santo", value: "ES" },
                                                            { label: "Goiás", value: "GO" },
                                                            { label: "Maranhão", value: "MA" },
                                                            { label: "Mato Grosso", value: "MT" },
                                                            { label: "Mato Grosso do Sul", value: "MS" },
                                                            { label: "Minas Gerais", value: "MG" },
                                                            { label: "Pará", value: "PA" },
                                                            { label: "Paraíba", value: "PB" },
                                                            { label: "Paraná", value: "PR" },
                                                            { label: "Pernambuco", value: "PE" },
                                                            { label: "Piauí", value: "PI" },
                                                            { label: "Rio de Janeiro", value: "RJ" },
                                                            { label: "Rio Grande do Norte", value: "RN" },
                                                            { label: "Rio Grande do Sul", value: "RS" },
                                                            { label: "Rondônia", value: "RO" },
                                                            { label: "Roraima", value: "RR" },
                                                            { label: "Santa Catarina", value: "SC" },
                                                            { label: "São Paulo", value: "SP" },
                                                            { label: "Sergipe", value: "SE" },
                                                            { label: "Tocantins", value: "TO" }
                                                        ]
                                                    }
                                                    handleSubmit={updateDataCustomer}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Cep"}
                                            dados={
                                                <InputUpdate
                                                    dado={ceps}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    mask="00000-000"
                                                    placeholder={ceps}
                                                    value={ceps}
                                                    onChange={(e) => setCeps(e.target.value)}
                                                    handleSubmit={updateDataCustomer}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                </SectionDate>
                            </GridDate>
                        </>
                    </Card>

                    <Card>
                        <Titulos
                            tipo="h1"
                            titulo="Pedidos feitos"
                        />

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Esse cliente não fez pedido ainda..."
                                />
                            </>
                        ) :
                            <>
                                <TextTotal>Pedidos por página: &nbsp;</TextTotal>

                                <Select
                                    /* @ts-ignore */
                                    onChange={limits}
                                    opcoes={[
                                        { label: "Todos pedidos", value: "999999" },
                                        { label: "15", value: "15" },
                                        { label: "30", value: "30" }
                                    ]}
                                />

                                <TabelaSimples
                                    cabecalho={["Pedido", "Valor Total", "Data", "Situação"]}
                                    dados={dados}
                                    textbutton={"Detalhes"}
                                />

                                <ContainerPagination>
                                    {currentPage > 1 && (
                                        <Previus>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                                Voltar
                                            </ButtonPage>
                                        </Previus>
                                    )}

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
                <ModalDeleteCustomer
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    customerID={customer_id}
                />
            )}
        </>
    )
}

export default Cliente;