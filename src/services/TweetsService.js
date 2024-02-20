import { createHttp } from "./BaseService";

const http = createHttp(true);

export const getTimeline = (page) => {
  return http.get(`/tweets/timeline/${page}`)
}

export const createTweet = (text) => {
  return http.post('/tweets', { content: text })
}