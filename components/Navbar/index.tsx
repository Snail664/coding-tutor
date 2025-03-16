"use client";

import NavbarHelpModal from "@/components/Navbar/NavbarHelpModal";
import NavbarUserModal from "@/components/Navbar/NavbarUserModal";
import ThemeSelectButton from "@/components/Navbar/ThemeSelectButton";
import { Claims } from "@auth0/nextjs-auth0";
import Hint from "@/components/Navbar/Hint";
import Chat from "./Chat";
import SettingsButton from "./SettingsButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  auth0User?: Claims;
  hideMiddle?: boolean;
}

export default function Navbar({ auth0User, hideMiddle }: NavbarProps) {
  const pathname = usePathname();
  const isQuestionPage = pathname?.includes('/questions/');
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex h-16 items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-primary flex items-center">
            <span className="bg-primary text-white px-2 py-1 rounded mr-1">C</span>
            <span>odeyAI</span>
          </Link>
        </div>

        {/* Middle - Ask Codey - Only show on question pages */}
        {isQuestionPage && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row gap-2 items-center bg-primary px-6 py-2 rounded-full">
            <Hint />
            <div className="text-background text-sm px-5">Ask Codey</div>
            <Chat />
          </div>
        )}

        {/* Right - Theme, Settings, Auth/User */}
        <div className="flex items-center space-x-3">
          <NavbarHelpModal />
          <ThemeSelectButton />
          <SettingsButton />
          {auth0User ? (
            <NavbarUserModal
              name={auth0User.name ?? ""}
              email={auth0User.email ?? ""}
              sub={auth0User.sub ?? ""}
            />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </div>
  );
}

// Authentication Buttons
const AuthButtons = () => (
  <div className="flex items-center">
    <Link
      href="/api/auth/login"
      className="px-4 py-2 text-sm font-medium bg-primary dark:bg-gray-800 text-white rounded-lg hover:bg-primary/90 dark:hover:bg-gray-700 transition-colors"
    >
      Login
    </Link>
  </div>
);
