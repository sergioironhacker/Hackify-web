import { useState, useEffect } from 'react';
import { getCategories } from '../services/IdeaService';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6 text-green-400">
      <h1 className="text-2xl font-bold mb-4">Categorías Disponibles</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;