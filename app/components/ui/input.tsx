import { cn } from "@utils/utils";
import * as React from "react";

type EnhancedInputProps = React.ComponentProps<"input"> & {
  data: string | number | null;
  setData: (val: any) => void;
};

const Input = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, type = "text", data, setData, ...props }, ref) => {
    return (
      <input
        type={type}
        value={
          data === null
            ? ""
            : type === "number" && data === 0
            ? "0"
            : String(data)
        }
        onChange={(e) => {
          const value = e.target.value;
          if (type === "number") {
            setData(value === "" ? "" : Number(value));
          } else {
            setData(value);
          }
        }}
        className={cn(
          "flex h-8 w-full rounded-md border border-input bg-transparent px-2 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          type === "number" &&
            "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-inner-spin-button]:appearance-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
