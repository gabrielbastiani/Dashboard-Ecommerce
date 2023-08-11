import styled from "styled-components";

export const Cabecalho = styled.div`
  display: flex;

  @media (max-width: 886px) {
    flex-direction: column;
  }
`;

export const TituloTop = styled.button`
  border: solid 1px ${(props) => props.theme.colors.gray};
  padding: 16px;
  background: ${(props) => props.theme.colors.info};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  font-size: 17px;
  border-top: 1.5px solid ${(props) => props.theme.colors.info};

  &:nth-child(1) {
    border-top-left-radius: 10px;
    border-left: 1.5px solid ${(props) => props.theme.colors.info};
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-right: 1.5px solid ${(props) => props.theme.colors.info};
  }

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1104px) {
    padding: 8px;
    font-size: 13px;
  }

  @media (max-width: 886px) {
    &:nth-child(1) {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 0px;
    }
  }
`;

export const TextAreaDescription = styled.textarea`
  width: 849px;
  height: 350px;
  resize: none;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  border-right: 1.5px solid ${(props) => props.theme.colors.info};
  border-left: 1.5px solid ${(props) => props.theme.colors.info};
  border-bottom: 1.5px solid ${(props) => props.theme.colors.info};
  padding: 15px;

  &:nth-child(1) {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  @media (max-width: 1214px) {
    width: 100%;
  }

  @media (max-width: 1104px) {
    width: 575px;
  }

  @media (max-width: 985px) {
    width: 100%;
  }
`;

export const EditBoxDesc = styled.div`
  display: flex;
  align-items: baseline;
`;

export const TextButton = styled.span`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  padding: 5px 10px;
  text-decoration: underline;
`;

export const FormImage = styled.form``;

export const EtiquetaImg = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PreviewImageAttribute = styled.img`
  width: 120px;
  height: 80px;
  margin-bottom: 5px;
  object-fit: contain;
`;

export const ButtonImg = styled.button`
  color: ${(props) => props.theme.colors.white};
  background-color: green;
  padding: 5px;
  border-radius: 5px;
`;

export const AttributeImg = styled.img`
  width: 120px;
  height: 80px;
  margin-bottom: 5px;
  object-fit: contain;
`;

export const IconSpanUpload = styled.span`
  z-index: 1;
  opacity: 0.7;
  transition: all 0.9s;
  cursor: pointer;

  svg {
    margin: -5px 0;
  }
`;

export const TextUpdate = styled.small`
  cursor: pointer;
`;

export const TableAllDescription = styled.div``;

export const TabContents = styled.div``;

export const TableSection = styled.section``;

export const ContainerAttributes = styled.div``;