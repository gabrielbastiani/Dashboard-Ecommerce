import React from 'react';
import {
    TextoDadosDiv,
    Dados
} from './styles';

interface TextDadosRequest {
    chave: string;
    dados: any;
}

export const TextoDados = ({ chave, dados }: TextDadosRequest) => (
    <>
        <TextoDadosDiv>{chave}:&nbsp;&nbsp;</TextoDadosDiv>
        <Dados>{dados}</Dados>
    </>
)