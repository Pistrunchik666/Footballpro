import { create } from "zustand";
import { FORMATIONS, clubById } from "./clubs";
import { freshCup, freshEuro, materializeLeague, noteEuroResult } from "./competitions";
import {
  acceptOffer,
  advanceTo,
  applyMatchLoad,
  autoXi,
  bid,
  checkSack,
  finishSeason,
  flushOthers,
  growFromMatch,
  moraleSwing,
  nextUserDate,
  placeOf,
  pushMsg,
  rejectOffer,
  remapXi,
  renewContract,
  report,
  seasonDone,
  simulateSegment,
  takeJob,
  train,
  userFixture,
  wageBill,
} from "./engine";
import { autoKit } from "./kits";
import { clubTactics, STYLES } from "./tactics";
import { catalog, dollarText, hash, newSave, overall, playerName, priceRub } from "./generate";
import { adoptMarketPlayer } from "./market";
import { cabinetCode, folderKey, openWebStorage, readRaw, removeRaw, writeRaw } from "./webstore";
import type { FormationId, Glory, Kit, LeagueId, Live, Mentality, Save, Screen, Tactics } from "./types";

const LEGACY = "kabinet-folder-v1";
const OLD = "kabinet-save-v1";

export type SlotFile = { save: Save } | null;
export type Folder = { v: 2; active: number; slots: [SlotFile, SlotFile, SlotFile]; glory: Glory[] };

function emptyFolder(): Folder {
  return { v: 2, active: 0, slots: [null, null, null], glory: [] };
}

let memory: Folder = emptyFolder();

function snapshot(): Folder {
  return { v: 2, active: memory.active, slots: [...memory.slots] as Folder["slots"], glory: [...memory.glory] };
}

function persistFolder() {
  writeRaw(folderKey(), JSON.stringify(memory));
}

export function honorsOf(folder: Folder): Glory[] {
  return folder.glory ?? [];
}

function cupOf(text: string) {
  const t = text.toLowerCase();
  if (t.includes("чемпион")) return "ucl";
  if (t.includes("европы")) return "uel";
  if (t.includes("конферен")) return "uecl";
  if (t.includes("кубок")) return "cup";
  if (t.includes("медиа")) return "media";
  if (t.includes("фнл-3")) return "fnl3";
  if (t.includes("фнл-2")) return "fnl2";
  if (t.includes("фнл") || t.includes("первая")) return "fnl";
  if (t.includes("рпл")) return "rpl";
  return "league";
}

function fromLog(save: Save): Glory[] {
  const out: Glory[] = [];
  for (const line of save.log ?? []) {
    if (!line.startsWith("HONOR:")) continue;
    const body = line.slice(6);
    const cut = body.match(/^(\d{4})\|(.*)$/);
    const season = cut ? Number(cut[1]) : save.season;
    const text = cut ? cut[2]! : body;
    if (!text || text.includes("вылет") || text.includes("выход") || text.includes("стык")) continue;
    out.push({ who: save.manager, text, season, cup: cupOf(text) });
  }
  return out;
}

function sameGlory(a: Glory, b: Glory) {
  return a.who === b.who && a.text === b.text && a.season === b.season;
}

function harvest(save: Save): Glory | null {
  let last: Glory | null = null;
  for (const g of fromLog(save)) {
    if (memory.glory.some((x) => sameGlory(x, g))) continue;
    memory.glory.unshift(g);
    if (!last) last = g;
  }
  return last;
}

type State = {
  screen: Screen;
  save: Save | null;
  folder: Folder;
  live: Live | null;
  playerId: string | null;
  league: LeagueId;
  picking: number | null;
  notice: string;
  draft: { manager: string; clubId: string; home: Kit; away: Kit } | null;
  boot: () => void;
  start: (clubId: string, manager: string) => void;
  prepare: (clubId: string, manager: string) => void;
  tuneKit: (side: "home" | "away", patch: Partial<Kit>) => void;
  activate: (index: number) => void;
  fresh: (index: number) => void;
  begin: () => void;
  playNow: () => void;
  manualSave: () => boolean;
  go: (screen: Screen) => void;
  openPlayer: (id: string) => void;
  setLeague: (id: LeagueId) => void;
  patchTactic: (patch: Partial<Tactics>) => void;
  pickSlot: (index: number | null) => void;
  assign: (playerId: string) => void;
  auto: () => void;
  doTrain: (focus: Save["focus"]) => void;
  toMatch: () => void;
  kickoff: (instant?: boolean) => void;
  tick: () => void;
  pauseMatch: () => void;
  resumeSim: () => void;
  forfeit: () => void;
  resumeHalf: () => void;
  queueSub: (outId: string, inId: string) => void;
  toggleMenu: (open?: boolean) => void;
  advanceDay: () => void;
  toNextMatch: () => void;
  offerBid: (playerId: string, fee: number) => void;
  accept: (id: string) => void;
  reject: (id: string) => void;
  closeSeason: () => void;
  job: (clubId: string) => void;
  read: (id: string) => void;
  list: (playerId: string) => void;
  renew: (playerId: string, years: number, wage: number, clause: string) => void;
  scout: (league: LeagueId) => void;
  setOption: (patch: { difficulty?: Save["difficulty"]; matchMins?: Save["matchMins"] }) => void;
  wipeCareer: () => void;
  cutscene: Glory | null;
  stamp: string;
  dismissTrophy: () => void;
};

