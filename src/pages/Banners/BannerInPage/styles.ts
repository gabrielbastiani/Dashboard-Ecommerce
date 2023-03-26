import styled from "styled-components";

export const Container = styled.div`
  grid-area: CT;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};

  padding: 25px;

  height: calc(100vh - 70px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 615px) {
    flex-direction: column;
  }
`;

export const TotalBoxItems = styled.div`
  margin: 15px 5px;
`;

export const TextTotal = styled.span`
  font-size: 12px;
  letter-spacing: 1px;
`;

export const ContainerCategoryPage = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Previus = styled.div`
  align-self: center;
`;

export const ButtonPage = styled.button`
  margin: 0 15px;
  padding: 5px 10px;
  height: 30px;
  border: 0;
  background-color: ${(props) => props.theme.colors.info};
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

export const TextPage = styled.span`
  margin: 0 10px;
  padding: 12px 10px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.info};
    border-radius: 0.3rem;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.info};
    border-radius: 0.3rem;
  }
`;

export const Next = styled.div`
  align-self: center;
`;

export const NameCategory = styled.span`
  letter-spacing: 1px;
`;

export const ContainerCategorys = styled.div`
  display: flex;
`;

export const AddButton = styled.button`
  background-color: green;
  padding: 5px 12px;
  margin: 35px 0;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  align-items: center;

  svg {
    color: ${(props) => props.theme.colors.white};
    align-self: center;
    margin-left: -5px;
    margin-right: 5px;
    font-size: 17px;
  }
`;

export const SpanText = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: 0.5px;
`;

export const Etiqueta = styled.label`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.1rem;
  margin: 0 10px 10px 0;
`;

export const Block = styled.div`
  display: grid;
  width: 60%;

  @media (max-width: 670px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const BlockTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 440px) {
    flex-direction: column;
  }
`;

export const SectionTop = styled.div`
  display: flex;
  margin-bottom: -25px;

  @media (max-width: 670px) {
    flex-direction: column;
    width: 60%;
  }
`;

export const BlockSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 670px) {
    margin-top: 15px;
  }
`;

export const ImgBanner = styled.img`
  width: 220px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
`






export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  padding: 10px;
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
      grid-template-columns: 200px 200px;
      grid-gap: unset;
      padding: unset;
    }

    @media (max-width: 1225px) {
      grid-template-columns: 200px;
      justify-content: center;
    }
}
`;

export const ClickBanner = styled.span`
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

export const EtiquetaBannerInsert = styled.label`
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
    margin: -285px 0;
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

export const InputBanner = styled.input`
  display: none;
`;

export const BannerPreview = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const PhotoProductImg = styled.img`
  width: 170px;
  height: 140px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const FormBanner = styled.form``;