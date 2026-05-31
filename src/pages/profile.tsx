import { ArrowLeft, Ellipsis, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return <div>
    <header className="flex items-center py-1 px-4">
      <Button onClick={() => navigate(-1)} variant="ghost">
        <ArrowLeft />
      </Button>
      <div>
        <p className="text-[20px] font-bold leading-[24px]">Stas Neprokin</p>
        <p className="text-[#6E767D] text-[13px] leading-[16px]">23 post</p>
      </div>
    </header>
    <div className="px-4">
      <div className="flex items-start justify-between mt-4">
        <img src="https://mockmind-api.uifaces.co/content/human/80.jpg" className="size-[132px] rounded-full object-cover" alt="" />
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="border border-[#6E767D] rounded-full">
            <Ellipsis size={20} />  
          </Button>
          <Button variant="ghost" className="border border-[#6E767D] rounded-full">
            <Mail size={20} />  
          </Button>
          <Button className="rounded-full text-[15px] font-bold leading-[20px] py-2 px-5 text-black bg-white">
            Follow
          </Button>
        </div>
      </div>
    </div>
  </div>
}