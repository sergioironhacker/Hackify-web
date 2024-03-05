import { Link } from "react-router-dom";

const IdeaCard = ({
  id,
  index,
  title,
  description,
  contributionMax,
  contributionTotal,   ////////////////////////////
  images,
  user,
  onClick,
}) => {


  // Calcular el porcentaje de la cantidad recaudada en relación con la contribución máxima //////////////////////////
  const contributionPercentage = (contributionTotal / contributionMax) * 100;




  return (
    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden mt-3">
      <div className="relative">
        <img src={images[0]} alt={title} className="w-full h-56 object-cover object-center" />
        <div className="absolute bottom-0 left-0 bg-black opacity-75 w-full py-2 px-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-700">Contribución máxima: {contributionMax}€</p>
        </div>



       {/*  //////////////////// */}

        <div className="mb-2">
          <p className="text-gray-700 mb-1">Cantidad recaudada: {contributionTotal}€</p>
          <div className="h-4 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${contributionPercentage}%` }}
            ></div>
          </div>
        </div>


        {/* /////////////////////////// */}


        <Link to={`/ideas/${id}`} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
          Ver más detalles
        </Link>
      </div>
    </div>
  );
};

export default IdeaCard;
