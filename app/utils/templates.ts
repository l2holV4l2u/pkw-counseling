import {
  ALevelScore,
  TGATScore,
  TPATScore,
  UniChoice,
} from "prisma/generated/zod";
import { v4 as uuid } from "uuid";

export const TGATTemplate = (userId: string): TGATScore => ({
  id: uuid(),
  userId,
  tgat1: 0,
  tgat2: 0,
  tgat3: 0,
});

export const TPATTemplate = (userId: string): TPATScore => ({
  id: uuid(),
  userId,
  tpat1: 0,
  tpat2: 0,
  tpat3: 0,
  tpat4: 0,
  tpat5: 0,
});

export const AlevelTemplate = (userId: string): ALevelScore => ({
  id: uuid(),
  userId,
  alevel61: 0,
  alevel62: 0,
  alevel63: 0,
  alevel64: 0,
  alevel65: 0,
  alevel66: 0,
  alevel70: 0,
  alevel81: 0,
  alevel82: 0,
  alevel83: 0,
  alevel84: 0,
  alevel85: 0,
  alevel86: 0,
  alevel87: 0,
  alevel88: 0,
  alevel89: 0,
});

export const UniChoiceTemplate = (
  userId: string,
  programId: string,
  order: number
): UniChoice => ({ id: uuid(), userId, programId, order });
