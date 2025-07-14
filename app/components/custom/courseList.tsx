import { Card } from "@components/ui/card";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Course, CourseDetail } from "@types";
import { Dispatch, SetStateAction, useState } from "react";

export default function CourseList({
  selected,
  setSelected,
}: {
  selected: CourseDetail[];
  setSelected: Dispatch<SetStateAction<CourseDetail[]>>;
}) {
  const [query, setQuery] = useState("");

  // Fetch courses.json from public folder
  const { data, isLoading, error } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch("/courses.json");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (json.course && Array.isArray(json.course)) return json.course;
      throw new Error("Invalid courses.json format");
    },
    staleTime: 1000 * 60 * 10,
  });

  // Filter courses by query
  const filtered =
    data?.filter(
      (course) =>
        course.university_name_en.toLowerCase().includes(query.toLowerCase()) ||
        course.program_name_en.toLowerCase().includes(query.toLowerCase()) ||
        course.university_name_th.toLowerCase().includes(query.toLowerCase()) ||
        course.program_name_th.toLowerCase().includes(query.toLowerCase())
    ) || [];

  // Fetch course detail by program_id
  const mutation = useMutation({
    mutationFn: async (course: Course): Promise<CourseDetail> => {
      const url = `https://my-tcas.s3.ap-southeast-1.amazonaws.com/mytcas/ly-programs/${course.program_id}.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch course detail");
      const json = await res.json();
      const detail = Array.isArray(json) ? json[0] : json;

      // Append university_id from the course object
      return {
        ...detail,
        university_id: course.university_id,
        university_name_th: course.university_name_th,
      };
    },
    onSuccess: (detail) => {
      setSelected((prev) =>
        prev.some((c) => c.program_id === detail.program_id)
          ? prev
          : [...prev, detail]
      );
    },
  });

  // Handler for selecting a course
  const handleSelect = (course: Course) => {
    if (selected.some((c) => c.program_id === course.program_id)) {
      setSelected((prev) =>
        prev.filter((c) => c.program_id !== course.program_id)
      );
      return;
    }
    mutation.mutate(course);
  };

  return (
    <div className="flex flex-col w-full p-4 h-full gap-4">
      <div className="text-xl font-bold text-text">รายชื่อคณะ</div>
      <Input
        data={query}
        setData={setQuery}
        placeholder="ใส่ชื่อมหาลัยหรือคณะที่ต้องการ"
      />
      {isLoading && <div>โหลดรายชื่อคณะ...</div>}
      {error && (
        <div className="text-red-500">{String(error.message || error)}</div>
      )}
      {!isLoading && !error && (
        <Card className="space-y-2 max-h-80 p-2 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-gray-500 p-2">ไม่เจอผลลัพธ์</div>
          ) : (
            filtered.slice(0, 10).map((course, index) => (
              <div
                key={course._id}
                className={`flex items-center gap-3 p-2 cursor-pointer ${
                  index != 9 && "border-b-2"
                }`}
              >
                <Checkbox
                  id={course.program_id}
                  checked={selected.some(
                    (c) => c.program_id === course.program_id
                  )}
                  onCheckedChange={() => handleSelect(course)}
                />
                <img
                  src={`https://assets.mytcas.com/i/logo/${course.university_id}.png`}
                  className="w-12 h-12"
                />
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">
                    {course.university_name_th}
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.program_name_th}
                  </div>
                </div>
              </div>
            ))
          )}
        </Card>
      )}
    </div>
  );
}
