import { CLUBS, FORMATIONS, wageCap } from "./clubs";
import { circle, doubleRound, freshCup, freshEuro, mediaInCup, registerFixtures, seedCompetitions } from "./competitions";
import type { Club, Fixture, FormationId, LeagueId, Player, Pos, Save, Tactics } from "./types";
import { styleOf } from "./tactics";
import { EXTRA, FOREIGN as FOREIGN_CLUBS, PACKS } from "./world";

const FIRST = ["Артём", "Иван", "Дмитрий", "Александр", "Никита", "Максим", "Егор", "Кирилл", "Даниил", "Андрей", "Михаил", "Сергей", "Павел", "Роман", "Илья", "Тимофей", "Матвей", "Владислав", "Денис", "Алексей", "Глеб", "Фёдор", "Олег", "Руслан", "Тимур", "Камиль", "Арсен", "Сослан", "Ибрагим", "Заур", "Степан", "Ярослав", "Богдан", "Марк", "Лев", "Пётр", "Назар", "Эдуард", "Вадим", "Игорь"];
const LAST = ["Иванов", "Петров", "Смирнов", "Кузнецов", "Попов", "Соколов", "Лебедев", "Козлов", "Новиков", "Морозов", "Волков", "Соловьёв", "Васильев", "Зайцев", "Павлов", "Семёнов", "Голубев", "Виноградов", "Богданов", "Воробьёв", "Фёдоров", "Михайлов", "Беляев", "Тарасов", "Белов", "Комаров", "Орлов", "Киселёв", "Макаров", "Андреев", "Ковалёв", "Ильин", "Гусев", "Титов", "Кузьмин", "Баранов", "Куликов", "Алексеев", "Степанов", "Яковлев", "Сорокин", "Сергеев", "Романов", "Захаров", "Борисов", "Королёв", "Герасимов", "Григорьев", "Егоров", "Никитин"];
const FOREIGN: [string, string, string][] = [
  ["Жоао", "Силва", "Бразилия"],
  ["Лукас", "Оливейра", "Бразилия"],
  ["Матеус", "Кошта", "Бразилия"],
  ["Педро", "Рибейро", "Бразилия"],
  ["Кайо", "Феррейра", "Бразилия"],
  ["Никола", "Йович", "Сербия"],
  ["Стефан", "Ковач", "Сербия"],
  ["Марко", "Петрович", "Сербия"],
  ["Эсекьель", "Ромеро", "Аргентина"],
  ["Факундо", "Диас", "Аргентина"],
  ["Кевин", "Мена", "Колумбия"],
  ["Хавьер", "Кастильо", "Колумбия"],
  ["Идрисса", "Траоре", "Мали"],
  ["Секу", "Конате", "Гвинея"],
  ["Эммануэль", "Ба", "Кот-д’Ивуар"],
  ["Достон", "Хакимов", "Узбекистан"],
  ["Артур", "Белоус", "Беларусь"],
  ["Еркебулан", "Сейдахмет", "Казахстан"],
  ["Хорен", "Баяндур", "Армения"],
  ["Георгий", "Беридзе", "Грузия"],
  ["Бабакар", "Диалло", "Сенегал"],
  ["Мусса", "Ньянг", "Гана"],
];

const SHIRT: Pos[] = ["GK", "GK", "DR", "DR", "DL", "DL", "DC", "DC", "DC", "DM", "DM", "MC", "MC", "MC", "AM", "AM", "MR", "ML", "ST", "ST"];

