import styled from "styled-components";

export const Back = styled.div`
display: flex;
align-content: center;
margin: 0 15px 43px 0;

a {
  color: ${(props) => props.theme.colors.white};
  padding: 0 8px;
}
`;