import { FaSearch } from 'react-icons/fa';
import { PesquisaBox, InputSearch, ButtonSearch } from './styles';

interface SearchRequest {
    valor: string;
    onChange(): void;
    placeholder: string;
    onClick(): void;
}

const Pesquisa = ({ valor, onChange, placeholder, onClick}: SearchRequest) => (
    <PesquisaBox>
        <InputSearch value={valor} onChange={onChange} placeholder={placeholder} />
        <ButtonSearch>
            <FaSearch onClick={onClick}/>
        </ButtonSearch>
    </PesquisaBox>
)

export default Pesquisa;