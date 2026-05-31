import { Download, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import type { User } from "../types/user";
import { POSTS_SERVICE } from "../services/posts";
import { USERS_SERVICE } from "../services/users";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [users, posts] = await Promise.all([
          USERS_SERVICE.getAll(),
          POSTS_SERVICE.getAll()
        ])

        setPosts(posts);
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }

    loadData()
  }, []);

  const usersById = Object.fromEntries(
    users.map(user => [String(user.id), user])
  )

  return <div>
    <ul className="flex flex-col">
      {posts.map(post => {
        const user = usersById[String(post.userId)];

        return <li>
        <div className="flex gap-3 py-3 px-4 border-b border-[#6E767D]">
          <Link className="shrink-0" to={ROUTES.PROFILE}>
            <img src={user.avatarUrl} className="size-[48px] rounded-full object-cover" alt="" />
          </Link>
          <div>
            <header className="flex items-center gap-1 text-[15px]">
              <p className="font-bold">{user.firstName}</p>
              <p className="text-[#6E767D]">@{user.username}</p>
              <p className="text-[#6E767D]">.</p>
              <p className="text-[#6E767D]">{new Date(post.createdAt).getDate()} мая</p>
            </header>
            <p className="text-[15px] text-[#D9D9D9]">{post.content}</p>
            <div className="flex items-center justify-between mt-3">
              <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D]">
                <MessageCircle />
                <p>58</p>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D]">
                <Repeat2 />
                <p>58</p>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 px-[13px] py-[9px] text-[#6E767D]">
                <Heart />
                <p>58</p>
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