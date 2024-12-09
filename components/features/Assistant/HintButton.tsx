// HintButton.tsx
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Loading from "@/components/ui/loading";

interface HintButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function HintButton({ onClick, loading }: HintButtonProps) {
  return (
    <Button onClick={onClick}>
      {loading ? (
        <Loading className="text-yellow-500" />
      ) : (
        <Lightbulb className="text-yellow-500" />
      )}
      <p className="ml-2">Hint</p>
    </Button>
  );
}