function commit(set: (p: Partial<State>) => void, save: Save, extra?: Partial<State>) {
  const next = { ...save };
  const won = harvest(next);
  memory.slots[memory.active] = { save: next };
  persistFolder();
  set({ save: next, folder: snapshot(), ...(won ? { cutscene: won } : {}), ...extra });
}

function emptyLive(fixtureId: string, home: boolean, oppId: string, xi: string[], oppXi: string[], oppForm: FormationId): Live {
  return {
    fixtureId,
    minute: 0,
    events: [],
    queue: [],
    hg: 0,
    ag: 0,
    home,
    oppId,
    xi,
    oppXi,
    ratings: {},
    paused: false,
    done: false,
    xgH: 0,
    xgA: 0,
    scorers: [],
    mins: {},
    pending: [],
    oppPending: [],
    subsUsed: 0,
    oppSubs: 0,
    oppForm,
    line: "Арбитр даёт свисток, команды разводят мяч с центра поля.",
    side: "h",
    menu: false,
    userPause: false,
    technical: false,
    baller: xi.find((id) => id) ?? "",
    piece: "open",
    shot: "",
    pieceAt: 0,
  };
}

export const useFm = create<State>((set, get) => ({
  screen: "boot",
  save: null,
  folder: emptyFolder(),
  live: null,
  playerId: null,
  league: "rpl",
  picking: null,
  notice: "",
  draft: null,
  cutscene: null,
  stamp: "",

  boot: () => {
    memory = loadFolder();
    const save = memory.slots[memory.active]?.save ?? null;
    const league = save?.clubs.find((c) => c.id === save.clubId)?.league ?? "rpl";
    set({ folder: snapshot(), save, league, stamp: cabinetCode() });
  },

  start: (clubId, manager) => {
    try {
      const who = manager.trim();
      if (who.length < 2) {
        set({ notice: "Напишите фамилию тренера — хотя бы две буквы." });
        return;
      }
      const save = newSave(clubId, who);
      const draft = get().draft;
      if (draft?.clubId === clubId) save.kit = { home: { ...draft.home }, away: { ...draft.away } };
      save.tactics.slots = autoXi(save, clubId, save.tactics.formation);
      const club = save.clubs.find((c) => c.id === clubId);
      if (!club) {
        set({ notice: "Этот клуб не открылся. Выберите другой." });
        return;
      }
      commit(set, save, { screen: "desk", live: null, league: club.league, notice: `Карьера начата. ${who}, «${club.name}».`, playerId: null, draft: null });
    } catch {
      set({ notice: "Карьера не открылась. Нажмите «Начать карьеру» ещё раз." });
    }
  },

  prepare: (clubId, manager) => {
    const club = catalog().find((c) => c.id === clubId);
    if (!club) return;
    const home = autoKit(club, "home");
    const away = autoKit(club, "away");
    away.design = (home.design + 9) % 36;
    set({ draft: { manager: manager.trim() || "Тренер", clubId, home, away }, screen: "kits", notice: "" });
  },

  tuneKit: (side, patch) => {
    const draft = get().draft;
    if (!draft) return;
    set({ draft: { ...draft, [side]: { ...draft[side], ...patch } } });
  },

  activate: (index) => {
    memory.active = index;
    const save = memory.slots[index]?.save ?? null;
    persistFolder();
    const league = save?.clubs.find((c) => c.id === save.clubId)?.league ?? get().league;
    set({
      folder: snapshot(),
      save,
      screen: save ? (save.sacked ? "sacked" : "desk") : "pick",
      live: null,
      league,
      notice: "",
      playerId: null,
    });
  },

  fresh: (index) => {
    memory.active = index;
    memory.slots[index] = null;
    persistFolder();
    set({ folder: snapshot(), save: null, screen: "pick", live: null, draft: null, notice: "", playerId: null });
  },

  begin: () => {
    const free = memory.slots.findIndex((s) => !s);
    if (free < 0) {
      set({ notice: "Три тренера уже в деле. В слоте нажмите «Новый тренер», если хотите начать заново.", screen: "boot" });
      return;
    }
    get().fresh(free);
  },

  playNow: () => {
    if (!get().save) {
      const filled = memory.slots.findIndex((s) => s?.save);
      if (filled >= 0) get().activate(filled);
    }
    if (!get().save) {
      const clubs = catalog().filter((c) => c.league === "rpl");
      const club = clubs.find((c) => c.name === "Зенит") ?? clubs[0];
      if (!club) return;
      const free = memory.slots.findIndex((s) => !s);
      memory.active = free >= 0 ? free : 0;
      const created = newSave(club.id, "А. Рубанова");
      created.tactics.slots = autoXi(created, club.id, created.tactics.formation);
      commit(set, created, { screen: "desk", live: null, league: club.league, notice: "", playerId: null, draft: null });
    }
    get().toMatch();
    get().kickoff(false);
  },

  manualSave: () => {
    const save = get().save;
    if (!save?.clubId) return false;
    memory.slots[memory.active] = { save };
    persistFolder();
    set({ folder: snapshot() });
    return true;
  },

  go: (screen) => set({ screen, picking: null, notice: "" }),

  openPlayer: (id) => set({ playerId: id, screen: "player" }),

  setLeague: (league) => set({ league }),

  patchTactic: (patch) => {
    const save = get().save;
    if (!save) return;
    const formation = (patch.formation ?? save.tactics.formation) as FormationId;
    const changed = patch.formation && patch.formation !== save.tactics.formation;
    save.tactics = { ...save.tactics, ...patch, formation };
    if (patch.style && patch.mentality == null && patch.press == null && patch.tempo == null && patch.line == null && patch.width == null) {
      const preset = STYLES.find((s) => s.id === patch.style);
      if (preset) {
        save.tactics.mentality = preset.mentality;
        save.tactics.press = preset.press;
        save.tactics.tempo = preset.tempo;
        save.tactics.line = preset.line;
        save.tactics.width = preset.width;
      }
    }
    if (changed) {
      const liveNow = get().live;
      if (liveNow && !liveNow.done) save.tactics.slots = remapXi(save, liveNow.xi, formation);
      else save.tactics.slots = autoXi(save, save.clubId, formation);
    }
    if (patch.mentality != null) save.tactics.mentality = patch.mentality as Mentality;
    const live = get().live;
    if (live && !live.done) {
      if (changed) live.xi = [...save.tactics.slots];
      live.queue = [];
      if (live.minute < 90) fillChunk(save, live);
    }
    commit(set, save, live && !live.done ? { live: { ...live, xi: changed ? [...save.tactics.slots] : live.xi } } : undefined);
  },

  pickSlot: (picking) => set({ picking }),

  assign: (playerId) => {
    const save = get().save;
    const index = get().picking;
    if (!save || index == null) return;
    const slots = [...save.tactics.slots];
    const prev = slots.indexOf(playerId);
    if (prev >= 0) slots[prev] = slots[index] ?? "";
    slots[index] = playerId;
    save.tactics.slots = slots;
    commit(set, save, { picking: null });
  },

  auto: () => {
    const save = get().save;
    if (!save) return;
    save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
    commit(set, save);
  },

  doTrain: (focus) => {
    const save = get().save;
    if (!save) return;
    const step = (n: number, d: number, a: number, b: number) => Math.max(a, Math.min(b, n + d));
    const t = save.tactics;
    const before = `${t.mentality}:${t.press}:${t.tempo}:${t.line}:${t.width}`;
    if (focus === "attack") {
      t.mentality = step(t.mentality, 1, -2, 2) as Mentality;
      t.tempo = step(t.tempo, 1, 0, 4);
      t.press = step(t.press, 1, 0, 4);
    } else if (focus === "defence") {
      t.mentality = step(t.mentality, -1, -2, 2) as Mentality;
      t.line = step(t.line, -1, 0, 4);
      t.press = step(t.press, -1, 0, 4);
    } else if (focus === "set") {
      t.width = step(t.width, 1, 0, 4);
      t.tempo = step(t.tempo, -1, 0, 4);
    } else if (focus === "physical") {
      t.tempo = step(t.tempo, 1, 0, 4);
      t.press = step(t.press, 1, 0, 4);
    } else {
      t.tempo = step(t.tempo, -1, 0, 4);
      t.press = step(t.press, -1, 0, 4);
      t.mentality = (t.mentality > 0 ? t.mentality - 1 : t.mentality < 0 ? t.mentality + 1 : 0) as Mentality;
    }
    const moved = before !== `${t.mentality}:${t.press}:${t.tempo}:${t.line}:${t.width}`;
    const mine = save.players.filter((p) => p.clubId === save.clubId && p.injured <= 0);
    const avg = (key: "cond" | "sharp") => Math.round(mine.reduce((s, p) => s + p[key], 0) / Math.max(1, mine.length));
    const tone0 = avg("cond");
    const sharp0 = avg("sharp");
    const already = save.inbox.some((m) => m.date === save.date && m.title === "Тренировка проведена");
    if (!already) train(save, focus);
    else save.focus = focus;
    const tone1 = avg("cond");
    const sharp1 = avg("sharp");
    const live = get().live;
    if (live && !live.done) {
      live.queue = [];
      if (live.minute < 90) fillChunk(save, live);
    }
    const load = already ? "Нагрузку на игроков сегодня уже давали." : `Тонус ${tone0} → ${tone1}, острота ${sharp0} → ${sharp1}.`;
    const sliders = moved ? "Ползунки сдвинулись." : "Ползунки уже на пределе в эту сторону.";
    commit(set, save, {
      notice: `${sliders} ${load}`,
      screen: "tactics",
      ...(live && !live.done ? { live: { ...live } } : {}),
    });
  },

  toMatch: () => {
    const save = get().save;
    if (!save) return;
    if (seasonDone(save)) {
      set({ screen: "table", notice: "Чемпионат доигран. Можно закрывать сезон." });
      return;
    }
    const pending = get().live;
    if (pending && !pending.done) {
      set({ screen: "match" });
      return;
    }
    const date = nextUserDate(save);
    if (save.date < date) advanceTo(save, date, false);
    if (!save.tactics.slots.filter(Boolean).length) save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
    commit(set, save, { screen: "match", live: null });
  },

  kickoff: (instant) => {
    const save = get().save;
    const fx = save ? userFixture(save) : undefined;
    if (!save || !fx || fx.date !== save.date || fx.played) return;
    if (get().live && !get().live!.done) return;
    if (save.tactics.slots.filter(Boolean).length < 11) save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
    const home = fx.home === save.clubId;
    const oppId = home ? fx.away : fx.home;
    const oppForm = clubTactics(oppId).formation;
    const xi = [...save.tactics.slots];
    const oppXi = autoXi(save, oppId, oppForm);
    const live = emptyLive(fx.id, home, oppId, xi, oppXi, oppForm);
    if (instant) {
      const me = { ids: xi, formation: save.tactics.formation, tactics: save.tactics, clubId: save.clubId };
      const them = { ids: oppXi, formation: oppForm, tactics: clubTactics(oppId), clubId: oppId };
      const score = { h: 0, a: 0 };
      const a = simulateSegment(save, me, them, 1, 45, fx.id, score);
      const b = simulateSegment(save, me, them, 46, 90, fx.id + "b", score);
      live.events = [...a.events, ...b.events];
      live.hg = score.h;
      live.ag = score.a;
      live.xgH = a.xgH + b.xgH;
      live.xgA = a.xgA + b.xgA;
      live.minute = 90;
      live.done = true;
      live.line = "Финальный свисток. Команды благодарят трибуны и уходят в подтрибунное помещение.";
      for (const id of xi) live.mins[id] = 85;
      settle(save, live, false);
      commit(set, save, { live, screen: "match" });
      return;
    }
    fillChunk(save, live);
    set({ live, save: { ...save }, screen: "match" });
  },

  tick: () => {
    const save = get().save;
    const live = get().live;
    if (!save || !live || live.done || live.paused || live.menu || live.userPause) return;
    live.minute += 1;
    for (const id of [...live.xi, ...live.oppXi]) live.mins[id] = (live.mins[id] ?? 0) + 1;
    if (live.minute % 8 === 0) {
      for (const id of [...live.xi, ...live.oppXi]) {
        const p = save.players.find((pl) => pl.id === id);
        if (!p) continue;
        const extra = (p.age >= 34 ? 2 : p.age >= 30 ? 1 : 0) + (p.sta < 11 ? 1 : 0);
        p.cond = Math.max(28, Math.round(p.cond - 1 - extra));
      }
    }
    if (!live.queue.some((e) => e.min >= live.minute) && live.minute < 90) fillChunk(save, live);
    if ((live.minute === 63 || live.minute === 77) && live.oppSubs + live.oppPending.length < 4) queueOpp(save, live);
    const due = live.queue.filter((e) => e.min <= live.minute);
    live.queue = live.queue.filter((e) => e.min > live.minute);
    let subLine = "";
    for (const e of due) {
      live.events = [...live.events, e].slice(-16);
      live.line = e.text;
      const kickLive = live.piece !== "open" && live.pieceAt > 0 && Date.now() - live.pieceAt < 1700;
      if (e.side && !(kickLive && e.piece === "open")) live.side = e.side;
      if (e.piece && !(kickLive && e.piece === "open")) {
        live.piece = e.piece;
        live.shot = e.shot || "";
        if (e.piece !== "open") live.pieceAt = Date.now();
        if (e.pid) live.baller = e.pid;
      } else if (e.pid && !kickLive) {
        live.baller = e.pid;
      }
      if (e.kind === "goal") {
        if (e.side === "h") live.hg++;
        else live.ag++;
        if (e.pid && live.xi.includes(e.pid)) live.scorers.push(e.pid);
      }
      if (e.kind === "dead" || e.kind === "goal" || e.kind === "card" || e.text.includes("прихрамывает")) {
        const made = applyQueued(save, live, e.text);
        if (made) subLine = made;
      }
    }
    if (subLine) live.line = subLine;
    if (live.minute === 45) {
      live.paused = true;
      live.queue = [];
      live.line = "Перерыв. Можно поменять схему и отправить на поле свежих игроков.";
      set({ live: { ...live } });
      return;
    }
    if (live.minute >= 90) {
      live.done = true;
      live.menu = false;
      live.line = "Финальный свисток. Матч закончен, оценки уже у аналитиков.";
      settle(save, live, true);
      commit(set, save, { live: { ...live } });
      return;
    }
    set({ live: { ...live } });
  },

  resumeHalf: () => {
    const save = get().save;
    const live = get().live;
    if (!save || !live || live.done || live.events.some((e) => e.kind === "ht")) return;
    const made = applyQueued(save, live, "В перерыве");
    const text = made || "Команды выходят на второй тайм.";
    live.events = [...live.events, { min: 45, text, kind: "ht" }];
    live.line = text;
    live.paused = false;
    live.menu = false;
    live.userPause = false;
    live.queue = [];
    set({ live: { ...live } });
  },

  pauseMatch: () => {
    const live = get().live;
    if (!live || live.done) return;
    live.userPause = true;
    live.line = "Пауза. Можно просимулировать дальше или снять команду: сопернику засчитают 3:0.";
    set({ live: { ...live } });
  },

  resumeSim: () => {
    const save = get().save;
    const live = get().live;
    if (!save || !live || live.done) return;
    const atHalf = live.minute === 45 && live.paused && !live.events.some((e) => e.kind === "ht");
    live.userPause = false;
    live.menu = false;
    if (atHalf) {
      get().resumeHalf();
      return;
    }
    live.paused = false;
    live.line = live.line.startsWith("Пауза.") ? "Игра продолжается." : live.line;
    set({ live: { ...live } });
  },

  forfeit: () => {
    const save = get().save;
    if (!save) return;
    const current = get().live;
    if (current && !current.done) {
      closeForfeit(set, save, current);
      return;
    }
    if (get().screen !== "match") return;
    const fx = userFixture(save);
    if (!fx || fx.played || fx.date !== save.date) return;
    const home = fx.home === save.clubId;
    const oppId = home ? fx.away : fx.home;
    const oppForm = clubTactics(oppId).formation;
    if (save.tactics.slots.filter(Boolean).length < 11) save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
    const live = emptyLive(fx.id, home, oppId, [...save.tactics.slots], autoXi(save, oppId, oppForm), oppForm);
    closeForfeit(set, save, live);
  },

  queueSub: (outId, inId) => {
    const live = get().live;
    const save = get().save;
    if (!live || !save || live.done) return;
    if (live.subsUsed + live.pending.length >= 5) return;
    if (!live.xi.includes(outId) || live.xi.includes(inId)) return;
    if (live.pending.some((s) => s.out === outId || s.in === inId)) return;
    const inn = save.players.find((p) => p.id === inId);
    const out = save.players.find((p) => p.id === outId);
    live.pending = [...live.pending, { out: outId, in: inId }];
    live.line = `${out?.last ?? "Игрок"} ждёт остановки, ${inn?.last ?? "запасной"} уже греется у бровки.`;
    set({ live: { ...live } });
  },

  toggleMenu: (open) => {
    const live = get().live;
    if (!live) return;
    live.menu = open ?? !live.menu;
    set({ live: { ...live } });
  },

  advanceDay: () => {
    const save = get().save;
    if (!save) return;
    advanceTo(save, addOne(save.date), true);
    checkSack(save);
    commit(set, save, { screen: save.sacked ? "sacked" : get().screen, live: null });
  },

  toNextMatch: () => {
    get().toMatch();
  },

  offerBid: (playerId, fee) => {
    const save = get().save;
    if (!save) return;
    if (!save.players.some((p) => p.id === playerId)) adoptMarketPlayer(save, playerId);
    const note = bid(save, playerId, fee);
    commit(set, save, { notice: note || `Сделка закрыта · ${dollarText(fee)}` });
  },

  accept: (id) => {
    const save = get().save;
    if (!save) return;
    const note = acceptOffer(save, id);
    commit(set, save, { notice: note || "Игрок продан" });
  },

  reject: (id) => {
    const save = get().save;
    if (!save) return;
    rejectOffer(save, id);
    commit(set, save);
  },

  closeSeason: () => {
    const save = get().save;
    if (!save) return;
    finishSeason(save);
    save.tactics.slots = autoXi(save, save.clubId, save.tactics.formation);
    const playoff = save.phase === "playoff";
    commit(set, save, {
      screen: save.sacked ? "sacked" : playoff ? "desk" : "inbox",
      notice: playoff ? "Квалификация назначена — сыграйте стыки" : "Новый сезон открыт",
    });
  },

  job: (clubId) => {
    const save = get().save;
    if (!save) return;
    takeJob(save, clubId);
    save.tactics.slots = autoXi(save, clubId, save.tactics.formation);
    const league = save.clubs.find((c) => c.id === clubId)?.league ?? "rpl";
    commit(set, save, { screen: "desk", league });
  },

  read: (id) => {
    const save = get().save;
    if (!save) return;
    const msg = save.inbox.find((m) => m.id === id);
    if (msg) msg.read = true;
    commit(set, save);
  },

  list: (playerId) => {
    const save = get().save;
    if (!save) return;
    const p = save.players.find((x) => x.id === playerId);
    if (!p || p.clubId !== save.clubId) return;
    p.listed = !p.listed;
    commit(set, save, { notice: p.listed ? "Выставлен на трансфер" : "Снят с трансфера" });
  },

  renew: (playerId, years, wage, clause) => {
    const save = get().save;
    if (!save) return;
    const err = renewContract(save, playerId, years, wage, clause);
    commit(set, save, { notice: err || "Контракт подписан" });
  },

  scout: (league) => {
    const save = get().save;
    if (!save) return;
    materializeLeague(save, league);
    commit(set, save);
  },

  setOption: (patch) => {
    const save = get().save;
    if (!save) return;
    if (patch.difficulty) save.difficulty = patch.difficulty;
    if (patch.matchMins) save.matchMins = patch.matchMins;
    commit(set, save);
  },

  wipeCareer: () => {
    memory.slots[memory.active] = null;
    persistFolder();
    set({ folder: snapshot(), save: null, screen: "boot", live: null, draft: null, playerId: null, notice: "Карьера удалена. Заслуги этого кабинета остались." });
  },

  dismissTrophy: () => set({ cutscene: null }),
}));

