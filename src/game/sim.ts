export const BALL_R = 0.11;
export const GOAL_HALF_W = 3.66;
export const GOAL_H = 2.44;
export const POST_R = 0.06;
const G = 9.81;
const MAGNUS = 0.34;
const DRAG = 0.011;

export type Ball = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  spin: number;
  radius: number;
};

export type Aabb = {
  x: number;
  y: number;
  z: number;
  hx: number;
  hy: number;
  hz: number;
};

export type Contact = "wall" | "post" | "bar" | "ground" | "line" | null;

export type Launch = {
  vx: number;
  vy: number;
  vz: number;
  spin: number;
};

export function makeBall(x: number, z: number): Ball {
  return { x, y: BALL_R, z, vx: 0, vy: 0, vz: 0, spin: 0, radius: BALL_R };
}

export function solveLaunch(
  ball: { x: number; y: number; z: number },
  placeX: number,
  placeY: number,
  power: number,
  spin: number,
): Launch {
  const targetX = clamp(placeX, -1, 1) * 4.15;
  const targetY = 0.38 + clamp(placeY, 0, 1) * 2.35;
  const targetZ = 0.02;
  const dx = targetX - ball.x;
  const dy = targetY - ball.y;
  const dz = targetZ - ball.z;
  const horiz = Math.hypot(dx, dz);
  const speed = 15.5 + clamp(power, 0, 1) * 13.5;
  const t = Math.max(0.28, horiz / speed);
  return {
    vx: dx / t,
    vy: (dy + 0.5 * G * t * t) / t,
    vz: dz / t,
    spin: clamp(spin, -1, 1),
  };
}

export function stepBall(ball: Ball, walls: Aabb[], dt: number): Contact {
  const prev = { x: ball.x, y: ball.y, z: ball.z };
  ball.vy -= G * dt;
  const lift = MAGNUS * ball.spin;
  ball.vx += lift * -ball.vz * dt;
  ball.vz += lift * -ball.vx * dt;
  const speed = Math.hypot(ball.vx, ball.vy, ball.vz);
  const damp = Math.exp(-DRAG * speed * dt);
  ball.vx *= damp;
  ball.vy *= damp;
  ball.vz *= damp;
  ball.spin *= Math.exp(-0.35 * dt);
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  ball.z += ball.vz * dt;

  let contact: Contact = null;
  for (const wall of walls) {
    if (sweepAabb(prev, ball, wall, 0.42)) contact = "wall";
  }
  if (sweepPost(prev, ball, -GOAL_HALF_W, 0)) contact = "post";
  if (sweepPost(prev, ball, GOAL_HALF_W, 0)) contact = "post";
  if (sweepBar(prev, ball)) contact = "bar";
  if (ball.y < ball.radius) {
    ball.y = ball.radius;
    if (ball.vy < 0) {
      ball.vy = -ball.vy * 0.48;
      ball.vx *= 0.8;
      ball.vz *= 0.8;
      if (Math.abs(ball.vy) < 0.7) ball.vy = 0;
      contact = contact ?? "ground";
    }
  }
  const line = containPitch(ball);
  return line ?? contact;
}

export function crossing(prevZ: number, ball: Ball): "goal" | "over" | "wide" | null {
  const wasShort = prevZ + ball.radius > 0;
  const fullyPast = ball.z + ball.radius <= 0;
  if (!wasShort || !fullyPast) return null;
  const insideX = Math.abs(ball.x) + ball.radius <= GOAL_HALF_W;
  const under = ball.y + ball.radius <= GOAL_H;
  const above = ball.y >= 0;
  if (insideX && under && above) return "goal";
  if (!under && Math.abs(ball.x) <= GOAL_HALF_W + 1) return "over";
  return "wide";
}

