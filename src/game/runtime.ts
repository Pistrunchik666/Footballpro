import { goalSound, kickSound, missSound, postSound, saveSound, whistle } from "@/game/audio";
import { buildWall } from "@/game/layout";
import { BALL_R, crossing, makeBall, predict, solveLaunch, stepBall, type Launch } from "@/game/sim";
import type { Layout, MissReason, Pose } from "@/game/types";

export type ResolveInfo = {
  kind: "goal" | "miss";
  reason: MissReason | "goal" | "post-goal";
};

export const bus: { onResolve?: (info: ResolveInfo) => void } = {};

function pose(): Pose {
  return {
    x: 0,
    y: 0,
    z: 0,
    yaw: Math.PI,
    leg: 0,
    armRaise: 0,
    lean: 0,
    lift: 0,
    flinch: 0,
    visible: false,
  };
}

export const poses = {
  kicker: pose(),
  gk: pose(),
  ref: pose(),
  def: pose(),
  w0: pose(),
  w1: pose(),
  w2: pose(),
  w3: pose(),
  w4: pose(),
};

export const wallIds = ["w0", "w1", "w2", "w3", "w4"] as const;

type Phase = "idle" | "kicking" | "flight" | "goal" | "miss";

export const world = {
  screen: "menu",
  paused: false,
  sound: true,
  shake: true,
  phase: "idle" as Phase,
  layout: null as Layout | null,
  walls: buildWall({
    ballX: -3.2,
    ballZ: 20.5,
    wallCount: 4,
    wallBias: 0.8,
    timeLimit: null,
    defender: false,
    gk: { speed: 3, react: 0.4, error: 1, reach: 0.45, jump: 1.7 },
  }).bodies,
  spots: [] as Array<{ x: number; z: number }>,
  ball: makeBall(0.2, 19.6),
  roll: 0,
  launch: null as Launch | null,
  kickT: 0,
  released: false,
  settled: false,
  net: false,
  timeLeft: null as number | null,
  flightTime: 0,
  touchedPost: false,
  touchedBar: false,
  touchedWall: false,
  touchedLine: false,
  gk: { x: 0, react: 0, diving: false, dive: 0, dir: 1, guess: 0, hold: false },
  trauma: 0,
  clock: 0,
  acc: 0,
  preview: [] as number[],
  ring: null as { x: number; y: number } | null,
  showAim: false,
  aimGoal: false,
  launchDraft: null as Launch | null,
  power: 0,
  spin: 0,
  aimX: 0,
  userAiming: false,
};

const attractWall = buildWall({
  ballX: 0.2,
  ballZ: 19.6,
  wallCount: 4,
  wallBias: 0.6,
  timeLimit: null,
  defender: false,
  gk: { speed: 1, react: 1, error: 1, reach: 0.4, jump: 1.6 },
});

export function armMatch(layout: Layout) {
  const built = buildWall(layout);
  world.layout = layout;
  world.walls = built.bodies;
  world.spots = built.spots;
  world.phase = "idle";
  world.launch = null;
  world.kickT = 0;
  world.released = false;
  world.settled = false;
  world.net = false;
  world.timeLeft = layout.timeLimit;
  world.flightTime = 0;
  world.touchedPost = false;
  world.touchedBar = false;
  world.touchedWall = false;
  world.touchedLine = false;
  world.gk = { x: 0, react: 0, diving: false, dive: 0, dir: 1, guess: 0, hold: false };
  world.showAim = false;
  world.preview = [];
  world.ring = null;
  world.launchDraft = null;
  world.power = 0;
  world.spin = layout.ballX >= 0 ? -0.2 : 0.2;
  world.aimX = layout.ballX >= 0 ? -0.42 : 0.42;
  world.userAiming = false;
  world.acc = 0;
  placeIdleBall(layout);
  if (world.sound) whistle();
}

let lastShotAt = 0;

export function previewAim(placeX: number, power: number, spin: number) {
  world.aimX = clamp(placeX, -1, 1);
  world.power = clamp(power, 0, 1);
  world.spin = clamp(spin, -1, 1);
  if (world.phase !== "idle" || world.screen !== "match" || world.paused || world.settled || !world.layout) {
    return;
  }
  world.walls = liveBoxes();
  const origin = {
    x: world.ball.x,
    y: world.ball.y,
    z: world.ball.z,
    vx: 0,
    vy: 0,
    vz: 0,
    spin: 0,
    radius: world.ball.radius,
  };
  const launch = solveLaunch(origin, world.aimX, 0.22 + world.power * 0.62, world.power, world.spin);
  const pred = predict(origin, launch, world.walls);
  world.launchDraft = launch;
  world.preview = pred.pts;
  world.ring = pred.ring;
  world.aimGoal = pred.goal;
  world.showAim = true;
}

