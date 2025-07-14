import { UserWithScore } from "@types";

export async function updateScore(userWithScore: UserWithScore) {
  const formData = new FormData();
  formData.append("data", JSON.stringify({ userWithScore }));
  await fetch("/api/score/update", {
    method: "POST",
    body: formData,
  });
}
