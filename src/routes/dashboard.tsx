import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DayChart } from "@/components/article-chart";
import { accent, axisTick, ChartFrame, gridStroke, tipElement } from "@/components/charts";
import { Shell } from "@/components/shell";
import { Panel } from "@/components/ui";
import { articles, concernCopy } from "@/lib/articles";
import { useProgress, type Concern } from "@/lib/progress";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

const fallback = { dependence: 60, truth: 60, work: 60, privacy: 60, children: 60 };

function DashboardPage() {
  const reads = useProgress((state) => state.reads) ?? {};
  const weights = useProgress((state) => state.weights) ?? fallback;
  const setWeight = useProgress((state) => state.setWeight);
  const readCount = articles.filter((article) => reads[article.slug]).length;
  const dangerRead = articles.filter((article) => article.theme === "danger" && reads[article.slug]).length;
  const lifeRead = articles.filter((article) => article.theme === "life" && reads[article.slug]).length;
  const emphasis = concernCopy.map((row) => ({
    name: row.short,
    score: Math.round((row.base * (weights[row.key] ?? 60)) / 100),
  }));
  const weightSum = concernCopy.reduce((sum, row) => sum + (weights[row.key] ?? 60), 0);
  const score = Math.round(
    concernCopy.reduce((sum, row) => sum + row.base * (weights[row.key] ?? 60), 0) / Math.max(1, weightSum),
  );

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h1 className="font-display text-4xl tracking-tight">Dashboard</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          What you have read, plus a set of weights you can drag. The score is your emphasis on the scenarios, not a risk rating of the world.
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Articles read" value={`${readCount}/${articles.length}`} />
          <Stat label="On danger" value={String(dangerRead)} />
          <Stat label="On daily life" value={String(lifeRead)} />
          <Stat label="Your emphasis" value={String(score)} />
        </dl>

        <div className="mt-8 grid items-start gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Panel>
            <h2 className="font-display text-xl tracking-tight">What you weigh</h2>
            <p className="mt-2 text-sm text-muted">Drag a concern up if you want the chart to listen to it more.</p>
            <div className="mt-4 grid gap-4">
              {concernCopy.map((row) => (
                <label key={row.key} className="grid gap-2 text-sm">
                  <span className="flex justify-between gap-3">
                    <span>{row.label}</span>
                    <span className="tabular-nums">{weights[row.key] ?? 60}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[row.key] ?? 60}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={weights[row.key] ?? 60}
                    onChange={(event) => setWeight(row.key as Concern, Number(event.target.value))}
                    className="h-11 w-full accent-accent"
                  />
                </label>
              ))}
            </div>
          </Panel>
          <Panel>
            <h2 className="font-display text-xl tracking-tight">Emphasis, after your weights</h2>
            <ChartFrame>
              <BarChart data={emphasis} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid stroke={gridStroke} horizontal={false} />
                <XAxis type="number" domain={[0, 80]} tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={88} tick={axisTick} axisLine={false} tickLine={false} />
                {tipElement()}
                <Bar dataKey="score" name="Emphasis" fill={accent} radius={[0, 4, 4, 0]} maxBarSize={18} />
              </BarChart>
            </ChartFrame>
            <p className="mt-3 text-sm text-muted">
              Each bar is a fixed scenario severity, scaled by the slider next to it.
            </p>
          </Panel>
        </div>

        <Panel className="mt-4">
          <h2 className="font-display text-xl tracking-tight">A weekday, three ways</h2>
          <p className="mt-2 text-sm text-muted">The same clock from the daily-life article. Switch the person.</p>
          <div className="mt-4">
            <DayChart />
          </div>
        </Panel>

        <section className="mt-10">
          <h2 className="font-display text-2xl tracking-tight">Shelf</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {articles.map((article) => (
              <li key={article.slug} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <Link
                  to="/articles/$slug"
                  params={{ slug: article.slug }}
                  className="font-medium underline decoration-line-strong underline-offset-4"
                >
                  {article.title}
                </Link>
                <span className="text-sm text-muted">{reads[article.slug] ? "Read" : "Unread"}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-display text-3xl tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}
