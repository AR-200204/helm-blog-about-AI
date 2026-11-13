import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Shell } from "@/components/shell";
import { Panel } from "@/components/ui";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/easing")({ component: EasingPage });

type Curve = [number, number, number, number];

const presets: { id: string; label: string; note: string; v: Curve }[] = [
  { id: "linear", label: "Linear", note: "Constant speed. The handles sit on the diagonal.", v: [0, 0, 1, 1] },
  { id: "ease", label: "Ease", note: "The browser default. A small slow start, then a gentle finish.", v: [0.25, 0.1, 0.25, 1] },
  { id: "in", label: "Ease in", note: "Slow start, fast end. The first handle stays low.", v: [0.42, 0, 1, 1] },
  { id: "out", label: "Ease out", note: "Fast start, slow end. The second handle sits high.", v: [0, 0, 0.58, 1] },
  { id: "inout", label: "Ease in out", note: "Slow, then fast, then slow again.", v: [0.42, 0, 0.58, 1] },
  {
    id: "primer",
    label: "Primer",
    note: "The fade on this site. Both handles are at the top, so it rushes forward and then settles.",
    v: [0.22, 1, 0.36, 1],
  },
];

function bez(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function bezDeriv(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2);
}

function progressAt(time: number, x1: number, y1: number, x2: number, y2: number) {
  let u = time;
  for (let i = 0; i < 6; i += 1) {
    const x = bez(u, 0, x1, x2, 1);
    const slope = bezDeriv(u, 0, x1, x2, 1);
    if (Math.abs(slope) < 1e-4) break;
    u = Math.min(1, Math.max(0, u - (x - time) / slope));
  }
  return bez(u, 0, y1, y2, 1);
}

function num(value: number) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

function same(a: Curve, b: Curve) {
  return a.every((value, index) => Math.abs(value - (b[index] ?? 0)) < 0.02);
}

