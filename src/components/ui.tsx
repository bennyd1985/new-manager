import { createLink } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-5 text-base font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 min-h-11",
  {
    variants: {
      tone: {
        primary: "bg-honey text-honeyink hover:bg-honey/90",
        quiet: "bg-raised text-ink hover:bg-line",
        ghost: "bg-transparent text-ink hover:bg-raised",
      },
    },
    defaultVariants: { tone: "primary" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>;

export function Button({ className, tone, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonStyles({ tone }), className)} {...props} />;
}

const AnchorButton = forwardRef<
  HTMLAnchorElement,
  ComponentProps<"a"> & VariantProps<typeof buttonStyles>
>(function AnchorButton({ className, tone, ...props }, ref) {
  return <a ref={ref} className={cn(buttonStyles({ tone }), className)} {...props} />;
});

export const LinkButton = createLink(AnchorButton);

export function Meter({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-raised"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-honey transition-[width] duration-200" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium uppercase tracking-widest text-honey">{children}</p>;
}

export const fieldClass =
  "w-full rounded-xl border border-line bg-canvas px-3 py-3 text-base text-ink placeholder:text-muted min-h-11";
