import { useContext, useEffect, useState } from "react"
import { createTweet, getTimeline } from "../services/TweetsService";
import Tweet from "../components/Tweet";
import AuthContext from "../contexts/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

function removeDuplicates(array) {
  const uniqueArray = [];
  const seenIds = []

  array.forEach((item) => {
    if (seenIds.includes(item.data.id)) {
      // Este no se pushea
    } else {
      uniqueArray.push(item);
      seenIds.push(item.data.id)
    }
  })

  return uniqueArray;
}

const TWEETS_PER_PAGE = 2;

const Timeline = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canShowButton, setCanShowButton] = useState(true);


  const [tweetText, setTweetText] = useState('');

  const onChange = (event) => {
    const value = event.target.value

    setTweetText(value);
  }

  useEffect(() => {
    // Petición para traerme la timeline
    getTimeline(page)
      .then(tweetsFromApi => {
        if (tweetsFromApi.length < TWEETS_PER_PAGE) {
          setCanShowButton(false)
        }

        setTweets((prevTweets) => { // En un set, el parametro puede ser una funcion donde el primer argumento es el valor anterior
          return removeDuplicates([...prevTweets, ...tweetsFromApi])
        })
        setLoading(false);
      })
  }, [page])

  const handlePage = () => {
    setPage(page + 1)
    setLoading(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (tweetText) {
      createTweet(tweetText)
        .then(tweet => {
          setTweetText('')

          const newTweet = {
            data: {...tweet, user: user.data},
            likes: 0
          }

          setTweets([newTweet, ...tweets])
        })
        .catch(err => console.error(err))
    }
  }

  const isValid = tweetText.length > 1;

  return (
    <div>

      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          label="¿En qué estás pensando hoy?"
          onChange={onChange}
          value={tweetText}
        />
        <Button text="Twittear" disabled={!isValid} />
      </form>

      <div className="mt-4">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.data.id}
            isLiked={user.data.likes.some(like => like.tweet === tweet.data.id)}
            {...tweet} />
        ))}
        {loading ? <p>Loading...</p> : null }
        {!loading && canShowButton ? (
          <Button text="Get more tweets" extraClassName="mt-3" onClick={handlePage} />
        ) : null}
      </div>
    </div>
  )
}

export default Timeline