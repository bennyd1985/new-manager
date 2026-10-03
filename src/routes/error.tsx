import { createFileRoute } from "@tanstack/react-router";

/** OAuth failures land here (`/error?error=…`). The shell paints the message. */
export const Route = createFileRoute("/error")({
  component: ErrorPage,
});

function ErrorPage() {
  return null;
}
