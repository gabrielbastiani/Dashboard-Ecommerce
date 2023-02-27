import styled from "styled-components";

export const SelectItemUpdate = styled.select`
  height: 25px;
  border-radius: 0.3rem;
  border: 1px solid ${(props) => props.theme.colors.info};
  padding: 0 0.5rem;
  text-align: center;
  border-radius: 10px;
  font-size: 11px;
`;

export const OptionsUpdate = styled.option`
  font-size: 13px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonUpdate = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 15px;

  svg {
    background-color: yellow;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const ButtonExit = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 2px 1px;

  svg {
    background-color: red;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const ButtonConfirm = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 12px 1px;

  svg {
    background-color: #00ff00;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const EditBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ValueText = styled.span`

`;