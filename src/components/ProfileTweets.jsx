import { useState, useEffect, useContext } from 'react'
import { getUserTweets } from '../services/UserService';
import Tweet from './Tweet';
import AuthContext from '../contexts/AuthContext';

const ProfileTweets = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserTweets(userId)
      .then(DBTweets => {
        setTweets(DBTweets)
        setLoading(false)
      })
  }, [userId])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {tweets.map(tweet => (
        <Tweet {...tweet} key={tweet.data.id} isLiked={user.data.likes.some(like => like.tweet === tweet.data.id)} />
      ))}
    </div>
  )
}

export default ProfileTweets