import { cn } from "@utils/utils";

export function Logo({
  className,
  onClick,
  size = 48,
  variant,
}: {
  className?: string;
  onClick?: () => void;
  size?: number;
  variant?: "outline";
}) {
  return (
    <div
      className={cn(
        variant == "outline" &&
          "border border-gray-300 shadow-md rounded-lg p-1 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <img
        src="/pkw_logo.png"
        alt="PKW Logo"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
