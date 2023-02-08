import { PesquisaBox, InputSearch } from './styles';

interface SearchRequest {
    valor: string;
    onChange: () => void;
    placeholder: string;
    onClick(): void;
}

const Pesquisa = ({ valor, onChange, placeholder, onClick}: SearchRequest) => (
    <PesquisaBox>
        <InputSearch value={valor} onChange={onChange} placeholder={placeholder} onClick={onClick} />
    </PesquisaBox>
)

export default Pesquisa;