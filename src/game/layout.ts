import type { Aabb } from "@/game/sim";
import type { Layout } from "@/game/types";

export function gkForLevel(level: number): Layout["gk"] {
  const t = clamp((level - 1) / 99, 0, 1);
  const u = t * t * (3 - 2 * t);
  return {
    speed: 1.15 + u * 6.6,
    react: 0.95 - u * 0.88,
    error: 3.15 - u * 3.02,
    reach: 0.2 + u * 0.58,
    jump: 1.12 + u * 0.9,
  };
}

export function layoutForLevel(level: number): Layout {
  const side = level % 2 === 0 ? 1 : -1;
  const dist = clamp(16.7 + Math.min(10.5, level * 0.095) + (level % 5) * 0.22, 16.6, 28);
  const x = clamp(side * (1.3 + (level % 8) * 0.7), -9, 9);
  const wallCount = level < 5 ? 2 : level < 16 ? 3 : level < 38 ? 4 : 5;
  return {
    ballX: x,
    ballZ: dist,
    wallCount,
    wallBias: 0.45 + (level % 4) * 0.28,
    timeLimit: level >= 10 ? clamp(8.4 - level * 0.042, 3.5, 8.4) : null,
    defender: level >= 12,
    gk: gkForLevel(level),
  };
}

export function layoutForCareer(oppPower: number, seed: number): Layout {
  const rnd = mulberry32(seed);
  const t = clamp((oppPower - 84) / 10, 0, 1);
  const side = rnd() > 0.5 ? 1 : -1;
  const level = Math.round(18 + t * 62);
  return {
    ballX: clamp(side * (1.5 + rnd() * 5.5), -8.5, 8.5),
    ballZ: clamp(18 + rnd() * 3.5 + t * 4, 16.8, 27),
    wallCount: t > 0.62 ? 5 : t > 0.28 ? 4 : 3,
    wallBias: 0.55 + rnd() * 0.7,
    timeLimit: null,
    defender: false,
    gk: gkForLevel(level),
  };
}

export function layoutTraining(): Layout {
  return {
    ballX: -3.2,
    ballZ: 20.5,
    wallCount: 3,
    wallBias: 0.7,
    timeLimit: null,
    defender: false,
    gk: gkForLevel(8),
  };
}

export function buildWall(layout: Layout): { bodies: Aabb[]; spots: Array<{ x: number; z: number }> } {
  const bx = layout.ballX;
  const bz = layout.ballZ;
  const dx = -bx;
  const dz = -bz;
  const len = Math.hypot(dx, dz) || 1;
  const ux = dx / len;
  const uz = dz / len;
  const rx = uz;
  const rz = -ux;
  let cx = bx + ux * 9.15;
  let cz = bz + uz * 9.15;
  const near = bx >= 0 ? 1 : -1;
  cx += layout.wallBias * near;
  cz = clamp(cz, 2.2, bz - 2.4);
  const n = layout.wallCount;
  const spacing = 0.48;
  const spots: Array<{ x: number; z: number }> = [];
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * spacing;
    spots.push({
      x: clamp(cx + rx * o, -13.5, 13.5),
      z: clamp(cz + rz * o, 1.6, bz - 1.8),
    });
  }
  const bodies: Aabb[] = spots.map((s) => ({
    x: s.x,
    y: 0.92,
    z: s.z,
    hx: 0.22,
    hy: 0.92,
    hz: 0.2,
  }));
  return { bodies, spots };
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
