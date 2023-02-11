import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { InputText, AreaText } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function InputPost({...rest}: InputProps){
   return(
      <InputText {...rest}></InputText>
   )
}

export function TextAreaPost({...rest}: TextAreaProps){
   return(
      <AreaText {...rest}></AreaText>
   )
}