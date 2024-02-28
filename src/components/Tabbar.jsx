import { /* useMemo, */ useState } from 'react';
import clsx from 'clsx';
/* import ProfileTweets from './ProfileTweets'; */
/* import FavTweets from './FavTweets'; */

const Tabbar = ({ user }) => {
  /* const favTweets = useMemo(() => user.data.likes.map((like) => ({data: like.tweet})), [user.data.likes]); */

  const tabs = [
    {
      key: 0,
      title: 'Mis Ideas',
      body: <> Mis Ideas </>
    },
    {
      key: 1,
      title: 'Mis contribuciones',
      body: <>Mis Contribuciones</>
    },
    {
      key: 2,
      title: 'Ideas Guardadas',
      body: <>Ideas Guardadas</>
    },
    {
      key: 3,
      title: 'Ajustes',
      body: <>Ajustes</> 
    },
  ]

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px justify-between">
          {
            tabs.map(tab => (
              <li className="me-2" key={tab.key}>
                  <button
                    onClick={() => setActiveTab(tab.key)}
                    className={clsx(
                      "inline-block p-4 border-b-2 border-transparent rounded-t-lg",
                      { "text-tw-primary border-tw-primary": tab.key === activeTab},
                      {"hover:text-gray-600 hover:border-gray-300": tab.key !== activeTab}
                    )}
                  >
                    {tab.title}
                  </button>
              </li>
            ))
          }
        </ul>

      </div>
      <div className="">
        {tabs[activeTab].body}
      </div>
    </div>
  )
}

export default Tabbar;