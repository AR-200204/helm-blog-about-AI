import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Field } from "@/components/field";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

const links = [
  { to: "/paths", label: "Paths" },
  { to: "/articles", label: "Articles" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/playground", label: "Playground" },
  { to: "/progress", label: "Progress" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pace = useProgress((state) => state.pace);
  const setPace = useProgress((state) => state.setPace);
  const hydrated = useProgress((state) => state.hydrated);
  const done = useProgress((state) => Object.keys(state.completed).length);

  useEffect(() => {
    let cancel = false;
    void (async () => {
      await useProgress.persist.rehydrate();
      if (!cancel) useProgress.setState({ hydrated: true });
    })();
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.pace = pace === "child" ? "child" : "standard";
  }, [pace, hydrated]);

  return (
    <div className="relative z-10 min-h-dvh text-ink">
      <Field />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-sm">
        <div
          className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3"
          style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
        >
          <Link to="/" className="mr-auto flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <span className="h-5 w-1.5 rounded-sm bg-accent" aria-hidden />
            <span className="font-display text-xl tracking-tight">Primer</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1" aria-label="Main">
            {links.map((link) => {
              const active = pathname === link.to || pathname.startsWith(`${link.to}/`);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium",
                    "transition-colors duration-200 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    active ? "bg-accent text-accent-fg" : "text-ink hover:bg-line",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1 rounded-md border border-line p-1" role="group" aria-label="Reading size">
            <PaceButton active={pace === "child"} onClick={() => setPace("child")}>
              Kids
            </PaceButton>
            <PaceButton active={pace === "standard"} onClick={() => setPace("standard")}>
              Standard
            </PaceButton>
          </div>
          {done > 0 ? (
            <Link
              to="/progress"
              className="tabular-nums text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {done} done
            </Link>
          ) : null}
        </div>
      </header>
      <main id="content" key={pathname} className="page-in">
        {children}
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted">
        Progress stays on this device. No account.
      </footer>
    </div>
  );
}

function PaceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "tap min-h-11 rounded-sm px-3 text-sm font-medium",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        active ? "bg-accent text-accent-fg" : "text-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
