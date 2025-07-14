import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";
import { UserWithScore } from "@types";

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

export function buildStudentColumns(
  data: UserWithScore[]
): ColumnDef<UserWithScore>[] {
  const uniqueALevelSubjects = Array.from(
    new Set(data.flatMap((user) => user.alevel?.map((a) => a.subject) ?? []))
  );

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
        <div className="w-full">
          {row.original.user.firstName + " " + row.original.user.lastName || ""}
        </div>
      ),
    },
  ];

  const tgatSubjects = ["tgat1", "tgat2", "tgat3"];

  const tgatColumns: ColumnDef<UserWithScore>[] = tgatSubjects.map(
    (subject) => ({
      accessorKey: subject,
      header: ({ column }) => (
        <HeaderButton
          column={column}
          label={subject.toUpperCase().replace("TGAT", "TGAT ")}
        />
      ),
      cell: ({ row }) => (
        <div className="w-full">
          {row.original.tgat?.[subject as keyof typeof row.original.tgat] ??
            "-"}
        </div>
      ),
    })
  );

  const tpatSubjects = ["tpat1", "tpat2", "tpat3", "tpat4", "tpat5"];

  const tpatColumns: ColumnDef<UserWithScore>[] = tpatSubjects.map(
    (subject) => ({
      accessorKey: subject,
      header: ({ column }) => (
        <HeaderButton
          column={column}
          label={subject.toUpperCase().replace("TPAT", "TPAT ")}
        />
      ),
      cell: ({ row }) => (
        <div className="w-full">
          {row.original.tpat?.[subject as keyof typeof row.original.tpat] ??
            "-"}
        </div>
      ),
    })
  );

  const alevelColumns: ColumnDef<UserWithScore>[] = uniqueALevelSubjects.map(
    (subject) => ({
      accessorKey: `alevel-${subject}`,
      header: ({ column }) => <HeaderButton column={column} label={subject} />,
      cell: ({ row }) => {
        const scoreObj = row.original.alevel?.find(
          (a) => a.subject === subject
        );
        return <div className="w-full">{scoreObj?.score ?? "-"}</div>;
      },
    })
  );

  return [...userColumns, ...tgatColumns, ...tpatColumns, ...alevelColumns];
}
