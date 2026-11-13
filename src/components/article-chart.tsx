import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  careBars,
  dangerMix,
  forged,
  homeworkMix,
  powerBars,
  privacyBars,
  nvidiaTape,
  nvidiaLoss,
  ceoMoves,
  weekday,
  workSeries,
  type Age,
  type DayKind,
  type Door,
  type PaceMode,
  type Room,
  type Speed,
} from "@/lib/articles";
import { cn } from "@/lib/cn";
import { accent, axisTick, bad, ChartFrame, gridStroke, ink, ok, tipElement } from "@/components/charts";

export function ArticleChart({ slug }: { slug: string }) {
  switch (slug) {
    case "what-danger-means":
      return <DangerChart />;
    case "children-and-practice":
      return <HomeworkChart />;
    case "forged-media":
      return <ForgedChart />;
    case "prompts-and-privacy":
      return <PrivacyChart />;
    case "who-sets-the-defaults":
      return <PowerChart />;
    case "tasks-not-jobs":
      return <WorkChart />;
    case "a-weekday":
      return <DayChart />;
    case "care-and-judgment":
      return <CareChart />;
    case "nvidia-ceo-week":
      return <NvidiaChart />;
    case "ceo-comparison":
      return <CeoChart />;
    default:
      return null;
  }
}

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "tap min-h-11 rounded-sm px-3 text-sm font-medium",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            value === option.id ? "bg-accent text-accent-fg" : "border border-line-strong bg-elevated text-ink",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Note({ children }: { children: string }) {
  return <p className="mt-3 text-sm text-muted">{children}</p>;
}

function DangerChart() {
  const [age, setAge] = useState<Age>("child");
  return (
    <div>
      <Choice
        label="Whose risk"
        value={age}
        onChange={setAge}
        options={[
          { id: "child", label: "Child" },
          { id: "teen", label: "Teen" },
          { id: "adult", label: "Adult" },
        ]}
      />
      <ChartFrame>
        <BarChart data={dangerMix(age)} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} domain={[0, 100]} />
          {tipElement()}
          <Bar dataKey="value" name="Weight" fill={accent} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ChartFrame>
      <Note>Higher means that problem weighs more for this person. Scenario, not a survey.</Note>
    </div>
  );
}

function HomeworkChart() {
  const [mode, setMode] = useState<PaceMode>("answer");
  return (
    <div>
      <Choice
        label="How the model is used"
        value={mode}
        onChange={setMode}
        options={[
          { id: "answer", label: "Writes the answer" },
          { id: "check", label: "Checks a real try" },
        ]}
      />
      <ChartFrame>
        <BarChart data={homeworkMix(mode)} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} domain={[0, 100]} />
          {tipElement()}
          <Bar dataKey="Thinking" stackId="hour" fill={ok} maxBarSize={42} />
          <Bar dataKey="Prompting" stackId="hour" fill={accent} radius={[4, 4, 0, 0]} maxBarSize={42} />
        </BarChart>
      </ChartFrame>
      <Note>Each bar is one homework hour, split between thinking and prompting.</Note>
    </div>
  );
}

function ForgedChart() {
  const [index, setIndex] = useState(2);
  const row = forged[index] ?? forged[0];
  return (
    <div>
      <ChartFrame>
        <BarChart
          data={forged}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
          onClick={(state) => {
            const next = state?.activeTooltipIndex;
            if (typeof next === "number") setIndex(next);
          }}
        >
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} domain={[0, 100]} />
          {tipElement()}
          <Bar dataKey="ease" name="Ease of fooling" fill={ink} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ChartFrame>
      <p className="mt-3 text-sm text-muted">
        <span className="font-medium text-ink">{row?.name}. </span>
        {row?.note} Click a bar to switch.
      </p>
    </div>
  );
}

function PrivacyChart() {
  const [paste, setPaste] = useState(50);
  return (
    <div>
      <label className="grid gap-2 text-sm">
        <span className="flex justify-between">
          <span>How casually people paste</span>
          <span className="tabular-nums">{paste}</span>
        </span>
        <input
          type="range"
          min={10}
          max={100}
          value={paste}
          aria-valuemin={10}
          aria-valuemax={100}
          aria-valuenow={paste}
          onChange={(event) => setPaste(Number(event.target.value))}
          className="h-11 w-full accent-accent"
        />
      </label>
      <ChartFrame>
        <BarChart data={privacyBars(paste)} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={64} tick={axisTick} axisLine={false} tickLine={false} />
          {tipElement()}
          <Bar dataKey="value" name="In the box" fill={bad} radius={[0, 4, 4, 0]} maxBarSize={22} />
        </BarChart>
      </ChartFrame>
      <Note>Share of prompts in this scenario that include that kind of private material.</Note>
    </div>
  );
}

function PowerChart() {
  const [door, setDoor] = useState<Door>("closed");
  return (
    <div>
      <Choice
        label="How wide the choice is"
        value={door}
        onChange={setDoor}
        options={[
          { id: "closed", label: "One default" },
          { id: "open", label: "Wider tools" },
        ]}
      />
      <ChartFrame>
        <BarChart data={powerBars(door)} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} horizontal={false} />
          <XAxis type="number" domain={[0, 60]} tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={84} tick={axisTick} axisLine={false} tickLine={false} />
          {tipElement()}
          <Bar dataKey="share" name="Attention" fill={accent} radius={[0, 4, 4, 0]} maxBarSize={22} />
        </BarChart>
      </ChartFrame>
      <Note>A sketch of whose choices shape the day. Not a market-share report.</Note>
    </div>
  );
}