export function predict(
  origin: Ball,
  launch: Launch,
  walls: Aabb[],
): { pts: number[]; ring: { x: number; y: number } | null; goal: boolean } {
  const ball: Ball = { ...origin, vx: launch.vx, vy: launch.vy, vz: launch.vz, spin: launch.spin };
  const pts: number[] = [];
  let ring: { x: number; y: number } | null = null;
  let goal = false;
  let prevZ = ball.z;
  for (let i = 0; i < 220; i++) {
    stepBall(ball, walls, 1 / 90);
    if (i % 2 === 0) pts.push(ball.x, ball.y, ball.z);
    const cross = crossing(prevZ, ball);
    if (cross) {
      ring = { x: ball.x, y: ball.y };
      goal = cross === "goal";
      break;
    }
    const sp = Math.hypot(ball.vx, ball.vy, ball.vz);
    if (ball.y <= ball.radius + 0.001 && sp < 0.6 && i > 8) break;
    if (ball.z < -2 || Math.abs(ball.x) > 40 || ball.z > origin.z + 18) break;
    prevZ = ball.z;
  }
  return { pts, ring, goal };
}

function containPitch(ball: Ball): Contact | null {
  const touch = 33.55;
  const far = 104;
  let hit: Contact | null = null;
  if (ball.x > touch) {
    ball.x = touch;
    if (ball.vx > 0) ball.vx *= -0.55;
    hit = "line";
  } else if (ball.x < -touch) {
    ball.x = -touch;
    if (ball.vx < 0) ball.vx *= -0.55;
    hit = "line";
  }
  if (ball.z > far) {
    ball.z = far;
    if (ball.vz > 0) ball.vz *= -0.5;
    hit = "line";
  }
  const inMouth =
    Math.abs(ball.x) + ball.radius <= GOAL_HALF_W &&
    ball.y >= 0 &&
    ball.y + ball.radius <= GOAL_H;
  if (inMouth) {
    if (ball.z < -1.65) {
      ball.z = -1.65;
      if (ball.vz < 0) ball.vz *= -0.25;
    }
    return hit;
  }
  if (ball.z < ball.radius) {
    ball.z = ball.radius;
    if (ball.vz < 0) ball.vz *= -0.62;
    hit = "line";
  }
  return hit;
}

function sweepPost(
  prev: { x: number; y: number; z: number },
  ball: Ball,
  postX: number,
  postZ: number,
): boolean {
  const ax = prev.x - postX;
  const az = prev.z - postZ;
  const dx = ball.x - prev.x;
  const dz = ball.z - prev.z;
  const rad = ball.radius + POST_R;
  const a = dx * dx + dz * dz;
  const b = 2 * (ax * dx + az * dz);
  const c = ax * ax + az * az - rad * rad;
  let t = -1;
  if (a > 1e-8) {
    const disc = b * b - 4 * a * c;
    if (disc < 0) return false;
    const tHit = (-b - Math.sqrt(disc)) / (2 * a);
    if (tHit >= 0 && tHit <= 1) t = tHit;
  } else if (c <= 0) t = 0;
  if (t < 0) return false;
  const y = prev.y + (ball.y - prev.y) * t;
  if (y > GOAL_H + ball.radius || y < 0) return false;
  ball.x = prev.x + (ball.x - prev.x) * t;
  ball.y = y;
  ball.z = prev.z + (ball.z - prev.z) * t;
  const nx = ball.x - postX;
  const nz = ball.z - postZ;
  const len = Math.hypot(nx, nz) || 1;
  const nxn = nx / len;
  const nzn = nz / len;
  ball.x = postX + nxn * rad;
  ball.z = postZ + nzn * rad;
  const vn = ball.vx * nxn + ball.vz * nzn;
  if (vn < 0) {
    ball.vx -= 1.55 * vn * nxn;
    ball.vz -= 1.55 * vn * nzn;
    ball.vy *= 0.94;
    ball.spin *= 0.7;
  }
  return true;
}

