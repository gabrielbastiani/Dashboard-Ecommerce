import styled from 'styled-components';


export const TableSection = styled.section`

`;

export const Cabecalho = styled.div`
    display: flex;
`;

export const TituloTop = styled.button`
    border: solid 1px ${(props) => props.theme.colors.gray};
    padding: 16px;
    background: ${(props) => props.theme.colors.info};
    color: ${(props) => props.theme.colors.white};
    font-weight: 600;
    font-size: 18px;
    
    &:nth-child(1) {
    border-top-left-radius: 10px;
    }
    &:last-child {
        border-top-right-radius: 10px;
    }

    transition: opacity .3s;

    &:hover {
        opacity: .8;
    }
`;

export const TableAllDescription = styled.div`
    
`;

export const TableDescription1 = styled.div`

`;

export const TableDescription2 = styled.div`

`;

export const TableDescription3 = styled.div`

`;

export const TableDescription4 = styled.div`

`;

export const TableDescription5 = styled.div`

`;

export const TableDescription6 = styled.div`

`;