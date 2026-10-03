import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { flatLessons } from "./logic";
import { seedCourses } from "./seed";
import type { Attempt, Course } from "./types";

const TRAINER_CODE = "HONEY-FLOOR";
const TRAINER_EMAIL = "ben@loveandhoneyfriedchicken.com";

export type RemoteProgress = {
  name: string;
  trainer: boolean;
  completed: { lessonId: string; at: number }[];
  attempts: Attempt[];
};

export type RosterQuiz = {
  title: string;
  best: number | null;
  passed: boolean;
  lastAt: number | null;
  passMark: number;
};

export type RosterCourse = {
  title: string;
  done: number;
  total: number;
  finishedAt: number | null;
  quizzes: RosterQuiz[];
};

export type RosterPerson = {
  id: string;
  name: string;
  email: string;
  lastAt: number | null;
  coursesDone: number;
  courses: RosterCourse[];
};

function lessonOk(courseId: string, lessonId: string) {
  const course = seedCourses.find((item) => item.id === courseId);
  if (!course) return false;
  return flatLessons(course).some((row) => row.lesson.id === lessonId);
}

function codesMatch(input: string) {
  const given = input.trim();
  if (given.length !== TRAINER_CODE.length) return false;
  let mismatch = 0;
  for (let i = 0; i < given.length; i++) mismatch |= given.charCodeAt(i) ^ TRAINER_CODE.charCodeAt(i);
  return mismatch === 0;
}

function millis(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export const loadMine = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string; email?: string }) => ({
    name: String(input?.name ?? "").trim().slice(0, 80),
    email: String(input?.email ?? "").trim().slice(0, 200),
  }))
  .handler(async ({ context, data }): Promise<RemoteProgress> => {
    const sql = await getSql();
    const userId = context.userId;
    await sql`
      insert into profiles (user_id, display_name, email)
      values (${userId}, ${data.name}, ${data.email})
      on conflict (user_id) do update set
        email = case when excluded.email <> '' then excluded.email else profiles.email end,
        display_name = case when profiles.display_name = '' then excluded.display_name else profiles.display_name end
    `;
    const profiles = await sql<{ display_name: string; trainer: boolean }>`
      select display_name, trainer from profiles where user_id = ${userId}
    `;
    const done = await sql<{ lesson_id: string; at: unknown }>`
      select lesson_id, extract(epoch from completed_at) * 1000 as at
      from lesson_done where user_id = ${userId}
    `;
    const attempts = await sql<{ lesson_id: string; score: number; passed: boolean; at: unknown }>`
      select lesson_id, score, passed, extract(epoch from attempted_at) * 1000 as at
      from quiz_attempts where user_id = ${userId}
      order by attempted_at
    `;
    const touched = await sql<{ course_id: string }>`
      select distinct course_id from lesson_done where user_id = ${userId}
    `;
    for (const row of touched) {
      await maybeEmailCourse(sql, userId, row.course_id);
    }
    return {
      name: profiles[0]?.display_name ?? "",
      trainer: Boolean(profiles[0]?.trainer),
      completed: done.map((row) => ({ lessonId: row.lesson_id, at: millis(row.at) })),
      attempts: attempts.map((row) => ({
        lessonId: row.lesson_id,
        score: Number(row.score),
        passed: Boolean(row.passed),
        at: millis(row.at),
      })),
    };
  });

export const saveName = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((name: string) => String(name ?? "").trim().slice(0, 80))
  .handler(async ({ context, data: name }) => {
    const sql = await getSql();
    await sql`
      insert into profiles (user_id, display_name)
      values (${context.userId}, ${name})
      on conflict (user_id) do update set display_name = ${name}
    `;
    return { ok: true };
  });

export const saveDone = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { lessonId: string; courseId: string }) => ({
    lessonId: String(input?.lessonId ?? "").slice(0, 80),
    courseId: String(input?.courseId ?? "").slice(0, 80),
  }))
  .handler(async ({ context, data }) => {
    if (!lessonOk(data.courseId, data.lessonId)) return { ok: false };
    const sql = await getSql();
    const inserted = await sql<{ lesson_id: string }>`
      insert into lesson_done (user_id, lesson_id, course_id)
      values (${context.userId}, ${data.lessonId}, ${data.courseId})
      on conflict (user_id, lesson_id) do nothing
      returning lesson_id
    `;
    if (inserted.length) await maybeEmailCourse(sql, context.userId, data.courseId);
    return { ok: true };
  });

