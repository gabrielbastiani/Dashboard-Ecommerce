import styled from "styled-components";

export const BlockMobile = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const ContainerVariacao = styled.section`
  display: flex;

  @media (max-width: 1405px) {
    width: 95%;
    flex-direction: column;
  }
`;

export const ButtonVariacao = styled.button`
  background-color: ${(props) => props?.theme?.colors?.gray};
  border: 0;
  padding: 0.8rem;
  border-radius: 0.5rem;
  color: black;
  font-size: 16px;
  width: 100%;
  font-weight: 600;

  &:hover {
    filter: brightness(1.08);
  }
`;

export const RenderOk = styled.span`
  color: red;
`;

export const RenderNo = styled.span``;

export const ButtonVariacaoDetalhes = styled.button`
  background-color: #736e6e;
  border: 0;
  padding: 0.8rem;
  border-radius: 0.5rem;
  color: black;
  font-size: 16px;
  width: 100%;
  font-weight: 600;
  margin-top: 15px;

  &:hover {
    filter: brightness(1.08);
  }
`;

export const BlockCategory = styled.div`
  display: flex;
  justify-content: center;
`;

export const TextButton = styled.span`
  color: ${(props) => props?.theme?.colors?.white};
  padding: 17px;
  font-weight: 600;
  text-align: center;
`;

export const BlockCategorys = styled.div`
  margin: 50px 20px 0;
`;

export const Categ = styled.span``;

export const ButtonUpdateCategory = styled.a`
  background-color: ${(props) => props?.theme?.colors?.warning};
  color: ${(props) => props?.theme?.colors?.white};
  padding: 10px;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  width: 200px;
  margin-top: 10px;
  justify-content: center;
`;

export const GridContainer = styled.div`
  width: 400px;
  padding: 18px;
  justify-content: center;
  display: grid;
  grid-template-columns: 120px 120px;
  grid-gap: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  border: solid 2px ${(props) => props?.theme?.colors?.white};
  border-radius: 10px;
  background-color: ${(props) => props?.theme?.colors?.white};

  @media (max-width: 797px) {
    width: 300px;
  }

  @media (max-width: 688px) {
    width: 200px;
    grid-template-columns: 120px;
  }
`;

export const BoxCategory = styled.div``;

export const NameCategory = styled.span`
  color: ${(props) => props?.theme?.colors?.black};
`;

export const TextNotFound = styled.span`
  color: ${(props) => props?.theme?.colors?.black};
`;

export const ContatinerButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ContatinerDescription = styled.div`
  display: flex;
  flex-direction: column;
`;