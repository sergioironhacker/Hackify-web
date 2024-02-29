import { useState, useEffect } from 'react';
import SearchBar from '../pages/SearchBar.jsx'; // Importa el componente SearchBar
import { getIdeas, buyProduct } from '../services/IdeaService.js';
import Button from '../components/Button'; // Importa el componente Button

const IdeasList = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]); // Estado para almacenar las ideas filtradas

  const handleSearch = (searchTerm) => {
    const filtered = ideas.filter((idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIdeas(filtered); // Actualiza el estado con las ideas filtradas
  };

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
        setFilteredIdeas(response); // Inicialmente muestra todas las ideas sin filtrar
      } catch (error) {
        console.error('Error al obtener las ideas:', error.message);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Ideas</h1>

      {/* Renderiza el componente SearchBar y pasa la función de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Renderiza las ideas filtradas o todas las ideas */}
      {filteredIdeas && filteredIdeas.length > 0 ? (
        <ul className="space-y-8">
          {filteredIdeas.map((idea, index) => {
            return (
              <li key={index} className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold">{idea.title}</h2>
                <p className="text-gray-600 mb-2">{idea.description}</p>
                <p className="text-gray-600 mb-2">{idea.contributionMax}€</p>
                <p className="text-gray-500 mb-4">Creado por: {idea.user.username}</p>
    
                {/* Aquí se utiliza el componente Button para el botón de contribuir */}
                <Button text="Contribuir" onClick={() => handleCheckout(idea.id)} />
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
