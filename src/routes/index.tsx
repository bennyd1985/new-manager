import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Eyebrow, fieldClass, LinkButton, Meter } from "@/components/ui";
import { academyStats, courseMinutes, courseProgress, resumePoint } from "@/lib/lms/logic";
import { useLms } from "@/lib/lms/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const courses = useLms((state) => state.courses);
  const completed = useLms((state) => state.completed);
  const name = useLms((state) => state.name);
  const setName = useLms((state) => state.setName);
  const lastLessonId = useLms((state) => state.lastLessonId);
  const stats = academyStats(courses, completed);
  const point = resumePoint(courses, completed, lastLessonId);
  const started = stats.done > 0;

  return (
    <div className="flex flex-col gap-10">
      <header>
        <Eyebrow>New Manager</Eyebrow>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
          {name.trim() ? `${name.trim()}, pick up where you left off.` : "Pick up where you left off."}
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          {stats.done === 0
            ? "Nothing finished yet. This is the new-manager packet: core values, food safety, the everyday menu, daily procedures, store materials, and food and packaging cost. Work them in order."
            : `${stats.done} of ${stats.lessons} lessons finished. ${stats.quizzesPassed} ${stats.quizzesPassed === 1 ? "quiz" : "quizzes"} passed. ${stats.certificates} ${stats.certificates === 1 ? "certificate" : "certificates"}.`}
        </p>
        <label className="mt-5 block max-w-sm">
          <span className="mb-1 block text-sm text-muted">Name on certificates</span>
          <input
            className={fieldClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            maxLength={80}
          />
        </label>
      </header>

      {point ? (
        <article className="flex overflow-hidden rounded-card border border-line bg-surface">
          <div className="w-1.5 shrink-0 bg-honey" aria-hidden />
          <div className="flex flex-1 flex-col gap-4 p-5">
            <Eyebrow>{started ? "Continue" : "Start here"}</Eyebrow>
            <div>
              <h2 className="font-display text-3xl">{point.lesson.title}</h2>
              <p className="mt-1 text-muted">
                {point.course.title} · {point.module.title}
              </p>
            </div>
            <div>
              <LinkButton
                to="/learn/$courseId/$lessonId"
                params={{ courseId: point.course.id, lessonId: point.lesson.id }}
              >
                {started ? "Open lesson" : "Start lesson"}
              </LinkButton>
            </div>
          </div>
        </article>
      ) : (
        <article className="rounded-card border border-line bg-surface p-5">
          <Eyebrow>Path complete</Eyebrow>
          <h2 className="mt-2 font-display text-3xl">You’re through every lesson.</h2>
          <p className="mt-2 text-muted">Every lesson in the packet is finished.</p>
          <div className="mt-4">
            <LinkButton to="/certificates">View certificates</LinkButton>
          </div>
        </article>
      )}

      <section>
        <div className="mb-2 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl">The path</h2>
          <Link to="/courses" className="text-sm text-honey">
            All courses
          </Link>
        </div>
        <ol>
          {courses.map((course, index) => {
            const progress = courseProgress(course, completed);
            const mins = courseMinutes(course);
            return (
              <li key={course.id} className="border-b border-line">
                <Link
                  to="/courses/$courseId"
                  params={{ courseId: course.id }}
                  className="flex items-center gap-4 py-4"
                >
                  <span className="w-8 shrink-0 font-display text-xl text-honey tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{course.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {mins} min
                      {progress > 0 ? ` · ${Math.round(progress * 100)}%` : ""}
                    </span>
                    <span className="mt-2 block">
                      <Meter value={progress} />
                    </span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-muted" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
