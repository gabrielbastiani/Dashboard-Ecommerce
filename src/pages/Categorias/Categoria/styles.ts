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

export const ImagensCategoryPreviewUrl = styled.img`
  width: 50%;
  height: 350px;
  margin-bottom: 20px;
  object-fit: contain;
`;

export const ImagensCategoryUpload = styled.img`
  width: 50%;
  height: auto;
  object-fit: contain;
`;

export const IconSpanCatgoryImagens = styled.span`
  z-index: 1;
  opacity: 0.7;
  transition: all 0.9s;

  svg {
    margin: -185px 0;
  }
`;