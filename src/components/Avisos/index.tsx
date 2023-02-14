import React from 'react';
import {
    TextoAviso
} from './styles';

interface TextDadosRequest {
    texto: string;
}

export const Avisos = ({ texto }: TextDadosRequest) => (
    <TextoAviso>{texto}</TextoAviso>
)