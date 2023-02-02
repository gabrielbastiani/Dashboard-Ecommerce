import styled from "styled-components";

export const ContainerCenter = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props?.theme?.colors?.white};

  @media(max-width: 700px) {
    width: 430px;
    margin: 0 40px;
  }

  @media(max-width: 550px) {
    width: 330px;
  }
`;

export const TextTitle = styled.h2`
  color: ${(props) => props?.theme?.colors?.white};
  text-align: center;
`;

export const TextLink = styled.button`
  max-width: 600px;
  background-color: ${(props) => props.theme.colors.warning};
  border: 0;
  padding: 0.8rem;
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  transition: filter 0.2s;
  max-width: 100%;
  font-size: 15px;
  font-weight: 900;
  margin: 0 40px;
`;

export const ContLogin = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  position: absolute;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  border-radius: 3%;
  padding: 50px;
  text-align: center;
`;