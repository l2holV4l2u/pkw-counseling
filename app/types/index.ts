import { ALevelScore, TGATScore, TPATScore, User } from "prisma/generated/zod";

export type UserWithScore = {
  user: User;
  tgat: TGATScore | null;
  tpat: TPATScore | null;
  alevel: ALevelScore | null;
};

export type Course = {
  _id: string;
  university_name_en: string;
  university_name_th: string;
  university_id: string;
  program_name_en: string;
  program_name_th: string;
  cost: string;
  graduate_rate: string;
  employment_rate: string;
  median_salary: string;
  program_id: string;
  program_type_id: string;
};

export type CourseDetail = {
  program_id: string;
  program_name_th: string;
  university_id: string;
  university_name_th: string;
  min_score: number;
  max_score: number;
  [key: string]: any;
};

export type Mode = "View" | "Edit" | "Response";
