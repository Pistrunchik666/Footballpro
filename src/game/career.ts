import { CLUBS, clubById } from "@/game/clubs";
import { mulberry32 } from "@/game/layout";
import type { CareerState, Club, Fixture, PendingMatch, SeasonNote } from "@/game/types";

export function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function newCareer(clubId: string): CareerState {
  return {
    season: 1,
    clubId,
    fixtures: makeFixtures(
      CLUBS.map((c) => c.id),
      1,
    ),
    pending: null,
    history: [],
    careerGoals: 0,
    seasonFkGoals: 0,
    reputation: 0,
  };
}

export function makeFixtures(clubIds: string[], season: number): Fixture[] {
  const list = [...clubIds];
  const rounds: Array<Array<[string, string]>> = [];
  for (let r = 0; r < list.length - 1; r++) {
    const pairs: Array<[string, string]> = [];
    for (let i = 0; i < list.length / 2; i++) {
      const a = list[i]!;
      const b = list[list.length - 1 - i]!;
      if ((r + i) % 2 === 0) pairs.push([a, b]);
      else pairs.push([b, a]);
    }
    rounds.push(pairs);
    const fixed = list[0]!;
    const rest = list.slice(1);
    const last = rest.pop()!;
    rest.unshift(last);
    list.splice(0, list.length, fixed, ...rest);
  }
  const fixtures: Fixture[] = [];
  const push = (pairs: Array<[string, string]>, round: number, swap: boolean) => {
    for (const [h, a] of pairs) {
      const homeId = swap ? a : h;
      const awayId = swap ? h : a;
      fixtures.push({
        id: `${season}-${round}-${homeId}-${awayId}`,
        round,
        homeId,
        awayId,
        seed: hashSeed(`${season}:${round}:${homeId}:${awayId}`),
        played: false,
        homeGoals: 0,
        awayGoals: 0,
        minute: 0,
        added: 0,
        fkGoal: false,
        userPlayed: false,
      });
    }
  };
  rounds.forEach((pairs, i) => push(pairs, i + 1, false));
  rounds.forEach((pairs, i) => push(pairs, i + 1 + rounds.length, true));
  return fixtures;
}

export function nextUserFixture(career: CareerState): Fixture | null {
  return (
    career.fixtures.find(
      (fx) => !fx.played && (fx.homeId === career.clubId || fx.awayId === career.clubId),
    ) ?? null
  );
}

export function prepareRound(career: CareerState, round: number): CareerState {
  const fixtures = career.fixtures.map((fx) => {
    if (fx.played || fx.round !== round) return fx;
    if (fx.homeId === career.clubId || fx.awayId === career.clubId) return fx;
    const score = simulateScore(fx, career.season, 1);
    return { ...fx, ...score, played: true, userPlayed: false, fkGoal: false };
  });
  return { ...career, fixtures };
}

export function beginPending(career: CareerState, fx: Fixture): Omit<PendingMatch, "youKit" | "oppKit" | "youColor" | "oppColor" | "youShorts" | "oppShorts" | "gkColor"> {
  const rng = mulberry32(fx.seed);
  const minute = 8 + Math.floor(rng() * 78);
  const added = 1 + Math.floor(rng() * 4);
  const frac = minute / 96;
  const x = expected(career, fx);
  return {
    fixtureId: fx.id,
    preHome: Math.min(5, poisson(x.home * frac, rng)),
    preAway: Math.min(5, poisson(x.away * frac, rng)),
    minute,
    added,
  };
}

export type KickSummary = {
  home: number;
  away: number;
  minute: number;
  added: number;
  goal: boolean;
  youAreHome: boolean;
  points: 0 | 1 | 3;
  opponent: string;
  seasonDone: boolean;
};

export function finishKick(career: CareerState, goal: boolean): { career: CareerState; summary: KickSummary } {
  const pending = career.pending;
  if (!pending) throw new Error("Нет начатого матча");
  const fx = career.fixtures.find((f) => f.id === pending.fixtureId);
  if (!fx) throw new Error("Матч не найден");
  const youAreHome = fx.homeId === career.clubId;
  let home = pending.preHome;
  let away = pending.preAway;
  if (goal) {
    if (youAreHome) home += 1;
    else away += 1;
  }
  const rng = mulberry32(fx.seed ^ 0x9e3779b9);
  const rest = (96 - pending.minute) / 96;
  const x = expected(career, fx);
  home = Math.min(7, home + poisson(x.home * rest, rng));
  away = Math.min(7, away + poisson(x.away * rest, rng));
  const fixtures = career.fixtures.map((f) =>
    f.id === fx.id
      ? {
          ...f,
          played: true,
          homeGoals: home,
          awayGoals: away,
          minute: pending.minute,
          added: pending.added,
          fkGoal: goal,
          userPlayed: true,
        }
      : f,
  );
  let next: CareerState = {
    ...career,
    fixtures,
    pending: null,
    seasonFkGoals: career.seasonFkGoals + (goal ? 1 : 0),
    careerGoals: career.careerGoals + (goal ? 1 : 0),
    reputation: career.reputation + (goal ? 3 : 0),
  };
  next = prepareRound(next, fx.round);
  const you = youAreHome ? home : away;
  const them = youAreHome ? away : home;
  const points = you > them ? 3 : you === them ? 1 : 0;
  return {
    career: next,
    summary: {
      home,
      away,
      minute: pending.minute,
      added: pending.added,
      goal,
      youAreHome,
      points,
      opponent: clubById(youAreHome ? fx.awayId : fx.homeId).name,
      seasonDone: nextUserFixture(next) === null,
    },
  };
}

