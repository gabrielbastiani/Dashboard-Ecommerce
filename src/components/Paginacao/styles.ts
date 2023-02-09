import styled from "styled-components";

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 615px) {
    flex-direction: column;
  }
`;

export const TotalCategorys = styled.div`
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