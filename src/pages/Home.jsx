import { useState, useEffect } from "react";
import SearchBar from "../pages/SearchBar.jsx"; // Importa el componente SearchBar
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas } from "../services/IdeaService.js";

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]); // Estado para almacenar las ideas filtradas

  const handleSearch = (searchTerm) => {
    const filtered = ideas.filter((idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIdeas(filtered); // Actualiza el estado con las ideas filtradas
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await getIdeas();
        setIdeas(response);
        setFilteredIdeas(response); // Inicialmente muestra todas las ideas sin filtrar
      } catch (error) {
        console.error("Error al obtener las ideas:", error.message);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="flex justify-center text-2xl font-bold text-tw-primary mb-4">OnlyHack</h1>

      {/* Renderiza el componente SearchBar y pasa la función de búsqueda */}
      <SearchBar onSearch={handleSearch} />
      {/* Renderiza las ideas filtradas o todas las ideas */}
      {filteredIdeas && filteredIdeas.length > 0 ? (
        <div className="space-y-8">
          {filteredIdeas.map((idea) => {
            return (
              <div key={idea.id}>
                <IdeaCard {...idea} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No hay ideas disponibles.</p>
      )}
    </div>
  );
};

export default Home;
