import { useParams } from "@remix-run/react";
import { studentsAtom } from "@utils/atoms/teacherAtom";
import { Layout } from "@components/layout/layout";
import { getFullName } from "@functions/misc";
import { useAtomValue } from "jotai";

export default function MyStudent() {
  const { id } = useParams();
  const data = useAtomValue(studentsAtom);
  const student = data.find((d) => d.user.id == id);

  return (
    <Layout className="items-center p-4">
      <div className="flex flex-col max-w-2xl w-full h-full gap-4">
        {student ? (
          <div className="font-bold text-xl">{getFullName(student.user)}</div>
        ) : (
          <div className="font-bold text-xl">
            นักเรียนคนนี้ไม่อยู่ในฐานข้อมูล
          </div>
        )}
      </div>
    </Layout>
  );
}
