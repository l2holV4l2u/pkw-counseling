import { UserWithScore } from "@types";
import { prisma } from "./prisma";

export async function updateScore(userWithScore: UserWithScore) {
  const { id: userId } = userWithScore.user;

  await prisma.tGATScore.upsert({
    where: { userId },
    update: {
      ...userWithScore.tgat,
    },
    create: {
      userId,
      ...userWithScore.tgat,
    },
  });

  await prisma.tPATScore.upsert({
    where: { userId },
    update: {
      ...userWithScore.tpat,
    },
    create: {
      userId,
      ...userWithScore.tpat,
    },
  });

  await prisma.aLevelScore.upsert({
    where: { userId },
    update: {
      ...userWithScore.alevel,
    },
    create: {
      userId,
      ...userWithScore.alevel,
    },
  });
}
