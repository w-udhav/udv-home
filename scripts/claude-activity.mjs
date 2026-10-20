#!/usr/bin/env node
// Aggregates local Claude Code transcripts (~/.claude/projects/**/*.jsonl)
// into src/data/claude-activity.json. Only counts leave this machine, never content.
import { createReadStream } from "node:fs";
import { readdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";

const root =
  process.env.CLAUDE_PROJECTS_DIR ?? join(homedir(), ".claude", "projects");
const out = new URL("../src/data/claude-activity.json", import.meta.url);

const dayKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

function modelName(id) {
  const match = /^claude-([a-z]+)-(\d+)(?:-(\d{1,2}))?(?:-\d{8})?$/.exec(id);
  if (!match) return id;
  const [, family, major, minor] = match;
  return `${family[0].toUpperCase()}${family.slice(1)} ${major}${minor ? `.${minor}` : ""}`;
}

function isHumanPrompt(entry) {
  if (entry.isMeta || entry.isSidechain) return false;
  const content = entry.message?.content;
  if (typeof content === "string") return !content.startsWith("<");
  return (
    Array.isArray(content) && content.some((block) => block.type === "text")
  );
}

async function* transcripts(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) yield* transcripts(path);
    else if (item.name.endsWith(".jsonl")) yield path;
  }
}

const sessions = new Set();
const assistantIds = new Set();
const days = {};
const hours = Array(24).fill(0);
const models = {};
let prompts = 0;
let totalTokens = 0;

function countMessage(timestamp) {
  const date = new Date(timestamp);
  const key = dayKey(date);
  days[key] = (days[key] ?? 0) + 1;
  hours[date.getHours()] += 1;
}

for await (const file of transcripts(root)) {
  for await (const line of createInterface({ input: createReadStream(file) })) {
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    if (!entry.timestamp || !entry.sessionId) continue;

    if (entry.type === "user" && isHumanPrompt(entry)) {
      sessions.add(entry.sessionId);
      prompts += 1;
      countMessage(entry.timestamp);
    }

    const message = entry.message;
    if (
      entry.type !== "assistant" ||
      !message?.id ||
      message.model === "<synthetic>"
    )
      continue;
    if (assistantIds.has(message.id)) continue;
    assistantIds.add(message.id);
    sessions.add(entry.sessionId);
    countMessage(entry.timestamp);
    models[message.model] = (models[message.model] ?? 0) + 1;
    const usage = message.usage ?? {};
    totalTokens +=
      (usage.input_tokens ?? 0) +
      (usage.cache_creation_input_tokens ?? 0) +
      (usage.output_tokens ?? 0);
  }
}

const activeKeys = Object.keys(days).sort();
const active = new Set(activeKeys);

function streakEndingAt(date) {
  let streak = 0;
  const cursor = new Date(date);
  while (active.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

let longestStreak = 0;
for (const key of activeKeys) {
  const [y, m, d] = key.split("-").map(Number);
  if (active.has(dayKey(new Date(y, m - 1, d - 1)))) continue;
  let run = 0;
  while (active.has(dayKey(new Date(y, m - 1, d + run)))) run += 1;
  longestStreak = Math.max(longestStreak, run);
}

const now = new Date();
const yesterday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 1,
);
const favorite = Object.entries(models).sort((a, b) => b[1] - a[1])[0]?.[0];

const activity = {
  generatedAt: now.toISOString(),
  generatedOn: dayKey(now),
  sessions: sessions.size,
  messages: prompts + assistantIds.size,
  totalTokens,
  activeDays: activeKeys.length,
  currentStreak: active.has(dayKey(now))
    ? streakEndingAt(now)
    : streakEndingAt(yesterday),
  longestStreak,
  peakHour: hours.indexOf(Math.max(...hours)),
  favoriteModel: favorite ? modelName(favorite) : "",
  days: Object.fromEntries(activeKeys.map((key) => [key, days[key]])),
};

await writeFile(out, `${JSON.stringify(activity, null, 2)}\n`);
const { days: _days, ...summary } = activity;
console.log(summary);
