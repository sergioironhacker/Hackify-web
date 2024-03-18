import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
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
      to: "/",
      text: <IdeaIcon />,
    },
    {
      to: "/profile",
      text: <UserIcon />,
    },
    {
      to: "/ideas/create",
      text: <CreateIdeaIcon />,
    },
    {
      to: "/search",
      text: <FindLogo />,
    },
    {
      to: "/user/chats",
      text: <MessageLogo />,
    },
  ];

  const unprotectedRoutes = [
    {
      to: "/login",
      text: "Entra",
    },
    {
      to: "/register",
      text: "Regístrate",
    },
    {
      to: "/about-us",
      text: "Sobre nosotros",
    },
    {
      to: "/",
      text: <HomeLogo />,
    },
  ];

  const getRoutesToShow = () => {
    if (isAuthFetched) {
      return user ? protectedRoutes : unprotectedRoutes;
    } else {
      return unprotectedRoutes;
    }
  };

  const routes = getRoutesToShow();
  const hasUser = isAuthFetched && user;

  return (
    <nav className="bg-green-400 fixed bottom-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to={hasUser ? "/" : "/"} className="text-white flex items-center"></Link>
          </div>
          <div className="hidden md:flex items-center justify-between w-full">
            {routes.map((route, index) => (
              <NavLink
                key={index}
                to={route.to}
                className="text-white hover:bg-green-300 px-3 py-2 rounded-md flex items-center space-x-2"
              >
                {route.text}
              </NavLink>
            ))}
          </div>
          <div className="md:hidden flex items-center justify-center w-full">
            {routes.map((route, index) => (
              <NavLink
                key={index}
                to={route.to}
                className="text-white hover:bg-green-300 px-3 py-2 rounded-md flex items-center space-x-2"
              >
                {route.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
