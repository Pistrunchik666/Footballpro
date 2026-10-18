import { addDays, hash, rng, squadFor } from "./generate";
import type { Club, Comp, EuroState, EuroTicket, Fixture, LeagueId, Save } from "./types";
import { EURO, euroToClub, FOREIGN, RPL_GROUPS, RU_LEAGUES } from "./world";

const CUP_LEAGUES: LeagueId[] = ["fnl", "fnl2", "fnl3", "media", "amateur"];

export function freshCup() {
  return { byes: [] as string[], userOut: false, stage: "live" as const };
}

export function freshEuro(): EuroState {
  return { comp: null, stage: "done", pts: 0, gf: 0, ga: 0, round: 0 };
}

export function seedCompetitions(save: Save, keepTickets = false) {
  if (!keepTickets) assignOpeningTickets(save);
  save.cup = freshCup();
  save.euro = ticketToEuro(save.clubs.find((c) => c.id === save.clubId)?.euro ?? null);
  save.fixtures = save.fixtures.filter((f) => (f.comp ?? "league") === "league");
  save.fixtures.push(...cupGroupFixtures(save), ...regionRound(save, 1));
  if (save.euro.comp && save.euro.stage === "qual") save.fixtures.push(...euroQual(save));
  else if (save.euro.comp && save.euro.stage === "league") save.fixtures.push(...euroLeague(save));
}

export function progressCompetitions(save: Save) {
  if (save.cup.stage !== "done") progressCup(save);
  if (save.euro.comp && save.euro.stage !== "done" && save.euro.stage !== "out") progressEuro(save);
}

function assignOpeningTickets(save: Save) {
  const rpl = save.clubs.filter((c) => c.league === "rpl").sort((a, b) => b.rep - a.rep);
  const tickets: EuroTicket[] = ["ucl", "ucl", "uclq", "uel", "uecl", "uecl"];
  rpl.forEach((c, i) => {
    c.euro = tickets[i] ?? null;
  });
}

function ticketToEuro(ticket: EuroTicket | null): EuroState {
  if (!ticket) return freshEuro();
  if (ticket === "uclq") return { comp: "ucl", stage: "qual", pts: 0, gf: 0, ga: 0, round: 0 };
  return { comp: ticket, stage: "league", pts: 0, gf: 0, ga: 0, round: 0 };
}

function fx(p: Omit<Fixture, "played" | "hg" | "ag">): Fixture {
  return { ...p, played: false };
}

function cupGroupFixtures(save: Save): Fixture[] {
  const dates = ["2026-08-05", "2026-08-19", "2026-09-02", "2026-10-14", "2026-10-28", "2026-11-25"].map((d) => shiftYear(d, save.season));
  const out: Fixture[] = [];
  const letters = ["A", "B", "C", "D"];
  RPL_GROUPS.forEach((ids, gi) => {
    const present = ids.filter((id) => save.clubs.some((c) => c.id === id && c.league === "rpl"));
    const pool = present.length === 4 ? present : save.clubs.filter((c) => c.league === "rpl").slice(gi * 4, gi * 4 + 4).map((c) => c.id);
    if (pool.length < 2) return;
    const rounds = doubleRound(pool);
    rounds.forEach((pairs, ri) => {
      pairs.forEach(([home, away], i) => {
        out.push(fx({
          id: `cup-${save.season}-g${gi}-${ri}-${i}`,
          league: "rpl",
          round: ri + 1,
          date: dates[ri] ?? dates[dates.length - 1]!,
          home,
          away,
          comp: "cup",
          label: `Кубок · группа ${letters[gi]}`,
        }));
      });
    });
  });
  return out;
}

function regionClubs(save: Save) {
  const media = new Set(mediaInCup(save).map((c) => c.id));
  return save.clubs
    .filter((c) => (c.league === "media" ? media.has(c.id) : CUP_LEAGUES.includes(c.league)))
    .sort((a, b) => b.rep - a.rep);
}

export function mediaInCup(save: Save) {
  return save.clubs
    .filter((c) => c.league === "media")
    .sort((a, b) => hash(`${save.season}:${a.id}`) - hash(`${save.season}:${b.id}`))
    .slice(0, 4);
}

