import {
    Subtitulo,
    TituloSecundario,
    TituloTerciario,
    TituloPrincipal
} from './styles';

interface TituloRequest {
    tipo: string;
    titulo: any;
}

const Titulos = ({tipo, titulo}: TituloRequest) => {
    switch (tipo) {
        case 'Subtitulo':
            return (<Subtitulo>{titulo}</Subtitulo>);
        case 'TituloSecundario':
            return (<TituloSecundario>{titulo}</TituloSecundario>);
        case 'TituloTerciario':
            return (<TituloTerciario>{titulo}</TituloTerciario>);
        case 'TituloPrincipal':
        default:
            return (<TituloPrincipal>{titulo}</TituloPrincipal>);
    }
}

export default Titulos;