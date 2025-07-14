import { UniChoice } from "prisma/generated/zod";
import { prisma } from "./prisma";

export async function getUniChoice(userId: string) {
  const uniChoice = await prisma.uniChoice.findMany({
    where: { userId },
    orderBy: { order: "asc" },
  });
  return { uniChoice };
}

export async function updateUniChoice(userId: string, uniChoice: UniChoice[]) {
  await prisma.uniChoice.deleteMany({ where: { userId } });
  await prisma.uniChoice.createMany({ data: uniChoice });
}
