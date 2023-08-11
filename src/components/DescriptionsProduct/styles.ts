import styled from "styled-components";

export const TableSection = styled.section`
  display: flex;
  width: 100%;

  @media (max-width: 1110px) {
    flex-direction: column;
  }
`;

export const Cabecalho = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TituloTop = styled.button`
  border: solid 1px ${(props) => props.theme.colors.gray};
  padding: 12px;
  background: ${(props) => props.theme.colors.info};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  font-size: 15px;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

export const TextAreaDescription = styled.textarea`
  width: 100%;
  height: 500px;
  resize: none;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  padding: 15px;
`;

export const EditBoxDesc = styled.div`
  display: flex;
  align-items: baseline;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const TextButton = styled.span`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  padding: 5px 10px;
  text-decoration: underline;
`;

export const TabContents = styled.div`
  width: 100%;
`;

export const SectionTitleDescriptions = styled.div``

export const ContainerDescriptions = styled.div`

`