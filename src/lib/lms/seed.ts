import { dailyCourse } from "./courses/daily";
import { foodSafetyCourse } from "./courses/food";
import { menuCourse } from "./courses/menu";
import { storeMaterialsCourse } from "./courses/store-materials";
import { valuesCourse } from "./courses/values";
import type { Course } from "./types";

export const SEED_IDS = ["lh-values", "lh-safety", "lh-menu", "lh-daily", "lh-store"] as const;

export const seedCourses: Course[] = [
  valuesCourse,
  foodSafetyCourse,
  menuCourse,
  dailyCourse,
  storeMaterialsCourse,
];
