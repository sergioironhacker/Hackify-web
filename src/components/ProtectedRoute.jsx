import { useContext } from "react"
import AuthContext from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthFetched, user } = useContext(AuthContext)

  if (!isAuthFetched) {
    return (<p>Loading...</p>)
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute