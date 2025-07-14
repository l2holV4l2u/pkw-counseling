import { CourseDetail } from "@types";

export async function fetchCourseDetailWithMeta(
  program_id: string,
  meta: { university_id: string; university_name_th: string }
): Promise<CourseDetail> {
  const detailUrl = `https://my-tcas.s3.ap-southeast-1.amazonaws.com/mytcas/ly-programs/${program_id}.json`;
  const roundUrl = `https://my-tcas.s3.ap-southeast-1.amazonaws.com/mytcas/rounds/${program_id}.json`;

  // fetch both in parallel
  const [detailRes, roundRes] = await Promise.all([
    fetch(detailUrl),
    fetch(roundUrl),
  ]);

  if (!detailRes.ok) throw new Error("Failed to fetch program detail");
  if (!roundRes.ok) throw new Error("Failed to fetch round info");

  const detailJson = await detailRes.json();
  const roundJson = await roundRes.json();

  const detail = Array.isArray(detailJson) ? detailJson[0] : detailJson;
  const roundInfo = Array.isArray(roundJson) ? roundJson[0] : roundJson;

  return {
    ...detail,
    university_id: meta.university_id,
    university_name_th: meta.university_name_th,
    round: roundInfo, // add this line to store round info
  };
}
