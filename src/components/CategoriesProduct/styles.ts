import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: solid 2px ${(props) => props?.theme?.colors?.white};
  border-radius: 10px;
  background-color: ${(props) => props?.theme?.colors?.black};

  @media (max-width: 797px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 160px;
  }
`;

export const TextNotFound = styled.span`
  color: ${(props) => props?.theme?.colors?.black};
`;

export const ContainerCategories = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

export const ContainerCategoriesBox = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  border-bottom: solid 2px ${(props) => props?.theme?.colors?.white};

  @media (max-width: 1140px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 915px) {
    grid-template-columns: auto;
  }
`;
