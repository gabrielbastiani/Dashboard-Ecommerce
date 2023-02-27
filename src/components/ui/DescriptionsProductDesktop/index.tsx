import { useState } from "react";
import {
    TableSection,
    Cabecalho,
    TituloTop,
    TableAllDescription,
    TableDescription1,
    TableDescription2,
    TableDescription3,
    TableDescription4,
    TableDescription5,
    TableDescription6
} from './styles';


/* interface DescriptionRequest {
    valor1: any;
    valor2: any;
    valor3: any;
    valor4: any;
    valor5: any;
    valor6: any;
    onChange1: () => void;
    onChange2: () => void;
    onChange3: () => void;
    onChange4: () => void;
    onChange5: () => void;
    onChange6: () => void;
} */

const DescriptionsProductDesktop = (/* {
    valor1,
    valor2,
    valor3,
    valor4,
    valor5,
    valor6,
    onChange1,
    onChange2,
    onChange3,
    onChange4,
    onChange5,
    onChange6,
}: DescriptionRequest */) => {

    


    return (
        <>
            <TableSection>
                <Cabecalho>
                    <TituloTop>
                        1º Descrição
                    </TituloTop>
                    <TituloTop>
                        2º Descrição
                    </TituloTop>
                    <TituloTop>
                        3º Descrição
                    </TituloTop>
                    <TituloTop>
                        4º Descrição
                    </TituloTop>
                    <TituloTop>
                        5º Descrição
                    </TituloTop>
                    <TituloTop>
                        6º Descrição
                    </TituloTop>
                </Cabecalho>
                <TableAllDescription>

                    <TableDescription1>

                    </TableDescription1>

                    <TableDescription2>
                        
                    </TableDescription2>

                    <TableDescription3>
                        
                    </TableDescription3>

                    <TableDescription4>
                        
                    </TableDescription4>

                    <TableDescription5>
                        
                    </TableDescription5>

                    <TableDescription6>
                        
                    </TableDescription6>

                </TableAllDescription>
            </TableSection>














            {/* <Block>
                <Etiqueta>1° Descrição:</Etiqueta>
                <TextAreaPost
                    style={{ resize: "none" }}
                    placeholder="Digite aqui..."
                    value={valor1}
                    onChange={onChange1}
                >
                </TextAreaPost>
            </Block>

            {showElementDescriptions ?
                <>
                    <AddButton
                        style={{ backgroundColor: 'red' }}
                    >
                        <AiOutlinePlusCircle />
                        <SpanText onClick={showOrHideDescriptions}>Fechar descrições extras</SpanText>
                    </AddButton>

                    {showElement2 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide2}>Fechar a opção de segunda descrição</SpanText>
                            </AddButton>
                            <Etiqueta>2° Descrição:</Etiqueta>
                            <TextAreaPost
                                style={{ resize: "none", width: "120%" }}
                                placeholder="Digite aqui..."
                                value={valor2}
                                onChange={onChange2}
                            >
                            </TextAreaPost>
                        </Block>
                        :
                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <AiOutlinePlusCircle />
                            <SpanText onClick={showOrHide2}>Adicionar segunda descrição...</SpanText>
                        </AddButton>
                    }

                    {showElement3 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide3}>Fechar a opção de terceira descrição</SpanText>
                            </AddButton>
                            <Etiqueta>3° Descrição:</Etiqueta>
                            <TextAreaPost
                                style={{ resize: "none", width: "120%" }}
                                placeholder="Digite aqui..."
                                value={valor3}
                                onChange={onChange3}
                            >
                            </TextAreaPost>
                        </Block>
                        :
                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <AiOutlinePlusCircle />
                            <SpanText onClick={showOrHide3}>Adicionar terceira descrição...</SpanText>
                        </AddButton>
                    }

                    {showElement4 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide4}>Fechar a opção de quarta descrição</SpanText>
                            </AddButton>
                            <Etiqueta>4° Descrição:</Etiqueta>
                            <TextAreaPost
                                style={{ resize: "none", width: "120%" }}
                                placeholder="Digite aqui..."
                                value={valor4}
                                onChange={onChange4}
                            >
                            </TextAreaPost>
                        </Block>
                        :
                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <AiOutlinePlusCircle />
                            <SpanText onClick={showOrHide4}>Adicionar quarta descrição...</SpanText>
                        </AddButton>
                    }

                    {showElement5 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide5}>Fechar a opção de quinta descrição</SpanText>
                            </AddButton>
                            <Etiqueta>5° Descrição:</Etiqueta>
                            <TextAreaPost
                                style={{ resize: "none", width: "120%" }}
                                placeholder="Digite aqui..."
                                value={valor5}
                                onChange={onChange5}
                            >
                            </TextAreaPost>
                        </Block>
                        :
                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <AiOutlinePlusCircle />
                            <SpanText onClick={showOrHide5}>Adicionar quinta descrição...</SpanText>
                        </AddButton>
                    }

                    {showElement6 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide6}>Fechar a opção de sexta descrição</SpanText>
                            </AddButton>
                            <Etiqueta>6° Descrição:</Etiqueta>
                            <TextAreaPost
                                style={{ resize: "none", width: "120%" }}
                                placeholder="Digite aqui..."
                                value={valor6}
                                onChange={onChange6}
                            >
                            </TextAreaPost>
                        </Block>
                        :
                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <AiOutlinePlusCircle />
                            <SpanText onClick={showOrHide6}>Adicionar sexta descrição...</SpanText>
                        </AddButton>
                    }
                </>
                :
                <AddButton>
                    <AiOutlinePlusCircle />
                    <SpanText onClick={showOrHideDescriptions}>Inserir descrições extras</SpanText>
                </AddButton>
            } */}
        </>

    )
}

export default DescriptionsProductDesktop;