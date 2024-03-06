import { useNavigate } from 'react-router-dom';
import IdeaForm from '../components/IdeaForm';

const NewIdea = () => {
  const navigate = useNavigate();

  const onSubmit = async (createdIdea) => {
    if (createdIdea) {
      navigate(`/ideas/${createdIdea.id}`);
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
