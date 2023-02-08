import { Link } from "react-router-dom";
import {
    TabelasSimples,
    Simples,
    Cabeca,
    Linha,
    Celula,
    BodyTable,
    CelulaLinha,
    CelulaLinha1,
    ButtonDangerSmall
} from './styles';

interface TabelaRequest {
    cabecalho: any;
    dados: any;
}

const TabelaSimples = ({ cabecalho, dados }: TabelaRequest) => (
    <TabelasSimples>
        <Simples>
            <Cabeca>
                <Linha>
                    {
                        cabecalho.map((item: any, idx: any) => (<Celula key={idx}>{item}</Celula>))
                    }
                </Linha>
            </Cabeca>
            <BodyTable>
                {
                    dados.map((linha: any, idx: any) => (
                        <Linha key={idx}>
                            {
                                cabecalho.map((item: any, index: any) => (
                                    <CelulaLinha key={index}>{linha[item] || ""}</CelulaLinha>
                                ))
                            }
                            {
                                linha["botaoDetalhes"] && (
                                    <CelulaLinha1>
                                        <Link to={linha["botaoDetalhes"]}>
                                            <ButtonDangerSmall>
                                                DETALHES
                                            </ButtonDangerSmall>
                                        </Link>
                                    </CelulaLinha1>
                                )
                            }
                        </Linha>
                    ))
                }
            </BodyTable>
        </Simples>
    </TabelasSimples>
)

export default TabelaSimples;