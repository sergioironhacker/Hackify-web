import { createHttp } from "./BaseService";

const http = createHttp(true)

export const getCurrentUser = () => {
  return http.get('/users/me')
}

export const getUser = (id) => {
  return http.get(`/users/${id}`)
}
export const getUserIdeas = (userId) => {
  console.log('userId', userId)
  return http.get(`/users/${userId.id}`);
}

export const deleteUserAccount = () => {
  return http.delete('/delete-account');
};

export const toggleBookmark = (ideaOwner, idea) => {
  return http.post(`/bookmarks/${ideaOwner}/${idea}`)
}