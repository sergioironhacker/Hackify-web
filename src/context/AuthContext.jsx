import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { login as loginService } from "../services/AuthService";
import { getAccessToken, setAccessToken } from "../stores/AccessTokenStore";
import { getCurrentUser } from "../services/UserService";
import { useLocation } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthFetched, setIsAuthFetched] = useState(false);

  const fetchCurrentUser = useCallback(() => {
    getCurrentUser()
      .then(user => {
        setUser(user)
        setIsAuthFetched(true)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const login = useCallback((data) => {
    return loginService(data)
      .then(response => {
        // Guardo el token en el store que hemos creado para que sea accesible a los servicios
        setAccessToken(response.accessToken)
      })
      .then(() => {
        fetchCurrentUser()
      })
      .catch(err => console.error(err))
  }, [fetchCurrentUser])

  useEffect(() => {
    if (getAccessToken()) {
      fetchCurrentUser()
    } else {
      if (pathname !== '/login') {
        setIsAuthFetched(true);
      } else {
        setIsAuthFetched(false);
      }
    }
  }, [fetchCurrentUser, pathname])

  const contextValue = useMemo(() => ({
    isAuthFetched,
    user,
    login,
  }), [isAuthFetched, user, login]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
