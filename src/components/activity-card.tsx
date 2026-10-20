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

export default function ActivityCard() {
  return (
    <figure aria-labelledby="activity-heading" className="card m-0">
      <div className="flex items-center justify-between gap-4">
        <h2 id="activity-heading" className="type-subheading">
          Claude Code activity
        </h2>
        <span className="pill pill-active">Updated {updated}</span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="tile">
            <dt className="type-caption">{stat.label}</dt>
            <dd className="type-stat m-0">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div
        role="img"
        aria-label={`Daily Claude Code activity over the last ${COLUMNS} weeks, animating to spell Udhav`}
        className="activity-grid mt-4"
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
        You&apos;ve used ~{novels}× more tokens than War and Peace.
      </figcaption>
    </figure>
  );
}
