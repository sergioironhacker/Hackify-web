import {createHttp} from "../services/BaseService";

const http = createHttp(true);

export const createChat = (id, body) => http.post(`/chat/create/${id}`, body);

export const getChats = () => http.get('/chats');

export const getCurrentChat = (id) => http.get(`/chat/${id}`);

export const deleteChat = (id) => http.delete(`/chat/delete/${id}`);