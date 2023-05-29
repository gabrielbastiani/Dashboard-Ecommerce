import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ContLogin, ContainerCenter, TextLink, TextTitle } from './styles';


const UserAuthenticatedAdmin: React.FC = () => {

    const navigate = useNavigate();
    let { authenticated } = useParams();

    console.log(authenticated)

    async function handleAuthenticated() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.put(`/authenticated?admin_id=${authenticated}`);

            toast.success('Seu cadastro de administrador esta ativo para acessar o Dashboard.');

            navigate('/loginAdmin');

        } catch (err) {
            toast.error('Ops erro ao se autenticar seu cadastro!');
            console.log('Ops erro ao se autenticar seu cadastro!');
        }

    }


    return (
        <ContainerCenter>

            <ContLogin>

                <TextTitle>Confirme aqui, seu cadastro como administrador junto ao Loja Virtual para poder acessar!</TextTitle>

                <Button
                    onClick={() => handleAuthenticated()}
                >
                    Confirmar
                </Button>

                <a href={'/loginAdmin'}>
                    <TextLink>Cancelar</TextLink>
                </a>

            </ContLogin>

        </ContainerCenter>
    )
}

export default UserAuthenticatedAdmin;