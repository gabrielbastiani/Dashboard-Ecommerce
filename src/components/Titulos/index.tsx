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
        case 'h4':
            return (<Subtitulo>{titulo}</Subtitulo>);
        case 'h2':
            return (<TituloSecundario>{titulo}</TituloSecundario>);
        case 'h3':
            return (<TituloTerciario>{titulo}</TituloTerciario>);
        case 'h1':
            return (<TituloPrincipal>{titulo}</TituloPrincipal>);
        default:
            return (<TituloPrincipal>{titulo}</TituloPrincipal>);
    }
}

export default Titulos;