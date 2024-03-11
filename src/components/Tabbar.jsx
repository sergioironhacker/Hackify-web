import { useContext, useEffect, useState, useMemo } from 'react';
/* import axios from 'axios'; */
import { CogIcon, MoonIcon, SunIcon, TrashIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { logout } from "../stores/AccessTokenStore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUserAccount } from '../services/UserService';
import { ThemeContext } from '../contexts/ThemeContext';
import BookmarkedIdeas from './BookmarkedIdeas';
import AuthContext from '../contexts/AuthContext';


const Tabbar = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const bookmarkedIdeas = useMemo(() => user.ideas.map((bookmark) => ({data: bookmark.idea})), [user.data]);


  useEffect(()=>{
    console.log(theme)
  }, [theme])

  const confirmDeleteAccount = () => {
    toast.warn(
      <div>
        <p>¿Estás seguro de que quieres borrar tu cuenta?</p>
        <button className="mr-2 bg-green-400 text-white px-3 py-1 rounded-md" onClick={deleteAccount}>Sí</button>
        <button className="bg-gray-400 text-white px-3 py-1 rounded-md" onClick={toast.dismiss}>No</button>
      </div>,
      {
        position: "bottom",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false
      }
    );
  };

  const deleteAccount = () => {
    deleteUserAccount() 
      .then(response => {
        console.log("La cuenta del usuario ha sido eliminada correctamente.");
        logout();
      })
      .catch(error => {
        console.error("Error al eliminar la cuenta del usuario:", error);
      });
  };
  const handleLogout = () => {
    toast.warn(
      <div>
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
        <button className="mr-2 bg-green-400 text-white px-3 py-1 rounded-md" onClick={() => {
          logout();
          toast.dismiss();
        }}>Sí</button>
        <button className="bg-gray-400 text-white px-3 py-1 rounded-md" onClick={() => toast.dismiss()}>No</button>
      </div>,
      {
        position: "bottom",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false
      }
    );
  };

  const tabs = [
    {
      key: 0,
      title: 'Mis Ideas',
      body: <>Mis Ideas</>,
      className: 'mis-ideas-tab'
    },
    {
      key: 1,
      title: 'Mis Contribuciones',
      body: <>Mis Contribuciones</>,
      className: 'mis-contribuciones-tab'
    },
    {
      key: 2,
      title: 'Ideas Guardadas',
      body: <BookmarkedIdeas ideas={bookmarkedIdeas} />,
      className: 'ideas-guardadas-tab'
    },
    {
      key: 3,
      title: <CogIcon className="h-5 w-5" />,
      body: null,
      className: 'configuracion-tab'
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="sm:hidden">
      <div className="border-t border-gray-200">
        <nav className="flex" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "w-full py-4 px-1 text-sm font-medium rounded-t-lg focus:outline-none focus:ring-inset focus:ring-tw-primary",
                { "text-green-400": tab.key === activeTab },
                { "text-grey-400": tab.key !== activeTab },
                "custom-tab-button-class"
              )}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        {activeTab !== 3 && tabs[activeTab].body}
        {activeTab === 3 && (
          <>
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>
              <span className="text-sm text-green-500">Cambiar tema</span>
            </div>
            <button
              type="button"
              onClick={confirmDeleteAccount}
              className="w-full py-2 px-4 mt-2 text-sm font-medium rounded-lg text-white bg-green-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-5 w-5 inline-block mr-1" />
              Borrar cuenta
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 px-4 mt-2 text-sm font-medium rounded-lg text-white bg-green-400 hover:bg-tw-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tw-primary"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
      <ToastContainer position="bottom" />
    </div>
  );
};

export default Tabbar;
