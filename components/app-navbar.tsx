"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Search, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery("");
    }
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLogin(false);
    }
  }, [status]);
  return (
    <nav className="fixed top-0 left-[16rem] right-0 h-16 dark:bg-neutral-900 bg-slate-50 shadow-md flex items-center px-4">
      <div className="flex items-center border rounded-lg text-sm w-[20rem]">
        <Search className="mx-2" />
        <input
          className="bg-transparent border-none outline-none w-full py-[0.5rem]"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </div>
      {isLogin && (
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex-1 flex justify-end items-center">
                <User2 className="pr-1" /> {session?.user.username}
                <ChevronDown className="mx-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width] space-y-1 mb-3 rounded-lg"
            >
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    router.push("/account");
                  }}
                  className="min-w-full px-2 rounded-sm"
                >
                  Account
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: `${window.location.origin}/`,
                    })
                  }
                  className="min-w-full px-2 rounded-sm text-red-600 font-bold"
                >
                  Log out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
}
