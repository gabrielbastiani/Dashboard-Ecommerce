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
   handleSubmit: (param?:any, param2?:any)=> void;
}


export function InputUpdate({ dado, handleSubmit, ...rest }: InputProps) {

   const [showElement, setShowElement] = useState(false);
   
   const showOrHide = () => {
      setShowElement(!showElement)
   }

   function handle () {
      handleSubmit();
      showOrHide();
   }

   return (
      <>
         {showElement ?
            <EditBox>
               <InputText {...rest}></InputText>
               <ButtonConfirm type="submit" onClick={handle}><GiConfirmed /></ButtonConfirm>
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