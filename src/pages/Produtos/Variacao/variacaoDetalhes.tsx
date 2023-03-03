import PhotosVariacoes from "../../../components/PhotosVariacoes";
import { TextoDados } from "../../../components/TextoDados";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { BlockTop } from "../../Categorias/styles";
import { GridDate, SectionDate } from "../../Configuracoes/styles";


interface ItemsVariacao {
    photoVariacaoID: string;
    nameVariacao: string;
    descriptionVariacao1: any;
    descriptionVariacao2: any;
    descriptionVariacao3: any;
    descriptionVariacao4: any;
    descriptionVariacao5: any;
    descriptionVariacao6: any;
    preco: string;
    skuVariacao: string;
    estoqueVariacao: string;
    pesoKg: string;
    larguraCm: string;
    alturaCm: string;
    profundidadeCm: string;
    disponibilidadeVariacao: string;
    promocao: string;
    freteGratis: string;
}

const VariacaoDetalhes = ({
    photoVariacaoID,
    nameVariacao,
    descriptionVariacao1,
    descriptionVariacao2,
    descriptionVariacao3,
    descriptionVariacao4,
    descriptionVariacao5,
    descriptionVariacao6,
    preco,
    skuVariacao,
    estoqueVariacao,
    pesoKg,
    larguraCm,
    alturaCm,
    profundidadeCm,
    disponibilidadeVariacao,
    promocao,
    freteGratis
}: ItemsVariacao) => {

    function formatPrecoUpdate() {
        var elementoUpdate = document.getElementById('valorupdate');
        /* @ts-ignore */
        var valorupdate = elementoUpdate.value;

        valorupdate = valorupdate + '';
        valorupdate = parseInt(valorupdate.replace(/[\D]+/g, ''));
        valorupdate = valorupdate + '';
        valorupdate = valorupdate.replace(/([0-9]{2})$/g, ",$1");

        if (valorupdate.length > 6) {
            valorupdate = valorupdate.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementoUpdate.value = valorupdate;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorupdate == 'NaN') elementoUpdate.value = '';
    }

    function formatPromocaoUpdate() {
        var elementopromocaoupdate = document.getElementById('valorpromocaoupdate');
        /* @ts-ignore */
        var valorpromocaoupdate = elementopromocaoupdate.value;

        valorpromocaoupdate = valorpromocaoupdate + '';
        valorpromocaoupdate = parseInt(valorpromocaoupdate.replace(/[\D]+/g, ''));
        valorpromocaoupdate = valorpromocaoupdate + '';
        valorpromocaoupdate = valorpromocaoupdate.replace(/([0-9]{2})$/g, ",$1");

        if (valorpromocaoupdate.length > 6) {
            valorpromocaoupdate = valorpromocaoupdate.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementopromocaoupdate.value = valorpromocaoupdate;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorpromocaoupdate == 'NaN') elementopromocaoupdate.value = '';
    }

    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h3"
                    titulo={'Variação - ' + nameVariacao}
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: '#FB451E' }}
                /* onClick={''} */
                >
                    Remover
                </Button>
            </BlockTop>

            <GridDate>
                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"SKU"}
                            dados={
                                <InputUpdate
                                    dado={skuVariacao}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={skuVariacao}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setSkuVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Nome"}
                            dados={
                                <InputUpdate
                                    dado={nameVariacao}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={nameVariacao}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setNameVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Estoque"}
                            dados={
                                <InputUpdate
                                    dado={estoqueVariacao}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={estoqueVariacao}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setSkuVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Peso (Kg)"}
                            dados={
                                <InputUpdate
                                    dado={pesoKg}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={pesoKg}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setPesoKgVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Largura (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={larguraCm}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={larguraCm}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setLarguraCmVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Comprimento (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={profundidadeCm}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={profundidadeCm}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setProfundidadeCmVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>

                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"Altura (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={alturaCm}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={alturaCm}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setAlturaCmVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Disponibilidade"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={disponibilidadeVariacao}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Frete Grátis?"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={freteGratis}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Preço"}
                            dados={
                                <InputUpdate
                                    id="valorupdate"
                                    /* @ts-ignore */
                                    onKeyUp={formatPrecoUpdate}
                                    maxLength={10}
                                    dado={preco}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={preco}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setPesoKgVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Valor em Promoção"}
                            dados={
                                <InputUpdate
                                    id="valorpromocaoupdate"
                                    /* @ts-ignore */
                                    onKeyUp={formatPromocaoUpdate}
                                    maxLength={10}
                                    dado={promocao}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={promocao}
                                    value={''}
                                    /* @ts-ignore */
                                    onChange={(e) => setPromocaoVariacao(e.target.value)}
                                    handleSubmit={() => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>

                <SectionDate>
                    <PhotosVariacoes
                        variacao_id={photoVariacaoID}
                    />
                </SectionDate>
            </GridDate>
        </>
    )
}

export default VariacaoDetalhes;