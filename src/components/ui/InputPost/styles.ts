import styled from "styled-components";

export const InputText = styled.input`
  margin-bottom: 1rem;
  height: 30px;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  padding: 1rem;
  border: 1px solid #ff6700;

  @media (max-width: 430px) {
    width: 85%;
    padding: 0.6rem;
  }
`;

export const AreaText = styled.textarea`
  height: 220px;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  padding: 1rem;
  border: 1px solid #ff6700;
`;