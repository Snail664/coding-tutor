import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";

// get provider from sub
const getProviderFromSub = (sub: string) => {
  const provider = sub.split("|")[0].trim().toWellFormed();
  if (provider === "auth0") {
    return "Email";
  } else if (provider === "google-oauth2") {
    return "Google";
  } else if (provider === "windowslive") {
    return "Microsoft";
  } else {
    return provider;
  }
};

export default function NavbarUserModal() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <CircleUser />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Me</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <table className="w-full">
            <tbody>
              <td>
                <strong>Name</strong>
              </td>
              <td>{user.name}</td>
              <tr>
                <td>
                  <strong>Email</strong>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Login Method</strong>
                </td>
                <td>{getProviderFromSub(user.sub)}</td>
              </tr>
            </tbody>
          </table>
          <p>This is your user profile. You can logout here.</p>
        </DialogDescription>
        <DialogFooter>
          <Button variant="default">
            <a href="/api/auth/logout">Logout</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
