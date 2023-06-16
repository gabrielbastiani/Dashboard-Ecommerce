import styled from "styled-components";

export const InputText = styled.input`
  margin-bottom: 1rem;
  height: 30px;
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};
  padding: 0.5rem;
  border: 1px solid #ff6700;
  font-weight: bold;
  font-size: 1rem;
  display: flex;

  @media (max-width: 430px) {
    width: 85%;
    padding: 0.6rem;
  }
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
  margin: 0 2px 13px;

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
  margin: 0 12px 13px;

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
  position: relative;
  width: 45%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 430px) {
    width: 25%;
  }
`;
