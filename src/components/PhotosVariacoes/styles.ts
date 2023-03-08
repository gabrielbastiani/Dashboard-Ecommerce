import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  padding: 5px;
  border-collapse: collapse;
  height: 350px;
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props?.theme?.colors?.info};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${(props) => props?.theme?.colors?.tertiary};
        border-radius: 10px;
    }
  
    @media (max-width: 1532px) {
      grid-template-columns: 200px;
      grid-gap: unset;
      padding: unset;
    }

    @media (max-width: 1225px) {
      justify-content: center;
    }
}
`;

export const ClickPhoto = styled.span`
  width: 170px;
  height: 120px;
  text-align: center;
`;

export const BlockButton = styled.div`
  margin-top: 10px;
`;

export const PhotoBlockImg = styled.img`
  width: 170px;
  height: 120px;
`;

export const EtiquetaPhotoProductInsert = styled.label`
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
    margin: -85px 0;
  }

  @media (max-width: 870px) {
    margin-left: 84px;
  }
`;

export const IconButton = styled.button`
  opacity: 0.7;
  transition: all 0.9s;
  background: transparent;

  svg {
    margin: -85px 0;
  }

  @media (max-width: 870px) {
    margin-left: 84px;

    svg {
      margin-right: 74px;
    }
  }
`;

export const InputLogo = styled.input`
  display: none;
`;

export const PhotoProductPreview = styled.img`
  width: 170px;
  height: 140px;
  object-fit: cover;
`;

export const PhotoProductImg = styled.img`
  width: 170px;
  height: 140px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const FormPhotoVariante = styled.form``;
