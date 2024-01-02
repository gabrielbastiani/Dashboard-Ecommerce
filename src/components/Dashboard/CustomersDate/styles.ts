import styled from "styled-components";

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