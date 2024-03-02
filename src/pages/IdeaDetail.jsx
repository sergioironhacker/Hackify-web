import { useCallback, useEffect, useState } from 'react';
import { getIdeaDetail, deleteIdea, buyProduct } from '../services/IdeaService';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';

const IdeaDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [idea, setIdea] = useState({});
    const [loading, setLoading] = useState(true);

    const handleCheckout = async (ideaId) => {
      try {
        const session = await buyProduct(ideaId);
        window.location.href = session.url;
      } catch (error) {
        console.error(error);
      }
    };

  
    const fetchIdeaData = useCallback(() => {
        const promises = [getIdeaDetail(id), ];
        Promise.all(promises)
          .then(([idea]) => {
            setIdea(idea);
            setLoading(false);
          })
          .catch((e) => console.error(e));
      }, [id]);
    
      useEffect(() => {
        fetchIdeaData();
      }, [fetchIdeaData]);
    
    
      const onDelete = () => {
        if (confirm(`Estas a punto de borrar la idea: ${idea.title}`)) {
          deleteIdea(id)
            .then(() => {
              navigate('/');
            })
            .catch((e) => console.error(e));
        }
      };
    

      return (
        <div className="">
          {loading ? (
            <div className="">
              Loading...
            </div>
          ) : (
            <div>
              <div className="">
                <div className="">
                  <h1>{idea.title}</h1>
                  {idea.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      className="w-full mb-2"
                    />
                  ))}
                  <p>{idea.description}</p>
                  
                  <p>Necesita recaudar: {idea.contributionMax}</p>
                  <div className="">
                    <Link to={`/ideas/${id}/edit`} className="">
                      Editar Idea
                    </Link>
                    <button onClick={onDelete} className="">
                      Borrar Idea
                    </button>
                    
                    <Button text="Contribuir" onClick={() => {handleCheckout(idea.id)}} />

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

export default IdeaDetail;