import { useFormik } from 'formik';
import { createIdea } from '../services/IdeaService';



const IdeaComponent = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      contributionMax: 0,
      images: [],
    },

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('contributionMax', values.contributionMax);
        values.images.forEach(image => formData.append('images', image));
        await createIdea(formData);
      } catch (error) {
        console.error('Error al crear la idea:', error.message);
      }
    },
  });

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    formik.setFieldValue('images', newImages);
  };

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Crear una nueva Idea</h1>
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
        <div>
          <label htmlFor="contributionMax" className="block text-sm font-medium text-tw-dark-gray">Precio(€):</label>
          <input type='number'
            id="contributionMax"
            name="contributionMax"
            onChange={formik.handleChange}
            value={formik.values.contributionMax}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-tw-dark-gray">Imágenes:</label>
          <input
            id="images"
            name="images"
            type="file"
            onChange={handleImageChange}
            multiple
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>

        <button type="submit" className="w-full bg-tw-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-tw-primary-accent focus:outline-none focus:ring-2 focus:ring-tw-primary focus:ring-opacity-50">
          Crear Idea
        </button>
      </form>
    </div>

  );
};



export default IdeaComponent;
