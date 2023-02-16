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
    GridDate,
    BlockLogomarca,
    TextLogo
} from "./styles";
import { InputPost } from "../../components/ui/InputPost";
import { IMaskInput } from "react-imask";


const Configuracoes: React.FC = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loja_id, setLoja_id] = useState('');
    const [logoLoja, setLogoLoja] = useState(null);
    const [lojaUrl, setLojaUrl] = useState('');
    const [nameLoja, setNameLoja] = useState('');
    const [cnpjLoja, setCnpjLoja] = useState('');
    const [emailLoja, setEmailLoja] = useState('');
    const [phoneLoja, setPhoneLoja] = useState('');
    const [ruaLoja, setRuaLoja] = useState('');
    const [numeroLoja, setNumeroLoja] = useState('');
    const [bairroLoja, setBairroLoja] = useState('');
    const [cepLoja, setCepLoja] = useState('');
    const [cityLoja, setCityLoja] = useState('');
    const [stateLoja, setStateLoja] = useState('');

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

                setLoja_id(response.data.loja_id);
                setLogoLoja(response.data.logoLoja);
                setNameLoja(response.data.nameLoja);
                setCnpjLoja(response.data.cnpjLoja);
                setEmailLoja(response.data.emailLoja);
                setPhoneLoja(response.data.phoneLoja);
                setRuaLoja(response.data.ruaLoja);
                setNumeroLoja(response.data.numeroLoja);
                setBairroLoja(response.data.bairroLoja);
                setCepLoja(response.data.cepLoja);
                setCityLoja(response.data.cityLoja);
                setStateLoja(response.data.stateLoja);

            } catch (error) {
                console.log(error);
            }
        }
        loadStore();
    }, [user.loja_id])

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
                cityLoja === "" ||
                stateLoja === ""
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
            data.append('ruaLoja', ruaLoja);
            data.append('numeroLoja', numeroLoja);
            data.append('bairroLoja', bairroLoja);
            data.append('cepLoja', cepLoja);
            data.append('cityLoja', cityLoja);
            data.append('stateLoja', stateLoja);

            await apiClient.post(`/loja`, data);

            setLoading(true);

            toast.success('Loja cadastrada com sucesso.');

            setNameLoja("");
            setCnpjLoja("");
            setEmailLoja("");
            setPhoneLoja("");
            setRuaLoja("");
            setNumeroLoja("");
            setBairroLoja("");
            setCepLoja("");
            setCityLoja("");
            setStateLoja("");

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

            await apiClient.put(`/lojaidUserUpdate?user_id=${user.id}`, { loja_id: lojaID });

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
                cityLoja === "" ||
                stateLoja === ""
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
                ruaLoja: ruaLoja,
                numeroLoja: numeroLoja,
                bairroLoja: bairroLoja,
                cepLoja: cepLoja,
                cityLoja: cityLoja,
                stateLoja: stateLoja
            });
            toast.success('Dado da loja atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o dado!')
        }
    }

    


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

                            <DivisorHorizontal />

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
                                        <InputUpdate
                                            dado={stateLoja}
                                            type="text"
                                            /* @ts-ignore */
                                            placeholder={stateLoja}
                                            value={stateLoja}
                                            /* @ts-ignore */
                                            onChange={(e) => setStateLoja(e.target.value)}
                                            handleSubmit={handleUpdateDataLoja}
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

                            <GridDate id="form-loja" onSubmit={handleLoja}>
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
                                            mask="99.999.999/9999-99"
                                            type="text"
                                            placeholder="99.999.999/9999-99"
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
                                            mask="(99) 9999-9999"
                                            type="text"
                                            placeholder="(99) 9999-9999"
                                            onChange={(e) => setPhoneLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Endereço:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o endereço da loja"
                                            onChange={(e) => setRuaLoja(e.target.value)}
                                        />
                                    </Block>
                                </SectionDate>

                                <SectionDate>
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
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o estado da loja"
                                            onChange={(e) => setStateLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>CEP:</Etiqueta>
                                        <InputPost
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="99999-999"
                                            type="text"
                                            placeholder="99999-999"
                                            onChange={(e) => setCepLoja(e.target.value)}
                                        />
                                    </Block>
                                </SectionDate>
                            </GridDate>
                        </>
                    )}
                </Card>
            </Container>
        </Grid>
    )
}

export default Configuracoes;