import { createHttp } from "./BaseService";

const http = createHttp(true)

export const getCurrentUser = () => {
  return http.get('/users/me')
}

export const getUser = (id) => {
  return http.get(`/users/${id}`)
}
export const getCurrentUserIdeas = (userId) => {
  console.log('userId', userId)
  return http.get('/users/me/ideas');
}

export const getUserIdeas = (userId) => {
  console.log('userId', userId)
  return http.get(`/users/${userId.id}`);
}

export const deleteUserAccount = () => {
  return http.delete('/delete-account');
};

export const toggleBookmark = (ideaId) => {
  return http.post(`/bookmarks/${ideaId}`)
};

export const getUserBookmarkedIdeas = (userId) => {
  return http.get(`/bookmarks/${userId}`);
};



export const getUserContributedIdeas = async (userId) => {
  try {
    const response = await http.get(`/ideas/contributed/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contributed ideas:', error);
    throw error;
  }
};