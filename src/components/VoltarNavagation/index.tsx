import { useNavigate } from 'react-router-dom';
import { ButtonBack } from './styles';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

const VoltarNavagation = () => {

    const navigate = useNavigate();
    
    return (
        <ButtonBack onClick={() => navigate(-1)}><BsFillArrowLeftSquareFill />Voltar</ButtonBack>
    )
}

export default VoltarNavagation;