import styled from "styled-components";

export const BlockDados = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
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
