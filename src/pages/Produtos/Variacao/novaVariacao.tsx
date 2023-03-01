import { GridDate, SectionDate } from "../../Configuracoes/styles";
import { Block, BlockTop, Etiqueta } from "../../Categorias/styles";
import { InputPost } from "../../../components/ui/InputPost";
import { Button } from "../../../components/ui/Button";
import Titulos from "../../../components/Titulos";


const NovaVariacao = () => {



    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Nova Variação"
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: 'green' }}
                    onClick={() => alert('Clicou')}
                >
                    Salvar
                </Button>
            </BlockTop>

            <GridDate>
                <SectionDate>
                    <Block>
                        <Etiqueta>SKU:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o código da variação..."
                            value={''}
                        /* onChange={(e) => setSku(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Nome:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Digite o nome da variação..."
                            value={''}
                        /* onChange={(e) => setSku(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Estoque:</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Estoque do produto"
                            value={''}/* @ts-ignore */
                        /* onChange={(e) => setEstoque(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Peso (Kg):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Peso em Kg"
                            value={''}
                        /* onChange={(e) => setPeso(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Largura (Cm):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Largura em CM"
                            value={''}
                        /* onChange={(e) => setLargura(e.target.value)} */
                        />
                    </Block>
                </SectionDate>

                <SectionDate>
                    <Block>
                        <Etiqueta>Comprimento (Cm):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Comprimento em CM"
                            value={''}
                        /* onChange={(e) => setProfundidade(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Altura (Cm):</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="Altura em CM"
                            value={''}
                        /* onChange={(e) => setAltura(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Preço:</Etiqueta>
                        <InputPost
                            style={{ maxWidth: "170px" }}
                            id="valor"
                            type="text"
                            /* @ts-ignore */
                            onKeyUp={''}
                            maxLength={10}
                            placeholder="R$00.000,00"
                            value={''}/* @ts-ignore */
                        /* onChange={(e) => setPreco(e.target.value)} */
                        />
                    </Block>

                    <Block>
                        <Etiqueta>Valor em Promoção:</Etiqueta>
                        <InputPost
                            style={{ maxWidth: "170px" }}
                            id="valorPromocao"
                            type="text"
                            /* @ts-ignore */
                            onKeyUp={''}
                            maxLength={10}
                            placeholder="R$00.000,00"
                            value={''}/* @ts-ignore */
                        /* onChange={(e) => setPromocao(e.target.value)} */
                        />
                    </Block>
                </SectionDate>
            </GridDate>
        </>
    )
}

export default NovaVariacao;