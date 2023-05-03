import {
    Subtitulo,
    TituloTerciario,
    TituloPrincipal,
    TituloQuarto
} from './styles';

interface TituloRequest {
    tipo: string;
    titulo: any;
}

const Titulos = ({ tipo, titulo }: TituloRequest) => {
    switch (tipo) {
        case 'h2':
            return (<Subtitulo>{titulo}</Subtitulo>);
        case 'h3':
            return (<TituloTerciario>{titulo}</TituloTerciario>);
        case 'h4':
            return (<TituloQuarto>{titulo}</TituloQuarto>);
        case 'h1':
            return (<TituloPrincipal>{titulo}</TituloPrincipal>);
        default:
            return (<TituloPrincipal>{titulo}</TituloPrincipal>);
    }
}

export default Titulos;