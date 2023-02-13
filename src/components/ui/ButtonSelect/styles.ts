import styled from "styled-components";

export const BoxSelect = styled.div`
  display: flex;
  align-items: center;
`;

export const DisponivelData = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 12px;

  svg {
    background-color: #00ff00;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const IndisponivelData = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 12px;

  svg {
    background-color: red;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const ValueText = styled.span``;