function regionRound(save: Save, round: number): Fixture[] {
  const dates = ["2026-07-29", "2026-08-12", "2026-08-26", "2026-09-16"].map((d) => shiftYear(d, save.season));
  let ids = round === 1 ? regionClubs(save).map((c) => c.id) : aliveRegion(save);
  if (round > 1) ids = [...ids, ...save.cup.byes];
  save.cup.byes = [];
  if (ids.length <= 8 && round > 1) return [];
  const ranked = ids
    .map((id) => save.clubs.find((c) => c.id === id))
    .filter((c): c is Club => !!c)
    .sort((a, b) => b.rep - a.rep)
    .map((c) => c.id);
  const target = Math.pow(2, Math.ceil(Math.log2(Math.max(2, ranked.length))));
  const play = ranked.slice(0, ranked.length - (target - ranked.length > ranked.length ? 0 : target - ranked.length));
  const byeCount = ranked.length - (ranked.length % 2 === 0 ? ranked.length : ranked.length - 1);
  void byeCount;
  const byes: string[] = [];
  const queue = [...ranked];
  while (queue.length > 8 && queue.length % 2 === 1) byes.push(queue.shift()!);
  save.cup.byes = byes;
  const pairs: [string, string][] = [];
  const body = [...queue].sort((a, b) => hash(a + b + String(round) + save.season) - hash(b + a));
  for (let i = 0; i < body.length; i += 2) {
    if (body[i + 1]) pairs.push([body[i]!, body[i + 1]!]);
    else byes.push(body[i]!);
  }
  save.cup.byes = [...new Set([...save.cup.byes, ...byes])];
  void play;
  return pairs.map(([home, away], i) =>
    fx({
      id: `cup-${save.season}-r${round}-${i}`,
      league: "fnl",
      round: 100 + round,
      date: dates[round - 1] ?? dates[0]!,
      home,
      away,
      comp: "cup",
      label: `Кубок · путь регионов, раунд ${round}`,
      tie: `reg-${round}-${i}`,
      leg: 1,
    }),
  );
}

function aliveRegion(save: Save) {
  const started = new Set(regionClubs(save).map((c) => c.id));
  for (const f of save.fixtures) {
    if (f.comp !== "cup" || !f.played || f.round < 101 || f.round > 104 || f.hg == null || f.ag == null) continue;
    const loser = f.hg === f.ag ? (hash(f.id) % 2 ? f.away : f.home) : f.hg > f.ag ? f.away : f.home;
    started.delete(loser);
  }
  return [...started].filter((id) => !lost(save, id));
}

function lost(save: Save, id: string) {
  return save.fixtures.some((f) => {
    if (f.comp !== "cup" || !f.played || f.hg == null || f.ag == null) return false;
    if (f.home !== id && f.away !== id) return false;
    if ((f.round ?? 0) < 100) return false;
    const homeWin = f.hg > f.ag || (f.hg === f.ag && hash(f.id) % 2 === 0);
    return homeWin ? f.away === id : f.home === id;
  });
}

function progressCup(save: Save) {
  const user = save.clubId;
  const regionFx = save.fixtures.filter((f) => f.comp === "cup" && f.round >= 101 && f.round <= 104);
  const maxReg = regionFx.reduce((m, f) => Math.max(m, f.round - 100), 0);
  if (maxReg > 0 && maxReg < 4 && regionFx.filter((f) => f.round === 100 + maxReg).every((f) => f.played)) {
    const next = regionRound(save, maxReg + 1);
    if (next.length) save.fixtures.push(...next);
  }
  const groups = save.fixtures.filter((f) => f.comp === "cup" && f.round <= 6 && f.label?.includes("группа"));
  const regs = save.fixtures.filter((f) => f.comp === "cup" && f.round >= 101 && f.round <= 104);
  const groupsDone = groups.length > 0 && groups.every((f) => f.played);
  const regionDone = regs.length > 0 && regs.every((f) => f.played) && aliveRegion(save).length <= 8 && save.cup.byes.length === 0;
  const r16 = save.fixtures.filter((f) => f.comp === "cup" && f.round >= 201 && f.round <= 202);
  if (groupsDone && regionDone && !r16.length) save.fixtures.push(...knockoutPairs(save, r16seeds(save), 201, shiftYear("2027-03-03", save.season), shiftYear("2027-03-17", save.season), "Кубок · 1/8"));
  advanceKo(save, 201, 301, shiftYear("2027-04-07", save.season), shiftYear("2027-04-21", save.season), "Кубок · 1/4");
  advanceKo(save, 301, 401, shiftYear("2027-05-05", save.season), shiftYear("2027-05-19", save.season), "Кубок · 1/2");
  advanceFinal(save, 401, 500, shiftYear("2027-06-02", save.season), "Кубок · финал");
  const mine = save.fixtures.filter((f) => f.comp === "cup" && (f.home === user || f.away === user));
  if (mine.some((f) => f.played && f.hg != null && knockedOut(f, user)) && !mine.some((f) => !f.played)) save.cup.userOut = true;
  if (save.fixtures.some((f) => f.comp === "cup" && f.round === 500 && f.played)) save.cup.stage = "done";
}

