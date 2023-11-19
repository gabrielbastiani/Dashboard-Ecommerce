import { useEffect, useState, useCallback } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { BlockTop, ButtonPage, Container, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import { setupAPIClient } from "../../../services/api";
import Warnings from "../../../components/Warnings";
import moment from "moment";
import Select from "../../../components/ui/Select";
import { BodyTable, BodyTableResponsive, ButtonDangerSmall, ButtonDangerSmallResponsive, Cabeca, CabecaLinhaResponsive, CabecaResposive, Celula, CelulaLinha, CelulaLinha1, CelulaLinha1Responsive, CelulaLinhaResponsive, CelulaResponsive, Linha, LinhaResponsive, Simples, TabelasSimples, TableResponsive } from "./styles";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";


const Notificacoes: React.FC = () => {

    const [search, setSearch] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(15);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        async function allNotifications() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageAllNotifications?page=${currentPage}&limit=${limit}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.notifications || []);

            } catch (error) {/* @ts-ignore */
                console.error(error.response.data);
            }
        }
        allNotifications();
    }, [currentPage, limit, total]);

    async function allNotifications() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/pageAllNotifications?page=${currentPage}&limit=${limit}`);

            setTotal(data.total);
            const totalPages = Math.ceil(total / limit);

            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
                arrayPages.push(i);
            }

            setPages(arrayPages || []);
            setSearch(data.notifications || []);

        } catch (error) {/* @ts-ignore */
            console.error(error.response.data);
        }
    }

    /* @ts-ignore */
    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);

    async function notificationsViewd(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateViewdNotification?notificationAdmin_id=${id}`);
            allNotifications();
        } catch (error) {
            console.error(error);
        }
    }

    async function notificationsAllViewd() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllViewdNotification`);
            allNotifications();
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <Voltar
                        url="/configuracoes"
                    />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo='Central de notificações'
                        />

                        <Button
                            onClick={notificationsAllViewd}
                        >
                            Marcar todas como lidas
                        </Button>
                    </BlockTop>

                    <Select
                        /* @ts-ignore */
                        onChange={limits}
                        opcoes={[
                            { label: "Todas notificações", value: "999999" },
                            { label: "25", value: "25" },
                            { label: "50", value: "50" }
                        ]}
                    />

                    <TabelasSimples>
                        <Simples>
                            <Cabeca>
                                <Linha>
                                    <Celula>Mensagem</Celula>
                                    <Celula>Notificação acessada?</Celula>
                                    <Celula>Data</Celula>
                                </Linha>
                            </Cabeca>
                            {search.map((item, index) => {
                                return (
                                    <>
                                        <BodyTable key={index}>
                                            <Linha>
                                                <CelulaLinha
                                                    dangerouslySetInnerHTML={{ __html: item.message }}
                                                ></CelulaLinha>
                                                <CelulaLinha>{item.viewed === true ? "SIM" : "NÃO"}</CelulaLinha>
                                                <CelulaLinha>{moment(item.created_at).format('DD/MM/YYYY - HH:mm')}</CelulaLinha>
                                                <CelulaLinha1>
                                                    <Link to={item.link} onClick={() => notificationsViewd(item.id)}>
                                                        <ButtonDangerSmall>
                                                            Verificar
                                                        </ButtonDangerSmall>
                                                    </Link>
                                                </CelulaLinha1>
                                            </Linha>
                                        </BodyTable>
                                    </>
                                )
                            })}
                        </Simples>

                        <TableResponsive>
                            <CabecaResposive>
                                <CabecaLinhaResponsive>
                                    <CelulaResponsive>Mensagem</CelulaResponsive>
                                    <CelulaResponsive>Notificação acessada?</CelulaResponsive>
                                    <CelulaResponsive>Data</CelulaResponsive>
                                </CabecaLinhaResponsive>
                            </CabecaResposive>
                            {search.map((celitem, index) => {
                                return (
                                    <>
                                        <BodyTableResponsive key={index}>
                                            <LinhaResponsive>
                                                <CelulaLinhaResponsive
                                                    dangerouslySetInnerHTML={{ __html: celitem.message }}
                                                ></CelulaLinhaResponsive>
                                                <CelulaLinhaResponsive>{celitem.viewed === true ? "SIM" : "NÃO"}</CelulaLinhaResponsive>
                                                <CelulaLinhaResponsive>{moment(celitem.created_at).format('DD/MM/YYYY - HH:mm')}</CelulaLinhaResponsive>
                                                <CelulaLinha1Responsive>
                                                    <Link to={celitem.link} onClick={() => notificationsViewd(celitem.id)}>
                                                        <ButtonDangerSmallResponsive>
                                                            Verificar
                                                        </ButtonDangerSmallResponsive>
                                                    </Link>
                                                </CelulaLinha1Responsive>
                                            </LinhaResponsive>
                                        </BodyTableResponsive>
                                    </>
                                )
                            })}
                        </TableResponsive>
                    </TabelasSimples>

                    <ContainerPagination>
                        <TotalBoxItems key={total}>
                            <TextTotal>Total de notificações: {total}</TextTotal>
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

                            {currentPage < search.length && (
                                <Next>
                                    <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                        Avançar
                                    </ButtonPage>
                                </Next>
                            )}
                        </ContainerCategoryPage>
                    </ContainerPagination>

                </Card>
            </Container>
        </Grid>
    )
}

export default Notificacoes;