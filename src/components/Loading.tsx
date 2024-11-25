import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center gap-2">
      <span>
        <Loader2 className="animate-spin" />
      </span>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
