import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getIdeas = () => {
  return http.get('/ideas');
}

export const createIdea = (formData, userId) => {
  formData.append('userId', userId);

  return http.post('/ideas/create', formData);
}

export const getIdeaDetail = (id) => http.get(`/ideas/${id}`)

export const getLatestIdeas = () => http.get('/ideas/latest');

export const editIdea = async (id, formData) => {
  const response = await http.put(`/ideas/${id}`, formData);
  return response;
}

export const deleteIdea = (id) => http.delete(`/ideas/${id}`)

export const buyProduct = (ideaId, paymentAmount) => {

  return http.post(`/ideas/${ideaId}/checkout`, { paymentAmount });
}

export const createContribution = async (ideaId, amount) => {
  const response = await http.post(`/ideas/${ideaId}/contributions/${amount}`);

  return response;
}
export const getCategories = () => http.get('/categories');




// contribuciones para la home 
export const getTotalContributions = async () => {
  try {
    const response = await http.get('/ideas/total-contributions');
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error al obtener el total de contribuciones:", error.message);
    throw error;
  }
};