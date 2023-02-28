import styled from "styled-components";

export const EtiquetaPhotoProduct = styled.label`
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.warning};
  }
`;

export const IconSpan = styled.span`
  z-index: 1;
  opacity: 0.7;
  transition: all 0.9s;

  svg {
    margin: -55px 0;
  }

  @media (max-width: 870px) {
    margin-left: 84px;
  }
`;

export const InputLogo = styled.input`
  display: none;
`;

export const PhotoProductPreview = styled.img`
  width: 170px;
  height: 80px;
  margin-bottom: 20px;
`;

export const PhotoProductImg = styled.img`
  width: 170px;
  height: 80px;

  @media (max-width: 870px) {
    margin-left: 84px;
  }
`;

export const FormPhotoProduct = styled.form`
    
`;