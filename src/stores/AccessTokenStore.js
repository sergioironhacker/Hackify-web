const JWT_KEY = 'accessToken';

let _accessToken = localStorage.getItem(JWT_KEY) || ''

// Fn para setear el token en el local storage y en la variable
export const setAccessToken = (token) => {
  _accessToken = token;

  localStorage.setItem(JWT_KEY, token);
}

export const getAccessToken = () => {
  return _accessToken;
}

export const logout = () => {
  localStorage.removeItem(JWT_KEY);
  window.location.assign('/login');
}