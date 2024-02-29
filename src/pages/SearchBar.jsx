import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.trim().toLowerCase());
  };

  return (
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
  );
};

export default SearchBar;