import { UserWithScore } from "@types";
import { atom } from "jotai";

export const studentsAtom = atom<UserWithScore[]>([]);
