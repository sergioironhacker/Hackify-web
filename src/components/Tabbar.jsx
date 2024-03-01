import { useState } from 'react';
import { CogIcon, MoonIcon, SunIcon, TrashIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { logout } from "../stores/AccessTokenStore"; // Importamos la función logout

const Tabbar = ({ user }) => {
  const [theme, setTheme] = useState('light'); // Estado para controlar el tema (light o dark)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Aquí puedes agregar la lógica para cambiar el tema de tu aplicación
  };

  const deleteAccount = () => {
    // Aquí deberías implementar la lógica para eliminar la cuenta del usuario
    console.log("Eliminar cuenta del usuario...");
  };

  const tabs = [
    {
      key: 0,
      title: 'Mis Ideas',
      body: <>Mis Ideas</>
    },
    {
      key: 1,
      title: 'Mis Contribuciones',
      body: <>Mis Contribuciones</>
    },
    {
      key: 2,
      title: 'Ideas Guardadas',
      body: <>Ideas Guardadas</>
    },
    {
      key: 3,
      title: <CogIcon className="h-5 w-5" />, // Icono de tuerca en lugar de texto
      body: null // No necesitamos un cuerpo para el botón de ajustes
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
                { "text-tw-primary": tab.key === activeTab },
                { "text-airbnb-red": tab.key !== activeTab } // Cambio de clase para el color de texto
              )}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        {activeTab !== 3 && tabs[activeTab].body} {/* Renderizamos el cuerpo solo si no estamos en la pestaña de ajustes */}
        {activeTab === 3 && ( // Si estamos en la pestaña de ajustes, mostramos los botones de ajustes
          <>
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>
              <span className="text-sm text-gray-500">Cambiar tema</span>
            </div>
            <button
              type="button"
              onClick={deleteAccount}
              className="w-full py-2 px-4 mt-2 text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-5 w-5 inline-block mr-1" />
              Borrar cuenta
            </button>
            <button
              type="button"
              onClick={logout}
              className="w-full py-2 px-4 mt-2 text-sm font-medium rounded-lg text-white bg-tw-primary hover:bg-tw-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tw-primary"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tabbar;
