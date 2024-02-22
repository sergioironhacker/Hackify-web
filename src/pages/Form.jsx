import { useFormik } from 'formik';
import { createForm } from '../services/FormsService';

const FormComponent = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values) => {
      try {
        await createForm(values);
        // Aquí podrías añadir alguna lógica de redireccionamiento si es necesario
      } catch (error) {
        console.error('Error al crear el formulario:', error.message);
      }
    },
  });

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Crear un nuevo formulario</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-tw-dark-gray">Título:</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-tw-dark-gray">Descripción:</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <button type="submit" className="w-full bg-tw-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-tw-primary-accent focus:outline-none focus:ring-2 focus:ring-tw-primary focus:ring-opacity-50">
          Crear Formulario
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
