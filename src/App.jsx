import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import CurrentUserProfile from './pages/CurrentUserProfile';
/* import Timeline from './pages/Timeline';  */
 import Idea from './components/Idea'; 
 import Messages from './pages/Messages';
 import SearchBar from './pages/SearchBar';



function App() {
  return (
    <div>
      <NavBar />
      <div className="max-w-container  mx-auto min-h-body p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><CurrentUserProfile /></ProtectedRoute>} />
          <Route path="/users/:id" element={<UserProfile />} />
          {/* <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} /> */}
          <Route path="/ideas/create" element={<ProtectedRoute><Idea /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/search" element={<SearchBar />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
