import styled from "styled-components";

export const ContainerContent = styled.div`
    justify-content: center;
    align-items: center;
    border-radius: 3%;
    z-index: 9999999999,
`;

export const ButtonClose = styled.button`

`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 26px;

    @media (max-width: 560px) {
        Button {
            width: 50%;
        }
    }
`;

export const TextModal = styled.h2`
    color: white;
    margin-top: 17px;
`;