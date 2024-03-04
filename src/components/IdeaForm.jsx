import { useFormik } from 'formik';
import { object, string } from 'yup';
import { createIdea, editIdea } from '../services/IdeaService';

const ideaSchema = object({
  title: string().required('Campo requerido'),
  description: string().required('Campo requerido'),
  contributionMax: string().required('Campo requerido'),
});

const IdeaForm = ({ onSubmit, initialValues }) => {
  const {
    values,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues || {
      title: '',
      description: '',
      contributionMax: 0,
      images: [],
    },

    onSubmit: async (formValues) => {
      try {
        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('contributionMax', formValues.contributionMax);
        formValues.images.forEach((image) => formData.append('images', image));

        if (initialValues) {
          // Editing existing idea
          await editIdea(initialValues.id, formData);
        } else {
          // Creating new idea
          await createIdea(formData);
        }

        // Call the external onSubmit function if provided
        if (onSubmit) {
          onSubmit(formValues); // Pass form values here
        }
      } catch (error) {
        console.error('Error al crear/editar la idea:', error.message);
      }
    },
    validationSchema: ideaSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);

    // Ensure the total size of images does not exceed a certain limit
    const totalSize = newImages.reduce((acc, image) => acc + image.size, 0);
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (totalSize <= maxSizeInBytes) {
      setFieldValue('images', newImages);
    } else {
      // Display an error or alert the user about the size limit
      console.error('Total size of images exceeds the limit');
    }
  };

  return (
    <div className="max-w-container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {initialValues ? 'Editar' : 'Crear'} una nueva Idea
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-tw-dark-gray">
            Título:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-tw-dark-gray">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label htmlFor="contributionMax" className="block text-sm font-medium text-tw-dark-gray">
            Precio(€):
          </label>
          <input
            type="number"
            id="contributionMax"
            name="contributionMax"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.contributionMax}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-tw-dark-gray">
            Imágenes:
          </label>
          <input
            id="images"
            name="images"
            type="file"
            onBlur={handleBlur}
            onChange={handleImageChange}
            multiple
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>

        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          onSubmit={onSubmit}
          className="w-full bg-tw-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-tw-primary-accent focus:outline-none focus:ring-2 focus:ring-tw-primary focus:ring-opacity-50"
        >
          {isSubmitting ? <>Guardando...</> : <>{initialValues ? 'Editar' : 'Crear'} Idea</>}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
