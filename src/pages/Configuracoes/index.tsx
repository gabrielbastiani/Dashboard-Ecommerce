import React, { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import { BlockDados } from "../Categorias/Categoria/styles";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import { Block, BlockTop, Etiqueta } from "../Categorias/styles";
import { setupAPIClient } from "../../services/api";
import { AuthContext } from '../../contexts/AuthContext';
import { MdFileUpload } from 'react-icons/md';
import { Button } from "../../components/ui/Button";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {
    LogoLojaImgUrl,
    FormUploadLogo,
    EtiquetaLogo,
    IconSpan,
    InputLogo,
    LogoLojaImg,
    SectionDate,
    GridDateForm,
    BlockLogomarca,
    TextLogo,
    PreviewImageRede,
    RedeLojaImg,
    ImgRedes
} from "./styles";
import { InputPost } from "../../components/ui/InputPost";
import { IMaskInput } from "react-imask";
import SelectUpdate from "../../components/ui/SelectUpdate";
import Select from "../../components/ui/Select";
import { GridDate } from "../Perfil/styles";
import TabelaSimples from "../../components/Tabelas";
import Warnings from "../../components/Warnings";


const Configuracoes: React.FC = () => {

    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [logo, setLogo] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [state, seState] = useState([]);
    const [stateSelected, setStateSelected] = useState();

    const [nameRede, setNameRede] = useState('');
    const [redeImage, setRedeImage] = useState(null);
    const [redeImageUrl, setRedeImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [order, setOrder] = useState(Number);
    const [positionSelected, setPositionSelected] = useState();

    const [loading, setLoading] = useState(false);

    const [socialMedia, setSocialMedia] = useState<any[]>([]);


    function handleChangeState(e: any) {
        setStateSelected(e.target.value);
    }

    function isEmail(email: string) {
        // eslint-disable-next-line no-control-regex
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
    }

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/userStore?store_id=${admin.store_id}`);

                setLogo(response.data.logo || "");
                setName(response.data.name || "");
                setCnpj(response.data.cnpj || "");
                setEmail(response.data.email || "");
                setPhone(response.data.phone || "");
                setCellPhone(response.data.cellPhone || "");
                setAddress(response.data.address || "");
                setNumber(response.data.number || "");
                setNeighborhood(response.data.neighborhood || "");
                setCep(response.data.cep || "");
                setCity(response.data.city || "");
                seState(response.data.state || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, [admin.store_id]);

    async function handleStore(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (name === "" ||
                cnpj === "" ||
                email === "" ||
                phone === "" ||
                address === "" ||
                number === "" ||
                neighborhood === "" ||
                cep === "" ||
                city === ""
            ) {
                toast.error('Não deixe o campo em branco!');
                return;
            }

            if (!isEmail(email)) {

                toast.error('Por favor digite um email valido!');

                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', logo);
            data.append('name', name);
            data.append('cnpj', cnpj);
            data.append('email', email);
            data.append('phone', phone);
            data.append('cellPhone', cellPhone);
            data.append('address', address);
            data.append('number', number);
            data.append('neighborhood', neighborhood);
            data.append('cep', cep);
            data.append('city', city);/* @ts-ignore */
            data.append('state', stateSelected);

            await apiClient.post(`/createStore`, data);

            setLoading(true);

            toast.success('Loja cadastrada com sucesso.');

            setName("");
            setCnpj("");
            setEmail("");
            setPhone("");
            setCellPhone("");
            setAddress("");
            setNumber("");
            setNeighborhood("");
            setCep("");
            setCity("");

            loadIDstore();

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar a loja.');
        }

        setLoading(false);

    }

    async function loadIDstore() {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/findFirstStoreUser');

            const storeID = response.data.id;

            await apiClient.put(`/admin/updateDateAdmin?admin_id=${admin.id}`, { store_id: storeID });

            navigate(0);

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
        }
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setLogo(image)
            setLogoUrl(URL.createObjectURL(image))
        }

    }

    async function handleUpdateLogo(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (logo === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            setLoading(true);
            data.append('file', logo);

            const apiClient = setupAPIClient();
            await apiClient.put(`/logoStoreUpdate?store_id=${admin.store_id}`, data);

            toast.success('Logomarca atualizada com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {
            console.log(err);
            toast.error('Ops erro ao atualizar a logomarca!');
        }

        setLoading(false);

    }

    async function handleUpdateDataStore() {
        const apiClient = setupAPIClient();
        try {
            if (name === "" ||
                cnpj === "" ||
                email === "" ||
                phone === "" ||
                address === "" ||
                number === "" ||
                neighborhood === "" ||
                cep === "" ||
                city === ""
            ) {
                toast.error('Não deixe o campo em branco!')
                return;
            }

            if (!isEmail(email)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            await apiClient.put(`/updateAllDateStore?store_id=${admin.store_id}`, {
                name: name,
                cnpj: cnpj,
                email: email,
                phone: phone,
                cellPhone: cellPhone,
                address: address,
                number: number,
                neighborhood: neighborhood,
                cep: cep,
                city: city,
            });
            toast.success('Dado da loja atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado!')
        }
    }

    async function updateState() {
        try {
            if (stateSelected === "") {
                toast.error(`Selecione o estado, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllDateStore?store_id=${admin.store_id}`, { state: stateSelected });
            toast.success('Estado atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o estado.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    // -------- SOCIAL MEDIA ------------ //

    useEffect(() => {
        async function loadSocialMedia() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listAllSocialMedia`);

                setSocialMedia(response.data || []);

            } catch (error) {
                console.log(error);
            }
        }
        loadSocialMedia();
    }, []);

    async function loadSocialMedia() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get(`/listAllSocialMedia`);

            setSocialMedia(response.data || []);

        } catch (error) {
            console.log(error);
        }
    }

    function handleChangePosition(e: any) {
        setPositionSelected(e.target.value);
    }

    async function handleSocialMedia(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (nameRede === "" || link === "") {
                toast.error('Não deixe campo em branco!');
                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', redeImage);
            data.append('name', nameRede);
            data.append('link', link);/* @ts-ignore */
            data.append('order', Number(order));/* @ts-ignore */
            data.append('position', positionSelected);

            await apiClient.post(`/createSocialMedia`, data);

            setLoading(true);

            toast.success('Rede Social cadastrada com sucesso.');

            loadSocialMedia();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a rede social.');
        }

        setLoading(false);

    }

    function handleFileSocialMedia(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setRedeImage(image)
            setRedeImageUrl(URL.createObjectURL(image))
        }

    }

    const dados: any = [];
    (socialMedia || []).forEach((item) => {
        dados.push({
            "Imagem": <ImgRedes src={"http://localhost:3333/files/" + item.image} alt={item.name} />,
            "Rede Social": item.name,
            "Ordem": String(item.order),
            "Posição no Site": item.position,
            "Disponivel?": item.status === "Disponivel" ? "SIM" : "NÃO",
            "botaoDetalhes": `/rede/${item.id}`
        });
    });


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    {admin.store_id ? (
                        <>
                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo="Configurações"
                                />
                            </BlockTop>
                            <FormUploadLogo onSubmit={handleUpdateLogo}>
                                <EtiquetaLogo>
                                    <IconSpan>
                                        <MdFileUpload size={20} />
                                    </IconSpan>
                                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="logomarca" />
                                    {logoUrl ? (
                                        <>
                                            <LogoLojaImgUrl
                                                src={logoUrl}
                                                alt="logomarca da loja"
                                                width={170}
                                                height={80}
                                            />
                                            <Button
                                                type="submit"
                                                loading={loading}
                                            >
                                                Salvar nova logomarca
                                            </Button>
                                        </>
                                    ) :
                                        <LogoLojaImg src={"http://localhost:3333/files/" + logo} alt="logomarca da loja" />
                                    }
                                </EtiquetaLogo>
                            </FormUploadLogo>

                            <GridDate>
                                <SectionDate>
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Nome da loja"}
                                            dados={
                                                <InputUpdate
                                                    dado={name}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={name}
                                                    value={name}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setName(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"CNPJ"}
                                            dados={
                                                <InputUpdate
                                                    dado={cnpj}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00.000.000/0000-00"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cnpj}
                                                    value={cnpj}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCnpj(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"E-mail"}
                                            dados={
                                                <InputUpdate
                                                    dado={email}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={email}
                                                    value={email}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Telefone"}
                                            dados={
                                                <InputUpdate
                                                    dado={phone}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="(00) 0000-0000"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={phone}
                                                    value={phone}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Celular"}
                                            dados={
                                                <InputUpdate
                                                    dado={cellPhone}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="(00) 0000-0000"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cellPhone}
                                                    value={cellPhone}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCellPhone(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Endereço"}
                                            dados={
                                                <InputUpdate
                                                    dado={address}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={address}
                                                    value={address}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                </SectionDate>

                                <SectionDate>
                                    <BlockDados>
                                        <TextoDados
                                            chave={"Número"}
                                            dados={
                                                <InputUpdate
                                                    dado={number}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={number}
                                                    value={number}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setNumber(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Bairro"}
                                            dados={
                                                <InputUpdate
                                                    dado={neighborhood}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={neighborhood}
                                                    value={neighborhood}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setNeighborhood(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Cidade"}
                                            dados={
                                                <InputUpdate
                                                    dado={city}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={city}
                                                    value={city}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCity(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Estado"}
                                            dados={
                                                <SelectUpdate
                                                    dado={state}
                                                    value={stateSelected}
                                                    /* @ts-ignore */
                                                    onChange={handleChangeState}
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
                                                    handleSubmit={updateState}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"CEP"}
                                            dados={
                                                <InputUpdate
                                                    dado={cep}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00000-000"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cep}
                                                    value={cep}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCep(e.target.value)}
                                                    handleSubmit={handleUpdateDataStore}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                </SectionDate>
                            </GridDate>

                            {socialMedia.length < 1 ? (
                                null
                            ) :
                                <>
                                    <DivisorHorizontal />

                                    <TabelaSimples
                                        cabecalho={["Imagem", "Rede Social", "Ordem", "Posição no Site", "Disponivel?"]}
                                        /* @ts-ignore */
                                        dados={dados}
                                        textbutton={"Detalhes"}
                                    />
                                </>
                            }

                            <DivisorHorizontal />

                            <Titulos
                                tipo="h2"
                                titulo='Insira suas redes sociais'
                            />
                            <br />
                            <br />
                            <GridDateForm onSubmit={handleSocialMedia}>
                                <SectionDate>
                                    <BlockLogomarca>
                                        <EtiquetaLogo>
                                            <IconSpan>
                                                <MdFileUpload size={30} />
                                            </IconSpan>
                                            <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFileSocialMedia} alt="rede social loja virtual" />
                                            {redeImageUrl ? (
                                                <PreviewImageRede
                                                    src={redeImageUrl}
                                                    alt="logomarca da loja"
                                                    width={170}
                                                    height={100}
                                                />
                                            ) :
                                                <>
                                                    <RedeLojaImg src={"http://localhost:3333/files/" + redeImage} />
                                                    <TextLogo>Clique na seta e insira<br /> a imagem da rede social</TextLogo>
                                                </>
                                            }
                                        </EtiquetaLogo>
                                    </BlockLogomarca>

                                    <Block>
                                        <Etiqueta>Nome da rede social:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite aqui..."
                                            onChange={(e) => setNameRede(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Link da rede social:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite aqui..."
                                            onChange={(e) => setLink(e.target.value)}
                                        />
                                    </Block>

                                </SectionDate>

                                <SectionDate>

                                    <Block>
                                        <Etiqueta>Posição dessa rede:</Etiqueta>
                                        <Select
                                            value={positionSelected}
                                            opcoes={
                                                [
                                                    { label: "Selecionar...", value: "" },
                                                    { label: "Rodapé Loja", value: "Rodapé Loja" },
                                                    { label: "PopUp Menu Topo", value: "PopUp Menu Topo" },
                                                    { label: "Header Topo", value: "Header Topo" },
                                                    { label: "Página Contato", value: "Página Contato" },
                                                    { label: "Página Sobre", value: "Página Sobre" }
                                                ]
                                            }/* @ts-ignore */
                                            onChange={handleChangePosition}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Ordem dessa rede:</Etiqueta>
                                        <InputPost
                                            type="number"
                                            placeholder="0"/* @ts-ignore */
                                            onChange={(e) => setOrder(e.target.value)}
                                        />
                                    </Block>

                                    <Button
                                        style={{ backgroundColor: 'green' }}
                                        type="submit"
                                    >
                                        Salvar rede
                                    </Button>

                                </SectionDate>

                            </GridDateForm>

                        </>
                    ) : (
                        <>
                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo="Configurações"
                                />
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: 'green' }}
                                    form="form-loja"
                                >
                                    Salvar
                                </Button>
                            </BlockTop>

                            <GridDateForm id="form-loja" onSubmit={handleStore}>
                                <SectionDate>
                                    <BlockLogomarca>
                                        <EtiquetaLogo>
                                            <IconSpan>
                                                <MdFileUpload size={30} />
                                            </IconSpan>
                                            <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="logomarca" />
                                            {logoUrl ? (
                                                <LogoLojaImgUrl
                                                    src={logoUrl}
                                                    alt="logomarca da loja"
                                                    width={170}
                                                    height={80}
                                                />
                                            ) :
                                                <>
                                                    <LogoLojaImg src={"http://localhost:3333/files/" + logo} />
                                                    <TextLogo>Clique na seta e insira<br /> uma logomarca</TextLogo>
                                                </>
                                            }
                                        </EtiquetaLogo>
                                    </BlockLogomarca>

                                    <Block>
                                        <Etiqueta>Nome da loja:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o nome da loja"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>CNPJ:</Etiqueta>
                                        <InputPost
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="00.000.000/0000-00"
                                            type="text"
                                            placeholder="00.000.000/0000-00"
                                            onChange={(e) => setCnpj(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>E-mail:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Ex: email@email.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Telefone:</Etiqueta>
                                        <InputPost
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="(00) 0000-0000"
                                            type="text"
                                            placeholder="(00) 0000-0000"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Celular:</Etiqueta>
                                        <InputPost
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="(00) 0000-0000"
                                            type="text"
                                            placeholder="(00) 0000-0000"
                                            onChange={(e) => setCellPhone(e.target.value)}
                                        />
                                    </Block>

                                </SectionDate>

                                <SectionDate>

                                    <Block>
                                        <Etiqueta>Endereço:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o endereço da loja"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Número:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o número da loja"
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Bairro:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o bairro da loja"
                                            onChange={(e) => setNeighborhood(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Cidade:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite a cidade da loja"
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Estado:</Etiqueta>
                                        <Select
                                            value={stateSelected}
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
                                            }/* @ts-ignore */
                                            onChange={handleChangeState}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>CEP:</Etiqueta>
                                        <InputPost
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="00000-000"
                                            type="text"
                                            placeholder="00000-000"
                                            onChange={(e) => setCep(e.target.value)}
                                        />
                                    </Block>
                                </SectionDate>
                            </GridDateForm>
                        </>
                    )}
                </Card>
            </Container>
        </Grid>
    )
}

export default Configuracoes;