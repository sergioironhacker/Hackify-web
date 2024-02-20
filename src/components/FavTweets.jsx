import Tweet from "./Tweet"

const FavTweets = ({tweets}) => {
  console.log(tweets)
  if (tweets && tweets.length === 0) {
    <p>You have no likes yet</p>
  }

  return (
    <div>
      {tweets.map(tweet => (
        <Tweet {...tweet} key={tweet.data.id} isLiked showLikeButton={false} />
      ))}
    </div>
  )
}

export default FavTweets