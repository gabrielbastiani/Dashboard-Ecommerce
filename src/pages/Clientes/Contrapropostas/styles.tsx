import styled from "styled-components";

export const BlockData = styled.div`
  margin: 18px 0;
`;

export const TextStrong = styled.strong`
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => props?.theme?.colors?.white};
`;

export const TextData = styled.span`
  color: ${(props) => props?.theme?.colors?.white};
`;
