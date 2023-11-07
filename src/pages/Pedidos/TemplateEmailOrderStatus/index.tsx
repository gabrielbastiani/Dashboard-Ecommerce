import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import moment from "moment";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    AddButton,
    Container,
    SpanText
} from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import { Avisos } from "../../../components/Avisos";
import Titulos from "../../../components/Titulos";
import TabelaSimples from "../../../components/Tabelas";
import Warnings from "../../../components/Warnings";


const TemplateEmailOrderStatus: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    useEffect(() => {
        async function allTemplates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allTemplateEmailsStatusOrder`);

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
            "Nome do arquivo": item.name_file_email,
            "Status do pedido": item.status_order,
            "Data de criação": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "botaoDetalhes": `/pedidos/templateEmailOrderStatus/${item.slug_name_file_email}`
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

                        <AddButton>
                            <AiOutlinePlusCircle />
                            <Link to="/pedidos/TemplateEmailOrderStatus/novo" >
                                <SpanText>Criar Template</SpanText>
                            </Link>
                        </AddButton>

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Não há templates de emails de status de pedidos cadastrados aqui..."
                                />
                            </>
                        ) :
                            <>
                                <Titulos
                                    tipo="h1"
                                    titulo="Templates de e-mails para status de pedidos"
                                />

                                <TabelaSimples
                                    cabecalho={["Nome do arquivo", "Status do pedido", "Data de criação"]}
                                    dados={dados}
                                    textbutton={"Detalhes"}
                                />
                            </>
                        }
                    </Card>
                </Container>
            </Grid >
        </>
    )
}

export default TemplateEmailOrderStatus;