function r16seeds(save: Save) {
  const qual: string[] = [];
  for (let g = 0; g < 4; g++) {
    const rows = groupTable(save, g);
    if (rows[0]) qual.push(rows[0]);
    if (rows[1]) qual.push(rows[1]);
  }
  const regional = [...aliveRegion(save), ...save.cup.byes].slice(0, 8);
  const all = [...qual, ...regional].filter((id, i, arr) => arr.indexOf(id) === i);
  return all.slice(0, 16);
}

function groupTable(save: Save, gi: number) {
  const letter = ["A", "B", "C", "D"][gi];
  const games = save.fixtures.filter((f) => f.comp === "cup" && f.label?.includes(`группа ${letter}`) && f.played && f.hg != null);
  const ids = new Set<string>();
  games.forEach((f) => {
    ids.add(f.home);
    ids.add(f.away);
  });
  const rows = [...ids].map((id) => ({ id, pts: 0, gd: 0 }));
  for (const f of games) {
    const h = rows.find((r) => r.id === f.home)!;
    const a = rows.find((r) => r.id === f.away)!;
    h.gd += f.hg! - f.ag!;
    a.gd += f.ag! - f.hg!;
    if (f.hg! > f.ag!) h.pts += 3;
    else if (f.hg! < f.ag!) a.pts += 3;
    else {
      h.pts++;
      a.pts++;
    }
  }
  rows.sort((a, b) => b.pts - a.pts || b.gd - a.gd);
  return rows.map((r) => r.id);
}

function knockoutPairs(save: Save, ids: string[], round: number, d1: string, d2: string, label: string) {
  const pairs: Fixture[] = [];
  for (let i = 0; i < ids.length; i += 2) {
    const a = ids[i];
    const b = ids[i + 1];
    if (!a || !b) continue;
    const tie = `ko-${round}-${i}`;
    pairs.push(
      fx({ id: `cup-${save.season}-${round}-${i}-1`, league: "rpl", round, date: d1, home: a, away: b, comp: "cup", label: `${label}, первый матч`, tie, leg: 1 }),
      fx({ id: `cup-${save.season}-${round}-${i}-2`, league: "rpl", round: round + 1, date: d2, home: b, away: a, comp: "cup", label: `${label}, ответный`, tie, leg: 2 }),
    );
  }
  return pairs;
}

function winnersOf(save: Save, round: number) {
  const legs = save.fixtures.filter((f) => f.comp === "cup" && (f.round === round || f.round === round + 1));
  if (!legs.length || legs.some((f) => !f.played)) return null;
  const ties = new Map<string, Fixture[]>();
  for (const f of legs) {
    const key = f.tie || f.id;
    ties.set(key, [...(ties.get(key) ?? []), f]);
  }
  const winners: string[] = [];
  for (const [key, pair] of ties) {
    let a = pair[0]!.home;
    let b = pair[0]!.away;
    if (pair[0]!.leg === 2) {
      a = pair[0]!.away;
      b = pair[0]!.home;
    }
    let ag = 0;
    let bg = 0;
    for (const f of pair) {
      const homeIsA = f.home === a;
      ag += homeIsA ? f.hg! : f.ag!;
      bg += homeIsA ? f.ag! : f.hg!;
    }
    winners.push(ag === bg ? (hash(key) % 2 ? b : a) : ag > bg ? a : b);
  }
  return winners;
}

