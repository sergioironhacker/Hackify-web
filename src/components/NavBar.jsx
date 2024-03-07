import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import FindLogo from "../assets/FindLogo";
import MessageLogo from "../assets/MessageLogo";
import UserIcon from "../assets/UserIcon";
import IdeaIcon from "../assets/IdeaIcon";
import CreateIdeaIcon from "../assets/CreateIdeaIcon";
import HomeLogo from "../assets/HomeLogo";


const Navbar = () => {
  const { user, isAuthFetched } = useContext(AuthContext);

  const protectedRoutes = [
    {
      to: '/',
      text:<IdeaIcon />
    },
    {
      to: '/profile',
      text: <UserIcon />
    },
    {
      to: '/ideas/create',
      text: < CreateIdeaIcon />
    },

    {
      to: '/search',
      text:<FindLogo />
    },
    {
      to: '/user/chats',
      text: <MessageLogo />
    }
  ];

  const unprotectedRoutes = [
    {
      to: '/login',
      text: 'Login'
    },
    {
      to: '/register',
      text: 'Register'
    },
    {
      to: '/about-us',
      text: 'About us'
    },
    {
      to: '/',
      text: <HomeLogo />
    }
   
  ];

  const getRoutesToShow = () => {
    if (isAuthFetched) {
      return user ? protectedRoutes : unprotectedRoutes;
    } else {
      return unprotectedRoutes; // Si la autenticación no se ha completado, mostrar las rutas desprotegidas
    }
  };

  const routes = getRoutesToShow();
  const hasUser = isAuthFetched && user;

  return (
    <nav className="bg-green-400 fixed bottom-0 w-full z-10">
     <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-0">
        <div className="flex items-center justify-around h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to={hasUser ? "/" : "/"} className="text-white flex items-center">
           
              </Link>
            </div>
            <div className="ml-4 flex md:hidden">
              {routes.map((route, index) => (
                <NavLink
                  key={index}
                  to={route.to}
                  className="text-white hover:bg-green-300 px-3 py-2 rounded-md text-sm font-medium flex items-center "
                  style={{ marginRight: '21px' }} // Agrega margen entre los elementos NavLink
                >
                  
                  {route.text}
                </NavLink>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
