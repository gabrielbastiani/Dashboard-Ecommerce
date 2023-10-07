import { useEffect, useState } from "react";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import MainHeader from "../../../components/MainHeader";
import Titulos from "../../../components/Titulos";
import { setupAPIClient } from "../../../services/api";
import { Container } from "../../Categorias/styles";
import { Grid } from "../../Dashboard/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { toast } from "react-toastify";
import { ContainerComponents } from "./styles";


const Loja: React.FC = () => {

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
                setDatasConfigs(data || []);
            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    async function reloadsConfigs() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
            setDatasConfigs(data || []);
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function handleUpdateStatusComponent(statusComponent: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusConfigItem?statusUpdate=${statusComponent}`);
            toast.success("Status do componente atualizado com sucesso.");
            reloadsConfigs();
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao atualizar o status.");
        }
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Configurações na Loja"
                    />
                    <br />
                    {datasConfigs.map((item, index) => {
                        return (
                            <ContainerComponents key={index}>
                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente ofertas de produtos"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.offer_products}
                                                handleSubmit={() => handleUpdateStatusComponent("offer_products")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente tendências de produtos"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.emphasis_products}
                                                handleSubmit={() => handleUpdateStatusComponent("emphasis_products")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente produtos recem visualizados"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.recent_products_views}
                                                handleSubmit={() => handleUpdateStatusComponent("recent_products_views")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente inteligencia artificial"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.chat_ia}
                                                handleSubmit={() => handleUpdateStatusComponent("chat_ia")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente menu créditos do cliente"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.credits_customer_in_menu}
                                                handleSubmit={() => handleUpdateStatusComponent("credits_customer_in_menu")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente cupom de desconto no carrinho de compras"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.cupom_in_cart}
                                                handleSubmit={() => handleUpdateStatusComponent("cupom_in_cart")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente cupom de desconto na página de pagamento"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.cupom_in_payment}
                                                handleSubmit={() => handleUpdateStatusComponent("cupom_in_payment")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente menu produtos digitais"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.digital_products_customer_in_menu}
                                                handleSubmit={() => handleUpdateStatusComponent("digital_products_customer_in_menu")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente newsllaters"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.newsllaters_section}
                                                handleSubmit={() => handleUpdateStatusComponent("newsllaters_section")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente pesquisa por produtos"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.search_bar}
                                                handleSubmit={() => handleUpdateStatusComponent("search_bar")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente atendimento e afins no header"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.service_in_header}
                                                handleSubmit={() => handleUpdateStatusComponent("service_in_header")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Meio de pagamento boleto bancario"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.payment_boleto}
                                                handleSubmit={() => handleUpdateStatusComponent("payment_boleto")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Meio de pagamento cartão de crédito"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.payment_cartao}
                                                handleSubmit={() => handleUpdateStatusComponent("payment_cartao")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Meio de pagamento PIX"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.payment_pix}
                                                handleSubmit={() => handleUpdateStatusComponent("payment_pix")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente filtro por categorias"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.filter_categorys}
                                                handleSubmit={() => handleUpdateStatusComponent("filter_categorys")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente filtro por atributos"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.filter_atributes}
                                                handleSubmit={() => handleUpdateStatusComponent("filter_atributes")}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente filtro por preço"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.filter_price}
                                                handleSubmit={() => handleUpdateStatusComponent("filter_price")}
                                            />
                                        }
                                    />
                                </BlockDados>
                            </ContainerComponents>
                        )
                    })}

                </Card>
            </Container >
        </Grid >
    )
}

export default Loja;