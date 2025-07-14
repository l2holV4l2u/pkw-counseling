import { UniChoice } from "prisma/generated/zod";

export async function updateUniChoice(userId: string, uniChoice: UniChoice[]) {
  const formData = new FormData();
  formData.append("data", JSON.stringify({ userId, uniChoice }));
  await fetch("/api/unichoice/update", {
    method: "POST",
    body: formData,
  });
}
