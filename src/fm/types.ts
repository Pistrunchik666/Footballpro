export type LeagueId =
  | "rpl"
  | "fnl"
  | "fnl2"
  | "fnl3"
  | "media"
  | "amateur"
  | "tur"
  | "bra"
  | "ned"
  | "por"
  | "bel"
  | "gre"
  | "srb"
  | "pol"
  | "aut"
  | "den"
  | "euro";

export type Comp = "league" | "cup" | "ucl" | "uel" | "uecl" | "playoff" | "pyramid";

export type EuroTicket = "ucl" | "uclq" | "uel" | "uecl";

export type Pos = "GK" | "DR" | "DL" | "DC" | "DM" | "MC" | "AM" | "MR" | "ML" | "ST";

export type Screen =
  | "boot"
  | "slots"
  | "honors"
  | "pick"
  | "kits"
  | "desk"
  | "squad"
  | "player"
  | "tactics"
  | "match"
  | "table"
  | "market"
  | "inbox"
  | "money"
  | "calendar"
  | "cups"
  | "sacked";

export type Club = {
  id: string;
  name: string;
  short: string;
  city: string;
  league: LeagueId;
  rep: number;
  budget: number;
  color: string;
  color2: string;
  stadium: string;
  capacity: number;
  euro?: EuroTicket | null;
};

export type Player = {
  id: string;
  clubId: string;
  first: string;
  last: string;
  age: number;
  nat: string;
  pos: Pos;
  foot: "Прав" | "Лев";
  pac: number;
  sta: number;
  strn: number;
  def: number;
  pas: number;
  tec: number;
  sho: number;
  men: number;
  gk: number;
  cond: number;
  sharp: number;
  mor: number;
  wage: number;
  value: number;
  contract: number;
  number: number;
  injured: number;
  goals: number;
  assists: number;
  apps: number;
  ratingSum: number;
  yellow: number;
  ban: number;
  listed: boolean;
  ovr: number;
  pot: number;
  growth: number;
  clause?: string;
  renewed?: boolean;
};

export type Fixture = {
  id: string;
  league: LeagueId;
  round: number;
  date: string;
  home: string;
  away: string;
  hg?: number;
  ag?: number;
  played: boolean;
  comp?: Comp;
  label?: string;
  tie?: string;
  leg?: 1 | 2;
};

export type Mentality = -2 | -1 | 0 | 1 | 2;

export type StyleId = "tiki" | "bus" | "counter" | "direct" | "gegen" | "wing" | "vertical";

export type Difficulty = "novice" | "experienced" | "pro" | "world";

export type Tactics = {
  formation: FormationId;
  slots: string[];
  mentality: Mentality;
  press: number;
  tempo: number;
  line: number;
  width: number;
  style: StyleId;
};

export type FormationId = "4-3-3" | "4-2-3-1" | "4-4-2" | "3-5-2" | "5-3-2" | "4-1-4-1";

export type Offer = {
  playerId: string;
  fee: number;
  wage: number;
  clubId: string;
};

export type Msg = {
  id: string;
  date: string;
  from: string;
  title: string;
  body: string;
  read: boolean;
  offer?: Offer;
};

export type LiveEvent = {
  min: number;
  text: string;
  kind: "goal" | "miss" | "card" | "info" | "sub" | "ht" | "ft" | "dead";
  pid?: string;
  side?: "h" | "a";
  piece?: Piece;
  shot?: Shot;
};

export type SubOrder = { out: string; in: string };

export type Kit = {
  design: number;
  primary: string;
  secondary: string;
  socks: string;
};

export type Live = {
  fixtureId: string;
  minute: number;
  events: LiveEvent[];
  queue: LiveEvent[];
  hg: number;
  ag: number;
  home: boolean;
  oppId: string;
  xi: string[];
  oppXi: string[];
  ratings: Record<string, number>;
  paused: boolean;
  done: boolean;
  xgH: number;
  xgA: number;
  scorers: string[];
  mins: Record<string, number>;
  pending: SubOrder[];
  oppPending: SubOrder[];
  subsUsed: number;
  oppSubs: number;
  oppForm: FormationId;
  line: string;
  side: "h" | "a";
  menu: boolean;
  userPause: boolean;
  technical: boolean;
  baller: string;
  piece: Piece;
  shot: Shot;
  pieceAt: number;
};

export type CupState = {
  byes: string[];
  userOut: boolean;
  stage: "live" | "done";
};

export type EuroState = {
  comp: EuroTicket | "uel" | "uecl" | null;
  stage: "qual" | "league" | "ko" | "done" | "out";
  pts: number;
  gf: number;
  ga: number;
  round: number;
};

export type Save = {
  v: 1 | 2 | 3;
  manager: string;
  clubId: string;
  date: string;
  season: number;
  clubs: Club[];
  players: Player[];
  fixtures: Fixture[];
  inbox: Msg[];
  tactics: Tactics;
  budget: number;
  balance: number;
  confidence: number;
  played: number;
  focus: "attack" | "defence" | "set" | "physical" | "rest" | null;
  sacked: boolean;
  offers: { clubId: string }[];
  log: string[];
  kit: { home: Kit; away: Kit };
  badSeasons: number;
  cup: CupState;
  euro: EuroState;
  phase: "season" | "playoff";
  difficulty: Difficulty;
  matchMins: 2 | 3 | 5;
};

export type Glory = { who: string; text: string; season: number; cup: string };

export type Piece = "open" | "fk" | "pen" | "throw" | "corner";
export type Shot = "" | "chip" | "curl" | "power" | "placed";
