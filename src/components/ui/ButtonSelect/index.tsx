import React, { useState } from 'react';
import {
    BoxSelect,
    DisponivelData,
    IndisponivelData,
    ValueText
} from './styles';
import { FaTimesCircle } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';

interface SelectRequest {
    dado: string;
    handleSubmit: (param?:any, param2?:any)=> void;
}

export function ButtonSelect({ dado, handleSubmit }: SelectRequest) {

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
                <BoxSelect>
                    <ValueText>{dado}</ValueText>
                    <IndisponivelData type="submit" onClick={handle}><FaTimesCircle /></IndisponivelData>
                </BoxSelect>
             : 
                <BoxSelect>
                    <ValueText>{dado}</ValueText>
                    <DisponivelData type="submit" onClick={handle}><GiConfirmed /></DisponivelData>
                </BoxSelect>
            }
        </>
    )
}