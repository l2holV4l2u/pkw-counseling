import { User } from "prisma/generated/zod";

export function convertDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getFullName(user: User) {
  return user.firstName + " " + user.lastName || "-";
}
