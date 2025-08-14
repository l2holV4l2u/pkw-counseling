import { Card } from "@components/ui/card";
import { getFullName } from "@functions/misc";
import { studentsAtom } from "@utils/atoms/teacherAtom";
import { useAtomValue } from "jotai";

export function StudentList() {
  const data = useAtomValue(studentsAtom);
  return (
    <Card className="p-4">
      {data.map((d) => (
        <div className="flex items-center w-full gap-4 p-2 border-b-2">
          <img
            src={
              d.user.profileUrl
                ? `${d.user.profileUrl}?cb=${Date.now()}`
                : "/placeholder.png"
            }
            className="w-8 h-8 rounded-md"
          />
          <div className="w-full">{getFullName(d.user)}</div>
        </div>
      ))}
    </Card>
  );
}
