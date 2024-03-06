import { Link } from "react-router-dom";

const IdeaCard = ({
  id,
  index,
  title,
  description,
  contributionMax,
  contributionTotal,
  images,
}) => {
  // Calculo
  const contributionPercentage = (contributionTotal / contributionMax) * 100;

  return (
    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden mt-6 font-bold flex flex-col items-center">
      <img src={images[0]} alt={title} className="w-full h-48 object-cover object-center" />
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">Contribución máxima: {contributionMax}€</p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <p className="font-bold">Cantidad recaudada: {contributionTotal}€</p>
          <div className="h-3 bg-gray-200 rounded-full">
            <div className="h-full bg-gray-500 rounded-full" style={{ width: `${contributionPercentage}%` }}></div>
          </div>
        </div>

        {/* Enlace para ver más detalles */}
        <Link to={`/ideas/${id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Ver más detalles
        </Link>
      </div>
    </div>
  );
};

export default IdeaCard;
