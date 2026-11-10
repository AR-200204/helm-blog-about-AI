import { Link } from "@tanstack/react-router";

export function MissingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Not in this issue</p>
      <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">This page is not on the desk.</h1>
      <p className="mt-4 max-w-prose text-lg text-muted">
        The address does not match a profile, a briefing, or a policy page. The ranking is intact.
      </p>
      <Link
        to="/rankings"
        className="mt-8 inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm font-semibold text-oxide-ink"
      >
        Read the ranking
      </Link>
    </div>
  );
}
