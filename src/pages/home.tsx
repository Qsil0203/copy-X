import { CalendarArrowDown, CalendarArrowUp, Download, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import type { User } from "../types/user";
import type { Like } from "../types/like";
import type { Comment } from "../types/comment";
import { POSTS_SERVICE } from "../services/posts";
import { USERS_SERVICE } from "../services/users";
import { Likes_SERVICE } from "../services/likes";
import { COMMENTS_SERVICE } from "../services/comments";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newFirst, setNewFirst] = useState(true)

useEffect(() => {
  async function loadData() {
    try {
      const [users, posts, likes, comments] = await Promise.all([
        USERS_SERVICE.getAll(),
        POSTS_SERVICE.getAll(),
        Likes_SERVICE.getAll(),
        COMMENTS_SERVICE.getAll(),
      ]);

      setPosts(posts);
      setUsers(users);
      setLikes(likes);    
      setComments(comments); 
    } catch (error) {
      console.error(error);
    }
  }

  loadData();
}, []);

  const sortedPosts = posts.sort((a, b) => {
    if (newFirst) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const usersById = Object.fromEntries(
    users.map(user => [String(user.id), user])
  )

  return <div className="w-full">
    <nav className="flex items-center justify-around px-4 py-3 border-b border-[#6E767D] bg-black-100">
      <button onClick={() => setNewFirst(!newFirst)}
        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
        {!newFirst ? (
            <CalendarArrowUp className="w-5 h-5" />
          ) : (
            <CalendarArrowDown className="w-5 h-5" />
          )}
      </button>
    
    </nav>
    <hr/>
    <ul className="flex flex-col  w-full">
      {posts.map(post => {
        const user = usersById[String(post.userId)];
        if (!user){
          return null
        }

        const likesCount = likes.filter(like => like.tweetId == post.id).length;
        const commentsCount = comments.filter(comment => comment.commentId == post.id).length;

        return <li>
        <div className="flex gap-3 py-3 px-4 border-b border-[#6E767D] w-full ">
          <Link className="shrink-0" to={ROUTES.PROFILE}>
            <img src={user.avatarUrl}  className="size-[48px] rounded-full object-cover" alt="Avatar" />
          </Link>
          <div >
            <header className="flex items-center gap-1 text-[15px]">
              <p className="font-bold">{user.firstName}</p>
              <p className="text-[#6E767D]">@{user.username}</p>
              <p className="text-[#6E767D]">.</p>
              <p className="text-[#6E767D]">{new Date(post.createdAt).toLocaleDateString()}</p>
            </header>
            <p className="text-[15px] text-[#D9D9D9] w-full">{post.content}</p>
            <div className="flex items-center justify-between mt-3  ">
              <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D] ">
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
  </div>
}