import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getForms = () => {
  return http.get('/forms');
}

export const createForm = (formData, userId) => {
  // Agregar el ID del usuario que ha creado el formulario a los datos del formulario
  const formDataWithUser = { ...formData, userId };
  
  return http.post('/createform', formDataWithUser);
}




export const buyProduct = (product) => http.post('/forms/checkout', product);