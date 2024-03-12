import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { login as loginService } from "../services/AuthService";
import { getAccessToken, setAccessToken } from "../stores/AccessTokenStore";
import { getCurrentUser } from "../services/UserService";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthFetched, setIsAuthFetched] = useState(false);
  const [error, setError] = useState('');

  const fetchCurrentUser = useCallback(() => {
    getCurrentUser()
      .then(user => {
        setUser(user);
        setIsAuthFetched(true);
      })
      .catch(err => {
        console.error(err);
        setIsAuthFetched(true);
      });
  }, []);

  const login = useCallback((data) => {
    return loginService(data)
      .then(response => {
        setAccessToken(response.accessToken);
        return response; // Devuelve la respuesta para que puedas manejarla en el componente de inicio de sesión
      })
      .then(() => {
        fetchCurrentUser();
      })
      .catch(err => {
        setError('Email or password incorrect');
        throw err; // Lanza una excepción para que puedas manejar el error en el componente de inicio de sesión
      });
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (getAccessToken()) {
      fetchCurrentUser();
    } else {
      if (pathname !== '/login') {
        setIsAuthFetched(true);
      } else {
        setIsAuthFetched(false);
      }
    }
  }, [fetchCurrentUser, pathname]);

  const contextValue = useMemo(() => ({
    isAuthFetched,
    user,
    login,
    error,
  }), [isAuthFetched, user, login, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
