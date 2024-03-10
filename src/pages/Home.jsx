import { useState, useEffect } from "react";
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas, getTotalContributions } from "../services/IdeaService.js";
import AboutUsLogo from "../assets/AboutUsLogo.jsx";

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0); // Estado para almacenar el total de contribuciones

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await getIdeas();
        setIdeas(response);
        setFilteredIdeas(response);
      } catch (error) {
        console.error("Error al obtener las ideas:", error.message);
      }
    };

    fetchIdeas();
  }, []);

  // Función para obtener y actualizar el total de contribuciones
  const fetchTotalContributions = async () => {
    try {
      const total = await getTotalContributions();
      console.log(total); 
      setTotalContributions(total.totalContributions);
    } catch (error) {
      console.error("Error al obtener el total de contribuciones:", error.message);
    }
  };
  useEffect(() => {
    fetchTotalContributions(); 
  }, []);
  // 


  



  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="flex justify-center text-2xl font-bold text-green-400 mb-4 ">Hackify  <AboutUsLogo /> </h1>
      
      <div className="max-w-sm mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Total de Contribuciones</h2>
        <p className="text-gray-600">{totalContributions}</p>
      </div>

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
