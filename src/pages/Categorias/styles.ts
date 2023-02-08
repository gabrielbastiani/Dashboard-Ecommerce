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

export const Card = styled.div`
  margin: 40px 20px;
  padding: 30px;
  border-radius: 10px;
  border: 0;
  box-shadow: 0 0 5px ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const TitleText = styled.h1`
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 1em;
`;

export const SelectItem = styled.select`
  width: 14%;
  height: 40px;
  border-radius: 0.3rem;
  margin-bottom: 1rem;

  border: 1px solid ${(props) => props.theme.colors.info};
  padding: 0 0.5rem;
  text-align: center;
  border-radius: 10px;
`;

export const OptionValue = styled.option``;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 615px) {
    flex-direction: column;
  }
`;

export const TotalCategorys = styled.div``;

export const TextTotal = styled.span``;

export const ContainerCategoryPage = styled.div``;

export const Previus = styled.div``;

export const ButtonPage = styled.button``;

export const TextPage = styled.span``;

export const Next = styled.div``;

export const CategoryBox = styled.div``;

export const NameCategory = styled.span``;

export const ContainerCategorys = styled.div`
  
`;