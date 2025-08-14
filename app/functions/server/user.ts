import { UserWithScore } from "@types";
import { prisma } from "./prisma";
import { User } from "prisma/generated/zod";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  return { user };
}

export async function getUserByStudentId(studentId: string) {
  const user = await prisma.user.findUnique({ where: { studentId } });
  return { user };
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return { user };
}

export async function createUser(
  email: string,
  studentId: string,
  password: string,
  role: string
) {
  const user = await prisma.user.create({
    data: { email, password, studentId, role },
  });
  return { user };
}

export async function getUsers() {
  const user = await prisma.user.findMany();
  return { user };
}

export async function updateUserPassword(id: string, password: string) {
  return prisma.user.update({ where: { id }, data: { password } });
}

export async function getUserWithScoreById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return { student: null };

  const tgat = await prisma.tGATScore.findUnique({
    where: { userId: user?.id },
  });
  const tpat = await prisma.tPATScore.findUnique({
    where: { userId: user?.id },
  });
  const alevel = await prisma.aLevelScore.findUnique({
    where: { userId: user?.id },
  });

  const student: UserWithScore = { user, tgat, tpat, alevel };
  return { student };
}

export async function updateUser(user: User) {
  await prisma.user.update({ where: { id: user.id }, data: user });
}
