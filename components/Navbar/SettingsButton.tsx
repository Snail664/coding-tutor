"use client";

import { Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store";
import { disableWalkthroughThunk, enableWalkthroughThunk } from "@/slices/AuthSlice";

export default function SettingsButton() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleWalkthroughToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent event from bubbling up
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center justify-between w-full" onClick={(e) => e.stopPropagation()}>
            <span>Skip Walkthrough</span>
            <input 
              type="checkbox" 
              checked={user?.isWalkthroughEnabled}
              onChange={handleWalkthroughToggle}
              className="ml-2"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 