function addOne(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function settle(save: Save, live: Live, watched: boolean, technical = false) {
  const fx = save.fixtures.find((f) => f.id === live.fixtureId);
  if (!fx || fx.played) return;
  fx.hg = live.hg;
  fx.ag = live.ag;
  fx.played = true;
  noteEuroResult(save, fx);
  const gf = live.home ? live.hg : live.ag;
  const ga = live.home ? live.ag : live.hg;
  const ratings: Record<string, number> = {};
  const played = Object.entries(live.mins)
    .filter(([id, m]) => m >= 15 && save.players.some((p) => p.id === id && p.clubId === save.clubId))
    .map(([id]) => id);
  const pool = technical ? played : played.length ? played : live.xi;
  if (!technical) {
    for (const id of live.xi) {
      const scored = live.events.filter((e) => e.kind === "goal" && e.pid === id).length;
      const booked = live.events.some((e) => e.kind === "card" && e.pid === id);
      let rating = 6.4 + scored * 0.9 + (Math.random() * 0.5 - 0.15);
      if (booked) rating -= 0.4;
      if (id === live.xi[0] && ga === 0) rating += 0.6;
      ratings[id] = Math.max(4.5, Math.min(9.6, Math.round(rating * 10) / 10));
    }
    for (const id of played) if (ratings[id] == null) ratings[id] = 6.5;
  } else {
    for (const id of pool) ratings[id] = 5.6;
  }
  live.ratings = ratings;
  const goals = live.events.filter((e) => e.kind === "goal" && e.pid && pool.includes(e.pid)).map((e) => e.pid!);
  const cards = live.events.filter((e) => e.kind === "card" && e.pid && pool.includes(e.pid)).map((e) => e.pid!);
  if (pool.length) applyMatchLoad(save, pool, goals, cards, ratings);
  const grew: string[] = [];
  const fell: string[] = [];
  for (const id of pool) {
    const delta = growFromMatch(save, id, ratings[id] ?? 6.6, live.mins[id] ?? (watched ? 70 : 80), !watched);
    const p = save.players.find((x) => x.id === id);
    if (delta > 0 && p) grew.push(`${p.last} ${p.ovr}`);
    if (delta < 0 && p) fell.push(`${p.last} ${p.ovr}`);
  }
  if (!technical) {
    for (const e of live.events) {
      if (e.kind === "info" && e.pid && live.xi.includes(e.pid) && e.text.includes("прихрамывает")) {
        const p = save.players.find((x) => x.id === e.pid);
        if (p && Math.random() < 0.45) p.injured = 10 + Math.floor(Math.random() * 18);
      }
    }
  }
  moraleSwing(save, save.clubId, gf, ga, live.home);
  save.played++;
  save.focus = null;
  const opp = clubById(save.clubs, live.oppId);
  save.log.unshift(technical ? `0:3 т.п. с «${opp?.name ?? ""}»` : `${gf}:${ga} с «${opp?.name ?? ""}»`);
  flushOthers(save, save.date);
  const { place } = placeOf(save);
  pushMsg(
    save,
    "Протокол",
    technical ? `Техническое поражение 0:3 — ${opp?.name ?? "соперник"}` : `${gf}:${ga} — ${opp?.name ?? "соперник"}`,
    technical
      ? `Команда не доиграла матч. В протоколе 3:0 в пользу соперника. Место в таблице: ${place}. Доверие совета: ${save.confidence}.`
      : `Место в таблице: ${place}. xG ${live.xgH.toFixed(2)}:${live.xgA.toFixed(2)}. Доверие совета: ${save.confidence}.${grew.length ? ` Рейтинг вырос: ${grew.join(", ")}.` : ""}${fell.length ? ` Рейтинг просел: ${fell.join(", ")}.` : ""}`,
  );
  checkSack(save);
  void wageBill;
  void report;
}

function closeForfeit(set: (p: Partial<State>) => void, save: Save, live: Live) {
  live.hg = live.home ? 0 : 3;
  live.ag = live.home ? 3 : 0;
  live.minute = 90;
  live.done = true;
  live.paused = false;
  live.menu = false;
  live.userPause = false;
  live.technical = true;
  live.queue = [];
  live.pending = [];
  live.line = "Техническое поражение. Официальный счёт — 3:0 в пользу соперника.";
  live.events = [...live.events, { min: 90, text: "Арбитр фиксирует техническое поражение: сопернику засчитана победа 3:0.", kind: "ft" }];
  settle(save, live, false, true);
  commit(set, save, { live: { ...live }, screen: "match" });
}

export { report, userFixture, seasonDone, wageBill, placeOf };

function plans(save: Save, live: Live) {
  const opp = clubTactics(live.oppId);
  const homePlan = live.home
    ? { ids: [...live.xi], formation: save.tactics.formation, tactics: save.tactics, clubId: save.clubId }
    : { ids: [...live.oppXi], formation: live.oppForm, tactics: opp, clubId: live.oppId };
  const awayPlan = live.home
    ? { ids: [...live.oppXi], formation: live.oppForm, tactics: opp, clubId: live.oppId }
    : { ids: [...live.xi], formation: save.tactics.formation, tactics: save.tactics, clubId: save.clubId };
  return { homePlan, awayPlan };
}

function fillChunk(save: Save, live: Live) {
  const cap = live.minute < 45 ? 45 : 90;
  const from = Math.max(1, live.minute);
  const to = Math.min(cap, from + 4);
  const { homePlan, awayPlan } = plans(save, live);
  const score = { h: live.hg, a: live.ag };
  const seg = simulateSegment(save, homePlan, awayPlan, from, Math.max(from + 1, to), live.fixtureId + ":" + from + ":" + live.subsUsed, score);
  live.queue.push(...seg.events);
  live.xgH += seg.xgH;
  live.xgA += seg.xgA;
  if (!seg.events.length) {
    live.queue.push({
      min: Math.min(to, from + 1),
      text: "Мяч гуляет между линиями, команды не торопятся и ждут ошибку в опорной зоне.",
      kind: "info",
      side: live.side,
    });
  }
}

function queueOpp(save: Save, live: Live) {
  const tired = live.oppXi
    .map((id) => ({ id, mins: live.mins[id] ?? 0, p: save.players.find((pl) => pl.id === id) }))
    .filter((x) => x.p && x.p.pos !== "GK")
    .sort((a, b) => a.p!.cond - b.p!.cond || b.mins - a.mins)[0];
  if (!tired) return;
  const bench = save.players
    .filter((p) => p.clubId === live.oppId && !live.oppXi.includes(p.id) && p.injured <= 0 && p.ban <= 0)
    .sort((a, b) => overall(b) - overall(a));
  const inn = bench[0];
  if (!inn || live.oppPending.some((s) => s.out === tired.id)) return;
  live.oppPending.push({ out: tired.id, in: inn.id });
}

function applyQueued(save: Save, live: Live, reason: string) {
  const bits: string[] = [];
  const mine = live.pending[0];
  if (mine && live.subsUsed < 5) {
    live.pending = live.pending.slice(1);
    const i = live.xi.indexOf(mine.out);
    if (i >= 0) {
      live.xi[i] = mine.in;
      live.subsUsed += 1;
      const a = save.players.find((p) => p.id === mine.out);
      const b = save.players.find((p) => p.id === mine.in);
      bits.push(`${a?.last ?? "Игрок"} уходит к скамейке, ${b?.last ?? "запасной"} выходит и сразу вступает в игру`);
      save.tactics.slots = [...live.xi];
    }
  }
  const opp = live.oppPending[0];
  if (opp && live.oppSubs < 4) {
    live.oppPending = live.oppPending.slice(1);
    const i = live.oppXi.indexOf(opp.out);
    if (i >= 0) {
      live.oppXi[i] = opp.in;
      live.oppSubs += 1;
      const a = save.players.find((p) => p.id === opp.out);
      const b = save.players.find((p) => p.id === opp.in);
      const club = save.clubs.find((c) => c.id === live.oppId)?.short ?? "соперник";
      bits.push(`у «${club}» ${a?.last ?? "игрок"} покидает поле, вместо него выходит ${b?.last ?? "запасной"}`);
    }
  }
  if (!bits.length) return "";
  const text = `${pauseWord(reason)}. ${bits.join("; ")}.`;
  live.events = [...live.events, { min: live.minute, text, kind: "sub" }];
  live.queue = [];
  return text;
}

function pauseWord(reason: string) {
  const t = reason.toLowerCase();
  if (t.includes("перерыв")) return "Перерыв";
  if (t.includes("угловой")) return "Угловой";
  if (t.includes("аут") || t.includes("боков")) return "Аут";
  if (t.includes("от ворот")) return "Удар от ворот";
  if (t.includes("штрафн") || t.includes("фол")) return "Штрафной";
  if (t.includes("карточ")) return "После карточки";
  if (t.includes("гол") || t.includes("сетк") || t.includes("счёт") || t.includes("табло")) return "После гола";
  if (t.includes("прихрам")) return "Пауза";
  return "Остановка";
}

function loadFolder(): Folder {
  if (!openWebStorage()) return emptyFolder();
  try {
    const own = readFolder(readRaw(folderKey()));
    if (own) return own;
    const legacy = readFolder(readRaw(LEGACY));
    if (legacy) {
      writeRaw(folderKey(), JSON.stringify(legacy));
      removeRaw(LEGACY);
      return legacy;
    }
    const old = readRaw(OLD);
    if (old) {
      const save = migrate(JSON.parse(old) as Save);
      if (save?.clubId) {
        const slots = [{ save }, null, null] as Folder["slots"];
        const folder: Folder = { v: 2, active: 0, slots, glory: mergeGlory([], slots) };
        writeRaw(folderKey(), JSON.stringify(folder));
        removeRaw(OLD);
        return folder;
      }
    }
  } catch {
    /* пустая папка */
  }
  return emptyFolder();
}

function readFolder(raw: string | null): Folder | null {
  if (!raw) return null;
  const parsed = JSON.parse(raw) as Folder;
  if (parsed?.slots?.length !== 3) return null;
  const slots = parsed.slots.map((s) => (s?.save?.clubId ? { save: migrate(s.save) } : null)) as Folder["slots"];
  const glory = mergeGlory(parsed.glory ?? [], slots);
  return { v: 2, active: Math.min(2, Math.max(0, parsed.active || 0)), slots, glory };
}

function mergeGlory(saved: Glory[], slots: Folder["slots"]) {
  const out = [...saved];
  for (const slot of slots) {
    if (!slot?.save) continue;
    for (const g of fromLog(slot.save)) {
      if (!out.some((x) => sameGlory(x, g))) out.push(g);
    }
  }
  return out;
}

function migrate(raw: Save): Save {
  const save = raw;
  const club = save.clubs?.find((c) => c.id === save.clubId);
  if (!save.kit && club) save.kit = { home: autoKit(club, "home"), away: autoKit(club, "away") };
  if (!save.players) save.players = [];
  for (const p of save.players) {
    if (!p.ovr) {
      p.ovr = overall(p);
      p.pot = p.age <= 23 ? Math.min(88, p.ovr + 6) : p.age >= 30 ? p.ovr : p.ovr + 2;
      p.growth = 0;
    }
    const side = save.clubs.find((c) => c.id === p.clubId);
    if (side?.league === "media") {
      const anchor: Record<string, number> = { d2rots: 74, amkal: 72, broke: 71, fk10: 70, lit: 69, rodmedia: 68, fight: 66, matchtv: 64 };
      const base = anchor[side.id] ?? 66;
      if (p.ovr < base - 8) p.ovr = base - (hash(p.id) % 4);
    }
    if (side && p.ovr) p.value = priceRub(p.ovr, p.age, side.league, side.rep);
  }
  if (!save.cup) save.cup = freshCup();
  if (!save.euro) save.euro = freshEuro();
  if (!save.phase) save.phase = "season";
  if (save.badSeasons == null) save.badSeasons = 0;
  if (!save.log) save.log = [];
  if (!save.manager) save.manager = "Тренер";
  if (!save.difficulty) save.difficulty = "experienced";
  if (save.matchMins !== 2 && save.matchMins !== 3 && save.matchMins !== 5) save.matchMins = 2;
  if (save.tactics) {
    const style = save.tactics.style as string;
    if (style === "pass") save.tactics.style = "tiki";
    if (!["tiki", "bus", "counter", "direct", "gegen", "wing", "vertical"].includes(save.tactics.style)) save.tactics.style = "tiki";
  }
  save.v = 3;
  return save;
}
