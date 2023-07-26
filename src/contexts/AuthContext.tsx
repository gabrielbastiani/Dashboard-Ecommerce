import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

type AuthContextData = {
    admin: AdminProps;
    isAuthenticated: boolean;
    signInAdmin: (credentials: SignInProps) => Promise<void>;
    signOut(): void;
}

type AdminProps = {
    id: string;
    name: string;
    email: string;
    role: string;
    store_id: string;
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
        destroyCookie(undefined, '@storebuilder.token');
        toast.success('Usuario deslogado com sucesso!');
        console.log('Usuario deslogado com sucesso!');
    } catch {
        toast.error('Erro ao deslogar!');
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [admin, setAdmin] = useState<AdminProps>()
    const isAuthenticated = !!admin;

    useEffect(() => {

        const { '@storebuilder.token': token } = parseCookies();

        if (token) {
            api.get('/admin/me').then(response => {
                const { id, name, email, role, store_id } = response.data;

                setAdmin({
                    id,
                    name,
                    email,
                    role,
                    store_id
                })

            })

        }

    }, [])

    async function signInAdmin({ email, password }: SignInProps) {
        try {
            const response = await api.post('/admin/session', {
                email,
                password
            });

            const { id, name, store_id, role, token } = response.data;

            setCookie(undefined, '@storebuilder.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
                path: "/" // Quais caminhos terao acesso ao cookie
            });

            setAdmin({
                id,
                name,
                email,
                role,
                store_id
            });

            //Passar para proximas requisiçoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!');

        } catch (err) {
            toast.error("Erro ao acessar, confirmou seu cadastro em seu email?");
            /* @ts-ignore */
            toast.error(`${err.response.data.error}`);
            console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err);
        }
    }

    return (/* @ts-ignore */
        <AuthContext.Provider value={{ admin, isAuthenticated, signInAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}