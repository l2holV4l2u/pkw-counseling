import { User } from "prisma/generated/zod";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
