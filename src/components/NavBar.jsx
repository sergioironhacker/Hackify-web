import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import OnlyHackLogo from "../assets/OnlyHackLogo";
import AuthContext from '../contexts/AuthContext';
import { logout } from "../stores/AccessTokenStore";

const Navbar = () => {
  const { user, isAuthFetched } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const protectedRoutes = [
    {
      to: '/timeline',
      text: 'Business'
    },
    {
      to: '/profile',
      text: 'Profile'
    },
    {
      to: '/ideas/create',
      text: 'Crear Idea'
    },
    {
      to: '/ideas',
      text: 'Ideas' 
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
      to: '/create-form',
      text: 'Create Form'
    },
    {
      to: '/view-forms',
      text: 'View Forms' // Cambia el texto a 'View Forms' para diferenciarlo de 'Create Form'
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
    <nav className="bg-red-500 fixed bottom-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to={hasUser ? "/" : "/"} className="text-white">
                <OnlyHackLogo />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {routes &&
                  routes.map((route) => (
                    <NavLink
                      key={route.to}
                      to={route.to}
                      className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {route.text}
                    </NavLink>
                  ))}
                {hasUser ? (
                  <button
                    type="button"
                    className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {routes &&
            routes.map((route) => (
              <NavLink
                key={route.to}
                to={route.to}
                className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {route.text}
              </NavLink>
            ))}
          {hasUser ? (
            <button
              type="button"
              className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button >
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
