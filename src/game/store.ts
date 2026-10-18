import { create } from "zustand";
import { setSoundEnabled } from "@/game/audio";
import {
  beginPending,
  canJoin,
  finishKick,
  newCareer,
  nextUserFixture,
  prepareRound,
  simulateSeason,
  simulateUserMatch,
  startNextSeason,
  table,
} from "@/game/career";
import {
  clubById,
  CLUBS,
  kitColor,
  kitsClash,
  pickGkColor,
  shortsFor,
} from "@/game/clubs";
import { layoutForCareer, layoutForLevel, layoutTraining } from "@/game/layout";
import { bus, armMatch, world } from "@/game/runtime";
import { activeFile, asFile, freshFile, loadFolder, SLOT_COUNT, stamp, writeFolder } from "@/game/saves";
import type {
  CareerState,
  KitSide,
  LiveBoard,
  Mode,
  PendingMatch,
  ResultCard,
  SaveFolder,
  Screen,
  Settings,
} from "@/game/types";
import type { ResolveInfo } from "@/game/runtime";

export type Strip = {
  you: string;
  youShorts: string;
  opp: string;
  oppShorts: string;
  gk: string;
};

const ARCADE: Strip = {
  you: "#e7e2d6",
  youShorts: "#1a1c20",
  opp: "#3c4654",
  oppShorts: "#efece4",
  gk: "#e2b43a",
};

type Draft = ReturnType<typeof beginPending>;

type State = {
  folder: SaveFolder;
  screen: Screen;
  paused: boolean;
  mode: Mode;
  level: number;
  fkScore: number;
  fkGoals: number;
  career: CareerState | null;
  settings: Settings;
  result: ResultCard | null;
  live: LiveBoard | null;
  strip: Strip;
  draft: Draft | null;
  kitYou: KitSide;
  kitOpp: KitSide;
  note: string;
  confirmNew: boolean;
  continueGame: () => void;
  startFreekick: () => void;
  startTraining: () => void;
  openClubs: () => void;
  openHub: () => void;
  openSeason: () => void;
  openSaves: () => void;
  openMenu: () => void;
  pickClub: (id: string) => void;
  openKits: () => void;
  setKit: (who: "you" | "opp", side: KitSide) => void;
  confirmKits: () => void;
  togglePause: () => void;
  resume: () => void;
  restartKick: () => void;
  leaveToMenu: () => void;
  resolvePrimary: () => void;
  saveInto: (index: number) => void;
  loadSlot: (index: number) => void;
  clearSlot: (index: number) => void;
  exportSlot: (index: number) => void;
  importSlot: (index: number, raw: unknown) => void;
  newGame: () => void;
  askNewGame: () => void;
  toggleSound: () => void;
  toggleShake: () => void;
  simulateMatch: () => void;
  simulateRest: () => void;
  requestTransfer: (clubId: string) => void;
  stayOn: () => void;
  handleResolve: (info: ResolveInfo) => void;
};

const boot = loadFolder();
const bootFile = activeFile(boot);

