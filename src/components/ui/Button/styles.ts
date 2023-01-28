import styled from 'styled-components';

export const ButtonTheme = styled.button`
   max-width: 600px;
   background-color: ${props => props.theme.colors.warning};
   border: 0;
   padding: 0.8rem;
   color: ${props => props.theme.colors.white};
   border-radius: 0.5rem;
   transition: filter 0.2s;
   cursor: pointer;
   max-width: 100%;

   &[disabled]{
      cursor: not-allowed;
      svg{
         animation: animate 2s infinite;
      }
   }

   &:hover{
      filter: brightness(1.08);
   }

   @keyframes animate{
   from{
      transform: rotate(0deg);
   }
   to{
      transform: rotate(360deg);
   }
}

`;

export const TextButton = styled.a`
   color: ${props => props.theme.colors.white};
   font-size: 15px;
   font-weight: 900;
`;