import * as React from "react";

import { cn } from "@utils/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        clickable && "transition hover:scale-[1.01]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
