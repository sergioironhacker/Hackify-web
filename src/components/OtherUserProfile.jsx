import { useEffect, useState } from "react";
import { getUserIdeas } from "../services/UserService";
import Avatar from "../components/Avatar";
import IdeaCard from "./IdeaCard";

const OtherUserProfile = ( {userId} ) => {

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      getUserIdeas(userId)
        .then(DBIdeas => {
          setIdeas(DBIdeas)
          setLoading(false)
        })
    }, [userId])
  
    if (loading) {
      return <p>Cargando...</p>
    }
    
    return (
        <div className="p-4 ">
        <div className="flex items-center gap-4">
          <Avatar avatar={userId.avatar} />
          <div>
            <h1 className="font-bold text-xl lg:text-2xl text-green-500">{userId.username}</h1>
            <p className="text-gray-600">Email: {userId.email}</p>
          </div>
        </div>

        <div>
        
      {userId.ideas.map(idea => (
        <IdeaCard {...idea} key={idea.id} />
      ))}
    </div>
  
      </div>
    );
};

export default OtherUserProfile;