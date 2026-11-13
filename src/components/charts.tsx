import { useEffect, useState, type ReactElement } from "react";
import { ResponsiveContainer, Tooltip } from "recharts";

const tick = { fill: "var(--color-muted)", fontSize: 12 };

export const axisTick = tick;
export const gridStroke = "var(--color-line)";
export const ink = "var(--color-ink)";
export const accent = "var(--color-accent)";
export const muted = "var(--color-faint)";
export const bad = "var(--color-bad)";
export const ok = "var(--color-ok)";

export function ChartFrame({ children }: { children: ReactElement }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className="h-64 w-full min-w-0">
      {ready ? <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer> : null}
    </div>
  );
}

type TipRow = { name?: string; value?: number | string; color?: string };

export function ChartTip({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: string | number;
  payload?: TipRow[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-sm border border-line bg-surface px-3 py-2 text-sm shadow-none">
      {label ? <p className="font-medium">{label}</p> : null}
      {payload.map((row) => (
        <p key={`${row.name}-${row.value}`} className="tabular-nums text-muted">
          {row.name}: {row.value}
        </p>
      ))}
    </div>
  );
}

export function tipElement() {
  return <Tooltip content={<ChartTip />} cursor={{ fill: "var(--color-line)" }} />;
}
