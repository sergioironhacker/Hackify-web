import { Link, NavLink } from "react-router-dom";
import OnlyHackLogo from "../assets/OnlyHackLogo";
import { useContext } from "react";
import AuthContext from '../contexts/AuthContext';
import { logout } from "../stores/AccessTokenStore";

const Navbar = () => {
  const { user, isAuthFetched } = useContext(AuthContext)

  const protectedRoutes = [
    {
      to: '/timeline',
      text: 'Timeline'
    },
    {
      to: '/profile',
      text: 'Profile'
    },
  ]

  const unprotectedRoutes = [
    {
      to: '/login',
      text: 'Login'
    },
    {
      to: '/register',
      text: 'Register'
    },
  ];

  const getRoutesToShow = () => {
    if (isAuthFetched) {
      if (user) {
        return protectedRoutes;
      } else {
        return unprotectedRoutes;
      }
    } else {
      return unprotectedRoutes; // Si la autenticación no se ha completado, mostrar las rutas desprotegidas
    }
  };

  const routes = getRoutesToShow()

  const hasUser = isAuthFetched && user;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-3 h-[70px] flex items-center">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto w-full">
        <Link to={hasUser ? "/timeline" : "/"} className="text-3xl text-blue-400 hover:text-blue-600">
          <OnlyHackLogo />
        </Link>

        <div className="flex gap-x-3">
          {routes ? routes.map((route) => (
            <NavLink key={route.to} to={route.to} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200">
              {route.text}
            </NavLink>
          )) : null}
          {hasUser ? (
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
              onClick={logout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