function EasingPage() {
  const [curve, setCurve] = useState<Curve>([0.22, 1, 0.36, 1]);
  const [play, setPlay] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<0 | 1 | null>(null);
  const [x1, y1, x2, y2] = curve;
  const easing = `cubic-bezier(${num(x1)}, ${num(y1)}, ${num(x2)}, ${num(y2)})`;
  const active = presets.find((preset) => same(preset.v, curve));

  const samples = Array.from({ length: 9 }, (_, index) => {
    const time = index / 8;
    return { time, y: progressAt(time, x1, y1, x2, y2) };
  });

  function pointFromEvent(event: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return null;
    const local = svg.createSVGPoint();
    local.x = event.clientX;
    local.y = event.clientY;
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    const mapped = local.matrixTransform(matrix.inverse());
    return {
      x: Math.min(1, Math.max(0, mapped.x / 100)),
      y: Math.min(1.45, Math.max(-0.45, (100 - mapped.y) / 100)),
    };
  }

  function move(event: React.PointerEvent) {
    if (drag.current === null) return;
    const point = pointFromEvent(event);
    if (!point) return;
    setCurve((current) => {
      const next: Curve = [...current];
      if (drag.current === 0) {
        next[0] = point.x;
        next[1] = point.y;
      } else {
        next[2] = point.x;
        next[3] = point.y;
      }
      return next;
    });
  }

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p className="text-sm font-medium text-muted">A short lesson</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Cubic-bezier curves</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A transition does not have to move at one speed. A cubic-bezier is the speed curve. Time goes left to right. How far the animation has gotten goes bottom to top.
        </p>

        <div className="mt-8 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Panel>
            <svg
              ref={svgRef}
              viewBox="-6 -52 112 204"
              className="w-full touch-none text-faint"
              role="img"
              aria-label="Cubic bezier curve. Drag the two round handles."
              onPointerMove={move}
              onPointerUp={() => {
                drag.current = null;
              }}
              onPointerLeave={() => {
                drag.current = null;
              }}
            >
              {[0, 25, 50, 75, 100].map((mark) => (
                <g key={mark}>
                  <line x1={0} y1={mark} x2={100} y2={mark} stroke="currentColor" strokeOpacity={0.45} />
                  <line x1={mark} y1={0} x2={mark} y2={100} stroke="currentColor" strokeOpacity={0.45} />
                </g>
              ))}
              <line x1={0} y1={100} x2={x1 * 100} y2={100 - y1 * 100} stroke="var(--color-accent)" strokeDasharray="2 2" />
              <line x1={100} y1={0} x2={x2 * 100} y2={100 - y2 * 100} stroke="var(--color-accent)" strokeDasharray="2 2" />
              <path
                d={`M 0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`}
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth={1.6}
              />
              {samples.map((sample) => (
                <circle
                  key={sample.time}
                  cx={sample.time * 100}
                  cy={100 - sample.y * 100}
                  r={1.5}
                  fill="var(--color-accent)"
                />
              ))}
              <circle cx={0} cy={100} r={1.8} fill="var(--color-ink)" />
              <circle cx={100} cy={0} r={1.8} fill="var(--color-ink)" />
              <Handle
                cx={x1 * 100}
                cy={100 - y1 * 100}
                label="First handle"
                onPointerDown={(event) => {
                  drag.current = 0;
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
              />
              <Handle
                cx={x2 * 100}
                cy={100 - y2 * 100}
                label="Second handle"
                onPointerDown={(event) => {
                  drag.current = 1;
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
              />
              <text x={0} y={116} fill="currentColor" fontSize={5}>
                Time
              </text>
              <text x={-2} y={-6} fill="currentColor" fontSize={5}>
                Done
              </text>
            </svg>
            <p className="mt-3 font-mono text-sm text-ink">{easing}</p>
            <p className="mt-2 text-sm text-muted">
              {active ? active.note : "A custom curve. X of a handle must stay between 0 and 1. Y may leave the box, which makes the motion overshoot."}
            </p>
          </Panel>

          <div className="grid gap-4">
            <Panel>
              <h2 className="font-display text-xl tracking-tight">Named curves</h2>
              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Preset curves">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active?.id === preset.id}
                    onClick={() => setCurve(preset.v)}
                    className={cn(
                      "tap min-h-11 rounded-sm px-3 text-sm font-medium",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      active?.id === preset.id ? "bg-accent text-accent-fg" : "border border-line-strong bg-elevated text-ink",
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </Panel>
            <Panel>
              <h2 className="font-display text-xl tracking-tight">Watch one second</h2>
              <p className="mt-2 text-sm text-muted">The block uses the curve above. Steep on the graph means fast here.</p>
              <div className="travel-track relative mt-4 h-16 rounded-md border border-line bg-elevated">
                <div
                  key={play}
                  className="travel-token absolute top-2.5 left-2 size-11 rounded-sm bg-accent"
                  style={{ ["--travel-ease" as string]: easing }}
                />
              </div>
              <button
                type="button"
                onClick={() => setPlay((value) => value + 1)}
                className="tap mt-4 min-h-11 rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Play again
              </button>
            </Panel>
          </div>
        </div>

        <section className="mt-10 max-w-2xl">
          <h2 className="font-display text-2xl tracking-tight">The four numbers</h2>
          <p className="mt-3">
            You write <span className="font-mono text-sm">cubic-bezier(x1, y1, x2, y2)</span>. The animation always starts at the bottom left and ends at the top right. Those two ends are fixed. The four numbers are only the handles.
          </p>
          <p className="mt-3">
            <span className="font-medium">x1</span> and <span className="font-medium">x2</span> are moments in time. CSS refuses an x outside 0 to 1, because time cannot fold backward. <span className="font-medium">y1</span> and <span className="font-medium">y2</span> are progress. They may sit above 1 or below 0. That is an overshoot: the value goes past the end, then comes back.
          </p>
          <p className="mt-3">
            The dots on the graph are equal slices of time. Where they bunch up, the motion is slow. Where they spread out, it is fast. Primer’s own fades use <span className="font-mono text-sm">cubic-bezier(0.22, 1, 0.36, 1)</span>, an ease-out: most of the change happens at the start.
          </p>
        </section>
      </div>
    </Shell>
  );
}

function Handle({
  cx,
  cy,
  label,
  onPointerDown,
}: {
  cx: number;
  cy: number;
  label: string;
  onPointerDown: (event: React.PointerEvent<SVGCircleElement>) => void;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4.5}
      fill="var(--color-surface)"
      stroke="var(--color-accent)"
      strokeWidth={1.4}
      role="slider"
      aria-label={label}
      onPointerDown={onPointerDown}
      className="cursor-grab"
    />
  );
}
