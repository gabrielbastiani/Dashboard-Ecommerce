import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.info};
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Warn = styled.strong`
  color: red;
`;

export const TextWarning = styled.h4`
  color: ${(props) => props.theme.colors.black};
`

export const LinkPage = styled.a`
  color: ${(props) => props.theme.colors.success};
  font-weight: 800;
`