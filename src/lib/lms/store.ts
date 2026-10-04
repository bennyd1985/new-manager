import { create } from "zustand";
import { persist } from "zustand/middleware";
import { blankLesson, blankModule, moveItem, newId } from "./logic";
import { SEED_IDS, seedCourses } from "./seed";
import { saveAttempt, saveDone, saveName, type RemoteProgress } from "./roster.functions";

import type { Attempt, Audience, Course, Lesson, Question } from "./types";

type CoursePatch = Partial<Pick<Course, "title" | "blurb" | "audience">>;

type LmsState = {
  courses: Course[];
  name: string;
  completed: Record<string, number>;
  checks: Record<string, boolean>;
  attempts: Attempt[];
  lastLessonId?: string;
  freeNav: boolean;
  trainer: boolean;
  rosterReady: boolean;
  setName: (name: string) => void;
  setFreeNav: (on: boolean) => void;
  setTrainer: (trainer: boolean) => void;
  toggleCheck: (id: string) => void;
  completeLesson: (id: string) => void;
  recordAttempt: (attempt: Attempt) => void;
  touchLesson: (id: string) => void;
  addCourse: () => string;
  updateCourse: (id: string, patch: CoursePatch) => void;
  removeCourse: (id: string) => void;
  addModule: (courseId: string) => void;
  renameModule: (courseId: string, moduleId: string, title: string) => void;
  removeModule: (courseId: string, moduleId: string) => void;
  moveModule: (courseId: string, moduleId: string, direction: -1 | 1) => void;
  addLesson: (courseId: string, moduleId: string, kind: Lesson["kind"]) => void;
  updateLesson: (courseId: string, lessonId: string, patch: Partial<Lesson>) => void;
  removeLesson: (courseId: string, lessonId: string) => void;
  moveLesson: (courseId: string, moduleId: string, lessonId: string, direction: -1 | 1) => void;
  addQuestion: (courseId: string, lessonId: string) => void;
  updateQuestion: (courseId: string, lessonId: string, questionId: string, patch: Partial<Question>) => void;
  removeQuestion: (courseId: string, lessonId: string, questionId: string) => void;
  restoreSamples: () => void;
  clearProgress: () => void;
  applyRemote: (remote: RemoteProgress) => void;
};

function mapCourse(courses: Course[], courseId: string, fn: (course: Course) => Course) {
  return courses.map((course) => (course.id === courseId ? fn(course) : course));
}

const seedIds = new Set<string>(SEED_IDS);

function courseIdFor(courses: Course[], lessonId: string) {
  for (const course of courses) {
    for (const module of course.modules) {
      if (module.lessons.some((lesson) => lesson.id === lessonId)) return course.id;
    }
  }
  return null;
}

let nameTimer: ReturnType<typeof setTimeout> | undefined;

