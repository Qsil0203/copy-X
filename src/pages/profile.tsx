import { ArrowLeft, Balloon, BriefcaseBusiness, Calendar, Ellipsis, Link, Mail, MapPinHouse, MessageCircle, Repeat2, Heart, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User } from "../types/user";
import type { Tweet } from "../types/tweet";
import type { Like } from "../types/like";
import type { Comment } from "../types/comment";
import axios from "axios";
import { API_URL } from "../constants/api-url";
import { ROUTES } from "../constants/routes";

export default function ProfilePage() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(null)
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      setError("Пользователь не авторизован")
      navigate("/login")
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate])

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      try {
        const [tweetsRes, likesRes, commentsRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}tweets?userId=${user?.id}`),
          axios.get(`${API_URL}likes?userId=${user?.id}`),
          axios.get(`${API_URL}comments?userId=${user?.id}`),
          axios.get(`${API_URL}users`),
        ]);

        setTweets(tweetsRes.data)
        setLikes(likesRes.data)
        setComments(commentsRes.data)
        setAllUsers(usersRes.data)
      } catch (error) {
        console.error(error)
      }
    }

    loadData();
  }, [user]);

  const usersById = Object.fromEntries(
    allUsers.map(u => [u.id, u])
  );

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  };

  return (
    <div className="w-full bg-black min-h-screen">
      <header className="flex items-center py-1 px-4 border-b border-[#6E767D]">
        <Button onClick={() => navigate(-1)} variant="ghost">
          <ArrowLeft />
        </Button>
        <div>
          <p className="text-[20px] font-bold leading-[24px]">{user?.username}</p>
          <p className="text-[#6E767D] text-[13px] leading-[16px]">{tweets.length} post</p>
        </div>
      </header>
      
      <div className="px-4">
        <div className="flex items-start gap-3 mt-4">
          <img 
            src={user?.avatarUrl} 
            className="size-[132px] rounded-full object-cover" 
            alt="Avatar" 
          />
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-bold leading-[24px]">{user?.username}</p>
              <p className="text-[13px] font-normal leading-[16px] text-[#6E767D]">@{user?.username}</p>
            </div>
            
            <div className="flex mt-3 items-center gap-3 flex-wrap">
              <div className="flex gap-1 text-[#6E767D] items-center">
                <BriefcaseBusiness size={16} />
                <p className="text-[15px] leading-[20px]">Entrepreneur</p>
              </div>
              <div className="flex gap-1 text-[#6E767D] items-center">
                <MapPinHouse size={16} />
                <p className="text-[15px] leading-[20px]">Earth</p>
              </div>
              <div className="flex gap-1 text-[#6E767D] items-center">
                <Link size={16} />
                <p className="text-[15px] text-[#1D9BF0] leading-[20px]">{user?.avatarUrl}</p>
              </div>
              <div className="flex gap-1 text-[#6E767D] items-center">
                <Balloon size={16} />
                <p className="text-[15px] leading-[20px]">Born November 7, 1987</p>
              </div>
              <div className="flex gap-1 text-[#6E767D] items-center">
                <Calendar size={16} />
                <p className="text-[15px] leading-[20px]">Joined November 2010</p>
              </div>
              <div className="flex gap-1 text-[#6E767D] items-center">
                <Mail size={16} />
                <p className="text-[15px] leading-[20px]">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <Button variant="ghost" className="border border-[#6E767D] rounded-full">
                <Ellipsis size={20} />
              </Button>
              <Button variant="ghost" className="border border-[#6E767D] rounded-full">
                <Mail size={20} />
              </Button>
              <Button 
                onClick={handleLogout} 
                className="rounded-full text-[15px] font-bold py-2 px-5 text-white bg-[#6E767D]"
              >
                Logout
              </Button>
            </div>
            
            <div className="flex gap-6 mt-6 border-t border-[#6E767D] pt-4">
              <div>
                <p className="text-[20px] font-bold">{tweets.length}</p>
                <p className="text-[#6E767D] text-[13px]">Posts</p>
              </div>
              <div>
                <p className="text-[20px] font-bold">{likes.length}</p>
                <p className="text-[#6E767D] text-[13px]">Likes</p>
              </div>
              <div>
                <p className="text-[20px] font-bold">{comments.length}</p>
                <p className="text-[#6E767D] text-[13px]">Comments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 mt-4">
        <h2 className="text-[20px] font-bold mb-4">Мои твиты</h2>
        {tweets.length === 0 && <p className="text-[#6E767D]">Нет твитов</p>}
        <ul className="flex flex-col w-full">
          {tweets.map(tweet => {
            const author = usersById[tweet.userId];
            if (!author) return null;
            const likesCount = likes.filter(like => like.tweetId == tweet.id).length;
            const commentsCount = comments.filter(comment => comment.commentId == tweet.id).length;
            return (
              <li key={tweet.id} className="w-full px-16 m-2">
                <div className="flex gap-3 py-3 px-4 border-b border-[#6E767D] w-full">
                  <Link to={ROUTES.PROFILE}>
                    <img src={author.avatarUrl} className="size-[48px] rounded-full object-cover" alt="Avatar" />
                  </Link>
                  <div className="w-full">
                    <header className="flex items-center gap-1 text-[15px]">
                      <p className="font-bold">{author.nickname}</p>
                      <p className="text-[#6E767D]">@{author.username}</p>
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
            );
          })}
        </ul>
      </div>
      <div className="px-4 mt-6">
        <h2 className="text-[20px] font-bold mb-2">Мои комментарии</h2>
        {comments.length === 0 && <p className="text-[#6E767D] mb-4 ">Нет комментариев</p>}
      </div>
    </div>
  );
}