import { useState } from "react";
import { AddButton, Block, Etiqueta, SpanText } from "../../../pages/Categorias/styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrSubtractCircle } from "react-icons/gr";
import { TextAreaPost } from "../InputPost";
import { ButtonConfirm, EditBox, ValueText } from "../InputUpdate/styles";
import { GiConfirmed } from "react-icons/gi";

interface DescriptionRequest {
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
    handleSubmit1: (param?: any, param2?: any) => void;
    handleSubmit2: (param?: any, param2?: any) => void;
    handleSubmit3: (param?: any, param2?: any) => void;
    handleSubmit4: (param?: any, param2?: any) => void;
    handleSubmit5: (param?: any, param2?: any) => void;
    handleSubmit6: (param?: any, param2?: any) => void;
}


const DescriptionsProductUpdateMobile = ({
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
    handleSubmit1,
    handleSubmit2,
    handleSubmit3,
    handleSubmit4,
    handleSubmit5,
    handleSubmit6
}: DescriptionRequest) => {

    const [showElement1, setShowElement1] = useState(false);
    const [showElement2, setShowElement2] = useState(false);
    const [showElement3, setShowElement3] = useState(false);
    const [showElement4, setShowElement4] = useState(false);
    const [showElement5, setShowElement5] = useState(false);
    const [showElement6, setShowElement6] = useState(false);
    const [showElementDescriptions, setShowElementDescriptions] = useState(false);

    const showOrHide1 = () => {
        setShowElement1(!showElement1);
    }

    const showOrHide2 = () => {
        setShowElement2(!showElement2);
    }

    const showOrHide3 = () => {
        setShowElement3(!showElement3);
    }

    const showOrHide4 = () => {
        setShowElement4(!showElement4);
    }

    const showOrHide5 = () => {
        setShowElement5(!showElement5);
    }

    const showOrHide6 = () => {
        setShowElement6(!showElement6);
    }

    const showOrHideDescriptions = () => {
        setShowElementDescriptions(!showElementDescriptions);
    }


    return (
        <>
            {showElementDescriptions ?
                <>
                    <AddButton
                        style={{ backgroundColor: 'red' }}
                    >
                        <AiOutlinePlusCircle />
                        <SpanText onClick={showOrHideDescriptions}>Fechar descrições</SpanText>
                    </AddButton>

                    {showElement1 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide1}>Fechar a primeira descrição</SpanText>
                            </AddButton>
                            <Etiqueta>1° Descrição:</Etiqueta>
                            <EditBox>
                                <ValueText style={{ marginBottom: '12px' }}>Salvar edição</ValueText>
                                <ButtonConfirm type="submit" onClick={handleSubmit1}><GiConfirmed /></ButtonConfirm>
                            </EditBox>
                            <TextAreaPost
                                style={{ resize: "none" }}
                                placeholder="Digite aqui..."
                                value={valor1}
                                onChange={onChange1}
                            >
                            </TextAreaPost>
                        </Block>
                        :
                        <AddButton
                            style={{ backgroundColor: '#f6ba24' }}
                        >
                            <AiOutlinePlusCircle />
                            <SpanText onClick={showOrHide1}>Editar a primeira descrição</SpanText>
                        </AddButton>
                    }

                    {showElement2 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide2}>Fechar a segunda descrição</SpanText>
                            </AddButton>
                            <Etiqueta>2° Descrição:</Etiqueta>
                            <EditBox>
                                <ValueText style={{ marginBottom: '12px' }}>Salvar edição</ValueText>
                                <ButtonConfirm type="submit" onClick={handleSubmit2}><GiConfirmed /></ButtonConfirm>
                            </EditBox>
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
                            <SpanText onClick={showOrHide2}>Editar a segunda descrição</SpanText>
                        </AddButton>
                    }

                    {showElement3 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide3}>Fechar a terceira descrição</SpanText>
                            </AddButton>
                            <Etiqueta>3° Descrição:</Etiqueta>
                            <EditBox>
                                <ValueText style={{ marginBottom: '12px' }}>Salvar edição</ValueText>
                                <ButtonConfirm type="submit" onClick={handleSubmit3}><GiConfirmed /></ButtonConfirm>
                            </EditBox>
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
                            <SpanText onClick={showOrHide3}>Editar a terceira descrição</SpanText>
                        </AddButton>
                    }

                    {showElement4 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide4}>Fechar a quarta descrição</SpanText>
                            </AddButton>
                            <Etiqueta>4° Descrição:</Etiqueta>
                            <EditBox>
                                <ValueText style={{ marginBottom: '12px' }}>Salvar edição</ValueText>
                                <ButtonConfirm type="submit" onClick={handleSubmit4}><GiConfirmed /></ButtonConfirm>
                            </EditBox>
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
                            <SpanText onClick={showOrHide4}>Editar a quarta descrição</SpanText>
                        </AddButton>
                    }

                    {showElement5 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide5}>Fechar a quinta descrição</SpanText>
                            </AddButton>
                            <Etiqueta>5° Descrição:</Etiqueta>
                            <EditBox>
                                <ValueText style={{ marginBottom: '12px' }}>Salvar edição</ValueText>
                                <ButtonConfirm type="submit" onClick={handleSubmit5}><GiConfirmed /></ButtonConfirm>
                            </EditBox>
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
                            <SpanText onClick={showOrHide5}>Editar a quinta descrição</SpanText>
                        </AddButton>
                    }

                    {showElement6 ?
                        <Block>
                            <AddButton
                                style={{ backgroundColor: 'red' }}
                            >
                                <GrSubtractCircle />
                                <SpanText onClick={showOrHide6}>Fechar a sexta descrição</SpanText>
                            </AddButton>
                            <Etiqueta>6° Descrição:</Etiqueta>
                            <EditBox>
                                <ValueText style={{ marginBottom: '12px' }}>Salvar edição</ValueText>
                                <ButtonConfirm type="submit" onClick={handleSubmit6}><GiConfirmed /></ButtonConfirm>
                            </EditBox>
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
                            <SpanText onClick={showOrHide6}>Editar a sexta descrição</SpanText>
                        </AddButton>
                    }
                </>
                :
                <AddButton>
                    <AiOutlinePlusCircle />
                    <SpanText onClick={showOrHideDescriptions}>Ver as descrições</SpanText>
                </AddButton>
            }
        </>

    )
}

export default DescriptionsProductUpdateMobile;