function advanceKo(save: Save, from: number, to: number, d1: string, d2: string, label: string) {
  if (save.fixtures.some((f) => f.comp === "cup" && f.round === to)) return;
  const winners = winnersOf(save, from);
  if (!winners || winners.length < 2) return;
  save.fixtures.push(...knockoutPairs(save, winners, to, d1, d2, label));
}

function advanceFinal(save: Save, from: number, round: number, date: string, label: string) {
  if (save.fixtures.some((f) => f.comp === "cup" && f.round === round)) return;
  const winners = winnersOf(save, from);
  if (!winners || winners.length < 2) return;
  save.fixtures.push(fx({
    id: `cup-${save.season}-final`,
    league: "rpl",
    round,
    date,
    home: winners[0]!,
    away: winners[1]!,
    comp: "cup",
    label,
  }));
}

function knockedOut(f: Fixture, user: string) {
  if (f.hg == null || f.ag == null) return false;
  if ((f.round ?? 0) < 100) return false;
  if (f.leg === 1) return false;
  const homeWin = f.hg > f.ag;
  const userHome = f.home === user;
  if (f.hg === f.ag) return false;
  return userHome ? !homeWin : homeWin;
}

export function noteEuroResult(save: Save, f: Fixture) {
  if (!f.comp || (f.comp !== "ucl" && f.comp !== "uel" && f.comp !== "uecl")) return;
  if (f.home !== save.clubId && f.away !== save.clubId) return;
  if (!f.label?.includes("общий этап")) return;
  const mine = f.home === save.clubId ? f.hg! : f.ag!;
  const opp = f.home === save.clubId ? f.ag! : f.hg!;
  save.euro.gf += mine;
  save.euro.ga += opp;
  if (mine > opp) save.euro.pts += 3;
  else if (mine === opp) save.euro.pts += 1;
}

function progressEuro(save: Save) {
  const comp = save.euro.comp;
  if (!comp || comp === "uclq") return;
  const mine = save.fixtures.filter((f) => f.comp === comp && (f.home === save.clubId || f.away === save.clubId));
  const qual = mine.filter((f) => f.label?.includes("квалиф"));
  if (save.euro.stage === "qual" && qual.length && qual.every((f) => f.played)) {
    const agg = aggOf(qual, save.clubId);
    if (agg.me > agg.them) {
      save.euro.stage = "league";
      save.euro.comp = "ucl";
      save.euro.pts = 0;
      save.euro.gf = 0;
      save.euro.ga = 0;
      save.fixtures.push(...euroLeague(save));
    } else {
      save.euro.comp = "uel";
      save.euro.stage = "league";
      save.euro.pts = 0;
      save.euro.gf = 0;
      save.euro.ga = 0;
      save.fixtures.push(...euroLeague(save));
    }
  }
  const league = mine.filter((f) => f.label?.includes("общий этап"));
  if (save.euro.stage === "league" && league.length >= 4 && league.every((f) => f.played)) {
    const need = Math.max(8, Math.round(league.length * 1.25));
    if (save.euro.pts >= need) {
      save.euro.stage = "ko";
      save.euro.round = 1;
      save.fixtures.push(...euroTie(save, 1));
    } else save.euro.stage = "out";
  }
  if (save.euro.stage === "ko") {
    const round = save.euro.round;
    const legs = mine.filter((f) => f.label?.includes(`раунд ${round}`));
    if (legs.length && legs.every((f) => f.played)) {
      const agg = aggOf(legs, save.clubId);
      if (agg.me < agg.them || (agg.me === agg.them && hash(legs[0]!.id) % 2)) {
        save.euro.stage = "out";
        return;
      }
      if (round >= 4) {
        save.euro.stage = "done";
        return;
      }
      save.euro.round = round + 1;
      save.fixtures.push(...euroTie(save, save.euro.round));
    }
  }
}

function aggOf(legs: Fixture[], user: string) {
  let me = 0;
  let them = 0;
  for (const f of legs) {
    if (f.hg == null || f.ag == null) continue;
    if (f.home === user) {
      me += f.hg;
      them += f.ag;
    } else {
      me += f.ag;
      them += f.hg;
    }
  }
  return { me, them };
}

