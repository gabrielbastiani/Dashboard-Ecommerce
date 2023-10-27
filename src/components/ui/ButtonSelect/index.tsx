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
    handleSubmit: (param?: any, param2?: any) => void;
    showElement: string;
}

export function ButtonSelect({ showElement, dado, handleSubmit }: SelectRequest) {

    function handle() {
        handleSubmit();
    }

    const status1 = "Indisponivel";
    const status2 = "Nao";

    return (
        <>
            {showElement === status1 || showElement === status2 ?
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