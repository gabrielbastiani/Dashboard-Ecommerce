import styled from "styled-components";

/**
 * Layout
 * MH = Main Header
 * AS = Aside
 * CT = Content
 */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 70px auto;

  grid-template-areas:
    "AS MH"
    "AS CT";

  height: 100vh;
  min-width: 315px;

  @media (max-width: 600px) {
    grid-template-columns: 100%;
    grid-template-rows: 70px auto;

    grid-template-areas:
      "MH"
      "CT";
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BoxFilterData = styled.div``;

export const InputData = styled.input`
  margin: 8px;
  padding: 5px;
  background-color: ${(props) => props?.theme?.colors?.white};
  color: ${(props) => props?.theme?.colors?.black};
`;

export const ButtonFilterData = styled.button`
  padding: 5px;
  background-color: ${(props) => props?.theme?.colors?.warning};
  color: ${(props) => props?.theme?.colors?.white};
`;
