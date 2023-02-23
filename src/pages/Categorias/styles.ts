import styled from "styled-components";

export const Container = styled.div`
  grid-area: CT;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};

  padding: 25px;

  height: calc(100vh - 70px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 615px) {
    flex-direction: column;
  }
`;

export const TotalBoxItems = styled.div`
  margin: 15px 5px;
`;

export const TextTotal = styled.span`
  font-size: 12px;
  letter-spacing: 1px;
`;

export const ContainerCategoryPage = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Previus = styled.div`
  align-self: center;
`;

export const ButtonPage = styled.button`
  margin: 0 15px;
  padding: 5px 10px;
  height: 30px;
  border: 0;
  background-color: ${(props) => props.theme.colors.info};
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

export const TextPage = styled.span`
  margin: 0 10px;
  padding: 12px 10px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.info};
    border-radius: 0.3rem;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.info};
    border-radius: 0.3rem;
  }
`;

export const Next = styled.div`
  align-self: center;
`;

export const NameCategory = styled.span`
  letter-spacing: 1px;
`;

export const ContainerCategorys = styled.div`
  display: flex;
`;

export const AddButton = styled.button`
  background-color: green;
  padding: 5px 12px;
  margin: 35px 0;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  align-items: center;

  svg {
    color: ${(props) => props.theme.colors.white};
    align-self: center;
    margin-left: -5px;
    margin-right: 5px;
    font-size: 17px;
  }
`;

export const SpanText = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: 0.5px;
`;

export const Etiqueta = styled.label`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.1rem;
  margin: 0 10px 10px 0;
`;

export const Block = styled.div`
  display: grid;
  width: 60%;
`;

export const BlockTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 440px) {
    flex-direction: column;
  }
`;