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
    <div>
      <h1>Crear un nuevo formulario</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            required
          />
        </div>
        <button type="submit">Crear Formulario</button>
      </form>
    </div>
  );
};

export default FormComponent;

