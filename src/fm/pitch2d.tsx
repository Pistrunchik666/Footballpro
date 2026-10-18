import { useEffect, useRef } from "react";
import { FORMATIONS } from "./clubs";
import { autoKit } from "./kits";
import type { Club, Kit, Live, Player, Save } from "./types";

type Body = { x: number; y: number; vx: number; vy: number; phase: number };

type Flow = {
  anchor: string;
  id: string;
  toId: string;
  passUntil: number;
  nextAt: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  bx: number;
  by: number;
};

type Hit = { id: string; x: number; y: number; mine: boolean };

type Props = {
  save: Save;
  live: Live;
  home: Club;
  away: Club;
  selected: string;
  wide: boolean;
  onSelect?: (id: string) => void;
};

export function PitchLive({ save, live, home, away, selected, wide, onSelect }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ save, live, home, away, selected, wide });
  propsRef.current = { save, live, home, away, selected, wide };
  const bodies = useRef<Map<string, Body>>(new Map());
  const hits = useRef<Hit[]>([]);
  const flow = useRef<Flow>({ anchor: "", id: "", toId: "", passUntil: 0, nextAt: 0, fromX: 0, fromY: 0, toX: 0, toY: 0, bx: 0, by: 0 });

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const node = ref.current;
      if (node) paint(node, propsRef.current, bodies.current, hits.current, flow.current, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pitch-canvas"
      onClick={(e) => {
        if (!onSelect) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        let best: { id: string; d: number } | null = null;
        for (const hit of hits.current) {
          if (!hit.mine || !hit.id) continue;
          const d = (hit.x - x) ** 2 + (hit.y - y) ** 2;
          if (d < 34 * 34 && (!best || d < best.d)) best = { id: hit.id, d };
        }
        if (best) onSelect(best.id);
      }}
    />
  );
}

