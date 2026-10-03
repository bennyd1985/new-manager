import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button, fieldClass } from "@/components/ui";
import { blocksFromDraft, draftFromBlocks, type ReadDraft } from "@/lib/lms/logic";
import { useLms } from "@/lib/lms/store";
import type { Course, Lesson } from "@/lib/lms/types";
import { AUDIENCES } from "@/lib/lms/types";

export function CourseEditor({ course }: { course: Course }) {
  const updateCourse = useLms((state) => state.updateCourse);
  const addModule = useLms((state) => state.addModule);
  const renameModule = useLms((state) => state.renameModule);
  const removeModule = useLms((state) => state.removeModule);
  const moveModule = useLms((state) => state.moveModule);
  const addLesson = useLms((state) => state.addLesson);
  const updateLesson = useLms((state) => state.updateLesson);
  const removeLesson = useLms((state) => state.removeLesson);
  const moveLesson = useLms((state) => state.moveLesson);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link to="/studio" className="text-sm text-muted">
          Studio
        </Link>
        <h1 className="mt-2 font-display text-4xl">Edit course</h1>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm text-muted">Title</span>
        <input
          className={fieldClass}
          value={course.title}
          onChange={(event) => updateCourse(course.id, { title: event.target.value })}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-muted">Summary</span>
        <textarea
          className={fieldClass}
          rows={3}
          value={course.blurb}
          onChange={(event) => updateCourse(course.id, { blurb: event.target.value })}
        />
      </label>
      <label className="block max-w-xs">
        <span className="mb-1 block text-sm text-muted">Who it’s for</span>
        <select
          className={fieldClass}
          value={course.audience}
          onChange={(event) =>
            updateCourse(course.id, { audience: event.target.value as Course["audience"] })
          }
        >
          {AUDIENCES.map((audience) => (
            <option key={audience} value={audience}>
              {audience}
            </option>
          ))}
        </select>
      </label>

      {course.modules.map((module, moduleIndex) => (
        <section key={module.id} className="rounded-card border border-line p-4">
          <div className="flex flex-wrap items-end gap-2">
            <label className="min-w-0 flex-1">
              <span className="mb-1 block text-sm text-muted">Module</span>
              <input
                className={fieldClass}
                value={module.title}
                onChange={(event) => renameModule(course.id, module.id, event.target.value)}
              />
            </label>
            <Button tone="ghost" onClick={() => moveModule(course.id, module.id, -1)} disabled={moduleIndex === 0}>
              Up
            </Button>
            <Button
              tone="ghost"
              onClick={() => moveModule(course.id, module.id, 1)}
              disabled={moduleIndex === course.modules.length - 1}
            >
              Down
            </Button>
            <Button tone="ghost" onClick={() => removeModule(course.id, module.id)}>
              Remove
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {module.lessons.map((lesson, lessonIndex) => (
              <LessonEditor
                key={lesson.id}
                courseId={course.id}
                lesson={lesson}
                disableUp={lessonIndex === 0}
                disableDown={lessonIndex === module.lessons.length - 1}
                onChange={(patch) => updateLesson(course.id, lesson.id, patch)}
                onRemove={() => removeLesson(course.id, lesson.id)}
                onMove={(direction) => moveLesson(course.id, module.id, lesson.id, direction)}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button tone="quiet" onClick={() => addLesson(course.id, module.id, "read")}>
              Add reading
            </Button>
            <Button tone="quiet" onClick={() => addLesson(course.id, module.id, "quiz")}>
              Add quiz
            </Button>
          </div>
        </section>
      ))}

      <div>
        <Button onClick={() => addModule(course.id)}>Add module</Button>
      </div>
    </div>
  );
}

function LessonEditor({
  courseId,
  lesson,
  disableUp,
  disableDown,
  onChange,
  onRemove,
  onMove,
}: {
  courseId: string;
  lesson: Lesson;
  disableUp: boolean;
  disableDown: boolean;
  onChange: (patch: Partial<Lesson>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const addQuestion = useLms((state) => state.addQuestion);
  const updateQuestion = useLms((state) => state.updateQuestion);
  const removeQuestion = useLms((state) => state.removeQuestion);

  return (
    <article className="rounded-xl bg-raised p-4">
      <div className="flex flex-wrap gap-2">
        <label className="min-w-48 flex-1">
          <span className="mb-1 block text-sm text-muted">Lesson</span>
          <input
            className={fieldClass}
            value={lesson.title}
            onChange={(event) => onChange({ title: event.target.value })}
          />
        </label>
        <label className="w-24">
          <span className="mb-1 block text-sm text-muted">Minutes</span>
          <input
            className={fieldClass}
            type="number"
            min={1}
            max={180}
            value={lesson.minutes}
            onChange={(event) => onChange({ minutes: Number(event.target.value) || 1 })}
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button tone="ghost" onClick={() => onMove(-1)} disabled={disableUp}>
          Up
        </Button>
        <Button tone="ghost" onClick={() => onMove(1)} disabled={disableDown}>
          Down
        </Button>
        <Link
          to="/learn/$courseId/$lessonId"
          params={{ courseId, lessonId: lesson.id }}
          search={{ preview: true }}
          className="inline-flex min-h-11 items-center px-3 text-honey"
        >
          Preview
        </Link>
        <Button tone="ghost" onClick={onRemove}>
          Remove
        </Button>
      </div>

      {lesson.kind === "read" ? (
        <ReadFields lesson={lesson} onChange={onChange} />
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          <label className="block max-w-xs">
            <span className="mb-1 block text-sm text-muted">Pass mark %</span>
            <input
              className={fieldClass}
              type="number"
              min={1}
              max={100}
              value={lesson.pass}
              onChange={(event) => onChange({ pass: Number(event.target.value) || 80 })}
            />
          </label>
          {lesson.questions.map((question, index) => (
            <fieldset key={question.id} className="rounded-xl border border-line p-3">
              <legend className="px-1 text-sm text-muted">Question {index + 1}</legend>
              <textarea
                className={fieldClass}
                rows={2}
                value={question.prompt}
                onChange={(event) =>
                  updateQuestion(courseId, lesson.id, question.id, { prompt: event.target.value })
                }
              />
              <div className="mt-2 flex flex-col gap-2">
                {question.choices.map((choice, choiceIndex) => (
                  <label key={choiceIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="size-4 accent-honey"
                      name={question.id}
                      checked={question.answer === choiceIndex}
                      onChange={() => updateQuestion(courseId, lesson.id, question.id, { answer: choiceIndex })}
                    />
                    <input
                      className={fieldClass}
                      value={choice}
                      aria-label={`Choice ${choiceIndex + 1}`}
                      onChange={(event) => {
                        const choices = question.choices.slice();
                        choices[choiceIndex] = event.target.value;
                        updateQuestion(courseId, lesson.id, question.id, { choices });
                      }}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-2 block">
                <span className="mb-1 block text-sm text-muted">Why it’s right</span>
                <textarea
                  className={fieldClass}
                  rows={2}
                  value={question.explain}
                  onChange={(event) =>
                    updateQuestion(courseId, lesson.id, question.id, { explain: event.target.value })
                  }
                />
              </label>
              <Button
                tone="ghost"
                className="mt-2"
                onClick={() => removeQuestion(courseId, lesson.id, question.id)}
              >
                Remove question
              </Button>
            </fieldset>
          ))}
          <Button tone="quiet" onClick={() => addQuestion(courseId, lesson.id)}>
            Add question
          </Button>
        </div>
      )}
    </article>
  );
}

function ReadFields({ lesson, onChange }: { lesson: Lesson; onChange: (patch: Partial<Lesson>) => void }) {
  const [draft, setDraft] = useState<ReadDraft>(() => draftFromBlocks(lesson.blocks));
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  function commit() {
    onChangeRef.current({ blocks: blocksFromDraft(draftRef.current) });
  }

  useEffect(() => () => commit(), []);

  function set<K extends keyof ReadDraft>(key: K, value: ReadDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      <label className="block">
        <span className="mb-1 block text-sm text-muted">Lesson text · blank line for a new paragraph</span>
        <textarea
          className={fieldClass}
          rows={8}
          value={draft.prose}
          onChange={(event) => set("prose", event.target.value)}
          onBlur={commit}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-sm text-muted">Note title</span>
          <input
            className={fieldClass}
            value={draft.tipTitle}
            onChange={(event) => set("tipTitle", event.target.value)}
            onBlur={commit}
          />
        </label>
        <label>
          <span className="mb-1 block text-sm text-muted">Note</span>
          <input
            className={fieldClass}
            value={draft.tipText}
            onChange={(event) => set("tipText", event.target.value)}
            onBlur={commit}
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-sm text-muted">Caution title</span>
          <input
            className={fieldClass}
            value={draft.warnTitle}
            onChange={(event) => set("warnTitle", event.target.value)}
            onBlur={commit}
          />
        </label>
        <label>
          <span className="mb-1 block text-sm text-muted">Caution</span>
          <input
            className={fieldClass}
            value={draft.warnText}
            onChange={(event) => set("warnText", event.target.value)}
            onBlur={commit}
          />
        </label>
      </div>
      <label>
        <span className="mb-1 block text-sm text-muted">Bullets · one per line. A blank line starts another list.</span>
        <textarea
          className={fieldClass}
          rows={6}
          value={draft.bullets}
          onChange={(event) => set("bullets", event.target.value)}
          onBlur={commit}
        />
      </label>
      <label>
        <span className="mb-1 block text-sm text-muted">Steps · one per line</span>
        <textarea
          className={fieldClass}
          rows={4}
          value={draft.steps}
          onChange={(event) => set("steps", event.target.value)}
          onBlur={commit}
        />
      </label>
      <label>
        <span className="mb-1 block text-sm text-muted">Checklist · one per line</span>
        <textarea
          className={fieldClass}
          rows={4}
          value={draft.checks}
          onChange={(event) => set("checks", event.target.value)}
          onBlur={commit}
        />
      </label>
    </div>
  );
}
