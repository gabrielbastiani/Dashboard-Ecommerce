import { useEffect, useState, useCallback } from "react";
import moment from 'moment';
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import {
    BlockTop,
    ButtonPage,
    Container,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    Previus,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { Avisos } from "../../../components/Avisos";
import Select from "../../../components/ui/Select";
import TabelaSimples from "../../../components/Tabelas";


const Usuarios: React.FC = () => {

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [employees, setEmployees] = useState<any[]>([]);


    useEffect(() => {
        async function loadEmployees() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/admin/listForPageEmployes?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages);
                setEmployees(data.employees || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        loadEmployees();
    }, [currentPage, limit, total]);

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    const dados: any = [];
    (employees || []).forEach((item) => {
        dados.push({
            "Nome": item.name,
            "E-mail": item.email,
            "Cargo": item.role === "EMPLOYEE" ? "Empregado" : item.role === "ADMIN" ? "Administrador" : null,
            "Status": item.authenticated === false ? "Desativado" : item.authenticated === true ? "Ativado" : null,
            "Data de criação do usuario": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "botaoDetalhes": `/usuarios/usuario/${item.id}`
        });
    });

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Usuarios"
                        />
                    </BlockTop>

                    {dados.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há empregados ainda..."
                            />
                        </>
                    ) :
                        <>
                            <TextTotal>Usuarios por página: &nbsp;</TextTotal>

                            <Select
                                /* @ts-ignore */
                                onChange={limits}
                                opcoes={[
                                    { label: "Todos empregados", value: "9999999" },
                                    { label: "4", value: "4" },
                                    { label: "8", value: "8" }
                                ]}
                            />

                            <TabelaSimples
                                cabecalho={["Nome", "E-mail", "Cargo", "Status", "Data de criação do usuario"]}
                                dados={dados}
                                textbutton={"Detalhes"}
                            />

                            <ContainerPagination>
                                <TotalBoxItems key={total}>
                                    <TextTotal>Total de empregados: {total}</TextTotal>
                                </TotalBoxItems>
                                <ContainerCategoryPage>
                                    {currentPage > 1 && (
                                        <Previus>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                                Voltar
                                            </ButtonPage>
                                        </Previus>
                                    )}

                                    {pages.map((page) => (
                                        <TextPage
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </TextPage>
                                    ))}

                                    {currentPage < employees.length && (
                                        <Next>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                                Avançar
                                            </ButtonPage>
                                        </Next>
                                    )}
                                </ContainerCategoryPage>
                            </ContainerPagination>
                        </>
                    }
                </Card>
            </Container>
        </Grid>
    )
}

export default Usuarios;