import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Eyebrow, fieldClass, Meter } from "@/components/ui";
import { courseMinutes, courseProgress, lessonCount } from "@/lib/lms/logic";
import { useLms } from "@/lib/lms/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/courses/")({ component: CoursesPage });

function CoursesPage() {
  const courses = useLms((state) => state.courses);
  const completed = useLms((state) => state.completed);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      if (!needle) return true;
      return course.title.toLowerCase().includes(needle) || course.blurb.toLowerCase().includes(needle);
    });
  }, [courses, query]);

  return (
    <div>
      <header className="mb-6">
        <Eyebrow>Catalog</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Courses</h1>
        <p className="mt-2 text-muted">The new-manager packet. Work them in order.</p>
      </header>

      <label className="relative block">
        <span className="sr-only">Search courses</span>
        <Search className="pointer-events-none absolute top-3.5 left-3 size-5 text-muted" aria-hidden />
        <input
          className={cn(fieldClass, "pl-11")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses"
        />
      </label>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">No course matches that. Clear the search.</p>
      ) : (
        <ul className="mt-4">
          {visible.map((course) => {
            const progress = courseProgress(course, completed);
            return (
              <li key={course.id} className="border-b border-line">
                <Link to="/courses/$courseId" params={{ courseId: course.id }} className="block py-5">
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block font-display text-2xl">{course.title}</span>
                    </span>
                    <ChevronRight className="mt-1 size-5 shrink-0 text-muted" aria-hidden />
                  </span>
                  <span className="mt-2 block text-muted">{course.blurb}</span>
                  <span className="mt-3 flex items-center gap-3 text-sm text-muted">
                    <span>
                      {lessonCount(course)} lessons · {courseMinutes(course)} min
                    </span>
                    {progress > 0 ? <span className="tabular-nums">{Math.round(progress * 100)}%</span> : null}
                  </span>
                  <span className="mt-2 block">
                    <Meter value={progress} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
