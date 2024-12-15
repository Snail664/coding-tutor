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
export default function NavbarUserModal() {
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
          This is your user profile. You can logout here.
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
