import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import Voltar from "../../../components/Voltar";
import Titulos from "../../../components/Titulos";
import moment from 'moment';
import { Block, Etiqueta } from "../../Categorias/styles";
import { InputPost } from "../../../components/ui/InputPost";
import { TextArea } from "../../../components/ui/Input";
import { BlockData, TextData, TextStrong } from "./styles";
import Select from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";


const Contraproposta: React.FC = () => {

    let { counterproposal_id } = useParams();
    const navigate = useNavigate();

    const [currentPrice, setCurrentPrice] = useState(Number);
    const [counterOfferPrice, setCounterOfferPrice] = useState(Number);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [lowestPricePlace, setLowestPricePlace] = useState("");
    const [moreInformation, setMoreInformation] = useState("");
    const [sku, setSku] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [status, setStatus] = useState("");
    const [statusSelected, setStatusSelected] = useState();
    const [dataProposta, setDataProposta] = useState("");

    const [codeCoupon, setCodeCoupon] = useState("");
    const [information, setInformation] = useState("");

    function handleChangeStatus(e: any) {
        setStatusSelected(e.target.value);
    }

    useEffect(() => {
        async function loadCounterProposal() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueCounterProposal?counterproposal_id=${counterproposal_id}`);

                setCurrentPrice(data.currentPrice);
                setCounterOfferPrice(data.counterOfferPrice);
                setName(data.name || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setLowestPricePlace(data.lowestPricePlace || "");
                setMoreInformation(data.moreInformation || "");
                setSku(data.sku || "");
                setNameProduct(data.nameProduct || "");
                setStatus(data.status || "");
                setDataProposta(data.created_at);
                setCodeCoupon(data.codeCoupon || "");
                setInformation(data.information || "");

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCounterProposal();
    }, [counterproposal_id]);

    async function handleCounterProposal() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDataCounterProposal?counterproposal_id=${counterproposal_id}`, {
                information: information,
                codeCoupon: codeCoupon,
                status: statusSelected
            });
            toast.success('Proposta enviada com sucesso!!!');
            setTimeout(() => {
                navigate(0);
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao enviar a proposta.');
        }
    }

    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>

                        <Voltar url='/contrapropostas' />

                        <Titulos
                            tipo="h2"
                            titulo={`Contraproposta para ${nameProduct}`}
                        />
                        <br />
                        <br />
                        <BlockData>
                            <TextStrong>SKU: </TextStrong>
                            <TextData>{sku}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Valor do Produto: </TextStrong>
                            <TextData>{currentPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Valor da Proposta: </TextStrong>
                            <TextData>{counterOfferPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TextData>
                        </BlockData>
                        <br />
                        <Titulos
                            tipo="h1"
                            titulo="Informações do cliente"
                        />

                        <BlockData>
                            <TextStrong>Data da Solicitação: </TextStrong>
                            <TextData>{moment(dataProposta).format('DD/MM/YYYY - HH:mm')}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Nome do Solicitante: </TextStrong>
                            <TextData>{name}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>E-mail do Solicitante: </TextStrong>
                            <TextData>{email}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Telefone do Solicitante: </TextStrong>
                            <TextData>{phone}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Local do melhor valor: </TextStrong>
                            <TextData>{lowestPricePlace}</TextData>
                        </BlockData>

                        <BlockData>
                            <TextStrong>Informações adicionadas pelo Solicitante: </TextStrong>
                            <TextData>{moreInformation}</TextData>
                        </BlockData>
                        <br />
                        <Titulos
                            tipo="h1"
                            titulo="Situação da Proposta"
                        />

                        <Block>
                            <BlockData>
                                <TextStrong>Situação Inicial: </TextStrong>
                                <TextData>{status}</TextData>
                            </BlockData>
                            <Etiqueta>Alterar a situação da Proposta:</Etiqueta>
                            <Select
                                value={statusSelected}
                                /* @ts-ignore */
                                onChange={handleChangeStatus}
                                opcoes={
                                    [
                                        { label: "Selecionar...", value: "" },
                                        { label: "Pendente", value: "Pendente" },
                                        { label: "Não Aprovado", value: "Não Aprovado" },
                                        { label: "Aprovado", value: "Aprovado" },
                                    ]
                                }
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Cupom de Desconto para a Proposta:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o código de cupom de desconto aqui..."
                                value={codeCoupon}
                                onChange={(e) => setCodeCoupon(e.target.value)}
                            />
                        </Block>

                        <Block>
                            <Etiqueta>Observações a serem enviadas ao Solicitante:</Etiqueta>
                            <TextArea
                                style={{ resize: 'none', height: '100px', borderRadius: '5px', padding: '10px', borderColor: 'orange' }}
                                value={information}
                                placeholder="Digite aqui observações para o cliente..."
                                onChange={(e) => setInformation(e.target.value)}
                            />
                        </Block>
                        <br />
                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={handleCounterProposal}
                        >
                            Enviar contraproposta
                        </Button>

                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Contraproposta;