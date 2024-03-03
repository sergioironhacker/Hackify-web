import {createHttp} from "./BaseService";

const http = createHttp(true);

export const createMessage = (id, body) => http.post(`/message/create/${id}`, body);

export const updateMessages = (id, status) => http.patch(`/message/read/${id}`, status);