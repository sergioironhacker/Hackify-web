import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getIdeas = () => {
  return http.get('/ideas');
}

export const createIdea = (ideaData, userId) => {
  //  ID del usuario que ha creado el formulario a los datos del formulario
  const ideaDataWithUser = { ...ideaData, userId };

  return http.post('/ideas/create', ideaDataWithUser);
}




export const buyProduct = (ideaId) => {
  
  return http.post(`/ideas/checkout/${ideaId}`);
}