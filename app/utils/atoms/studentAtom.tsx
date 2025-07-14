import { UserWithScore } from "@types";
import { atom } from "jotai";
import { UniChoice } from "prisma/generated/zod";

export const studentAtom = atom<UserWithScore | null>(null);
export const uniChoiceAtom = atom<UniChoice[]>([]);
