import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getIdeas = () => {
  return http.get('/ideas');
}

export const createIdea = (formData, userId) => {
  //  ID del usuario que ha creado el formulario a los datos del formulario
  formData.append('userId', userId);

  return http.post('/ideas/create', formData);
}

export const getIdeaDetail = (id) => http.get(`/ideas/${id}`)

export const getLatestIdeas = () => http.get('/ideas/latest');

export const editIdea = (id, data) => http.put(`/ideas/${id}`, data)

export const deleteIdea = (id) => http.delete(`/ideas/${id}`)

export const buyProduct = (ideaId) => {
  
  return http.post(`/ideas/${ideaId}/checkout`);
}