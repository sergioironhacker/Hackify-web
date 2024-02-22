import  { useState, useEffect } from 'react';
import { getForms } from '../services/FormsService';

const FormsList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms();
        setForms(response);
      } catch (error) {
        console.error('Error al obtener los formularios:', error.message);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Formularios</h1>
      {forms && forms.length > 0 ? (
        <ul className="space-y-4">
          {forms.map((form, index) => {
            return (
              <li key={index} className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-semibold">{form.title}</h2>
                <p className="text-gray-600">{form.description}</p>
                <p className="text-gray-500">Creado por: {form.user.username}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">No hay formularios disponibles.</p>
      )}
    </div>
  );
};

export default FormsList;
