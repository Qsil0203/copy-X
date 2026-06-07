import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Bird,
  Compass,
  Bell,
  Mail,
  Bookmark,
  List,
  User,
  MoreHorizontal,
  Birdhouse,
} from "lucide-react"

import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar className="border-r flex flex-col h-screen" variant="sidebar" collapsible="none">
      <SidebarHeader className="h-14 border-b px-4 ">
        <div className="font-semibold">
          <Bird />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Birdhouse className="mr-3 h-5 w-5" />
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Compass className="mr-3 h-5 w-5" />
                  Explore
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Bell className="mr-3 h-5 w-5" />
                  Notifications
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Mail className="mr-3 h-5 w-5" />
                  Messages
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <Bookmark className="mr-3 h-5 w-5" />
                  Bookmarks
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <List className="mr-3 h-5 w-5" />
                  Lists
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <User className="mr-3 h-5 w-5" />
                  <Link to="/profile">
                    Profile
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg">
                  <MoreHorizontal className="mr-3 h-5 w-5" />
                  More
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6 flex justify-center">
          <button className="w-full max-w-[200px] rounded-full bg-blue-500 py-3 text-center font-bold text-white transition hover:bg-blue-600">
            Tweet
          </button>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <Link to="/profile" className="flex items-center gap-3 rounded-full p-2 ">
            <img
            src="https://www.flaticon.com/ru/free-icon/avatar_266033"  
            className="size-10 rounded-full object-cover"
            alt="Avatar"
            />
            <div className="flex flex-col">
            <p className="text-sm font-bold">Biba</p>
            <p className="text-sm text-[#6E767D]">@Bibovich</p>
            </div>
        </Link>
       </SidebarFooter>
    </Sidebar>
  )
}