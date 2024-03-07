import React from 'react'
import { BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { ThemeProviderWrapper } from './contexts/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProviderWrapper>
        <App />
        </ThemeProviderWrapper>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
