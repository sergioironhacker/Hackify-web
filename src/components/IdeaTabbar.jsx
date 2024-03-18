import { useState } from "react";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import IdeaFullDescription from "./IdeaFullDescription";
import IdeaComments from "./IdeaComments";
import IdeaDetailMain from "./IdeaDetailMain";

const IdeaTabbar = ({ idea }) => {
  const tabs = [
    {
      key: 0,
      title: "Vista general",
      body: <IdeaDetailMain idea={idea} />,
      className: "vista-general-tab",
    },
    {
      key: 1,
      title: "Información completa",
      body: <IdeaFullDescription idea={idea} />,
      className: "descripcion-ampliada-tab",
    },
    {
      key: 2,
      title: "Comentarios",
      body: <IdeaComments />,
      className: "comentarios-tab",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="block">
      <div className="border-t border-gray-200">
        <nav className="flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "w-full py-4 px-1 text-sm font-medium rounded-t-lg focus:outline-none focus:ring-inset focus:ring-tw-primary",
                { "text-green-400": tab.key === activeTab },
                { "text-gray-400": tab.key !== activeTab },
                "custom-tab-button-class"
              )}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">{tabs[activeTab].body}</div>
    </div>
  );
};

export default IdeaTabbar;
