import type { CSSProperties } from "react";
import activity from "@/data/claude-activity.json";

const GLYPHS: Record<string, string[]> = {
  U: ["#.#", "#.#", "#.#", "#.#", "###"],
  D: ["##.", "#.#", "#.#", "#.#", "##."],
  H: ["#.#", "#.#", "###", "#.#", "#.#"],
  A: [".#.", "#.#", "###", "#.#", "#.#"],
  V: ["#.#", "#.#", "#.#", "#.#", ".#."],
};

const TEXT = "UDHAV";
const ROWS = 7;
const COLUMNS = 31;
const TEXT_TOP = 1;
const DAY_MS = 86_400_000;
const WAR_AND_PEACE_TOKENS = 780_000;

function buildLitCells() {
  const glyphRows = GLYPHS[TEXT[0]].map((_, row) =>
    [...TEXT].map((char) => GLYPHS[char][row]).join("."),
  );
  const left = Math.floor((COLUMNS - glyphRows[0].length) / 2);
  const lit = new Set<string>();
  glyphRows.forEach((line, row) => {
    [...line].forEach((cell, col) => {
      if (cell === "#") lit.add(`${row + TEXT_TOP}:${col + left}`);
    });
  });
  return lit;
}

const days: Record<string, number> = activity.days;
const counts = Object.values(days).sort((a, b) => a - b);
const quantile = (q: number) =>
  counts[Math.min(counts.length - 1, Math.floor(q * counts.length))] ?? 0;
const thresholds = [quantile(0.25), quantile(0.5), quantile(0.75)];

function level(count: number) {
  if (count === 0) return 0;
  return 1 + thresholds.filter((limit) => count > limit).length;
}

// Columns are weeks (oldest left), rows run Sunday to Saturday, and the last
// column is the week the stats were generated in.
const lastDay = Date.parse(`${activity.generatedOn}T00:00:00Z`);
const firstDay =
  lastDay - ((COLUMNS - 1) * ROWS + new Date(lastDay).getUTCDay()) * DAY_MS;

function dayLevel(row: number, col: number) {
  const time = firstDay + (col * ROWS + row) * DAY_MS;
  if (time > lastDay) return 0;
  return level(days[new Date(time).toISOString().slice(0, 10)] ?? 0);
}

const lit = buildLitCells();

const cells = Array.from({ length: ROWS * COLUMNS }, (_, i) => {
  const row = Math.floor(i / COLUMNS);
  const col = i % COLUMNS;
  return { key: i, row, col, text: lit.has(`${row}:${col}`) };
});

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function hourLabel(hour: number) {
  return `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
}

const stats = [
  { label: "Sessions", value: activity.sessions.toLocaleString("en") },
  { label: "Messages", value: activity.messages.toLocaleString("en") },
  { label: "Total tokens", value: compact.format(activity.totalTokens) },
  { label: "Active days", value: String(activity.activeDays) },
  { label: "Current streak", value: `${activity.currentStreak}d` },
  { label: "Longest streak", value: `${activity.longestStreak}d` },
  { label: "Peak hour", value: hourLabel(activity.peakHour) },
  { label: "Favorite model", value: activity.favoriteModel },
];

const updated = new Date(lastDay).toLocaleDateString("en", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const novels = Math.round(activity.totalTokens / WAR_AND_PEACE_TOKENS);

export default function Activity({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="activity-heading"
      className={`grid gap-8 lg:grid-cols-6 lg:gap-10 ${className ?? ""}`}
    >
      <div className="lg:col-span-2">
        <h2 id="activity-heading" className="type-subheading">
          Building with Claude Code
        </h2>
        <p className="type-caption mt-1">
          Measured from my own sessions · updated {updated}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="type-caption">{stat.label}</dt>
              <dd className="type-stat m-0">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="m-0 flex flex-col justify-center lg:col-span-4">
        <div
          role="img"
          aria-label={`Daily Claude Code activity over the last ${COLUMNS} weeks, animating to spell Udhav`}
          className="activity-grid"
          style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}
        >
          {cells.map((cell) => (
            <span
              key={cell.key}
              className={`activity-cell ${cell.text ? "activity-cell-text" : "activity-cell-day"}`}
              style={
                {
                  "--base": `var(--activity-${dayLevel(cell.row, cell.col)})`,
                  "--on": `var(--activity-${(cell.row + cell.col) % 2 ? 4 : 3})`,
                  "--delay": `${cell.col * 22}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <figcaption className="type-caption mt-4">
          {COLUMNS} weeks of daily sessions. That&apos;s ~{novels}× the tokens
          in War and Peace.
        </figcaption>
      </figure>
    </section>
  );
}
