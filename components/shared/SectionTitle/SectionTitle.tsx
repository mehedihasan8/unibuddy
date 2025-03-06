import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    // `text-3xl md:text-4xl font-bold text-center text-[#221859] ${className}`
    <div className="mb-12 md:mb-16">
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold leading-tight tracking-tighter text-center text-[#221859]",
          className,
        )}
      >
        {title}
      </h2>
      <p className="max-w-xl w-full text-center mx-auto mt-2 primary-color">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
