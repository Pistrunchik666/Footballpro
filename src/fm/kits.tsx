import { useId } from "react";
import type { Club, Kit } from "./types";
import { hash } from "./generate";

export const DESIGNS: string[] = [
  "Сплошная",
  "Узкая вертикаль",
  "Широкая вертикаль",
  "Узкая тельняшка",
  "Широкая тельняшка",
  "Диагональная лента",
  "Пополам",
  "Горизонтальный пояс",
  "Контрастные рукава",
  "Кокетка",
  "Боковые вставки",
  "Тонкий рубчик",
  "Ворот и манжеты",
  "Центральная панель",
  "Косой рубчик",
  "Шеврон",
  "Ромбы",
  "Клетка",
  "Двухцветный торс",
  "Верхний пояс",
  "Нижний пояс",
  "Классика рукава",
  "Смещённая полоса",
  "Три полосы",
  "Тельняшка и рукава",
  "Вертикаль и ворот",
  "Два блока",
  "Четверти",
  "Тонкая перевязь",
  "Редкий горох",
  "Крест",
  "Косая штриховка",
  "Широкий бок",
  "Двойной ворот",
  "Пояс на подоле",
  "Центральный шов",
];

export const PALETTE = ["#f4f1ea", "#111111", "#c8102e", "#0b3d91", "#1f7a3a", "#f2c200", "#f26b1f", "#6b2d5b", "#7ec8e3", "#163e86", "#5b1a28", "#0d5c38", "#d4af37", "#3d2a78", "#009639", "#8b1e3f", "#b0b7c3", "#e8eef7"];

export function autoKit(club: Club, side: "home" | "away"): Kit {
  const design = hash(club.id + ":" + side) % DESIGNS.length;
  if (side === "home") return { design, primary: club.color, secondary: club.color2, socks: club.color };
  return { design, primary: club.color2, secondary: club.color, socks: club.color2 };
}

export function homeTones(club: Club): Kit[] {
  return [
    { design: 0, primary: club.color, secondary: club.color2, socks: club.color },
    { design: 0, primary: club.color, secondary: "#f4f1ea", socks: club.color },
    { design: 0, primary: club.color2, secondary: club.color, socks: club.color2 },
    { design: 0, primary: club.color, secondary: club.color, socks: club.color2 },
  ];
}

export function Shirt({ kit, size = 72 }: { kit: Kit; size?: number }) {
  const uid = useId().replace(/:/g, "");
  const a = kit.primary;
  const b = kit.secondary;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <clipPath id={uid}>
          <path d="M10 18 L22 8 L32 16 L42 8 L54 18 L47 28 L43 25 V56 H21 V25 L17 28 Z" />
        </clipPath>
      </defs>
      <path d="M10 18 L22 8 L32 16 L42 8 L54 18 L47 28 L43 25 V56 H21 V25 L17 28 Z" fill={a} />
      <g clipPath={`url(#${uid})`}>{motif(kit.design, a, b)}</g>
      <path d="M27 16 Q32 22 37 16" fill="none" stroke={b} strokeWidth="2.2" />
      <rect x="24" y="58" width="7" height="4" fill={kit.socks} />
      <rect x="33" y="58" width="7" height="4" fill={kit.socks} />
    </svg>
  );
}

