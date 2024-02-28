import Tabbar from "../components/Tabbar";
import Avatar from "../components/Avatar";
import MessagingComponent from '../pages/MessagingComponent'; // Importa el componente de mensajería

const Profile = ({ user }) => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-y-4">
        <Avatar avatar={user.data.avatar} />
        <h1 className="font-bold text-2xl">@{user.data.username}</h1>
      </div>

      <Tabbar user={user} />

      {/* Agrega el componente de mensajería aquí */}
      <MessagingComponent />
    </div>
  );
};

export default Profile