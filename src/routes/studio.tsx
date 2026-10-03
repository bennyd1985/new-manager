import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useLms } from "@/lib/lms/store";

export const Route = createFileRoute("/studio")({
  component: StudioGate,
});

function StudioGate() {
  const trainer = useLms((state) => state.trainer);
  const ready = useLms((state) => state.rosterReady);

  if (!ready) {
    return <p className="text-muted">Checking access…</p>;
  }

  if (!trainer) {
    return (
      <div className="max-w-md">
        <h1 className="font-display text-4xl">Courses are locked</h1>
        <p className="mt-3 text-muted">
          This packet can’t be edited or deleted from the training link. Only the trainer can change it.
        </p>
        <Link to="/courses" className="mt-5 inline-block text-honey">
          Back to courses
        </Link>
      </div>
    );
  }

  return <Outlet />;
}
