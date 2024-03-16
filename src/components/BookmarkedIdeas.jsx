import { useContext, useEffect, useState } from "react";
import { getUserBookmarkedIdeas } from "../services/UserService";
import IdeaCard from "./IdeaCard";
import AuthContext from "../contexts/AuthContext";

const BookmarkedIdeas = () => {
  const { user } = useContext(AuthContext);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserBookmarkedIdeas(user)
      .then((DBIdeas) => {
        setIdeas(DBIdeas);
        console.log("User data:", user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (user.bookmarks && user.bookmarks.length === 0) {
    return <p>Todavía no has guardado ninguna idea.</p>;
  }

  return (
    <div>
      {user.bookmarks.map((bookmark) => (
        <IdeaCard {...bookmark.idea} key={bookmark.idea} />
      ))}
    </div>
  );
};

export default BookmarkedIdeas;
