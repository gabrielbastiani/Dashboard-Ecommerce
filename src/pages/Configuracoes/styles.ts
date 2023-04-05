import styled from "styled-components";

export const GridDateForm = styled.form`
  display: flex;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

export const BlockLogomarca = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const TextLogo = styled.span`
  text-align: center;
  font-size: 13px;
  padding-top: 8px;
`;

export const SectionDate = styled.div`
  width: 50%;

  @media (max-width: 860px) {
    width: 100%;

    &:nth-child(1) {
      margin-top: 38px;
    }
  }
`;

export const LogoLojaImgUrl = styled.img`
  width: 170px;
  height: 80px;
  margin-bottom: 20px;
`;

export const PreviewImageRede = styled.img`
  width: 170px;
  height: 100px;
  margin-bottom: 20px;
  object-fit: contain;
`;

export const RedeLojaImg = styled.img`
  width: 170px;
  height: 100px;
  object-fit: contain;

  @media (max-width: 870px) {
    margin-left: 84px;
  }
`;

export const LogoLojaImg = styled.img`
  width: 170px;
  height: 80px;

  @media (max-width: 870px) {
    margin-left: 84px;
  }
`;

export const FormUploadLogo = styled.form`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export const EtiquetaLogo = styled.label`
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

export const ImgRedes = styled.img`
  width: 150px;
  height: 40px;
  object-fit: contain;
  border-radius: 0.5rem;
`;