export function commitShot(power?: number) {
  const now = typeof performance !== "undefined" ? performance.now() : Date.now();
  if (now - lastShotAt < 350) return;
  if (world.phase !== "idle" || world.paused || world.settled || world.screen !== "match" || !world.layout) return;
  const p = clamp(power ?? world.power, 0.2, 1);
  previewAim(world.aimX, p, world.spin);
  if (!world.launchDraft) return;
  lastShotAt = now;
  beginKick(world.launchDraft);
}

export function nudgeAim(dx: number) {
  world.aimX = clamp(world.aimX + dx, -1, 1);
  if (world.phase === "idle" && !world.userAiming) previewAim(world.aimX, Math.max(world.power, 0.62), world.spin);
}

export function beginKick(launch: Launch) {
  if (world.phase !== "idle" || world.paused || world.settled || !world.layout) return;
  world.userAiming = false;
  world.launch = launch;
  world.phase = "kicking";
  world.kickT = 0;
  world.released = false;
  world.showAim = false;
  world.preview = [];
  world.ring = null;
  const skill = world.layout.gk;
  const t = Math.abs(world.ball.z / (launch.vz || -1));
  const read = world.ball.x + launch.vx * t + launch.spin * 2.4;
  let err = (Math.random() * 2 - 1) * skill.error;
  if (Math.random() < skill.error * 0.22) err += -read * 0.85;
  world.gk.guess = clamp(read + err, -3.5, 3.5);
  world.gk.react = skill.react;
  world.gk.diving = false;
  world.gk.dive = 0;
  world.gk.hold = false;
}

export function tick(dt: number) {
  const d = Math.min(0.05, Math.max(0, dt));
  world.clock += d;
  if (world.shake) world.trauma = Math.max(0, world.trauma - d * 1.7);
  else world.trauma = 0;

  if (world.screen !== "match") {
    attract(d);
    return;
  }
  if (world.paused) {
    posesFromState(d);
    return;
  }

  if (world.phase === "idle") {
    if (world.timeLeft != null) {
      world.timeLeft = Math.max(0, world.timeLeft - d);
      if (world.timeLeft <= 0) settle({ kind: "miss", reason: "time" });
    }
  } else if (world.phase === "kicking") {
    world.kickT += d;
    if (world.layout && !world.released) plantOnBoot(world.kickT);
    if (world.kickT >= 0.4 && !world.released && world.launch) {
      world.released = true;
      world.ball.vx = world.launch.vx;
      world.ball.vy = world.launch.vy;
      world.ball.vz = world.launch.vz;
      world.ball.spin = world.launch.spin;
      world.phase = "flight";
      world.flightTime = 0;
      if (world.sound) kickSound();
      world.trauma = Math.min(1, world.trauma + 0.28);
    }
  } else if (world.phase === "flight") {
    world.acc += d;
    let guard = 0;
    while (world.acc >= 1 / 120 && guard++ < 6) {
      world.acc -= 1 / 120;
      physics(1 / 120);
      if (world.phase !== "flight") break;
    }
  } else if (world.net) {
    dampInNet(d);
  }

  posesFromState(d);
  world.roll += (-world.ball.vz * d) / BALL_R;
}

