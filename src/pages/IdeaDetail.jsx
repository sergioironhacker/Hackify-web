import { useCallback, useEffect, useState } from 'react';
import { getIdeaDetail, deleteIdea, buyProduct } from '../services/IdeaService';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from '../components/Button';
/* import { createChat } from '../services/Chat.service'; */


/////////// añadir la logica de un onclick que haga la funciona de crear un chat




const IdeaDetail = () => {
  const formik = useFormik({
    initialValues: {
      paymentAmount: 0,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('paymentAmount', values.paymentAmount);
        await buyProduct(formData);
      } catch (error) {
        console.error('Error al pagar:', error.message);
      }
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState({});
  const [loading, setLoading] = useState(true);

  const handleCheckout = async () => {
    try {
      const session = await buyProduct(idea.id, formik.values.paymentAmount);
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
    }
  };



  const fetchIdeaData = useCallback(() => {
    const promises = [getIdeaDetail(id),];
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
                <Link to={`/ideas/${id}/edit`} className="inline-block bg-blue-500  text-white font-bold py-2 px-4 rounded-md shadow-md mr-2">
                  Editar Idea
                </Link>

                <button onClick={onDelete} className="inline-block bg-yellow-500  text-white font-bold py-2 px-4 rounded-md shadow-md">
                  Borrar Idea
                </button>



{/* //////////////////////// */}
                
                <button /* onClick={} */ className="inline-block bg-green-500  text-white font-bold py-2 px-4 rounded-md shadow-md">
                  chatear
                </button>

{/* //////////////////////////////// */}




                <div>
                  <label htmlFor="paymentAmount" className="block text-sm font-medium text-tw-dark-gray">Cantidad a contribuir(€):</label>
                  <input type='number'
                    id="paymentAmount"
                    name="paymentAmount"
                    onChange={formik.handleChange}
                    value={formik.values.paymentAmount}
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent"
                  />
                </div>

                <Button text="Contribuir" onClick={() => { handleCheckout(idea.id, formik.values.paymentAmount) }} />

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaDetail;