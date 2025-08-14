import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";
import { UserWithScore } from "@types";
import { getFullName } from "@functions/misc";

function HeaderButton({
  column,
  label,
}: {
  column: Column<UserWithScore, unknown>;
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="group w-36 justify-start"
    >
      <div className="truncate">{label}</div>
      <div className="relative flex flex-col justify-center ml-1">
        <LucideChevronUp
          className={`transition-opacity w-2 h-2 ${
            sorted === "asc"
              ? "text-foreground"
              : sorted === false
              ? "opacity-0 group-hover:opacity-50"
              : "opacity-20"
          }`}
        />
        <LucideChevronDown
          className={`transition-opacity w-2 h-2 -mt-1 ${
            sorted === "desc"
              ? "text-foreground"
              : sorted === false
              ? "opacity-0 group-hover:opacity-50"
              : "opacity-20"
          }`}
        />
      </div>
    </Button>
  );
}

export function buildStudentColumns(): ColumnDef<UserWithScore>[] {
  const userColumns: ColumnDef<UserWithScore>[] = [
    {
      accessorKey: "pic",
      header: () => <div className="w-12" />,
      cell: ({ row }) => {
        const userWithScore = row.original;
        return (
          <div className="flex items-center justify-center w-12">
            <img
              src={
                userWithScore.user.profileUrl
                  ? `${userWithScore.user.profileUrl}?cb=${Date.now()}`
                  : "/placeholder.png"
              }
              className="w-8 h-8 rounded-md"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => <HeaderButton column={column} label="Name" />,
      cell: ({ row }) => (
        <div className="w-full">{getFullName(row.original.user)}</div>
      ),
    },
  ];

  return userColumns;
}
