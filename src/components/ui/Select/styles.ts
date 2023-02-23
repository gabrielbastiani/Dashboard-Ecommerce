import styled from "styled-components";

export const SelectItem = styled.select`
  height: 25px;
  border-radius: 0.3rem;
  margin-bottom: 30px;
  border: 1px solid ${(props) => props.theme.colors.info};
  padding: 0 0.5rem;
  text-align: center;
  border-radius: 10px;
  font-size: 11px;
`;

export const Options = styled.option`
  font-size: 13px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
`;