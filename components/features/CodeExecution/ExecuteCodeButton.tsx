import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useEffect } from "react";
import { Play } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store";
import { runCodeThunk } from "@/slices/CodeSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useToast } from "@/hooks/use-toast";

export default function ExecuteCodeButton() {
  const { user } = useUser();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { runCodeLoading } = useAppSelector((state) => state.code);

  const runCode = async () => {
    if (!user) {
      return toast({
        title: "Error",
        description: "Please login to run code",
      });
    }
    if (runCodeLoading) return;
    await dispatch(runCodeThunk());
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "r") {
        event.preventDefault();
        runCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user]);

  return (
    <Button className="execution-button" onClick={runCode}>
      {!runCodeLoading && <Play fill="white" className="mr-2 h-4 w-4" />}
      {runCodeLoading && <Loading />}
      Run
    </Button>
  );
}
