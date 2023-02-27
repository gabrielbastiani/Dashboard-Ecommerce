import { useState } from 'react'
import {
   SelectItemUpdate,
   ButtonUpdate,
   ValueText,
   ButtonExit,
   ButtonConfirm,
   EditBox,
   OptionsUpdate
} from './styles';
import { FaEdit, FaTimesCircle } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';


interface SelectUpdateProps {
   dado: any;
   handleSubmit: (param?: any, param2?: any) => void;
   value: any;
   opcoes: any;
   onChange: () => void;
}


const SelectUpdate = ({ value, opcoes, onChange, dado, handleSubmit }: SelectUpdateProps) => {

   const [showElement, setShowElement] = useState(false);

   const showOrHide = () => {
      setShowElement(!showElement)
   }

   function handle() {
      handleSubmit();
      showOrHide();
   }

   return (
      <>
         {showElement ?
            <EditBox>
               <SelectItemUpdate value={value} onChange={onChange}>
                  {
                     opcoes.map((opcao: any, idx: any) => (
                        <OptionsUpdate key={opcao.value} value={opcao.value}>{opcao.label}</OptionsUpdate>
                     ))
                  }
               </SelectItemUpdate>
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

export default SelectUpdate;