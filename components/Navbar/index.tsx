import NavbarHelpModal from "@/components/Navbar/NavbarHelpModal";
import NavbarUserModal from "@/components/Navbar/NavbarUserModal";
import ThemeSelectButton from "@/components/Navbar/ThemeSelectButton";
import { Claims } from "@auth0/nextjs-auth0";
import Hint from "@/components/Navbar/Hint";
import Chat from "./Chat";

interface NavbarProps {
  auth0User?: Claims; // Use Auth0's Claims type
  hideMiddle?: boolean; // If true, hide the center controls.
}

export default function Navbar({ auth0User, hideMiddle }: NavbarProps) {
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
