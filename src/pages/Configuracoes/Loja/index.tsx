import { useEffect, useState } from "react";
import Aside from "../../../components/Aside";
import { Card } from "../../../components/Content/styles";
import { IMaskInput } from "react-imask";
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
import { Button } from "../../../components/ui/Button";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import CountdownTimer from "../../../components/CountdownTimer";
import Warnings from "../../../components/Warnings";


const Loja: React.FC = () => {

    const [datasConfigs, setDatasConfigs] = useState<any[]>([]);
    const [countDownShow, setCountDownShow] = useState(false);
    const [configs, setConfigs] = useState(false);

    const [text_promotion, setText_promotion] = useState("");
    const [link_button, setLink_button] = useState("");
    const [text_button, setText_button] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");

    const [whatsApp, setWhatsApp] = useState("");
    const [code_google_analytics, setCode_google_analytics] = useState("");
    const [code_live_chat_tawkTo, setCode_live_chat_tawkTo] = useState("");

    const showCountDown = () => {
        setCountDownShow(!countDownShow);
    }

    const showConfigs = () => {
        setConfigs(!configs);
    }

    useEffect(() => {
        async function loadCountDown() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get('/findCountDownTime');

                setText_promotion(data.text_promotion || "");
                setLink_button(data.link_button || "");
                setText_button(data.text_button || "");
                setDay(data.day || "");
                setMonth(data.month || "");
                setYear(data.year || "");
                setHour(data.hour || "");
                setMinute(data.minute || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCountDown();
    }, []);

    async function loadCountDown() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get('/findCountDownTime');

            setText_promotion(data.text_promotion || "");
            setLink_button(data.link_button || "");
            setText_button(data.text_button || "");
            setDay(data.day || "");
            setMonth(data.month || "");
            setYear(data.year || "");
            setHour(data.hour || "");
            setMinute(data.minute || "");

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function reloadsConfigs() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/reloadDatasConfigsStore`);

                setDatasConfigs(data || []);

                setWhatsApp(data[0].number_whatsapp);
                setCode_google_analytics(data[0].code_google_analytics);
                setCode_live_chat_tawkTo(data[0].code_live_chat_tawkTo);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        reloadsConfigs()
    }, []);

    async function updatePromotionDates() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateCountDownTimer`, {
                text_promotion: text_promotion,
                text_button: text_button,
                link_button: link_button,
                day: day,
                month: month,
                year: year,
                hour: hour,
                minute: minute
            });

            toast.success('Dado do contador regressivo atualizado com sucesso');

            loadCountDown();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o contador regressivo.');
        }
    }

    async function reloadsConfigs() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.get(`/reloadDatasConfigsStore`);
            setDatasConfigs(data || []);
            setWhatsApp(data[0].number_whatsapp);
            setCode_google_analytics(data[0].code_google_analytics);
            setCode_live_chat_tawkTo(data[0].code_live_chat_tawkTo);
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

    async function handleConfigs() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/configExtraStore`, {
                number_whatsapp: whatsApp,
                code_google_analytics: code_google_analytics,
                code_live_chat_tawkTo: code_live_chat_tawkTo
            });
            toast.success("Configuração alterada com sucesso");
            reloadsConfigs();
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error("Erro ao atualizar a configuração.");
        }
    }

    async function clearAllCart() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete(`/clearAllCacheCarts`);
            toast.success("Limpeza realizada com sucesso!!!")
        } catch (error) {
            console.log(error);
            toast.error("Erro ao limpar o cache dos carrinhos")
        }
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <Titulos
                        tipo="h1"
                        titulo="Configurações na Loja"
                    />
                    <br />
                    <BlockDados>
                        <Button
                            onClick={clearAllCart}
                        >
                            Limpar cache carrinhos de compras parados
                        </Button>
                    </BlockDados>
                    <br />
                    <BlockDados>
                        {countDownShow ?
                            <Button
                                onClick={showCountDown}
                            >
                                Fechar
                            </Button>
                            :
                            <Button
                                onClick={showCountDown}
                            >
                                Cronômetro regressivo
                            </Button>
                        }
                    </BlockDados>
                    <br />
                    <BlockDados>
                        {configs ?
                            <Button
                                onClick={showConfigs}
                            >
                                Fechar
                            </Button>
                            :
                            <Button
                                onClick={showConfigs}
                            >
                                Configurações extras
                            </Button>
                        }
                    </BlockDados>
                    {countDownShow ?
                        <Card>

                            <CountdownTimer />
                            <br />

                            <BlockDados>
                                <TextoDados
                                    chave={"Texto da promoção"}
                                    dados={
                                        <InputUpdate
                                            dado={text_promotion}
                                            type="text"
                                            placeholder={text_promotion}
                                            value={text_promotion}
                                            onChange={(e) => setText_promotion(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Link do botão"}
                                    dados={
                                        <InputUpdate
                                            dado={link_button}
                                            type="text"
                                            placeholder={link_button}
                                            value={link_button}
                                            onChange={(e) => setLink_button(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Texto do botão"}
                                    dados={
                                        <InputUpdate
                                            dado={text_button}
                                            type="text"
                                            placeholder={text_button}
                                            value={text_button}
                                            onChange={(e) => setText_button(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Dia"}
                                    dados={
                                        <InputUpdate
                                            dado={day}
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="00"
                                            type="text"
                                            placeholder={day}
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Mês"}
                                    dados={
                                        <InputUpdate
                                            dado={month}
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="00"
                                            type="text"
                                            placeholder={month}
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Ano"}
                                    dados={
                                        <InputUpdate
                                            dado={year}
                                            /* @ts-ignore */
                                            as={IMaskInput}
                                            /* @ts-ignore */
                                            mask="0000"
                                            type="text"
                                            placeholder={year}
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Hora"}
                                    dados={
                                        <InputUpdate
                                            dado={hour}
                                            type="text"
                                            placeholder={hour}
                                            value={hour}
                                            onChange={(e) => setHour(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Minuto"}
                                    dados={
                                        <InputUpdate
                                            dado={minute}
                                            type="text"
                                            placeholder={minute}
                                            value={minute}
                                            onChange={(e) => setMinute(e.target.value)}
                                            handleSubmit={updatePromotionDates}
                                        />
                                    }
                                />
                            </BlockDados>
                        </Card>
                        :
                        null
                    }
                    <br />
                    {configs ?
                        <Card>
                            <BlockDados>
                                <TextoDados
                                    chave={"Número de WhatsApp (OBS: Digite apenas os numeros incluindo o DDD - EX: 00000000000)"}
                                    dados={
                                        <InputUpdate
                                            dado={whatsApp}
                                            type="text"
                                            placeholder={whatsApp}
                                            value={whatsApp}
                                            onChange={(e) => setWhatsApp(e.target.value)}
                                            handleSubmit={handleConfigs}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Código do Google Analystics"}
                                    dados={
                                        <InputUpdate
                                            dado={code_google_analytics}
                                            type="text"
                                            placeholder={code_google_analytics}
                                            value={code_google_analytics}
                                            onChange={(e) => setCode_google_analytics(e.target.value)}
                                            handleSubmit={handleConfigs}
                                        />
                                    }
                                />
                            </BlockDados>

                            <BlockDados>
                                <TextoDados
                                    chave={"Código do Live Chat TAWK.TO"}
                                    dados={
                                        <InputUpdate
                                            dado={code_live_chat_tawkTo}
                                            type="text"
                                            placeholder={code_live_chat_tawkTo}
                                            value={code_live_chat_tawkTo}
                                            onChange={(e) => setCode_live_chat_tawkTo(e.target.value)}
                                            handleSubmit={handleConfigs}
                                        />
                                    }
                                />
                            </BlockDados>
                        </Card>
                        :
                        null
                    }
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
                                                showElement={item.offer_products}
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
                                                showElement={item.emphasis_products}
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
                                                showElement={item.recent_products_views}
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
                                                showElement={item.chat_ia}
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
                                                showElement={item.credits_customer_in_menu}
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
                                                showElement={item.cupom_in_cart}
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
                                                showElement={item.cupom_in_payment}
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
                                                showElement={item.digital_products_customer_in_menu}
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
                                                showElement={item.newsllaters_section}
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
                                                showElement={item.search_bar}
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
                                                showElement={item.service_in_header}
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
                                                showElement={item.payment_boleto}
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
                                                showElement={item.payment_cartao}
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
                                                showElement={item.payment_pix}
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
                                                showElement={item.filter_categorys}
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
                                                showElement={item.filter_atributes}
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
                                                showElement={item.filter_price}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente tempo regressivo"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.count_down_timer}
                                                handleSubmit={() => handleUpdateStatusComponent("count_down_timer")}
                                                showElement={item.count_down_timer}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={"Componente chat whatsapp"}
                                        dados={
                                            <ButtonSelect
                                                dado={item.chat_whatsapp}
                                                handleSubmit={() => handleUpdateStatusComponent("chat_whatsapp")}
                                                showElement={item.chat_whatsapp}
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