export function simulateUserMatch(career: CareerState): CareerState {
  const fx = nextUserFixture(career);
  if (!fx) return { ...career, pending: null };
  let next = prepareRound(career, fx.round);
  const score = simulateScore(fx, next.season, 1);
  next = {
    ...next,
    pending: null,
    fixtures: next.fixtures.map((f) =>
      f.id === fx.id ? { ...f, ...score, played: true, userPlayed: false, fkGoal: false } : f,
    ),
  };
  return next;
}

export function simulateSeason(career: CareerState): CareerState {
  let next: CareerState = { ...career, pending: null };
  const rounds = [...new Set(next.fixtures.map((f) => f.round))].sort((a, b) => a - b);
  for (const round of rounds) next = prepareRound(next, round);
  next = {
    ...next,
    fixtures: next.fixtures.map((fx) => {
      if (fx.played) return fx;
      const score = simulateScore(fx, next.season, 1);
      return { ...fx, ...score, played: true, userPlayed: false, fkGoal: false };
    }),
  };
  return next;
}

export function startNextSeason(career: CareerState, clubId: string): CareerState {
  const rows = table(career);
  const row = rows.find((r) => r.id === career.clubId);
  const note: SeasonNote = {
    season: career.season,
    clubId: career.clubId,
    position: row?.pos ?? rows.length,
    goals: career.seasonFkGoals,
    pts: row?.pts ?? 0,
  };
  const positionBonus = Math.max(0, 9 - (row?.pos ?? 8)) * 1.4;
  return {
    season: career.season + 1,
    clubId,
    fixtures: makeFixtures(
      CLUBS.map((c) => c.id),
      career.season + 1,
    ),
    pending: null,
    history: [...career.history, note],
    careerGoals: career.careerGoals,
    seasonFkGoals: 0,
    reputation: career.reputation + positionBonus,
  };
}

export function canJoin(club: Club, career: CareerState): boolean {
  if (club.id === career.clubId) return false;
  const weakest = [...CLUBS].sort((a, b) => a.power - b.power).slice(0, 3);
  if (weakest.some((c) => c.id === club.id)) return true;
  return career.reputation >= (club.power - 84) * 0.85;
}

export type TableRow = {
  id: string;
  pos: number;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

export function table(career: CareerState): TableRow[] {
  const rows = new Map<string, TableRow>();
  for (const club of CLUBS) {
    rows.set(club.id, { id: club.id, pos: 0, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 });
  }
  for (const fx of career.fixtures) {
    if (!fx.played) continue;
    const home = rows.get(fx.homeId);
    const away = rows.get(fx.awayId);
    if (!home || !away) continue;
    home.p += 1;
    away.p += 1;
    home.gf += fx.homeGoals;
    home.ga += fx.awayGoals;
    away.gf += fx.awayGoals;
    away.ga += fx.homeGoals;
    if (fx.homeGoals > fx.awayGoals) {
      home.w += 1;
      away.l += 1;
      home.pts += 3;
    } else if (fx.homeGoals < fx.awayGoals) {
      away.w += 1;
      home.l += 1;
      away.pts += 3;
    } else {
      home.d += 1;
      away.d += 1;
      home.pts += 1;
      away.pts += 1;
    }
  }
  const list = [...rows.values()].map((r) => ({ ...r, gd: r.gf - r.ga }));
  list.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.id.localeCompare(b.id));
  list.forEach((r, i) => {
    r.pos = i + 1;
  });
  return list;
}

function expected(career: CareerState, fx: Fixture) {
  const home = clubById(fx.homeId);
  const away = clubById(fx.awayId);
  const youHome = fx.homeId === career.clubId;
  const youAway = fx.awayId === career.clubId;
  const boost = 1 + Math.min(0.12, career.seasonFkGoals * 0.015);
  return {
    home: 1.3 * (home.power / away.power) * (youHome ? boost : 1),
    away: 1.12 * (away.power / home.power) * (youAway ? boost : 1),
  };
}

function simulateScore(fx: Fixture, season: number, boost: number) {
  const rng = mulberry32(hashSeed(`sim:${season}:${fx.id}`));
  const home = clubById(fx.homeId);
  const away = clubById(fx.awayId);
  return {
    homeGoals: Math.min(6, poisson(1.32 * (home.power / away.power) * boost, rng)),
    awayGoals: Math.min(6, poisson(1.12 * (away.power / home.power) * boost, rng)),
  };
}

function poisson(lambda: number, rng: () => number) {
  if (lambda <= 0.001) return 0;
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k += 1;
    p *= rng();
    if (k > 16) break;
  } while (p > L);
  return k - 1;
}
