import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Block } from "@/lib/lms/types";

export function LessonBody({
  blocks,
  checks,
  onToggle,
}: {
  blocks: Block[];
  checks: Record<string, boolean>;
  onToggle?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index} className="text-lg leading-normal text-ink">
              {block.text}
            </p>
          );
        }
        if (block.type === "tip" || block.type === "warn") {
          const warn = block.type === "warn";
          return (
            <aside key={index} className={cn("border-l-4 py-1 pl-4", warn ? "border-bad" : "border-honey")}>
              <p className={cn("text-sm font-medium", warn ? "text-bad" : "text-honey")}>{block.title}</p>
              <p className="mt-1 text-ink">{block.text}</p>
            </aside>
          );
        }
        if (block.type === "figure") {
          return (
            <figure key={index} className="overflow-hidden rounded-card border border-line bg-white">
              <img
                src={block.src}
                alt={block.alt}
                className={block.fit === "wide" ? "w-full" : "mx-auto w-full max-w-md"}
              />
              {block.caption ? <figcaption className="px-4 py-3 text-sm text-muted">{block.caption}</figcaption> : null}
            </figure>
          );
        }
        if (block.type === "steps") {
          return (
            <ol key={index} className="flex flex-col gap-3">
              {block.items.map((item, step) => (
                <li key={item} className="flex gap-3">
                  <span className="w-6 shrink-0 font-display text-xl text-honey tabular-nums">{step + 1}</span>
                  <span className="pt-0.5 text-lg leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-snug text-ink">
                  <span className="mt-0.5 shrink-0 font-display text-2xl leading-none text-honey" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ul key={index} className="flex flex-col gap-2">
            {block.items.map((item) => {
              const on = Boolean(checks[item.id]);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onToggle?.(item.id)}
                    aria-pressed={on}
                    className="flex w-full items-start gap-3 rounded-xl border border-line bg-surface px-3 py-3 text-left"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded border",
                        on ? "border-honey bg-honey text-honeyink" : "border-muted",
                      )}
                      aria-hidden
                    >
                      {on ? <Check className="size-3.5" /> : null}
                    </span>
                    <span className={on ? "text-muted" : "text-ink"}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
