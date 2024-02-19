import axios from 'axios';
import { getAccessToken, logout } from '../stores/AccessTokenStore';

const INVALID_CODES = [401];

export const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  if (useAccessToken) {
    http.interceptors.request.use(
      (config) => {
        // Poner el token en la cabezera Authorization, con el protocolo Bearer -> Authorization: Bearer sahdkajfks.fjsldhfkjsdf.fsjdfhk
        config.headers.Authorization = `Bearer ${getAccessToken()}`
        return config;
      },
      (err) => Promise.reject(err)
    )
  }

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error?.response?.status && INVALID_CODES.includes(error.response.status)) {
        // Si tengo un error 401, probablemente movida de JWT. Borro el token y te llevo al login
        if (getAccessToken()) {
          logout();
        }
      }

      return Promise.reject(error)
    }
  )

  return http;
}