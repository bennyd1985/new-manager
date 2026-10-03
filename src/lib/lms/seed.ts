import { dailyCourse } from "./courses/daily";
import { menuCourse } from "./courses/menu";
import { recipeCourse } from "./courses/recipe";
import { valuesCourse } from "./courses/values";
import type { Course } from "./types";

export const SEED_IDS = ["lh-values", "lh-menu", "lh-daily", "lh-recipe"] as const;

export const seedCourses: Course[] = [valuesCourse, menuCourse, dailyCourse, recipeCourse];
