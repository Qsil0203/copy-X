import { Download, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "../components/ui/button";

export default function HomePage() {
  return <div>
    <ul className="flex flex-col">
      <li>
        <div className="flex gap-3 py-3 px-4 border-b border-[#6E767D]">
          <img src="https://mockmind-api.uifaces.co/content/human/80.jpg" className="size-[48px] rounded-full object-cover" alt="" />
          <div>
            <header className="flex items-center gap-1 text-[15px]">
              <p className="font-bold">CNN</p>
              <p className="text-[#6E767D]">@CNN</p>
              <p className="text-[#6E767D]">.</p>
              <p className="text-[#6E767D]">7m</p>
            </header>
            <p className="text-[15px] text-[#D9D9D9]">President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.</p>
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
    </ul>
  </div>
}