function paint(
  node: HTMLCanvasElement,
  props: { save: Save; live: Live; home: Club; away: Club; selected: string; wide: boolean },
  bodies: Map<string, Body>,
  hits: Hit[],
  flow: Flow,
  dt: number,
) {
  const { save, live, home, away, selected, wide } = props;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = node.clientWidth || 320;
  const h = node.clientHeight || 460;
  const pw = Math.floor(w * dpr);
  const ph = Math.floor(h * dpr);
  if (node.width !== pw || node.height !== ph) {
    node.width = pw;
    node.height = ph;
  }
  const ctx = node.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const t = reduce ? live.minute : performance.now() / 1000;

  const layout = w > h * 1.08;
  const stamp = bodies.get("__layout");
  if (!stamp || stamp.phase !== (layout ? 1 : 0)) {
    bodies.clear();
    bodies.set("__layout", { x: 0, y: 0, vx: 0, vy: 0, phase: layout ? 1 : 0 });
  }
  ctx.fillStyle = "#0e1418";
  ctx.fillRect(0, 0, w, h);

  const homeKit = home.id === save.clubId ? save.kit.home : autoKit(home, "home");
  const awayKit = away.id === save.clubId ? save.kit.away : autoKit(away, "away");
  const myKit = home.id === save.clubId ? homeKit : awayKit;
  const oppKit = home.id === save.clubId ? awayKit : homeKit;
  const box = bounds(w, h, layout);
  if (layout) {
    drawStand(ctx, 0, 0, box.x0, h, oppKit.primary, oppKit.secondary, t);
    drawStand(ctx, box.x1, 0, w - box.x1, h, myKit.primary, myKit.secondary, t + 1.3);
  } else {
    drawStand(ctx, 0, 0, w, box.y0, oppKit.primary, oppKit.secondary, t);
    drawStand(ctx, 0, box.y1, w, h - box.y1, myKit.primary, myKit.secondary, t + 1.3);
  }
  drawPitch(ctx, w, h, layout);
  const homeForm = live.home ? save.tactics.formation : live.oppForm;
  const awayForm = live.home ? live.oppForm : save.tactics.formation;
  const homeIds = live.home ? live.xi : live.oppXi;
  const awayIds = live.home ? live.oppXi : live.xi;
  const elapsed = live.pieceAt ? (performance.now() - live.pieceAt) / 1000 : 99;
  const setOn = live.piece !== "open" && elapsed < 2.05;
  const wind = setOn ? Math.max(0, Math.min(1, (elapsed - 0.28) / 1.55)) : 1;
  const attackUp = live.side === "h";

  type Spot = { id: string; x: number; y: number; gk: boolean; mine: boolean; kit: Kit; player?: Player; key: string; flip: boolean };
  const spots: Spot[] = [];
  const collect = (ids: string[], form: typeof homeForm, mine: boolean, kit: Kit, flip: boolean) => {
    FORMATIONS[form].forEach((slot, i) => {
      const id = ids[i] || "";
      const player = save.players.find((p) => p.id === id);
      const gk = slot.pos === "GK" || player?.pos === "GK";
      let x = flip ? 100 - slot.x : slot.x;
      let y = flip ? 100 - slot.y : slot.y;
      if (gk) {
        x = 50 + (setOn ? 0 : Math.sin(t * 1.15 + (flip ? 1 : 0)) * 2.4);
        y = flip ? 5 : 95;
      } else if (!setOn) {
        const has = (live.side === "h" && !flip) || (live.side === "a" && flip);
        const push = has ? (flip ? 11 : -11) : flip ? -5 : 5;
        y += push;
        x += Math.sin(i * 1.7) * 1.4;
        x = Math.max(10, Math.min(90, x));
        y = Math.max(10, Math.min(90, y));
      }
      spots.push({ id, x, y, gk, mine, kit, player, key: `${flip ? "a" : "h"}-${i}`, flip });
    });
  };
  collect(homeIds, homeForm, live.home, homeKit, false);
  collect(awayIds, awayForm, !live.home, awayKit, true);

  const attackers = spots.filter((s) => s.id && !s.gk && ((attackUp && !s.flip) || (!attackUp && s.flip)));
  if (!setOn && attackers.length) {
    const nowMs = performance.now();
    const known = attackers.some((s) => s.id === flow.id);
    if (flow.anchor !== live.baller || !known) {
      flow.anchor = live.baller;
      flow.id = attackers.some((s) => s.id === live.baller) ? live.baller : attackers[0]!.id;
      flow.toId = "";
      flow.passUntil = 0;
      flow.nextAt = nowMs + 1400;
    }
    const carrierSpot = attackers.find((s) => s.id === flow.id) ?? attackers[0]!;
    const lead = Math.sin(t * 1.15) * 7;
    carrierSpot.x = Math.max(14, Math.min(86, carrierSpot.x * 0.72 + 50 * 0.28 + lead));
    carrierSpot.y = Math.max(16, Math.min(84, carrierSpot.y + (carrierSpot.flip ? 7 : -7)));
    const foes = spots.filter((s) => s.id && !s.gk && s.flip !== carrierSpot.flip)
      .sort((a, b) => (a.x - carrierSpot.x) ** 2 + (a.y - carrierSpot.y) ** 2 - ((b.x - carrierSpot.x) ** 2 + (b.y - carrierSpot.y) ** 2))
      .slice(0, 3);
    foes.forEach((d, i) => {
      d.x = d.x * 0.42 + carrierSpot.x * 0.58 + (i - 1) * 7;
      d.y = d.y * 0.5 + carrierSpot.y * 0.5;
    });
    const mates = attackers.filter((s) => s.id !== carrierSpot.id)
      .sort((a, b) => (a.x - carrierSpot.x) ** 2 + (a.y - carrierSpot.y) ** 2 - ((b.x - carrierSpot.x) ** 2 + (b.y - carrierSpot.y) ** 2))
      .slice(0, 2);
    mates.forEach((d, i) => {
      d.x = d.x * 0.62 + carrierSpot.x * 0.38 + (i === 0 ? -9 : 9);
      d.y = d.y * 0.7 + carrierSpot.y * 0.3;
    });
  }

  const taker = spots.find((s) => s.id && s.id === (setOn ? live.baller : flow.id)) ?? spots.find((s) => s.id && ((attackUp && !s.flip) || (!attackUp && s.flip)) && !s.gk);
  if (setOn && taker) {
    if (live.piece === "fk") {
      taker.x = attackUp ? 64 : 36;
      taker.y = attackUp ? 28 : 72;
      const wall = spots.filter((s) => s.flip !== taker.flip && !s.gk).slice(0, 4);
      wall.forEach((d, i) => {
        d.x = 44 + i * 4.2;
        d.y = attackUp ? 21 : 79;
      });
    } else if (live.piece === "pen") {
      taker.x = 50;
      taker.y = attackUp ? 18 : 82;
      const gk = spots.find((s) => s.flip !== taker.flip && s.gk);
      if (gk && wind > 0.35) gk.x = live.shot === "curl" || live.shot === "placed" ? 40 : 60;
    } else if (live.piece === "throw") {
      taker.x = 6;
      taker.y = 48;
    } else if (live.piece === "corner") {
      taker.x = attackUp ? 8 : 92;
      taker.y = attackUp ? 8 : 92;
    }
  }

  hits.length = 0;
  const drawList: { y: number; draw: () => void }[] = [];
  const scale = layout ? Math.max(1.05, Math.min(1.45, Math.min(w, h) / 380)) : Math.max(0.92, Math.min(1.15, w / 390));
  const drawn: { id: string; x: number; y: number; flip: boolean; phase: number }[] = [];

  for (const spot of spots) {
    const target = toPx(spot.x, spot.y, w, h, layout);
    let body = bodies.get(spot.key);
    if (!body) {
      body = { x: target.x, y: target.y, vx: 0, vy: 0, phase: spots.indexOf(spot) };
      bodies.set(spot.key, body);
    }
    const carrierNow = !setOn && spot.id === flow.id;
    if (reduce) {
      body.x = target.x;
      body.y = target.y;
      body.vx = 0;
      body.vy = 0;
    } else {
      const dx = target.x - body.x;
      const dy = target.y - body.y;
      const dist = Math.hypot(dx, dy) || 1;
      const cap = spot.gk ? 48 : carrierNow ? 132 : 86;
      const accel = spot.gk ? 180 : carrierNow ? 380 : 250;
      if (dist > 1.4) {
        body.vx += (dx / dist) * accel * dt;
        body.vy += (dy / dist) * accel * dt;
      }
      const drag = Math.exp(-dt * (carrierNow ? 1.15 : 2.6));
      body.vx *= drag;
      body.vy *= drag;
      const sp = Math.hypot(body.vx, body.vy);
      if (sp > cap) {
        body.vx = (body.vx / sp) * cap;
        body.vy = (body.vy / sp) * cap;
      }
      body.x += body.vx * dt;
      body.y += body.vy * dt;
    }
    const moving = Math.hypot(body.vx, body.vy) > 12;
    body.phase += reduce ? 0 : dt * (spot.gk ? 2.2 : carrierNow ? 11 : moving ? 7.2 : 2.4);
  }
  const actors = spots.map((spot) => bodies.get(spot.key)!).filter(Boolean);
  if (!reduce) {
    for (let i = 0; i < actors.length; i++) {
      for (let j = i + 1; j < actors.length; j++) {
        const a = actors[i]!;
        const b = actors[j]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const min = 18 * scale;
        if (dist < min) {
          const push = (min - dist) / 2;
          a.x -= (dx / dist) * push;
          a.y -= (dy / dist) * push;
          b.x += (dx / dist) * push;
          b.y += (dy / dist) * push;
        }
      }
    }
  }
  for (const spot of spots) {
    const body = bodies.get(spot.key)!;
    const carrierNow = !setOn && spot.id === flow.id;
    const px = body.x;
    const py = body.y;
    const lean = Math.max(-0.4, Math.min(0.4, (layout ? body.vy : body.vx) / 200));
    drawn.push({ id: spot.id, x: px, y: py, flip: spot.flip, phase: body.phase });
    drawList.push({
      y: py,
      draw: () => {
        drawRunner(ctx, px, py, spot.kit, spot.player, spot.gk, body.phase, selected === spot.id, scale * (spot.gk ? 1.12 : 1), lean);
      },
    });
    hits.push({ id: spot.id, x: px, y: py, mine: spot.mine && !!spot.id });
  }

  drawList.sort((a, b) => a.y - b.y).forEach((item) => item.draw());
  const coachPhase = t * 1.7;
  if (layout) drawCoach(ctx, (box.x0 + box.x1) / 2 + Math.sin(coachPhase) * 22, box.y1 + 24, myKit.primary, coachPhase, scale * 0.92);
  else drawCoach(ctx, box.x0 - 14, (box.y0 + box.y1) / 2 + Math.sin(coachPhase) * 18, myKit.primary, coachPhase, scale);

  const nowMs = performance.now();
  if (!setOn && !reduce && attackers.length > 1 && nowMs >= flow.passUntil && nowMs >= flow.nextAt) {
    const cur = drawn.find((d) => d.id === flow.id);
    const options = drawn.filter((d) => d.id && attackers.some((s) => s.id === d.id) && d.id !== flow.id);
    const mate = options[Math.floor(Math.abs(Math.sin(t * 9.1)) * options.length)] ?? options[0];
    if (cur && mate) {
      flow.toId = mate.id;
      flow.fromX = cur.x;
      flow.fromY = cur.y + 8 * scale;
      flow.toX = mate.x;
      flow.toY = mate.y + 8 * scale;
      flow.passUntil = nowMs + 620;
      flow.nextAt = nowMs + 2100 + Math.floor(Math.abs(Math.sin(t * 4.2)) * 1100);
    }
  }
  if (!setOn && flow.toId && nowMs >= flow.passUntil) {
    flow.id = flow.toId;
    flow.toId = "";
  }

  const carrier = drawn.find((d) => d.id && d.id === (setOn ? taker?.id || live.baller : flow.id)) ?? drawn.find((d) => d.id);
  let ball = carrier ? feetBall(carrier, scale, layout) : toPx(50, 50, w, h, layout);
  if (!setOn && flow.toId && nowMs < flow.passUntil) {
    const u = 1 - (flow.passUntil - nowMs) / 620;
    const lift = Math.sin(Math.min(1, Math.max(0, u)) * Math.PI) * 18 * scale;
    ball = {
      x: flow.fromX + (flow.toX - flow.fromX) * u,
      y: flow.fromY + (flow.toY - flow.fromY) * u - lift,
    };
  } else if (setOn && taker) {
    const start = toPx(taker.x, taker.y, w, h, layout);
    const endPct = live.piece === "throw"
      ? { x: 32, y: 46 }
      : live.piece === "corner"
        ? { x: attackUp ? 48 : 52, y: attackUp ? 16 : 84 }
        : { x: live.shot === "curl" ? (attackUp ? 34 : 66) : live.shot === "placed" ? 62 : 50, y: attackUp ? 5 : 95 };
    const end = toPx(endPct.x, endPct.y, w, h, layout);
    const u = wind;
    let x = start.x + (end.x - start.x) * u;
    let y = start.y + (end.y - start.y) * u;
    if (live.shot === "curl") {
      const bend = Math.sin(u * Math.PI) * 42 * scale;
      if (layout) y += attackUp ? bend : -bend;
      else x += attackUp ? -bend : bend;
    }
    const arc = live.shot === "chip" || live.piece === "throw" || live.piece === "corner" ? 72 : live.shot === "power" ? 16 : 8;
    const lift = Math.sin(u * Math.PI) * arc * scale;
    ball = { x, y: y - lift + (u < 0.08 ? 8 * scale : 0) };
  } else if (carrier) {
    const feet = feetBall(carrier, scale, layout);
    if (!flow.bx && !flow.by) {
      flow.bx = feet.x;
      flow.by = feet.y;
    }
    const chase = reduce ? 1 : Math.min(1, dt * 9);
    flow.bx += (feet.x - flow.bx) * chase;
    flow.by += (feet.y - flow.by) * chase;
    ball = { x: flow.bx, y: flow.by };
  }
  flow.bx = ball.x;
  flow.by = ball.y;
  drawBall(ctx, ball.x, ball.y, 9.2 * scale, t);
  if (setOn) {
    const label = live.piece === "fk" ? (live.shot === "chip" ? "Штрафной · перекидка" : live.shot === "curl" ? "Штрафной · крученый" : "Штрафной") : live.piece === "pen" ? "Пенальти" : live.piece === "throw" ? "Аут" : "Угловой";
    ctx.fillStyle = "rgba(8,16,12,0.78)";
    ctx.fillRect(w / 2 - 86, box.y0 + 4, 172, 22);
    ctx.fillStyle = "#f4f7f2";
    ctx.font = "600 12px Manrope, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, w / 2, box.y0 + 15);
  }
}

