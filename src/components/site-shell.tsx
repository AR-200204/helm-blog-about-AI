import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/rankings", label: "Ranking" },
  { to: "/briefings", label: "Briefings" },
  { to: "/topics", label: "Topics" },
  { to: "/glossary", label: "Glossary" },
  { to: "/methodology", label: "Method" },
  { to: "/about", label: "About" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-oxide-ink"
      >
        Skip to content
      </a>
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 text-xs tracking-wide text-muted uppercase">
          <p>Issue 11 · 9 November 2026</p>
          <p className="hidden sm:block">Independent · No paid ranks</p>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-4">
          <div className="flex items-end justify-between gap-4">
            <Link to="/" className="group block">
              <span className="block font-serif text-5xl leading-none tracking-tight text-ink md:text-7xl">
                Helm
              </span>
              <span className="mt-1 block text-xs font-semibold tracking-widest text-oxide uppercase">
                Review
              </span>
            </Link>
            <form action="/search" className="hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex">
              <label htmlFor="site-search" className="sr-only">
                Search the issue
              </label>
              <input
                id="site-search"
                name="q"
                placeholder="Search the issue"
                className="w-full max-w-xs border border-rule bg-card px-3 py-2 text-sm text-ink placeholder:text-muted"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center border border-ink px-3 text-sm font-semibold"
              >
                Search
              </button>
            </form>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border border-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Field notes on the AI agents people actually run.
          </p>
        </div>
        <nav aria-label="Sections" className="hidden border-t border-rule md:block">
          <ul className="mx-auto flex max-w-6xl gap-1 px-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} label={item.label} pathname={pathname} />
              </li>
            ))}
          </ul>
        </nav>
        {open ? (
          <nav id="mobile-nav" aria-label="Sections" className="border-t border-rule md:hidden">
            <ul className="flex flex-col px-3 py-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center px-2 text-base font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <form action="/search" className="flex gap-2 px-5 pb-4">
              <label htmlFor="mobile-search" className="sr-only">
                Search the issue
              </label>
              <input
                id="mobile-search"
                name="q"
                placeholder="Search the issue"
                className="min-w-0 flex-1 border border-rule bg-card px-3 py-2 text-sm"
              />
              <button type="submit" className="inline-flex min-h-11 items-center border border-ink px-3 text-sm font-semibold">
                Search
              </button>
            </form>
          </nav>
        ) : null}
      </header>
      <main id="content">{children}</main>
      <footer className="mt-16 border-t border-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl">Helm Review</p>
            <p className="mt-2 text-sm text-muted">
              An independent desk. Scores are judgments, dated, and not for sale.
            </p>
          </div>
          <FooterCol
            title="Read"
            links={[
              ["/rankings", "Top 20"],
              ["/briefings", "Briefings"],
              ["/topics", "Topics"],
              ["/glossary", "Glossary"],
              ["/faq", "FAQ"],
            ]}
          />
          <FooterCol
            title="The desk"
            links={[
              ["/about", "About"],
              ["/authors", "Authors"],
              ["/methodology", "Methodology"],
              ["/editorial", "Standards"],
              ["/corrections", "Corrections"],
            ]}
          />
          <FooterCol
            title="Policies"
            links={[
              ["/contact", "Contact"],
              ["/privacy", "Privacy"],
              ["/terms", "Terms"],
              ["/disclosure", "Advertising"],
            ]}
          />
        </div>
        <div className="border-t border-rule">
          <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted">
            Issue 11 locked 9 November 2026. Product names belong to their owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  to,
  label,
  pathname,
}: {
  to: (typeof NAV)[number]["to"];
  label: string;
  pathname: string;
}) {
  const active = pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold ${active ? "text-oxide" : "text-ink"}`}
    >
      {label}
    </Link>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">{title}</p>
      <ul className="mt-3 flex flex-col">
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={href} className="inline-flex min-h-11 items-center text-sm hover:text-oxide">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
