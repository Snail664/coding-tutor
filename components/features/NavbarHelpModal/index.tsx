import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";

export default function NavbarHelpModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <CircleHelp />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">Help</DialogTitle>
        </DialogHeader>
        <div>
          <section className="mt-4">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-2">
              Coding Tutor is an AI-powered platform that helps you to learn
              coding in an efficient and enjoyable manner.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Shortcuts</h2>
            <ul className="list-disc pl-8 mt-2">
              <li>
                <strong>Command+H</strong>: Show hints
              </li>
              <li>
                <strong>Command+R</strong>: Run code
              </li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