function euroQual(save: Save): Fixture[] {
  const opp = pickEuro(save, "uclq", 1)[0];
  if (!opp) return [];
  ensureClub(save, opp);
  const d1 = shiftYear("2026-07-15", save.season);
  const d2 = shiftYear("2026-07-22", save.season);
  return [
    fx({ id: `uclq-${save.season}-1`, league: "euro", round: 1, date: d1, home: opp, away: save.clubId, comp: "ucl", label: "ЛЧ · квалификация, первый матч", tie: "uclq", leg: 1 }),
    fx({ id: `uclq-${save.season}-2`, league: "euro", round: 2, date: d2, home: save.clubId, away: opp, comp: "ucl", label: "ЛЧ · квалификация, ответный", tie: "uclq", leg: 2 }),
  ];
}

function euroLeague(save: Save): Fixture[] {
  const comp = save.euro.comp === "ucl" ? "ucl" : save.euro.comp === "uel" ? "uel" : "uecl";
  const dates = ["2026-09-16", "2026-10-01", "2026-10-22", "2026-11-05", "2026-11-26", "2026-12-10", "2027-01-21", "2027-01-29"].map((d) => shiftYear(d, save.season));
  const names = comp === "ucl" ? "ЛЧ" : comp === "uel" ? "ЛЕ" : "ЛК";
  const opps = pickEuro(save, comp, 8);
  return opps.map((opp, i) => {
    ensureClub(save, opp);
    const home = i % 2 === 0;
    return fx({
      id: `${comp}-${save.season}-md${i}`,
      league: "euro",
      round: 10 + i,
      date: dates[i]!,
      home: home ? save.clubId : opp,
      away: home ? opp : save.clubId,
      comp,
      label: `${names} · общий этап`,
    });
  });
}

function euroTie(save: Save, round: number): Fixture[] {
  const comp = (save.euro.comp === "ucl" || save.euro.comp === "uel" || save.euro.comp === "uecl" ? save.euro.comp : "uecl") as Comp;
  const names = ["1/8", "1/4", "1/2", "финал"];
  const label = `${comp === "ucl" ? "ЛЧ" : comp === "uel" ? "ЛЕ" : "ЛК"} · ${names[round - 1] ?? "плей-офф"}`;
  const opp = pickEuro(save, comp === "ucl" ? "ucl" : comp === "uel" ? "uel" : "uecl", 8)[round] ?? pickEuro(save, "ucl", 1)[0];
  if (!opp) return [];
  ensureClub(save, opp);
  const base = ["2027-02-17", "2027-03-10", "2027-04-14", "2027-06-05"][round - 1] ?? "2027-06-05";
  const d1 = shiftYear(base, save.season);
  if (round >= 4) {
    return [fx({ id: `${comp}-${save.season}-f`, league: "euro", round: 40, date: d1, home: save.clubId, away: opp, comp, label: `${label} · раунд ${round}` })];
  }
  const d2 = addDays(d1, 14);
  return [
    fx({ id: `${comp}-${save.season}-k${round}a`, league: "euro", round: 20 + round, date: d1, home: opp, away: save.clubId, comp, label: `${label}, раунд ${round}, первый`, tie: `euro-${round}`, leg: 1 }),
    fx({ id: `${comp}-${save.season}-k${round}b`, league: "euro", round: 20 + round, date: d2, home: save.clubId, away: opp, comp, label: `${label}, раунд ${round}, ответный`, tie: `euro-${round}`, leg: 2 }),
  ];
}

function pickEuro(save: Save, kind: EuroTicket, n: number) {
  const pool = EURO.filter((e) => (kind === "uclq" ? e.ticket === "uclq" || e.rep < 75 : kind === "ucl" ? e.ticket === "ucl" : kind === "uel" ? e.ticket === "uel" : e.ticket === "uecl"));
  const sorted = [...pool].sort((a, b) => hash(a.id + save.season + kind) - hash(b.id + kind));
  return sorted.filter((e) => e.id !== save.clubId).slice(0, n).map((e) => e.id);
}

