import { Download, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import { POSTS_SERVICE } from "../services/posts";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      setPosts(await POSTS_SERVICE.getAll());
    }
    getPosts();
  }, []);

  return <div>
    <ul className="flex flex-col">
      {posts.map(post => (
      <li>
        <div className="flex gap-3 py-3 px-4 border-b border-[#6E767D]">
          <Link className="shrink-0" to={ROUTES.PROFILE}>
            <img src="https://mockmind-api.uifaces.co/content/human/80.jpg" className="size-[48px] rounded-full object-cover" alt="" />
          </Link>
          <div>
            <header className="flex items-center gap-1 text-[15px]">
              <p className="font-bold">CNN</p>
              <p className="text-[#6E767D]">@CNN</p>
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
      ))}
    </ul>
  </div>
}