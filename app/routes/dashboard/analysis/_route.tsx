import { uniChoiceAtom } from "@utils/atoms/studentAtom";
import CourseList from "@components/custom/courseList";
import { Separator } from "@components/ui/separator";
import { Layout } from "@components/layout/layout";
import { useEffect, useState } from "react";
import { CourseDetail } from "@types";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@utils/atoms/userAtoms";
import { Card } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { UniChoiceTemplate } from "@utils/templates";
import { toast } from "sonner";
import { updateUniChoice } from "@functions/client/uniChoice";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserIdFromRequest } from "@functions/server/cookie";
import { getUniChoice } from "@functions/server/uniChoice";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserIdFromRequest(request);
  const { uniChoice } = await getUniChoice(userId);
  return { loadUniChoice: uniChoice };
}

export default function Analysis() {
  const { loadUniChoice } = useLoaderData<typeof loader>();
  const [selected, setSelected] = useState<CourseDetail[]>([]);
  const [uniChoice, setUniChoice] = useAtom(uniChoiceAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    setUniChoice(loadUniChoice);
  }, []);

  if (!user) return <></>;

  return (
    <Layout className="items-center">
      <div className="flex max-w-2xl w-full h-full">
        <div className="flex flex-col gap-4 w-full p-4 h-full">
          <div className="text-xl font-bold text-text">วิเคราะห์คะแนน</div>
          {selected.length === 0 && (
            <div className="text-gray-500">ไม่มีคณะที่เลือก</div>
          )}
          <div className="space-y-2">
            {selected.map((detail) => {
              const barMin = Math.max(0, Math.min(100, detail.min_score));
              const barMax = Math.max(0, Math.min(100, detail.max_score));
              const alreadyExists = uniChoice.some(
                (c) => c.programId === detail.program_id
              );
              return (
                <Card className="p-4 flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={`https://assets.mytcas.com/i/logo/${detail.university_id}.png`}
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="text-lg font-semibold">
                        {detail.university_name_th}
                      </div>
                      <div className="font-medium">
                        {detail.program_name_th}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-sm w-36">คะแนนสูงต่ำ</div>
                    {/* Score Bar */}
                    <div className="relative h-4 w-full bg-gray-200 rounded">
                      <div
                        className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
                        style={{
                          left: `${barMin}%`,
                          width: `${Math.max(1, barMax - barMin)}%`,
                          minWidth: "2%",
                          maxWidth: "100%",
                        }}
                      ></div>
                      {/* Min label */}
                      <div
                        className="absolute left-0 -top-5 text-xs text-blue-700"
                        style={{ left: `calc(${barMin}% - 10px)` }}
                      >
                        {detail.min_score.toFixed(2)}
                      </div>
                      {/* Max label */}
                      <div
                        className="absolute right-0 -top-5 text-xs text-blue-700"
                        style={{ left: `calc(${barMax}% - 10px)` }}
                      >
                        {detail.max_score.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {/* Score breakdown as stacked bar and table */}
                  {detail.scores && (
                    <div className="flex flex-col gap-2">
                      <div className="text-sm w-36">การคำนวณคะแนน</div>
                      {/* Stacked bar */}
                      <div className="t-scores flex h-4 w-full rounded overflow-hidden">
                        {Object.entries(detail.scores).map(([key, value]) => {
                          const percent = Math.max(
                            0,
                            Math.min(100, Number(value))
                          );
                          // Color map for known keys
                          const colorMap: Record<string, string> = {
                            tgat: "rgb(5, 163, 220)",
                            tpat3: "rgb(28, 153, 101)",
                            a_lv_61: "rgb(167, 124, 79)",
                            a_lv_64: "rgb(227, 162, 64)",
                            a_lv_65: "rgb(220, 151, 47)",
                          };
                          const color =
                            colorMap[key.toLowerCase()] || "rgb(180, 180, 180)";
                          return (
                            <div
                              key={key}
                              className={key}
                              style={{
                                width: `${percent}%`,
                                backgroundColor: color,
                                height: "100%",
                              }}
                              title={key.toUpperCase()}
                            ></div>
                          );
                        })}
                      </div>

                      {/* Table of scores */}
                      <div className="flex flex-col gap-2 text-xs w-full">
                        {Object.entries(detail.scores).map(([key, value]) => {
                          // Human-readable label map
                          const labelMap: Record<string, string> = {
                            tgat: "ความถนัดทั่วไป (TGAT)",
                            tpat3:
                              "ความถนัดวิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์ (TPAT3)",
                            a_lv_61:
                              "A-Level คณิตศาสตร์ประยุกต์ 1 (พื้นฐาน+เพิ่มเติม)",
                            a_lv_64: "A-Level ฟิสิกส์",
                            a_lv_65: "A-Level เคมี",
                          };
                          const label =
                            labelMap[key.toLowerCase()] || key.toUpperCase();
                          return (
                            <div className="flex justify-between">
                              <div className="text-gray-700">{label}</div>
                              <div className="text-gray-900 font-semibold">
                                {String(value)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {alreadyExists ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        const newUniChoice = uniChoice.filter(
                          (c) => c.programId !== detail.program_id
                        );
                        await updateUniChoice(user.id, newUniChoice);
                        setUniChoice(newUniChoice);
                        toast.success(`ลบออกจาก "คณะที่อยากได้" แล้ว`);
                      }}
                    >
                      ลบออกจาก "คณะที่อยากได้"
                    </Button>
                  ) : (
                    <Button
                      variant="highlight"
                      size="sm"
                      onClick={() => {
                        setUniChoice((prev) => [
                          ...prev,
                          UniChoiceTemplate(
                            user.id,
                            detail.program_id,
                            prev.length + 1
                          ),
                        ]);
                        toast.success(`เพิ่มเข้า "คณะที่อยากได้" เรียบร้อย`);
                      }}
                    >
                      เพิ่มเข้า "คณะที่อยากได้"
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
        <Separator orientation="vertical" />
        <CourseList selected={selected} setSelected={setSelected} />
      </div>
    </Layout>
  );
}
