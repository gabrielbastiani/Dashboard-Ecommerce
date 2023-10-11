import styled from "styled-components";

export const SectionOrder = styled.section`
  background-color: ${(props) => props?.theme?.colors?.secondary};
  height: 100%;
`;

export const StatusTop = styled.button`
  cursor: none;
  padding: 10px;
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  margin-right: 20px;
  width: 200px;
`;

export const BoxTopStatusGeral = styled.div`
  display: inline-flex;
`;

export const TotalFrete = styled.button`
  background-color: ${(props) => props?.theme?.colors?.white};
  color: ${(props) => props?.theme?.colors?.black};
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  cursor: none;
  margin-right: 20px;
  width: 30%;
`;

export const TotalTop = styled.button`
  background-color: ${(props) => props?.theme?.colors?.white};
  color: ${(props) => props?.theme?.colors?.black};
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-weight: 700;
  border: none;
  cursor: none;
  width: 200px;

  svg {
    margin-right: 5px;
    color: ${(props) => props?.theme?.colors?.black};
  }
`;

export const ImagePay = styled.img`
  width: 60px;
  height: 80%;
`;

export const GridOrder = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 10px;
`;

export const Linked = styled.a`
  
`

export const WhatsButton = styled.button`
  background-color: green;
  border: none;
  color: white;
  padding: 8px;
  width: 100px;
  margin-top: 15px;
`