export const useLms = create<LmsState>()(
  persist(
    (set, get) => ({
      courses: structuredClone(seedCourses),
      name: "",
      completed: {},
      checks: {},
      attempts: [],
      freeNav: false,
      trainer: false,
      rosterReady: false,
      setName: (name) => {
        set({ name });
        clearTimeout(nameTimer);
        nameTimer = setTimeout(() => {
          void saveName({ data: name }).catch(() => undefined);
        }, 400);
      },
      setFreeNav: (freeNav) => set({ freeNav }),
      setTrainer: (trainer) => set({ trainer, rosterReady: true }),
      toggleCheck: (id) =>
        set((state) => ({ checks: { ...state.checks, [id]: !state.checks[id] } })),
      completeLesson: (id) => {
        set((state) => ({
          completed: { ...state.completed, [id]: Date.now() },
          lastLessonId: id,
        }));
        const courseId = courseIdFor(get().courses, id);
        if (courseId) void saveDone({ data: { lessonId: id, courseId } }).catch(() => undefined);
      },
      recordAttempt: (attempt) => {
        set((state) => {
          const completed = { ...state.completed };
          if (attempt.passed) completed[attempt.lessonId] = attempt.at;
          return { attempts: [...state.attempts, attempt], completed, lastLessonId: attempt.lessonId };
        });
        const courseId = courseIdFor(get().courses, attempt.lessonId);
        if (!courseId) return;
        void saveAttempt({
          data: {
            lessonId: attempt.lessonId,
            courseId,
            score: attempt.score,
            passed: attempt.passed,
          },
        }).catch(() => undefined);
      },
      touchLesson: (id) => set({ lastLessonId: id }),
      addCourse: () => {
        const id = newId("c");
        const course: Course = {
          id,
          title: "Untitled course",
          blurb: "Who this is for, and what they will be able to do on the next shift.",
          audience: "Crew" satisfies Audience,
          modules: [blankModule()],
        };
        set((state) => ({ courses: [...state.courses, course] }));
        return id;
      },
      updateCourse: (id, patch) =>
        set((state) => ({
          courses: mapCourse(state.courses, id, (course) => ({ ...course, ...patch })),
        })),
      removeCourse: (id) => set((state) => ({ courses: state.courses.filter((course) => course.id !== id) })),
      addModule: (courseId) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: [...course.modules, blankModule()],
          })),
        })),
      renameModule: (courseId, moduleId, title) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => (module.id === moduleId ? { ...module, title } : module)),
          })),
        })),
      removeModule: (courseId, moduleId) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.filter((module) => module.id !== moduleId),
          })),
        })),
      moveModule: (courseId, moduleId, direction) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => {
            const index = course.modules.findIndex((module) => module.id === moduleId);
            return { ...course, modules: moveItem(course.modules, index, direction) };
          }),
        })),
      addLesson: (courseId, moduleId, kind) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) =>
              module.id === moduleId ? { ...module, lessons: [...module.lessons, blankLesson(kind)] } : module,
            ),
          })),
        })),
      updateLesson: (courseId, lessonId, patch) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => ({
              ...module,
              lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...patch } : lesson)),
            })),
          })),
        })),
      removeLesson: (courseId, lessonId) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => ({
              ...module,
              lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
            })),
          })),
        })),
      moveLesson: (courseId, moduleId, lessonId, direction) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => {
              if (module.id !== moduleId) return module;
              const index = module.lessons.findIndex((lesson) => lesson.id === lessonId);
              return { ...module, lessons: moveItem(module.lessons, index, direction) };
            }),
          })),
        })),
      addQuestion: (courseId, lessonId) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => ({
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      questions: [
                        ...lesson.questions,
                        {
                          id: newId("q"),
                          prompt: "New question",
                          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
                          answer: 0,
                          explain: "Say why the right answer is right.",
                        },
                      ],
                    }
                  : lesson,
              ),
            })),
          })),
        })),
      updateQuestion: (courseId, lessonId, questionId, patch) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => ({
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      questions: lesson.questions.map((question) =>
                        question.id === questionId ? { ...question, ...patch } : question,
                      ),
                    }
                  : lesson,
              ),
            })),
          })),
        })),
      removeQuestion: (courseId, lessonId, questionId) =>
        set((state) => ({
          courses: mapCourse(state.courses, courseId, (course) => ({
            ...course,
            modules: course.modules.map((module) => ({
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, questions: lesson.questions.filter((question) => question.id !== questionId) }
                  : lesson,
              ),
            })),
          })),
        })),
      restoreSamples: () =>
        set((state) => ({
          courses: [
            ...structuredClone(seedCourses),
            ...state.courses.filter((course) => !seedIds.has(course.id)),
          ],
        })),
      clearProgress: () => set({ completed: {}, checks: {}, attempts: [], lastLessonId: undefined }),
      applyRemote: (remote) =>
        set((state) => ({
          trainer: remote.trainer,
          rosterReady: true,
          name: remote.name.trim() ? remote.name : state.name,
          courses: remote.trainer ? state.courses : structuredClone(seedCourses),
          completed: {
            ...state.completed,
            ...Object.fromEntries(remote.completed.map((row) => [row.lessonId, row.at])),
          },
          attempts: remote.attempts.length ? remote.attempts : state.attempts,
        })),
    }),
    {
      name: "linebook",
      skipHydration: true,
      version: 14,
      partialize: (state) => ({
        courses: state.courses,
        name: state.name,
        completed: state.completed,
        checks: state.checks,
        attempts: state.attempts,
        lastLessonId: state.lastLessonId,
        freeNav: false,
      }),
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as {
          courses?: Course[];
          name?: string;
          completed?: Record<string, number>;
          checks?: Record<string, boolean>;
          attempts?: Attempt[];
          lastLessonId?: string;
          freeNav?: boolean;
        };
        if (version < 2) {
          return {
            ...state,
            courses: structuredClone(seedCourses),
            completed: {},
            checks: {},
            attempts: [],
            lastLessonId: undefined,
            freeNav: false,
          };
        }
        let courses = state.courses ?? [];
        if (version < 3) courses = courses.filter((course) => course.id !== "lh-preopen");
        if (version < 14) {
          const keep = courses.filter(
            (course) => !seedIds.has(course.id) && course.id !== "lh-preopen" && course.id !== "lh-order",
          );
          courses = [...structuredClone(seedCourses), ...keep];
        }
        return { ...state, courses, freeNav: false };
      },
    },
  ),
);
