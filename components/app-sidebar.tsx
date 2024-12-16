"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ui/mode-toggle";

import Gems from "@/public/assets/Gems.png";
import Image from "next/image";
import {
  ChartBarIcon,
  History,
  Home,
  SaveIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Price Prediction",
    icon: ChartBarIcon,
    url: "/price-prediction",
  },
  {
    title: "Marketplace",
    icon: ShoppingCart,
    url: "/marketplace",
  },
  {
    title: "Wishlist",
    icon: SaveIcon,
    url: "/wishlist",
  },
  {
    title: "Transactions",
    icon: History,
    url: "/transactions",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar collapsible="none" className="flex flex-col fixed border-r-2">
      <SidebarHeader />
      <SidebarGroupLabel>
        <Image src={Gems} alt="" width={30} className="mx-1" />
        <div className="text-2xl font-bold">Aurora Gems</div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </SidebarGroupLabel>
      <div className="mt-5 mx-3 flex-grow h-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <div
                    className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                      isActive(item.url)
                        ? "dark:bg-blue-800 bg-purple-500 text-white"
                        : "bg-transparent hover:bg-gray-200 hover:dark:bg-slate-900"
                    }`}
                  >
                    <item.icon className="mr-3" />
                    <span className="font-semibold text-sm">{item.title}</span>
                  </div>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </div>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
