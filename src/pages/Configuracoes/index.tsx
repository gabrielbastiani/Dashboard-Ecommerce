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
import { GrUpload } from 'react-icons/gr';
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
    GridDate
} from "./styles";
import { InputPost } from "../../components/ui/InputPost";

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

    console.log(loja_id)

    useEffect(() => {
        async function loadStore() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/userLoja?loja_id=${user.loja_id}`);

                setLoja_id(response.data.id);
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
            userLoja();

            setLoading(true);

            toast.success('Loja cadastrada com sucesso.');

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar a loja.');
        }
        setLoading(false);
    }

    async function userLoja() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/lojaidUserUpdate?user_id=${user.id},`, { loja_id: loja_id });
        } catch (error) {
            console.log(error);
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
                                        <GrUpload size={20} />
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
                        <GridDate onSubmit={handleLoja}>
                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo="Configurações"
                                />
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: 'green' }}
                                >
                                    Salvar
                                </Button>
                            </BlockTop>

                            
                                <SectionDate>
                                    <EtiquetaLogo>
                                        <IconSpan>
                                            <GrUpload size={20} />
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
                                            <LogoLojaImg src={"http://localhost:3333/files/" + logoLoja} alt="logomarca da loja" />
                                        }
                                    </EtiquetaLogo>

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
                                            type="text"
                                            placeholder="Digite o CNPJ da loja"
                                            onChange={(e) => setCnpjLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>E-mail:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o email da loja"
                                            onChange={(e) => setEmailLoja(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Telefone:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o telefone da loja"
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
                                            type="text"
                                            placeholder="Digite o CEP da loja"
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