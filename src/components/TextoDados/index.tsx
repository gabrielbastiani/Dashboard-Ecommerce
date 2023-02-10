import React from 'react';


/* @ts-ignore */
export const TextoDados = ({ chave, valor, vertical = false }) => (
    <div className={`Texto-Dados flex ${vertical ? "vertical" : "horizontal"}`}>
        <strong className={`Texto-Dados flex ${!vertical ? "flex-center" : ""}`}>{chave}:&nbsp;</strong>
        <span>{valor}</span>
    </div>
)