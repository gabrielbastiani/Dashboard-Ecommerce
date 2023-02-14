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
    ButtonDangerSmall,
    TableResponsive,
    CabecaResposive,
    LinhaResponsive,
    CelulaResponsive,
    BodyTableResponsive,
    CelulaLinhaResponsive,
    CelulaLinha1Responsive,
    ButtonDangerSmallResponsive,
    CabecaLinhaResponsive
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

        <TableResponsive>
            <CabecaResposive>
                <CabecaLinhaResponsive>
                    {
                        cabecalho.map((item: any, idx: any) => (<CelulaResponsive key={idx}>{item}</CelulaResponsive>))
                    }
                </CabecaLinhaResponsive>
            </CabecaResposive>
            <BodyTableResponsive>
                {
                    dados.map((linha: any, idx: any) => (
                        <LinhaResponsive key={idx}>
                            {
                                cabecalho.map((item: any, index: any) => (
                                    <CelulaLinhaResponsive key={index}>{linha[item] || ""}</CelulaLinhaResponsive>
                                ))
                            }
                            {
                                linha["botaoDetalhes"] && (
                                    <CelulaLinha1Responsive>
                                        <Link to={linha["botaoDetalhes"]}>
                                            <ButtonDangerSmallResponsive>
                                                DETALHES
                                            </ButtonDangerSmallResponsive>
                                        </Link>
                                    </CelulaLinha1Responsive>
                                )
                            }
                        </LinhaResponsive>
                    ))
                }
            </BodyTableResponsive>
        </TableResponsive>

    </TabelasSimples>
)

export default TabelaSimples;