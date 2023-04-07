import styled from "styled-components";

export const ImgInstitucional = styled.img`
  width: 210px;
  height: 100px;
  object-fit: contain;
  border-radius: 0.5rem;
`;

export const FormImagens = styled.form`

`


export const BlockImagem = styled.div`

`

export const EtiquetaImagens = styled.label`
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

export const IconSpanImagens = styled.span`
  z-index: 1;
  opacity: 0.7;
  transition: all 0.9s;

  svg {
    
  }
`;

export const InputImagens = styled.input`
  display: none;
`;

export const ImagensPreviewUrl = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
`;

export const ImagensUpload = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const TextImagens = styled.span`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`;