export function ensureClub(save: Save, id: string) {
  if (save.clubs.some((c) => c.id === id)) return;
  const foreign = FOREIGN.find((c) => c.id === id);
  const euro = EURO.find((e) => e.id === id);
  const club = foreign ?? (euro ? euroToClub(euro) : undefined);
  if (!club) return;
  save.clubs.push({ ...club });
  save.players.push(...squadFor(club));
}

export function materializeLeague(save: Save, league: LeagueId) {
  const templates = FOREIGN.filter((c) => c.league === league);
  let added = false;
  for (const t of templates) {
    if (save.clubs.some((c) => c.id === t.id)) continue;
    save.clubs.push({ ...t });
    save.players.push(...squadFor(t));
    added = true;
  }
  if (!added) return;
  const clubs = save.clubs.filter((c) => c.league === league);
  const { makeLeagueFixtures } = fixtureApi();
  save.fixtures.push(...makeLeagueFixtures(clubs, league, save.season, true));
  for (const f of save.fixtures) {
    if (f.league === league && f.date < save.date && !f.played) {
      const home = save.clubs.find((c) => c.id === f.home);
      const away = save.clubs.find((c) => c.id === f.away);
      if (!home || !away) continue;
      const r = rng(hash(f.id));
      const diff = (home.rep - away.rep) / 30;
      f.hg = Math.max(0, Math.round(r() * 2 + diff));
      f.ag = Math.max(0, Math.round(r() * 2 - diff));
      f.played = true;
    }
  }
}

type FixApi = { makeLeagueFixtures: (clubs: Club[], league: LeagueId, season: number, double: boolean) => Fixture[] };

function fixtureApi(): FixApi {
  const root = globalThis as typeof globalThis & { __kabinetFx?: FixApi };
  if (!root.__kabinetFx) root.__kabinetFx = { makeLeagueFixtures: () => [] };
  return root.__kabinetFx;
}

export function registerFixtures(fn: FixApi["makeLeagueFixtures"]) {
  fixtureApi().makeLeagueFixtures = fn;
}

function doubleRound(ids: string[]) {
  const first = circle(ids);
  return [...first, ...first.map((pairs) => pairs.map(([a, b]) => [b, a] as [string, string]))];
}

function circle(ids: string[]) {
  const arr = [...ids];
  if (arr.length % 2) arr.push("BYE");
  const n = arr.length;
  const rounds: [string, string][][] = [];
  for (let r = 0; r < n - 1; r++) {
    const pairs: [string, string][] = [];
    for (let i = 0; i < n / 2; i++) {
      const a = arr[i]!;
      const b = arr[n - 1 - i]!;
      if (a !== "BYE" && b !== "BYE") pairs.push(r % 2 ? [b, a] : [a, b]);
    }
    rounds.push(pairs);
    const fixed = arr[0]!;
    const rest = arr.slice(1);
    rest.unshift(rest.pop()!);
    arr.splice(0, arr.length, fixed, ...rest);
  }
  return rounds;
}

export function shiftYear(iso: string, season: number) {
  const [y, m, d] = iso.split("-");
  const year = Number(m) >= 7 ? season : season + 1;
  void y;
  return `${year}-${m}-${d}`;
}

export function leaguePrize(place: number, league: LeagueId) {
  if (league === "rpl") return [900, 560, 420, 300, 240, 200][place - 1] ?? (place <= 10 ? 80 : 30);
  if (league === "fnl") return place === 1 ? 220 : place === 2 ? 140 : place <= 4 ? 80 : 24;
  if (league === "fnl2") return place === 1 ? 90 : place === 2 ? 50 : 16;
  if (league === "fnl3") return place === 1 ? 40 : place <= 5 ? 18 : 6;
  if (league === "media") return place === 1 ? 48 : 8;
  if (league === "amateur") return place === 1 ? 8 : 2;
  return place === 1 ? 200 : place <= 3 ? 80 : 20;
}

export function cupWinner(save: Save) {
  const final = save.fixtures.find((f) => f.comp === "cup" && f.round === 500 && f.played && f.hg != null);
  if (!final) return null;
  if (final.hg === final.ag) return hash(final.id) % 2 ? final.away : final.home;
  return final.hg! > final.ag! ? final.home : final.away;
}

export function russianLeagues() {
  return RU_LEAGUES;
}

export { doubleRound, circle };
