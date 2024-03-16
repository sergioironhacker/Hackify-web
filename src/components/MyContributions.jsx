import { useState, useEffect, useContext } from "react";
import { getUserContributedIdeas } from "../services/UserService";
import IdeaCard from "./IdeaCard";
import AuthContext from "../contexts/AuthContext";

const MyContributions = () => {
  const { user } = useContext(AuthContext);
  const [contributedIdeas, setContributedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user.contributions);

  useEffect(() => {
    const fetchContributedIdeas = async () => {
      try {
        if (user && user.id) {
          const response = await getUserContributedIdeas(user.id);
          if (response && response.data) {
            setContributedIdeas(response);
          } else {
            console.error(" data:", response);
          }
        } else {
          console.error("User or user ID is undefined");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contributed ideas:", error);
        setLoading(false);
      }
    };

    fetchContributedIdeas();
  }, [user]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!contributedIdeas || !Array.isArray(contributedIdeas)) {
    return <p>Todavía no has contribuido en una idea.</p>;
  }

  return (
    <div>
      {user.contributions.map((contribution) => {
        return <IdeaCard {...contribution.idea} key={contribution._id} />;
      })}
    </div>
  );
};

export default MyContributions;
