import { DERBIES, fit, FORMATIONS, leagueMeta, wageCap } from "./clubs";
import { cupWinner, leaguePrize, materializeLeague, noteEuroResult, progressCompetitions, seedCompetitions } from "./competitions";
import { addDays, dollarText, hash, isWinter, makeFixtures, makePlayer, money, overall, playerName, priceRub, rng, wageText, weekday, windowOpen } from "./generate";
import { FOREIGN_LEAGUES } from "./world";
import { clubTactics, styleById } from "./tactics";
import type { Fixture, LiveEvent, Player, Pos, Save, Tactics } from "./types";
import type { LeagueId } from "./types";

export function clubOf(save: Save, id: string) {
  return save.clubs.find((c) => c.id === id)!;
}

export function playersOf(save: Save, clubId: string) {
  return save.players.filter((p) => p.clubId === clubId);
}

export function playerOf(save: Save, id: string) {
  return save.players.find((p) => p.id === id);
}

export function roleScore(p: Player, slot: Pos) {
  const f = fit(p.pos, slot);
  let skill = 10;
  if (slot === "GK") skill = p.gk * 0.75 + p.men * 0.15 + p.def * 0.1;
  else if (slot === "DC" || slot === "DR" || slot === "DL") skill = p.def * 0.5 + p.strn * 0.18 + p.pac * 0.14 + p.men * 0.18;
  else if (slot === "DM") skill = p.def * 0.32 + p.pas * 0.28 + p.men * 0.22 + p.tec * 0.18;
  else if (slot === "MC") skill = p.pas * 0.32 + p.tec * 0.24 + p.men * 0.18 + p.sta * 0.14 + p.def * 0.12;
  else if (slot === "AM" || slot === "MR" || slot === "ML") skill = p.tec * 0.28 + p.pac * 0.24 + p.pas * 0.2 + p.sho * 0.18 + p.men * 0.1;
  else skill = p.sho * 0.4 + p.pac * 0.24 + p.tec * 0.2 + p.strn * 0.16;
  const ovrSkill = p.ovr ? p.ovr / 5.15 : skill;
  skill = skill * 0.42 + ovrSkill * 0.58;
  const ready = (0.72 + p.cond / 380) * (0.82 + p.mor / 560) * (0.86 + p.sharp / 700);
  const ageK = p.age >= 36 ? 0.74 : p.age >= 34 ? 0.8 : p.age >= 32 ? 0.86 : p.age >= 30 ? 0.9 : p.age <= 19 ? 0.96 : 1;
  const tired = p.cond < 48 ? 0.8 : p.cond < 62 ? 0.88 : p.cond < 75 ? 0.95 : 1;
  return skill * f * ready * ageK * tired;
}

export function available(p: Player) {
  return p.injured <= 0 && p.ban <= 0;
}

export function autoXi(save: Save, clubId: string, formation = "4-3-3" as Tactics["formation"]) {
  const slots = FORMATIONS[formation];
  const pool = playersOf(save, clubId).filter(available);
  const used = new Set<string>();
  return slots.map((slot) => {
    let best: Player | null = null;
    let score = -1;
    for (const p of pool) {
      if (used.has(p.id)) continue;
      const s = roleScore(p, slot.pos);
      if (s > score) {
        score = s;
        best = p;
      }
    }
    if (best) used.add(best.id);
    return best?.id ?? "";
  });
}

export function xiStrength(save: Save, ids: string[], formation: Tactics["formation"], tactics?: Tactics) {
  const slots = FORMATIONS[formation];
  let sum = 0;
  let att = 0;
  let def = 0;
  let attN = 0;
  let defN = 0;
  ids.forEach((id, i) => {
    const p = id ? playerOf(save, id) : undefined;
    const slot = slots[i]!.pos;
    const s = p ? roleScore(p, slot) : 6;
    sum += s;
    if (slot === "GK" || slot === "DC" || slot === "DR" || slot === "DL" || slot === "DM") {
      def += s;
      defN++;
    } else {
      att += s;
      attN++;
    }
  });
  let mod = 1;
  let attK = 1;
  let defK = 1;
  if (tactics) {
    const k = tacticMods(tactics);
    mod = k.mod;
    attK = k.att;
    defK = k.def;
  }
  return { avg: (sum / 11) * mod, att: (att / Math.max(1, attN)) * attK * mod, def: (def / Math.max(1, defN)) * defK };
}

function tacticMods(t?: Tactics) {
  if (!t) return { mod: 1, att: 1, def: 1, concede: 1 };
  let mod = 1 + t.mentality * 0.02;
  let att = 1 + Math.max(0, t.mentality) * 0.045;
  let def = 1 + Math.max(0, -t.mentality) * 0.045;
  att *= 1 + (t.tempo - 2) * 0.035;
  def *= 1 + (2 - t.line) * 0.04;
  const concede = 1 + (t.line - 2) * 0.045 + Math.max(0, t.press - 2) * 0.02;
  att *= 1 + (t.width - 2) * 0.03;
  mod *= 1 + (t.press - 2) * 0.015;
  if (t.style === "bus") {
    att *= 0.84;
    def *= 1.16;
  } else if (t.style === "counter") {
    att *= t.mentality <= 0 ? 1.1 : 1.04;
    def *= 1.06;
  } else if (t.style === "direct") {
    att *= 1.08;
  } else if (t.style === "gegen") {
    att *= 1.1;
    def *= 0.94;
  } else if (t.style === "wing") {
    att *= 1.06;
  } else if (t.style === "vertical") {
    att *= 1.09;
    def *= 0.98;
  } else {
    att *= t.tempo <= 2 ? 1.06 : 1.02;
    def *= 1.03;
  }
  return { mod, att, def, concede };
}

function poisson(lambda: number, r: () => number) {
  const L = Math.exp(-Math.max(0.05, lambda));
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= r();
  } while (p > L && k < 12);
  return k - 1;
}

export function squadOvr(save: Save, ids: string[]) {
  let n = 0;
  let sum = 0;
  for (const id of ids) {
    const p = id ? playerOf(save, id) : undefined;
    if (!p) continue;
    sum += overall(p);
    n++;
  }
  return n ? Math.round((sum / n) * 10) / 10 : 60;
}

function difficultyEdge(diff: Save["difficulty"], gap: number) {
  if (diff === "novice") return { user: 1.9 + Math.max(0, gap) * 0.02, opp: 0.36, draw: 0 };
  if (diff === "pro") return { user: clamp(0.78 + gap * 0.028, 0.38, 1.65), opp: clamp(1.12 - gap * 0.018, 0.45, 1.55), draw: gap < 9 ? 0.14 : 0.04 };
  if (diff === "world") {
    const bonus = Math.max(0, gap - 6);
    return {
      user: clamp(0.7 + bonus * 0.09 + Math.min(0, gap) * 0.045, 0.3, 1.85),
      opp: clamp(1.15 - bonus * 0.065 - Math.min(0, gap) * 0.03, 0.4, 1.65),
      draw: gap < 9 ? 0.14 : 0.04,
    };
  }
  return { user: clamp(1.08 + gap * 0.04, 0.5, 1.8), opp: clamp(1.02 - gap * 0.025, 0.45, 1.5), draw: Math.abs(gap) < 3 ? 0.06 : 0 };
}

