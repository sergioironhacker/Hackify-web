import { Link } from "react-router-dom"
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline'
import Avatar from "./Avatar"
import { useState } from "react"
import { toggleLike } from "../services/UserService"

const Tweet = ({ data, likes, isLiked, showLikeButton = true }) => {
  const [numLikes, setNumLikes] = useState(likes)
  const [like, setLike] = useState(isLiked);

  const handleLike = () => {
    toggleLike(data.user.id, data.id)
      .then(() => {
        setNumLikes(like ? numLikes - 1 : numLikes + 1)
        setLike(!like)
      })
  }

  return (
    <div className="border-b p-2 flex gap-x-2">
      <Link to={`/users/${data.user.id}`}>
        <Avatar avatar={data.user.avatar} />
      </Link>
      <div>
        <p className="font-bold text-base">@{data.user.username}</p>
        <p className="mt-2 text-sm">{data.content}</p>

        {showLikeButton && (
          <div onClick={handleLike} className="mt-3 flex gap-x-1 items-center text-tw-dark-gray text-xs cursor-pointer">
            {like ? (
              <HeartIcon className="h-3 fill-red-600" />
            ) : (
              <OutlineHeartIcon className="h-3" />
            )}
            {numLikes}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tweet