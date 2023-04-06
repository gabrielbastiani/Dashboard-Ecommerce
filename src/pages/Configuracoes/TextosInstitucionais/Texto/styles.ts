import styled from "styled-components";

export const AreaTexto = styled.textarea`
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 15px;
  width: 1180px;
  height: 400px;
  border: solid 2px ${(props) => props.theme.colors.info};
  border-radius: 10px;

  @media (max-width: 1544px) {
    width: 1000px;
  }

  @media (max-width: 1371px) {
    width: 800px;
  }

  @media (max-width: 1171px) {
    width: 600px;
  }

  @media (max-width: 968px) {
    width: 400px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: auto;
  }

  @media (max-width: 593px) {
    width: 400px;
  }

  @media (max-width: 552px) {
    width: 300px;
  }

  @media (max-width: 445px) {
    width: 250px;
  }
`;

export const BlockImagem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const EtiquetaImagem = styled.label`
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

export const IconSpanImage = styled.span`
  z-index: 1;
  opacity: 0.7;
  transition: all 0.9s;

  svg {
    margin: auto 0;
  }
`;

export const InputLogoImagem = styled.input`
  display: none;
`;

export const PreviewImagem = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: contain;
`;

export const ImagemTextoInsti = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const TextImg = styled.span`
  text-align: center;
  font-size: 13px;
  padding-top: 8px;
`;

export const ImgTextos = styled.img`
  width: 170px;
  height: 80px;
  object-fit: contain;
`