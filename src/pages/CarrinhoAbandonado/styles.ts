import styled from "styled-components";

export const BlockExport = styled.div`
  padding: 40px 0;
  display: flex;
  align-items: center;
`;

export const ButtonExit = styled.button`
  background-color: transparent;
  display: flex;
  color: ${(props) => props.theme.colors.white};
  align-items: center;
  padding: 0 20px;

  svg {
    background-color: red;
    color: ${(props) => props.theme.colors.black};
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
    margin-right: 8px;
  }
`;
