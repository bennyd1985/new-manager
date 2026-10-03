import type { Block, Course, Lesson, Module } from "./types";

export function newId(prefix: string) {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rand}`;
}

export function flatLessons(course: Course) {
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ module, lesson })),
  );
}

export function courseMinutes(course: Course) {
  return flatLessons(course).reduce((sum, row) => sum + row.lesson.minutes, 0);
}

export function lessonCount(course: Course) {
  return flatLessons(course).length;
}

export function isCourseComplete(course: Course, completed: Record<string, number>) {
  const lessons = flatLessons(course);
  return lessons.length > 0 && lessons.every((row) => completed[row.lesson.id] != null);
}

export function courseProgress(course: Course, completed: Record<string, number>) {
  const lessons = flatLessons(course);
  if (!lessons.length) return 0;
  const done = lessons.filter((row) => completed[row.lesson.id] != null).length;
  return done / lessons.length;
}

export function isUnlocked(
  course: Course,
  lessonId: string,
  completed: Record<string, number>,
  free: boolean,
) {
  if (free) return true;
  const lessons = flatLessons(course);
  const index = lessons.findIndex((row) => row.lesson.id === lessonId);
  if (index <= 0) return true;
  return lessons.slice(0, index).every((row) => completed[row.lesson.id] != null);
}

export function resumePoint(
  courses: Course[],
  completed: Record<string, number>,
  lastLessonId?: string,
) {
  const flat = courses.flatMap((course) =>
    flatLessons(course).map((row) => ({ course, ...row })),
  );
  if (!flat.length) return null;
  if (lastLessonId) {
    const index = flat.findIndex((row) => row.lesson.id === lastLessonId);
    if (index >= 0) {
      if (completed[lastLessonId] == null) return flat[index] ?? null;
      const after = flat.slice(index + 1).find((row) => completed[row.lesson.id] == null);
      if (after) return after;
    }
  }
  return flat.find((row) => completed[row.lesson.id] == null) ?? null;
}

export function resumeInCourse(course: Course, completed: Record<string, number>) {
  const lessons = flatLessons(course);
  return lessons.find((row) => completed[row.lesson.id] == null) ?? lessons[0] ?? null;
}

export function bestScore(
  attempts: { lessonId: string; score: number }[],
  lessonId: string,
) {
  const scores = attempts.filter((row) => row.lessonId === lessonId).map((row) => row.score);
  if (!scores.length) return null;
  return Math.max(...scores);
}

export function checkIds(lesson: Lesson) {
  return lesson.blocks.flatMap((block) => (block.type === "checks" ? block.items.map((item) => item.id) : []));
}

export function academyStats(courses: Course[], completed: Record<string, number>) {
  const lessons = courses.flatMap((course) => flatLessons(course).map((row) => row.lesson));
  const done = lessons.filter((lesson) => completed[lesson.id] != null).length;
  const quizzes = lessons.filter((lesson) => lesson.kind === "quiz");
  const quizzesPassed = quizzes.filter((lesson) => completed[lesson.id] != null).length;
  const certificates = courses.filter((course) => isCourseComplete(course, completed)).length;
  return {
    lessons: lessons.length,
    done,
    quizzes: quizzes.length,
    quizzesPassed,
    certificates,
  };
}

export function findLesson(course: Course, lessonId: string) {
  for (const module of course.modules) {
    const lesson = module.lessons.find((item) => item.id === lessonId);
    if (lesson) return { module, lesson };
  }
  return null;
}

export function neighborLessons(course: Course, lessonId: string) {
  const lessons = flatLessons(course);
  const index = lessons.findIndex((row) => row.lesson.id === lessonId);
  return {
    index,
    total: lessons.length,
    prev: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

export type ReadDraft = {
  prose: string;
  tipTitle: string;
  tipText: string;
  warnTitle: string;
  warnText: string;
  steps: string;
  bullets: string;
  checks: string;
  checkIds: string[];
  figures: { src: string; alt: string; caption: string; fit?: "wide" }[];
};

export function draftFromBlocks(blocks: Block[]): ReadDraft {
  const checks = blocks.find((block) => block.type === "checks");
  const tip = blocks.find((block) => block.type === "tip");
  const warn = blocks.find((block) => block.type === "warn");
  const steps = blocks.filter((block) => block.type === "steps");
  const lists = blocks.filter((block) => block.type === "list");
  return {
    prose: blocks
      .filter((block) => block.type === "p")
      .map((block) => block.text)
      .join("\n\n"),
    tipTitle: tip && tip.type === "tip" ? tip.title : "",
    tipText: tip && tip.type === "tip" ? tip.text : "",
    warnTitle: warn && warn.type === "warn" ? warn.title : "",
    warnText: warn && warn.type === "warn" ? warn.text : "",
    steps: steps
      .flatMap((block) => (block.type === "steps" ? block.items : []))
      .join("\n"),
    bullets: lists
      .map((block) => (block.type === "list" ? block.items.join("\n") : ""))
      .filter(Boolean)
      .join("\n\n"),
    checks: checks && checks.type === "checks" ? checks.items.map((item) => item.label).join("\n") : "",
    checkIds: checks && checks.type === "checks" ? checks.items.map((item) => item.id) : [],
    figures: blocks
      .filter((block) => block.type === "figure")
      .map((block) =>
        block.type === "figure"
          ? { src: block.src, alt: block.alt, caption: block.caption ?? "", fit: block.fit }
          : { src: "", alt: "", caption: "" },
      ),
  };
}

export function blocksFromDraft(draft: ReadDraft): Block[] {
  const blocks: Block[] = [];
  for (const figure of draft.figures ?? []) {
    if (!figure.src.trim()) continue;
    blocks.push({
      type: "figure",
      src: figure.src,
      alt: figure.alt,
      caption: figure.caption.trim() || undefined,
      fit: figure.fit,
    });
  }
  for (const text of draft.prose
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)) {
    blocks.push({ type: "p", text });
  }
  if (draft.tipTitle.trim() || draft.tipText.trim()) {
    blocks.push({
      type: "tip",
      title: draft.tipTitle.trim() || "Note",
      text: draft.tipText.trim(),
    });
  }
  if (draft.warnTitle.trim() || draft.warnText.trim()) {
    blocks.push({
      type: "warn",
      title: draft.warnTitle.trim() || "Watch out",
      text: draft.warnText.trim(),
    });
  }
  const steps = draft.steps
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (steps.length) blocks.push({ type: "steps", items: steps });
  for (const group of draft.bullets.split(/\n\s*\n/)) {
    const items = group
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (items.length) blocks.push({ type: "list", items });
  }
  const labels = draft.checks
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (labels.length) {
    blocks.push({
      type: "checks",
      items: labels.map((label, index) => ({
        id: draft.checkIds[index] ?? newId("ck"),
        label,
      })),
    });
  }
  return blocks;
}

export function blankQuestion() {
  return {
    id: newId("q"),
    prompt: "New question",
    choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
    answer: 0,
    explain: "Say why the right answer is right.",
  };
}

export function blankLesson(kind: Lesson["kind"]): Lesson {
  if (kind === "quiz") {
    return {
      id: newId("ls"),
      title: "Knowledge check",
      minutes: 4,
      kind,
      blocks: [
        {
          type: "p",
          text: "Answer from the lessons in this module. You need the pass mark to move on.",
        },
      ],
      questions: [blankQuestion()],
      pass: 80,
    };
  }
  return {
    id: newId("ls"),
    title: "New lesson",
    minutes: 5,
    kind,
    blocks: [{ type: "p", text: "Write what the learner should be able to do on the next shift." }],
    questions: [],
    pass: 80,
  };
}

export function blankModule(): Module {
  return { id: newId("md"), title: "New module", lessons: [blankLesson("read")] };
}

export function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const next = index + direction;
  if (next < 0 || next >= items.length) return items;
  const copy = items.slice();
  const [item] = copy.splice(index, 1);
  if (item === undefined) return items;
  copy.splice(next, 0, item);
  return copy;
}
