import { useState, useEffect } from 'react';
import { getIdeas, buyProduct } from '../services/IdeaService.js';
import Button from '../components/Button';

const IdeasList = () => {
  const [ideas, setIdeas] = useState([]);
  const [progress, setProgress] = useState(0); // Estado para el progreso
  const [totalAmount, setTotalAmount] = useState(0); // Estado para la cantidad total recaudada

  const handleCheckout = async (ideaId) => {
    try {
      const session = await buyProduct(ideaId);
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await getIdeas();
        setIdeas(response);
        // Calcular la cantidad total recaudada
        const total = response.reduce((acc, form) => acc + form.contributionMax, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error al obtener los formularios:', error.message);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Ideas</h1>

      {ideas && ideas.length > 0 ? (
        <ul className="space-y-8">
          {ideas.map((idea, index) => {
            return (
              <li key={index} className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold">{idea.title}</h2>
                <p className="text-gray-600 mb-2">{idea.description}</p>
                <p className="text-gray-600 mb-2">{idea.contributionMax}€</p>
                <p className="text-gray-500 mb-4">Creado por: {idea.user.username}</p>
    
                <div className="relative w-full h-4 bg-gray-200 rounded-md overflow-hidden mb-4">
                  <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Cantidad recaudada: {idea.contributionMax * (progress / 100)}€
                </div>
                <Button text="Contribuye" onClick={() => handleCheckout(idea.id)}></Button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">No hay ideas disponibles.</p>
      )}
    </div>
  );
};

export default IdeasList;
