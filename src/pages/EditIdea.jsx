import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import IdeaForm from "../components/IdeaForm";
import { editIdea, getIdeaDetail } from "./../services/IdeaService";

const EditIdea = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const ideaDB = await getIdeaDetail(id);
        setIdea(ideaDB);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdea();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      const response = await editIdea(id, values);
      console.log(response); // Log the response to check its content
      navigate(`/ideas/${id}`);
    } catch (error) {
      console.error("Error editing idea:", error.message);
    }
  };
  

  return (
    <div>
        {loading ? (
        <p>Cargando...</p>
      ) : (
        <IdeaForm initialValues={idea} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default EditIdea;
