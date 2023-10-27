import axios, { AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { AuthTokenError } from './errors/AuthTokenError';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

function signOut() {
  try {
    let remove_cookie_user = new Cookies();
    remove_cookie_user.remove('@storebuilder.token', { path: '/' });
    toast.success('Usuario deslogado com sucesso!');
    setTimeout(() => {
      return redirect('/loginAdmin')
    }, 2500);

  } catch (error) {
    toast.error("OPS... Erro ao deslogar");
  }
};

export function setupAPIClient() {

  let cookie_user = new Cookies();
  let cookies = cookie_user.get('@storebuilder.token', undefined);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      // qualquer erro 401 (nao autorizado) devemos deslogar o usuario
      // eslint-disable-next-line valid-typeof
      if (typeof window !== undefined) {
        // Chamar a funçao para deslogar o usuario
        signOut();
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error);

  })

  return api;

}