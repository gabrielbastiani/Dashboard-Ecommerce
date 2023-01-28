import styled from "styled-components";

export const ContainerCenter = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props?.theme?.colors?.primary};
`;

export const LogImg = styled.img`
  height: 150px;
  width: 440px;
`;

export const ContLogin = styled.div`
  margin-top: 2rem;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 1.5rem;

  @media (max-width: 620px) {
    width: 90%;
  }
`;

export const Formulario = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const Recaptcha = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 20px;
`;

export const TextLink = styled.p`
   color: ${(props) => props?.theme?.colors?.white};
   margin-bottom: 10px;
`;

export const TextH1 = styled.h1`
  color: ${(props) => props?.theme?.colors?.white};
  text-align: center;
`;

export const TextTitle = styled.h2`
  color: ${(props) => props?.theme?.colors?.white};
  text-align: center;
`;