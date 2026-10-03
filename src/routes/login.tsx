import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button, fieldClass } from "@/components/ui";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  clearOAuthAttempt,
  consumeOAuthAttempt,
  explainAuthError,
  markOAuthAttempt,
  readAuthError,
} from "@/lib/auth-error";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const search = useRouterState({ select: (state) => state.location.search });
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bounced, setBounced] = useState(false);
  const [pending, setPending] = useState(false);
  const returned = explainAuthError(readAuthError(search));

  useEffect(() => {
    if (isPending) return;
    if (user) {
      clearOAuthAttempt();
      void navigate({ to: "/" });
      return;
    }
    if (readAuthError(search)) {
      clearOAuthAttempt();
      return;
    }
    if (consumeOAuthAttempt()) setBounced(true);
  }, [isPending, navigate, search, user]);

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      if (mode === "up") {
        const result = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.trim(),
          callbackURL: "/",
        });
        if (result.error) {
          setError(result.error.message || "Could not create that account.");
          return;
        }
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: "/",
        });
        if (result.error) {
          setError(result.error.message || "Email or password did not match.");
          return;
        }
      }
      clearOAuthAttempt();
      await navigate({ to: "/" });
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setPending(false);
    }
  }

  if (isPending || user) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10">
        <p className="text-muted">Signing you in…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10">
      <img src="/logo.png" alt="Love & Honey" className="size-20" />
      <h1 className="mt-4 font-display text-4xl">New Manager</h1>
      <p className="mt-3 text-muted">
        Sign in so your lessons and quiz scores are saved. Your trainer can see when you finish.
      </p>
      {authEnabled ? (
        <>
          <div className="mt-6 flex flex-col gap-2">
            {GROK_PROVIDERS.map((provider) => (
              <Button
                key={provider.providerId}
                tone="quiet"
                onClick={() => {
                  setError("");
                  setBounced(false);
                  markOAuthAttempt();
                  void signIn(provider.providerId, { callbackURL: "/", errorCallbackURL: "/error" }).catch(
                    (err: unknown) => {
                      clearOAuthAttempt();
                      const message = err instanceof Error ? err.message : "";
                      if (/pop-up blocked/i.test(message)) {
                        setError("The Google window was blocked. Allow pop-ups, or open this page in Safari and try again.");
                      } else if (/cancelled or failed/i.test(message)) {
                        setError(
                          "Google closed before it finished. On an iPhone, open this page in Safari and tap Continue with Google again. Or use email.",
                        );
                      } else {
                        setError(message || "Could not start sign-in.");
                      }
                    },
                  );
                }}
              >
                Continue with {provider.label}
              </Button>
            ))}
          </div>
          {returned ? <p className="mt-4 text-sm text-bad">{returned}</p> : null}
          {bounced ? (
            <p className="mt-4 text-sm text-bad">
              Google sent you back without signing you in. On an iPhone, open this page in Safari and try again. Or use
              email.
            </p>
          ) : null}
          <p className="mt-6 text-sm text-muted">Or use email</p>
          <form className="mt-3 flex flex-col gap-3" onSubmit={(event) => void submitEmail(event)}>
            {mode === "up" ? (
              <label>
                <span className="mb-1 block text-sm text-muted">Name</span>
                <input
                  className={fieldClass}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
            ) : null}
            <label>
              <span className="mb-1 block text-sm text-muted">Email</span>
              <input
                className={fieldClass}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span className="mb-1 block text-sm text-muted">Password</span>
              <input
                className={fieldClass}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
                minLength={8}
                required
              />
            </label>
            {error ? <p className="text-sm text-bad">{error}</p> : null}
            <Button type="submit" disabled={pending}>
              {pending ? "Working…" : mode === "up" ? "Create account" : "Sign in"}
            </Button>
          </form>
          <button
            type="button"
            className="mt-4 min-h-11 text-left text-sm text-honey"
            onClick={() => {
              setMode(mode === "up" ? "in" : "up");
              setError("");
            }}
          >
            {mode === "up" ? "Already have an account? Sign in" : "New here? Create an account"}
          </button>
        </>
      ) : (
        <p className="mt-6 text-muted">Sign-in is off.</p>
      )}
    </main>
  );
}
