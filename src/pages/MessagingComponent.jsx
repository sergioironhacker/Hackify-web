import { useState, useEffect, useContext } from 'react';
import messageService from '../services/MessageService';
import AuthContext from '../contexts/AuthContext';

const MessagingComponent = () => {
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetchReceivedMessages();
    fetchSentMessages();
  }, []); // Llama a fetchReceivedMessages y fetchSentMessages cuando el componente se monta

  const fetchSentMessages = async () => {
    try {
      setIsLoading(true);
      const sentMessages = await messageService.getSentMessages(user.data._id);
      setMessages(sentMessages);
    } catch (error) {
      console.error('Error al obtener mensajes enviados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReceivedMessages = async () => {
    try {
      setIsLoading(true);
      const receivedMessages = await messageService.getReceivedMessages(user.data._id);
      setMessages(receivedMessages);
    } catch (error) {
      console.error('Error al obtener mensajes recibidos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await messageService.sendMessage({ recipient, content, sender: user.data._id});
      setRecipient('');
      setContent('');
      await fetchSentMessages(); // Actualizar los mensajes enviados después de enviar uno nuevo
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //////////////////////

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enviar Mensaje</h2>
      <form onSubmit={handleSendMessage}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Destinatario:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Contenido:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Conversaciones</h2>
      {isLoading ? (
        <p className="text-gray-600">Cargando mensajes...</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id} className="border-b border-gray-300 py-4">
              <p className="font-bold mb-1">Destinatario: {message.recipient}</p>
              <p className="mb-1">mensaje: {message.content}</p>
              <p className="text-sm text-gray-500">Fecha: {new Date(message.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagingComponent;
