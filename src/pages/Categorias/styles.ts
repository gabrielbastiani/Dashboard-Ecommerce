import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};

    padding: 25px;  

    height: calc(100vh - 70px); 
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
    }
`;

export const Card = styled.div`
    margin: 40px 20px;
    padding: 30px;
    border-radius: 10px;
    border: 0;
    box-shadow: 0 0 5px ${props => props.theme.colors.gray};
    background-color: ${props => props.theme.colors.secondary};
`;

export const TitleText = styled.h1`
    color: ${props => props.theme.colors.white};
    margin-bottom: 1em;
`;