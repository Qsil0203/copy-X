import { CalendarArrowDown, CalendarArrowUp, Download, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useEffect, useState } from "react";
import type { Tweet } from "../types/tweet";
import type { User } from "../types/user";
import type { Like } from "../types/like";
import type { Comment } from "../types/comment";
import { TWEETS_SERVICE } from "../services/tweets";
import { USERS_SERVICE } from "../services/users";
import { Likes_SERVICE } from "../services/likes";
import { COMMENTS_SERVICE } from "../services/comments";
import { Textarea } from "../components/ui/textarea";


export default function HomePage() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [newFirst, setNewFirst] = useState(true)
  const [tweetText, setTweetText] = useState("")
  const [currentUser, setCurrentUser] = useState<User | null>(null)


  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, []);


  useEffect(() => {
    async function loadData() {
      try {
        const [users, tweets, likes, comments] = await Promise.all([
          USERS_SERVICE.getAll(),
          TWEETS_SERVICE.getAll(),
          Likes_SERVICE.getAll(),
          COMMENTS_SERVICE.getAll(),
        ]);
        setTweets(tweets)
        setUsers(users)
        setLikes(likes)
        setComments(comments)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [])


  const sortedTweets = tweets.sort((a, b) => {
    if (newFirst) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  })


  const usersById = Object.fromEntries(
    users.map(user => [String(user.id), user])
  )


  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();


    const newTweet = await TWEETS_SERVICE.create({
        userId: currentUser?.id,
        content: tweetText,
        createdAt: new Date().toISOString(),
    });
    
    console.log('Created tweet:', newTweet)
    
    if (newTweet) {
      tweets.push(newTweet)
      setTweets(tweets)
    }
    
    setTweetText("")
  }


  return <div className="w-full min-h-screen bg-black">
    <form onSubmit={handleSubmit} className="flex flex-col m-5 gap-3">
      <Textarea 
        onChange={(e) => setTweetText(e.target.value)} 
        placeholder="What's happening?" 
        className="w-full min-h-[100px] text-[15px] bg-[#000000] text-[#D9D9D9] border-[#6E767D] placeholder-[#6E767D] focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] resize-none"
      />
      <div className="flex items-center justify-end gap-2">
        <button 
          type="button"   
          onClick={(e) => {
            e.preventDefault();   
            setNewFirst(!newFirst);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          {!newFirst ? (
            <CalendarArrowUp className="w-5 h-5" />
          ) : (
            <CalendarArrowDown className="w-5 h-5" />
          )}
        </button>
        
        <Button type="submit" className="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white" disabled={tweetText.trim() == ""}>
          Tweet
        </Button>
      </div>
    </form>


    <hr className="border-[#6E767D]"/>
    
    <ul className="flex flex-col w-full">
      {sortedTweets.map(tweet => {
        const user = usersById[String(tweet.userId)];
        if (!user){
          return null;
        }


        const likesCount = likes.filter(like => String(like.tweetId) == tweet.id).length;
        const commentsCount = comments.filter(comment => String(comment.commentId) == tweet.id).length;


        return <li className="w-full">
          <div className="flex gap-3 py-3 px-4 border-b border-[#6E767D] w-full">
            <Link className="shrink-0" to={ROUTES.PROFILE}>
              <img src={user.avatarUrl} className="size-[48px] rounded-full object-cover" alt="Avatar" />
            </Link>
            <div className="w-full">
              <header className="flex items-center gap-1 text-[15px]">
                <p className="font-bold">{user.nickname}</p>
                <p className="text-[#6E767D]">@{user.username}</p>
                <p className="text-[#6E767D]">.</p>
                <p className="text-[#6E767D]">{new Date(tweet.createdAt).toLocaleDateString()}</p>
              </header>
              <p className="text-[15px] text-[#D9D9D9] w-full">{tweet.content}</p>
              <div className="flex items-center justify-between mt-3">
                <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D]">
                  <MessageCircle />
                  <p>{commentsCount}</p>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D]">
                  <Repeat2 />
                  <p>58</p>
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D]">
                  <Heart />
                  <p>{likesCount}</p>
                </Button>
                <Button variant="ghost" className="px-[13px] py-[9px] text-[#6E767D]">
                  <Download />
                </Button>
              </div>
            </div>
          </div>
        </li>
      })}
    </ul>
  </div>;
}