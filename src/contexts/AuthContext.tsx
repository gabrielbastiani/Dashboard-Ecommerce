import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

type AuthContextData = {
    admin: AdminProps;
    isAuthenticated: boolean;
    signInAdmin: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
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

export function AuthProvider({ children }: AuthProviderProps) {

    const [cookies, setCookie, removeCookie] = useCookies(['@storebuilder.token']);
    const [cookiesId, setCookieId, removeCookieId] = useCookies(['@idAdmin']);

    const [admin, setAdmin] = useState<AdminProps>();
    const isAuthenticated = !!admin;

    async function signInAdmin({ email, password }: SignInProps) {
        try {
            const response = await api.post('/admin/session', {
                email,
                password
            });

            const { id, token } = response.data;

            setCookie('@storebuilder.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            setCookieId('@idAdmin', id, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            //Passar para proximas requisiçoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso!');

        } catch (err) {
            toast.error("Erro ao acessar, confirmou seu cadastro em seu email?");
            /* @ts-ignore */
            toast.error(`${err.response.data.error}`);
            console.log("Erro ao acessar, confirmou seu cadastro em seu email? ", err);
        }
    }

    useEffect(() => {

        let token = cookies['@storebuilder.token'];
        let adminid = cookiesId['@idAdmin'];

        if (token) {

            api.get(`/admin/me?admin_id=${adminid}`).then(response => {

                const { id, name, email, role, store_id } = response.data;

                setAdmin({
                    id,
                    name,
                    email,
                    role,
                    store_id
                })

            });

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookiesId]);

    function signOut() {
        try {
            removeCookie('@storebuilder.token', { path: '/' });
            removeCookieId('@idAdmin', { path: '/' });
            toast.success('Usuario deslogado com sucesso!');
            return redirect('/loginAdmin');
        } catch (error) {
            toast.error("OPS... Erro ao deslogar");
        }
    };



    return (/* @ts-ignore */
        <AuthContext.Provider value={{ admin, isAuthenticated, signInAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}