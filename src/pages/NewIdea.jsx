import { useNavigate } from "react-router-dom";
import IdeaForm from "../components/IdeaForm";
import { createIdea } from "../services/IdeaService";

const NewIdea = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      if (!values) {
        console.error("Form values are undefined.");
        return;
      }

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('contributionMax', values.contributionMax);
      
      // Make sure images is an array before attempting to iterate
      if (Array.isArray(values.images)) {
        values.images.forEach((image) => formData.append('images', image));
      }

      const createdIdea = await createIdea(formData);
      navigate(`/ideas/${createdIdea.id}`);
    } catch (error) {
      console.error("Error creating idea:", error.message);
    }
  };

  return (
    <div>
      <h1>Crear nueva Idea</h1>
      <IdeaForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewIdea;