function WorkChart() {
  const [speed, setSpeed] = useState<Speed>(2);
  return (
    <div>
      <Choice
        label="Adoption speed"
        value={String(speed) as "1" | "2" | "3"}
        onChange={(id) => setSpeed(Number(id) as Speed)}
        options={[
          { id: "1", label: "Slow" },
          { id: "2", label: "Steady" },
          { id: "3", label: "Fast" },
        ]}
      />
      <ChartFrame>
        <LineChart data={workSeries(speed)} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="year" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} domain={[0, 100]} />
          {tipElement()}
          <Line type="monotone" dataKey="Person" stroke={ink} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Model" stroke={accent} strokeWidth={2} dot={false} />
        </LineChart>
      </ChartFrame>
      <Note>Share of a first-draft task still done by a person, versus handed to a model.</Note>
    </div>
  );
}

export function DayChart() {
  const [kind, setKind] = useState<DayKind>("student");
  return (
    <div>
      <Choice
        label="Whose weekday"
        value={kind}
        onChange={setKind}
        options={[
          { id: "student", label: "Student" },
          { id: "office", label: "Office" },
          { id: "home", label: "Home" },
        ]}
      />
      <ChartFrame>
        <BarChart data={weekday(kind)} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} />
          {tipElement()}
          <Bar dataKey="hours" name="Hours" fill={ink} radius={[4, 4, 0, 0]} maxBarSize={42} />
        </BarChart>
      </ChartFrame>
      <Note>Waking hours in a made-up ordinary day. Off screen is part of the picture on purpose.</Note>
    </div>
  );
}

function CeoChart() {
  const [span, setSpan] = useState<"day" | "week">("day");
  const [index, setIndex] = useState(0);
  const rows = ceoMoves(span);
  const row = rows[index] ?? rows[0];
  return (
    <div>
      <Choice
        label="Which Nvidia figure"
        value={span}
        onChange={setSpan}
        options={[
          { id: "day", label: "Huang’s first day" },
          { id: "week", label: "Huang’s two closes" },
        ]}
      />
      <ChartFrame>
        <BarChart
          data={rows}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
          onClick={(state) => {
            const next = state?.activeTooltipIndex;
            if (typeof next === "number") setIndex(next);
          }}
        >
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={36} domain={[-12, 0]} />
          {tipElement()}
          <Bar dataKey="move" name="Percent" fill={ink} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ChartFrame>
      <p className="mt-3 text-sm text-muted">
        <span className="font-medium text-ink">{row?.name}. </span>
        {row?.note} Click a bar. Altman is left off: OpenAI had no public share price.
      </p>
    </div>
  );
}

function NvidiaChart() {
  const [index, setIndex] = useState(2);
  const [night, setNight] = useState(false);
  const row = nvidiaTape[index] ?? nvidiaTape[0];
  return (
    <div>
      <Choice
        label="Which value figure"
        value={night ? "night" : "close"}
        onChange={(id) => setNight(id === "night")}
        options={[
          { id: "close", label: "Through Tuesday" },
          { id: "night", label: "Add Wednesday night" },
        ]}
      />
      <ChartFrame>
        <BarChart data={nvidiaLoss(night)} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={36} domain={[0, 700]} />
          {tipElement()}
          <Bar dataKey="loss" name="Reported loss, $B" fill={bad} radius={[4, 4, 0, 0]} maxBarSize={56} />
        </BarChart>
      </ChartFrame>
      <p className="mt-4 text-sm font-medium">Daily moves that were reported</p>
      <ChartFrame>
        <BarChart
          data={nvidiaTape}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
          onClick={(state) => {
            const next = state?.activeTooltipIndex;
            if (typeof next === "number") setIndex(next);
          }}
        >
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="day" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={36} domain={[-10, 0]} />
          {tipElement()}
          <Bar dataKey="move" name="Percent" fill={ink} radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ChartFrame>
      <p className="mt-3 text-sm text-muted">
        <span className="font-medium text-ink">{row?.day}. </span>
        {row?.note} Click a bar to switch the day. Figures are from news reports, not a live quote.
      </p>
    </div>
  );
}

function CareChart() {
  const [room, setRoom] = useState<Room>("home");
  return (
    <div>
      <Choice
        label="Where the answer lands"
        value={room}
        onChange={setRoom}
        options={[
          { id: "home", label: "At home, alone" },
          { id: "clinic", label: "In a clinic" },
        ]}
      />
      <ChartFrame>
        <BarChart data={careBars(room)} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis dataKey="name" tick={axisTick} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} domain={[0, 100]} />
          {tipElement()}
          <Bar dataKey="Help" fill={ok} maxBarSize={18} />
          <Bar dataKey="Harm" fill={bad} maxBarSize={18} />
        </BarChart>
      </ChartFrame>
      <Note>Help is time returned. Harm is how bad a fluent wrong answer is in that room.</Note>
    </div>
  );
}
