import { Layout } from "@components/layout/layout";
import { Input } from "@components/ui/input";
import { studentAtom } from "@utils/atoms/studentAtom";
import { getUserWithScoreById } from "@functions/server/user";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { getUserIdFromRequest } from "@functions/server/cookie";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AlevelTemplate, TGATTemplate, TPATTemplate } from "@utils/templates";
import { LoaderCircle } from "lucide-react";
import { alevelLabels } from "@utils/consts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Button } from "@components/ui/button";
import { updateScore } from "@functions/client/score";
import { UserWithScore } from "@types";
import { toast } from "sonner";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserIdFromRequest(request);
  const { student } = await getUserWithScoreById(userId);
  return { student };
}

function ScoreInput({
  label,
  data,
  setData,
}: {
  label: string;
  data: number | string;
  setData: (val: number) => void;
}) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="font-medium">{label}</div>
      <Input
        data={data}
        setData={setData}
        type="number"
        className="text-center w-16"
      />
    </div>
  );
}

export default function Score() {
  const { student } = useLoaderData<typeof loader>();

  if (!student)
    return (
      <LoaderCircle size={24} strokeWidth={1.5} className="animate-spin" />
    );

  const setStudent = useSetAtom(studentAtom);
  const [tgat, setTgat] = useState(
    student.tgat || TGATTemplate(student.user.id)
  );
  const [tpat, setTpat] = useState(
    student.tpat || TPATTemplate(student.user.id)
  );
  const [alevel, setAlevel] = useState(
    student.alevel || AlevelTemplate(student.user.id)
  );
  const [userWithScore, setUserWithScore] = useState<UserWithScore>(student);

  useEffect(() => {
    setStudent(userWithScore);
  }, []);

  useEffect(() => {
    if (!student) return;
    setUserWithScore({
      ...userWithScore,
      tgat,
      tpat,
      alevel,
    });
  }, [tgat, tpat, alevel]);

  return (
    <Layout>
      <div className="max-w-xl w-full flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">คะแนน</h1>
          <Button
            variant="highlight"
            size="sm"
            onClick={async () => {
              await updateScore(userWithScore);
              toast.success("บันทึกคะแนนเรียบร้อยแล้ว");
            }}
          >
            บันทึก
          </Button>
        </div>
        <Tabs defaultValue="tgat" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="tgat">TGAT</TabsTrigger>
            <TabsTrigger value="tpat">TPAT</TabsTrigger>
            <TabsTrigger value="alevel">A-Level</TabsTrigger>
          </TabsList>

          <TabsContent value="tgat" className="space-y-4 pt-4">
            {Array.from({ length: 3 }, (_, index) => {
              const key = `tgat${index + 1}` as keyof typeof tgat;
              return (
                <ScoreInput
                  key={key}
                  label={`TGAT ${index + 1}`}
                  data={tgat[key] ?? ""}
                  setData={(val) =>
                    setTgat((prev) => ({ ...prev, [key]: val }))
                  }
                />
              );
            })}
          </TabsContent>

          <TabsContent value="tpat" className="space-y-4 pt-4">
            {Array.from({ length: 5 }, (_, index) => {
              const key = `tpat${index + 1}` as keyof typeof tpat;
              return (
                <ScoreInput
                  key={key}
                  label={`TPAT ${index + 1}`}
                  data={tpat[key] ?? ""}
                  setData={(val) =>
                    setTpat((prev) => ({ ...prev, [key]: val }))
                  }
                />
              );
            })}
          </TabsContent>

          <TabsContent value="alevel" className="space-y-4 pt-4">
            {Object.entries(alevelLabels).map(([key, label]) => (
              <ScoreInput
                key={key}
                label={label}
                data={alevel[key as keyof typeof alevel] ?? ""}
                setData={(val) =>
                  setAlevel((prev) => ({ ...prev, [key]: val }))
                }
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
