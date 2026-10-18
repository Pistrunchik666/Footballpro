import type { Club, KitSide } from "@/game/types";

export const PLAYER_NAME = "Василий Иванов";
export const PLAYER_NUMBER = "9";

export const CLUBS: Club[] = [
  { id: "arsenal", name: "Arsenal", short: "ARS", color: "#ef0107", away: "#f3f0e8", power: 86 },
  { id: "bayern", name: "Bayern", short: "BAY", color: "#dc052d", away: "#f3f0e8", power: 90 },
  { id: "city", name: "Manchester City", short: "MCI", color: "#6cabdd", away: "#0c2340", power: 91 },
  { id: "barca", name: "Barcelona", short: "BAR", color: "#a50044", away: "#0c2340", power: 88 },
  { id: "liverpool", name: "Liverpool", short: "LIV", color: "#c8102e", away: "#f3f0e8", power: 87 },
  { id: "psg", name: "PSG", short: "PSG", color: "#004170", away: "#f3f0e8", power: 89 },
  { id: "madrid", name: "Real Madrid", short: "RMA", color: "#f4f4f4", away: "#0c2340", power: 92 },
  { id: "inter", name: "Inter", short: "INT", color: "#010e80", away: "#f3f0e8", power: 85 },
];

export function clubById(id: string): Club {
  const club = CLUBS.find((c) => c.id === id);
  if (!club) return CLUBS[0]!;
  return club;
}

export function hexRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function luminance(hex: string): number {
  const [r, g, b] = hexRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

export function colorDistance(a: string, b: string): number {
  const [ar, ag, ab] = hexRgb(a);
  const [br, bg, bb] = hexRgb(b);
  return Math.hypot(ar - br, ag - bg, ab - bb);
}

export function kitsClash(a: string, b: string): boolean {
  if (colorDistance(a, b) < 86) return true;
  return Math.abs(luminance(a) - luminance(b)) < 0.12 && colorDistance(a, b) < 140;
}

export function kitColor(club: Club, side: KitSide): string {
  return side === "home" ? club.color : club.away;
}

export function shortsFor(shirt: string): string {
  return luminance(shirt) > 0.62 ? "#1a1c20" : "#f3f0e8";
}

export function stripeFor(shirt: string): string {
  return luminance(shirt) > 0.62 ? "#1a1c20" : "#f7f7f5";
}

export function numberInk(shirt: string): string {
  return luminance(shirt) > 0.62 ? "#16181d" : "#f7f7f5";
}

const GK_COLORS = ["#e2b43a", "#f08a24", "#111111", "#f4f4f4", "#1fa971", "#d45d8c"];

export function pickGkColor(a: string, b: string): string {
  let best = GK_COLORS[0]!;
  let bestScore = -1;
  for (const color of GK_COLORS) {
    const score = Math.min(colorDistance(color, a), colorDistance(color, b));
    if (score > bestScore) {
      best = color;
      bestScore = score;
    }
  }
  return best;
}

export function skinTone(index: number): string {
  const tones = ["#e0b08a", "#c68642", "#8d5524", "#f1c6a8", "#a56b3c"];
  return tones[index % tones.length]!;
}
