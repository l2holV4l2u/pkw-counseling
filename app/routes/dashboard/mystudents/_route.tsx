import { Layout } from "@components/layout/layout";
import { StudentTable } from "./studentTable";

export default function MyStudent() {
  return (
    <Layout className="items-center p-4">
      <div className="flex flex-col max-w-2xl w-full h-full gap-4">
        <div className="font-bold text-xl">นักเรียนของฉัน</div>
        <StudentTable />
      </div>
    </Layout>
  );
}
