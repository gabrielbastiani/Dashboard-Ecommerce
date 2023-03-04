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

export const RenderNo = styled.span`
  
`;

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