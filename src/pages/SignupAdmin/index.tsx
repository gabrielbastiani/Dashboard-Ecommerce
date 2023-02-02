import { useState, FormEvent, useRef } from 'react';
import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
import logoLoginBlack from '../../assets/LogoBuilderBlack.png';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/theme';
import { ContLogin, ContainerCenter, Formulario, LogImg, Recaptcha, TextH1, TextLink } from '../LoginAdmin/styles';


const SignupAdmin: React.FC = () => {

    const [nameComplete, setNameComplete] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userValid, setUserValid] = useState(false);
    const captcha = useRef(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    function isEmail(emailName: string) {
        // eslint-disable-next-line no-control-regex
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailName)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {/* @ts-ignore */
            if (captcha.current.getValue()) {
                console.log('Usuario válido!')
                setUserValid(true)
            } else {
                console.log('Por favor, acerte o recaptcha!')
                toast.error('Por favor, acerte o recaptcha!')

                return;
            }

            if (nameComplete === '' || email === '' || password === '') {
                toast.warning('Preencha todos os campos!');
                console.log("Preencha todos os campos!");
                return;
            }

            if (!isEmail(email)) {

                toast.error('Por favor digite um email valido!');

                return;
            }

            setLoading(true);

            const apiClient = setupAPIClient();

            await apiClient.post('/createAdmin', { nameComplete: nameComplete, email: email, password: password });

            toast.success('Cadastro de usuario ADMINISTRADOR feito com sucesso!')

            console.log('Cadastro de usuario ADMINISTRADOR feito com sucesso!')

            setLoading(false);

            navigate('/whaitAuthenticatedAdmin');

        } catch (err) {
            console.log(err);
            toast.error('Erro ao cadastrar!')
            navigate(0);
            console.log("Ops erro ao cadastrar!")
        }

    }

    const onChange = () => {
        /* @ts-ignore */
        if (captcha.current.getValue()) {
            console.log('Usuario não é um robo!')
        }
    }



    return (
        <ContainerCenter>

            {theme.title === 'dark' && (
                <LogImg src={logoLoginWhite} alt="Logo Builder Seu Negócio Online" />
            )}

            {theme.title === 'light' && (
                <LogImg src={logoLoginBlack} alt="Logo Builder Seu Negócio Online" />
            )}

            <ContLogin>

                <TextH1>Crie sua conta de ADMINISTRADOR</TextH1>

                <Formulario onSubmit={handleRegister}>

                    <Input
                        placeholder="Digite seu nome"
                        type="text"
                        value={nameComplete}
                        onChange={(e) => setNameComplete(e.target.value)}
                    />

                    <Input
                        placeholder="Digite seu email"
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Sua senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Recaptcha>
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
                            onChange={onChange}
                        />
                    </Recaptcha>

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Cadastrar
                    </Button>

                </Formulario>

                <a href="/loginAdmin">
                    <TextLink>Já possui uma conta? Faça login!</TextLink>
                </a>

                <a href="/recoveryPassword">
                    <TextLink>Esqueceu sua senha?</TextLink>
                </a>

                <a href="https://lojavirtual.builderseunegocioonline.com.br">
                    <TextLink>Ir para o Loja Virtual</TextLink>
                </a>

            </ContLogin>
        </ContainerCenter>
    )
}

export default SignupAdmin;