import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: solid 2px ${(props) => props?.theme?.colors?.white};
  border-radius: 10px;
  background-color: ${(props) => props?.theme?.colors?.black};

  @media (max-width: 797px) {
    width: 100%;
  }
`;

export const TextNotFound = styled.span`
  color: ${(props) => props?.theme?.colors?.white};
`;

export const ContainerCategories = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
`;

export const ContainerCategoriesBox = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  border-bottom: solid 2px ${(props) => props?.theme?.colors?.white};
  align-items: center;

  @media (max-width: 1295px) {
    grid-template-columns: auto auto auto;
  }

  @media (max-width: 1050px) {
    grid-template-columns: auto;
  }
`;

export const BlockSub = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextSub = styled.span`

`;

export const BlockCatSub = styled.div`
  display: flex;
`;

export const ButtonSubCat = styled.button`
  background-color: ${(props) => props?.theme?.colors?.info};
  color: ${(props) => props?.theme?.colors?.black};
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`;

export const ButtonSubCatSave = styled.button`
  background-color: ${(props) => props?.theme?.colors?.success};
  color: ${(props) => props?.theme?.colors?.black};
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`;

export const ContainerCateroiesProducts = styled.div``