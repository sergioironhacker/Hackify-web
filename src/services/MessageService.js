import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; 

const messageService = {
  // Enviar un mensaje
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(`${BASE_URL}/messages/send`, messageData);
      console.log('Mensaje enviado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw error; 
    }
  },

  // Obtener mensajes enviados por el usuario actual 
  getSentMessages: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/messages/sent/${userId}`);
      console.log('Mensajes enviados obtenidos exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener mensajes enviados:', error);
      throw error;
    }
  },

  // Obtener mensajes recibidos por el usuario actual
  getReceivedMessages: async (userId) => {
    try {
    
      const response = await axios.get(`${BASE_URL}/messages/received/${userId}`);
      console.log('Mensajes recibidos obtenidos exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener mensajes recibidos:', error);
      throw error;
    }
  },

  // Otras funciones para obtener detalles de un mensaje, marcar un mensaje como leído, eliminar un mensaje, etc.
};

export default messageService;
