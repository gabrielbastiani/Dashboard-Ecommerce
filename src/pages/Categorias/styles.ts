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

export const SelectItem = styled.select`
  width: 11%;
  height: 25px;
  border-radius: 0.3rem;
  margin: 45px 0;
  border: 1px solid ${(props) => props.theme.colors.info};
  padding: 0 0.5rem;
  text-align: center;
  border-radius: 10px;
  font-size: 11px;
`;

export const OptionValue = styled.option`
  font-size: 13px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
`;

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