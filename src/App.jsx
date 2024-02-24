import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile';
import CurrentUserProfile from './pages/CurrentUserProfile';
import Timeline from './pages/Timeline';
import Form from './pages/Form';
import FormsList from './pages/FormsList';

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
          <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
          <Route path="/create-form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
          <Route path="/view-forms" element={<ProtectedRoute><FormsList /></ProtectedRoute>} /> {/* Agrega esta línea para la nueva ruta */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
