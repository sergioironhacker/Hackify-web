import Tabbar from "../components/Tabbar";
import Avatar from "../components/Avatar";

const Profile = ({ user }) => {

  return (
    <div className="p-4 ">
      <div className="flex items-center gap-4">
        <Avatar avatar={user.avatar} />
        <div>
          <h1 className="font-bold text-xl lg:text-2xl text-green-500">{user.username}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>

      <Tabbar user={user} />
    </div>
  );
};

export default Profile;
