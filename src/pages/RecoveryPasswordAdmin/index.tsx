import { FormEvent, useState, useRef } from 'react'
import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
import logoLoginBlack from '../../assets/LogoBuilderBlack.png';
import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { setupAPIClient } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/theme';
import { ContLogin, ContainerCenter, Formulario, LogImg, Recaptcha, TextLink } from '../LoginAdmin/styles';


const RecoveryPasswordAdmin: React.FC = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [userValid, setUserValid] = useState(false);
    const captcha = useRef(null);
    const navigate = useNavigate();
    const { theme } = useTheme();


    async function handleRecovery(event: FormEvent) {
        event.preventDefault();
        try {/* @ts-ignore */
            if (captcha.current.getValue()) {
                console.log('Administrador válido!')
                setUserValid(true)
            } else {
                console.log('Por favor, acerte o recaptcha!')
                toast.error('Por favor, acerte o recaptcha!')

                return;
            }

            if (email === '') {
                toast.warning('Digite seu e-mail!')
                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();
            await apiClient.post('/admin/recoverPasswordEmail', {
                email: email
            });

            toast.success('Verifique sua caixa de e-mail');
            toast.warning('NÃO DEIXE DE VERIFICAR O SPAN OU LIXEIRA!!!');

            setLoading(false);

            navigate('/loginAdmin');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao enviar e-mail!');
        }

    }

    const onChange = () => {/* @ts-ignore */
        if (captcha.current.getValue()) {
            console.log('Administrador não é um robo!')
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
                        placeholder='Digite seu email cadastrado'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Recaptcha>
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                            onChange={onChange}
                        />
                    </Recaptcha>

                    {!userValid &&
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Enviar solicitação
                        </Button>
                    }
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

export default RecoveryPasswordAdmin;