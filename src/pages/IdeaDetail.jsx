import { useCallback, useEffect, useState } from "react";
import { getIdeaDetail, deleteIdea, buyProduct } from "../services/IdeaService";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../components/Button";
import { createChat } from "../services/Chat.service";
import { PencilIcon, TrashIcon, ChatAltIcon } from "@heroicons/react/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/////////// añadir la logica de un onclick que haga la funciona de crear un chat

const IdeaDetail = () => {
  const formik = useFormik({
    initialValues: {
      paymentAmount: 0,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("paymentAmount", values.paymentAmount);
        await buyProduct(formData);
      } catch (error) {
        console.error("Error al pagar:", error.message);
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
    const promises = [getIdeaDetail(id)];
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
          navigate("/");
        })
        .catch((e) => console.error(e));
    }
  };

  ///////////////////////////

  const onCreateChat = async () => {
    try {
      await createChat(idea.user, {});
      // Redirigir a la vista de chats
      window.location.href = "/user/chats";
    } catch (error) {
      console.error(error);
    }
  };

  /////////////////////////////////

  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    infinite: false,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  return (
    <div className="max-w-sm mx-auto">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>

          <div className="bg-white shadow-md rounded-md p-4   ">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 ">{idea.title}</h1>
              {idea.images.length > 0 && (
                <div className="relative">
                  <Slider {...settings}>
                    {idea.images.map((image, index) => (
                      <div key={index} className="w-full h-0 pb-56 relative">
                        <img
                          src={image}
                          alt={`Imagen ${index + 1}`}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                  <div className="absolute bottom-2 left-2 text-white">
                    {`${currentIndex + 1}/${idea.images.length}`}
                  </div>
                </div>
              )}
              <p className="text-sm">{idea.description}</p>
              <p className="font-bold text-sm">
                Necesita recaudar: {idea.contributionMax}
              </p>
              <div className="flex justify-between items-center mt-4 ">
                <Link to={`/ideas/${id}/edit`} className="">
                  <PencilIcon className="w-7 ml-7  text-blue-400" />
                  Editar Idea
                </Link>

                <button onClick={onDelete} className="">
                  <TrashIcon className="w-7  ml-6 text-red-400" />
                  Borrar Idea
                </button>

                <button onClick={onCreateChat} className="">
                  <ChatAltIcon className="w-7  ml-4  text-green-400" />
                  Chatear
                </button>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="paymentAmount"
                  className="block font-bold text-sm"
                >
                  Cantidad a contribuir(€):
                </label>
                <input
                  type="number"
                  id="paymentAmount"
                  name="paymentAmount"
                  onChange={formik.handleChange}
                  value={formik.values.paymentAmount}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-black shadow-sm  focus:ring-tw-primary focus:border-tw-primary-accent mb-1 text-sm"
                />
              </div>
              <Button
                onClick={() => {
                  handleCheckout(idea.id, formik.values.paymentAmount);
                }}
                text="Contribuir"
                className="bg-green-400 text-white"
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaDetail;