function physics(dt: number) {
  if (!world.layout || world.phase !== "flight") return;
  const prevZ = world.ball.z;
  const bodies = liveBoxes();
  world.walls = bodies;
  const contact = stepBall(world.ball, bodies, dt);
  world.flightTime += dt;
  if (contact === "post") {
    if (!world.touchedPost && world.sound) postSound();
    world.touchedPost = true;
    world.trauma = Math.min(1, world.trauma + 0.45);
  }
  if (contact === "bar") {
    if (!world.touchedBar && world.sound) postSound();
    world.touchedBar = true;
    world.trauma = Math.min(1, world.trauma + 0.5);
  }
  if (contact === "wall") {
    world.touchedWall = true;
    bumpNearest();
  }
  if (contact === "line") world.touchedLine = true;

  const cross = crossing(prevZ, world.ball);
  if (cross === "goal") {
    world.net = true;
    world.trauma = Math.min(1, world.trauma + 0.75);
    if (world.sound) goalSound();
    settle({ kind: "goal", reason: world.touchedPost || world.touchedBar ? "post-goal" : "goal" });
    return;
  }
  if (cross === "over" || cross === "wide") {
    const reason: MissReason = world.touchedBar ? "bar" : world.touchedPost ? "post" : cross;
    settle({ kind: "miss", reason });
    if (world.sound) missSound();
    return;
  }
  if (trySave()) return;

  const speed = Math.hypot(world.ball.vx, world.ball.vy, world.ball.vz);
  const stopped = speed < 0.55 && world.ball.y <= BALL_R + 0.03 && world.flightTime > 0.35;
  const escaped = Math.abs(world.ball.x) > 36 || world.ball.z > world.layout.ballZ + 16;
  if (stopped || escaped) {
    const reason: MissReason = world.touchedPost
      ? "post"
      : world.touchedBar
        ? "bar"
        : world.touchedWall
          ? "wall"
          : world.touchedLine
            ? "wide"
            : world.ball.z > 8
              ? "short"
              : "wide";
    settle({ kind: "miss", reason });
    if (world.sound) missSound();
  }
}

function trySave() {
  if (!world.layout || world.net || world.ball.z + world.ball.radius <= 0) return false;
  const skill = world.layout.gk;
  const gk = world.gk;
  if (!gk.hold) {
    gk.react -= 1 / 120;
    if (gk.react <= 0) {
      const dir = Math.sign(gk.guess - gk.x);
      gk.x += dir * Math.min(Math.abs(gk.guess - gk.x), skill.speed / 120);
      gk.x = clamp(gk.x, -3.35, 3.35);
      const centralHigh = world.ball.y > 1.75 && Math.abs(world.ball.x - gk.x) < 0.65;
      const diveAt = 3.1 + skill.reach * 6;
      if (world.ball.z < diveAt && !gk.diving && !centralHigh) {
        gk.diving = true;
        gk.dir = Math.sign(gk.guess - gk.x) || 1;
      }
    }
    if (gk.diving) gk.dive = Math.min(1, gk.dive + (1 / 120) * 2.15);
  }
  const handX = gk.x + (gk.diving ? gk.dir * gk.dive * 1.25 : 0);
  const handY = gk.diving ? 0.62 + Math.sin(gk.dive * Math.PI) * (0.7 + skill.jump * 0.25) : skill.jump;
  const handZ = 0.4;
  const dist = Math.hypot(world.ball.x - handX, world.ball.y - handY, world.ball.z - handZ);
  const reach = skill.reach + (gk.diving ? 0.12 : 0.05);
  if (world.ball.z < 1.25 && world.ball.z > 0 && dist < reach) {
    world.ball.x = handX;
    world.ball.y = handY;
    world.ball.z = handZ;
    world.ball.vx = 0;
    world.ball.vy = 0;
    world.ball.vz = 0;
    gk.hold = true;
    if (world.sound) saveSound();
    world.trauma = Math.min(1, world.trauma + 0.3);
    settle({ kind: "miss", reason: "save" });
    return true;
  }
  return false;
}

function dampInNet(dt: number) {
  const ball = world.ball;
  ball.vy -= 9.81 * dt;
  ball.vx *= Math.exp(-2.4 * dt);
  ball.vz *= Math.exp(-1.6 * dt);
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  ball.z += ball.vz * dt;
  ball.x = clamp(ball.x, -3.4, 3.4);
  ball.y = clamp(ball.y, BALL_R, 2.2);
  ball.z = clamp(ball.z, -1.55, 0.02);
  if (ball.y <= BALL_R + 0.001) ball.vy = 0;
}

function settle(info: ResolveInfo) {
  if (world.settled) return;
  world.settled = true;
  world.phase = info.kind === "goal" ? "goal" : "miss";
  world.timeLeft = null;
  bus.onResolve?.(info);
}

