export type Mode = "freekick" | "training" | "career";

export type Screen = "menu" | "saves" | "clubs" | "hub" | "kits" | "match" | "season";

export type MissReason = "save" | "wide" | "over" | "post" | "bar" | "short" | "wall" | "time";

export type KitSide = "home" | "away";

export type Club = {
  id: string;
  name: string;
  short: string;
  color: string;
  away: string;
  power: number;
};

export type Fixture = {
  id: string;
  round: number;
  homeId: string;
  awayId: string;
  seed: number;
  played: boolean;
  homeGoals: number;
  awayGoals: number;
  minute: number;
  added: number;
  fkGoal: boolean;
  userPlayed: boolean;
};

export type PendingMatch = {
  fixtureId: string;
  preHome: number;
  preAway: number;
  minute: number;
  added: number;
  youKit: KitSide;
  oppKit: KitSide;
  youColor: string;
  oppColor: string;
  youShorts: string;
  oppShorts: string;
  gkColor: string;
};

export type SeasonNote = {
  season: number;
  clubId: string;
  position: number;
  goals: number;
  pts: number;
};

export type CareerState = {
  season: number;
  clubId: string;
  fixtures: Fixture[];
  pending: PendingMatch | null;
  history: SeasonNote[];
  careerGoals: number;
  seasonFkGoals: number;
  reputation: number;
};

export type Settings = {
  sound: boolean;
  shake: boolean;
};

export type FreekickState = {
  level: number;
  score: number;
  goals: number;
};

export type SaveFile = {
  version: 1;
  name: string;
  updatedAt: number;
  freekick: FreekickState;
  career: CareerState | null;
  settings: Settings;
};

export type SaveFolder = {
  version: 1;
  active: number;
  slots: Array<SaveFile | null>;
};

export type GkSkill = {
  speed: number;
  react: number;
  error: number;
  reach: number;
  jump: number;
};

export type Layout = {
  ballX: number;
  ballZ: number;
  wallCount: number;
  wallBias: number;
  timeLimit: number | null;
  defender: boolean;
  gk: GkSkill;
};

export type LiveBoard = {
  homeShort: string;
  awayShort: string;
  homeColor: string;
  awayColor: string;
  homeGoals: number;
  awayGoals: number;
  minute: number;
  added: number;
  ft: boolean;
  youAreHome: boolean;
};

export type ResultAction = "next-level" | "retry" | "hub" | "training" | "season";

export type ResultCard = {
  title: string;
  detail: string;
  score: string;
  primary: string;
  action: ResultAction;
};

export type Pose = {
  x: number;
  y: number;
  z: number;
  yaw: number;
  leg: number;
  armRaise: number;
  lean: number;
  lift: number;
  flinch: number;
  visible: boolean;
};
