import { Link } from "react-router-dom";


const IdeaCard = ({
  id,
  index,
  title,
  description,
  contributionMax,
  images,
  user,
  onClick,
}) => {


  return (
      <div key={index} className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-600 mb-2">{contributionMax}€</p>
        {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Imagen ${index + 1}`}
          className="w-full mb-2"
        />
      ))}
        <p className="text-gray-500 mb-4">
          Creado por: {user && user.username}
        </p>
        {/* Aquí se utiliza el componente Button para el botón de contribuir */}
        <Link to={`/ideas/${id}`} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md" onClick={onClick}>
          Ver más detalles
        </Link>
      </div>
  );
};

export default IdeaCard;


