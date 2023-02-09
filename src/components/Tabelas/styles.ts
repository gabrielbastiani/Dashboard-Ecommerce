import styled from "styled-components";

export const TabelasSimples = styled.div`

`;

export const Simples = styled.table`
    margin-bottom: 50px;
    border-collapse: collapse;
`;

export const Cabeca = styled.thead`
    
`;

export const Linha = styled.tr`
    
`;

export const Celula = styled.th`
    background-color: ${(props) => props.theme.colors.info};
    padding: 10px;
    color: ${(props) => props.theme.colors.white};
    font-size: 1rem;
    &:nth-child(1) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    &:nth-child(2) {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

export const BodyTable = styled.tbody`

`;

export const CelulaLinha = styled.td`
    padding: 10px;
    font-size: 0.9rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.white};
    text-align: center;
    letter-spacing: 0.7px;
`;

export const CelulaLinha1 = styled.td`
    
`;

export const ButtonDangerSmall = styled.button`
    font-size: 0.8rem;
    padding: 8px 15px;
    margin: 5px;
    border: 1px solid;
    background-color: ${(props) => props.theme.colors.info};
    cursor: pointer;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;

    @media(max-width: 680px){
        font-size: 0.7rem;
        padding: 6px 5px;
    }
`;