export const saveAttempt = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { lessonId: string; courseId: string; score: number; passed: boolean }) => {
    const score = Math.max(0, Math.min(100, Math.round(Number(input?.score))));
    return {
      lessonId: String(input?.lessonId ?? "").slice(0, 80),
      courseId: String(input?.courseId ?? "").slice(0, 80),
      score: Number.isFinite(score) ? score : 0,
    };
  })
  .handler(async ({ context, data }) => {
    const course = seedCourses.find((item) => item.id === data.courseId);
    const lesson = course ? flatLessons(course).find((row) => row.lesson.id === data.lessonId)?.lesson : undefined;
    if (!course || !lesson || lesson.kind !== "quiz") return { ok: false };
    const passed = data.score >= lesson.pass;
    const sql = await getSql();
    await sql`
      insert into quiz_attempts (user_id, lesson_id, course_id, score, passed)
      values (${context.userId}, ${data.lessonId}, ${data.courseId}, ${data.score}, ${passed})
    `;
    if (passed) {
      const inserted = await sql<{ lesson_id: string }>`
        insert into lesson_done (user_id, lesson_id, course_id)
        values (${context.userId}, ${data.lessonId}, ${data.courseId})
        on conflict (user_id, lesson_id) do nothing
        returning lesson_id
      `;
      if (inserted.length) await maybeEmailCourse(sql, context.userId, data.courseId);
    }
    return { ok: true };
  });

export const claimTrainer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((code: string) => String(code ?? "").slice(0, 40))
  .handler(async ({ context, data: code }) => {
    if (!codesMatch(code)) return { ok: false as const };
    const sql = await getSql();
    await sql`
      insert into profiles (user_id, trainer)
      values (${context.userId}, true)
      on conflict (user_id) do update set trainer = true
    `;
    return { ok: true as const };
  });

export const listRoster = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<{ trainer: boolean; people: RosterPerson[] }> => {
    const sql = await getSql();
    const me = await sql<{ trainer: boolean }>`
      select trainer from profiles where user_id = ${context.userId}
    `;
    if (!me[0]?.trainer) return { trainer: false, people: [] };

    const profiles = await sql<{ user_id: string; display_name: string; email: string }>`
      select user_id, display_name, email from profiles order by created_at
    `;
    const done = await sql<{ user_id: string; lesson_id: string; at: unknown }>`
      select user_id, lesson_id, extract(epoch from completed_at) * 1000 as at from lesson_done
    `;
    const attempts = await sql<{
      user_id: string;
      lesson_id: string;
      score: number;
      passed: boolean;
      at: unknown;
    }>`
      select user_id, lesson_id, score, passed, extract(epoch from attempted_at) * 1000 as at
      from quiz_attempts
    `;

    const doneByUser = new Map<string, Map<string, number>>();
    for (const row of done) {
      const map = doneByUser.get(row.user_id) ?? new Map<string, number>();
      map.set(row.lesson_id, millis(row.at));
      doneByUser.set(row.user_id, map);
    }
    const attemptsByUser = new Map<string, { lessonId: string; score: number; passed: boolean; at: number }[]>();
    for (const row of attempts) {
      const list = attemptsByUser.get(row.user_id) ?? [];
      list.push({
        lessonId: row.lesson_id,
        score: Number(row.score),
        passed: Boolean(row.passed),
        at: millis(row.at),
      });
      attemptsByUser.set(row.user_id, list);
    }

    const people: RosterPerson[] = profiles.map((profile) => {
      const finished = doneByUser.get(profile.user_id) ?? new Map<string, number>();
      const tries = attemptsByUser.get(profile.user_id) ?? [];
      let lastAt: number | null = null;
      const courses: RosterCourse[] = seedCourses.map((course) => {
        const lessons = flatLessons(course);
        const stamps = lessons.map((row) => finished.get(row.lesson.id)).filter((at): at is number => at != null);
        for (const at of stamps) lastAt = lastAt == null ? at : Math.max(lastAt, at);
        const quizzes: RosterQuiz[] = lessons
          .filter((row) => row.lesson.kind === "quiz")
          .map((row) => {
            const mine = tries.filter((attempt) => attempt.lessonId === row.lesson.id);
            for (const attempt of mine) lastAt = lastAt == null ? attempt.at : Math.max(lastAt, attempt.at);
            const best = mine.length ? Math.max(...mine.map((attempt) => attempt.score)) : null;
            const last = mine.length ? Math.max(...mine.map((attempt) => attempt.at)) : null;
            return {
              title: row.lesson.title,
              best,
              passed: mine.some((attempt) => attempt.passed),
              lastAt: last,
              passMark: row.lesson.pass,
            };
          });
        const allDone = lessons.length > 0 && stamps.length === lessons.length;
        return {
          title: course.title,
          done: stamps.length,
          total: lessons.length,
          finishedAt: allDone ? Math.max(...stamps) : null,
          quizzes,
        };
      });
      return {
        id: profile.user_id,
        name: profile.display_name.trim() || profile.email || "Signed in",
        email: profile.email,
        lastAt,
        coursesDone: courses.filter((course) => course.finishedAt != null).length,
        courses,
      };
    });

    people.sort((a, b) => (b.lastAt ?? 0) - (a.lastAt ?? 0));
    return { trainer: true, people };
  });

