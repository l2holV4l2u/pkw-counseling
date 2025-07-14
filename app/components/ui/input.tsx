import { cn } from "@utils/utils";
import { Mode } from "@types";

export function Input({
  data,
  setData,
  label,
  placeholder,
  type = "text",
  disabled = false,
  mode = "Edit",
  required = false,
  suffix = "",
  className,
  variant = "bordered",
}: {
  data: string | number | null;
  setData: (data: any) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "longtext" | "email" | "password" | "number";
  disabled?: boolean;
  mode?: Mode;
  required?: boolean;
  suffix?: string;
  className?: string;
  variant?: "bordered" | "borderless";
}) {
  const style = cn(
    type != "longtext" && "h-8",
    variant == "bordered" && "border border-input shadow-sm px-2 py-1",
    "w-full text-sm bg-white rounded-lg resize-none focus:ring-1 ring-offset-background transition disabled:opacity-75 disabled:pointer-events-none hover:bg-muted placeholder:text-muted-foreground placeholder:font-normal"
  );
  const props = {
    placeholder,
    disabled,
    className: cn(style, className),
  };

  return (
    <div
      className={cn(
        mode === "View" ? "grid grid-cols-2" : "flex flex-col",
        "w-full gap-2"
      )}
    >
      {label && (
        <div className="flex gap-1 font-semibold text-gray-800">
          {label}
          {required && mode !== "View" && (
            <span className="text-red-800">*</span>
          )}
        </div>
      )}
      {mode === "View" ? (
        <div className={cn("text-right", type != "longtext" && "truncate")}>
          {data || "-"}
          {suffix && ` ${suffix}`}
        </div>
      ) : type == "longtext" ? (
        <textarea
          value={data || ""}
          onChange={(e) => setData(e.target.value)}
          rows={4}
          {...props}
        />
      ) : (
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
          {...props}
        />
      )}
    </div>
  );
}
