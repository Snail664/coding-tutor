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
    <div className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left side */}
          <div className="flex items-center pl-2">
            <Link href="/" className="text-xl font-bold text-primary">
              Codey
            </Link>
          </div>

          {/* Middle section with Hint and Chat buttons */}
          {!hideMiddle && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row gap-2 items-center bg-primary px-6 py-2 rounded-full">
              <Hint />
              <div className="text-background text-sm px-5">Ask Codey</div>
              <Chat />
            </div>
          )}

          {/* Right side buttons */}
          <div className="flex items-center gap-3 pr-4">
            <ThemeSelectButton />
            <SettingsButton />
            {auth0User ? (
              <NavbarUserModal
                name={auth0User.name ?? ""}
                email={auth0User.email ?? ""}
                sub={auth0User.sub ?? ""}
              />
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/api/auth/login"
                  className="px-4 py-2 text-sm font-medium bg-primary dark:bg-gray-800 text-white rounded-lg hover:bg-primary/90 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
