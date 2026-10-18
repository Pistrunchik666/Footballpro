import { hash, rng } from "./generate";
import type { LeagueId, Player, Pos, Save } from "./types";

export type Wish = "all" | "tec" | "strn" | "pac" | "sho" | "pas" | "def";

export type Nation = {
  id: string;
  country: string;
  league: string;
  band: [number, number];
  star: number;
  priceK: number;
  top: boolean;
  inGame?: LeagueId;
};

/** Топ-15 на сезон 2026/27 и чемпионаты, которые уже идут в карьере. Рейтинг — уровень FC 27; если лиги в той шкале нет, ближайший уровень Football Manager. */
export const NATIONS: Nation[] = [
  { id: "eng", country: "Англия", league: "Премьер-лига", band: [74, 83], star: 91, priceK: 2.8, top: true },
  { id: "esp", country: "Испания", league: "Ла Лига", band: [73, 82], star: 90, priceK: 2.4, top: true },
  { id: "ita", country: "Италия", league: "Серия A", band: [73, 81], star: 89, priceK: 2.2, top: true },
  { id: "ger", country: "Германия", league: "Бундеслига", band: [72, 81], star: 89, priceK: 2.15, top: true },
  { id: "fra", country: "Франция", league: "Лига 1", band: [71, 80], star: 88, priceK: 1.85, top: true },
  { id: "por", country: "Португалия", league: "Примейра", band: [70, 79], star: 86, priceK: 1.45, top: true, inGame: "por" },
  { id: "ned", country: "Нидерланды", league: "Эредивизи", band: [69, 78], star: 85, priceK: 1.35, top: true, inGame: "ned" },
  { id: "bra", country: "Бразилия", league: "Серия A", band: [70, 79], star: 87, priceK: 1.5, top: true, inGame: "bra" },
  { id: "arg", country: "Аргентина", league: "Примера", band: [69, 78], star: 86, priceK: 1.2, top: true },
  { id: "bel", country: "Бельгия", league: "Про-лига", band: [68, 77], star: 84, priceK: 1.15, top: true, inGame: "bel" },
  { id: "tur", country: "Турция", league: "Суперлига", band: [68, 76], star: 84, priceK: 1.25, top: true, inGame: "tur" },
  { id: "mex", country: "Мексика", league: "Лига MX", band: [67, 75], star: 82, priceK: 0.85, top: true },
  { id: "usa", country: "США", league: "MLS", band: [66, 74], star: 80, priceK: 0.9, top: true },
  { id: "sco", country: "Шотландия", league: "Премьершип", band: [66, 74], star: 82, priceK: 0.7, top: true },
  { id: "aut", country: "Австрия", league: "Бундеслига", band: [66, 74], star: 80, priceK: 0.65, top: true, inGame: "aut" },
  { id: "den", country: "Дания", league: "Суперлига", band: [66, 73], star: 79, priceK: 0.62, top: false, inGame: "den" },
  { id: "gre", country: "Греция", league: "Суперлига", band: [65, 73], star: 80, priceK: 0.58, top: false, inGame: "gre" },
  { id: "pol", country: "Польша", league: "Экстракласса", band: [65, 73], star: 79, priceK: 0.55, top: false, inGame: "pol" },
  { id: "srb", country: "Сербия", league: "Суперлига", band: [65, 73], star: 80, priceK: 0.5, top: false, inGame: "srb" },
  { id: "rpl", country: "Россия", league: "РПЛ", band: [70, 80], star: 84, priceK: 1, top: false, inGame: "rpl" },
  { id: "fnl", country: "Россия", league: "Первая лига", band: [64, 72], star: 75, priceK: 0.42, top: false, inGame: "fnl" },
  { id: "fnl2", country: "Россия", league: "ФНЛ-2", band: [58, 68], star: 71, priceK: 0.18, top: false, inGame: "fnl2" },
  { id: "fnl3", country: "Россия", league: "ФНЛ-3", band: [54, 64], star: 68, priceK: 0.1, top: false, inGame: "fnl3" },
  { id: "media", country: "Россия", league: "Медийная лига", band: [62, 74], star: 76, priceK: 0.22, top: false, inGame: "media" },
  { id: "amateur", country: "Россия", league: "Любители", band: [50, 60], star: 64, priceK: 0.05, top: false, inGame: "amateur" },
];

