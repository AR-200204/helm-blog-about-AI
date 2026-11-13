import { createFileRoute, Link } from "@tanstack/react-router";
import { BlockStudio } from "@/components/block-studio";
import { CodeStudio } from "@/components/code-studio";
import { Shell } from "@/components/shell";
import { WebStudio } from "@/components/web-studio";
import { getLesson, lessonPosition } from "@/lib/curriculum";

export const Route = createFileRoute("/lesson/$track/$id")({ component: LessonPage });

function LessonPage() {
  const { track, id } = Route.useParams();
  const lesson = getLesson(track, id);

  if (!lesson) {
    return (
      <Shell>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="font-display text-3xl">That lesson is not on the shelf.</h1>
          <Link to="/paths" className="mt-4 inline-flex min-h-11 items-center underline">
            All paths
          </Link>
        </div>
      </Shell>
    );
  }

  const { index, count, track: trackInfo } = lessonPosition(lesson);

  return (
    <Shell>
      <article className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
        <p className="text-sm text-muted">
          <Link
            to="/learn/$track"
            params={{ track: lesson.track }}
            className="underline decoration-line-strong underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {trackInfo?.title}
          </Link>
          <span className="tabular-nums"> · Lesson {index + 1} of {count}</span>
          <span className="tabular-nums"> · {lesson.minutes} min</span>
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">{lesson.title}</h1>
        <p className="mt-4 max-w-2xl border-l-2 border-accent pl-4 text-lg">{lesson.idea}</p>
        <div className="mt-8">
          {lesson.kind === "blocks" ? <BlockStudio key={lesson.id} lesson={lesson} /> : null}
          {lesson.kind === "javascript" || lesson.kind === "python" ? (
            <CodeStudio key={lesson.id} lesson={lesson} />
          ) : null}
          {lesson.kind === "web" ? <WebStudio key={lesson.id} lesson={lesson} /> : null}
        </div>
      </article>
    </Shell>
  );
}