function sweepBar(prev: { x: number; y: number; z: number }, ball: Ball): boolean {
  if (Math.abs(ball.x) > GOAL_HALF_W + ball.radius && Math.abs(prev.x) > GOAL_HALF_W) return false;
  const ay = prev.y - GOAL_H;
  const az = prev.z;
  const dy = ball.y - prev.y;
  const dz = ball.z - prev.z;
  const rad = ball.radius + POST_R * 0.9;
  const a = dy * dy + dz * dz;
  const b = 2 * (ay * dy + az * dz);
  const c = ay * ay + az * az - rad * rad;
  let t = -1;
  if (a > 1e-8) {
    const disc = b * b - 4 * a * c;
    if (disc < 0) return false;
    const tHit = (-b - Math.sqrt(disc)) / (2 * a);
    if (tHit >= 0 && tHit <= 1) t = tHit;
  } else if (c <= 0) t = 0;
  if (t < 0) return false;
  const x = prev.x + (ball.x - prev.x) * t;
  if (Math.abs(x) > GOAL_HALF_W) return false;
  ball.x = x;
  ball.y = prev.y + (ball.y - prev.y) * t;
  ball.z = prev.z + (ball.z - prev.z) * t;
  const ny = ball.y - GOAL_H;
  const nz = ball.z;
  const len = Math.hypot(ny, nz) || 1;
  const nyn = ny / len;
  const nzn = nz / len;
  ball.y = GOAL_H + nyn * rad;
  ball.z = nzn * rad;
  const vn = ball.vy * nyn + ball.vz * nzn;
  if (vn < 0) {
    ball.vy -= 1.5 * vn * nyn;
    ball.vz -= 1.5 * vn * nzn;
    ball.vx *= 0.96;
  }
  return true;
}

function sweepAabb(
  prev: { x: number; y: number; z: number },
  ball: Ball,
  box: Aabb,
  e: number,
): boolean {
  const min = {
    x: box.x - box.hx - ball.radius,
    y: box.y - box.hy - ball.radius,
    z: box.z - box.hz - ball.radius,
  };
  const max = {
    x: box.x + box.hx + ball.radius,
    y: box.y + box.hy + ball.radius,
    z: box.z + box.hz + ball.radius,
  };
  const d = { x: ball.x - prev.x, y: ball.y - prev.y, z: ball.z - prev.z };
  let t0 = 0;
  let t1 = 1;
  for (const key of ["x", "y", "z"] as const) {
    const p = prev[key];
    const delta = d[key];
    if (Math.abs(delta) < 1e-8) {
      if (p < min[key] || p > max[key]) return false;
      continue;
    }
    let ta = (min[key] - p) / delta;
    let tb = (max[key] - p) / delta;
    if (ta > tb) {
      const swap = ta;
      ta = tb;
      tb = swap;
    }
    if (ta > t0) t0 = ta;
    t1 = Math.min(t1, tb);
    if (t0 > t1) return false;
  }
  if (t0 < 0 || t0 > 1) return false;
  const hx = prev.x + d.x * t0;
  const hy = prev.y + d.y * t0;
  const hz = prev.z + d.z * t0;
  ball.x = hx;
  ball.y = hy;
  ball.z = hz;
  const dx = hx - box.x;
  const dy = hy - box.y;
  const dz = hz - box.z;
  const px = box.hx + ball.radius - Math.abs(dx);
  const py = box.hy + ball.radius - Math.abs(dy);
  const pz = box.hz + ball.radius - Math.abs(dz);
  let nx = 0;
  let ny = 0;
  let nz = 0;
  if (px <= py && px <= pz) nx = Math.sign(dx) || -Math.sign(d.x) || 1;
  else if (py <= pz) ny = Math.sign(dy) || 1;
  else nz = Math.sign(dz) || -Math.sign(d.z) || 1;
  ball.x += nx * 0.012;
  ball.y += ny * 0.012;
  ball.z += nz * 0.012;
  const vn = ball.vx * nx + ball.vy * ny + ball.vz * nz;
  if (vn < 0) {
    ball.vx -= (1 + e) * vn * nx;
    ball.vy -= (1 + e) * vn * ny;
    ball.vz -= (1 + e) * vn * nz;
    ball.spin *= 0.8;
  }
  return true;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
