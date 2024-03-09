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
      <IdeaForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewIdea;
