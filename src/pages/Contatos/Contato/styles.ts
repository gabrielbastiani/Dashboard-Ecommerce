import styled from "styled-components";

export const Mensagem = styled.textarea`
    border: solid 2px ${(props) => props.theme.colors.info};
    border-radius: 5px;
    padding: 10px;
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.white};
    height: 150px;
    width: 400px;
    resize: vertical;

    @media (max-width: 1207px) {
        width: 250px;
        
    }
`

export const LabelMensagem = styled.strong`
    color: ${(props) => props.theme.colors.white};
    font-size: 18.1px;
`

export const SendEmail = styled.a`
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
    display: flex;
    align-items: center;

    svg {
        margin-left: 10px;
    }
`