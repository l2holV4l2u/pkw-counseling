import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@utils/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "button" | "underline";
  }
>(({ className, variant = "button", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      variant === "button"
        ? "inline-flex rounded-xl bg-muted p-1 text-muted-foreground gap-2 w-fit"
        : "inline-flex border-b border-border text-muted-foreground gap-8 justify-between",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "button" | "underline";
  }
>(({ className, variant = "button", ...props }, ref) => {
  const buttonClasses =
    "w-full whitespace-nowrap rounded-lg px-2 py-1 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary-700 data-[state=active]:to-primary-500 data-[state=active]:text-white data-[state=active]:shadow";

  const underlineClasses = cn(
    "relative pb-2 font-medium transition-all ease-in-out hover:text-foreground data-[state=active]:text-foreground flex-1",
    // Gradient underline when active
    "data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full",
    // Gradient bar
    "data-[state=active]:after:bg-gradient-to-br data-[state=active]:after:from-primary-700 data-[state=active]:after:to-primary-500"
  );

  const variantClasses =
    variant === "button" ? buttonClasses : underlineClasses;
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(variantClasses, className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
