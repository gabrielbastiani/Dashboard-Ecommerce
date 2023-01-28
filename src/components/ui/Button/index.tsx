import { ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonTheme, TextButton } from './styles';
import {FaSpinner} from 'react-icons/fa';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   loading?: boolean,
   children: ReactNode,
}

export function Button({loading, children, ...rest}: ButtonProps){
   return(
      <ButtonTheme disabled={loading} {...rest}>
            {loading ? (
               <FaSpinner color="#FFF" size={16} />
            ) : (
               <TextButton>
               {children}
               </TextButton>
            )}
      </ButtonTheme>
   )
}