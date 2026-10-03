import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Eyebrow, LinkButton } from "@/components/ui";
import { courseMinutes, lessonCount } from "@/lib/lms/logic";
import { SEED_IDS } from "@/lib/lms/seed";
import { useLms } from "@/lib/lms/store";

export const Route = createFileRoute("/studio/")({ component: StudioPage });

const seedIds = new Set<string>(SEED_IDS);

function StudioPage() {
  const courses = useLms((state) => state.courses);
  const addCourse = useLms((state) => state.addCourse);
  const removeCourse = useLms((state) => state.removeCourse);
  const restoreSamples = useLms((state) => state.restoreSamples);
  const clearProgress = useLms((state) => state.clearProgress);
  const navigate = useNavigate();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState<"restore" | "clear" | null>(null);

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Author</Eyebrow>
          <h1 className="mt-2 font-display text-4xl">Studio</h1>
          <p className="mt-2 max-w-xl text-muted">
            These courses came from the Love & Honey packets in Drive. Edit them or add your own. Changes stay in this browser.
          </p>
        </div>
        <Button
          onClick={() => {
            const id = addCourse();
            void navigate({ to: "/studio/$courseId", params: { courseId: id } });
          }}
        >
          New course
        </Button>
      </header>

      <ul>
        {courses.map((course) => (
          <li key={course.id} className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{course.title}</p>
              <p className="text-sm text-muted">
                {course.audience} · {lessonCount(course)} lessons · {courseMinutes(course)} min
                {seedIds.has(course.id) ? " · Drive" : " · Yours"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <LinkButton to="/studio/$courseId" params={{ courseId: course.id }} tone="quiet">
                Edit
              </LinkButton>
              {pendingDelete === course.id ? (
                <Button
                  tone="ghost"
                  onClick={() => {
                    removeCourse(course.id);
                    setPendingDelete(null);
                  }}
                >
                  Confirm delete
                </Button>
              ) : (
                <Button tone="ghost" onClick={() => setPendingDelete(course.id)}>
                  Delete
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-card border border-line p-4">
        <h2 className="font-display text-2xl">Reset</h2>
        <p className="mt-2 text-sm text-muted">
          Restore puts the Drive courses back. Courses you created stay. Clear progress wipes finished lessons, checks, and quiz scores. Your name stays.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {confirmReset === "restore" ? (
            <Button
              onClick={() => {
                restoreSamples();
                setConfirmReset(null);
              }}
            >
              Restore Drive courses
            </Button>
          ) : (
            <Button tone="quiet" onClick={() => setConfirmReset("restore")}>
              Restore Drive
            </Button>
          )}
          {confirmReset === "clear" ? (
            <Button
              tone="quiet"
              onClick={() => {
                clearProgress();
                setConfirmReset(null);
              }}
            >
              Clear progress now
            </Button>
          ) : (
            <Button tone="ghost" onClick={() => setConfirmReset("clear")}>
              Clear my progress
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
