"use client";

import NavbarHelpModal from "@/components/Navbar/NavbarHelpModal";
import NavbarUserModal from "@/components/Navbar/NavbarUserModal";
import ThemeSelectButton from "@/components/Navbar/ThemeSelectButton";
import { Claims } from "@auth0/nextjs-auth0";
import Hint from "@/components/Navbar/Hint";
import Chat from "./Chat";
import SettingsButton from "./SettingsButton";
import Link from "next/link";

interface NavbarProps {
  auth0User?: Claims;
  hideMiddle?: boolean;
}

export default function Navbar({ auth0User, hideMiddle }: NavbarProps) {
  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-0 sm:px-2 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left - Logo */}
          <Logo />

          {/* Middle - Hint & Chat */}
          {!hideMiddle && <MiddleSection />}

          {/* Right - Theme, Settings, and User/Auth */}
          <RightSection auth0User={auth0User} />
        </div>
      </div>
    </div>
  );
}

// Left Logo Component
const Logo = () => (
  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
    <Link href="/" className="text-xl font-bold text-primary">
      CodeyAI
    </Link>
  </div>
);

// Middle Section Component
const MiddleSection = () => (
  <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row gap-2 items-center bg-primary px-6 py-2 rounded-full">
    <Hint />
    <div className="text-background text-sm px-5">Ask Codey</div>
    <Chat />
  </div>
);

// Right Section (Theme, Settings, Auth/User)
const RightSection = ({ auth0User }: { auth0User?: Claims }) => (
  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
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
);

// Authentication Buttons
const AuthButtons = () => (
  <div className="flex items-center gap-2">
    <Link
      href="/api/auth/login"
      className="px-4 py-2 text-sm font-medium bg-primary dark:bg-gray-800 text-white rounded-lg hover:bg-primary/90 dark:hover:bg-gray-700 transition-colors"
    >
      Login
    </Link>
  </div>
);
