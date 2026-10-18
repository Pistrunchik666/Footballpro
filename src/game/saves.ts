import type { CareerState, FreekickState, SaveFile, SaveFolder, Settings } from "@/game/types";
import { CLUBS } from "@/game/clubs";

const KEY = "football-pro-saves-v1";
const BAK = "football-pro-saves-v1-bak";
export const SLOT_COUNT = 4;

function memory(): Storage | null {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage;
  } catch {
    return null;
  }
}

export function freshFreekick(): FreekickState {
  return { level: 1, score: 0, goals: 0 };
}

export function defaultSettings(): Settings {
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { sound: true, shake: !reduce };
}

export function freshFile(index: number): SaveFile {
  return {
    version: 1,
    name: `Слот ${index + 1}`,
    updatedAt: Date.now(),
    freekick: freshFreekick(),
    career: null,
    settings: defaultSettings(),
  };
}

export function emptyFolder(): SaveFolder {
  const slots: Array<SaveFile | null> = Array.from({ length: SLOT_COUNT }, () => null);
  slots[0] = freshFile(0);
  return { version: 1, active: 0, slots };
}

export function asFile(raw: unknown, index: number): SaveFile | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Partial<SaveFile>;
  if (o.version !== 1 || !o.freekick) return null;
  const level = Math.max(1, Math.min(100, Math.floor(Number(o.freekick.level) || 1)));
  const score = Math.max(0, Math.floor(Number(o.freekick.score) || 0));
  const goals = Math.max(0, Math.floor(Number(o.freekick.goals) || 0));
  let career: CareerState | null = null;
  if (o.career && typeof o.career === "object" && CLUBS.some((c) => c.id === o.career?.clubId)) {
    career = o.career;
  }
  const settings = {
    sound: o.settings?.sound !== false,
    shake: o.settings?.shake !== false,
  };
  return {
    version: 1,
    name: typeof o.name === "string" && o.name.trim() ? o.name.slice(0, 32) : `Слот ${index + 1}`,
    updatedAt: typeof o.updatedAt === "number" ? o.updatedAt : Date.now(),
    freekick: { level, score, goals },
    career,
    settings,
  };
}

export function loadFolder(depth = 0): SaveFolder {
  const store = memory();
  if (!store) return emptyFolder();
  try {
    const raw = store.getItem(KEY);
    if (!raw) {
      const folder = emptyFolder();
      writeFolder(folder);
      return folder;
    }
    const parsed = JSON.parse(raw) as Partial<SaveFolder>;
    if (parsed.version !== 1 || !Array.isArray(parsed.slots)) throw new Error("bad save");
    const slots = Array.from({ length: SLOT_COUNT }, (_, i) => asFile(parsed.slots?.[i], i));
    if (!slots.some(Boolean)) slots[0] = freshFile(0);
    let active = Math.max(0, Math.min(SLOT_COUNT - 1, Math.floor(Number(parsed.active) || 0)));
    if (!slots[active]) active = Math.max(0, slots.findIndex(Boolean));
    return { version: 1, active, slots };
  } catch {
    if (depth > 0) return emptyFolder();
    try {
      const bak = store.getItem(BAK);
      if (bak) {
        store.setItem(KEY, bak);
        return loadFolder(1);
      }
    } catch {
      /* ignore */
    }
    return emptyFolder();
  }
}

export function writeFolder(folder: SaveFolder) {
  const store = memory();
  if (!store) return;
  try {
    const prev = store.getItem(KEY);
    if (prev) store.setItem(BAK, prev);
    store.setItem(KEY, JSON.stringify(folder));
  } catch {
    /* quota or private mode */
  }
}

export function activeFile(folder: SaveFolder): SaveFile {
  return folder.slots[folder.active] ?? freshFile(folder.active);
}

export function stamp(file: SaveFile, patch: Partial<SaveFile>): SaveFile {
  return { ...file, ...patch, version: 1, updatedAt: Date.now() };
}
