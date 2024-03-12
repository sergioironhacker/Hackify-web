import { useState, useEffect, useContext } from 'react';
import { getUserContributedIdeas } from '../services/UserService';
import IdeaCard from './IdeaCard';
import AuthContext from '../contexts/AuthContext';

const MyContributions = () => {
  const { user } = useContext(AuthContext);
  const [contributedIdeas, setContributedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributedIdeas = async () => {
      try {
        if (user && user.id) {
          console.log('User ID:', user.id);
          const response = await getUserContributedIdeas(user.id);
          console.log('API Response:', response);
          if (response && response.data) {
            setContributedIdeas(response.data);
          } else {
            console.error('Invalid response data:', response);
          }
        } else {
          console.error('User or user ID is undefined');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributed ideas:', error);
        setLoading(false);
      }
    };

    fetchContributedIdeas();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!contributedIdeas || !Array.isArray(contributedIdeas)) {
    return <p>No contributed ideas found.</p>;
  }

  return (
    <div>
      {contributedIdeas.map((contribution) => (
        <IdeaCard idea={contribution.idea} key={contribution._id} />
      ))}
    </div>
  );
};

export default MyContributions;
