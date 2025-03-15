"use client";

import { Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store";
import { disableWalkthroughThunk, enableWalkthroughThunk, fetchUserDataThunk } from "@/slices/AuthSlice";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function SettingsButton() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Fetch user data when component mounts if user is authenticated but data isn't loaded
  useEffect(() => {
    if (isAuthenticated && !user && !isLoading) {
      dispatch(fetchUserDataThunk());
    }
  }, [dispatch, isAuthenticated, user, isLoading]);

  const handleWalkthroughToggle = async (checked: boolean) => {
    try {
      if (!isAuthenticated) {
        // If not authenticated, redirect to login
        window.location.href = "/api/auth/login";
        return;
      }

      if (checked) {
        // When switch is turned ON, enable walkthrough
        await dispatch(enableWalkthroughThunk()).unwrap();
        sessionStorage.removeItem('walkthroughDisabled');
      } else {
        // When switch is turned OFF, disable walkthrough
        await dispatch(disableWalkthroughThunk()).unwrap();
        sessionStorage.setItem('walkthroughDisabled', 'true');
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
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white dark:bg-gray-800 shadow-lg"
      >
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center space-x-2 w-full" onClick={(e) => e.stopPropagation()}>
            <Switch 
              id="walkthrough-mode"
              checked={user?.isWalkthroughEnabled ?? true}
              onCheckedChange={handleWalkthroughToggle}
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
            />
            <Label 
              htmlFor="walkthrough-mode" 
              className={`cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
            >
              Walkthrough Mode
            </Label>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}