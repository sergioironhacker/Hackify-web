import { useFormik } from "formik";
import { object, string, boolean, date, object as yupObject, array } from "yup";
import { createIdea, editIdea, getCategories } from "../services/IdeaService";
import { useEffect, useState } from "react";

const ideaSchema = object({
  title: string().required("Campo requerido"),
  description: string().required("Campo requerido"),
  contributionMax: string().required("Campo requerido"),
  fullDescription: string().required("Campo requerido"),
  contributionLimitActive: boolean(),
  categories: array().required("Campo requerido"),
  timeLimit: date().required("Campo requerido"),
  location: yupObject({
    city: string().required("Campo requerido"),
    country: string().required("Campo requerido"),
    zipcode: string().required("Campo requerido"),
  }),
});

const IdeaForm = ({ onSubmit, initialValues }) => {
  const [existingImages, setExistingImages] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      contributionMax: initialValues?.contributionMax || "",
      fullDescription: initialValues?.fullDescription || "",
      contributionLimitActive: initialValues?.contributionLimitActive || false,
      categories: initialValues?.categories || "",
      timeLimit: initialValues?.timeLimit || "",
      location: {
        city: initialValues?.location?.city || "",
        country: initialValues?.location?.country || "",
        zipcode: initialValues?.location?.zipcode || "",
      },
      images: existingImages || [],
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log("entro");

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("contributionMax", values.contributionMax);
      formData.append("fullDescription", values.fullDescription);
      formData.append(
        "contributionLimitActive",
        values.contributionLimitActive
      );
      formData.append("categories", values.categories);
      const timeLimitDate = new Date(values.timeLimit);
      formData.append("timeLimit", timeLimitDate.toISOString());

      formData.append("location[city]", values.location.city);
      formData.append("location[country]", values.location.country);
      formData.append("location[zipcode]", values.location.zipcode);

      existingImages.forEach((image) => formData.append("images", image));

      if (values.images && values.images.length > 0) {
        values.images.forEach((image) => formData.append("images", image));
      }

      const submissionPromise = initialValues
        ? editIdea(initialValues.id, formData)
        : createIdea(formData);

      submissionPromise
        .then((createdIdea) => {
          if (onSubmit) {
            onSubmit(createdIdea);
          }
        })
        .catch((error) => {
          console.error("Error al crear/editar la idea:", error.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    validationSchema: ideaSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });
  console.log(initialValues?.categories);

  console.log("errors", errors);
  useEffect(() => {
    const fetchCategories = () => {
      getCategories()
        .then((response) => {
          setCategoryOptions(response || []);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error.message);
        })
        .finally(() => {
          setLoadingCategories(false);
        });
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFieldValue("title", initialValues?.title || "");
    setFieldValue("description", initialValues?.description || "");
    setFieldValue("contributionMax", initialValues?.contributionMax || "");
    setFieldValue("fullDescription", initialValues?.fullDescription || "");
    setFieldValue(
      "contributionLimitActive",
      initialValues?.contributionLimitActive || false
    );
    setFieldValue("categories", initialValues?.categories || []);
    const formattedTimeLimit = initialValues?.timeLimit
      ? new Date(initialValues.timeLimit).toISOString().slice(0, -5)
      : null;
    setFieldValue("timeLimit", formattedTimeLimit);
    setFieldValue("location.city", initialValues?.location?.city || "");
    setFieldValue("location.country", initialValues?.location?.country || "");
    setFieldValue("location.zipcode", initialValues?.location?.zipcode || "");

    if (initialValues && initialValues.images) {
      setExistingImages(initialValues.images);
    }
  }, [initialValues]);

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);

    const totalSize = newImages.reduce((acc, image) => acc + image.size, 0);
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (totalSize <= maxSizeInBytes) {
      setFieldValue("images", newImages);
    } else {
      console.error("Total size of images exceeds the limit");
    }
  };
  console.log(values);
  return (
    <div className="max-w-container mx-auto p-6 text-green-400">
      <h1 className="text-2xl font-bold mb-4 ">
        {initialValues ? "Editar" : "Crear"} una nueva Idea
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
            htmlFor="fullDescription"
            className="block text-sm font-medium text-green-400"
          >
            Descripción completa:
          </label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.fullDescription}
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
            htmlFor="contributionLimitActive"
            className="block text-sm font-medium text-green-400"
          >
            Límite de contribución activo:
          </label>
          <input
            type="checkbox"
            id="contributionLimitActive"
            name="contributionLimitActive"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={values.contributionLimitActive}
            className="mt-1 p-2 block rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-green-400"
          >
            Categorías:
          </label>
          {categoryOptions && !loadingCategories ? (
            <select
              id="categories"
              name="categories"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.categories[0]}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryOptions.map((category) => {
                console.log("category", category);
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
        <div>
          <label
            htmlFor="timeLimit"
            className="block text-sm font-medium text-green-400"
          >
            Límite de tiempo:
          </label>
          <input
            type="datetime-local"
            id="timeLimit"
            name="timeLimit"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.timeLimit}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label
            htmlFor="location.city"
            className="block text-sm font-medium text-green-400"
          >
            Ciudad:
          </label>
          <input
            id="location.city"
            name="location.city"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.location.city}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label
            htmlFor="location.country"
            className="block text-sm font-medium text-green-400"
          >
            País:
          </label>
          <input
            id="location.country"
            name="location.country"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.location.country}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
          />
        </div>
        <div>
          <label
            htmlFor="location.zipcode"
            className="block text-sm font-medium text-green-400"
          >
            Código postal:
          </label>
          <input
            id="location.zipcode"
            name="location.zipcode"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.location.zipcode}
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
          {isSubmitting ? (
            <>Guardando...</>
          ) : (
            <>{initialValues ? "Editar" : "Crear"} Idea</>
          )}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
