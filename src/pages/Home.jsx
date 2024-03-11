import { useState, useEffect } from "react";
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas, getTotalContributions } from "../services/IdeaService.js";
import AboutUsLogo from "../assets/AboutUsLogo.jsx";
import Chart from "chart.js/auto";

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

  useEffect(() => {
    fetchTotalContributions(); 
  }, []);

  // Función para obtener y actualizar el total de contribuciones
  const fetchTotalContributions = async () => {
    try {
      const total = await getTotalContributions();
      setTotalContributions(total.totalContributions);

      // Llamada a la función para renderizar el gráfico
      renderChart(total.totalContributions);
    } catch (error) {
      console.error("Error al obtener el total de contribuciones:", error.message);
    }
  };

  // Función para renderizar el gráfico
  const renderChart = (totalContributions) => {
    const ctx = document.getElementById('contributionsChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''], 
        datasets: [{
          label: 'Total de Contribuciones',
          data: [totalContributions],
          backgroundColor: [
            'rgba(66, 153, 0, 0.2)', // green-400
          ],
          borderColor: [
            'rgba(66, 153, 0, 1)', // green-400
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Total de Contribuciones ', // Texto en el eje x
              font: {
                size: 16, // Tamaño del texto aumentado
                weight: 'bold' // Texto en negrita
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad ',
              
              font: {
                size: 16, // Tamaño del texto aumentado
                weight: 'bold' // Texto en negrita
              }
             
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  };

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="flex justify-center text-2xl font-bold text-green-400 mb-4 ">Hackify  <AboutUsLogo /> </h1>
      
     
      <div className="max-w-sm mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <canvas id="contributionsChart"></canvas>
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
