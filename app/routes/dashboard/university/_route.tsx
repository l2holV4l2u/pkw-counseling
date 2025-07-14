import { Separator } from "@components/ui/separator";
import { Layout } from "@components/layout/layout";
import { Course, CourseDetail } from "@types";
import { useEffect, useState } from "react";
import CourseList from "@components/custom/courseList";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserIdFromRequest } from "@functions/server/cookie";
import { getUniChoice } from "@functions/server/uniChoice";
import { useLoaderData } from "@remix-run/react";
import { useAtomValue, useSetAtom } from "jotai";
import { uniChoiceAtom } from "@utils/atoms/studentAtom";
import { Card } from "@components/ui/card";
import { fetchCourseDetailWithMeta } from "@functions/client/course";
import { UniChoiceTemplate } from "@utils/templates";
import { userAtom } from "@utils/atoms/userAtoms";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { updateUniChoice } from "@functions/client/uniChoice";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserIdFromRequest(request);
  const { uniChoice } = await getUniChoice(userId);
  return { uniChoice };
}

function SortableCard({
  detail,
  index,
  last,
  onDelete,
}: {
  detail: CourseDetail;
  index: number;
  last: boolean;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: detail.program_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`flex items-center gap-2 w-full ${
        !last ? "border-b pb-2" : ""
      }`}
    >
      <button
        onClick={() => onDelete(detail.program_id)}
        className="w-4 text-muted-foreground hover:text-red-500"
      >
        <X size={16} />
      </button>
      <div className="text-center font-bold pr-2 border-r-2 w-14 shrink-0">
        {index + 1}
      </div>
      <div
        ref={setNodeRef}
        style={style}
        className="flex gap-3 items-center w-full"
        {...attributes}
      >
        <img
          src={`https://assets.mytcas.com/i/logo/${detail.university_id}.png`}
          className="w-12 h-12"
        />
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{detail.university_name_th}</div>
          <div className="text-sm text-gray-600">{detail.program_name_th}</div>
        </div>
        <div className="ml-auto cursor-grab" {...listeners}>
          <GripVertical size={18} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

export default function University() {
  const { uniChoice } = useLoaderData<typeof loader>();
  const user = useAtomValue(userAtom);
  const [selected, setSelected] = useState<CourseDetail[]>([]);
  const setUniChoice = useSetAtom(uniChoiceAtom);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    async function hydrateSelected() {
      try {
        const courseRes = await fetch("/courses.json");
        const courseJson = await courseRes.json();
        const courses: Course[] = Array.isArray(courseJson)
          ? courseJson
          : courseJson.course;

        const results = await Promise.all(
          uniChoice.map(async (choice) => {
            const courseMeta = courses.find(
              (c) => c.program_id === choice.programId
            );
            if (!courseMeta) return null;

            return await fetchCourseDetailWithMeta(choice.programId, {
              university_id: courseMeta.university_id,
              university_name_th: courseMeta.university_name_th,
            });
          })
        );

        const validResults = results.filter(
          (r): r is CourseDetail => r !== null
        );

        setSelected(validResults);
        setUniChoice(uniChoice);
      } catch (error) {
        console.error("Failed to hydrate selected courses", error);
      }
    }

    hydrateSelected();
  }, []);

  if (!user) return <></>;

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = selected.findIndex((s) => s.program_id === active.id);
      const newIndex = selected.findIndex((s) => s.program_id === over.id);
      const newItems = arrayMove(selected, oldIndex, newIndex);
      setSelected(newItems);
    }
  }

  function handleDelete(programId: string) {
    setSelected((prev) => prev.filter((item) => item.program_id !== programId));
  }

  return (
    <Layout className="items-center">
      <div className="flex max-w-2xl w-full h-full">
        <div className="flex flex-col gap-4 w-full p-4 h-full">
          <div className="flex justify-between">
            <div className="text-xl font-bold">คณะที่เลือก</div>
            <Button
              variant="highlight"
              size="sm"
              onClick={async () => {
                const newUniChoice = selected.map((s, index) =>
                  UniChoiceTemplate(user.id, s.program_id, index)
                );
                await updateUniChoice(user.id, newUniChoice);
                setUniChoice(newUniChoice);
                toast.success("บันทึกข้อมูลคณะเรียบร้อยแล้ว");
              }}
            >
              บันทึก
            </Button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[
              restrictToVerticalAxis,
              restrictToFirstScrollableAncestor,
            ]}
          >
            <SortableContext
              items={selected.map((s) => s.program_id)}
              strategy={verticalListSortingStrategy}
            >
              <Card className="space-y-2 p-4">
                {selected.length === 0 ? (
                  <div className="text-gray-500 w-full text-center">
                    ไม่มีคณะที่เลือก
                  </div>
                ) : (
                  <div className="flex gap-2 font-bold text-muted-foreground">
                    <div className="w-4" />
                    <div className="text-center pr-2 border-r-2 w-14">
                      อันดับ
                    </div>
                    <div>คณะ</div>
                  </div>
                )}
                {selected.map((detail, index) => (
                  <SortableCard
                    key={detail.program_id}
                    detail={detail}
                    index={index}
                    last={index === selected.length - 1}
                    onDelete={handleDelete}
                  />
                ))}
              </Card>
            </SortableContext>
          </DndContext>
        </div>
        <Separator orientation="vertical" />
        <CourseList selected={selected} setSelected={setSelected} />
      </div>
    </Layout>
  );
}
