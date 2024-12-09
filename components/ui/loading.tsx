import { LoaderCircle } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className="animate-spin">
      <LoaderCircle className={className} />
    </div>
  );
}
