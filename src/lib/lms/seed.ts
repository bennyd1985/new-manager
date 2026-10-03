import { dailyCourse } from "./courses/daily";
import { menuCourse } from "./courses/menu";
import { orderCourse } from "./courses/order";
import { recipeCourse } from "./courses/recipe";
import { valuesCourse } from "./courses/values";
import type { Course } from "./types";

export const SEED_IDS = ["lh-values", "lh-menu", "lh-order", "lh-daily", "lh-recipe"] as const;

export const seedCourses: Course[] = [valuesCourse, menuCourse, orderCourse, dailyCourse, recipeCourse];
