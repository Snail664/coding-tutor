"use client";

import NavbarHelpModal from "@/components/Navbar/NavbarHelpModal";
import NavbarUserModal from "@/components/Navbar/NavbarUserModal";
import ThemeSelectButton from "@/components/Navbar/ThemeSelectButton";
import { Claims } from "@auth0/nextjs-auth0";
import Hint from "@/components/Navbar/Hint";
import Chat from "./Chat";
import { Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store";
import { disableWalkthroughThunk, enableWalkthroughThunk } from "@/slices/AuthSlice";

interface NavbarProps {
  auth0User?: Claims; // Use Auth0's Claims type
  hideMiddle?: boolean; // If true, hide the center controls.
}

export default function Navbar({ auth0User, hideMiddle }: NavbarProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleWalkthroughToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const checked = e.target.checked;
    try {
      if (checked) {
        await dispatch(disableWalkthroughThunk()).unwrap();
      } else {
        await dispatch(enableWalkthroughThunk()).unwrap();
      }
    } catch (error) {
      console.error('Error toggling walkthrough:', error);
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-between mb-2 text-sm font-bold">
      {/* header left */}
      <div>The Coding Tutor</div>
      {/* header center */}
      {!hideMiddle && (
        <div className="flex flex-row gap-2 items-center bg-primary px-20 py-2 rounded-full">
          <Hint />
          <div className="text-background text-sm px-5">Ask Codey</div>
          <Chat />
        </div>
      )}
      {/* header right */}
      <div className="flex flex-row gap-2 items-center">
        <NavbarHelpModal />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between w-full">
                <span>Skip Walkthrough</span>
                <input 
                  type="checkbox" 
                  checked={!user?.isWalkthroughEnabled}
                  onChange={handleWalkthroughToggle}
                  onClick={(e) => e.stopPropagation()}
                  className="ml-2"
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeSelectButton />
        {auth0User && (
          <NavbarUserModal
            name={auth0User.name ?? ""}
            email={auth0User.email ?? ""}
            sub={auth0User.sub ?? ""}
          />
        )}
        {!auth0User && <a href="/api/auth/login">Login</a>}
      </div>
    </div>
  );
}
