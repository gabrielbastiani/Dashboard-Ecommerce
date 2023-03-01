import styled from "styled-components";

export const BlockMobile = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const ContainerVariacao = styled.section`
  display: flex;
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