function feetBall(d: { x: number; y: number; flip: boolean; phase: number }, scale: number, layout: boolean) {
  const stride = Math.sin(d.phase * 2) * 4 * scale;
  const dir = d.flip ? 1 : -1;
  if (layout) return { x: d.x + dir * 7 * scale, y: d.y + 5 * scale + stride * 0.2 };
  return { x: d.x + stride, y: d.y + 9 * scale + dir * 3.5 * scale };
}

function bounds(w: number, h: number, wide: boolean) {
  if (wide) return { x0: 78, y0: 20, x1: w - 78, y1: h - 48 };
  return { x0: 36, y0: 58, x1: w - 14, y1: h - 58 };
}

function toPx(xPct: number, yPct: number, w: number, h: number, wide: boolean) {
  const { x0, y0, x1, y1 } = bounds(w, h, wide);
  if (!wide) return { x: x0 + (xPct / 100) * (x1 - x0), y: y0 + (yPct / 100) * (y1 - y0) };
  return { x: x0 + (yPct / 100) * (x1 - x0), y: y0 + (xPct / 100) * (y1 - y0) };
}

function drawPitch(ctx: CanvasRenderingContext2D, w: number, h: number, wide: boolean) {
  const { x0, y0, x1, y1 } = bounds(w, h, wide);
  const fw = x1 - x0;
  const fh = y1 - y0;
  const bands = wide ? 12 : 9;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle = i % 2 ? "#187a40" : "#146536";
    if (wide) ctx.fillRect(x0 + (fw / bands) * i, y0, fw / bands + 1, fh);
    else ctx.fillRect(x0, y0 + (fh / bands) * i, fw, fh / bands + 1);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.78)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x0, y0, fw, fh);
  ctx.beginPath();
  if (wide) {
    ctx.moveTo((x0 + x1) / 2, y0);
    ctx.lineTo((x0 + x1) / 2, y1);
  } else {
    ctx.moveTo(x0, (y0 + y1) / 2);
    ctx.lineTo(x1, (y0 + y1) / 2);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.arc((x0 + x1) / 2, (y0 + y1) / 2, Math.min(fw, fh) * 0.13, 0, Math.PI * 2);
  ctx.stroke();
  if (wide) {
    const depth = fw * 0.18;
    const span = fh * 0.5;
    const sixD = fw * 0.07;
    const sixS = fh * 0.28;
    ctx.strokeRect(x0, (y0 + y1) / 2 - span / 2, depth, span);
    ctx.strokeRect(x1 - depth, (y0 + y1) / 2 - span / 2, depth, span);
    ctx.strokeRect(x0, (y0 + y1) / 2 - sixS / 2, sixD, sixS);
    ctx.strokeRect(x1 - sixD, (y0 + y1) / 2 - sixS / 2, sixD, sixS);
    goal(ctx, x0 - 18, (y0 + y1) / 2 - 36, 18, 72);
    goal(ctx, x1, (y0 + y1) / 2 - 36, 18, 72);
  } else {
    const depth = fh * 0.16;
    const span = fw * 0.56;
    const sixD = fh * 0.065;
    const sixS = fw * 0.32;
    ctx.strokeRect((x0 + x1) / 2 - span / 2, y0, span, depth);
    ctx.strokeRect((x0 + x1) / 2 - span / 2, y1 - depth, span, depth);
    ctx.strokeRect((x0 + x1) / 2 - sixS / 2, y0, sixS, sixD);
    ctx.strokeRect((x0 + x1) / 2 - sixS / 2, y1 - sixD, sixS, sixD);
    goal(ctx, (x0 + x1) / 2 - 40, y0 - 16, 80, 16);
    goal(ctx, (x0 + x1) / 2 - 40, y1, 80, 16);
  }
}

