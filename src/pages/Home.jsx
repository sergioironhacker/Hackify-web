import { useState, useEffect } from "react";
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas, getTotalContributions } from "../services/IdeaService.js";
import AboutUsLogo from "../assets/AboutUsLogo.jsx";

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await getIdeas();
        const sortedIdeas = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setIdeas(sortedIdeas);
        setFilteredIdeas(sortedIdeas);
      } catch (error) {
        console.error("Error al obtener las ideas:", error.message);
      }
    };

    fetchIdeas();
  }, []);


  useEffect(() => {
    const fetchTotalContributions = async () => {
      try {
        const total = await getTotalContributions();
        setTotalContributions(total.totalContributions);
      } catch (error) {
        console.error("Error al obtener el total de contribuciones:", error.message);
      }
    };

    fetchTotalContributions();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="flex justify-center text-2xl font-bold text-green-400 mb-4">Hackify <AboutUsLogo /></h1>
      <div className="flex justify-center mb-4 text-center text-green-400 text-2xl font-bold">Haz realidad tus proyectos</div>
      <div className="max-w-sm mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center"><br />Dinero recaudado:<br /><span className="text-green-400 text-4xl font-bold">{totalContributions}€</span></div>
          <div className="text-center"><span className="text-green-400 text-4xl font-bold">{ideas.length}</span> <br /> proyectos en busca de financiación</div>
        </div>
      </div>

      {filteredIdeas && filteredIdeas.length > 0 ? (
        <div className="mt-8">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="max-w-sm mx-auto mb-4">
              <IdeaCard {...idea} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-8">No hay ideas disponibles.</p>
      )}
    </div>
  );
};

export default Home;
