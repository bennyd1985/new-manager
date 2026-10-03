import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { Award, ClipboardList, House, Library, PenLine } from "lucide-react";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { clearOAuthAttempt, explainAuthError, readAuthError } from "@/lib/auth-error";
import { cn } from "@/lib/cn";
import { loadMine } from "@/lib/lms/roster.functions";
import { useLms } from "@/lib/lms/store";

const NAV = [
  { to: "/", label: "Home", icon: House, exact: true },
  { to: "/courses", label: "Courses", icon: Library, exact: false },
  { to: "/results", label: "Scores", icon: ClipboardList, exact: false },
  { to: "/certificates", label: "Certificates", icon: Award, exact: false },
] as const;

const STUDIO = { to: "/studio", label: "Studio", icon: PenLine, exact: false } as const;

export function HydrateLms() {
  const { user, isPending } = useCurrentUserState();
  useLayoutEffect(() => {
    void useLms.persist.rehydrate();
  }, []);
  useEffect(() => {
    if (isPending || !user) return;
    clearOAuthAttempt();
    let cancel = false;
    void loadMine({ data: { name: user.displayName ?? "", email: user.primaryEmail ?? "" } })
      .then((remote) => {
        if (!cancel) useLms.getState().applyRemote(remote);
      })
      .catch(() => {
        if (!cancel) useLms.getState().setTrainer(false);
      });
    return () => {
      cancel = true;
    };
  }, [isPending, user]);
  return null;
}

function isOn(path: string, to: string, exact: boolean) {
  if (exact) return path === to;
  if (to === "/courses") return path.startsWith("/courses") || path.startsWith("/learn");
  return path === to || path.startsWith(`${to}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({ select: (state) => state.location.search });
  const { user, isPending } = useCurrentUserState();
  const signedOut = !isPending && !user;
  const trainer = useLms((state) => state.trainer);
  const nav = trainer ? [...NAV.slice(0, 3), STUDIO, NAV[3]] : [...NAV];
  const authError = explainAuthError(readAuthError(search));

  if (path === "/login") {
    return <div className="min-h-screen bg-canvas text-ink">{children}</div>;
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-canvas px-4 pt-16 text-ink">
        <p className="text-muted">Loading training…</p>
      </div>
    );
  }

  if (path === "/error" || (signedOut && authError)) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center bg-canvas px-4 text-ink">
        <img src="/logo.png" alt="Love & Honey" className="size-20" />
        <h1 className="mt-4 font-display text-4xl">Sign-in didn't finish</h1>
        <p className="mt-3 text-muted">
          {authError || "Google sign-in didn't finish. Try again, or use email."}
        </p>
        <Link to={user ? "/" : "/login"} className="mt-6 inline-flex min-h-11 items-center text-honey">
          {user ? "Continue" : "Back to sign in"}
        </Link>
      </main>
    );
  }

  if (signedOut) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-surface px-4 py-6 md:flex">
        <Link to="/" className="flex items-center gap-3 px-2">
          <BrandMark />
          <span>
            <span className="block font-display text-2xl leading-none">New Manager</span>
            <span className="mt-1 block text-xs text-muted">Love & Honey</span>
          </span>
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Primary">
          {nav.map((item) => {
            const on = isOn(path, item.to, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-base",
                  on ? "bg-raised text-honey" : "text-muted hover:bg-raised hover:text-ink",
                )}
              >
                <Icon className="size-5" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 px-2">
          <UserButton />
        </div>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-canvas px-4 py-3 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark />
            <span className="font-display text-xl leading-none">New Manager</span>
          </Link>
          <UserButton />
        </header>
        <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-28 md:px-8 md:pt-10 md:pb-16">{children}</main>
      </div>

      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-20 grid border-t border-line bg-surface md:hidden",
          nav.length > 4 ? "grid-cols-5" : "grid-cols-4",
        )}
        aria-label="Primary"
      >
        {nav.map((item) => {
          const on = isOn(path, item.to, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-center text-[11px] leading-tight",
                on ? "text-honey" : "text-muted",
              )}
            >
              <Icon className="size-5" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function BrandMark() {
  return <img src="/logo.png" alt="" className="size-11" />;
}
