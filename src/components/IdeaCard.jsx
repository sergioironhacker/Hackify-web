import { Link } from "react-router-dom";
import Button from "./Button";
import { buyProduct } from "../services/IdeaService.js";


const IdeaCard = ({
  id,
  index,
  title,
  description,
  contributionMax,
  user,
  onClick,
}) => {


  return (
      <div key={index} className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-600 mb-2">{contributionMax}€</p>
        <p className="text-gray-500 mb-4">
          Creado por: {user && user.username}
        </p>
        {/* Aquí se utiliza el componente Button para el botón de contribuir */}
        <Link to={`/ideas/${id}`} className="" onClick={onClick}>
          Ver más detalles
        </Link>
      </div>
  );
};

export default IdeaCard;
