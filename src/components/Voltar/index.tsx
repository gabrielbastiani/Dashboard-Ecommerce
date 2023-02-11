import React from 'react';
import { LinkBack } from './styles';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

interface VoltarRrequest {
    url: string;
}

const Voltar = ({ url }: VoltarRrequest) => {
    return (
        
        <LinkBack href={url}><BsFillArrowLeftSquareFill />Voltar</LinkBack>
        
    )
}

export default Voltar;