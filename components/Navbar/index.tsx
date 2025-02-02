import NavbarHelpModal from "@/components/Navbar/NavbarHelpModal";
import NavbarUserModal from "@/components/Navbar/NavbarUserModal";
import ThemeSelectButton from "@/components/Navbar/ThemeSelectButton";
import { Auth0User } from "@/lib/types";

interface NavbarProps {
  auth0User?: Auth0User; // Make it optional since it might be null
}

export default function Navbar({ auth0User }: NavbarProps) {
  console.log("coming prop: ", auth0User);
  return (
    <div className="flex flex-row gap-2 items-center justify-between mb-2 text-lg font-bold">
      {/* header left */}
      <div>The Coding Tutor</div>
      {/* header right */}
      <div className="flex flex-row gap-2 items-center">
        <NavbarHelpModal />
        <ThemeSelectButton />
        {auth0User && (
          <NavbarUserModal
            name={auth0User.name}
            email={auth0User.email}
            sub={auth0User.sub}
          />
        )}
        {!auth0User && <a href="/api/auth/login">Login</a>}
      </div>
    </div>
  );
}