function whenEastern(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  }).format(value);
}

async function maybeEmailCourse(sql: Sql, userId: string, courseId: string) {
  try {
    const course = seedCourses.find((item) => item.id === courseId);
    if (!course) return;
    const lessons = flatLessons(course);
    if (!lessons.length) return;
    const done = await sql<{ lesson_id: string }>`
      select lesson_id from lesson_done where user_id = ${userId} and course_id = ${courseId}
    `;
    const have = new Set(done.map((row) => row.lesson_id));
    if (!lessons.every((row) => have.has(row.lesson.id))) return;
    const profiles = await sql<{ display_name: string; email: string; trainer: boolean }>`
      select display_name, email, trainer from profiles where user_id = ${userId}
    `;
    const profile = profiles[0];
    if (!profile || profile.trainer) return;
    const claimed = await sql<{ course_id: string }>`
      insert into course_mail (user_id, course_id)
      values (${userId}, ${courseId})
      on conflict (user_id, course_id) do nothing
      returning course_id
    `;
    if (!claimed.length) return;
    const sent = await sendFinishEmail(sql, userId, profile, course);
    if (!sent) {
      await sql`delete from course_mail where user_id = ${userId} and course_id = ${courseId}`;
    }
  } catch {
    // A missed note must not block the lesson save. The next visit tries again.
  }
}

async function sendFinishEmail(
  sql: Sql,
  userId: string,
  profile: { display_name: string; email: string },
  course: Course,
) {
  const stamps = await sql<{ at: Date | string }>`
    select max(completed_at) as at from lesson_done
    where user_id = ${userId} and course_id = ${course.id}
  `;
  const finished = stamps[0]?.at ? new Date(stamps[0].at) : new Date();
  const attempts = await sql<{ lesson_id: string; score: number; passed: boolean }>`
    select lesson_id, score, passed from quiz_attempts
    where user_id = ${userId} and course_id = ${course.id}
  `;
  const quizLines = flatLessons(course)
    .filter((row) => row.lesson.kind === "quiz")
    .map((row) => {
      const mine = attempts.filter((attempt) => attempt.lesson_id === row.lesson.id);
      if (!mine.length) return `${row.lesson.title}: no score`;
      const best = Math.max(...mine.map((attempt) => Number(attempt.score)));
      const passed = mine.some((attempt) => attempt.passed);
      return `${row.lesson.title}: ${best}% ${passed ? "passed" : "not passed"}`;
    });
  const counts = await sql<{ course_id: string; n: number }>`
    select course_id, count(distinct lesson_id)::int as n
    from lesson_done where user_id = ${userId}
    group by course_id
  `;
  const byCourse = new Map(counts.map((row) => [row.course_id, Number(row.n)]));
  const packetDone = seedCourses.every((item) => byCourse.get(item.id) === flatLessons(item).length);
  const name = profile.display_name.trim() || profile.email || "A new manager";
  const who = profile.email ? `${name} (${profile.email})` : name;
  const lines = [
    `${who} finished ${course.title}.`,
    `Finished ${whenEastern(finished)} ET.`,
    "",
    quizLines.length ? quizLines.join("\n") : "This course has no quiz.",
  ];
  if (packetDone) lines.push("", "The full new-manager packet is finished.");
  const { callTool, ConnectorType } = await import("@/lib/app-data/client.server");
  const result = await callTool(
    "gmail_send_message",
    {
      to: [TRAINER_EMAIL],
      subject: `New Manager: ${name} finished ${course.title}`,
      body: lines.join("\n"),
    },
    { connectorType: ConnectorType.Gmail },
  );
  return result.ok;
}
