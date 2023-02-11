import styled from "styled-components";

export const LinkBack = styled.a`
  margin: 0 15px 43px 0;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  width: 8%;

  @media (max-width: 1285px) {
    width: 15%;;
  }

  @media (max-width: 1133px) {
    width: 18%;
  }

  @media (max-width: 795px) {
    width: 50%;
  }

  svg {
    font-size: 1.5rem;
    margin: 0 10px 0 0;
  }
`;
