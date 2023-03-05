import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signInAdmin: (credentials: SignInProps) => Promise<void>;
    signOut (): void;
}

type UserProps = {
    id: string;
    nameComplete: string;
    email: string;
    loja_id: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
    try {
        destroyCookie(undefined, '@lojabuilder.token');
        toast.success('Usúario deslogado com sucesso!');
        console.log('Usúario deslogado com sucesso!');
    } catch {
        toast.error('Erro ao deslogar!');
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@lojabuilder.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { id, nameComplete, email, loja_id } = response.data;

                setUser({
                    id,
                    nameComplete,
                    email,
                    loja_id
                })

            })

        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, nameComplete, loja_id, token } = response.data;

            setCookie(undefined, '@lojabuilder.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
                path: "/" // Quais caminhos terao acesso ao cookie
              })

            setUser({
                id,
                nameComplete,
                email,
                loja_id
            })

            //Passar para proximas requisiçoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

        } catch (err) {
            toast.error("Erro ao acessar, confirmou seu cadastro em seu email?")
            console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err)
        }
    }


    async function signInAdmin({ email, password }: SignInProps) {
        try {
            const response = await api.post('/sessionAdmin', {
                email,
                password
            })

            const { id, nameComplete, loja_id, token } = response.data;

            setCookie(undefined, '@lojabuilder.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
                path: "/" // Quais caminhos terao acesso ao cookie
              })

            setUser({
                id,
                nameComplete,
                email,
                loja_id
            })

            //Passar para proximas requisiçoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

        } catch (err) {
            toast.error("Erro ao acessar, confirmou seu cadastro em seu email?")
            console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err)
        }
    }

    return (/* @ts-ignore */
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signInAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}