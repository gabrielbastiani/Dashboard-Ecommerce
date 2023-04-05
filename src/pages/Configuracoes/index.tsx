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


const Configuracoes: React.FC = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loja_id, setLoja_id] = useState('');
    const [logoLoja, setLogoLoja] = useState(null);
    const [lojaUrl, setLojaUrl] = useState('');
    const [nameLoja, setNameLoja] = useState('');
    const [cnpjLoja, setCnpjLoja] = useState('');
    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');
    const [cell, setCell] = useState('');
    const [ruaLoja, setRuaLoja] = useState('');
    const [numeroLoja, setNumeroLoja] = useState('');
    const [bairroLoja, setBairroLoja] = useState('');
    const [cepLoja, setCepLoja] = useState('');
    const [cityLoja, setCityLoja] = useState('');
    const [stateLoja, setStateLoja] = useState([]);
    const [stateLojaSelected, setStateLojaSelected] = useState();

    const [nameRede, setNameRede] = useState('');
    const [redeImage, setRedeImage] = useState(null);
    const [redeImageUrl, setRedeImageUrl] = useState('');
    const [redeLink, setRedeLink] = useState('');
    const [redeOrder, setRedeOrder] = useState(Number);
    const [redePosicaoSelected, setRedePosicaoSelected] = useState();

    const [redesSocias, setRedesSocias] = useState<any[]>([]);


    function handleChangeEstado(e: any) {
        setStateLojaSelected(e.target.value)
    }

    const [loading, setLoading] = useState(false);

    function isEmail(emailLoja: string) {
        // eslint-disable-next-line no-control-regex
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailLoja)
    }

    useEffect(() => {
        async function loadStore() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/userLoja?loja_id=${user.loja_id}`);

                setLoja_id(response.data.loja_id || "");
                setLogoLoja(response.data.logoLoja || "");
                setNameLoja(response.data.nameLoja || "");
                setCnpjLoja(response.data.cnpjLoja || "");
                setEmailLoja(response.data.emailLoja || "");
                setPhoneLoja(response.data.phoneLoja || "");
                setCell(response.data.cellPhoneLoja || "");
                setRuaLoja(response.data.ruaLoja || "");
                setNumeroLoja(response.data.numeroLoja || "");
                setBairroLoja(response.data.bairroLoja || "");
                setCepLoja(response.data.cepLoja || "");
                setCityLoja(response.data.cityLoja || "");
                setStateLoja(response.data.stateLoja || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, [user.loja_id]);

    async function handleLoja(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (nameLoja === "" ||
                cnpjLoja === "" ||
                emailLoja === "" ||
                phoneLoja === "" ||
                ruaLoja === "" ||
                numeroLoja === "" ||
                bairroLoja === "" ||
                cepLoja === "" ||
                cityLoja === ""
            ) {
                toast.error('Não deixe o campo em branco!')
                return;
            }

            if (!isEmail(emailLoja)) {

                toast.error('Por favor digite um email valido!');

                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', logoLoja);
            data.append('nameLoja', nameLoja);
            data.append('cnpjLoja', cnpjLoja);
            data.append('emailLoja', emailLoja);
            data.append('phoneLoja', phoneLoja);
            data.append('cellPhoneLoja', cell);
            data.append('ruaLoja', ruaLoja);
            data.append('numeroLoja', numeroLoja);
            data.append('bairroLoja', bairroLoja);
            data.append('cepLoja', cepLoja);
            data.append('cityLoja', cityLoja);/* @ts-ignore */
            data.append('stateLoja', stateLojaSelected);

            await apiClient.post(`/loja`, data);

            setLoading(true);

            toast.success('Loja cadastrada com sucesso.');

            setNameLoja("");
            setCnpjLoja("");
            setEmailLoja("");
            setPhoneLoja("");
            setCell("");
            setRuaLoja("");
            setNumeroLoja("");
            setBairroLoja("");
            setCepLoja("");
            setCityLoja("");

            loadIDloja();

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar a loja.');
        }

        setLoading(false);

    }

    async function loadIDloja() {
        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/lojaCreateFind');

            const lojaID = response.data.id;

            await apiClient.put(`/updateAllDateUser?user_id=${user.id}`, { loja_id: lojaID });

            navigate(0);

        } catch (error) {
            console.error(error);
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
            setLogoLoja(image)
            setLojaUrl(URL.createObjectURL(image))
        }

    }

    async function handleUpdateLogo(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (logoLoja === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            setLoading(true);
            data.append('file', logoLoja);

            const apiClient = setupAPIClient();
            await apiClient.put(`/logoLojaUpdate?loja_id=${user.loja_id}`, data);

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

    async function handleUpdateDataLoja() {
        const apiClient = setupAPIClient();
        try {
            if (nameLoja === "" ||
                cnpjLoja === "" ||
                emailLoja === "" ||
                phoneLoja === "" ||
                ruaLoja === "" ||
                numeroLoja === "" ||
                bairroLoja === "" ||
                cepLoja === "" ||
                cityLoja === ""
            ) {
                toast.error('Não deixe o campo em branco!')
                return;
            }

            if (!isEmail(emailLoja)) {
                toast.error('Por favor digite um email valido!');
                return;
            }

            await apiClient.put(`/updateAllDateLoja?loja_id=${user.loja_id}`, {
                nameLoja: nameLoja,
                cnpjLoja: cnpjLoja,
                emailLoja: emailLoja,
                phoneLoja: phoneLoja,
                cellPhoneLoja: cell,
                ruaLoja: ruaLoja,
                numeroLoja: numeroLoja,
                bairroLoja: bairroLoja,
                cepLoja: cepLoja,
                cityLoja: cityLoja,
            });
            toast.success('Dado da loja atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado!')
        }
    }

    async function updateEstado() {
        try {
            if (stateLojaSelected === "") {
                toast.error(`Selecione o estado, ou cancele a atualização apertando no botão vermelho!`);
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllDateLoja?loja_id=${user.loja_id}`, { stateLoja: stateLojaSelected });
            toast.success('Estado atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o estado.');
        }
        setTimeout(() => {
            navigate(0);
        }, 2000);
    }

    // -------- REDE SOCIAL ------------ //

    useEffect(() => {
        async function loadRedesSociais() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/listAllRedesSociais`);

                setRedesSocias(response.data || []);

            } catch (error) {
                console.log(error);
            }
        }
        loadRedesSociais();
    }, []);

    function handleChangePosicao(e: any) {
        setRedePosicaoSelected(e.target.value)
    }

    async function handleRedeSocial(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (nameRede === "" || redeLink === "") {
                toast.error('Não deixe o link em branco!')
                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', redeImage);
            data.append('redeName', nameRede);
            data.append('link', redeLink);/* @ts-ignore */
            data.append('order', Number(redeOrder));/* @ts-ignore */
            data.append('posicao', redePosicaoSelected);
            data.append('loja_id', user.loja_id);

            await apiClient.post(`/createRedeSocialLoja`, data);

            setLoading(true);

            toast.success('Rede Social cadastrada com sucesso.');

            setNameRede("");
            setRedeLink("");

            setTimeout(() => {
                navigate(0);
            }, 2000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a rede social.');
        }

        setLoading(false);

    }

    function handleFileRede(e: ChangeEvent<HTMLInputElement>) {
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

    /* @ts-ignore */
    const dados = [];
    (redesSocias || []).forEach((item) => {
        dados.push({
            "Imagem": <ImgRedes src={"http://localhost:3333/files/" + item.imageRede} alt={item.redeName} />,
            "Rede Social": item.redeName,
            "Ordem": String(item.order),
            "Posição no Site": item.posicao,
            "Disponivel?": item.disponibilidade === "Disponivel" ? "SIM" : "NÃO",
            "botaoDetalhes": `/rede/${item.id}`
        });
    });


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    {user.loja_id ? (
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
                                    {lojaUrl ? (
                                        <>
                                            <LogoLojaImgUrl
                                                src={lojaUrl}
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
                                        <LogoLojaImg src={"http://localhost:3333/files/" + logoLoja} alt="logomarca da loja" />
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
                                                    dado={nameLoja}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={nameLoja}
                                                    value={nameLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setNameLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"CNPJ"}
                                            dados={
                                                <InputUpdate
                                                    dado={cnpjLoja}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00.000.000/0000-00"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cnpjLoja}
                                                    value={cnpjLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCnpjLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"E-mail"}
                                            dados={
                                                <InputUpdate
                                                    dado={emailLoja}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={emailLoja}
                                                    value={emailLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setEmailLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Telefone"}
                                            dados={
                                                <InputUpdate
                                                    dado={phoneLoja}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="(00) 0000-0000"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={phoneLoja}
                                                    value={phoneLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setPhoneLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Celular"}
                                            dados={
                                                <InputUpdate
                                                    dado={cell}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="(00) 0000-0000"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cell}
                                                    value={cell}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCell(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Endereço"}
                                            dados={
                                                <InputUpdate
                                                    dado={ruaLoja}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={ruaLoja}
                                                    value={ruaLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setRuaLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
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
                                                    dado={numeroLoja}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={numeroLoja}
                                                    value={numeroLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setNumeroLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Bairro"}
                                            dados={
                                                <InputUpdate
                                                    dado={bairroLoja}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={bairroLoja}
                                                    value={bairroLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setBairroLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Cidade"}
                                            dados={
                                                <InputUpdate
                                                    dado={cityLoja}
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cityLoja}
                                                    value={cityLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCityLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>

                                    <BlockDados>
                                        <TextoDados
                                            chave={"Estado"}
                                            dados={
                                                <SelectUpdate
                                                    dado={stateLoja}
                                                    value={stateLojaSelected}
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
                                                    dado={cepLoja}
                                                    /* @ts-ignore */
                                                    as={IMaskInput}
                                                    /* @ts-ignore */
                                                    mask="00000-000"
                                                    type="text"
                                                    /* @ts-ignore */
                                                    placeholder={cepLoja}
                                                    value={cepLoja}
                                                    /* @ts-ignore */
                                                    onChange={(e) => setCepLoja(e.target.value)}
                                                    handleSubmit={handleUpdateDataLoja}
                                                />
                                            }
                                        />
                                    </BlockDados>
                                </SectionDate>
                            </GridDate>

                            {redesSocias.length < 1 ? (
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

                            <GridDateForm onSubmit={handleRedeSocial}>
                                <SectionDate>
                                    <BlockLogomarca>
                                        <EtiquetaLogo>
                                            <IconSpan>
                                                <MdFileUpload size={30} />
                                            </IconSpan>
                                            <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFileRede} alt="rede social loja virtual" />
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
                                            onChange={(e) => setRedeLink(e.target.value)}
                                        />
                                    </Block>

                                </SectionDate>

                                <SectionDate>

                                    <Block>
                                        <Etiqueta>Posição dessa rede:</Etiqueta>
                                        <Select
                                            value={redePosicaoSelected}
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
                                            onChange={handleChangePosicao}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Ordem dessa rede:</Etiqueta>
                                        <InputPost
                                            type="number"
                                            placeholder="0"/* @ts-ignore */
                                            onChange={(e) => setRedeOrder(e.target.value)}
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

                            <GridDateForm id="form-loja" onSubmit={handleLoja}>
                                <SectionDate>
                                    <BlockLogomarca>
                                        <EtiquetaLogo>
                                            <IconSpan>
                                                <MdFileUpload size={30} />
                                            </IconSpan>
                                            <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="logomarca" />
                                            {lojaUrl ? (
                                                <LogoLojaImgUrl
                                                    src={lojaUrl}
                                                    alt="logomarca da loja"
                                                    width={170}
                                                    height={80}
                                                />
                                            ) :
                                                <>
                                                    <LogoLojaImg src={"http://localhost:3333/files/" + logoLoja} />
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
                                            onChange={(e) => setNameLoja(e.target.value)}
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
                                            onChange={(e) => setCnpjLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>E-mail:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Ex: email@email.com"
                                            onChange={(e) => setEmailLoja(e.target.value)}
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
                                            onChange={(e) => setPhoneLoja(e.target.value)}
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
                                            onChange={(e) => setCell(e.target.value)}
                                        />
                                    </Block>

                                </SectionDate>

                                <SectionDate>

                                    <Block>
                                        <Etiqueta>Endereço:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o endereço da loja"
                                            onChange={(e) => setRuaLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Número:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o número da loja"
                                            onChange={(e) => setNumeroLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Bairro:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o bairro da loja"
                                            onChange={(e) => setBairroLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Cidade:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite a cidade da loja"
                                            onChange={(e) => setCityLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Estado:</Etiqueta>
                                        <Select
                                            value={stateLojaSelected}
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
                                            onChange={handleChangeEstado}
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
                                            onChange={(e) => setCepLoja(e.target.value)}
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