function scaleSides(save: Save, homeId: string, awayId: string, homeIds: string[], awayIds: string[], lh: number, la: number) {
  const userHome = homeId === save.clubId;
  const userAway = awayId === save.clubId;
  const diff = save.difficulty ?? "experienced";
  if (!userHome && !userAway) {
    if (diff === "world") return { lh: lh * 0.82, la: la * 0.82 };
    if (diff === "pro") return { lh: lh * 0.92, la: la * 0.92 };
    if (diff === "novice") return { lh: lh * 1.08, la: la * 1.08 };
    return { lh, la };
  }
  const gap = squadOvr(save, userHome ? homeIds : awayIds) - squadOvr(save, userHome ? awayIds : homeIds);
  const k = difficultyEdge(diff, gap);
  let u = (userHome ? lh : la) * k.user;
  let o = (userHome ? la : lh) * k.opp;
  if (k.draw) {
    u *= 1 - k.draw;
    o *= 1 - k.draw * 0.5;
  }
  u = clamp(u, 0.05, 3.4);
  o = clamp(o, 0.04, 3.1);
  return userHome ? { lh: u, la: o } : { lh: o, la: u };
}

export function quickScore(save: Save, homeId: string, awayId: string, seed: string) {
  const r = rng(hash(seed));
  const homeT = homeId === save.clubId ? save.tactics : clubTactics(homeId);
  const awayT = awayId === save.clubId ? save.tactics : clubTactics(awayId);
  const homeIds = homeId === save.clubId && save.tactics.slots.some(Boolean) ? save.tactics.slots : autoXi(save, homeId, homeT.formation);
  const awayIds = awayId === save.clubId && save.tactics.slots.some(Boolean) ? save.tactics.slots : autoXi(save, awayId, awayT.formation);
  const hs = xiStrength(save, homeIds, homeT.formation, homeT);
  const as = xiStrength(save, awayIds, awayT.formation, awayT);
  let lh = clamp(0.32 + (hs.att / Math.max(8, as.def)) * 0.95 * 1.08, 0.25, 3.3);
  let la = clamp(0.28 + (as.att / Math.max(8, hs.def)) * 0.9, 0.2, 3.1);
  const scaled = scaleSides(save, homeId, awayId, homeIds, awayIds, lh, la);
  lh = scaled.lh;
  la = scaled.la;
  return [poisson(lh, r), poisson(la, r)] as const;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export type SidePlan = {
  ids: string[];
  formation: Tactics["formation"];
  tactics?: Tactics;
  clubId: string;
};

export function simulateSegment(save: Save, home: SidePlan, away: SidePlan, from: number, to: number, seed: string, score: { h: number; a: number }) {
  const r = rng(hash(seed + ":" + from));
  const hs = xiStrength(save, home.ids, home.formation, home.tactics);
  const as = xiStrength(save, away.ids, away.formation, away.tactics);
  const homeBoost = 1.08;
  const pressH = home.tactics ? home.tactics.press : 2;
  const pressA = away.tactics ? away.tactics.press : 2;
  const setH = save.focus === "set" && home.clubId === save.clubId ? 1.18 : 1;
  const setA = save.focus === "set" && away.clubId === save.clubId ? 1.18 : 1;
  const focusAtt = (id: string) => (save.focus === "attack" && id === save.clubId ? 1.06 : 1);
  const focusDef = (id: string) => (save.focus === "defence" && id === save.clubId ? 1.06 : 1);
  const span = (to - from) / 90;
  const th = tacticMods(home.tactics);
  const ta = tacticMods(away.tactics);
  let lh = clamp((0.28 + (hs.att * focusAtt(home.clubId)) / Math.max(8, as.def / focusDef(away.clubId))) * homeBoost * setH * span * th.att * ta.concede, 0.15, 2.8);
  let la = clamp((0.24 + (as.att * focusAtt(away.clubId)) / Math.max(8, hs.def / focusDef(home.clubId))) * setA * span * ta.att * th.concede, 0.12, 2.6);
  const scaled = scaleSides(save, home.clubId, away.clubId, home.ids, away.ids, lh, la);
  lh = scaled.lh;
  la = scaled.la;
  const events: LiveEvent[] = [];
  let xgH = 0;
  let xgA = 0;
  const chances = (lambda: number, side: "h" | "a") => {
    const n = poisson(lambda * 3.1, r);
    for (let i = 0; i < n; i++) {
      const min = from + 1 + Math.floor(r() * Math.max(1, to - from - 1));
      const xg = 0.06 + r() * (0.28 + lambda * 0.08);
      const plan = side === "h" ? home : away;
      const slots = FORMATIONS[plan.formation];
      const attackers = plan.ids
        .map((id, idx) => ({ id, pos: slots[idx]!.pos, p: id ? playerOf(save, id) : undefined }))
        .filter((x) => x.p && x.pos !== "GK" && x.pos !== "DC");
      const pickFrom = attackers.length ? attackers : plan.ids.map((id, idx) => ({ id, pos: slots[idx]!.pos, p: playerOf(save, id) })).filter((x) => x.p);
      const scorer = pickFrom[Math.floor(r() * pickFrom.length)]!;
      const name = scorer.p ? playerName(scorer.p) : "Игрок";
      const gkPlan = side === "h" ? away : home;
      const gk = playerOf(save, gkPlan.ids[0] || "");
      const gkName = gk ? playerName(gk) : "вратарь";
      const goal = r() < xg * (scorer.p ? 0.75 + scorer.p.sho / 40 : 1);
      if (side === "h") xgH += xg;
      else xgA += xg;
      if (goal) {
        if (side === "h") score.h++;
        else score.a++;
        const club = side === "h" ? home.clubId : away.clubId;
        const cname = save.clubs.find((c) => c.id === club)?.name ?? "хозяева";
        const how = r();
        const text =
          how < 0.22
            ? `${name} обыгрывает защитника и закатывает мяч в дальний угол — ${score.h}:${score.a}.`
            : how < 0.5
              ? `${name} замыкает передачу в касание, вратарь бессилен, и «${cname}» ведёт ${score.h}:${score.a}.`
              : how < 0.78
                ? `${name} бьёт в дальний угол с линии штрафной, мяч в сетке — ${score.h}:${score.a}.`
                : `${name} добивает после рикошета, и «${cname}» празднует гол, ${score.h}:${score.a}.`;
        events.push({ min, text, kind: "goal", pid: scorer.id, side, piece: "open" });
      } else {
        const how = r();
        const club = side === "h" ? home.clubId : away.clubId;
        const cname = save.clubs.find((c) => c.id === club)?.name ?? "атакующие";
        if (how < 0.62) {
          events.push({ min, text: `${gkName} в падении забирает удар ${name}, мяч остаётся в игре, и «${cname}» продолжает владение.`, kind: "miss", side, pid: scorer.id, piece: "open" });
        } else if (how < 0.84) {
          events.push({ min, text: `${name} бьёт мимо, защитник подхватывает отскок и сразу ведёт мяч вперёд.`, kind: "miss", side, pid: scorer.id, piece: "open" });
        } else if (how < 0.93) {
          events.push({ min, text: `Удар ${name} проходит рядом со штангой, защитник выносит мяч на угловой.`, kind: "dead", side, pid: scorer.id, piece: "corner" });
        } else {
          events.push({ min, text: `Защитник в подкате выбивает мяч из-под ${name}, игра останавливается из-за аута.`, kind: "dead", side, pid: scorer.id, piece: "throw" });
        }
      }
    }
  };
  chances(lh, "h");
  chances(la, "a");
  const cards = (plan: SidePlan, press: number) => {
    const n = r() < 0.15 + press * 0.06 ? 1 : 0;
    for (let i = 0; i < n; i++) {
      const id = plan.ids[Math.floor(r() * plan.ids.length)]!;
      const p = playerOf(save, id);
      if (!p) continue;
      const min = from + 1 + Math.floor(r() * Math.max(1, to - from - 1));
      events.push({ min, text: `${playerName(p)} срывает атаку грубым подкатом и получает жёлтую карточку от арбитра.`, kind: "card", pid: p.id });
    }
  };
  cards(home, pressH);
  cards(away, pressA);
  if (r() < 0.04) {
    const plan = r() < 0.5 ? home : away;
    const id = plan.ids[1 + Math.floor(r() * 10)] || plan.ids[0];
    const p = id ? playerOf(save, id) : undefined;
    const min = Math.min(to, from + 1 + Math.floor(r() * Math.max(1, to - from)));
    if (p) events.push({ min, text: `${playerName(p)} прихрамывает после стыка и просит паузу, чтобы оказать помощь.`, kind: "info", pid: p.id });
  }
  events.sort((a, b) => a.min - b.min || a.text.localeCompare(b.text, "ru"));
  const spanMin = Math.max(1, to - from);
  const openN = spanMin >= 20 ? 5 : 2;
  for (let i = 0; i < openN; i++) {
    const side: "h" | "a" = r() < 0.5 ? "h" : "a";
    const plan = side === "h" ? home : away;
    const slots = FORMATIONS[plan.formation];
    const out = plan.ids
      .map((id, idx) => ({ id, pos: slots[idx]!.pos, p: id ? playerOf(save, id) : undefined }))
      .filter((x) => x.p && x.pos !== "GK");
    if (!out.length) continue;
    const a = out[Math.floor(r() * out.length)]!;
    const b = out[Math.floor(r() * out.length)]!;
    const name = playerName(a.p!);
    const mate = playerName(b.p!);
    const min = Math.min(to, from + Math.max(1, Math.round(((i + 0.35) / openN) * Math.max(1, to - from))));
    const roll = r();
    const carrier = roll < 0.55 ? a : b;
    const text =
      roll < 0.28
        ? `${name} принимает мяч в ноги и ведёт его через центр, соперник пятится.`
        : roll < 0.5
          ? `${name} ускоряется с мячом по флангу и тащит его до чужой трети.`
          : roll < 0.72
            ? `${name} в касание отдаёт на ${mate}, тот контролирует мяч и продолжает движение.`
            : roll < 0.88
              ? `${name} обыгрывает оппонента корпусом и катит мяч дальше вперёд.`
              : `${name} держит мяч в опорной зоне, команда смещается и открывается под передачу.`;
    events.push({ min, text, kind: "info", side, pid: carrier.id, piece: "open" });
  }
  const side: "h" | "a" = r() < 0.5 ? "h" : "a";
  const plan = side === "h" ? home : away;
  const other = side === "h" ? away : home;
  const slots = FORMATIONS[plan.formation];
  const shooters = plan.ids
    .map((id, idx) => ({ id, pos: slots[idx]!.pos, p: id ? playerOf(save, id) : undefined }))
    .filter((x) => x.p && x.pos !== "GK");
  const taker = [...shooters].sort((a, b) => (b.p!.sho + b.p!.tec) - (a.p!.sho + a.p!.tec))[0];
  const mate = shooters.find((x) => x.id !== taker?.id) ?? taker;
  const gk = playerOf(save, other.ids[0] || "");
  const min = Math.min(to, from + 1 + Math.floor(r() * Math.max(1, to - from - 1)));
  if (taker?.p && r() < Math.min(0.8, spanMin / 26)) {
    const name = playerName(taker.p);
    const gkName = gk ? playerName(gk) : "вратарь";
    const roll = r();
    if (roll < 0.42) {
      const mateName = mate?.p ? playerName(mate.p) : "партнёра";
      events.push({
        min,
        text: `Аут. ${name} берёт мяч у боковой и вбрасывает руками на ${mateName}, тот принимает в ноги.`,
        kind: "dead",
        side,
        pid: taker.id,
        piece: "throw",
      });
    } else if (roll < 0.7) {
      events.push({
        min,
        text: `Угловой. ${name} сам подходит к флажку и навешивает в штрафную, стенка соперника не успевает.`,
        kind: "dead",
        side,
        pid: taker.id,
        piece: "corner",
        shot: "chip",
      });
    } else if (roll < 0.78) {
      const scored = r() < 0.72 + taker.p.sho / 80;
      const placed = r() < 0.5;
      if (scored) {
        if (side === "h") score.h++;
        else score.a++;
        events.push({
          min,
          text: `Пенальти. ${name} сам разбегается и бьёт ${placed ? "низом в угол" : "мощно под перекладину"}, ${gkName} не достаёт — ${score.h}:${score.a}.`,
          kind: "goal",
          side,
          pid: taker.id,
          piece: "pen",
          shot: placed ? "placed" : "power",
        });
      } else {
        events.push({
          min,
          text: `Пенальти. ${name} бьёт с точки, ${gkName} угадывает угол и забирает мяч.`,
          kind: "miss",
          side,
          pid: taker.id,
          piece: "pen",
          shot: placed ? "placed" : "power",
        });
      }
    } else {
      const shot = r() < 0.34 ? "chip" : r() < 0.7 ? "curl" : "power";
      const scored = r() < (shot === "curl" ? 0.34 : shot === "chip" ? 0.28 : 0.2) * (0.7 + taker.p.sho / 20);
      const how =
        shot === "chip"
          ? `${name} сам разбегается и перекидывает стенку навесной дугой`
          : shot === "curl"
            ? `${name} закручивает мяч в обход стенки, тот пролетает сбоку`
            : `${name} бьёт с прямого штрафного в створ`;
      if (scored) {
        if (side === "h") score.h++;
        else score.a++;
        events.push({
          min,
          text: `Штрафной. ${how}, мяч в сетке — ${score.h}:${score.a}.`,
          kind: "goal",
          side,
          pid: taker.id,
          piece: "fk",
          shot,
        });
      } else {
        events.push({
          min,
          text: `Штрафной. ${how}, но ${gkName} снимает мяч.`,
          kind: "dead",
          side,
          pid: taker.id,
          piece: "fk",
          shot,
        });
      }
    }
  }
  events.sort((a, b) => a.min - b.min || ((a.piece && a.piece !== "open" ? 1 : 0) - (b.piece && b.piece !== "open" ? 1 : 0)));
  return { events, xgH, xgA };
}

export function userFixture(save: Save) {
  return save.fixtures
    .filter((f) => !f.played && (f.home === save.clubId || f.away === save.clubId))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}

export function tableOf(save: Save, league: LeagueId) {
  const rows = save.clubs
    .filter((c) => c.league === league)
    .map((c) => ({ club: c, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }));
  const map = new Map(rows.map((r) => [r.club.id, r]));
  for (const f of save.fixtures) {
    if ((f.comp ?? "league") !== "league") continue;
    if (f.league !== league || !f.played || f.hg == null || f.ag == null) continue;
    const h = map.get(f.home);
    const a = map.get(f.away);
    if (!h || !a) continue;
    h.p++;
    a.p++;
    h.gf += f.hg;
    h.ga += f.ag;
    a.gf += f.ag;
    a.ga += f.hg;
    if (f.hg > f.ag) {
      h.w++;
      a.l++;
      h.pts += 3;
    } else if (f.hg < f.ag) {
      a.w++;
      h.l++;
      a.pts += 3;
    } else {
      h.d++;
      a.d++;
      h.pts++;
      a.pts++;
    }
  }
  rows.sort((a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga) || b.gf - a.gf || a.club.name.localeCompare(b.club.name, "ru"));
  return rows;
}

export function rowZone(league: LeagueId, index: number, total: number) {
  const place = index + 1;
  if (league === "rpl") {
    if (place <= 2) return "ucl";
    if (place === 3) return "qual";
    if (place === 4) return "uel";
    if (place === 5 || place === 6) return "uecl";
    if (total >= 8 && place >= total - 1) return "down";
    if (total >= 8 && place > total - 4) return "po";
    return "";
  }
  if (league === "fnl" || league === "fnl2" || league === "fnl3") {
    if (place <= 2) return "up";
    if (league === "fnl" && (place === 3 || place === 4)) return "po";
    if (place === 5) return "pyr";
    if (league !== "fnl3" && total >= 8 && place > total - 4) return "down";
    return "";
  }
  return "";
}

export function placeOf(save: Save) {
  const club = clubOf(save, save.clubId);
  const table = tableOf(save, club.league);
  return { place: table.findIndex((r) => r.club.id === save.clubId) + 1, table, club };
}

export function formOf(save: Save, clubId: string) {
  const games = save.fixtures
    .filter((f) => f.played && (f.home === clubId || f.away === clubId) && f.hg != null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
    .reverse();
  return games.map((f) => {
    const home = f.home === clubId;
    const gf = home ? f.hg! : f.ag!;
    const ga = home ? f.ag! : f.hg!;
    return gf > ga ? "В" : gf < ga ? "П" : "Н";
  });
}

export function wageBill(save: Save, clubId = save.clubId) {
  return playersOf(save, clubId).reduce((s, p) => s + p.wage, 0);
}

export function applyMatchLoad(save: Save, ids: string[], goals: string[], cards: string[], ratings: Record<string, number>) {
  const used = new Set(ids);
  for (const p of save.players) {
    if (!used.has(p.id)) continue;
    p.apps++;
    p.ratingSum += ratings[p.id] ?? 6.6;
    if (goals.includes(p.id)) p.goals++;
  }
  for (const id of cards) {
    const p = playerOf(save, id);
    if (!p) continue;
    p.yellow++;
    if (p.yellow >= 4) {
      p.yellow = 0;
      p.ban = 1;
    }
  }
}

export function remapXi(save: Save, ids: string[], formation: Tactics["formation"]) {
  const slots = FORMATIONS[formation];
  const pool = ids.map((id) => playerOf(save, id)).filter((p): p is Player => !!p);
  const used = new Set<string>();
  return slots.map((slot) => {
    let best: Player | null = null;
    let score = -1;
    for (const p of pool) {
      if (used.has(p.id)) continue;
      const s = roleScore(p, slot.pos);
      if (s > score) {
        score = s;
        best = p;
      }
    }
    if (best) used.add(best.id);
    return best?.id ?? "";
  });
}

export function growFromMatch(save: Save, id: string, rating: number, minutes: number, fatigue = true) {
  const p = playerOf(save, id);
  if (!p || !p.ovr) return 0;
  const played = minutes >= 20;
  const room = p.growth;
  const cap = p.age <= 21 ? 4 : p.age <= 24 ? 3 : p.age <= 28 ? 2 : 1;
  const underCeiling = p.age >= 30 ? room < 1 : p.ovr < p.pot;
  let delta = 0;
  if (played && p.age < 33 && room < cap && underCeiling) {
    if (p.age <= 23 && rating >= 6.9 && Math.random() < 0.28) delta = 1;
    else if (p.age <= 28 && rating >= 7.6 && Math.random() < 0.12) delta = 1;
    else if (p.age >= 30 && rating >= 8.2 && room < 1) delta = 1;
  }
  if (p.age >= 32 && minutes >= 60 && rating < 6.3 && Math.random() < 0.22) delta = -1;
  if (delta > 0) {
    p.ovr += 1;
    p.growth += 1;
    if (p.ovr > p.pot) p.pot = p.ovr;
  } else if (delta < 0) {
    p.ovr = Math.max(44, p.ovr - 1);
  }
  const club = save.clubs.find((c) => c.id === p.clubId);
  if (club) p.value = priceRub(p.ovr, p.age, club.league, club.rep);
  if (fatigue) {
    const drop = Math.round(minutes / 11 + (p.age >= 34 ? 8 : p.age >= 30 ? 5 : 0) + (p.sta < 11 ? 3 : 0));
    p.cond = clamp(Math.round(p.cond - drop), 28, 100);
  }
  p.sharp = clamp(Math.round(p.sharp + (minutes >= 25 ? 3 : -2)), 20, 100);
  return delta;
}

export function moraleSwing(save: Save, clubId: string, gf: number, ga: number, home: boolean) {
  const delta = gf > ga ? 6 : gf === ga ? 1 : -5;
  const oppRep = 0;
  void oppRep;
  void home;
  for (const p of playersOf(save, clubId)) p.mor = clamp(p.mor + delta + (p.men - 12), 20, 99);
  if (clubId === save.clubId) {
    const expect = clubOf(save, clubId).rep;
    const swing = gf > ga ? 5 : gf === ga ? 0 : -6;
    const weight = expect > 80 && gf <= ga ? -3 : expect < 62 && gf > ga ? 3 : 0;
    save.confidence = clamp(save.confidence + swing + weight, 1, 99);
  }
}

function restClub(save: Save, clubId: string, days: number) {
  for (const p of playersOf(save, clubId)) {
    if (p.injured > 0) p.injured = Math.max(0, p.injured - days);
    else p.cond = clamp(Math.round(p.cond + (save.focus === "rest" && clubId === save.clubId ? 8 : 4) * Math.min(1, days / 3)), 28, 100);
    if (save.focus !== "rest" || clubId !== save.clubId) p.sharp = clamp(p.sharp - (days > 10 ? 4 : 0), 30, 100);
    if (p.ban > 0 && days >= 6) p.ban = Math.max(0, p.ban - 1);
  }
}

export function train(save: Save, focus: Save["focus"]) {
  save.focus = focus;
  const note =
    focus === "attack"
      ? "Установка на последний пас и удар. Острота форвардов выше, ноги гудят."
      : focus === "defence"
        ? "Оборона в малых составах. Линия собраннее, атаки чуть тупее."
        : focus === "set"
          ? "Стандарты: розыгрыш корнера и стенка. Шанс со стандарта выше обычного."
          : focus === "physical"
            ? "Объём. Скорость и борьба прибавят, кондиции просядут."
            : "Восстановление. Кондиции вверх, острота чуть спадёт.";
  for (const p of playersOf(save, save.clubId)) {
    if (p.injured > 0) continue;
    if (focus === "rest") {
      p.cond = clamp(Math.round(p.cond + 12), 0, 100);
      p.sharp = clamp(p.sharp - 2, 0, 100);
    } else if (focus === "physical") {
      p.cond = clamp(p.cond - 5, 36, 100);
      p.sharp = clamp(p.sharp + 4, 0, 100);
      if (p.age <= 23 && p.ovr < p.pot && p.growth < 4 && Math.random() < 0.06) {
        p.sta = clamp(p.sta + 1, 1, 20);
        p.ovr += 1;
        p.growth += 1;
      }
    } else if (focus === "attack" && (p.pos === "ST" || p.pos === "AM" || p.pos === "MR" || p.pos === "ML")) {
      p.sharp = clamp(p.sharp + 8, 0, 100);
      p.cond = clamp(p.cond - 3, 36, 100);
    } else if (focus === "defence" && (p.pos === "DC" || p.pos === "GK" || p.pos === "DM" || p.pos === "DR" || p.pos === "DL")) {
      p.sharp = clamp(p.sharp + 8, 0, 100);
      p.cond = clamp(p.cond - 3, 36, 100);
    } else if (focus === "set") {
      p.sharp = clamp(p.sharp + 4, 0, 100);
    }
  }
  pushMsg(save, "Тренерский штаб", "Тренировка проведена", note);
}

export function pushMsg(save: Save, from: string, title: string, body: string, extra?: Partial<(typeof save.inbox)[0]>) {
  save.inbox.unshift({ id: "msg-" + hash(save.date + title + body + save.inbox.length), date: save.date, from, title, body, read: false, ...extra });
  save.inbox = save.inbox.slice(0, 40);
}

export function simFixture(save: Save, f: Fixture) {
  if (f.played) return;
  const [hg, ag] = quickScore(save, f.home, f.away, f.id);
  f.hg = hg;
  f.ag = ag;
  f.played = true;
  moraleSwing(save, f.home, hg, ag, true);
  moraleSwing(save, f.away, ag, hg, false);
  noteEuroResult(save, f);
}

export function flushOthers(save: Save, date: string) {
  for (const f of save.fixtures) {
    if (f.played || f.date !== date) continue;
    if (f.home === save.clubId || f.away === save.clubId) continue;
    simFixture(save, f);
  }
}

export function advanceTo(save: Save, target: string, autoUser: boolean) {
  let guard = 0;
  while (save.date < target && guard++ < 400) {
    save.date = addDays(save.date, 1);
    if (save.date.endsWith("-01")) monthly(save);
    if (weekday(save.date) === 1) {
      const bill = wageBill(save) / 1000;
      save.balance = Math.round((save.balance - bill) * 10) / 10;
      if (save.balance < -30) save.confidence = clamp(save.confidence - 2, 1, 99);
    }
    if (weekday(save.date) === 6) {
      for (const p of save.players) if (p.ban > 0) p.ban = Math.max(0, p.ban - 1);
    }
    for (const c of save.clubs) restClub(save, c.id, 1);
    for (const p of playersOf(save, save.clubId)) {
      if (p.injured <= 0) p.cond = clamp(Math.round(p.cond + (save.focus === "rest" ? 1 : 0)), 28, 100);
    }
    for (const f of save.fixtures) {
      if (f.played || f.date !== save.date) continue;
      const user = f.home === save.clubId || f.away === save.clubId;
      if (user && !autoUser && save.date === target) continue;
      if (user && !autoUser) continue;
      if (user) {
        const [hg, ag] = quickScore(save, f.home, f.away, f.id);
        f.hg = hg;
        f.ag = ag;
        f.played = true;
        const weHome = f.home === save.clubId;
        const gf = weHome ? hg : ag;
        const ga = weHome ? ag : hg;
        moraleSwing(save, save.clubId, gf, ga, weHome);
        noteEuroResult(save, f);
        save.played++;
        save.log.unshift(`${formatShort(f.date)}  ${gf}:${ga} ${weHome ? "д" : "г"}`);
        pushMsg(save, "Помощник", `Матч сыгран без вас: ${gf}:${ga}`, "Вы ушли с матча в календарь. Состав отработал по установке.");
        checkSack(save);
      } else simFixture(save, f);
    }
    maybeRumors(save);
    progressCompetitions(save);
  }
}

function formatShort(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y!.slice(2)}`;
}

function monthly(save: Save) {
  const club = clubOf(save, save.clubId);
  const sponsor = Math.round(club.rep * 0.55);
  save.balance = Math.round((save.balance + sponsor) * 10) / 10;
  for (const p of save.players) {
    if (p.age <= 23 && p.sharp > 60 && Math.random() < 0.12) {
      const key = p.pos === "GK" ? "gk" : p.pos === "ST" ? "sho" : p.pos === "DC" ? "def" : "pas";
      p[key] = clamp(p[key] + 1, 1, 20);
    } else if (p.age >= 33 && Math.random() < 0.1) {
      p.pac = clamp(p.pac - 1, 1, 20);
    }
  }
  if (!isWinter(save.date, save.season)) {
    pushMsg(save, "Бухгалтерия", "Спонсорский транш", `На счёт пришло ${money(sponsor)}. Зарплаты списываются по понедельникам.`);
  }
}

function maybeRumors(save: Save) {
  if (!windowOpen(save.date, save.season)) return;
  if (hash(save.date + save.clubId) % 17 !== 0) return;
  const mine = playersOf(save, save.clubId).filter((p) => p.injured <= 0 && overall(p) >= 12);
  if (!mine.length) return;
  const p = mine[hash(save.date) % mine.length]!;
  const buyers = save.clubs.filter((c) => c.id !== save.clubId && c.rep >= clubOf(save, save.clubId).rep - 8);
  if (!buyers.length) return;
  const buyer = buyers[hash(save.date + p.id) % buyers.length]!;
  const fee = Math.max(1, Math.round(p.value * (0.85 + (hash(p.id) % 30) / 100)));
  pushMsg(
    save,
    buyer.name,
    `Запрос по ${p.last}`,
    `${buyer.name} предлагает ${money(fee)} за ${playerName(p)}. Контракт игрока — ${p.contract} г., зарплата ${wageText(p.wage)}.`,
    { offer: { playerId: p.id, fee, wage: p.wage, clubId: buyer.id } },
  );
}

export function acceptOffer(save: Save, msgId: string) {
  const msg = save.inbox.find((m) => m.id === msgId);
  if (!msg?.offer) return "Предложения нет";
  const p = playerOf(save, msg.offer.playerId);
  if (!p || p.clubId !== save.clubId) return "Игрок уже не ваш";
  p.clubId = msg.offer.clubId;
  p.listed = false;
  save.budget += msg.offer.fee;
  save.tactics.slots = save.tactics.slots.map((id) => (id === p.id ? "" : id));
  msg.offer = undefined;
  msg.read = true;
  msg.body += " Вы согласились.";
  refillIfThin(save, save.clubId);
  return "";
}

export function rejectOffer(save: Save, msgId: string) {
  const msg = save.inbox.find((m) => m.id === msgId);
  if (!msg?.offer) return;
  msg.body += " Вы отказали.";
  msg.offer = undefined;
  msg.read = true;
}

export function bid(save: Save, playerId: string, fee: number) {
  const p = playerOf(save, playerId);
  if (!p) return "Игрок не найден";
  if (p.clubId === save.clubId) return "Это ваш игрок";
  const external = p.clubId.startsWith("pool:");
  if (!windowOpen(save.date, save.season) && p.clubId !== "free") return "Окно закрыто";
  const seller = p.clubId === "free" || external ? undefined : save.clubs.find((c) => c.id === p.clubId);
  if (!seller && p.clubId !== "free" && !external) return "Клуб не найден";
  const me = clubOf(save, save.clubId);
  if (fee > save.budget && p.clubId !== "free") return "Не хватает трансферного бюджета";
  const bill = wageBill(save);
  const sellerRep = seller?.rep ?? (external ? 76 : 40);
  const askWage = Math.round(p.wage * (me.rep < sellerRep ? 1.25 : 1.05));
  if (bill + askWage > wageCap(me.rep)) return "Не влезает в зарплатный потолок";
  const r = rng(hash(save.date + playerId + String(fee)));
  const ratio = p.clubId === "free" ? 1.4 : fee / Math.max(0.4, p.value);
  let chance = 0.15 + (ratio - 0.75) * 0.7 + (me.rep - sellerRep) * 0.008;
  if (p.age >= 32) chance += 0.1;
  if (p.contract <= 1 && p.clubId !== "free") chance += 0.12;
  if (p.mor < 55) chance += 0.08;
  chance = clamp(chance, 0.05, 0.92);
  if (p.clubId !== "free" && fee < p.value * 0.62) chance = Math.min(chance, 0.18);
  const sellerName = seller?.name ?? (external ? p.nat : "Агент");
  if (r() > chance) {
    pushMsg(save, sellerName, `${p.last} остаётся`, `${playerName(p)} отклонил переход. Нужны деньги ближе к ${dollarText(p.value)} и внятная зарплата.`);
    return "Отказ";
  }
  const from = p.clubId;
  if (from !== "free") {
    save.budget -= fee;
    if (seller) seller.budget += Math.round(fee * 0.8);
  } else save.balance = Math.round((save.balance - fee) * 10) / 10;
  p.clubId = save.clubId;
  p.wage = askWage;
  p.contract = p.age >= 31 ? 2 : 3;
  p.mor = clamp(p.mor + 8, 0, 99);
  p.listed = false;
  p.renewed = false;
  if (from !== "free" && !external) refillIfThin(save, from);
  pushMsg(save, "Спортивный директор", `${p.last} — наш`, `${playerName(p)} подписал контракт. Платёж ${dollarText(fee)}. Зарплата ${wageText(p.wage)}.`);
  return "";
}

function refillIfThin(save: Save, clubId: string) {
  const have = playersOf(save, clubId);
  if (have.length >= 18) return;
  const club = clubOf(save, clubId);
  const posCycle: Pos[] = ["MC", "DC", "ST", "GK", "DR"];
  const missing = posCycle[have.length % posCycle.length]!;
  const r = rng(hash(clubId + save.date + String(have.length)));
  const p = makePlayer(club, 30 + have.length, missing, r);
  p.age = 18 + Math.floor(r() * 3);
  p.value = Math.max(0.4, Math.round(p.value * 0.45));
  p.wage = Math.max(15, Math.round(p.wage * 0.5));
  save.players.push(p);
}

function interestedClubs(save: Save) {
  const club = clubOf(save, save.clubId);
  const home = save.clubs
    .filter((c) => c.id !== club.id && (c.league === club.league || c.league === "fnl" || c.league === "fnl2" || c.league === "fnl3" || c.league === "media"))
    .sort((a, b) => Math.abs(a.rep - club.rep + 6) - Math.abs(b.rep - club.rep + 6))
    .slice(0, 3);
  const abroadId = FOREIGN_LEAGUES[hash(save.manager + save.season) % FOREIGN_LEAGUES.length]!;
  materializeLeague(save, abroadId);
  const abroad = save.clubs.filter((c) => c.league === abroadId).sort((a, b) => a.rep - b.rep)[0];
  const ids = [...home.map((c) => c.id), ...(abroad ? [abroad.id] : [])];
  return [...new Set(ids)].slice(0, 4).map((clubId) => ({ clubId }));
}

export function checkSack(save: Save) {
  if (save.sacked) return;
  if (save.played >= 8 && save.confidence <= 16) dismiss(save, "Серия результатов не устроила клуб.");
}

function dismiss(save: Save, why: string) {
  save.sacked = true;
  save.offers = interestedClubs(save);
  pushMsg(save, "Совет директоров", "Вы освобождены от должности", `${why} Доверие: ${save.confidence}. Ниже клубы, которым вы интересны — в том числе за рубежом.`);
}

export function takeJob(save: Save, clubId: string) {
  const known = save.clubs.find((c) => c.id === clubId);
  if (known && (FOREIGN_LEAGUES as string[]).includes(known.league)) materializeLeague(save, known.league);
  save.clubId = clubId;
  save.sacked = false;
  save.confidence = 62;
  save.played = 0;
  save.badSeasons = 0;
  save.tactics = { ...save.tactics, slots: Array(11).fill("") };
  const club = clubOf(save, clubId);
  save.budget = club.budget;
  save.balance = Math.round(club.budget * 0.3);
  save.offers = [];
  save.kit = {
    home: { design: hash(clubId) % 36, primary: club.color, secondary: club.color2, socks: club.color },
    away: { design: (hash(clubId) + 7) % 36, primary: club.color2, secondary: club.color, socks: club.color2 },
  };
  pushMsg(save, club.name, "Контракт подписан", `Вы возглавили «${club.name}». Задача: ${taskLine(save)}.`);
}

export function renewContract(save: Save, playerId: string, years: number, wage: number, clause: string) {
  const p = playerOf(save, playerId);
  if (!p || p.clubId !== save.clubId) return "Это не ваш игрок";
  if (p.renewed) return "Контракт уже продлён в этом сезоне. Второй раз нельзя.";
  const cost = Math.max(1, Math.round(wage * years * 0.04));
  if (save.budget < cost) return "Не хватает трансферного бюджета на условия";
  if (wage * playersOf(save, save.clubId).reduce((s, x) => s + (x.id === p.id ? 0 : x.wage), 0) + wage > wageCap(clubOf(save, save.clubId).rep) * 1.05 && wage > p.wage) {
    return "Зарплата не влезает в потолок";
  }
  save.budget = Math.round((save.budget - cost) * 10) / 10;
  p.contract = years;
  p.wage = wage;
  p.clause = clause;
  p.renewed = true;
  p.mor = clamp(p.mor + 6, 1, 99);
  pushMsg(save, "Юрист клуба", `${p.last} продлил контракт`, `${playerName(p)} на ${years} г., ${wageText(wage)}. Условие: ${clause}. Из бюджета ушло ${money(cost)}.`);
  return "";
}

function taskLine(save: Save) {
  const club = clubOf(save, save.clubId);
  const mates = save.clubs.filter((c) => c.league === club.league).sort((a, b) => b.rep - a.rep);
  const place = mates.findIndex((c) => c.id === club.id) + 1;
  if (place <= 2) return "верх таблицы";
  if (place > mates.length - 3) return "спасение";
  return "середина таблицы";
}

export function finishSeason(save: Save) {
  for (let pass = 0; pass < 6; pass++) {
    for (const f of save.fixtures) {
      if (f.played) continue;
      if (f.home === save.clubId || f.away === save.clubId) continue;
      simFixture(save, f);
    }
    progressCompetitions(save);
  }
  if (save.phase !== "playoff") {
    const ties = playoffCard(save);
    const mine = ties.filter((f) => f.home === save.clubId || f.away === save.clubId);
    const rest = ties.filter((f) => f.home !== save.clubId && f.away !== save.clubId);
    rest.forEach((f) => simFixture(save, f));
    save.fixtures.push(...ties);
    if (mine.length) {
      save.phase = "playoff";
      pushMsg(save, "Стыки", "Назначена квалификация пирамиды", "Пятое место ФНЛ-3, ФНЛ-2, Первой лиги и РПЛ играет между собой. Кто возьмёт большинство очков, поднимается на лигу выше: из ФНЛ-3 в ФНЛ-2, из Первой лиги в РПЛ. Четыре последних места вылетают, пятое снизу уже нет. Из ФНЛ-3 не вылетают.");
      return;
    }
  }
  const meBefore = clubOf(save, save.clubId);
  const tableBefore = tableOf(save, meBefore.league);
  const row = tableBefore.findIndex((r) => r.club.id === meBefore.id) + 1;
  const n = tableBefore.length;
  const moves: string[] = [];
  payPrizes(save, moves);
  stampEuro(save);
  moves.push(...applyPyramid(save));
  for (const p of [...save.players]) {
    p.goals = 0;
    p.assists = 0;
    p.apps = 0;
    p.ratingSum = 0;
    p.yellow = 0;
    p.ban = 0;
    p.growth = 0;
    p.age += 1;
    if (p.age >= 33 && p.ovr) p.ovr = Math.max(46, p.ovr - 1);
    else if (p.age >= 31 && p.ovr && Math.random() < 0.4) p.ovr = Math.max(48, p.ovr - 1);
    const club = save.clubs.find((c) => c.id === p.clubId);
    if (club && p.ovr) p.value = priceRub(p.ovr, p.age, club.league, club.rep);
    p.contract = Math.round((p.contract - 1) * 10) / 10;
    p.renewed = false;
    if (p.contract <= 0 && p.clubId !== "free") {
      const old = p.clubId;
      p.clubId = "free";
      p.contract = 0;
      if (old === save.clubId) moves.push(`${playerName(p)} ушёл свободным агентом`);
    }
  }
  for (const c of save.clubs) if (c.league !== "euro") refillIfThin(save, c.id);
  const me = clubOf(save, save.clubId);
  const badLeague = meBefore.league === "fnl3" ? row > Math.ceil(n * 0.55) || save.confidence < 36 : row > Math.max(1, n - 4);
  if (badLeague) save.badSeasons = (save.badSeasons ?? 0) + 1;
  else save.badSeasons = 0;
  if (!save.sacked && meBefore.league === "fnl3" && (save.badSeasons >= 2 || (badLeague && save.confidence < 40))) {
    dismiss(save, save.badSeasons >= 2 ? "Два слабых сезона в ФНЛ-3. Из низшей лиги не вылетают, но клуб расстаётся с тренером." : "Слабый сезон в ФНЛ-3. Место в лиге сохраняется, работа — нет.");
  } else if (!save.sacked && save.badSeasons >= 2 && save.confidence < 42) {
    dismiss(save, "Два сезона подряд в зоне вылета.");
  }
  save.season += 1;
  save.date = `${save.season}-07-11`;
  save.phase = "season";
  save.fixtures = rebuild(save);
  save.focus = null;
  if (!save.sacked) save.confidence = clamp(save.confidence + 4, 1, 99);
  save.budget = Math.round(me.budget * 0.35 + save.budget * 0.7);
  pushMsg(save, "Лига", `Сезон ${save.season - 1}/${save.season} закрыт`, `${moves.slice(0, 8).join(". ") || "Сетка лиг почти не изменилась."} Новый чемпионат — ${save.season}/${String(save.season + 1).slice(2)}. Вы в «${me.name}», ${leagueMeta(me.league).short}.`);
}

function placeId(save: Save, league: LeagueId, index: number) {
  return tableOf(save, league)[index]?.club.id;
}

function playoffCard(save: Save): Fixture[] {
  const out: Fixture[] = [];
  const pair = (a?: string, b?: string, tie?: string, label?: string) => {
    if (!a || !b) return;
    const d1 = `${save.season + 1}-05-20`;
    const d2 = `${save.season + 1}-05-27`;
    out.push(
      { id: `po-${save.season}-${tie}-1`, league: "rpl", round: 1, date: d1, home: a, away: b, played: false, comp: "playoff", label, tie, leg: 1 },
      { id: `po-${save.season}-${tie}-2`, league: "rpl", round: 2, date: d2, home: b, away: a, played: false, comp: "playoff", label: `${label}, ответный`, tie, leg: 2 },
    );
  };
  pair(placeId(save, "rpl", 12), placeId(save, "fnl", 3), "tie-a", "Стыки РПЛ · 13-е против 4-го Первой лиги");
  pair(placeId(save, "rpl", 13), placeId(save, "fnl", 2), "tie-b", "Стыки РПЛ · 14-е против 3-го Первой лиги");
  const pyr = [placeId(save, "fnl3", 4), placeId(save, "fnl2", 4), placeId(save, "fnl", 4), placeId(save, "rpl", 4)].filter((id): id is string => !!id);
  const base = save.date > `${save.season + 1}-05-18` ? save.date : `${save.season + 1}-05-20`;
  const dates = [0, 4, 8, 11, 15, 18].map((n) => addDays(base, n));
  let k = 0;
  for (let i = 0; i < pyr.length; i++) {
    for (let j = i + 1; j < pyr.length; j++) {
      out.push({
        id: `pyr-${save.season}-${i}${j}`,
        league: "fnl3",
        round: k + 1,
        date: dates[k % dates.length]!,
        home: pyr[i]!,
        away: pyr[j]!,
        played: false,
        comp: "pyramid",
        label: "Квалификация пирамиды · 5-е места всех лиг",
      });
      k++;
    }
  }
  return out;
}

function aggWinner(save: Save, tie: string) {
  const legs = save.fixtures.filter((f) => f.tie === tie && f.played && f.hg != null);
  if (legs.length < 2) return null;
  const a = legs[0]!.leg === 2 ? legs[0]!.away : legs[0]!.home;
  const b = legs[0]!.leg === 2 ? legs[0]!.home : legs[0]!.away;
  let ag = 0;
  let bg = 0;
  for (const f of legs) {
    const homeA = f.home === a;
    ag += homeA ? f.hg! : f.ag!;
    bg += homeA ? f.ag! : f.hg!;
  }
  if (ag === bg) return hash(tie + save.season) % 2 ? b : a;
  return ag > bg ? a : b;
}

function applyPyramid(save: Save) {
  const moves: string[] = [];
  const move = (id: string | undefined, league: LeagueId, note: string) => {
    if (!id) return;
    const c = clubOf(save, id);
    if (!c || c.league === league) return;
    const up = ["fnl3", "fnl2", "fnl", "rpl"].indexOf(league) > ["fnl3", "fnl2", "fnl", "rpl"].indexOf(c.league);
    c.league = league;
    c.rep = clamp(c.rep + (up ? 3 : -3), 28, 95);
    c.budget = Math.round(c.budget * (up ? 1.4 : 0.72));
    moves.push(`${c.name} — ${note}`);
  };
  const rpl = tableOf(save, "rpl").map((r) => r.club.id);
  const fnl = tableOf(save, "fnl").map((r) => r.club.id);
  const fnl2 = tableOf(save, "fnl2").map((r) => r.club.id);
  const fnl3 = tableOf(save, "fnl3").map((r) => r.club.id);
  move(fnl[0], "rpl", "прямой выход в РПЛ");
  move(fnl[1], "rpl", "прямой выход в РПЛ");
  move(rpl[14], "fnl", "вылет в Первую лигу");
  move(rpl[15], "fnl", "вылет в Первую лигу");
  const winA = aggWinner(save, "tie-a");
  const loseA = winA === rpl[12] ? fnl[3] : rpl[12];
  if (winA === fnl[3]) move(fnl[3], "rpl", "стыки с РПЛ");
  if (loseA === rpl[12]) move(rpl[12], "fnl", "стыки, вылет");
  const winB = aggWinner(save, "tie-b");
  const loseB = winB === rpl[13] ? fnl[2] : rpl[13];
  if (winB === fnl[2]) move(fnl[2], "rpl", "стыки с РПЛ");
  if (loseB === rpl[13]) move(rpl[13], "fnl", "стыки, вылет");
  move(fnl2[0], "fnl", "прямой выход в Первую лигу");
  move(fnl2[1], "fnl", "прямой выход в Первую лигу");
  for (const id of fnl.slice(-4)) move(id, "fnl2", "вылет в ФНЛ-2");
  move(fnl3[0], "fnl2", "прямой выход в ФНЛ-2");
  move(fnl3[1], "fnl2", "прямой выход в ФНЛ-2");
  for (const id of fnl2.slice(-4)) move(id, "fnl3", "вылет в ФНЛ-3");
  const pyrGames = save.fixtures.filter((f) => f.comp === "pyramid" && f.played && f.hg != null);
  const ids = new Set<string>();
  pyrGames.forEach((f) => {
    ids.add(f.home);
    ids.add(f.away);
  });
  const rows = [...ids].map((id) => ({ id, pts: 0 }));
  for (const f of pyrGames) {
    if (f.hg! > f.ag!) rows.find((r) => r.id === f.home)!.pts += 3;
    else if (f.hg! < f.ag!) rows.find((r) => r.id === f.away)!.pts += 3;
    else rows.forEach((r) => {
      if (r.id === f.home || r.id === f.away) r.pts++;
    });
  }
  rows.sort((a, b) => b.pts - a.pts || hash(b.id + save.season) - hash(a.id));
  const steps: LeagueId[] = ["fnl3", "fnl2", "fnl", "rpl"];
  const upOne = (league: LeagueId): LeagueId => steps[Math.min(steps.length - 1, steps.indexOf(league) + 1)] ?? league;
  const champ = rows[0];
  const second = rows[1];
  if (champ && (!second || champ.pts > second.pts)) {
    const cc = clubOf(save, champ.id);
    if (cc && cc.league !== "rpl") move(champ.id, upOne(cc.league), "квалификация пирамиды, большинство побед");
  }
  return moves;
}

function payPrizes(save: Save, moves: string[]) {
  const me = clubOf(save, save.clubId);
  const table = tableOf(save, me.league);
  const place = table.findIndex((r) => r.club.id === me.id) + 1;
  let purse = leaguePrize(place, me.league);
  if (place === 1) save.log.unshift(`HONOR:${save.season}|${leagueMeta(me.league).short} — ${me.name}`);
  const cup = cupWinner(save);
  if (cup === save.clubId) {
    purse += me.league === "media" || me.league === "amateur" ? 80 : 500;
    save.log.unshift(`HONOR:${save.season}|Кубок России — ${me.name}`);
    moves.push("Кубок России ваш");
  }
  if (save.euro?.stage === "done" && save.euro.comp) {
    purse += save.euro.comp === "ucl" ? 1200 : save.euro.comp === "uel" ? 620 : 280;
    const name = save.euro.comp === "ucl" ? "Лига чемпионов" : save.euro.comp === "uel" ? "Лига Европы" : "Лига конференций";
    save.log.unshift(`HONOR:${save.season}|${name} — ${me.name}`);
  } else if ((save.euro?.pts ?? 0) >= 4) purse += 90;
  save.budget = Math.round(save.budget + purse);
  save.balance = Math.round(save.balance + purse * 0.35);
  if (purse > 0) moves.push(`призовые ${money(purse)}`);
}

function stampEuro(save: Save) {
  for (const c of save.clubs) c.euro = null;
  const rpl = tableOf(save, "rpl");
  const tickets = ["ucl", "ucl", "uclq", "uel", "uecl", "uecl"] as const;
  tickets.forEach((t, i) => {
    const club = rpl[i]?.club;
    if (club) club.euro = t;
  });
}

function rebuild(save: Save) {
  save.fixtures = makeFixtures(save.clubs, save.season);
  seedCompetitions(save, true);
  return save.fixtures;
}

export function report(save: Save, oppId: string) {
  const oppT = clubTactics(oppId);
  const mine = save.tactics.slots.some(Boolean) ? save.tactics.slots : autoXi(save, save.clubId, save.tactics.formation);
  const theirs = autoXi(save, oppId, oppT.formation);
  const me = xiStrength(save, mine, save.tactics.formation, save.tactics);
  const them = xiStrength(save, theirs, oppT.formation, oppT);
  const opp = clubOf(save, oppId);
  const danger = playersOf(save, oppId).filter((p) => p.pos !== "GK").sort((a, b) => overall(b) - overall(a))[0];
  const myOvr = squadOvr(save, mine);
  const theirOvr = squadOvr(save, theirs);
  const styleName = styleById(oppT.style).name;
  let text = `Стиль «${opp.name}» — ${styleName}. Составы ${myOvr} и ${theirOvr}.`;
  if (theirOvr > myOvr + 3) text = `«${opp.name}» сильнее (${theirOvr} против ${myOvr}), стиль — ${styleName}. Победа редкая, ничья ближе.`;
  else if (myOvr > theirOvr + 6) text = `Ваш состав ${myOvr} заметно выше их ${theirOvr}. Стиль соперника — ${styleName}, он должен уступать.`;
  else if (myOvr > theirOvr + 2) text = `Небольшой перевес: ${myOvr} против ${theirOvr}. На мировом классе этого мало. У них ${styleName}.`;
  const pair = `${save.clubId}-${oppId}`;
  const derby = DERBIES.has(pair);
  return { text, danger, derby, me, them, opp, myOvr, theirOvr, styleName };
}

export function nextUserDate(save: Save) {
  return userFixture(save)?.date ?? save.date;
}

export function seasonDone(save: Save) {
  const league = clubOf(save, save.clubId).league;
  const leagueLeft = save.fixtures.some((f) => (f.comp ?? "league") === "league" && f.league === league && !f.played);
  const mine = save.fixtures.some((f) => !f.played && (f.home === save.clubId || f.away === save.clubId));
  const cupOpen = save.cup && save.cup.stage !== "done" && !save.cup.userOut && save.fixtures.some((f) => f.comp === "cup" && (f.home === save.clubId || f.away === save.clubId));
  const euroOpen = !!save.euro?.comp && save.euro.stage !== "done" && save.euro.stage !== "out";
  return !leagueLeft && !mine && !cupOpen && !euroOpen;
}

export { weekday, windowOpen, isWinter };
