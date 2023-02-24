import React from "react";
import { Grid } from "../Dashboard/styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import { Card, Container } from "../../components/Content/styles";
import Voltar from "../../components/Voltar";
import Titulos from "../../components/Titulos";
import { Button } from "../../components/ui/Button";
import { Block, BlockTop, Etiqueta } from "../Categorias/styles";
import { InputPost, TextAreaPost } from "../../components/ui/InputPost";
import Select from "../../components/ui/Select";


const NovoProduto: React.FC = () => {


    function formatarMoeda() {
        var elemento = document.getElementById('valor');
        /* @ts-ignore */
        var valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elemento.value = valor;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valor == 'NaN') elemento.value = '';
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={'/produtos'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Novo Produto"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                        /* onClick={''} */
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Nome:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o nome do produto"
                        /* value={categoryName} */
                        /* onChange={(e) => setCategoryName(e.target.value)} */
                        />
                    </Block>

                    <Etiqueta>Categoria:</Etiqueta>
                    {/* <Select
                        value={undefined}
                        opcoes={undefined}
                        onChange={function (): void {throw new Error("Function not implemented.");} }                        
                    /> */}

                    <Block>
                        <Etiqueta>Descrição:</Etiqueta>
                        <TextAreaPost
                            style={{ resize: "none" }}
                        >
                        </TextAreaPost>
                    </Block>

                    <Block>
                        <Etiqueta>Preço:</Etiqueta>
                        <InputPost
                            style={{ maxWidth: "150px" }}
                            id="valor"
                            type="text"
                            /* @ts-ignore */
                            onKeyUp={formatarMoeda}
                            maxLength={10}
                            placeholder="R$00.000,00"
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Valor em Promoção:</Etiqueta>
                        <InputPost
                            style={{ maxWidth: "150px" }}
                            id="valor"
                            type="text"
                            /* @ts-ignore */
                            onKeyUp={formatarMoeda}
                            maxLength={10}
                            placeholder="R$00.000,00"
                        />
                    </Block>

                    <Block>
                        <Etiqueta>SKU:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o código do produto"
                        /* value={categoryName} */
                        /* onChange={(e) => setCategoryName(e.target.value)} */
                        />
                    </Block>

                </Card>
            </Container>
        </Grid>
    )
}

export default NovoProduto;