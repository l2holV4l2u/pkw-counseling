import { Breadcrumb } from "@components/custom/breadcrumb";
import { Card } from "@components/ui/card";
import { cn } from "@utils/utils";
import React from "react";

export function Layout({
  children,
  title,
  className,
  link,
  label,
}: {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  link?: string[];
  label?: string[];
}) {
  return (
    <Card className="flex flex-col relative items-start gap-4 p-4 w-full h-full bg-white border-2 overflow-hidden">
      {title && <h1 className="text-3xl font-bold text-text-800">{title}</h1>}
      {link && label && <Breadcrumb link={link} label={label} />}
      <div className={cn("flex flex-col w-full h-full", className)}>
        {children}
      </div>
    </Card>
  );
}
