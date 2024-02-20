import Tabbar from "../components/Tabbar";
import Avatar from "../components/Avatar";

const Profile = ({ user }) => {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Avatar avatar={user.data.avatar} />
        <h1 className="font-bold text-2xl">@{user.data.username}</h1>
      </div>

      <Tabbar user={user} />
    </div>
  )
}

export default Profile