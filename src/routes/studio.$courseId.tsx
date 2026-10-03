import { createFileRoute, Link } from "@tanstack/react-router";
import { CourseEditor } from "@/components/course-editor";
import { useLms } from "@/lib/lms/store";

export const Route = createFileRoute("/studio/$courseId")({ component: StudioCoursePage });

function StudioCoursePage() {
  const { courseId } = Route.useParams();
  const course = useLms((state) => state.courses.find((item) => item.id === courseId));

  if (!course) {
    return (
      <div>
        <h1 className="font-display text-4xl">That course is gone.</h1>
        <Link to="/studio" className="mt-4 inline-block text-honey">
          Back to Studio
        </Link>
      </div>
    );
  }

  return <CourseEditor course={course} />;
}
