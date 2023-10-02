import { useState } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { InputPost } from "../../components/ui/InputPost";
import { useNavigate } from "react-router-dom";
import { BlockInputs, BoxActive, EtiquetaInput, RadioBotton } from "../Banners/styles";


const NovaConfiguracao: React.FC = () => {

    const navigate = useNavigate();

    const [subject, setSubject] = useState('');
    const [code_cupom, setCode_cupom] = useState('');
    const [startDate, setStartDate] = useState<number>(1);

    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };


    async function handleConfigAbandoned() {
        const apiClient = setupAPIClient();
        try {
            if (subject === "") {
                toast.error('Não deixe o assunto em branco!');
                return;
            }

            await apiClient.post(`/createConfigAbandonedCart`, {
                subject: subject,
                code_cupom: code_cupom,
                time_send_email: startDate * 60,
                active: active
            }
            );

            toast.success('Configuração cadastrada com sucesso.');

            setSubject("");

            setTimeout(() => {
                navigate('/carrinho/configuracoes');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar a configuração.');
        }
    }



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url='/carrinho/configuracoes' />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Cadastrar configuração"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={handleConfigAbandoned}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Assunto do E-mail:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o assunto..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Código do cupom:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Código do cupom..."
                            value={code_cupom}
                            onChange={(e) => setCode_cupom(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Tempo do envio (OBS: Cada numero é o equivalente a quantidade de horas):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="0"
                            value={startDate}/* @ts-ignore */
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Block>

                    <Block>
                        <BlockInputs>
                            <BoxActive>
                                <EtiquetaInput>Ativar disparo do e-mail?</EtiquetaInput>
                                <RadioBotton
                                    type="checkbox"
                                    value={active}
                                    onClick={handleChecked}
                                    onChange={() => setActive(check ? "Nao" : "Sim")}
                                    checked={check}
                                />
                            </BoxActive>
                        </BlockInputs>
                    </Block>
                </Card>
            </Container >
        </Grid >
    )
}

export default NovaConfiguracao;