export const useGame = create<State>((set, get) => ({
  folder: boot,
  screen: "menu",
  paused: false,
  mode: "freekick",
  level: bootFile.freekick.level,
  fkScore: bootFile.freekick.score,
  fkGoals: bootFile.freekick.goals,
  career: bootFile.career,
  settings: bootFile.settings,
  result: null,
  live: null,
  strip: ARCADE,
  draft: null,
  kitYou: "home",
  kitOpp: "home",
  note: "",
  confirmNew: false,

  continueGame: () => {
    const s = get();
    if (s.career?.pending) {
      resumePending();
      return;
    }
    if (s.career) {
      set({ screen: "hub", result: null, paused: false });
      sync();
      return;
    }
    get().startFreekick();
  },

  startFreekick: () => {
    const s = get();
    armMatch(layoutForLevel(s.level));
    set({
      screen: "match",
      mode: "freekick",
      paused: false,
      result: null,
      live: null,
      strip: ARCADE,
    });
    sync();
  },

  startTraining: () => {
    armMatch(layoutTraining());
    set({
      screen: "match",
      mode: "training",
      paused: false,
      result: null,
      live: null,
      strip: ARCADE,
    });
    sync();
  },

  openClubs: () => {
    set({ screen: "clubs", note: "", paused: false });
    sync();
  },

  openHub: () => {
    set({ screen: "hub", result: null, paused: false, note: "" });
    sync();
  },

  openSeason: () => {
    set({ screen: "season", result: null, paused: false });
    sync();
  },

  openSaves: () => {
    set({ screen: "saves", confirmNew: false, note: "" });
    sync();
  },

  openMenu: () => {
    set({ screen: "menu", paused: false, result: null, note: "" });
    sync();
  },

  pickClub: (id) => {
    const career = newCareer(id);
    set({ career, screen: "hub", note: "" });
    persist();
    sync();
  },

  openKits: () => {
    const s = get();
    if (!s.career) {
      set({ screen: "clubs" });
      return;
    }
    const fx = nextUserFixture(s.career);
    if (!fx) {
      set({ screen: "season" });
      sync();
      return;
    }
    const career = prepareRound(s.career, fx.round);
    const draft = beginPending(career, fx);
    const opp = clubById(fx.homeId === career.clubId ? fx.awayId : fx.homeId);
    const you = clubById(career.clubId);
    const pair = firstLegal(you.id, opp.id);
    set({ career, draft, screen: "kits", kitYou: pair[0], kitOpp: pair[1], paused: false, note: "" });
    persist();
    sync();
  },

  setKit: (who, side) => {
    if (who === "you") set({ kitYou: side });
    else set({ kitOpp: side });
  },

  confirmKits: () => {
    const s = get();
    if (!s.career || !s.draft) return;
    const fx = s.career.fixtures.find((f) => f.id === s.draft?.fixtureId);
    if (!fx) return;
    const you = clubById(s.career.clubId);
    const opp = clubById(fx.homeId === s.career.clubId ? fx.awayId : fx.homeId);
    const youColor = kitColor(you, s.kitYou);
    const oppColor = kitColor(opp, s.kitOpp);
    if (kitsClash(youColor, oppColor)) {
      set({ note: "Формы слишком похожи. Выбери инверсию." });
      return;
    }
    const pending: PendingMatch = {
      ...s.draft,
      youKit: s.kitYou,
      oppKit: s.kitOpp,
      youColor,
      oppColor,
      youShorts: shortsFor(youColor),
      oppShorts: shortsFor(oppColor),
      gkColor: pickGkColor(youColor, oppColor),
    };
    const career = { ...s.career, pending };
    const strip: Strip = {
      you: youColor,
      youShorts: pending.youShorts,
      opp: oppColor,
      oppShorts: pending.oppShorts,
      gk: pending.gkColor,
    };
    armMatch(layoutForCareer(opp.power, fx.seed));
    set({
      career,
      strip,
      screen: "match",
      mode: "career",
      paused: false,
      result: null,
      live: board(career, pending, pending.preHome, pending.preAway, false),
      note: "",
    });
    persist();
    sync();
  },

  togglePause: () => {
    const s = get();
    if (s.screen !== "match" || s.result) return;
    set({ paused: !s.paused });
    sync();
  },

  resume: () => {
    set({ paused: false });
    sync();
  },

  restartKick: () => {
    const s = get();
    if (s.result) return;
    if (s.mode === "training") armMatch(layoutTraining());
    else if (s.mode === "career" && s.career?.pending) {
      const fx = s.career.fixtures.find((f) => f.id === s.career?.pending?.fixtureId);
      const oppId = fx ? (fx.homeId === s.career.clubId ? fx.awayId : fx.homeId) : s.career.clubId;
      armMatch(layoutForCareer(clubById(oppId).power, fx?.seed ?? 1));
    } else armMatch(layoutForLevel(s.level));
    set({ paused: false, result: null });
    sync();
  },

  leaveToMenu: () => {
    set({ screen: "menu", paused: false, result: null });
    persist();
    sync();
  },

  resolvePrimary: () => {
    const s = get();
    const action = s.result?.action;
    if (action === "next-level" || action === "retry") {
      armMatch(layoutForLevel(s.level));
      set({ result: null, paused: false, screen: "match", mode: "freekick" });
    } else if (action === "training") {
      armMatch(layoutTraining());
      set({ result: null, paused: false, screen: "match", mode: "training" });
    } else if (action === "season") {
      set({ result: null, screen: "season", paused: false });
    } else {
      set({ result: null, screen: "hub", paused: false });
    }
    sync();
  },

  saveInto: (index) => {
    const s = get();
    const slots = s.folder.slots.slice();
    const current = snapshot(s);
    slots[index] = { ...current, name: `Слот ${index + 1}` };
    const folder = { ...s.folder, active: index, slots };
    writeFolder(folder);
    set({ folder, note: "Сохранено" });
  },

  loadSlot: (index) => {
    const slot = get().folder.slots[index];
    if (!slot) return;
    const folder = { ...get().folder, active: index };
    writeFolder(folder);
    set({
      folder,
      ...fromFile(slot),
      screen: "menu",
      result: null,
      paused: false,
      live: null,
      note: "Слот загружен",
    });
    sync();
  },

  clearSlot: (index) => {
    const slots = get().folder.slots.slice();
    slots[index] = null;
    let active = get().folder.active;
    if (active === index) {
      const other = slots.findIndex(Boolean);
      if (other >= 0) {
        active = other;
      } else {
        slots[0] = freshFile(0);
        active = 0;
      }
    }
    const folder = { version: 1 as const, active, slots };
    writeFolder(folder);
    const file = activeFile(folder);
    set({ folder, ...fromFile(file), screen: "saves", result: null, note: "Слот очищен" });
    sync();
  },

  exportSlot: (index) => {
    const slot = get().folder.slots[index];
    if (!slot || typeof document === "undefined") return;
    const blob = new Blob([JSON.stringify(slot)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `football-pro-slot-${index + 1}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importSlot: (index, raw) => {
    const file = asFile(raw, index);
    if (!file) {
      set({ note: "Файл сохранения не подошёл" });
      return;
    }
    const slots = get().folder.slots.slice();
    slots[index] = file;
    const folder = { ...get().folder, active: index, slots };
    writeFolder(folder);
    set({ folder, ...fromFile(file), screen: "saves", note: "Импортировано" });
    sync();
  },

  askNewGame: () => set({ confirmNew: !get().confirmNew }),

  newGame: () => {
    const s = get();
    const slots = s.folder.slots.slice();
    const file = freshFile(s.folder.active);
    file.settings = s.settings;
    slots[s.folder.active] = file;
    const folder = { ...s.folder, slots };
    writeFolder(folder);
    set({
      folder,
      ...fromFile(file),
      screen: "menu",
      result: null,
      paused: false,
      live: null,
      confirmNew: false,
      note: "",
    });
    sync();
  },

  toggleSound: () => {
    const settings = { ...get().settings, sound: !get().settings.sound };
    set({ settings });
    persist();
    sync();
  },

  toggleShake: () => {
    const settings = { ...get().settings, shake: !get().settings.shake };
    set({ settings });
    persist();
    sync();
  },

  simulateMatch: () => {
    const s = get();
    if (!s.career) return;
    const career = simulateUserMatch(s.career);
    const done = nextUserFixture(career) === null;
    set({ career, screen: done ? "season" : "hub", note: "Матч сыгран без вас" });
    persist();
    sync();
  },

  simulateRest: () => {
    const s = get();
    if (!s.career) return;
    const career = simulateSeason(s.career);
    set({ career, screen: "season", note: "Сезон доигран" });
    persist();
    sync();
  },

  requestTransfer: (clubId) => {
    const s = get();
    if (!s.career) return;
    const club = clubById(clubId);
    if (!canJoin(club, s.career)) {
      set({ note: `${club.name} отказал в трансфере` });
      return;
    }
    const career = startNextSeason(s.career, clubId);
    set({ career, screen: "hub", note: `Вы перешли в ${club.name}` });
    persist();
    sync();
  },

  stayOn: () => {
    const s = get();
    if (!s.career) return;
    const career = startNextSeason(s.career, s.career.clubId);
    set({ career, screen: "hub", note: "Новый сезон в том же клубе" });
    persist();
    sync();
  },

  handleResolve: (info) => {
    const s = get();
    if (s.mode === "career" && s.career?.pending) {
      const { career, summary } = finishKick(s.career, info.kind === "goal");
      const title = info.kind === "goal" ? (info.reason === "post-goal" ? "Гол со штанги" : "Гол") : reasonTitle(info.reason);
      const verdict = summary.points === 3 ? "Победа" : summary.points === 1 ? "Ничья" : "Поражение";
      const you = summary.youAreHome ? summary.home : summary.away;
      const them = summary.youAreHome ? summary.away : summary.home;
      const detail = summary.goal
        ? `${summary.minute}′ · ваш гол меняет счёт. ${verdict} ${you}:${them}, +${summary.points}`
        : `Удар не засчитан. ${verdict} ${you}:${them} против ${summary.opponent}. +${summary.points}`;
      set({
        career,
        live: s.live
          ? {
              ...s.live,
              homeGoals: summary.home,
              awayGoals: summary.away,
              ft: true,
              minute: 90,
              added: summary.added,
            }
          : s.live,
        result: {
          title,
          detail,
          score: `${summary.home} : ${summary.away}`,
          primary: summary.seasonDone ? "Итоги сезона" : "К таблице",
          action: summary.seasonDone ? "season" : "hub",
        },
      });
      persist();
      return;
    }
    if (s.mode === "training") {
      set({
        result: {
          title: info.kind === "goal" ? "Гол" : reasonTitle(info.reason),
          detail: "Тренировка не пишется в карьеру и в уровни.",
          score: "",
          primary: "Ещё удар",
          action: "training",
        },
      });
      return;
    }
    if (info.kind === "goal") {
      const passed = s.level;
      const level = Math.min(100, s.level + 1);
      const fkScore = s.fkScore + 100 + passed * 15;
      const fkGoals = s.fkGoals + 1;
      set({
        level,
        fkScore,
        fkGoals,
        result: {
          title: info.reason === "post-goal" ? "Гол со штанги" : "Гол",
          detail: passed >= 100 ? "Сотня закрыта. Можно бить дальше." : `Уровень ${passed} пройден`,
          score: String(fkScore),
          primary: passed >= 100 ? "Ещё удар" : `Уровень ${level}`,
          action: "next-level",
        },
      });
      persist();
      return;
    }
    set({
      result: {
        title: reasonTitle(info.reason),
        detail: `Уровень ${s.level}. Стенка, вратарь и створ на месте.`,
        score: String(s.fkScore),
        primary: "Ещё раз",
        action: "retry",
      },
    });
  },
}));

bus.onResolve = (info) => {
  useGame.getState().handleResolve(info);
};

function resumePending() {
  const s = useGame.getState();
  const career = s.career;
  const pending = career?.pending;
  if (!career || !pending) return;
  const fx = career.fixtures.find((f) => f.id === pending.fixtureId);
  if (!fx) return;
  const oppId = fx.homeId === career.clubId ? fx.awayId : fx.homeId;
  armMatch(layoutForCareer(clubById(oppId).power, fx.seed));
  useGame.setState({
    screen: "match",
    mode: "career",
    paused: false,
    result: null,
    strip: {
      you: pending.youColor,
      youShorts: pending.youShorts,
      opp: pending.oppColor,
      oppShorts: pending.oppShorts,
      gk: pending.gkColor,
    },
    live: board(career, pending, pending.preHome, pending.preAway, false),
  });
  sync();
}

function board(
  career: CareerState,
  pending: PendingMatch,
  homeGoals: number,
  awayGoals: number,
  ft: boolean,
): LiveBoard {
  const fx = career.fixtures.find((f) => f.id === pending.fixtureId);
  const home = clubById(fx?.homeId ?? career.clubId);
  const away = clubById(fx?.awayId ?? career.clubId);
  return {
    homeShort: home.short,
    awayShort: away.short,
    homeColor: home.color,
    awayColor: away.color,
    homeGoals,
    awayGoals,
    minute: pending.minute,
    added: pending.added,
    ft,
    youAreHome: fx?.homeId === career.clubId,
  };
}

function firstLegal(youId: string, oppId: string): [KitSide, KitSide] {
  const you = clubById(youId);
  const opp = clubById(oppId);
  const options: Array<[KitSide, KitSide]> = [
    ["home", "home"],
    ["home", "away"],
    ["away", "home"],
    ["away", "away"],
  ];
  return options.find(([a, b]) => !kitsClash(kitColor(you, a), kitColor(opp, b))) ?? ["home", "away"];
}

function fromFile(file: ReturnType<typeof activeFile>) {
  return {
    level: file.freekick.level,
    fkScore: file.freekick.score,
    fkGoals: file.freekick.goals,
    career: file.career,
    settings: file.settings,
  };
}

function snapshot(s: State) {
  const prev = s.folder.slots[s.folder.active] ?? freshFile(s.folder.active);
  return stamp(prev, {
    freekick: { level: s.level, score: s.fkScore, goals: s.fkGoals },
    career: s.career,
    settings: s.settings,
  });
}

function persist() {
  const s = useGame.getState();
  const slots = s.folder.slots.slice();
  if (!slots[s.folder.active]) slots[s.folder.active] = freshFile(s.folder.active);
  slots[s.folder.active] = snapshot({ ...s, folder: { ...s.folder, slots } });
  const folder = { ...s.folder, slots };
  writeFolder(folder);
  useGame.setState({ folder });
}

function sync() {
  const s = useGame.getState();
  world.screen = s.screen;
  world.paused = s.paused;
  world.sound = s.settings.sound;
  world.shake = s.settings.shake;
  setSoundEnabled(s.settings.sound);
}

export function ensurePlayable() {
  sync();
  const s = useGame.getState();
  if (s.screen !== "match" || world.layout) return;
  if (s.mode === "training") armMatch(layoutTraining());
  else if (s.mode === "career" && s.career) {
    const pending = s.career.pending;
    const fx = pending ? s.career.fixtures.find((f) => f.id === pending.fixtureId) : nextUserFixture(s.career);
    const oppId = fx ? (fx.homeId === s.career.clubId ? fx.awayId : fx.homeId) : s.career.clubId;
    armMatch(layoutForCareer(clubById(oppId).power, fx?.seed ?? 1));
  } else armMatch(layoutForLevel(s.level));
  sync();
}

export function saveNow() {
  persist();
}

function reasonTitle(reason: ResolveInfo["reason"]) {
  switch (reason) {
    case "save":
      return "Сейв";
    case "wide":
      return "Мимо";
    case "over":
      return "Выше";
    case "post":
      return "Штанга";
    case "bar":
      return "Перекладина";
    case "short":
      return "Не долетел";
    case "wall":
      return "Стенка";
    case "time":
      return "Не успел";
    case "post-goal":
      return "Гол со штанги";
    default:
      return "Гол";
  }
}

sync();

export function clashNow() {
  const s = useGame.getState();
  if (!s.career || !s.draft) return false;
  const fx = s.career.fixtures.find((f) => f.id === s.draft?.fixtureId);
  if (!fx) return false;
  const you = clubById(s.career.clubId);
  const opp = clubById(fx.homeId === s.career.clubId ? fx.awayId : fx.homeId);
  return kitsClash(kitColor(you, s.kitYou), kitColor(opp, s.kitOpp));
}

export function seasonRows() {
  const career = useGame.getState().career;
  return career ? table(career) : [];
}

export { CLUBS };
