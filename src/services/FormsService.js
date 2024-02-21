import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getForms = () => {
  return http.get('/forms');
}

export const createForm = (formData) => {
  return http.post('/createform', formData);
}
