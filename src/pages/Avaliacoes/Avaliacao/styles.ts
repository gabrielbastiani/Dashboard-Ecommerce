import styled from "styled-components";

export const TextAvaliacao = styled.p`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  padding: 15px;
  width: 520px;
  font-weight: bold;
`;

export const Perfil = styled.a`
  background-color: ${(props) => props.theme.colors.info};
  color: ${(props) => props.theme.colors.white};
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
`;