const FIRST: Record<string, string[]> = {
  eng: ["Джеймс", "Гарри", "Деклан", "Букайо", "Коул", "Джордан", "Маркус", "Филан"],
  esp: ["Педро", "Алехандро", "Нико", "Мартин", "Унаи", "Ферран", "Айтор", "Яго"],
  ita: ["Марко", "Лоренцо", "Николо", "Давиде", "Федерико", "Алессио", "Маттео", "Сандро"],
  ger: ["Йозуа", "Флориан", "Джамал", "Никлас", "Леон", "Юлиан", "Макс", "Паскаль"],
  fra: ["Орельен", "Варрен", "Эдуардо", "Адриен", "Майк", "Бредли", "Тео", "Кастильо"],
  arg: ["Тиаго", "Энцо", "Хулиан", "Науэль", "Эсекьель", "Лисандро", "Николас", "Валентин"],
  mex: ["Сесар", "Луис", "Хорхе", "Эрик", "Уриэль", "Хосе", "Диего", "Рикардо"],
  usa: ["Кристиан", "Джованни", "Мэтт", "Тайлер", "Брендан", "Уокер", "Рикардо", "Айдан"],
  sco: ["Каллум", "Скотт", "Льюис", "Джон", "Эндрю", "Билли", "Кевин", "Райан"],
};

const LAST: Record<string, string[]> = {
  eng: ["Райс", "Стоун", "Уайт", "Палмер", "Гордон", "Боуэн", "Галлахер", "Мэдден"],
  esp: ["Гарсия", "Руис", "Молина", "Серра", "Наварро", "Иглесиас", "Коста", "Понс"],
  ita: ["Риччи", "Бьянки", "Греко", "Руссо", "Ферри", "Конти", "Ломбарди", "Витале"],
  ger: ["Брандт", "Зуле", "Киммих", "Вольф", "Хофманн", "Шлоттербек", "Фюллькруг", "Нмеча"],
  fra: ["Кунде", "Шерки", "Тюрам", "Камавинга", "Диуф", "Оливье", "Баркола", "Заир"],
  arg: ["Альмада", "Фернандес", "Мартинес", "Ромеро", "Паредес", "Альварес", "Молина", "Сото"],
  mex: ["Санчес", "Эррера", "Васкес", "Мора", "Хименес", "Рейес", "Очоа", "Гусман"],
  usa: ["Пулишич", "Адамс", "Маккензи", "Робинсон", "Пепи", "Тилман", "Буссьо", "Скардуччи"],
  sco: ["Мактоминей", "Робертсон", "Макгрегор", "Тирни", "Фергюсон", "Армстронг", "Дайкс", "Паттерсон"],
};

const POS: Pos[] = ["GK", "DR", "DC", "DC", "DL", "DM", "MC", "MC", "AM", "MR", "ML", "ST", "ST", "DC", "MC"];

const cache = new Map<string, Player[]>();

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function priceMillionRub(ovr: number, age: number, priceK: number) {
  const base = Math.pow(1.13, ovr - 60);
  const ageK = age <= 21 ? 1.55 : age <= 23 ? 1.28 : age <= 26 ? 1.05 : age <= 28 ? 0.82 : age <= 30 ? 0.55 : age <= 32 ? 0.32 : 0.18;
  const euro = Math.max(0.05, base * ageK * priceK);
  return Math.max(2, Math.round(euro * 100));
}

