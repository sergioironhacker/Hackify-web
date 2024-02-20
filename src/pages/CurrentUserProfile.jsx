import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import Profile from "../components/Profile";

const CurrentUserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <Profile user={user}/>
  )
}

export default CurrentUserProfile