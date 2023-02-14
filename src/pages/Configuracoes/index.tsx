import React, { useState, useEffect } from "react";
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


const Configuracoes: React.FC = () => {

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
                const { data } = await apiClient.get('/allLojasPage?page=$1&limit=5');

                setLogoLoja(data.lojas.logoLoja);
                setNameLoja(data.lojas.nameLoja);
                setCnpjLoja(data.lojas.cnpjLoja);
                setEmailLoja(data.lojas.emailLoja);
                setPhoneLoja(data.lojas.phoneLoja);
                setRuaLoja(data.lojas.ruaLoja);
                setNumeroLoja(data.lojas.numeroLoja);
                setBairroLoja(data.lojas.bairroLoja);
                setCepLoja(data.lojas.cepLoja);
                setCityLoja(data.lojas.cityLoja);
                setStateLoja(data.lojas.stateLoja);

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
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={nameLoja}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"CNPJ"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"E-mail"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Telefone"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <DivisorHorizontal />

                    <BlockDados>
                        <TextoDados
                            chave={"Endereço"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Número"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Bairro"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Cidade"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Estado"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"CEP"}
                            dados={/* @ts-ignore */
                                <InputUpdate
                                    dado={''}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={''}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => alert('clicou')}
                                /* handleSubmit={''} */
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