export function nationPlayers(id: string): Player[] {
  const hit = cache.get(id);
  if (hit) return hit;
  const nation = NATIONS.find((n) => n.id === id);
  if (!nation || nation.inGame) {
    cache.set(id, []);
    return [];
  }
  const r = rng(hash("market:" + id));
  const firsts = FIRST[id] ?? FIRST.eng!;
  const lasts = LAST[id] ?? LAST.eng!;
  const used = new Set<string>();
  const players: Player[] = [];
  for (let i = 0; i < 32; i++) {
    const pos = i < 2 ? "GK" : POS[i % POS.length]!;
    const star = i < 2 ? nation.star - (pos === "GK" ? 2 : 0) : i < 8 ? nation.band[1] : nation.band[0] + Math.floor(r() * (nation.band[1] - nation.band[0]));
    const ovr = clamp(star + Math.round((r() - 0.5) * (i < 2 ? 1 : 3)), 54, 93);
    const age = i < 2 ? 24 + Math.floor(r() * 6) : 18 + Math.floor(r() * 14);
    let first = firsts[Math.floor(r() * firsts.length)]!;
    let last = lasts[Math.floor(r() * lasts.length)]!;
    let guard = 0;
    while (used.has(`${first}|${last}`) && guard++ < 12) {
      first = firsts[Math.floor(r() * firsts.length)]!;
      last = lasts[Math.floor(r() * lasts.length)]! + (guard > 6 ? ` ${guard}` : "");
    }
    used.add(`${first}|${last}`);
    const mid = clamp((ovr - 30) / 3.05, 8, 19);
    const a = (bias: number) => clamp(Math.round(mid + bias + (r() - 0.5) * 2.4), 6, 20);
    const value = priceMillionRub(ovr, age, nation.priceK);
    players.push({
      id: `mkt-${id}-${i}`,
      clubId: `pool:${id}`,
      first,
      last,
      age,
      nat: nation.country,
      pos,
      foot: r() < 0.24 ? "Лев" : "Прав",
      pac: a(pos === "MR" || pos === "ML" || pos === "ST" ? 1.2 : pos === "DC" ? -1 : 0),
      sta: a(0),
      strn: a(pos === "DC" || pos === "ST" ? 1 : 0),
      def: a(pos === "DC" || pos === "DM" || pos === "DR" || pos === "DL" ? 1.6 : -0.8),
      pas: a(pos === "MC" || pos === "AM" || pos === "DM" ? 1.3 : 0),
      tec: a(pos === "AM" || pos === "MC" ? 1.4 : 0.2),
      sho: a(pos === "ST" || pos === "AM" ? 1.8 : -0.6),
      men: a(age > 28 ? 1 : 0),
      gk: pos === "GK" ? a(2) : a(-6),
      cond: 80 + Math.floor(r() * 16),
      sharp: 60 + Math.floor(r() * 25),
      mor: 60 + Math.floor(r() * 25),
      wage: Math.max(12, Math.round(value * 0.9)),
      value,
      contract: 1 + Math.floor(r() * 4),
      number: i === 0 ? 1 : 2 + ((i * 7) % 97),
      injured: 0,
      goals: Math.floor(r() * (pos === "ST" ? 14 : 4)),
      assists: Math.floor(r() * 8),
      apps: 10 + Math.floor(r() * 24),
      ratingSum: 0,
      yellow: 0,
      ban: 0,
      listed: true,
      ovr,
      pot: age <= 23 ? Math.min(93, ovr + 3 + Math.floor(r() * 4)) : ovr,
      growth: 0,
    });
  }
  cache.set(id, players);
  return players;
}

export function peek(id: string): Player | undefined {
  if (!id.startsWith("mkt-")) return undefined;
  const nation = id.split("-")[1] ?? "";
  return nationPlayers(nation).find((p) => p.id === id);
}

export function adoptMarketPlayer(save: Save, id: string): Player | undefined {
  const have = save.players.find((p) => p.id === id);
  if (have) return have;
  const found = peek(id);
  if (!found) return undefined;
  const copy = { ...found };
  save.players.push(copy);
  return copy;
}

export function originOf(save: Save, p: Player) {
  if (p.clubId.startsWith("pool:")) {
    const n = NATIONS.find((x) => p.clubId === `pool:${x.id}`);
    return n ? n.country : p.nat;
  }
  const club = save.clubs.find((c) => c.id === p.clubId);
  if (!club) return p.nat;
  const n = NATIONS.find((x) => x.inGame === club.league);
  return n ? n.country : p.nat;
}

export function fitsWish(p: Player, wish: Wish) {
  if (wish === "all") return true;
  const v = wish === "tec" ? p.tec : wish === "strn" ? p.strn : wish === "pac" ? p.pac : wish === "sho" ? p.sho : wish === "pas" ? p.pas : p.def;
  return v >= 15;
}

export function marketRows(save: Save, nationId: string): Player[] {
  const take = (list: Player[]) =>
    list.filter((p) => {
      const owned = save.players.find((x) => x.id === p.id);
      if (owned && owned.clubId === save.clubId) return false;
      if (owned && !owned.clubId.startsWith("pool:") && owned.clubId !== "free") return p.clubId !== save.clubId;
      return true;
    });

  if (nationId === "all") {
    const external = NATIONS.filter((n) => !n.inGame).flatMap((n) => nationPlayers(n.id));
    const loaded = save.players.filter((p) => p.clubId !== save.clubId);
    const ids = new Set(loaded.map((p) => p.id));
    return [...loaded, ...external.filter((p) => !ids.has(p.id))];
  }
  const nation = NATIONS.find((n) => n.id === nationId);
  if (!nation) return [];
  if (nation.inGame) {
    const ids = new Set(save.clubs.filter((c) => c.league === nation.inGame).map((c) => c.id));
    return save.players.filter((p) => ids.has(p.clubId) && p.clubId !== save.clubId);
  }
  return take(nationPlayers(nation.id)).map((p) => save.players.find((x) => x.id === p.id) ?? p);
}
