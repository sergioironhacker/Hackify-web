import { createHttp } from "./BaseService";

const http = createHttp();

export const register = (data) => {
  return http.post('/users', data)
}

export const login = (data) => {
  return http.post('/login', data)
}