import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
import logoLoginBlack from '../../assets/LogoBuilderBlack.png';
import { useTheme } from '../../contexts/theme';
import { ContLogin, ContainerCenter, LogImg, TextH1, TextLink } from '../LoginAdmin/styles';


const WhaitAuthenticatedAdmin: React.FC = () => {

    const { theme } = useTheme();

    return (
        <ContainerCenter>
            {theme.title === 'dark' && (
                <LogImg src={logoLoginWhite} alt="Logo Builder Seu Negócio Online" />
            )}

            {theme.title === 'light' && (
                <LogImg src={logoLoginBlack} alt="Logo Builder Seu Negócio Online" />
            )}
            
            <ContLogin>
                <TextH1>AGUARDE POR FAVOR!</TextH1>
                <TextLink>O super administrador vai analisar seu cadastro e assim autenticar sua conta.</TextLink>
            </ContLogin>
        </ContainerCenter>
    )
}


export default WhaitAuthenticatedAdmin;