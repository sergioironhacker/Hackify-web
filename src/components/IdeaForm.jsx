import { useFormik } from "formik";
import { object, string } from "yup";
import { createIdea, editIdea } from "../services/IdeaService";
import { useEffect, useState } from "react";

const ideaSchema = object({
  title: string().required("Campo requerido"),
  description: string().required("Campo requerido"),
  contributionMax: string().required("Campo requerido"),
});

const IdeaForm = ({ onSubmit, initialValues }) => {
  const [existingImages, setExistingImages] = useState([]);

  const {
    values,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    /*  setValues,  */
  } = useFormik({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      contributionMax: initialValues?.contributionMax || '',
      images: existingImages || [],
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('contributionMax', values.contributionMax);

        existingImages.forEach((image) => formData.append('images', image));

        if (values.images && values.images.length > 0) {
          values.images.forEach((image) => formData.append('images', image));
        }

        if (initialValues) {
          await editIdea(initialValues.id, formData);
        } else {
          const createdIdea = await createIdea(formData);
          if (onSubmit) {
            onSubmit(createdIdea);
          }
        }
      } catch (error) {
        console.error('Error al crear/editar la idea:', error.message);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: ideaSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  useEffect(() => {
    setFieldValue('title', initialValues?.title || '');
    setFieldValue('description', initialValues?.description || '');
    setFieldValue('contributionMax', initialValues?.contributionMax || '');
    if (initialValues && initialValues.images) {
      setExistingImages(initialValues.images);
    }
  }, [initialValues]);

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);

    const totalSize = newImages.reduce((acc, image) => acc + image.size, 0);
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (totalSize <= maxSizeInBytes) {
      setFieldValue('images', newImages);
    } else {
      console.error('Total size of images exceeds the limit');
    }
  };

  return (
    <div className="max-w-container mx-auto p-6 text-green-400">
      <h1 className="text-2xl font-bold mb-4 ">
        {initialValues ? 'Editar' : 'Crear'} una nueva Idea
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-green-400"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-green-400"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
            required
            className="mt-1 p-2 block w-full rounded-md text-green-400 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label
            htmlFor="contributionMax"
            className="block text-sm font-medium text-green-400"
          >
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
          <label
            htmlFor="images"
            className="block text-sm font-medium text-green-400"
          >
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
          className="w-full bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-tw-primary-accent focus:outline-none focus:ring-2 focus:ring-tw-primary focus:ring-opacity-50"
        >
          {isSubmitting ? <>Guardando...</> : <>{initialValues ? 'Editar' : 'Crear'} Idea</>}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
