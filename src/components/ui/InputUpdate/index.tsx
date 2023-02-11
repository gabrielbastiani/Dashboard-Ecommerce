import { InputHTMLAttributes, useState } from 'react'
import {
   InputText,
   ButtonUpdate,
   ValueText,
   ButtonExit,
   ButtonConfirm,
   EditBox,
} from './styles';
import { FaEdit, FaTimesCircle } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   dado: any;
   onSubmit: (param?:any, param2?:any)=> void
}


export function InputUpdate({ dado, onSubmit, ...rest }: InputProps) {

   const [showElement, setShowElement] = useState(false);
   
   const showOrHide = () => {
      setShowElement(!showElement)
   }

   return (
      <>
         {showElement ?
            <EditBox onSubmit={onSubmit}>
               <InputText {...rest}></InputText>
               <ButtonConfirm type="submit"><GiConfirmed /></ButtonConfirm>
               <ButtonExit onClick={showOrHide}><FaTimesCircle /></ButtonExit>
            </EditBox>
            :
            <EditBox>
               <ValueText>{dado}</ValueText>
               <ButtonUpdate onClick={showOrHide}><FaEdit /></ButtonUpdate>
            </EditBox>
         }
      </>

   )
}