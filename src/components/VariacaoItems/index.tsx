import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { BlockTop } from "../../pages/Categorias/styles";
import { SectionDate } from "../../pages/Configuracoes/styles";
import { GridDate } from "../../pages/Perfil/styles";
import { TextoDados } from "../TextoDados";
import Titulos from "../Titulos";
import { Button } from "../ui/Button";
import { InputUpdate } from "../ui/InputUpdate";



interface ItemsVariacao {
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

const VariacaoItems = ({
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
                                    handleSubmit={ () => alert('clicou')}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>
            </GridDate>
        </>
    )
}

export default VariacaoItems;