import { useState } from 'react';
import { CogIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

const Tabbar = ({ user }) => {
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
      body: <>Ajustes</> 
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
        {tabs[activeTab].body}
      </div>
    </div>
  );
};

export default Tabbar;
