import React, { useState, useEffect } from 'react';
import { getForms } from '../services/FormsService';

const FormsList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms();
        console.log('Forms:', response); // Verificar el contenido de response
        setForms(response);
      } catch (error) {
        console.error('Error al obtener los formularios:', error.message);
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      <h1>Listado de Formularios</h1>
      {forms && forms.length > 0 ? (
        <ul>
          {forms.map((form, index) => {
            console.log('Formulario:', form); // Verificar cada formulario
            return (
              <li key={index}>
                <h2>{form.title}</h2>
                <p>{form.description}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hay formularios disponibles.</p>
      )}
    </div>
  );
};

export default FormsList;
