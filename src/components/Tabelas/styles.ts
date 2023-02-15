import styled from "styled-components";

export const TabelasSimples = styled.div``;

export const Simples = styled.table`
  margin-bottom: 50px;
  border-collapse: collapse;

  @media (max-width: 815px) {
    display: none;
  }
`;

export const Cabeca = styled.thead`
  @media (max-width: 815px) {
    display: none;
  }
`;

export const Linha = styled.tr`
  @media (max-width: 815px) {
    display: none;
  }
`;

export const Celula = styled.th`
  background-color: ${(props) => props.theme.colors.info};
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  &:nth-child(1) {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media (max-width: 815px) {
    display: none;
  }
`;

export const BodyTable = styled.tbody`
  @media (max-width: 815px) {
    display: none;
  }
`;

export const CelulaLinha = styled.td`
  padding: 10px;
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
  text-align: center;
  letter-spacing: 0.7px;

  @media (max-width: 815px) {
    display: none;
  }
`;

export const CelulaLinha1 = styled.td`
  @media (max-width: 815px) {
    display: none;
  }
`;

export const ButtonDangerSmall = styled.button`
  font-size: 0.8rem;
  padding: 8px 15px;
  margin: 5px;
  border: 1px solid;
  background-color: ${(props) => props.theme.colors.info};
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 815px) {
    display: none;
  }
`;

//-------------------RESPONSIVE TABLE---------------------//

export const TableResponsive = styled.table`
  display: none;

  @media (max-width: 815px) {
    display: block;
    display: flex;
    margin-bottom: 25px;
  }
`;

export const CabecaLinhaResponsive = styled.tr`
  display: none;

  @media (max-width: 815px) {
    display: block;
  }
`;

export const CabecaResposive = styled.thead`
  display: none;

  @media (max-width: 815px) {
    display: block;
    width: 25%;
  }
`;

export const LinhaResponsive = styled.tr`
  display: none;

  @media (max-width: 815px) {
    display: block;
    display: inline-block;
    margin-right: 8px;
  }
`;

export const CelulaResponsive = styled.th`
  display: none;

  @media (max-width: 815px) {
    display: block;
    width: 100%;
    margin-right: 20px;
    display: inline-block;
    background-color: ${(props) => props.theme.colors.info};
    padding: 10px 0;
    color: ${(props) => props.theme.colors.white};

    &:nth-child(1) {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;

export const BodyTableResponsive = styled.tbody`
  display: none;

  @media (max-width: 815px) {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    display: inline-block;
    text-align: center;
  }
`;

export const CelulaLinhaResponsive = styled.td`
  display: none;

  @media (max-width: 815px) {
    display: block;
    padding: 10px 0;
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CelulaLinha1Responsive = styled.td`
  display: none;

  @media (max-width: 815px) {
    display: block;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
`;

export const ButtonDangerSmallResponsive = styled.button`
  display: none;

  @media (max-width: 815px) {
    display: block;

    font-size: 0.7rem;
    padding: 5px 12px;
    margin: 5px;
    border: 1px solid;
    background-color: ${(props) => props.theme.colors.info};
    cursor: pointer;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
  }
`;