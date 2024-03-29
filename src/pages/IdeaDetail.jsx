import { useCallback, useEffect, useState, useContext } from "react";
import { getIdeaDetail, deleteIdea, buyProduct } from "../services/IdeaService";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../components/Button";
import { createChat } from "../services/Chat.service";
import {
  PencilIcon,
  TrashIcon,
  ChatAltIcon,
  BookmarkIcon as OutlineBookmarkIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthContext from "../contexts/AuthContext";
import { toggleBookmark } from "../services/UserService";
import IdeaTabbar from "../components/IdeaTabbar";
import Input from "../components/Input";

const IdeaDetail = ({ bookmarks, showBookmarkButton = true }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBookMarked, setIsBookMarked] = useState(false);
  const [contributionError, setContributionError] = useState("");
  const [inputValue, setInputValue] = useState(0);

  const handleBookMarked = useCallback(() => {
    setIsBookMarked(
      user.bookmarks.some((bookmark) => bookmark.idea._id === id)
    );
  }, []);

  const handleBookmark = () => {
    toggleBookmark(id)
      .then((res) => {
        if (res === "creado") {
          setIsBookMarked(true);
        } else {
          setIsBookMarked(false);
        }
      })
      .catch((error) => console.error("Error toggling bookmark:", error));
  };

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

  const [idea, setIdea] = useState({});
  const [loading, setLoading] = useState(true);

  const handleCheckout = async () => {
    try {
      if (
        idea.contributionLimitActive &&
        formik.values.paymentAmount >
          idea.contributionMax - idea.contributionTotal
      ) {
        // Display error message or handle accordingly
        setContributionError(
          "La cantidad de contribución excede el límite permitido"
        );
        setTimeout(() => {
          setContributionError("");
          setInputValue(0); // Reset input value
        }, 3000); // 3 seconds
        return;
      }

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
    handleBookMarked();
  }, [fetchIdeaData]);

  const onDelete = () => {
    if (confirm(`Estás a punto de borrar la idea: ${idea.title}`)) {
      deleteIdea(id)
        .then(() => {
          navigate("/");
        })
        .catch((e) => console.error(e));
    }
  };

  const onCreateChat = async () => {
    try {
      await createChat(idea.user, {});
      window.location.href = "/user/chats";
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="bg-white shadow-md rounded-md p-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">{idea.title}</h1>
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
              <IdeaTabbar idea={idea} />

              <div className="flex justify-between items-center mt-4">
                {user.id === idea.user ? (
                  <>
                    <Link to={`/ideas/${id}/edit`}>
                      <PencilIcon className="w-7 ml-7 text-blue-400" />
                      Editar Idea
                    </Link>
                    <button onClick={onDelete}>
                      <TrashIcon className="w-7 ml-6 text-red-400" />
                      Borrar Idea
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={onCreateChat}>
                      <ChatAltIcon className="w-7 ml-4 text-green-400" />
                      Chatear
                    </button>
                    {showBookmarkButton && (
                      <div onClick={handleBookmark} className="w-7 mr-2">
                        {isBookMarked ? (
                          <BookmarkIcon className="fill-yellow-500" />
                        ) : (
                          <OutlineBookmarkIcon className="" />
                        )}
                        Guardar Idea
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="paymentAmount"
                  className="block font-bold text-sm"
                >
                  Cantidad a contribuir(€):
                </label>
                <Input
                  type="number"
                  id="paymentAmount"
                  name="paymentAmount"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setInputValue(e.target.value); // Update input value
                  }}
                  value={inputValue}
                  required
                  disabled={
                    idea.contributionLimitActive &&
                    formik.values.paymentAmount >
                      idea.contributionMax - idea.contributionTotal
                  }
                  max={
                    idea.contributionLimitActive
                      ? idea.contributionMax - idea.contributionTotal
                      : null
                  }
                  className="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:ring-tw-primary focus:border-tw-primary-accent mb-1 text-sm"
                />
                {/* Render error message if contribution error exists */}
                {contributionError && (
                  <p className="text-red-500 text-sm mt-1">
                    {contributionError}
                  </p>
                )}
              </div>
              <Button
                onClick={handleCheckout}
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
