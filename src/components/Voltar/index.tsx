import React from 'react';
import { Link } from 'react-router-dom';
import { Back } from './styles';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

interface VoltarRrequest {
    url: string;
}

const Voltar = ({ url }: VoltarRrequest) => {
    return (
        <Back>
            <Link to={url}><BsFillArrowLeftSquareFill />Voltar</Link>
        </Back>
    )
}

export default Voltar;