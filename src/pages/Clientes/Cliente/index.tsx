import React, { useState } from "react";
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
    const [newslatters, setNewslatters] = useState('');


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
                                                dado={''}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setNameProducts(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Disponibilidade"}
                                        dados={
                                            <ButtonSelect
                                                /* @ts-ignore */
                                                dado={''}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Categoria"}
                                        dados={
                                            <SelectUpdate
                                                dado={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={''}
                                                opcoes={
                                                    [
                                                        { label: "Selecionar...", value: "" },
                                                        { label: "Rio Grande do Sul", value: "RS" },

                                                    ]
                                                }
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"SKU"}
                                        dados={
                                            <InputUpdate
                                                dado={''}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setSkus(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Estoque"}
                                        dados={
                                            <InputUpdate
                                                dado={''}
                                                type="number"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setEstoques(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Peso (Kg)"}
                                        dados={
                                            <InputUpdate
                                                dado={''}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setPesoKGs(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Largura (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={''}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setLarguraCMs(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Comprimento (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={''}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setProfundidadeCMs(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Altura (Cm)"}
                                        dados={
                                            <InputUpdate
                                                dado={''}
                                                type="text"
                                                /* @ts-ignore */
                                                placeholder={''}
                                                value={''}
                                                /* @ts-ignore */
                                                onChange={(e) => setAlturaCMs(e.target.value)}
                                                handleSubmit={() => alert('clicou')}
                                            />
                                        }
                                    />
                                </BlockDados>


                            </SectionDate>

                            <SectionDate>
                                <BlockDados>
                                    dfdfd
                                </BlockDados>

                                <BlockDados>
                                    fdfdfd
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