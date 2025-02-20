import { Loader2 } from "lucide-react";

const Processing = () => {
  return (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="animate-spin" />
      Processing
    </span>
  );
};

export default Processing;
