import { useState, useEffect } from 'react';
import { getForms, buyProduct } from '../services/FormsService';
import Button from '../components/Button';

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [progress, setProgress] = useState(0); // Estado para el progreso
  const [totalAmount, setTotalAmount] = useState(0); // Estado para la cantidad total recaudada

  const handleCheckout = async (formId) => {
    try {
      const session = await buyProduct(formId);
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms();
        setForms(response);
        // Calcular la cantidad total recaudada
        const total = response.reduce((acc, form) => acc + form.price, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error al obtener los formularios:', error.message);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Ideas</h1>

      {forms && forms.length > 0 ? (
        <ul className="space-y-8">
          {forms.map((form, index) => {
            return (
              <li key={index} className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold">{form.title}</h2>
                <p className="text-gray-600 mb-2">{form.description}</p>
                <p className="text-gray-600 mb-2">{form.price}€</p>
                <p className="text-gray-500 mb-4">Creado por: {form.user.username}</p>
                {/* Barra de progreso */}
                <div className="relative w-full h-4 bg-gray-200 rounded-md overflow-hidden mb-4">
                  <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Cantidad recaudada: {form.price * (progress / 100)}€
                </div>
                <Button text="Paga" onClick={() => handleCheckout(form.id)}></Button>
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
