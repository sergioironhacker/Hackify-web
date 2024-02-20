import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import UserProfile from "./pages/UserProfile"
import CurrentUserProfile from "./pages/CurrentUserProfile"
import Timeline from "./pages/Timeline"

function App() {
  return (
    <div>
      <Navbar />

      <div className="max-w-container border-x-2 border-tw-light-gray mx-auto min-h-body p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><CurrentUserProfile /></ProtectedRoute>} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
