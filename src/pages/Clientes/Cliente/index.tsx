import React from "react";
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



const Cliente: React.FC = () => {

    let { nameComplete, user_id } = useParams();



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

                        <BlockDados>
                            <TextoDados
                                chave={"Nome"}
                                dados={
                                    <InputUpdate
                                        dado={nameComplete}
                                        type="text"
                                        /* @ts-ignore */
                                        placeholder={nameComplete}
                                        value={nameComplete}
                                        /* @ts-ignore */
                                        onChange={(e) => setNameComplete(e.target.value)}
                                        handleSubmit={() => alert('Clicou')}
                                    />
                                }
                            />
                        </BlockDados>


                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Cliente;