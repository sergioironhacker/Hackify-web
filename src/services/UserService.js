import { createHttp } from "./BaseService";

const http = createHttp(true)

export const getCurrentUser = () => {
  return http.get('/users/me')
}

export const getUser = (id) => {
  return http.get(`/users/${id}`)
}

export const getUserTweets = (id) => {
  return http.get(`/tweets/${id}`)
}

export const toggleLike = (tweetOwner, tweet) => {
  return http.post(`/likes/${tweetOwner}/${tweet}`)
}