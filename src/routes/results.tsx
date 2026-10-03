import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button, Eyebrow, fieldClass } from "@/components/ui";
import { claimTrainer, listRoster, type RosterPerson } from "@/lib/lms/roster.functions";
import { useLms } from "@/lib/lms/store";

export const Route = createFileRoute("/results")({ component: ResultsPage });

function when(at: number | null) {
  if (at == null) return "Not finished";
  return new Date(at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ResultsPage() {
  const [trainer, setTrainer] = useState<boolean | null>(null);
  const [people, setPeople] = useState<RosterPerson[]>([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function refresh() {
    const roster = await listRoster();
    setTrainer(roster.trainer);
    setPeople(roster.people);
    useLms.getState().setTrainer(roster.trainer);
  }

  useEffect(() => {
    void refresh().catch(() => setTrainer(false));
  }, []);

  async function claim(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await claimTrainer({ data: code });
      if (!result.ok) {
        setError("That code is not the trainer code.");
        return;
      }
      setCode("");
      await refresh();
    } catch {
      setError("Could not check the code.");
    } finally {
      setPending(false);
    }
  }

  if (trainer == null) {
    return <p className="text-muted">Loading scores…</p>;
  }

  if (!trainer) {
    return (
      <div className="max-w-md">
        <Eyebrow>Trainer</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Scores</h1>
        <p className="mt-3 text-muted">
          Crew scores stay with the trainer. Enter the trainer code once on this browser’s account.
        </p>
        <form className="mt-5 flex flex-col gap-3" onSubmit={(event) => void claim(event)}>
          <label>
            <span className="mb-1 block text-sm text-muted">Trainer code</span>
            <input className={fieldClass} value={code} onChange={(event) => setCode(event.target.value)} autoComplete="off" />
          </label>
          {error ? <p className="text-sm text-bad">{error}</p> : null}
          <Button type="submit" disabled={pending || !code.trim()}>
            {pending ? "Checking…" : "Unlock scores"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow>Trainer</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">Scores</h1>
      <p className="mt-3 max-w-xl text-muted">
        Everyone who signs in from the published link shows up here, with quiz scores and the time they finish a course.
        A course finish also emails ben@loveandhoneyfriedchicken.com.
      </p>
      {people.length === 0 ? (
        <p className="mt-8 text-muted">Nobody has signed in yet.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {people.map((person) => (
            <li key={person.id} className="rounded-card border border-line bg-surface p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl">{person.name}</h2>
                <p className="text-sm text-muted tabular-nums">
                  {person.coursesDone} of {person.courses.length} courses
                </p>
              </div>
              {person.email ? <p className="text-sm text-muted">{person.email}</p> : null}
              <ul className="mt-4 flex flex-col gap-3">
                {person.courses.map((course) => (
                  <li key={course.title} className="border-t border-line pt-3">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-muted">
                      {course.done} of {course.total} lessons
                      {course.finishedAt != null ? ` · Finished ${when(course.finishedAt)}` : ""}
                    </p>
                    {course.quizzes.map((quiz) => (
                      <p key={quiz.title} className="mt-1 text-sm">
                        {quiz.title}:{" "}
                        {quiz.best == null ? (
                          <span className="text-muted">not taken</span>
                        ) : (
                          <span className={quiz.passed ? "text-ok" : "text-bad"}>
                            {quiz.best}% {quiz.passed ? "passed" : "not passed"} · {when(quiz.lastAt)}
                          </span>
                        )}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
