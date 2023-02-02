import { FormEvent, useState } from 'react';
import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
import logoLoginBlack from '../../assets/LogoBuilderBlack.png';
import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/theme';
import { ContLogin, ContainerCenter, Formulario, LogImg, TextLink } from '../LoginAdmin/styles';


const Recover: React.FC = () => {

    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { theme } = useTheme();


    async function handleRecovery(event: FormEvent) {
        event.preventDefault();
        try {
            // eslint-disable-next-line eqeqeq
            if (newPassword != password) {
                toast.error('Senhas diferentes')

                return;
            }

            // AJUSTAR PARAMETRO PARA PEGAR DA QUERY
            const recovery_id = router.query.recovery_id

            const apiClient = setupAPIClient()

            await apiClient.put(`/recover?recovery_id=${recovery_id}`, { password })

            toast.success('Senha atualizada com sucesso.');

            navigate('/loginAdmin');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao atualizar a sua senha')
        }

    }


    return (
        <ContainerCenter>
            {theme?.title === 'dark' && (
                <LogImg src={logoLoginWhite} alt="Logo Builder Seu Negócio Online" />
            )}

            {theme?.title === 'light' && (
                <LogImg src={logoLoginBlack} alt="Logo Builder Seu Negócio Online" />
            )}

            <ContLogin>
                <Formulario onSubmit={handleRecovery}>

                    <Input
                        placeholder='Digite nova senha'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Input
                        placeholder='Repetir a nova senha'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                    >
                        Alterar senha
                    </Button>

                </Formulario>

                <a href="/signupAdmin">
                    <TextLink>Não possui uma conta? Cadastre-se</TextLink>
                </a>

                <a href="/loginAdmin">
                    <TextLink>Já possui uma conta? Faça login!</TextLink>
                </a>

                <a href="https://lojavirtual.builderseunegocioonline.com.br">
                    <TextLink>Ir para o Loja Virtual</TextLink>
                </a>

            </ContLogin>
        </ContainerCenter>
    )
}

export default Recover;