function liveBoxes() {
  const out: Array<{ x: number; y: number; z: number; hx: number; hy: number; hz: number }> = [];
  const push = (
    id: keyof typeof poses,
    hx: number,
    hy: number,
    hz: number,
    y: number,
  ) => {
    const p = poses[id];
    if (!p.visible) return;
    out.push({ x: p.x, y: y + p.lift, z: p.z, hx, hy, hz });
  };
  for (const id of wallIds) {
    const p = poses[id];
    if (!p.visible) continue;
    const arms = p.armRaise > 0.55;
    push(id, 0.27, arms ? 1.02 : 0.86, 0.22, arms ? 1.05 : 0.9);
  }
  if (poses.gk.visible) {
    const diving = Math.abs(poses.gk.lean) > 0.35;
    push("gk", diving ? 0.9 : 0.3, diving ? 0.36 : 0.92, 0.24, diving ? 0.62 : 1.0);
  }
  if (poses.def.visible) push("def", 0.28, 0.9, 0.22, 0.95);
  if (poses.ref.visible) push("ref", 0.26, 0.9, 0.22, 0.95);
  if (poses.kicker.visible) {
    const dx = world.ball.x - poses.kicker.x;
    const dz = world.ball.z - poses.kicker.z;
    if (Math.hypot(dx, dz) > 0.9) push("kicker", 0.26, 0.9, 0.22, 0.95);
  }
  return out;
}

function bumpNearest() {
  const ids = ["gk", "def", "kicker", "ref", ...wallIds] as const;
  let best: (typeof ids)[number] | null = null;
  let bestD = 1.35;
  for (const id of ids) {
    const p = poses[id];
    if (!p.visible) continue;
    const d = Math.hypot(p.x - world.ball.x, p.z - world.ball.z);
    if (d < bestD) {
      bestD = d;
      best = id;
    }
  }
  if (best) poses[best].flinch = 1;
}

function placeIdleBall(layout: Layout) {
  world.ball = makeBall(layout.ballX + 0.1, layout.ballZ);
  world.roll = 0;
}

function attract(_dt: number) {
  const t = world.clock;
  world.ball.x = 0.28;
  world.ball.y = BALL_R;
  world.ball.z = 19.55;
  world.ball.vx = world.ball.vy = world.ball.vz = 0;
  const k = poses.kicker;
  k.visible = true;
  k.x = 0.05;
  k.y = 0;
  k.z = 20.15;
  k.yaw = Math.PI;
  k.leg = Math.sin(t * 1.4) * 0.08;
  k.armRaise = 0.15;
  k.lean = 0;
  k.lift = Math.sin(t * 2) * 0.02;
  const g = poses.gk;
  g.visible = true;
  g.x = Math.sin(t * 0.35) * 0.8;
  g.y = 0;
  g.z = 0.35;
  g.yaw = 0;
  g.armRaise = 0.65;
  g.lift = Math.abs(Math.sin(t * 2.2)) * 0.04;
  g.lean = 0;
  g.leg = 0.15;
  poses.ref.visible = true;
  poses.ref.x = 7.2;
  poses.ref.z = 18.4;
  poses.ref.yaw = -0.6;
  poses.ref.lift = Math.sin(t * 1.7) * 0.015;
  poses.def.visible = false;
  attractWall.spots.forEach((s, i) => {
    const id = wallIds[i];
    if (!id) return;
    const p = poses[id];
    p.visible = true;
    p.x = s.x;
    p.z = s.z;
    p.y = 0;
    p.yaw = 0;
    p.armRaise = 0.95;
    p.lift = Math.sin(t * 2 + i) * 0.015;
    p.leg = 0;
    p.lean = 0;
  });
  for (let i = attractWall.spots.length; i < wallIds.length; i++) {
    const id = wallIds[i];
    if (id) poses[id].visible = false;
  }
}

