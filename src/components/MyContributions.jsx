/* import { useState, useEffect, useContext } from 'react';
import { getContributedIdeas } from '../services/UserService';
import IdeaCard from './IdeaCard';
import AuthContext from '../contexts/AuthContext';

const MyContributions = () => {
  const { user } = useContext(AuthContext);
  const [contributedIdeas, setContributedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContributedIdeas(user)
      .then((ideas) => {
        setContributedIdeas(ideas);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contributed ideas:', error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {contributedIdeas.map((idea) => (
        <IdeaCard {...idea} key={idea.id} />
      ))}
    </div>
  );
};

export default MyContributions;
 */