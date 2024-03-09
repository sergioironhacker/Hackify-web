import  { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import IdeaCard from "../components/IdeaCard.jsx";
import { getIdeas } from "../services/IdeaService.js";
import { getCategories } from "../services/IdeaService.js";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      setSelectedCategories(updatedCategories);
    }
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

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(idea =>
        selectedCategories.some(category => idea.categories.includes(category))
      );
    }

    setFilteredIdeas(filtered);
  }, [searchTerm, ideas, selectedCategories]);

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

      <div>
        <h2>Categorías</h2>
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={() => handleCategoryChange(category)}
              checked={selectedCategories.includes(category)}
            />
            <label htmlFor={category}>{category}</label>
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
