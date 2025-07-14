import { User } from "prisma/generated/zod";
import { fileUpload } from "./s3";

export async function updateUser(user: User) {
  if (user.profileUrl) {
    try {
      const response = await fetch(user.profileUrl);
      const blob = await response.blob();
      const fileName = `profilePic/${user.id}`;
      const file = new File([blob], fileName, { type: blob.type });
      const s3Url = await fileUpload(file, fileName); // upload to S3
      user.profileUrl = s3Url;
    } catch (err) {
      console.error("File upload error:", err);
    }
  }
  const formData = new FormData();
  formData.append("data", JSON.stringify({ user }));
  await fetch("/api/user/update", {
    method: "POST",
    body: formData,
  });
}
