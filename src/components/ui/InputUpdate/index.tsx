import { InputHTMLAttributes } from 'react'
import { InputText, ButtonUpdate } from './styles';
import { FaEdit } from 'react-icons/fa';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   
}


export function InputUpdate({ ...rest }: InputProps) {
   return (
      <>
         <InputText {...rest}></InputText>
         
         <ButtonUpdate
            
            type="submit"
         >
            <FaEdit />
         </ButtonUpdate>
      </>

   )
}