import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LessonBody } from "@/components/lesson-body";
import { Button, Eyebrow, LinkButton } from "@/components/ui";
import { bestScore, checkIds, findLesson, isUnlocked, neighborLessons, resumeInCourse } from "@/lib/lms/logic";
import { useLms } from "@/lib/lms/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/learn/$courseId/$lessonId")({
  validateSearch: (search: Record<string, unknown>): { preview?: boolean } => {
    const on = search.preview === "1" || search.preview === 1 || search.preview === true;
    return on ? { preview: true } : {};
  },
  component: LearnPage,
});

function LearnPage() {
  const { courseId, lessonId } = Route.useParams();
  const preview = Boolean(Route.useSearch().preview);
  const course = useLms((state) => state.courses.find((item) => item.id === courseId));
  const completed = useLms((state) => state.completed);
  const checks = useLms((state) => state.checks);
  const attempts = useLms((state) => state.attempts);
  const toggleCheck = useLms((state) => state.toggleCheck);
  const completeLesson = useLms((state) => state.completeLesson);

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

  const found = findLesson(course, lessonId);
  if (!found) {
    return (
      <div>
        <h1 className="font-display text-4xl">That lesson is missing.</h1>
        <Link to="/courses/$courseId" params={{ courseId }} className="mt-4 inline-block text-honey">
          Back to the course
        </Link>
      </div>
    );
  }

  const unlocked = isUnlocked(course, lessonId, completed, false);
  if (!unlocked) {
    const gate = resumeInCourse(course, completed);
    return (
      <div>
        <Eyebrow>{course.title}</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">This lesson is still locked.</h1>
        <p className="mt-3 text-muted">Finish the lesson before it. Skipping is off for this academy.</p>
        {gate ? (
          <div className="mt-5">
            <LinkButton to="/learn/$courseId/$lessonId" params={{ courseId, lessonId: gate.lesson.id }}>
              Go to {gate.lesson.title}
            </LinkButton>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <LessonView
      key={lessonId}
      courseId={courseId}
      courseTitle={course.title}
      moduleTitle={found.module.title}
      lesson={found.lesson}
      neighbors={neighborLessons(course, lessonId)}
      done={completed[lessonId] != null}
      checks={checks}
      priorBest={bestScore(attempts, lessonId)}
      canAdvance={completed[lessonId] != null}
      preview={preview}
      onToggle={toggleCheck}
      onComplete={() => completeLesson(lessonId)}
    />
  );
}

function LessonView({
  courseId,
  courseTitle,
  moduleTitle,
  lesson,
  neighbors,
  done,
  checks,
  priorBest,
  preview,
  canAdvance,
  onToggle,
  onComplete,
}: {
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
  lesson: import("@/lib/lms/types").Lesson;
  neighbors: ReturnType<typeof neighborLessons>;
  done: boolean;
  checks: Record<string, boolean>;
  priorBest: number | null;
  preview: boolean;
  canAdvance: boolean;
  onToggle: (id: string) => void;
  onComplete: () => void;
}) {
  const touchLesson = useLms((state) => state.touchLesson);
  const required = checkIds(lesson);
  const ready = required.every((id) => checks[id]);
  const position = neighbors.index + 1;

  useEffect(() => {
    touchLesson(lesson.id);
  }, [lesson.id, touchLesson]);

  return (
    <article>
      <Link to="/courses/$courseId" params={{ courseId }} className="text-sm text-muted">
        {courseTitle}
      </Link>
      <header className="mt-3 mb-8">
        <Eyebrow>
          {moduleTitle} · {position} of {neighbors.total}
        </Eyebrow>
        <h1 className="mt-2 font-display text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {lesson.kind === "quiz" ? "Quiz" : "Reading"} · {lesson.minutes} min
          {done ? " · Finished" : ""}
        </p>
      </header>

      {lesson.kind === "quiz" ? (
        <Quiz
          lesson={lesson}
          priorBest={priorBest}
          done={done}
          onPass={onComplete}
        />
      ) : (
        <>
          <LessonBody blocks={lesson.blocks} checks={checks} onToggle={onToggle} />
          <div className="mt-8 flex flex-col gap-3">
            {done ? (
              <p className="text-ok">Lesson finished.</p>
            ) : (
              <>
                {!ready ? <p className="text-sm text-muted">Check every item on the list to finish.</p> : null}
                <Button onClick={onComplete} disabled={!ready}>
                  Mark lesson finished
                </Button>
              </>
            )}
          </div>
        </>
      )}

      <footer className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-4">
        {neighbors.prev ? (
          <Link
            to="/learn/$courseId/$lessonId"
            params={{ courseId, lessonId: neighbors.prev.lesson.id }}
            search={preview ? { preview: true } : {}}
            className="min-h-11 text-honey"
          >
            Previous
          </Link>
        ) : (
          <span />
        )}
        {neighbors.next && canAdvance ? (
          <Link
            to="/learn/$courseId/$lessonId"
            params={{ courseId, lessonId: neighbors.next.lesson.id }}
            search={preview ? { preview: true } : {}}
            className="inline-flex min-h-11 items-center text-honey"
          >
            Next
          </Link>
        ) : neighbors.next ? (
          <span className="text-sm text-muted">Finish this lesson to continue</span>
        ) : done ? (
          <Link to="/courses/$courseId" params={{ courseId }} className="min-h-11 text-honey">
            Back to course
          </Link>
        ) : (
          <span />
        )}
      </footer>
    </article>
  );
}

function Quiz({
  lesson,
  priorBest,
  done,
  onPass,
}: {
  lesson: import("@/lib/lms/types").Lesson;
  priorBest: number | null;
  done: boolean;
  onPass: () => void;
}) {
  const recordAttempt = useLms((state) => state.recordAttempt);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const questions = lesson.questions;
  const allPicked = questions.every((question) => picked[question.id] != null);
  const passed = score != null && score >= lesson.pass;

  function submit() {
    if (!questions.length) return;
    const correct = questions.filter((question) => picked[question.id] === question.answer).length;
    const next = Math.round((correct / questions.length) * 100);
    const ok = next >= lesson.pass;
    setScore(next);
    setSubmitted(true);
    recordAttempt({ lessonId: lesson.id, score: next, passed: ok, at: Date.now() });
    if (ok) onPass();
  }

  function retake() {
    setPicked({});
    setSubmitted(false);
    setScore(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <LessonBody blocks={lesson.blocks} checks={{}} />
      {priorBest != null && !submitted ? (
        <p className="text-sm text-muted">
          Best score so far: <span className="tabular-nums text-ink">{priorBest}%</span>
          {done ? " · Already passed" : ""}
        </p>
      ) : null}
      {submitted && score != null ? (
        <p className={cn("text-lg", passed ? "text-ok" : "text-bad")} role="status">
          {score}% — {passed ? `passed. You needed ${lesson.pass}%.` : `not yet. You need ${lesson.pass}% to finish.`}
        </p>
      ) : (
        <p className="text-sm text-muted">Pass mark {lesson.pass}%.</p>
      )}

      <ol className="flex flex-col gap-6">
        {questions.map((question, index) => (
          <li key={question.id}>
            <fieldset>
              <legend className="font-medium">
                {index + 1}. {question.prompt}
              </legend>
              <div className="mt-3 flex flex-col gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const selected = picked[question.id] === choiceIndex;
                  const show = submitted;
                  const correct = choiceIndex === question.answer;
                  return (
                    <label
                      key={choiceIndex}
                      className={cn(
                        "flex min-h-11 items-start gap-3 rounded-xl border px-3 py-3",
                        show && correct && "border-ok",
                        show && selected && !correct && "border-bad",
                        !show && selected && "border-honey bg-raised",
                        !show && !selected && "border-line",
                      )}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        className="mt-1 accent-honey"
                        checked={selected}
                        disabled={submitted}
                        onChange={() => setPicked((current) => ({ ...current, [question.id]: choiceIndex }))}
                      />
                      <span>
                        {choice}
                        {show && correct ? <span className="mt-1 block text-sm text-ok">Correct</span> : null}
                        {show && selected && !correct ? (
                          <span className="mt-1 block text-sm text-bad">Not this one</span>
                        ) : null}
                      </span>
                    </label>
                  );
                })}
              </div>
              {submitted ? <p className="mt-2 text-sm text-muted">{question.explain}</p> : null}
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-3">
        {!submitted ? (
          <Button onClick={submit} disabled={!allPicked || questions.length === 0}>
            Submit answers
          </Button>
        ) : (
          <Button tone="quiet" onClick={retake}>
            Retake
          </Button>
        )}
      </div>
      {!submitted && !allPicked ? <p className="text-sm text-muted">Answer every question to submit.</p> : null}
    </div>
  );
}
