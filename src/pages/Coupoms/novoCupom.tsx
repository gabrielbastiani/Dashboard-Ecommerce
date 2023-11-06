import { useState } from "react";
import Aside from "../../components/Aside";
import { Card } from "../../components/Content/styles";
import MainHeader from "../../components/MainHeader";
import Titulos from "../../components/Titulos";
import Voltar from "../../components/Voltar";
import { Button } from "../../components/ui/Button";
import { Block, BlockTop, Container, Etiqueta } from "../Categorias/styles";
import { Grid } from "../Dashboard/styles";
import { Link } from "react-router-dom";
import { SectionDate } from "../Configuracoes/styles";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { InputPost } from "../../components/ui/InputPost";
import { GridDate } from "../Perfil/styles";
import { BlockInputs, BoxActive, EtiquetaInput, RadioBotton } from "../Banners/styles";
import { TextArea } from "../../components/ui/Input";
import { BlockCategory, TextButton } from "../Produtos/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";


const NovoCupom: React.FC = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [amountCoupon, setAmountCoupon] = useState(Number);
    const [active, setActive] = useState('Nao');
    const [check, setCheck] = useState(false);

    const [showFirstCoupom, setShowFirstCoupom] = useState(false);

    const showFirstCoupomProduct = () => {
        setShowFirstCoupom(!showFirstCoupom);
    }

    const [firstCoupom, setFirstCoupom] = useState("");

    const handleChecked = (e: any) => {
        setCheck(e.target.checked);
    };

    async function loadFirstCoupom() {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/findFirstCoupom');
            setFirstCoupom(response.data.id || "");
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterCupom() {
        const apiClient = setupAPIClient();
        try {
            if (name === "" || code === "") {
                toast.error('Preencha os campos nome e código do cupom.');
                return;
            }

            await apiClient.post(`/createCoupon`, {
                name: name,
                description: description,
                startDate: startDate,
                endDate: endDate,
                code: code,
                amountCoupon: Number(amountCoupon),
                active: active,
            });

            toast.success('Cupom cadastrado com sucesso.');

            loadFirstCoupom();
            showFirstCoupomProduct();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao cadastrar o cupom.');
        }

    }

    setInterval(() => {
        new Date();
    }, 1000);



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    {showFirstCoupom ? (
                        <>
                            <Card>
                                <BlockCategory>
                                    <Button
                                        style={{ backgroundColor: 'green' }}
                                    >
                                        <AiOutlinePlusCircle size={25} />
                                        <Link to={`/cupom/${firstCoupom}`} >
                                            <TextButton>Clique aqui, para cadastrar produto(s) ou demais regras a esse cupom se desejar.<br />Caso não queira fazer nada disso sai dessa tela</TextButton>
                                        </Link>
                                    </Button>
                                </BlockCategory>
                            </Card>
                        </>
                    ) :
                        <>
                            <Voltar url='/coupoms' />

                            <BlockTop>
                                <Titulos
                                    tipo="h1"
                                    titulo="Novo Cupom"
                                />
                                <Button
                                    onClick={handleRegisterCupom}
                                    style={{ backgroundColor: 'green' }}
                                >
                                    Salvar
                                </Button>
                            </BlockTop>

                            <GridDate>
                                <SectionDate>
                                    <Block>
                                        <Etiqueta>Nome do Cupom:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite o nome aqui..."
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Código do Cupom:</Etiqueta>
                                        <InputPost
                                            type="text"
                                            placeholder="Digite aqui..."
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Quantidade desse Cupom:</Etiqueta>
                                        <InputPost
                                            type="number"
                                            placeholder="0"/* @ts-ignore */
                                            onChange={(e) => setAmountCoupon(e.target.value)}
                                        />
                                    </Block>

                                    <Block>
                                        <Etiqueta>Descrição do Cupom:</Etiqueta>
                                        <TextArea
                                            style={{ height: '250px', padding: '15px' }}
                                            placeholder="Digite aqui..."
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Block>
                                </SectionDate>

                                <SectionDate>
                                    <Block>
                                        <BlockInputs>
                                            <BoxActive>
                                                <EtiquetaInput>Ativar cupom?</EtiquetaInput>
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
                                    <br />

                                    {active === "Sim" ? (
                                        null
                                    ) :
                                        <>
                                            <Etiqueta
                                                style={{ color: 'red', fontSize: '15px' }}
                                            >
                                                PROGRAME A DATA DESSE CUPOM ABAIXO SE DESEJAR<br />
                                                (OBS: NÃO ATIVE O CUPOM NO CHECKBOX ACIMA PARA PODER<br />
                                                PROGRAMAR ABAIXO), MAS CASO QUEIRA ATIVAR O CUPOM NA LOJA SEM PROGRAMAÇÃO, ATIVE O CHECKBOX ACIMA E SALVE NORMALMENTE.
                                            </Etiqueta>
                                            <br />
                                            <br />
                                            <Block>
                                                <Etiqueta>Data de início:</Etiqueta>
                                                <InputPost
                                                    type="datetime-local"
                                                    placeholder={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </Block>

                                            <Block>
                                                <Etiqueta>Data do fim:</Etiqueta>
                                                <InputPost
                                                    type="datetime-local"
                                                    placeholder={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                            </Block>
                                        </>
                                    }
                                </SectionDate>
                            </GridDate>
                        </>
                    }
                </Card>
            </Container>
        </Grid>
    )
}

export default NovoCupom;