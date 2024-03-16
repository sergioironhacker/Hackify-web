import { useState, useEffect } from "react";
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas, getTotalContributions } from "../services/IdeaService.js";
import AboutUsLogo from "../assets/AboutUsLogo.jsx";
// import Chart from "chart.js/auto";


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

/*   useEffect(() => {
    if (totalContributions > 0) {
      renderChart(totalContributions);
    }
  }, [totalContributions]);
 */
  /* const renderChart = (totalContributions) => {
    const ctx = document.getElementById('contributionsChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [''], // Elimina el texto aquí
          datasets: [{
            label: '', // Elimina el texto aquí
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
                text: 'Total de Contribuciones ',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad ',
                font: {
                  size: 16,
                  weight: 'bold'
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
    } else {
      console.error("El elemento 'contributionsChart' no está presente en el DOM.");
    }
  }; */

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="flex justify-center text-2xl font-bold text-green-400 mb-4 ">Hackify  <AboutUsLogo /> </h1>     
      <div className="flex justify-center mb-4 text-center text-green-400 text-2xl font-bold">Haz realidad tus proyectos</div>
      <div className="max-w-sm mx-auto bg-white border border-gray-300 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-2 gap-4">
      <div className="text-center"><br></br>Dinero recaudado:<br></br><span className="text-green-400 text-4xl font-bold">{totalContributions}€</span></div>
      <div className="text-center"><span className="text-green-400 text-4xl font-bold">{ideas.length}</span> <br></br> proyectos en busca de financiación</div>
        {/* <canvas id="contributionsChart"></canvas> */}
        </div>
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