function drawStand(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, primary: string, secondary: string, t: number) {
  if (w < 8 || h < 8) return;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = "#141b20";
  ctx.fillRect(x, y, w, h);
  const cols = Math.max(6, Math.floor((Math.max(w, h) > 80 ? w : h) / 11));
  const rows = Math.max(3, Math.floor((w > h ? h : w) / 14));
  const wide = w >= h;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const bob = Math.sin(t * 2.8 + c * 0.65 + r * 1.3) * 1.5;
      const px = wide ? x + 4 + ((w - 8) / cols) * c : x + 4 + ((w - 8) / rows) * r;
      const py = wide ? y + 8 + ((h - 10) / rows) * r + bob : y + 6 + ((h - 8) / cols) * c + bob;
      ctx.fillStyle = (c + r) % 4 === 0 ? secondary : primary;
      ctx.fillRect(px, py, 6, 7);
      ctx.fillStyle = (c + r * 2) % 7 === 0 ? "#c98b62" : "#e2b48a";
      ctx.beginPath();
      ctx.arc(px + 3, py - 2, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawCoach(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, phase: number, scale: number) {
  const arm = Math.sin(phase) * 5 * scale;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 18 * scale, 11 * scale, 3.2 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#141414";
  ctx.lineWidth = 3 * scale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-3 * scale, 4 * scale);
  ctx.lineTo(-4 * scale, 16 * scale);
  ctx.moveTo(3 * scale, 4 * scale);
  ctx.lineTo(5 * scale, 16 * scale);
  ctx.stroke();
  ctx.fillStyle = "#1a1f24";
  roundRect(ctx, -8 * scale, -10 * scale, 16 * scale, 16 * scale, 3 * scale);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.fillRect(-2.4 * scale, -10 * scale, 4.8 * scale, 16 * scale);
  ctx.fillStyle = "#e2b48a";
  ctx.beginPath();
  ctx.arc(0, -16 * scale, 4.3 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.fillRect(-5 * scale, -21 * scale, 10 * scale, 3.4 * scale);
  ctx.strokeStyle = "#e2b48a";
  ctx.lineWidth = 2.2 * scale;
  ctx.beginPath();
  ctx.moveTo(7 * scale, -4 * scale);
  ctx.lineTo((13 + arm) * scale, -9 * scale);
  ctx.stroke();
  ctx.restore();
}

function goal(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#f4f7f5";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + (w / 4) * i, y);
    ctx.lineTo(x + (w / 4) * i, y + h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + (h / 3) * i);
    ctx.lineTo(x + w, y + (h / 3) * i);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRunner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  kit: Kit,
  player: Player | undefined,
  gk: boolean,
  phase: number,
  selected: boolean,
  scale: number,
  lean = 0,
) {
  const run = Math.sin(phase);
  const primary = gk ? gkTone(kit.primary).shirt : kit.primary;
  const trim = gk ? gkTone(kit.primary).trim : kit.secondary;
  const socks = gk ? gkTone(kit.primary).socks : kit.socks;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(lean);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 16 * scale, 8 * scale, 3 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = socks;
  ctx.lineWidth = 3 * scale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-3.2 * scale, 4 * scale);
  ctx.lineTo((-4.5 + run * 5) * scale, 15 * scale);
  ctx.moveTo(3.2 * scale, 4 * scale);
  ctx.lineTo((4.5 - run * 5) * scale, 15 * scale);
  ctx.stroke();
  ctx.fillStyle = trim;
  ctx.fillRect(-6 * scale, 2 * scale, 12 * scale, 5 * scale);
  ctx.fillStyle = primary;
  roundRect(ctx, -7 * scale, -8 * scale, 14 * scale, 12 * scale, 3 * scale);
  ctx.fill();
  if (gk) {
    ctx.fillStyle = trim;
    for (let i = 0; i < 3; i++) ctx.fillRect(-7 * scale, (-6 + i * 3.4) * scale, 14 * scale, 1.3 * scale);
  } else if (kit.design % 3 === 1) {
    ctx.fillStyle = trim;
    ctx.fillRect(-1.2 * scale, -8 * scale, 2.4 * scale, 12 * scale);
  }
  ctx.strokeStyle = "#e2b48a";
  ctx.lineWidth = 2.3 * scale;
  ctx.beginPath();
  ctx.moveTo(-6 * scale, -4 * scale);
  ctx.lineTo((-11 + run) * scale, 1 * scale);
  ctx.moveTo(6 * scale, -4 * scale);
  ctx.lineTo((11 - run) * scale, 1 * scale);
  ctx.stroke();
  if (gk) {
    glove(ctx, (-11 + run) * scale, 1 * scale, scale);
    glove(ctx, (11 - run) * scale, 1 * scale, scale);
  }
  ctx.fillStyle = "#e2b48a";
  ctx.beginPath();
  ctx.arc(0, -12 * scale, 4.1 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = luminance(primary) > 0.62 ? "#14201b" : "#fff";
  ctx.font = `700 ${Math.round(9 * scale)}px Outfit, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(player?.number ?? ""), 0, -2 * scale);
  if (selected) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#f2c200";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 2 * scale, 16 * scale, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function glove(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.fillStyle = "#f7f4ee";
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(x, y, 4.1 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(t * 2.2);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(2, r + 6, r * 0.8, r * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = "#f4f4f4";
  ctx.fill();
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
    const px = Math.cos(a) * r * 0.36;
    const py = Math.sin(a) * r * 0.36;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = "#161616";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function gkTone(team: string) {
  const grass = "#187a40";
  const options = ["#f2c200", "#ff5a1f", "#6c3ce0", "#111111", "#f7f4ee", "#2f6fed"];
  const shirt = options
    .map((c) => ({ c, d: colorDist(c, team) + colorDist(c, grass) * 1.35 }))
    .sort((a, b) => b.d - a.d)[0]!.c;
  const trim = luminance(shirt) > 0.62 ? "#111111" : "#f7f4ee";
  const socks = luminance(shirt) > 0.62 ? "#1a1a1a" : shirt;
  return { shirt, trim, socks };
}

function colorDist(a: string, b: string) {
  const pa = rgb(a);
  const pb = rgb(b);
  return Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
}

function rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  if (h.length < 6) return [0, 0, 0];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function luminance(hex: string) {
  const h = hex.replace("#", "");
  if (h.length < 6) return 0;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
