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
    return <p>Loading...</p>;
  }

  if (user.bookmarks && user.bookmarks.length === 0) {
    return <p>You have no bookmarked ideas yet</p>;
  }

  return (
    <div>
      {user.bookmarks.map((idea) => (
        console.log('user bookmarks', user.bookmarks),
        <IdeaCard {...idea} key={idea.data} />
      ))}
    </div>
  );
};

export default BookmarkedIdeas;
