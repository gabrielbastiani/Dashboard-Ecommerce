import styled from 'styled-components';

export const InputText = styled.input`
   margin-bottom: 1rem;
   height: 40px;
   border: 0;
   background-color: transparent;
   color: ${props => props.theme.colors.white};
   padding: 1rem;
`;

export const ButtonUpdate = styled.button`
   background-color: transparent;

   svg {
      background-color: yellow;
      padding: 5px;
      font-size: 30px;
      border-radius: 15px;
      cursor: pointer;
   }
`;