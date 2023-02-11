import styled from "styled-components";

export const Back = styled.div`
  margin: 0 15px 43px 0;

  a {
    color: ${(props) => props.theme.colors.white};
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 1.5rem;
    margin: 0 10px 0 0;
  }
`;