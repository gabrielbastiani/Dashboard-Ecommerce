import styled from "styled-components";

export const BlockDados = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;

    @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;