import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Lock } from "lucide-react";
import { LinkButton, Meter } from "@/components/ui";
import { courseMinutes, courseProgress, flatLessons, isCourseComplete, isUnlocked, resumeInCourse } from "@/lib/lms/logic";
import { useLms } from "@/lib/lms/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/courses/$courseId")({ component: CoursePage });

function CoursePage() {
  const { courseId } = Route.useParams();
  const course = useLms((state) => state.courses.find((item) => item.id === courseId));
  const completed = useLms((state) => state.completed);

  if (!course) {
    return (
      <div>
        <h1 className="font-display text-4xl">That course is not in the academy.</h1>
        <Link to="/courses" className="mt-4 inline-block text-honey">
          Back to courses
        </Link>
      </div>
    );
  }

  const progress = courseProgress(course, completed);
  const done = isCourseComplete(course, completed);
  const next = resumeInCourse(course, completed);
  const total = flatLessons(course).length;

  return (
    <div>
      <Link to="/courses" className="text-sm text-muted">
        Courses
      </Link>
      <header className="mt-3">
        <h1 className="font-display text-4xl">{course.title}</h1>
        <p className="mt-3 text-muted">{course.blurb}</p>
        <p className="mt-3 text-sm text-muted">
          {total} lessons · {courseMinutes(course)} min
          {progress > 0 ? ` · ${Math.round(progress * 100)}% complete` : ""}
        </p>
        <div className="mt-3">
          <Meter value={progress} />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {next ? (
            <LinkButton
              to="/learn/$courseId/$lessonId"
              params={{ courseId: course.id, lessonId: next.lesson.id }}
            >
              {progress === 0 ? "Start course" : done ? "Review" : "Continue"}
            </LinkButton>
          ) : null}
          {done ? (
            <LinkButton to="/certificates" tone="quiet">
              View certificate
            </LinkButton>
          ) : null}
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-8">
        {course.modules.map((module) => (
          <section key={module.id}>
            <h2 className="font-display text-2xl">{module.title}</h2>
            <ol className="mt-2">
              {module.lessons.map((lesson) => {
                const finished = completed[lesson.id] != null;
                const open = isUnlocked(course, lesson.id, completed, false);
                const inner = (
                  <>
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border",
                        finished ? "border-honey bg-honey text-honeyink" : "border-line text-muted",
                      )}
                      aria-hidden
                    >
                      {finished ? <Check className="size-4" /> : open ? <ChevronRight className="size-4" /> : <Lock className="size-3.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{lesson.title}</span>
                      <span className="text-sm text-muted">
                        {lesson.kind === "quiz" ? "Quiz" : "Reading"} · {lesson.minutes} min
                        {!open ? " · Locked" : ""}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={lesson.id} className="border-b border-line">
                    {open ? (
                      <Link
                        to="/learn/$courseId/$lessonId"
                        params={{ courseId: course.id, lessonId: lesson.id }}
                        className="flex items-center gap-3 py-3"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3 py-3 opacity-70">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