export function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(r: () => number, arr: T[]) {
  return arr[Math.floor(r() * arr.length)]!;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function attr(r: () => number, base: number, spread = 1.7) {
  return clamp(Math.round(base + (r() * 2 - 1) * spread), 4, 19);
}

export function addDays(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function weekday(iso: string) {
  return new Date(iso + "T12:00:00Z").getUTCDay();
}

export function isWinter(iso: string, season: number) {
  return iso >= `${season}-12-07` && iso < `${season + 1}-03-01`;
}

export function windowOpen(iso: string, season: number) {
  if (iso >= `${season}-06-15` && iso <= `${season}-09-12`) return true;
  if (iso >= `${season + 1}-01-20` && iso <= `${season + 1}-02-25`) return true;
  return false;
}

export function formatDate(iso: string) {
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  const d = new Date(iso + "T12:00:00Z");
  return `${days[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function money(n: number) {
  const v = Math.round(n * 10) / 10;
  if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(2)} млрд ₽`;
  return `${v.toLocaleString("ru-RU")} млн ₽`;
}

export function dollars(millionRub: number) {
  return Math.max(0, Math.round(Math.abs(millionRub) * 1_000_000 / 92));
}

export function dollarText(millionRub: number) {
  const sign = millionRub < 0 ? "-" : "";
  const body = String(dollars(millionRub)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}$${body}`;
}

export function rubFromDollars(usd: number) {
  return Math.round((Math.max(0, usd) * 92) / 1_000_000 * 10) / 10;
}

export function wageText(thousand: number) {
  if (thousand >= 1000) return `${(thousand / 1000).toFixed(2)} млн ₽/нед`;
  return `${Math.round(thousand)} тыс ₽/нед`;
}

function saturdays(season: number, count: number) {
  let d = `${season}-07-18`;
  while (weekday(d) !== 6) d = addDays(d, 1);
  const out: string[] = [];
  while (out.length < count && d < `${season + 1}-06-20`) {
    if (!isWinter(d, season)) out.push(d);
    d = addDays(d, 7);
  }
  return out;
}

export function makeLeagueFixtures(clubs: Club[], league: LeagueId, season: number, double: boolean): Fixture[] {
  const ids = clubs.filter((c) => c.league === league).map((c) => c.id);
  if (ids.length < 2) return [];
  const rounds = double && ids.length <= 20 ? doubleRound(ids) : circle(ids);
  const dates = saturdays(season, Math.max(rounds.length, 40));
  const fixtures: Fixture[] = [];
  rounds.forEach((pairs, round) => {
    const date = dates[round] ?? dates[dates.length - 1]!;
    pairs.forEach(([home, away], i) => {
      fixtures.push({
        id: `${league}-${season}-${round}-${i}`,
        league,
        round: round + 1,
        date,
        home,
        away,
        played: false,
        comp: "league",
        label: "Чемпионат",
      });
    });
  });
  return fixtures;
}

export function makeFixtures(clubs: Club[], season: number): Fixture[] {
  const leagues = [...new Set(clubs.map((c) => c.league))].filter((l) => l !== "euro");
  return leagues.flatMap((league) => makeLeagueFixtures(clubs, league, season, league !== "fnl3"));
}

registerFixtures(makeLeagueFixtures);

function valueOf(ovr: number, age: number, club: Club) {
  return priceRub(ovr, age, club.league, club.rep);
}

const PRICE_K: Partial<Record<LeagueId, number>> = {
  rpl: 1, fnl: 0.42, fnl2: 0.18, fnl3: 0.1, media: 0.2, amateur: 0.05,
  tur: 0.85, bra: 0.9, ned: 0.8, por: 0.72, bel: 0.55, gre: 0.42, srb: 0.3, pol: 0.34, aut: 0.4, den: 0.38, euro: 1.35,
};

export function priceEuro(ovr: number, age: number, league: LeagueId, rep = 70) {
  const base = Math.pow(1.13, ovr - 60);
  const ageK = age <= 21 ? 1.55 : age <= 23 ? 1.28 : age <= 26 ? 1.05 : age <= 28 ? 0.82 : age <= 30 ? 0.55 : age <= 32 ? 0.32 : 0.18;
  const leagueK = PRICE_K[league] ?? 0.5;
  const repK = 0.62 + Math.max(30, Math.min(95, rep)) / 180;
  return Math.max(0.02, Math.round(base * ageK * leagueK * repK * 100) / 100);
}

export function priceRub(ovr: number, age: number, league: LeagueId, rep = 70) {
  return Math.max(2, Math.round(priceEuro(ovr, age, league, rep) * 100));
}

export function euroText(rub: number) {
  const eur = rub / 100;
  return eur >= 1 ? `${eur.toFixed(1)} млн €` : `${Math.round(eur * 1000)} тыс €`;
}

function attrMark(p: Player) {
  if (p.pos === "GK") return clamp(p.gk * 0.72 + p.men * 0.16 + p.def * 0.12, 1, 20);
  const line = p.pos === "ST" || p.pos === "AM" || p.pos === "MR" || p.pos === "ML" ? p.sho * 0.3 + p.tec * 0.25 + p.pac * 0.25 + p.pas * 0.2 : p.pos === "DC" || p.pos === "DR" || p.pos === "DL" ? p.def * 0.45 + p.strn * 0.2 + p.pac * 0.15 + p.men * 0.2 : p.pas * 0.3 + p.tec * 0.25 + p.men * 0.2 + p.def * 0.15 + p.sta * 0.1;
  return clamp(line, 1, 20);
}

export function overall(p: Player) {
  if (p.ovr) return p.ovr;
  return clamp(Math.round(30 + attrMark(p) * 3.05), 44, 88);
}

export function catalog(): Club[] {
  return [...CLUBS, ...EXTRA, ...FOREIGN_CLUBS];
}

export function templateById(id: string): Club | undefined {
  return catalog().find((c) => c.id === id);
}

export function makePlayer(club: Club, index: number, pos: Pos, r: () => number, names?: Set<string>): Player {
  const pack = PACKS[club.league];
  const foreign = !pack && club.rep > 68 && r() < 0.34;
  let natPick = foreign ? pick(r, FOREIGN) : null;
  let first = pack ? pick(r, pack.first) : natPick ? natPick[0] : pick(r, FIRST);
  let last = pack ? pick(r, pack.last) : natPick ? natPick[1] : pick(r, LAST);
  if (names) {
    let guard = 0;
    while (names.has(`${first}|${last}`) && guard++ < 16) {
      natPick = foreign && r() < 0.5 ? pick(r, FOREIGN) : null;
      first = pack ? pick(r, pack.first) : natPick ? natPick[0] : pick(r, FIRST);
      last = pack ? pick(r, pack.last) : natPick ? natPick[1] : pick(r, LAST);
    }
    names.add(`${first}|${last}`);
  }
  const base = 6 + club.rep * 0.1;
  const age = pos === "GK" && r() < 0.4 ? 28 + Math.floor(r() * 7) : 18 + Math.floor(r() * 15);
  const youth = age <= 21 ? -1.1 : age >= 33 ? -0.8 : 0.35;
  const star = index >= 16 ? 1.3 : index >= 12 ? 0.4 : 0;
  const ca = base + youth + star;
  const def = attr(r, ca + (pos === "DC" || pos === "DM" ? 1.4 : pos === "GK" ? 0.4 : -0.6));
  const sho = attr(r, ca + (pos === "ST" ? 1.8 : pos === "AM" || pos === "MR" || pos === "ML" ? 0.7 : -1.4));
  const gk = pos === "GK" ? attr(r, ca + 1.5, 1.2) : attr(r, 3, 1);
  const ovrGuess = clamp(Math.round(30 + (pos === "GK" ? gk : (def + sho + ca) / 3) * 3.05), 44, 88);
  const pot = age <= 21 ? Math.min(88, ovrGuess + 6 + Math.floor(r() * 7)) : age <= 24 ? Math.min(86, ovrGuess + 3 + Math.floor(r() * 4)) : age <= 29 ? Math.min(86, ovrGuess + Math.floor(r() * 2)) : ovrGuess + (r() < 0.15 ? 1 : 0);
  let ovr = Math.min(ovrGuess, pot);
  if (club.league === "media") {
    const anchor: Record<string, number> = { d2rots: 74, amkal: 72, broke: 71, fk10: 70, lit: 69, rodmedia: 68, fight: 66, matchtv: 64 };
    const base = anchor[club.id] ?? 66;
    const bias = index < 3 ? 2 : index < 11 ? 0 : -4;
    ovr = Math.max(58, Math.min(78, base + bias + Math.round((r() - 0.5) * 3)));
  }
  const value = valueOf(ovr, age, club);
  return {
    id: `${club.id}-${index}-${Math.floor(r() * 9999)}`,
    clubId: club.id,
    first,
    last,
    age,
    nat: pack ? pack.nat : natPick ? natPick[2] : r() < 0.08 ? pick(r, ["Беларусь", "Казахстан", "Армения", "Узбекистан"]) : "Россия",
    pos,
    foot: r() < 0.22 ? "Лев" : "Прав",
    pac: attr(r, ca + (pos === "MR" || pos === "ML" || pos === "ST" ? 1 : pos === "DC" ? -0.8 : 0)),
    sta: attr(r, ca),
    strn: attr(r, ca + (pos === "DC" || pos === "ST" ? 0.6 : 0)),
    def,
    pas: attr(r, ca + (pos === "MC" || pos === "AM" || pos === "DM" ? 1 : 0)),
    tec: attr(r, ca + (pos === "AM" || pos === "MC" ? 0.8 : 0)),
    sho,
    men: attr(r, ca + (age > 28 ? 0.8 : -0.3)),
    gk,
    cond: 78 + Math.floor(r() * 20),
    sharp: 55 + Math.floor(r() * 30),
    mor: 62 + Math.floor(r() * 28),
    wage: Math.max(8, Math.round(priceEuro(ovr, age, club.league, club.rep) * 140)),
    value,
    contract: 1 + Math.floor(r() * 4),
    number: 0,
    injured: 0,
    goals: 0,
    assists: 0,
    apps: 0,
    ratingSum: 0,
    yellow: 0,
    ban: 0,
    listed: false,
    ovr,
    pot,
    growth: 0,
  };
}

export function squadFor(club: Club): Player[] {
  const r = rng(hash(club.id + ":squad"));
  const names = new Set<string>();
  const players = SHIRT.map((pos, i) => makePlayer(club, i, pos, r, names));
  const used = new Set<number>();
  for (const p of players) {
    let n = p.pos === "GK" ? (used.has(1) ? 1 + Math.floor(r() * 20) : 1) : 2 + Math.floor(r() * 97);
    let guard = 0;
    while (used.has(n) && guard++ < 40) n = 1 + Math.floor(r() * 99);
    used.add(n);
    p.number = n;
  }
  return players;
}

export function expectation(club: Club, clubs: Club[]) {
  const mates = clubs.filter((c) => c.league === club.league).sort((a, b) => b.rep - a.rep);
  const place = mates.findIndex((c) => c.id === club.id) + 1;
  const n = mates.length;
  if (club.league === "rpl") {
    if (place <= 2) return "бороться за чемпионство";
    if (place <= 5) return "финишировать в тройке";
    if (place <= 10) return "спокойно держаться в середине";
    return "сохранить место в РПЛ";
  }
  if (place <= 2) return club.league === "fnl3" ? "выйти в ФНЛ-2" : club.league === "fnl2" ? "выйти в Первую лигу" : "прямо выйти в РПЛ";
  if (place > n - 2 && club.league !== "fnl3") return "не вылететь";
  return "закончиться в верхней половине";
}

export function defaultTactics(clubId: string): Tactics {
  const style = styleOf(clubId);
  return {
    formation: style.formation,
    slots: Array(11).fill(""),
    mentality: style.mentality,
    press: style.press,
    tempo: style.tempo,
    line: style.line,
    width: style.width,
    style: style.id,
  };
}

export function newSave(clubId: string, manager: string): Save {
  const chosen = templateById(clubId) ?? CLUBS[0]!;
  const russian = [...CLUBS, ...EXTRA];
  const extraForeign = FOREIGN_CLUBS.some((c) => c.league === chosen.league) ? FOREIGN_CLUBS.filter((c) => c.league === chosen.league) : [];
  const clubs = [...russian, ...extraForeign.filter((c) => !russian.some((r) => r.id === c.id))].map((c) => ({ ...c }));
  const club = clubs.find((c) => c.id === clubId) ?? clubs[0]!;
  const players = clubs.flatMap(squadFor);
  const season = 2026;
  const fixtures = makeFixtures(clubs, season);
  const tactics = defaultTactics(club.id);
  const save: Save = {
    v: 3,
    manager: manager.trim() || "Алексей Орлов",
    clubId: club.id,
    date: "2026-07-11",
    season,
    clubs,
    players,
    fixtures,
    inbox: [],
    tactics,
    budget: club.budget,
    balance: Math.round(club.budget * 0.35),
    confidence: 68,
    played: 0,
    focus: null,
    sacked: false,
    offers: [],
    log: [],
    kit: {
      home: { design: hash(club.id) % 36, primary: club.color, secondary: club.color2, socks: club.color },
      away: { design: (hash(club.id) + 11) % 36, primary: club.color2, secondary: club.color, socks: club.color2 },
    },
    badSeasons: 0,
    cup: freshCup(),
    euro: freshEuro(),
    phase: "season",
    difficulty: "experienced",
    matchMins: 2,
  };
  seedCompetitions(save);
  const mediaNames = mediaInCup(save).map((c) => c.name).join(", ");
  const task = expectation(club, clubs);
  const euroLine = save.euro.comp ? ` Еврокубки: ${save.euro.comp === "ucl" ? (save.euro.stage === "qual" ? "Лига чемпионов, квалификация" : "Лига чемпионов") : save.euro.comp === "uel" ? "Лига Европы" : "Лига конференций"}.` : "";
  save.inbox.push(
    {
      id: "m1",
      date: save.date,
      from: "Президент клуба",
      title: `Добро пожаловать, ${save.manager.split(" ")[0]}`,
      body: `Вы возглавили «${club.name}». Задача сезона ${season}/${season + 1}: ${task}. Бюджет на трансферы — ${money(club.budget)}. Зарплатный потолок — ${wageText(wageCap(club.rep))}.${euroLine}`,
      read: false,
    },
    {
      id: "m2",
      date: save.date,
      from: "Спортивный директор",
      title: "Летнее окно открыто",
      body: "Заявки принимаем до 12 сентября. Зимой окно короткое: 20 января — 25 февраля. На рынке есть чемпионаты других стран — игроков можно покупать за бюджет и сажать на контракт.",
      read: false,
    },
    {
      id: "m3",
      date: save.date,
      from: "Кубок России",
      title: "FONBET Кубок России",
      body: `102 клуба: 16 РПЛ идут группами по четыре, путь регионов — на вылет. Медийная лига — отдельный чемпионат. В кубок от неё каждый сезон жребий берёт четыре клуба: ${mediaNames}. Призовые за кубок и лигу падают в бюджет.`,
      read: false,
    },
  );
  return save;
}

export function formationOf(id: FormationId) {
  return FORMATIONS[id];
}

export function playerName(p: Player) {
  return `${p.first} ${p.last}`;
}

export function scoutText(p: Player) {
  const bits: string[] = [];
  if (p.pos === "GK") bits.push(p.gk >= 15 ? "Надёжный на линии, хорошо играет на выходах." : p.gk >= 12 ? "Крепкий вратарь своего уровня." : "Пока много ошибок на ближней.");
  else {
    if (p.pac >= 15) bits.push("Быстрый, выигрывает забегания.");
    else if (p.pac <= 10) bits.push("Скорости не хватает против крайних.");
    if (p.sho >= 15) bits.push("Холодно бьёт из пределов штрафной.");
    if (p.pas >= 15) bits.push("Держит темп передачей вперёд.");
    if (p.def >= 15) bits.push("Жёсткий в отборе, читает эпизод.");
    if (p.tec >= 15) bits.push("Уверен в дриблинге на малом пространстве.");
    if (p.men >= 16) bits.push("Лидер, не проседает в дерби.");
    else if (p.men <= 10) bits.push("Плывёт, когда счёт против.");
    if (p.age <= 21) bits.push("Молодой, ещё прибавит при игровой практике.");
    if (p.age >= 33) bits.push("Опыт есть, объём уже надо дозировать.");
  }
  if (!bits.length) bits.push("Рабочий вариант на свой уровень, без яркого козыря.");
  return bits.slice(0, 3).join(" ");
}
