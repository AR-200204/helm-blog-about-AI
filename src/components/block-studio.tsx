import { Link } from "@tanstack/react-router";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  CornerUpLeft,
  CornerUpRight,
  MessageCircle,
  Minus,
  Paintbrush,
  Play,
  Plus,
  Repeat,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import {
  apply,
  cellKey,
  facingLabel,
  initialState,
  isWon,
  uid,
  unroll,
  withIds,
  type Action,
  type BlockKind,
  type SimState,
  type Step,
} from "@/lib/blocks";
import type { BlockLesson } from "@/lib/curriculum";
import { sibling } from "@/lib/curriculum";
import { useHydrated, useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";
import { Button, Panel, buttonClass } from "@/components/ui";

const LABELS: Record<BlockKind, string> = {
  forward: "Forward",
  left: "Turn left",
  right: "Turn right",
  paint: "Paint",
  say: "Say",
  repeat: "Repeat",
};

const ICONS: Record<BlockKind, typeof ArrowUp> = {
  forward: ArrowUp,
  left: CornerUpLeft,
  right: CornerUpRight,
  paint: Paintbrush,
  say: MessageCircle,
  repeat: Repeat,
};

const SAYS = ["Hello", "Hi", "Go"];

export function BlockStudio({ lesson }: { lesson: BlockLesson }) {
  const hydrated = useHydrated();
  const setBlockDraft = useProgress((state) => state.setBlockDraft);
  const clearDraft = useProgress((state) => state.clearDraft);
  const markComplete = useProgress((state) => state.markComplete);
  const already = useProgress((state) => Boolean(state.completed[lesson.id]));

  const [program, setProgram] = useState<Step[]>([]);
  const [ready, setReady] = useState(false);
  const [sim, setSim] = useState<SimState>(() => initialState(lesson.world));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [misses, setMisses] = useState(0);
  const [stepNo, setStepNo] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    if (!hydrated) return;
    const draft = useProgress.getState().blockDrafts[lesson.id];
    setProgram(draft ?? []);
    setSim(initialState(lesson.world));
    setReady(true);
  }, [hydrated, lesson.id, lesson.world]);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setBlockDraft(lesson.id, program), 250);
    return () => window.clearTimeout(timer);
  }, [program, ready, lesson.id, setBlockDraft]);

  function edit(next: Step[] | ((steps: Step[]) => Step[])) {
    if (playing) return;
    setProgram(next);
    setSim(initialState(lesson.world));
    setWon(false);
    setNote(null);
    setActiveId(null);
    setStepNo(0);
    setStepCount(0);
  }

  async function run() {
    if (playing) return;
    let actions: Action[] = [];
    try {
      actions = unroll(program);
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Could not run that.");
      return;
    }
    if (actions.length === 0) {
      setNote("Add at least one step, then run.");
      return;
    }
    setPlaying(true);
    setWon(false);
    setNote(null);
    setStepCount(actions.length);
    let state = initialState(lesson.world);
    setSim(state);
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (!action) break;
      setActiveId(action.stepId);
      setStepNo(i + 1);
      await wait(420);
      state = apply(lesson.world, state, action);
      setSim(state);
      if (state.bumped) {
        setPlaying(false);
        setActiveId(null);
        setNote("The arrow cannot go through a wall or off the board. Change the steps and run again.");
        setMisses((count) => count + 1);
        return;
      }
    }
    setActiveId(null);
    setPlaying(false);
    const ok = isWon(lesson.world, state, {
      mustSay: lesson.mustSay,
      requireRepeat: lesson.requireRepeat,
      program,
    });
    if (ok) {
      setWon(true);
      setNote(null);
      markComplete(lesson.id);
    } else {
      setMisses((count) => count + 1);
      setNote(lesson.miss);
    }
  }

  const next = sibling(lesson, 1);
  const gemsLeft = lesson.world.gems.length - sim.collected.length;

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Panel>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl tracking-tight">Board</h2>
          <p className="tabular-nums text-sm text-muted">
            {playing ? `Step ${stepNo} of ${stepCount}` : lesson.world.goal ? "Reach the ring" : "Paint the marks"}
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          Arrow at column {sim.x + 1}, row {sim.y + 1}, facing {facingLabel(sim.dir)}.
          {lesson.world.gems.length > 0 ? ` Gems still out: ${gemsLeft}.` : ""}
          {sim.bubble ? ` Said ${sim.bubble}.` : ""}
        </p>
        <Board lesson={lesson} sim={sim} />
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-full border-2 border-accent" /> Ring is the goal
          </li>
          {lesson.world.gems.length > 0 ? (
            <li className="flex items-center gap-2">
              <span className="size-3 rotate-45 border-2 border-accent" /> Gem
            </li>
          ) : null}
          {lesson.world.walls.length > 0 ? (
            <li className="flex items-center gap-2">
              <span className="wall size-3 border border-line-strong" /> Wall
            </li>
          ) : null}
          {lesson.world.paintTargets.length > 0 ? (
            <li className="flex items-center gap-2">
              <span className="paint-target size-3" /> Paint here
            </li>
          ) : null}
        </ul>
        {lesson.world.gems.length > 0 ? (
          <p className="mt-3 tabular-nums text-sm text-muted">
            Gems {sim.collected.length}/{lesson.world.gems.length}
          </p>
        ) : null}
      </Panel>

      <div className="grid gap-4">
        <Panel>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-xl tracking-tight">Program</h2>
            <p className="text-sm text-muted">{countSteps(program)} steps</p>
          </div>
          <p className="mt-2 text-sm text-muted">{lesson.task}</p>
          {already && !won ? (
            <p className="mt-3 text-sm text-muted">You already finished this one. Run it again any time.</p>
          ) : null}
          <div className="mt-4">
            {program.length === 0 ? (
              <p className="rounded-md border border-dashed border-line-strong px-3 py-6 text-center text-sm text-muted">
                Your list is empty. Add a step below.
              </p>
            ) : (
              <StepList
                steps={program}
                activeId={activeId}
                nested={false}
                allowed={lesson.allowed}
                disabled={playing}
                onChange={edit}
              />
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.allowed.map((kind) => {
              const Icon = ICONS[kind];
              return (
                <Button
                  key={kind}
                  variant="secondary"
                  disabled={playing || !ready}
                  onClick={() => edit((steps) => [...steps, createStep(kind)])}
                >
                  <Icon className="size-4" aria-hidden />
                  {LABELS[kind]}
                </Button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => void run()} disabled={playing || !ready}>
              <Play className="size-4" aria-hidden />
              Run
            </Button>
            <Button
              variant="ghost"
              disabled={playing}
              onClick={() => {
                clearDraft(lesson.id);
                edit([]);
                setMisses(0);
              }}
            >
              <RotateCcw className="size-4" aria-hidden />
              Clear
            </Button>
            {misses >= 2 && !won ? (
              <Button
                variant="secondary"
                disabled={playing}
                onClick={() => {
                  edit(withIds(lesson.solution));
                  setNote("One way is filled in. Press Run to watch it.");
                }}
              >
                Show one way
              </Button>
            ) : null}
          </div>
          {note ? <p className="mt-4 text-sm text-bad">{note}</p> : null}
          {won ? (
            <div className="mt-4 rounded-md border border-line bg-elevated p-4">
              <p className="font-medium">That works.</p>
              <p className="mt-2 text-muted">{lesson.success}</p>
              <div className="mt-4">
                {next ? (
                  <Link
                    to="/lesson/$track/$id"
                    params={{ track: next.track, id: next.id }}
                    className={buttonClass()}
                  >
                    Next lesson
                  </Link>
                ) : (
                  <Link to="/learn/$track" params={{ track: "javascript" }} className={buttonClass()}>
                    Try JavaScript
                  </Link>
                )}
              </div>
            </div>
          ) : null}
        </Panel>
      </div>
    </div>
  );
}

function Board({ lesson, sim }: { lesson: BlockLesson; sim: SimState }) {
  const { cols, rows } = lesson.world;
  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const key = cellKey(x, y);
      const wall = lesson.world.walls.some(([wx, wy]) => wx === x && wy === y);
      const gem = lesson.world.gems.some(([gx, gy]) => gx === x && gy === y) && !sim.collected.includes(key);
      const target = lesson.world.paintTargets.some(([px, py]) => px === x && py === y);
      const painted = sim.painted.includes(key);
      const goal =
        lesson.world.goal !== null && lesson.world.goal[0] === x && lesson.world.goal[1] === y;
      cells.push(
        <div
          key={key}
          className={cn(
            "relative border border-line bg-elevated",
            wall && "wall",
            target && "paint-target",
            painted && "painted",
          )}
        >
          {gem ? (
            <span className="absolute top-1/2 left-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-accent bg-surface" />
          ) : null}
          {goal ? (
            <span className="absolute top-1/2 left-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent" />
          ) : null}
        </div>,
      );
    }
  }

  return (
    <div className="relative mt-8">
      <div
        className="grid overflow-hidden rounded-md border border-line-strong"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          aspectRatio: `${cols} / ${rows}`,
        }}
      >
        {cells}
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div
          className="motion-board absolute transition-transform duration-300 ease-out"
          style={{
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
            transform: `translate(${sim.x * 100}%, ${sim.y * 100}%)`,
          }}
        >
          {sim.bubble ? (
            <span className="absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded-sm bg-ink px-2 py-1 text-xs whitespace-nowrap text-accent-fg">
              {sim.bubble}
            </span>
          ) : null}
          <div
            className="grid h-full w-full place-items-center"
            style={{ transform: `rotate(${sim.dir * 90}deg)` }}
          >
            <div className="relative h-3/5 w-3/5 rounded-sm bg-accent">
              <span className="nose absolute top-1 left-1/2 -translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepList({
  steps,
  onChange,
  activeId,
  nested,
  allowed,
  disabled,
}: {
  steps: Step[];
  onChange: (steps: Step[]) => void;
  activeId: string | null;
  nested: boolean;
  allowed: BlockKind[];
  disabled: boolean;
}) {
  return (
    <ol className="grid gap-2">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={cn(
            "rounded-md border border-line bg-elevated p-2",
            activeId === step.id && "border-accent",
          )}
        >
          <div className="flex items-center gap-1">
            <span className="min-w-0 flex-1 px-1 text-sm font-medium">
              {step.kind === "repeat" ? `Repeat ${step.times}` : LABELS[step.kind]}
            </span>
            <IconButton label="Move up" disabled={disabled || index === 0} onClick={() => onChange(move(steps, index, -1))}>
              <ChevronUp className="size-4" />
            </IconButton>
            <IconButton
              label="Move down"
              disabled={disabled || index === steps.length - 1}
              onClick={() => onChange(move(steps, index, 1))}
            >
              <ChevronDown className="size-4" />
            </IconButton>
            <IconButton label="Remove step" disabled={disabled} onClick={() => onChange(steps.filter((item) => item.id !== step.id))}>
              <Trash2 className="size-4" />
            </IconButton>
          </div>
          {step.kind === "say" ? (
            <div className="mt-2 grid gap-2">
              <input
                value={step.text}
                maxLength={24}
                disabled={disabled}
                aria-label="Words to say"
                onChange={(event) =>
                  onChange(steps.map((item) => (item.id === step.id && item.kind === "say" ? { ...item, text: event.target.value } : item)))
                }
                className="h-11 w-full rounded-sm border border-line bg-surface px-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              <div className="flex flex-wrap gap-2">
                {SAYS.map((word) => (
                  <Button
                    key={word}
                    variant="ghost"
                    disabled={disabled}
                    onClick={() =>
                      onChange(
                        steps.map((item) =>
                          item.id === step.id && item.kind === "say" ? { ...item, text: word } : item,
                        ),
                      )
                    }
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
          {step.kind === "repeat" ? (
            <div className="mt-2 grid gap-2 border-l border-line pl-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Times</span>
                <IconButton
                  label="Fewer times"
                  disabled={disabled || step.times <= 2}
                  onClick={() => onChange(updateRepeat(steps, step.id, { times: step.times - 1 }))}
                >
                  <Minus className="size-4" />
                </IconButton>
                <span className="w-6 text-center tabular-nums">{step.times}</span>
                <IconButton
                  label="More times"
                  disabled={disabled || step.times >= 8}
                  onClick={() => onChange(updateRepeat(steps, step.id, { times: step.times + 1 }))}
                >
                  <Plus className="size-4" />
                </IconButton>
              </div>
              {step.body.length === 0 ? (
                <p className="text-sm text-muted">Add the steps that should repeat.</p>
              ) : (
                <StepList
                  steps={step.body}
                  activeId={activeId}
                  nested
                  allowed={allowed.filter((kind) => kind !== "repeat")}
                  disabled={disabled}
                  onChange={(body) => onChange(updateRepeat(steps, step.id, { body }))}
                />
              )}
              {!nested ? (
                <div className="flex flex-wrap gap-2">
                  {allowed
                    .filter((kind) => kind !== "repeat")
                    .map((kind) => {
                      const Icon = ICONS[kind];
                      return (
                        <Button
                          key={kind}
                          variant="ghost"
                          disabled={disabled}
                          onClick={() =>
                            onChange(updateRepeat(steps, step.id, { body: [...step.body, createStep(kind)] }))
                          }
                        >
                          <Icon className="size-4" aria-hidden />
                          {LABELS[kind]}
                        </Button>
                      );
                    })}
                </div>
              ) : null}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function IconButton({
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="tap inline-flex size-11 items-center justify-center rounded-sm text-ink hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40"
      {...props}
    >
      {children}
    </button>
  );
}

function createStep(kind: BlockKind): Step {
  if (kind === "repeat") return { id: uid(), kind, times: 3, body: [] };
  if (kind === "say") return { id: uid(), kind, text: "Hello" };
  return { id: uid(), kind };
}

function move(steps: Step[], index: number, dir: -1 | 1) {
  const next = steps.slice();
  const [item] = next.splice(index, 1);
  if (!item) return steps;
  next.splice(index + dir, 0, item);
  return next;
}

function updateRepeat(
  steps: Step[],
  id: string,
  patch: Partial<Extract<Step, { kind: "repeat" }>>,
) {
  return steps.map((step) => (step.id === id && step.kind === "repeat" ? { ...step, ...patch } : step));
}

function countSteps(steps: Step[]): number {
  return steps.reduce((sum, step) => sum + 1 + (step.kind === "repeat" ? countSteps(step.body) : 0), 0);
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
