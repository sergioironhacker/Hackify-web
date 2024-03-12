import { useState, useEffect, useContext } from 'react'
import { getUserIdeas } from '../services/UserService';
import IdeaCard from './IdeaCard';
import AuthContext from '../contexts/AuthContext';

const MyIdeas = () => {
  const { user } = useContext(AuthContext);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserIdeas(user)
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

  if (user.ideas && user.ideas.length === 0) {
    return <p>You have no created ideas yet</p>;
  }

  return (
    <div>
      {user.ideas.map((idea) => (
        <IdeaCard {...idea} key={idea.id} />
      ))}
    </div>
  );
};

export default MyIdeas;
