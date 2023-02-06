import styled from "styled-components";

export const PesquisaBox = styled.div`

`;

export const InputSearch = styled.input`
  padding: 8px 15px;
  border: 1px solid ${props => props.theme.colors.info};
  font-size: 1rem;
  border-radius: 10px;
  width: 80%;
`;

export const ButtonSearch = styled.button`
  margin-left: -40px;
  background-color: transparent;
  font-size: 1.1rem;
  border: 0;
  cursor: pointer;

  svg {
    margin-bottom: -7px;
    font-size: 24px;
    color: ${props => props.theme.colors.info};
  }
`;
