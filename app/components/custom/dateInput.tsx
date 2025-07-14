import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import { ModeType } from "@types";
import { cn } from "@utils/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverPortal,
} from "@radix-ui/react-popover";
import { convertDate } from "@utils/functions/misc";
import { FaRegCalendar } from "react-icons/fa6";

export function DateInput({
  data,
  setData,
  placeholder,
  disabled,
  minDate,
  maxDate,
  mode = "Edit",
}: {
  data: Date | null;
  setData: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  mode?: ModeType;
}) {
  const display = data ? convertDate(data) : placeholder || "Pick a date";
  const disabledDates = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
  ];

  if (mode == "View") return <div>{display}</div>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !data && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          {display} <FaRegCalendar size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent className="z-[9999] p-0 m-2 rounded-xl bg-white border-border border-2 shadow-xl">
          <Calendar
            mode="single"
            selected={data || undefined}
            onSelect={(date) => setData(date || new Date())}
            initialFocus
            disabled={disabledDates.length > 0 ? disabledDates : undefined}
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
