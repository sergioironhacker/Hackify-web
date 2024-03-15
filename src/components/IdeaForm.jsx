import { useFormik } from "formik";
import { object, string, boolean, date, object as yupObject } from "yup";
import { createIdea, editIdea, getCategories } from "../services/IdeaService";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "./Input";

const ideaSchema = object({
  title: string().required("Campo requerido"),
  description: string().required("Campo requerido"),
  contributionMax: string().required("Campo requerido"),
  fullDescription: string().required("Campo requerido"),
  contributionLimitActive: boolean(),
  categories: string().required("Campo requerido"),
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
  const [videoUrl, setVideoUrl] = useState(initialValues?.videoUrl || "");

  const {
    values,
    errors,
    isValid,
    touched,
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
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      // Parse video URL and extract video ID
      let videoId;
      if (videoUrl.includes("youtube.com")) {
        const urlParams = new URLSearchParams(new URL(videoUrl).search);
        videoId = urlParams.get("v");
      } else if (videoUrl.includes("vimeo.com")) {
        videoId = videoUrl.split("/").pop();
      }

      // Append video ID to form data
      values.videoId = videoId;

      // Submit form data
      try {
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
        formData.append("timeLimit", new Date(values.timeLimit).toISOString());
        formData.append("location[city]", values.location.city);
        formData.append("location[country]", values.location.country);
        formData.append("location[zipcode]", values.location.zipcode);

        existingImages.forEach((image) => formData.append("images", image));

        if (values.images && values.images.length > 0) {
          values.images.forEach((image) => formData.append("images", image));
        }

        const createdIdea = initialValues
          ? await editIdea(initialValues.id, formData)
          : await createIdea(formData);

        if (onSubmit) {
          onSubmit(createdIdea);
        }
      } catch (error) {
        console.error("Error al crear/editar la idea:", error.message);
      } finally {
        setSubmitting(false);
      }
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

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

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
          <Input
            name="title"
            type="text"
            label="Título:"
            value={values.title}
            error={touched.title && errors.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Input
            name="description"
            type="text"
            label="Descripción:"
            value={values.description}
            error={touched.description && errors.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label
            htmlFor="fullDescription"
            className="block text-sm font-medium text-green-400"
          >
            Descripción completa:
          </label>
          <ReactQuill
            id="fullDescription"
            name="fullDescription"
            onBlur={handleBlur}
            onChange={(value) => setFieldValue("fullDescription", value)}
            value={values.fullDescription}
            required
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                [{ align: [] }],
                ["clean"],
              ],
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
              "video",
            ]}
            allowPaste={true} // Allow paste from clipboard
          />
           {(touched.fullDescription || isSubmitting) && errors.fullDescription && (
            <div className="mt-2 text-red-600">{errors.fullDescription}</div>
          )}
        </div>
        <div>
          <Input
            name="contributionMax"
            type="number"
            label="Precio(€):"
            value={values.contributionMax}
            error={touched.contributionMax && errors.contributionMax}
            onChange={handleChange}
            onBlur={handleBlur}
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
              value={[values.categories]}
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
          <Input
            name="timeLimit"
            type="datetime-local"
            label="Límite de tiempo:"
            value={values.timeLimit}
            error={touched.timeLimit && errors.timeLimit}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Input
            name="location.city"
            type="text"
            label="Ciudad:"
            value={values.location.city}
            error={touched.location?.city && errors.location?.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Input
            name="location.country"
            type="text"
            label="País:"
            value={values.location.country}
            error={touched.location?.country && errors.location?.country}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <Input
            name="location.zipcode"
            type="text"
            label="Código postal:"
            value={values.location.zipcode}
            error={touched.location?.zipcode && errors.location?.zipcode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-green-400 mr-2"
          >
            Subir Imágenes:
          </label>
          <label
            htmlFor="images"
            className="cursor-pointer bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-tw-primary-accent focus:outline-none focus:ring-2 focus:ring-tw-primary focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Subir
          </label>
          <input
            id="images"
            name="images"
            type="file"
            style={{ display: "none" }}
            onBlur={handleBlur}
            onChange={handleImageChange}
            multiple
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
