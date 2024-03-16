import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/UserService";
import OtherUserProfile from '../components/OtherUserProfile';

const UserProfile = () => {
 const { id } = useParams()

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser(id)
      .then(user => {
        setUser(user)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <OtherUserProfile userId={user}/>
  )
}

export default UserProfile