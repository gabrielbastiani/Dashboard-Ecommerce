import React, { useState, useEffect, useContext } from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import { BlockDados } from "../Categorias/Categoria/styles";
import { TextoDados } from "../../components/TextoDados";
import { InputUpdate } from "../../components/ui/InputUpdate";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import { BlockTop } from "../Categorias/styles";
import { setupAPIClient } from "../../services/api";
import { AuthContext } from '../../contexts/AuthContext';


const Configuracoes: React.FC = () => {

    const { user } = useContext(AuthContext);

    const [logoLoja, setLogoLoja] = useState('');
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

    


    useEffect(() => {
        async function loadStore() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/userLoja?loja_id=${user.loja_id}`);

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
    },[])
   

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Configurações"
                        />

                        
                    </BlockTop>

                    <BlockDados>
                        <TextoDados
                            chave={"Nome da loja"}
                            dados={
                                <InputUpdate
                                    dado={nameLoja}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={nameLoja}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setNameLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setCnpjLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setEmailLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setPhoneLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setRuaLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setNumeroLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setBairroLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setCityLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setStateLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
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
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setCepLoja(e.target.value)}
                                    handleSubmit={ () => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                </Card>
            </Container>
        </Grid>
    )
}

export default Configuracoes;