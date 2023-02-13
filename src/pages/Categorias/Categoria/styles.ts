import styled from "styled-components";

export const BlockDados = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
`;

export const LinhaDivisoria = styled.hr`
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    margin-bottom: 25px;
`;