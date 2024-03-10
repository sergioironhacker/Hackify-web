import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas } from "../services/IdeaService.js";
import { getCategories } from "../services/IdeaService.js";
import { AiOutlinePicture, AiOutlinePlaySquare, AiOutlineDollarCircle, AiOutlineHome } from 'react-icons/ai'; 
import { FaLaptop } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error al obtener las categorías:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.trim().toLowerCase());
  };

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
    let filtered = ideas.filter((idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter(idea =>
        idea.categories.includes(selectedCategory)
      );
    }

    setFilteredIdeas(filtered);
  }, [searchTerm, ideas, selectedCategory]);

  // se puede deslizar hacia los lados si ñaadiesemos mas categorias y quedaia un efecto guay propomngo añadir categoria 'todas'
  const categoryIcons = {
    "Inmobiliaria": <AiOutlineHome />,
    "Tecnología": <FaLaptop />, 
    "Arte": <AiOutlinePicture />,
    "Ocio": <AiOutlinePlaySquare />,
    "Sin ánimo de lucro": <AiOutlineDollarCircle /> 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 rounded-md px-3 py-2">
        <input
          type="text"
          placeholder="Buscar ideas..."
          value={searchTerm}
          onChange={handleChange}
          className="flex-1 appearance-none bg-transparent border-none focus:outline-none"
        />
        <button type="submit" className="focus:outline-none">
          <FaSearch className="text-gray-500" />
        </button>
      </form>

      <div className="flex overflow-x-auto mt-3">
        {categories.map((category, index) => (
          <div key={index} className="flex-shrink-0 mr-4">
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={() => handleCategoryChange(category)}
              checked={category === selectedCategory}
              className="sr-only"
            />
            <label htmlFor={category} className={`flex flex-col items-center cursor-pointer ${category === selectedCategory ? 'text-green-400' : 'text-gray-600'}`}>
              {categoryIcons[category]}
              <span className="text-xs mt-1">{category}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="max-w-container mx-auto p-6">
        {filteredIdeas && filteredIdeas.length > 0 ? (
          <div className="space-y-8">
            {filteredIdeas.map((idea) => (
              <div key={idea.id}>
                <IdeaCard {...idea} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay ideas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