function posesFromState(dt: number) {
  const layout = world.layout;
  if (!layout) return;
  for (const id of wallIds) poses[id].flinch = Math.max(0, poses[id].flinch - dt * 2.6);
  poses.gk.flinch = Math.max(0, poses.gk.flinch - dt * 2.6);
  poses.def.flinch = Math.max(0, poses.def.flinch - dt * 2.6);
  poses.kicker.flinch = Math.max(0, poses.kicker.flinch - dt * 2.6);
  poses.ref.flinch = Math.max(0, poses.ref.flinch - dt * 2.6);
  const t = world.clock;
  const k = poses.kicker;
  k.visible = true;
  const step = world.phase === "kicking" ? clamp(world.kickT / 0.4, 0, 1) : 0;
  k.x = layout.ballX - 0.04 + step * 0.06;
  k.z = layout.ballZ + 0.62 - step * 0.34;
  k.y = 0;
  k.lean = k.flinch * 0.45 + (world.phase === "kicking" ? Math.sin(step * Math.PI) * 0.18 : 0);
  const celebrate = world.phase === "goal";
  k.yaw = celebrate ? damp(k.yaw, 0, dt, 4) : Math.PI;
  k.armRaise = celebrate ? 1.45 : world.phase === "kicking" ? 0.2 + Math.sin(step * Math.PI) * 0.85 : 0.12;
  k.lift = celebrate ? Math.abs(Math.sin(t * 7)) * 0.18 : Math.sin(t * 2.1) * 0.02;
  k.leg = kickLeg(world.kickT, world.phase);

  if (world.phase === "idle") placeIdleBall(layout);

  const g = poses.gk;
  g.visible = true;
  g.x = world.gk.x;
  g.z = 0.15;
  g.yaw = 0;
  g.leg = 0.2;
  if (world.phase === "goal") {
    g.lean = damp(g.lean, (world.gk.dir || 1) * 1.15, dt, 3);
    g.y = 0.15;
    g.armRaise = 0.2;
    g.lift = 0;
  } else if (world.gk.hold) {
    g.lean = 0;
    g.y = 0;
    g.armRaise = 1.35;
    g.lift = 0;
    g.x = world.ball.x;
  } else if (world.gk.diving) {
    g.lean = world.gk.dir * world.gk.dive * 1.15;
    g.y = Math.sin(world.gk.dive * Math.PI) * 0.35;
    g.armRaise = 0.4 + world.gk.dive * 0.4;
    g.lift = 0;
  } else {
    g.lean = 0;
    g.y = 0;
    g.armRaise = 0.7;
    g.lift = Math.abs(Math.sin(t * 2.4)) * 0.035;
  }

  world.spots.forEach((s, i) => {
    const id = wallIds[i];
    if (!id) return;
    const p = poses[id];
    p.visible = true;
    p.x = s.x;
    p.z = s.z;
    p.y = 0;
    p.yaw = 0;
    const ballNear = world.phase === "flight" && Math.abs(world.ball.z - p.z) < 1.4 && world.ball.y > 0.9;
    p.armRaise = ballNear ? 1.55 : 1.05;
    p.lean = p.flinch * 0.7;
    p.leg = 0;
    p.lift = ballNear ? Math.sin(clamp(world.flightTime * 3.2, 0, Math.PI)) * 0.42 : Math.sin(t * 2 + i) * 0.012;
  });
  for (let i = world.spots.length; i < wallIds.length; i++) {
    const id = wallIds[i];
    if (id) poses[id].visible = false;
  }

  const def = poses.def;
  if (layout.defender && layout.timeLimit && world.phase === "idle") {
    const u = clamp(1 - (world.timeLeft ?? 0) / layout.timeLimit, 0, 1);
    const kEase = u * u;
    def.visible = true;
    def.x = layout.ballX + 2.4 + (layout.ballX - (layout.ballX + 2.4)) * kEase;
    def.z = layout.ballZ + 12 + (0.3 - 12) * kEase;
    def.yaw = Math.PI;
    def.armRaise = 0.4;
    def.leg = Math.sin(t * 10) * 0.4;
    def.lift = 0;
    def.lean = def.flinch * 0.55;
    def.y = 0;
  } else def.visible = false;

  const ref = poses.ref;
  ref.visible = true;
  ref.x = layout.ballX + (layout.ballX > 0 ? -6.5 : 6.5);
  ref.z = layout.ballZ + 0.2;
  ref.yaw = layout.ballX > 0 ? 0.8 : -0.8;
  ref.armRaise = 0.1;
  ref.lift = Math.sin(t * 1.6) * 0.012;
  ref.leg = 0;
  ref.lean = ref.flinch * 0.4;
  ref.y = 0;
}

function kickLeg(kickT: number, phase: Phase) {
  if (phase === "idle" || phase === "goal" || phase === "miss") return Math.sin(world.clock * 1.6) * 0.08;
  const u = kickT;
  if (u < 0.18) return (u / 0.18) * 1.05;
  if (u < 0.4) return 1.05 - ((u - 0.18) / 0.22) * 2.7;
  return -1.65 + Math.min(1, (u - 0.4) / 0.34) * 1.55;
}

function plantOnBoot(kickT: number) {
  const layout = world.layout;
  if (!layout) return;
  const swing = kickLeg(kickT, "kicking");
  const through = clamp((0.4 - kickT) / 0.4, 0, 1);
  world.ball.x = layout.ballX + 0.1;
  world.ball.z = layout.ballZ - (1 - through) * 0.22;
  world.ball.y = BALL_R + Math.max(0, -swing) * 0.05;
  world.ball.vx = 0;
  world.ball.vy = 0;
  world.ball.vz = 0;
}

function damp(v: number, to: number, dt: number, k: number) {
  return v + (to - v) * (1 - Math.exp(-k * dt));
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
