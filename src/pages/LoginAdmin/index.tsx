import { useContext, useState, useRef, FormEvent } from 'react';
import logoLoginWhite from '../../assets/LogoBuilderWhite.png';
import logoLoginBlack from '../../assets/LogoBuilderBlack.png';
import { Button } from '../../components/ui/Button/index';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import {
	ContLogin,
	ContainerCenter,
	Recaptcha,
	Formulario,
	TextLink,
	LogImg
} from './styles';
import { Input } from '../../components/ui/Input';
import { useTheme } from '../../contexts/theme';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginAdmin: React.FC = () => {

	const { signInAdmin } = useContext(AuthContext);
	const { theme } = useTheme();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [userValid, setUserValid] = useState<boolean>(false);
	const captcha = useRef();
	const navigate = useNavigate();


	async function handleLogin(event: FormEvent) {
		event.preventDefault();
		try {
			/* @ts-ignore */
			if (captcha.current.getValue()) {
				console.log('Administrador válido!');
				setUserValid(true);
			} else {
				console.log('Por favor, acerte o recaptcha!');
				toast.error('Por favor, acerte o recaptcha!');

				return;
			}
			/* @ts-ignore */
			if (email === '' || password === '') {
				toast.warning('Preencha os campos! (Email e Senha)')
				return;
			}

			setLoading(true);
			
			let data = {
				email,
				password
			};

			/* @ts-ignore */
			await signInAdmin(data);

			setLoading(false);

			navigate('/');

		} catch (error) {
			console.log("Erro ao logar");
		}

	}

	const onChange = () => {/* @ts-ignore */
		if (captcha.current?.getValue()) {
			console.log('Administrador não é um robo!');
		}
	};

	return (
		<ContainerCenter>

			{theme?.title === 'dark' && (
				<LogImg src={logoLoginWhite} alt="Logo Builder Seu Negócio Online" />
			)}

			{theme?.title === 'light' && (
				<LogImg src={logoLoginBlack} alt="Logo Builder Seu Negócio Online" />
			)}

			<ContLogin>
				<Formulario onSubmit={handleLogin}>
					<Input
						placeholder='Digite seu email'
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						placeholder='Digite sua senha'
						type='password'
						/* @ts-ignore */
						value={password}
						/* @ts-ignore */
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Recaptcha>
						<ReCAPTCHA
							/* @ts-ignore */
							ref={captcha}
							sitekey="6Lc8Hu8hAAAAAB4EHDuIsWxMk9Hfn5Wigm-RpdoB"
							onChange={onChange}
						/>
					</Recaptcha>

					<Button
						type="submit"
						loading={loading}
					>
						Acessar
					</Button>

				</Formulario>

				<a href="/signupAdmin">
					<TextLink>Não possui uma conta? Cadastre-se</TextLink>
				</a>

				<a href="/recoveryPasswordAdmin">
					<TextLink>Esqueceu sua senha?</TextLink>
				</a>

				<a href="https://lojavirtual.builderseunegocioonline.com.br">
					<TextLink>Ir para o Loja Virtual</TextLink>
				</a>

			</ContLogin>
		</ContainerCenter>
	)
}

export default LoginAdmin;