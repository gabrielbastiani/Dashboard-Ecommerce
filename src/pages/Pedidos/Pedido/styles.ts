import styled from "styled-components";


export const ContainerPedido = styled.section`
  display: flex;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

export const BoxButton = styled.button`
    width: 33px;
    background-color: green;
    border-radius: 22%;
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 8px;
    margin-bottom: 15px;
    margin-left: 10px;

    svg {
        color: white;
    }
`;

export const BolckStatus = styled.div`
    display: flex;
    align-items: center;
`;

export const Status = styled.span`
    border-left: solid 4px orange;
    padding: 0 10px;
    margin: 20px 0;
    color: ${(props) => props?.theme?.colors?.white};
`;