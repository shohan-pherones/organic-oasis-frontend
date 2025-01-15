import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  noMargin,
}: {
  title: string;
  noMargin?: boolean;
}) => {
  return (
    <h3
      className={cn(
        "text-2xl md:text-3xl font-bold",
        noMargin ? "" : "mb-5 md:mb-10"
      )}
    >
      {title}
    </h3>
  );
};

export default SectionTitle;
