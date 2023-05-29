import styled from "styled-components";

export const FormUpdateImage = styled.form``;

export const EtiquetaTextImagem = styled.label`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.warning};
  }
`;

export const IconSpanTextImage = styled.span`
  z-index: 1;
  opacity: 0.7;
  transition: all 0.9s;

  svg {
    
  }
`;

export const TextPhoto = styled.span`
  color: ${(props) => props.theme.colors.white};
`;

export const InputLogoTextImagem = styled.input`
  display: none;
`;

export const PreviewTextImagem = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
`;

export const ImageTextPhoto = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;