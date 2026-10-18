import type { FormationId, Mentality, StyleId, Tactics } from "./types";

export const STYLES: {
  id: StyleId;
  name: string;
  mentality: Mentality;
  press: number;
  tempo: number;
  line: number;
  width: number;
}[] = [
  { id: "tiki", name: "Тики-така", mentality: 1, press: 3, tempo: 1, line: 3, width: 2 },
  { id: "bus", name: "Автобус", mentality: -2, press: 0, tempo: 1, line: 0, width: 1 },
  { id: "counter", name: "Контратака", mentality: -1, press: 1, tempo: 4, line: 1, width: 3 },
  { id: "direct", name: "Прямой футбол", mentality: 0, press: 2, tempo: 3, line: 2, width: 2 },
  { id: "gegen", name: "Гегенпрессинг", mentality: 2, press: 4, tempo: 4, line: 4, width: 2 },
  { id: "wing", name: "Фланги", mentality: 1, press: 2, tempo: 3, line: 2, width: 4 },
  { id: "vertical", name: "Вертикальный", mentality: 1, press: 3, tempo: 4, line: 3, width: 1 },
];

const FORMS: FormationId[] = ["4-3-3", "4-2-3-1", "4-4-2", "3-5-2", "5-3-2", "4-1-4-1"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function styleById(id: string) {
  return STYLES.find((s) => s.id === id) ?? STYLES[0]!;
}

export function styleOf(clubId: string) {
  const base = STYLES[hash(clubId + ":style") % STYLES.length]!;
  const formation = FORMS[hash(clubId + ":form") % FORMS.length]!;
  return { ...base, formation };
}

export function clubTactics(clubId: string): Tactics {
  const s = styleOf(clubId);
  return {
    formation: s.formation,
    slots: [],
    mentality: s.mentality,
    press: s.press,
    tempo: s.tempo,
    line: s.line,
    width: s.width,
    style: s.id,
  };
}

export function shapeSlot(slot: { pos: string; x: number; y: number }, t: Tactics) {
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  if (slot.pos === "GK") {
    return { x: 50, y: clamp(88 - (t.line - 2) * 1.1, 80, 92) };
  }
  const wide = slot.pos === "DL" || slot.pos === "DR" || slot.pos === "ML" || slot.pos === "MR";
  const side = slot.x < 48 ? -1 : slot.x > 52 ? 1 : 0;
  const x = clamp(slot.x + side * (t.width - 2) * (wide ? 4.4 : 1.3), 8, 92);
  const push = (t.line - 2) * (slot.pos === "ST" ? 1.6 : 3.1) + t.mentality * 2.4 + Math.max(0, t.press - 2) * (slot.pos === "MC" || slot.pos === "DM" || slot.pos === "AM" ? 1.8 : 0.4);
  const y = clamp(slot.y - push, 8, 86);
  return { x, y };
}

export function shapeText(t: Tactics) {
  const ment = ["Команда села глубоко", "Осторожный блок", "Ровная расстановка", "Смещение вперёд", "Все линии в атаке"][t.mentality + 2] ?? "Баланс";
  const line = ["очень низкая линия", "низкая линия", "средняя линия", "высокая линия", "линия у чужой штрафной"][t.line] ?? "средняя линия";
  const width = ["фланги узко", "чуть уже", "обычная ширина", "широко", "крайние у бровки"][t.width] ?? "обычная ширина";
  return `${ment}, ${line}, ${width}.`;
}
