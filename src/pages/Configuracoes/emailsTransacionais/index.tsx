import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Container } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import { Avisos } from "../../../components/Avisos";
import Titulos from "../../../components/Titulos";
import TabelaSimples from "../../../components/Tabelas";
import Warnings from "../../../components/Warnings";


const EmailsTransacionais: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    useEffect(() => {
        async function allTemplates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findEmailsTransactions`);

                setSearch(data || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allTemplates();
    }, []);

    const dados: any = [];
    (search || []).forEach((item) => {
        dados.push({
            "Nome do arquivo": item.slice(0, -4).replace(/_/g, ' ').replace(/-/g, ' '),
            "botaoDetalhes": `/configuracoes/emailstransacionais/${item}`
        });
    });


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Warnings />
                    <Card>

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há templates de emails transacionais cadastrados aqui..."
                                />
                            </>
                        ) :
                            <>
                                <Titulos
                                    tipo="h1"
                                    titulo="Templates de e-mails transacionais"
                                />

                                <TabelaSimples
                                    cabecalho={["Nome do arquivo"]}
                                    dados={dados}
                                    textbutton={"Editar"}
                                />
                            </>
                        }
                    </Card>
                </Container>
            </Grid >
        </>
    )
}

export default EmailsTransacionais;