function motif(d: number, a: string, b: string) {
  switch (d) {
    case 0:
      return null;
    case 1:
      return stripes(b, 2.2, 6);
    case 2:
      return stripes(b, 8, 16);
    case 3:
      return hoops(b, 2.4, 7);
    case 4:
      return hoops(b, 8, 16);
    case 5:
      return <polygon points="16,12 34,12 48,56 30,56" fill={b} />;
    case 6:
      return <rect x="32" y="8" width="22" height="50" fill={b} />;
    case 7:
      return <rect x="12" y="30" width="40" height="8" fill={b} />;
    case 8:
      return (<><rect x="10" y="8" width="13" height="22" fill={b} /><rect x="41" y="8" width="13" height="22" fill={b} /></>);
    case 9:
      return <path d="M18 12 H46 L39 26 H25 Z" fill={b} />;
    case 10:
      return (<><rect x="15" y="20" width="6" height="36" fill={b} /><rect x="43" y="20" width="6" height="36" fill={b} /></>);
    case 11:
      return stripes(b, 1.2, 4);
    case 12:
      return (<><path d="M24 13 H40 L37 20 H27 Z" fill={b} /><rect x="17" y="22" width="7" height="4" fill={b} /><rect x="40" y="22" width="7" height="4" fill={b} /></>);
    case 13:
      return <rect x="27" y="14" width="10" height="42" fill={b} />;
    case 14:
      return stripesDiag(b, 11);
    case 15:
      return <polygon points="32,16 46,34 32,30 18,34" fill={b} />;
    case 16:
      return diamonds(b);
    case 17:
      return checks(a, b);
    case 18:
      return <rect x="12" y="34" width="40" height="22" fill={b} />;
    case 19:
      return <rect x="12" y="10" width="40" height="12" fill={b} />;
    case 20:
      return <rect x="14" y="48" width="36" height="6" fill={b} />;
    case 21:
      return (<><rect x="12" y="12" width="8" height="44" fill={b} /><rect x="44" y="12" width="8" height="44" fill={b} /></>);
    case 22:
      return <polygon points="18,12 24,12 34,56 28,56" fill={b} />;
    case 23:
      return (<><rect x="20" y="12" width="3" height="44" fill={b} /><rect x="30" y="12" width="3" height="44" fill={b} /><rect x="40" y="12" width="3" height="44" fill={b} /></>);
    case 24:
      return (<><rect x="12" y="18" width="40" height="5" fill={b} /><rect x="12" y="30" width="40" height="5" fill={b} /><rect x="12" y="42" width="40" height="5" fill={b} /><rect x="12" y="10" width="8" height="18" fill={b} /><rect x="44" y="10" width="8" height="18" fill={b} /></>);
    case 25:
      return (<><rect x="29" y="12" width="6" height="44" fill={b} /><path d="M22 12 H42 L39 20 H25 Z" fill={b} /></>);
    case 26:
      return <polygon points="12,10 38,10 28,56 12,56" fill={b} />;
    case 27:
      return (<><rect x="12" y="10" width="20" height="23" fill={b} /><rect x="32" y="33" width="20" height="23" fill={b} /></>);
    case 28:
      return <polygon points="22,12 27,12 42,56 37,56" fill={b} />;
    case 29:
      return dots(b);
    case 30:
      return (<><rect x="30" y="12" width="4" height="44" fill={b} /><rect x="16" y="32" width="32" height="4" fill={b} /></>);
    case 31:
      return stripesDiag(b, 6);
    case 32:
      return (<><circle cx="32" cy="30" r="8" fill="none" stroke={b} strokeWidth="3" /><rect x="30.5" y="14" width="3" height="8" fill={b} /></>);
    case 33:
      return (<><path d="M20 14 H44 V20 H26 V52 H20 Z" fill={b} /></>);
    case 34:
      return (<><rect x="16" y="40" width="32" height="4" fill={b} /><rect x="16" y="48" width="32" height="4" fill={b} /></>);
    default:
      return (<><rect x="31" y="14" width="2" height="42" fill={b} /><rect x="14" y="16" width="6" height="38" fill={b} opacity="0.85" /></>);
  }
}

function stripes(b: string, w: number, step: number) {
  const nodes = [];
  for (let x = 16; x < 50; x += step) nodes.push(<rect key={x} x={x} y={10} width={w} height={48} fill={b} />);
  return <>{nodes}</>;
}
function hoops(b: string, h: number, step: number) {
  const nodes = [];
  for (let y = 18; y < 54; y += step) nodes.push(<rect key={y} x={12} y={y} width={40} height={h} fill={b} />);
  return <>{nodes}</>;
}
function stripesDiag(b: string, step: number) {
  const nodes = [];
  for (let i = -2; i < 8; i++) nodes.push(<polygon key={i} points={`${6 + i * step},8 ${10 + i * step},8 ${26 + i * step},56 ${22 + i * step},56`} fill={b} />);
  return <>{nodes}</>;
}
function diamonds(b: string) {
  const nodes = [];
  for (let y = 20; y < 52; y += 12) for (let x = 20; x < 48; x += 12) nodes.push(<polygon key={`${x}${y}`} points={`${x},${y} ${x + 4},${y + 4} ${x},${y + 8} ${x - 4},${y + 4}`} fill={b} />);
  return <>{nodes}</>;
}
function checks(a: string, b: string) {
  const nodes = [];
  for (let y = 16; y < 56; y += 8) for (let x = 14; x < 52; x += 8) if (((x + y) / 8) % 2 < 1) nodes.push(<rect key={`${x}${y}`} x={x} y={y} width={8} height={8} fill={b} opacity={a ? 1 : 1} />);
  return <>{nodes}</>;
}
function dots(b: string) {
  const nodes = [];
  for (let y = 22; y < 52; y += 8) for (let x = 22; x < 46; x += 8) nodes.push(<circle key={`${x}${y}`} cx={x} cy={y} r={1.6} fill={b} />);
  return <>{nodes}</>;
}
