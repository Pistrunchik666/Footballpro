import { useEffect, useState } from "react";
import { FORMATIONS, LEAGUES, POS_LONG, POS_RU, leagueMeta, wageCap } from "./clubs";
import { mediaInCup } from "./competitions";
import { placeOf, playersOf, report, rowZone, seasonDone, tableOf, userFixture, wageBill, xiStrength } from "./engine";
import { DESIGNS, PALETTE, Shirt, autoKit, homeTones } from "./kits";
import { NATIONS, fitsWish, marketRows, originOf, peek, type Wish } from "./market";
import { catalog, dollarText, formatDate, money, overall, playerName, rubFromDollars, scoutText, wageText, windowOpen } from "./generate";
import { honorsOf, useFm } from "./store";
import { shapeSlot, shapeText, STYLES } from "./tactics";
import { PitchLive } from "./pitch2d";
import type { Club, LeagueId, Pos, Save } from "./types";
import "./desk.css";

export function ManagerApp() {
  const boot = useFm((s) => s.boot);
  const screen = useFm((s) => s.screen);
  const live = useFm((s) => s.live);
  const playerId = useFm((s) => s.playerId);
  const running = screen === "match" && !!live && !live.done && !live.paused && !live.menu && !live.userPause;
  const matchMins = useFm((s) => (s.save?.matchMins === 3 || s.save?.matchMins === 5 ? s.save.matchMins : 2));
  useEffect(() => {
    boot();
  }, [boot]);
  useEffect(() => {
    if (!running) return;
    const ms = Math.round((matchMins * 60 * 1000) / 90);
    const id = window.setInterval(() => useFm.getState().tick(), ms);
    return () => window.clearInterval(id);
  }, [running, matchMins]);

  const bare = screen === "boot" || screen === "pick" || screen === "kits" || screen === "sacked" || screen === "honors";
  const cutscene = useFm((s) => s.cutscene);
  return (
    <div className={`desk${screen === "match" ? " desk-match" : ""}${screen === "boot" ? "" : " desk-play"}`}>
      {screen !== "boot" ? <p className="fp-corner">Football pro</p> : null}
      <div className="desk-scroll">
        {screen === "boot" && <Boot />}
        {screen === "honors" && <Honors />}
        {screen === "pick" && <Pick />}
        {screen === "kits" && <Kits />}
        {screen === "sacked" && <Sacked />}
        {!bare && screen === "desk" && <Desk />}
        {screen === "squad" && <Squad />}
        {screen === "player" && <PlayerCard key={playerId ?? "p"} />}
        {screen === "tactics" && <Tactics />}
        {screen === "match" && <Match />}
        {screen === "table" && <Table />}
        {screen === "market" && <Market />}
        {screen === "inbox" && <Inbox />}
        {screen === "money" && <Money />}
        {screen === "calendar" && <Calendar />}
        {screen === "cups" && <Cups />}
      </div>
      {!bare && screen !== "match" && screen !== "player" && <Nav />}
      {cutscene ? <TrophyScene /> : null}
    </div>
  );
}

function TrophyScene() {
  const g = useFm((s) => s.cutscene);
  const save = useFm((s) => s.save);
  if (!g) return null;
  const club = save?.clubs.find((c) => c.id === save.clubId);
  const kit = save?.kit.home;
  return (
    <div className="trophy-scene" role="dialog">
      <p className="kicker">Заслуга сезона</p>
      <div className="trophy-photo">
        <div className="trophy-team">
          {kit ? [0, 1, 2, 3, 4].map((i) => <Shirt key={i} kit={kit} size={46 + (i === 2 ? 8 : 0)} />) : null}
        </div>
        <TrophyShape kind={g.cup} />
      </div>
      <h2 className="word">{g.text}</h2>
      <p className="tiny">{g.who}{club ? ` · ${club.name}` : ""} · {g.season}/{String(g.season + 1).slice(2)}</p>
      <div className="grid2">
        <button className="btn" onClick={() => { useFm.getState().dismissTrophy(); useFm.getState().go("honors"); }}>В заслуги</button>
        <button className="btn ghost" onClick={() => useFm.getState().dismissTrophy()}>Дальше</button>
      </div>
    </div>
  );
}

function TrophyShape({ kind }: { kind: string }) {
  const metal = kind === "uel" ? "#c4622d" : kind === "uecl" ? "#1f8a6a" : kind === "fnl3" ? "#a56b3c" : kind === "media" ? "#1a1a1a" : kind === "cup" ? "#d5dbe3" : kind === "fnl" || kind === "fnl2" ? "#c5ccd4" : "#e4c56a";
  const ears = kind === "ucl";
  const ball = kind === "cup";
  return (
    <svg className="trophy-svg" viewBox="0 0 120 150" aria-hidden>
      {ears ? <path d="M18 28c-16 8-16 36 2 42M102 28c16 8 16 36-2 42" fill="none" stroke={metal} strokeWidth="7" /> : null}
      <path d={ball ? "M40 18h40v8H40z" : "M34 16h52l-6 10H40z"} fill={metal} />
      {ball ? <circle cx="60" cy="14" r="8" fill="#f4f4f4" stroke="#222" /> : null}
      <path d="M38 28h44c2 22-2 40-8 52H46c-6-12-10-30-8-52z" fill={metal} />
      {!ears && kind !== "cup" ? <path d="M38 36c-10 4-12 18-4 22M82 36c10 4 12 18 4 22" fill="none" stroke={metal} strokeWidth="5" /> : null}
      <rect x="54" y="80" width="12" height="28" fill={metal} />
      <rect x="36" y="108" width="48" height="10" rx="2" fill={kind === "media" ? "#d6a85c" : metal} />
      <rect x="28" y="120" width="64" height="12" rx="2" fill="#2a2418" />
    </svg>
  );
}

function BootLogo() {
  return (
    <svg className="boot-logo" viewBox="0 0 80 80" aria-hidden>
      <circle cx="40" cy="40" r="36" fill="#101820" stroke="#c47a12" strokeWidth="4" />
      <circle cx="40" cy="40" r="18" fill="#f4f1ea" />
      <path d="M40 26l6.2 4.5 2.4 7.2-4.6 5.8H36l-4.6-5.8 2.4-7.2z" fill="#161616" />
      <path d="M28 34l-6 2 1 8 7 2M52 34l6 2-1 8-7 2M33 50l-2 8h18l-2-8" fill="none" stroke="#161616" strokeWidth="1.6" />
    </svg>
  );
}

function BootArt() {
  return (
    <svg className="boot-art" viewBox="0 0 800 420" role="img" aria-label="Ночной стадион">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14102a" />
          <stop offset="1" stopColor="#0c1c2e" />
        </linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f8a45" />
          <stop offset="1" stopColor="#0e5a2c" />
        </linearGradient>
      </defs>
      <rect width="800" height="420" fill="url(#sky)" />
      <ellipse cx="140" cy="70" rx="90" ry="28" fill="rgba(196,122,18,0.18)" />
      <ellipse cx="660" cy="70" rx="90" ry="28" fill="rgba(196,122,18,0.18)" />
      <polygon points="70,150 730,150 780,250 20,250" fill="#1a2433" />
      {[0, 1, 2, 3].map((row) =>
        Array.from({ length: 28 }, (_, i) => (
          <circle key={`${row}-${i}`} cx={90 + i * 22} cy={168 + row * 18} r="4" fill={i % 3 === 0 ? "#c47a12" : i % 3 === 1 ? "#2f6fed" : "#e7efe9"} opacity="0.85" />
        )),
      )}
      <polygon points="90,250 710,250 760,400 40,400" fill="url(#grass)" />
      <g fill="none" stroke="rgba(255,255,255,0.82)" strokeWidth="3">
        <polygon points="90,250 710,250 760,400 40,400" />
        <line x1="65" y1="325" x2="735" y2="325" />
        <ellipse cx="400" cy="325" rx="54" ry="22" />
        <polygon points="300,250 500,250 540,292 260,292" />
        <polygon points="180,400 620,400 560,360 240,360" />
      </g>
      <circle cx="400" cy="368" r="16" fill="#f4f1ea" stroke="#161616" strokeWidth="2" />
      <path d="M400 356l5 4 2 6-4 4h-6l-4-4 2-6z" fill="#161616" />
    </svg>
  );
}

function Boot() {
  const folder = useFm((s) => s.folder);
  const notice = useFm((s) => s.notice);
  const stamp = useFm((s) => s.stamp);
  return (
    <section className="stack boot-menu">
      <div className="boot-hero">
        <BootArt />
        <div className="boot-brand">
          <BootLogo />
          <div>
            <p className="kicker">Сезон 2026/27</p>
            <h1 className="word fp-title">Football pro</h1>
          </div>
        </div>
      </div>
      <p className="muted">Нажмите «Играть» — матч сразу идёт на поле, прямо в этом окне.</p>
      <p className="tiny">Сохранения лежат в Web Storage этого браузера. Кабинет {stamp || "····"}. На другом устройстве и у другого человека слоты свои, пустые.</p>
      {notice ? <div className="toast">{notice}</div> : null}
      <button className="btn wide" onClick={() => useFm.getState().playNow()}>Играть</button>
      <div className="stack">
        {folder.slots.map((slot, i) => {
          const save = slot?.save;
          const club = save?.clubs.find((c) => c.id === save.clubId);
          return (
            <article key={i} className="card stack">
              <div className="spread">
                <b>Слот {i + 1}</b>
                <span className="tiny">{save ? `${save.season}/${String(save.season + 1).slice(2)}` : "пусто"}</span>
              </div>
              {save && club ? (
                <>
                  <p style={{ margin: 0 }}>{save.manager}</p>
                  <p className="tiny" style={{ margin: 0 }}>{club.name} · {leagueMeta(club.league).short}</p>
                  <div className="grid2">
                    <button className="btn" onClick={() => useFm.getState().activate(i)}>Продолжить</button>
                    <button className="btn ghost" onClick={() => useFm.getState().fresh(i)}>Новый тренер</button>
                  </div>
                </>
              ) : (
                <button className="btn" onClick={() => useFm.getState().fresh(i)}>Создать тренера</button>
              )}
            </article>
          );
        })}
      </div>
      <button className="btn ghost wide" onClick={() => useFm.getState().go("honors")}>Заслуги тренеров</button>
    </section>
  );
}

function Honors() {
  const folder = useFm((s) => s.folder);
  const rows = honorsOf(folder);
  return (
    <section className="stack">
      <button className="btn quiet" onClick={() => useFm.getState().go(useFm.getState().save ? "desk" : "boot")}>Назад</button>
      <p className="kicker">Стена кабинета</p>
      <h1 className="word" style={{ fontSize: "2rem" }}>Заслуги</h1>
      <p className="tiny">Сюда попадают только кубки и чемпионства этого кабинета. Запись остаётся, даже если стереть карьеру. Человек, который откроет ссылку, эту стену не увидит.</p>
      <div className="plist">
        {rows.length ? rows.map((g, i) => (
          <article key={`${g.who}-${g.text}-${i}`} className="card">
            <b>{g.who}</b>
            <p style={{ margin: "4px 0 0" }}>{g.text}</p>
            <p className="tiny" style={{ margin: 0 }}>{g.season}/{String(g.season + 1).slice(2)}</p>
          </article>
        )) : <article className="card"><p style={{ margin: 0 }}>Пока пусто. Выиграйте лигу или кубок — здесь появится табличка.</p></article>}
      </div>
    </section>
  );
}

function Pick() {
  const [name, setName] = useState("А. Рубанова");
  const [league, setLeague] = useState<LeagueId>("rpl");
  const clubs = catalog().filter((c) => c.league === league).sort((a, b) => b.rep - a.rep);
  const groups = [
    { title: "Россия", ids: ["rpl", "fnl", "fnl2", "fnl3", "media", "amateur"] as LeagueId[] },
    { title: "Другие страны", ids: ["tur", "bra", "ned", "por", "bel", "gre", "srb", "pol", "aut", "den"] as LeagueId[] },
  ];
  return (
    <section className="stack">
      <button className="btn quiet" onClick={() => useFm.getState().go("boot")}>Назад</button>
      <h1 className="word" style={{ fontSize: "2rem" }}>Тренер и клуб</h1>
      <label className="tiny">Фамилия и имя — так подпишутся заслуги
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p className="tiny">Выберите клуб. Дальше сразу кнопка «Начать карьеру» — сезон откроется в этой же игре.</p>
      {groups.map((g) => (
        <div key={g.title} className="chips">
          {LEAGUES.filter((l) => g.ids.includes(l.id)).map((l) => (
            <button key={l.id} className={league === l.id ? "chip on" : "chip"} onClick={() => setLeague(l.id)}>{l.short}</button>
          ))}
        </div>
      ))}
      <p className="tiny">{leagueMeta(league).name}. Медийная лига — отдельно: там 2Drots и остальные медиа-клубы. В РПЛ 1–2 места идут в Лигу чемпионов, 3-е — в квалификацию, 4-е в Лигу Европы, 5–6 в Лигу конференций.</p>
      <div className="plist">
        {clubs.map((c) => (
          <button key={c.id} className="club" onClick={() => useFm.getState().prepare(c.id, name)}>
            <Badge club={c} />
            <span style={{ flex: 1 }}>
              <b>{c.name}</b>
              <small style={{ display: "block" }}>{c.city} · {c.stadium}</small>
            </span>
            <span className="tiny">{money(c.budget)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Desk() {
  const save = useFm((s) => s.save)!;
  const notice = useFm((s) => s.notice);
  const club = save.clubs.find((c) => c.id === save.clubId)!;
  const fx = userFixture(save);
  const opp = fx ? save.clubs.find((c) => c.id === (fx.home === club.id ? fx.away : fx.home)) : undefined;
  const { place, table } = placeOf(save);
  const unread = save.inbox.filter((m) => !m.read).length;
  const done = seasonDone(save);
  return (
    <section className="stack">
      {notice ? <div className="toast">{notice}</div> : null}
      <header className="spread">
        <div className="row">
          <Badge club={club} />
          <div>
            <h1 className="word" style={{ fontSize: "1.7rem" }}>{club.name}</h1>
            <p className="tiny" style={{ margin: 0 }}>{leagueMeta(club.league).short} · {formatDate(save.date)}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <b>{place || "—"}</b>
          <div className="tiny">место</div>
        </div>
      </header>
      <article className="card stack">
        <p className="kicker">Следующий матч</p>
        {done || !fx || !opp ? (
          <>
            <p>Календарь вашей лиги закрыт.</p>
            <button className="btn" onClick={() => useFm.getState().closeSeason()}>Подвести итог сезона</button>
          </>
        ) : (
          <>
            <div className="spread">
              <div className="row"><Badge club={fx.home === club.id ? club : opp} size={32} /><b>{fx.home === club.id ? club.short : opp.short}</b></div>
              <span className="tiny">{fx.label ?? (fx.home === club.id ? "дома" : "в гостях")} · {formatDate(fx.date)}</span>
              <div className="row"><b>{fx.home === club.id ? opp.short : club.short}</b><Badge club={fx.home === club.id ? opp : club} size={32} /></div>
            </div>
            <p className="tiny" style={{ margin: 0 }}>{formatDate(fx.date)} · {opp.stadium}</p>
            <button className="btn wide" onClick={() => useFm.getState().toMatch()}>К матчу</button>
          </>
        )}
      </article>
      <div className="grid2">
        <article className="card">
          <div className="spread"><b>Почта</b><button className="btn quiet" onClick={() => useFm.getState().go("inbox")}>{unread ? `${unread} новых` : "Открыть"}</button></div>
          <p className="tiny">{save.inbox[0]?.title ?? "Пусто"}</p>
        </article>
        <article className="card">
          <div className="spread"><b>Таблица</b><button className="btn quiet" onClick={() => useFm.getState().go("table")}>Вся</button></div>
          {table.slice(0, 4).map((r, i) => (
            <div key={r.club.id} className="spread tiny"><span>{i + 1}. {r.club.short}</span><b>{r.pts}</b></div>
          ))}
        </article>
      </div>
      <article className="card spread">
        <span>Бюджет <b>{money(save.budget)}</b></span>
        <span>Зарплаты <b>{wageText(wageBill(save))}</b></span>
        <span>Доверие <b>{save.confidence}</b></span>
      </article>
      <p className="tiny">Средний тонус состава {Math.round(playersOf(save, club.id).reduce((s, p) => s + p.cond, 0) / 20)}. Ниже 65 нужна восстановительная, иначе в матче команда играет слабее.</p>
      <div className="grid2">
        <button className="btn ghost" onClick={() => useFm.getState().go("tactics")}>Тактика</button>
        <button className="btn ghost" onClick={() => useFm.getState().go("squad")}>Состав</button>
      </div>
    </section>
  );
}

function Kits() {
  const draft = useFm((s) => s.draft);
  const notice = useFm((s) => s.notice);
  const [paint, setPaint] = useState<"primary" | "secondary" | "socks">("primary");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(draft?.manager ?? "");
  if (!draft) return <button className="btn" onClick={() => useFm.getState().go("pick")}>Назад</button>;
  const club = catalog().find((c) => c.id === draft.clubId)!;
  const begin = () => useFm.getState().start(draft.clubId, name);
  return (
    <section className="stack">
      <button className="btn quiet" onClick={() => useFm.getState().go("pick")}>К клубам</button>
      <h1 className="word" style={{ fontSize: "1.8rem" }}>Карьера «{club.name}»</h1>
      {notice ? <div className="toast">{notice}</div> : null}
      <label className="tiny">Тренер
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div className="grid2">
        <article className="card stack">
          <b>Домашняя</b>
          <Shirt kit={draft.home} size={96} />
        </article>
        <article className="card stack">
          <b>Гостевая</b>
          <Shirt kit={draft.away} size={96} />
        </article>
      </div>
      <div className="start-bar">
        <button className="btn wide" onClick={begin}>Начать карьеру</button>
      </div>
      <button className="btn ghost" onClick={() => setEdit((v) => !v)}>{edit ? "Скрыть редактор формы" : "Поменять форму"}</button>
      {edit ? (
        <div className="grid2">
          <article className="card stack">
            <b>Домашняя</b>
            <div className="chips">
              {homeTones(club).map((tone, i) => (
                <button key={i} className="chip" onClick={() => useFm.getState().tuneKit("home", { primary: tone.primary, secondary: tone.secondary, socks: tone.socks })}>Тон {i + 1}</button>
              ))}
            </div>
            <Designs kit={draft.home} onPick={(design) => useFm.getState().tuneKit("home", { design })} />
          </article>
          <article className="card stack">
            <b>Гостевая</b>
            <div className="chips">
              {(["primary", "secondary", "socks"] as const).map((key) => (
                <button key={key} className={paint === key ? "chip on" : "chip"} onClick={() => setPaint(key)}>{key === "primary" ? "Основа" : key === "secondary" ? "Отделка" : "Гетры"}</button>
              ))}
            </div>
            <div className="swatches">
              {PALETTE.map((color) => (
                <button key={color} className="swatch" style={{ background: color }} onClick={() => useFm.getState().tuneKit("away", { [paint]: color })} />
              ))}
            </div>
            <Designs kit={draft.away} onPick={(design) => useFm.getState().tuneKit("away", { design })} />
          </article>
        </div>
      ) : <p className="tiny">Форма уже в цветах клуба. Можно начать сразу или открыть редактор и сменить фасон.</p>}
    </section>
  );
}

function Designs({ kit, onPick }: { kit: { design: number; primary: string; secondary: string; socks: string }; onPick: (n: number) => void }) {
  return (
    <div className="designs">
      {DESIGNS.map((name, i) => (
        <button key={name} className={kit.design === i ? "design-chip on" : "design-chip"} title={name} onClick={() => onPick(i)}>
          <Shirt kit={{ ...kit, design: i }} size={48} />
          <span>{i + 1}. {name}</span>
        </button>
      ))}
    </div>
  );
}

function Squad() {
  const save = useFm((s) => s.save)!;
  const [roster, setRoster] = useState(false);
  const [g, setG] = useState<"all" | "GK" | "def" | "mid" | "att">("all");
  const list = playersOf(save, save.clubId)
    .filter((p) => g === "all" || (g === "GK" ? p.pos === "GK" : g === "def" ? "DR DL DC".includes(p.pos) : g === "mid" ? "DM MC AM MR ML".includes(p.pos) : "ST AM MR ML".includes(p.pos)))
    .sort((a, b) => overall(b) - overall(a));
  return (
    <section className="stack">
      <h1 className="word">Состав</h1>
      <p className="tiny">Схема и ползунки как в тактике. Кто не в основе — в узкой колонке справа от поля. Она не закрывает точки и настройки.</p>
      <LineupDesk
        slots={save.tactics.slots}
        onSwap={(index, playerId) => {
          useFm.getState().pickSlot(index);
          useFm.getState().assign(playerId);
        }}
      />
      <button className="btn ghost" onClick={() => setRoster((v) => !v)}>{roster ? "Скрыть список" : "Весь состав"}</button>
      {roster ? (
        <>
          <div className="chips">
            {([["all", "Все"], ["GK", "Вратари"], ["def", "Защита"], ["mid", "Полузащита"], ["att", "Атака"]] as const).map(([id, label]) => (
              <button key={id} className={g === id ? "chip on" : "chip"} onClick={() => setG(id)}>{label}</button>
            ))}
          </div>
          <div className="plist">
            {list.map((p) => (
              <button key={p.id} className="prow" onClick={() => useFm.getState().openPlayer(p.id)}>
                <span className="pos">{POS_RU[p.pos]}</span>
                <span>{playerName(p)} <small className="tiny">{p.age} · настрой {p.mor} · {p.injured ? `травма ${p.injured} дн.` : p.ban ? "дискв." : `тонус ${Math.round(p.cond)}`}</small></span>
                <span className="tiny">{p.goals} г</span>
                <span className="ovr">{overall(p)}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

function PlayerCard() {
  const save = useFm((s) => s.save)!;
  const id = useFm((s) => s.playerId);
  const notice = useFm((s) => s.notice);
  const p = save.players.find((x) => x.id === id) ?? (id ? peek(id) : undefined);
  const [years, setYears] = useState(p?.contract && p.contract > 1 ? Math.round(p.contract) : 3);
  const [wage, setWage] = useState(p?.wage ?? 20);
  const [clause, setClause] = useState(p?.clause || "без особых условий");
  if (!p) return <button className="btn" onClick={() => useFm.getState().go("squad")}>Назад</button>;
  const mine = p.clubId === save.clubId;
  const club = save.clubs.find((c) => c.id === p.clubId);
  const attrs: [string, number][] = p.pos === "GK"
    ? [["Вратарская", p.gk], ["Игра руками", p.def], ["Характер", p.men], ["Выбор позиции", p.pas]]
    : [["Скорость", p.pac], ["Удар", p.sho], ["Пас", p.pas], ["Техника", p.tec], ["Отбор", p.def], ["Мощь", p.strn], ["Выносливость", p.sta], ["Характер", p.men]];
  const clauses = ["без особых условий", "отступные ×2", "бонус за 10 голов", "опция аренды", "капитанская надбавка"];
  return (
    <section className="stack">
      <button className="btn quiet" onClick={() => useFm.getState().go(mine ? "squad" : "market")}>Назад</button>
      {notice ? <div className="toast">{notice}</div> : null}
      <header className="spread">
        <div>
          <p className="kicker">{POS_LONG[p.pos]} · {p.nat}</p>
          <h1 className="word" style={{ fontSize: "2rem" }}>{playerName(p)}</h1>
          <p className="tiny">{p.age} лет · {p.foot} нога · №{p.number} · {originOf(save, p)} · {club?.name ?? (p.clubId.startsWith("pool:") ? "трансферный лист" : "свободный агент")}</p>
        </div>
        <div className="ovr" style={{ fontSize: "2rem" }}>{overall(p)}</div>
      </header>
      <p>{scoutText(p)}</p>
      <div className="card stack">
        {attrs.map(([label, v]) => (
          <div key={label}>
            <div className="spread tiny"><span>{label}</span><b>{v}</b></div>
            <div className="bar"><span style={{ width: `${v * 5}%` }} /></div>
          </div>
        ))}
        <div>
          <div className="spread tiny"><span>Настрой</span><b>{p.mor}</b></div>
          <div className="bar"><span style={{ width: `${p.mor}%` }} /></div>
        </div>
      </div>
      <article className="card spread tiny">
        <span>Игры <b>{p.apps}</b></span>
        <span>Голы <b>{p.goals}</b></span>
        <span>Пасы <b>{p.assists}</b></span>
        <span>Оценка <b>{p.apps ? (p.ratingSum / p.apps).toFixed(2) : "—"}</b></span>
        <span>Рейтинг <b>{overall(p)}</b> · потолок {p.pot}</span>
        <span>Цена <b>{dollarText(p.value)}</b></span>
        <span>Контракт <b>{p.contract} г.</b> · {wageText(p.wage)}</span>
        {p.clause ? <span>Условие: {p.clause}</span> : null}
      </article>
      {mine ? (
        p.renewed ? (
          <article className="card stack">
            <b>Контракт уже продлён</b>
            <p className="tiny">В этом сезоне {playerName(p)} уже подписывал новые условия. Второй раз продлить нельзя — только после межсезонья. Сейчас: {p.contract} г., {wageText(p.wage)}{p.clause ? `, ${p.clause}` : ""}.</p>
            <button className="btn ghost" onClick={() => putXi(save, p.id)}>В основу</button>
            <button className="btn ghost" onClick={() => useFm.getState().list(p.id)}>{p.listed ? "Снять с трансфера" : "Выставить"}</button>
          </article>
        ) : (
          <article className="card stack">
            <b>Новый контракт</b>
            <p className="tiny">Годы, зарплата и пункт списываются из трансферного бюджета. После подписи продление в этом сезоне закрывается.</p>
            <div className="chips">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className={years === n ? "chip on" : "chip"} onClick={() => setYears(n)}>{n} г.</button>
              ))}
            </div>
            <label className="tiny">Зарплата, тыс. ₽ / нед. · сейчас {wageText(wage)}
              <input type="range" min={Math.max(8, Math.round(p.wage * 0.8))} max={Math.round(p.wage * 1.8)} value={wage} onChange={(e) => setWage(Number(e.target.value))} />
            </label>
            <div className="chips">
              {clauses.map((c) => (
                <button key={c} className={clause === c ? "chip on" : "chip"} onClick={() => setClause(c)}>{c}</button>
              ))}
            </div>
            <div className="grid2">
              <button className="btn" onClick={() => useFm.getState().renew(p.id, years, wage, clause)}>Подписать</button>
              <button className="btn ghost" onClick={() => putXi(save, p.id)}>В основу</button>
            </div>
            <button className="btn ghost" onClick={() => useFm.getState().list(p.id)}>{p.listed ? "Снять с трансфера" : "Выставить"}</button>
          </article>
        )
      ) : (
        <BidBox playerId={p.id} value={p.value} free={p.clubId === "free"} open={windowOpen(save.date, save.season)} />
      )}
    </section>
  );
}

function BidBox({ playerId, value, free, open }: { playerId: string; value: number; free: boolean; open: boolean }) {
  const ask = dollarText(value);
  const [usd, setUsd] = useState(Math.max(50_000, Math.round(value * 1_000_000 / 92)));
  const offer = (k: number) => useFm.getState().offerBid(playerId, rubFromDollars(Math.round((value * 1_000_000 / 92) * k)));
  return (
    <div className="stack">
      <p className="tiny">Запрос клуба {ask}. Сумма в долларах, тысячи через точку.</p>
      <div className="chips">
        <button className="chip" onClick={() => offer(0.8)}>80%</button>
        <button className="chip on" onClick={() => offer(1)}>100% · {ask}</button>
        <button className="chip" onClick={() => offer(1.25)}>125%</button>
      </div>
      <label className="tiny">Своя сумма, $
        <input type="number" value={usd} min={0} step={50000} onChange={(e) => setUsd(Number(e.target.value))} />
      </label>
      <button className="btn" onClick={() => useFm.getState().offerBid(playerId, rubFromDollars(usd))}>{free ? "Подписать" : `Предложить ${dollarText(rubFromDollars(usd))}`}</button>
      {!open && !free ? <p className="tiny">Окно закрыто. Лето до 12 сентября, зима 20 января — 25 февраля.</p> : null}
    </div>
  );
}

function putXi(save: Save, id: string) {
  const slots = [...save.tactics.slots];
  while (slots.length < 11) slots.push("");
  const have = slots.indexOf(id);
  if (have >= 0) slots[have] = "";
  else {
    const empty = slots.findIndex((s) => !s);
    slots[empty >= 0 ? empty : 10] = id;
  }
  useFm.getState().patchTactic({ slots });
  useFm.getState().go("tactics");
}

function StyleChips({ style }: { style: Save["tactics"]["style"] }) {
  return (
    <div className="chips">
      {STYLES.map((s) => (
        <button key={s.id} className={style === s.id ? "chip on" : "chip"} onClick={() => useFm.getState().patchTactic({ style: s.id })}>{s.name}</button>
      ))}
    </div>
  );
}

function LineupDesk({ slots, onSwap, compact, selectedId }: { slots: string[]; onSwap: (slot: number, playerId: string) => void; compact?: boolean; selectedId?: string }) {
  const save = useFm((s) => s.save)!;
  const [slot, setSlot] = useState<number | null>(null);
  const [hold, setHold] = useState<string | null>(null);
  const form = FORMATIONS[save.tactics.formation];
  const fromPitch = selectedId ? slots.indexOf(selectedId) : -1;
  const active = slot != null ? slot : fromPitch >= 0 ? fromPitch : null;
  const bench = playersOf(save, save.clubId).filter((p) => !slots.includes(p.id) && p.injured <= 0 && p.ban <= 0).sort((a, b) => overall(b) - overall(a));
  const swap = (index: number, playerId: string) => {
    onSwap(index, playerId);
    setSlot(null);
    setHold(null);
  };
  return (
    <div className="stack">
      <div className="chips">
        {(Object.keys(FORMATIONS) as (keyof typeof FORMATIONS)[]).map((id) => (
          <button key={id} className={save.tactics.formation === id ? "chip on" : "chip"} onClick={() => useFm.getState().patchTactic({ formation: id })}>{id}</button>
        ))}
      </div>
      <div className={`lineup-row${compact ? " compact" : ""}`}>
        <div className={`pitch${compact ? " compact" : ""}`}>
          <div className="pitch-inset">
          {form.map((spot, i) => {
            const p = save.players.find((x) => x.id === slots[i]);
            const pos = shapeSlot(spot, save.tactics);
            return (
              <button key={i} className={active === i ? "dot on" : "dot"} style={{ left: `${pos.x}%`, top: `${pos.y}%` }} onClick={() => (hold ? swap(i, hold) : setSlot(i))}>
                <b>{POS_RU[spot.pos]}</b>
                {p ? p.last : "пусто"}
              </button>
            );
          })}
          </div>
        </div>
        <aside className="bench-col">
          <b>Запас</b>
          <p className="tiny">{active != null ? `Выбран ${POS_RU[form[active]!.pos]}. Кого выпустить?` : hold ? "Нажмите точку на схеме." : "Точка, затем игрок."}</p>
          <div className="plist">
            {bench.length ? bench.map((p) => (
              <button key={p.id} className={hold === p.id ? "prow on" : "prow"} title={`${playerName(p)} · тонус ${Math.round(p.cond)}`} onClick={() => (active != null ? swap(active, p.id) : setHold(p.id))}>
                <span className="pos">{POS_RU[p.pos]}</span>
                <span>{p.last}</span>
                <span className="ovr">{overall(p)}</span>
              </button>
            )) : <p className="tiny">Свободных игроков нет.</p>}
          </div>
        </aside>
      </div>
      <p className="tiny">{shapeText(save.tactics)}</p>
      <StyleChips style={save.tactics.style} />
      <Slider label="Менталитет" value={save.tactics.mentality + 2} max={4} text={["Очень низко", "Низко", "Баланс", "Атака", "Все вперёд"][save.tactics.mentality + 2]!} onChange={(v) => useFm.getState().patchTactic({ mentality: (v - 2) as -2 | -1 | 0 | 1 | 2 })} />
      <Slider label="Прессинг" value={save.tactics.press} text={["Нет", "Низкий", "Середина", "Высокий", "Прессинг"][save.tactics.press] ?? String(save.tactics.press)} onChange={(v) => useFm.getState().patchTactic({ press: v })} />
      <Slider label="Темп" value={save.tactics.tempo} text={["Медленно", "Спокойно", "Середина", "Быстро", "Рвать"][save.tactics.tempo] ?? String(save.tactics.tempo)} onChange={(v) => useFm.getState().patchTactic({ tempo: v })} />
      <Slider label="Линия обороны" value={save.tactics.line} text={["Низко", "Ниже", "Середина", "Высоко", "Вперёд"][save.tactics.line] ?? String(save.tactics.line)} onChange={(v) => useFm.getState().patchTactic({ line: v })} />
      <Slider label="Ширина" value={save.tactics.width} text={["Узко", "Уже", "Середина", "Широко", "Во фланг"][save.tactics.width] ?? String(save.tactics.width)} onChange={(v) => useFm.getState().patchTactic({ width: v })} />
    </div>
  );
}

function Tactics() {
  const save = useFm((s) => s.save)!;
  const notice = useFm((s) => s.notice);
  const strength = xiStrength(save, save.tactics.slots, save.tactics.formation, save.tactics);
  const squad = playersOf(save, save.clubId);
  const tone = Math.round(squad.reduce((s, p) => s + p.cond, 0) / Math.max(1, squad.length));
  const sharp = Math.round(squad.reduce((s, p) => s + p.sharp, 0) / Math.max(1, squad.length));
  return (
    <section className="stack">
      <div className="spread">
        <h1 className="word">Тактика</h1>
        <button className="btn quiet" onClick={() => useFm.getState().auto()}>Авто</button>
      </div>
      {notice ? <div className="toast">{notice}</div> : null}
      <p className="tiny">Семь стилей двигают ползунки и точки на схеме. Атака {strength.att.toFixed(1)}, оборона {strength.def.toFixed(1)}, общий {strength.avg.toFixed(1)}. Тонус {tone}, острота {sharp}.</p>
      <LineupDesk
        slots={save.tactics.slots}
        onSwap={(index, playerId) => {
          useFm.getState().pickSlot(index);
          useFm.getState().assign(playerId);
        }}
      />
      <p className="tiny">Кнопки под ползунками сразу двигают менталитет, прессинг, темп, линию или ширину. Раз в день ещё меняют тонус и остроту игроков.</p>
      <div className="grid2">
        {([
          ["attack", "Установка: атака", "Менталитет, темп и прессинг вверх"],
          ["defence", "Установка: оборона", "Ниже линия, меньше прессинг"],
          ["set", "Стандарты", "Шире фланги, спокойнее темп"],
          ["physical", "Объём", "Темп и прессинг вверх, тонус вниз"],
          ["rest", "Восстановление", "Спокойнее план, тонус вверх"],
        ] as const).map(([id, label, hint]) => (
          <button key={id} className={save.focus === id ? "btn" : "btn ghost"} onClick={() => useFm.getState().doTrain(id)}>
            {label}
            <small style={{ display: "block", fontWeight: 500 }}>{hint}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function Slider({ label, value, onChange, text, max = 4 }: { label: string; value: number; onChange: (v: number) => void; text: string; max?: number }) {
  return (
    <label className="tiny">{label}: {text}
      <input type="range" min={0} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%" }} />
    </label>
  );
}

function Match() {
  const save = useFm((s) => s.save)!;
  const live = useFm((s) => s.live);
  const [out, setOut] = useState<string>("");
  const [forced, setForced] = useState(false);
  const [land, setLand] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(orientation: landscape)");
    const apply = () => setLand(q.matches);
    apply();
    q.addEventListener("change", apply);
    return () => q.removeEventListener("change", apply);
  }, []);
  const wide = land || forced;
  const fx = (live ? save.fixtures.find((f) => f.id === live.fixtureId) : undefined) ?? userFixture(save);
  if (!fx) return <p>Матчей больше нет.</p>;
  const home = save.clubs.find((c) => c.id === fx.home)!;
  const away = save.clubs.find((c) => c.id === fx.away)!;
  const oppId = fx.home === save.clubId ? fx.away : fx.home;
  const info = report(save, oppId);
  return (
    <section className={`stack match-screen${wide ? " match-wide" : ""}`}>
      <div className="spread">
        <button className="btn quiet" onClick={() => useFm.getState().go("desk")}>В кабинет</button>
        <button className="btn quiet" onClick={() => setForced((v) => !v)}>{wide ? "Поле обычно" : "Поле шире"}</button>
        {live && !live.done && !live.paused && !live.userPause ? <button className="btn quiet" onClick={() => useFm.getState().pauseMatch()}>Пауза</button> : null}
      </div>
      <div className="spread">
        <div className="row"><Shirt kit={fx.home === save.clubId ? save.kit.home : autoKit(home, "home")} size={36} /><b>{home.short}</b></div>
        <p className="score">{live ? `${live.hg}:${live.ag}` : "—"}</p>
        <div className="row"><b>{away.short}</b><Shirt kit={fx.away === save.clubId ? save.kit.away : autoKit(away, "away")} size={36} /></div>
      </div>
      <p className="tiny" style={{ textAlign: "center", margin: 0 }}>{fx.label ? `${fx.label} · ` : ""}{live ? `${live.minute}' · xG ${live.xgH.toFixed(2)}:${live.xgA.toFixed(2)}` : formatDate(fx.date)} {info.derby ? "· дерби" : ""}</p>
      {!live ? (
        <article className="card stack">
          <p className="kicker">Справка на соперника</p>
          <p style={{ margin: 0 }}>{info.text}</p>
          {info.danger ? <p className="tiny">Опасен {playerName(info.danger)}, рейтинг {overall(info.danger)}, настрой {info.danger.mor}.</p> : null}
          <p className="tiny">Состав {info.myOvr} против {info.theirOvr}. Оба тайма вместе — {save.matchMins === 3 || save.matchMins === 5 ? save.matchMins : 2} мин.</p>
          <button className="btn wide" onClick={() => useFm.getState().kickoff(false)}>Смотреть матч</button>
          <button className="btn ghost wide" onClick={() => useFm.getState().kickoff(true)}>Сразу результат</button>
          <ForfeitButton wide />
          <p className="tiny">Если сыграть не можете — техническое поражение до свистка. Сопернику засчитают победу 3:0.</p>
        </article>
      ) : live.technical ? (
        <Result save={save} />
      ) : (
        <>
          <PitchLive save={save} live={live} home={home} away={away} selected={out} wide={wide} onSelect={live.userPause || live.paused ? setOut : undefined} />
          <p className="tiny pitch-hint" style={{ textAlign: "center" }}>Большую часть матча мяч в ногах: игроки ведут его и отдают передачи. Штрафные, пенальти, угловые и ауты — короткие остановки. Поверните телефон — поле станет шире.</p>
          {(live.userPause || live.paused) && !live.done ? <MatchPlan save={save} live={live} out={out} setOut={setOut} /> : null}
          {live.done ? <Result save={save} /> : null}
          <p className="fm-line">{live.minute > 0 ? `${live.minute}'  ` : ""}{live.line}</p>
        </>
      )}
    </section>
  );
}

function MatchPlan({ save, live, out, setOut }: { save: Save; live: NonNullable<ReturnType<typeof useFm.getState>["live"]>; out: string; setOut: (id: string) => void }) {
  const half = live.paused && live.minute === 45 && !live.events.some((e) => e.kind === "ht");
  return (
    <article className="card stack match-plan">
      <b>{half ? "Перерыв" : "Пауза"}</b>
      <div className="stack">
        <button className="btn wide" onClick={() => useFm.getState().resumeSim()}>Просимулировать дальше</button>
        <ForfeitButton wide />
      </div>
      <p className="tiny">Дальше матч идёт своим ходом. Техническое поражение сразу закрывает игру: в протоколе 3:0 в пользу соперника. Запасные — колонка справа от поля, ползунки под ней и ничего не перекрывают. Замена на остановке, лимит пять. Уже вышли: {live.subsUsed}.</p>
      <LineupDesk
        compact
        slots={live.xi}
        selectedId={out}
        onSwap={(index, playerId) => {
          const id = live.xi[index];
          if (!id) return;
          setOut(id);
          useFm.getState().queueSub(id, playerId);
        }}
      />
      {live.pending.length ? <p className="tiny">Ждут остановки: {live.pending.map((s) => save.players.find((p) => p.id === s.in)?.last).filter(Boolean).join(", ")}.</p> : null}
    </article>
  );
}

function ForfeitButton({ wide }: { wide?: boolean }) {
  const [arm, setArm] = useState(false);
  return (
    <button className={`btn ghost danger${wide ? " wide" : ""}`} onClick={() => (arm ? useFm.getState().forfeit() : setArm(true))}>
      {arm ? "Подтвердить 0:3" : "Техническое поражение"}
    </button>
  );
}

function Result({ save }: { save: Save }) {
  const live = useFm((s) => s.live)!;
  const { place } = placeOf(save);
  const gf = live.home ? live.hg : live.ag;
  const ga = live.home ? live.ag : live.hg;
  const word = gf > ga ? "Победа" : gf === ga ? "Ничья" : "Поражение";
  return (
    <article className="card stack">
      <p className="kicker">{live.technical ? "Техническое поражение" : word}</p>
      <p style={{ margin: 0 }}>{live.technical ? `В протоколе 3:0 в пользу соперника${live.home ? " — на табло 0:3" : " — на табло 3:0"}. Вы ${place}-е. Доверие ${save.confidence}.` : `xG ${live.xgH.toFixed(2)} : ${live.xgA.toFixed(2)}. Вы ${place}-е. Доверие ${save.confidence}.`}</p>
      {live.technical && !Object.keys(live.ratings).length ? <p className="tiny">Состав на поле не выходил, оценки не ставятся.</p> : (
      <div className="plist">
        {live.xi.map((id) => {
          const p = save.players.find((x) => x.id === id);
          if (!p) return null;
          return <div key={id} className="spread tiny"><span>{POS_RU[p.pos]} {p.last}</span><b>{live.ratings[id] != null ? live.ratings[id].toFixed(1) : "—"}</b></div>;
        })}
      </div>
      )}
      <button className="btn" onClick={() => useFm.getState().go("desk")}>Дальше</button>
    </article>
  );
}

function Table() {
  const save = useFm((s) => s.save)!;
  const league = useFm((s) => s.league);
  const real = tableOf(save, league);
  const russian = league === "rpl" || league === "fnl" || league === "fnl2" || league === "fnl3";
  return (
    <section className="stack">
      <h1 className="word">Таблица</h1>
      <div className="chips">
        {LEAGUES.filter((l) => save.clubs.some((c) => c.league === l.id) || l.id === league).map((l) => (
          <button key={l.id} className={league === l.id ? "chip on" : "chip"} onClick={() => useFm.getState().setLeague(l.id)}>{l.short}</button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>#</th><th>Клуб</th><th>И</th><th>В</th><th>Н</th><th>П</th><th>М</th><th>О</th>
            </tr>
          </thead>
          <tbody>
            {real.map((r, i) => (
              <tr key={r.club.id} className={`${r.club.id === save.clubId ? "me" : ""} zone-${rowZone(league, i, real.length)}`}>
                <td>{i + 1}{russian && i === 4 ? "*" : ""}</td>
                <td>{r.club.short}</td>
                <td>{r.p}</td>
                <td>{r.w}</td>
                <td>{r.d}</td>
                <td>{r.l}</td>
                <td>{r.gf}:{r.ga}</td>
                <td><b>{r.pts}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="tiny">{league === "rpl" ? "РПЛ: 1–2 Лига чемпионов, 3-е квалификация ЛЧ (не прошли — Лига Европы), 4-е Лига Европы, 5–6 Лига конференций. Вылетают четыре места, не пять: 13–14 играют стыки, 15–16 уходят сразу. Звёздочка — 5-е место играет квалификацию со всеми российскими лигами." : league === "fnl3" ? "ФНЛ-3: 1–2 прямо в ФНЛ-2. 5-е место — квалификация с 5-ми ФНЛ-2, Первой лиги и РПЛ. Вылета нет: слабый сезон или два подряд могут стоить работы, но клуб остаётся." : league === "fnl" || league === "fnl2" ? "Два первых выходят прямо. 5-е играет пирамиду: большинство побед поднимает на лигу выше. Четыре последних вылетают." : league === "media" ? "Медийная лига идёт отдельно от РПЛ и ФНЛ. В Кубок России каждый сезон попадают четыре случайные команды отсюда." : `${leagueMeta(league).name}. Зарубежный чемпионат идёт своей таблицей.`}</p>
      {seasonDone(save) ? <button className="btn" onClick={() => useFm.getState().closeSeason()}>Закрыть сезон и перейти дальше</button> : null}
    </section>
  );
}

function Market() {
  const save = useFm((s) => s.save)!;
  const [q, setQ] = useState("");
  const [pos, setPos] = useState<Pos | "all">("all");
  const [nation, setNation] = useState("all");
  const [afford, setAfford] = useState(false);
  const [minOvr, setMinOvr] = useState(50);
  const [wish, setWish] = useState<Wish>("all");
  const budgetUsd = Math.round(save.budget * 1e6 / 92);
  const rows = marketRows(save, nation).filter((p) => pos === "all" || p.pos === pos).filter((p) => fitsWish(p, wish)).filter((p) => !afford || Math.round(p.value * 1e6 / 92) <= budgetUsd).filter((p) => overall(p) >= minOvr).filter((p) => !q || `${p.first} ${p.last} ${p.nat} ${originOf(save, p)}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => overall(b) - overall(a)).slice(0, 40);
  const pickNation = (id: string) => {
    setNation(id);
    const meta = NATIONS.find((n) => n.id === id);
    if (meta?.inGame) useFm.getState().scout(meta.inGame);
  };
  const wishes: [Wish, string][] = [["all", "Все"], ["tec", "Техничный"], ["strn", "Сильный"], ["pac", "Быстрый"], ["sho", "Удар"], ["pas", "Пас"], ["def", "Отбор"]];
  return (
    <section className="stack">
      <h1 className="word">Рынок</h1>
      <p className="tiny">{windowOpen(save.date, save.season) ? "Окно открыто." : "Окно закрыто. Свободных агентов подписать можно всегда."} Бюджет {dollarText(save.budget)}. Цены в долларах. Страна — это лига. Топ-15 по уровню FC 27, остальные — ближайший уровень Football Manager.</p>
      <input type="search" placeholder="Фамилия или страна" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="chips">
        <button className={nation === "all" ? "chip on" : "chip"} onClick={() => setNation("all")}>Все страны</button>
        {NATIONS.filter((n) => n.top).map((n) => (
          <button key={n.id} className={nation === n.id ? "chip on" : "chip"} onClick={() => pickNation(n.id)}>{n.country}</button>
        ))}
      </div>
      <div className="chips">
        {NATIONS.filter((n) => !n.top).map((n) => (
          <button key={n.id} className={nation === n.id ? "chip on" : "chip"} onClick={() => pickNation(n.id)}>{n.country === "Россия" ? n.league : n.country}</button>
        ))}
      </div>
      <div className="chips">
        <button className={afford ? "chip on" : "chip"} onClick={() => setAfford((v) => !v)}>По бюджету</button>
        {wishes.map(([id, label]) => (
          <button key={id} className={wish === id ? "chip on" : "chip"} onClick={() => setWish(id)}>{label}</button>
        ))}
      </div>
      <label className="tiny">Рейтинг от {minOvr}
        <input type="range" min={50} max={90} value={minOvr} onChange={(e) => setMinOvr(Number(e.target.value))} style={{ width: "100%" }} />
      </label>
      <div className="chips">
        {(["all", "GK", "DC", "DR", "DL", "DM", "MC", "AM", "MR", "ML", "ST"] as const).map((id) => (
          <button key={id} className={pos === id ? "chip on" : "chip"} onClick={() => setPos(id)}>{id === "all" ? "Все" : POS_RU[id]}</button>
        ))}
      </div>
      <div className="plist">
        {rows.map((p) => (
          <button key={p.id} className="prow" onClick={() => useFm.getState().openPlayer(p.id)}>
            <span className="pos">{POS_RU[p.pos]}</span>
            <span>{playerName(p)} <small className="tiny">{originOf(save, p)} · {p.age} лет · настрой {p.mor} · {dollarText(p.value)}</small></span>
            <span />
            <span className="ovr">{overall(p)}</span>
          </button>
        ))}
        {!rows.length ? <p className="tiny">Никого по этому фильтру. Снизьте рейтинг или снимите «по бюджету».</p> : null}
      </div>
    </section>
  );
}

function Inbox() {
  const save = useFm((s) => s.save)!;
  const [open, setOpen] = useState(save.inbox[0]?.id ?? null);
  return (
    <section className="stack">
      <h1 className="word">Почта</h1>
      {save.inbox.map((m) => (
        <article key={m.id} className="card stack">
          <button className="club" onClick={() => { setOpen(m.id); useFm.getState().read(m.id); }}>
            <span style={{ flex: 1 }}>
              <b>{m.title}</b>
              <small style={{ display: "block" }}>{m.from} · {m.date} {m.read ? "" : "· новое"}</small>
            </span>
          </button>
          {open === m.id ? (
            <>
              <p style={{ margin: 0 }}>{m.body}</p>
              {m.offer ? (
                <div className="grid2">
                  <button className="btn" onClick={() => useFm.getState().accept(m.id)}>Продать за {money(m.offer.fee)}</button>
                  <button className="btn ghost" onClick={() => useFm.getState().reject(m.id)}>Отказать</button>
                </div>
              ) : null}
            </>
          ) : null}
        </article>
      ))}
    </section>
  );
}

function Money() {
  const save = useFm((s) => s.save)!;
  const club = save.clubs.find((c) => c.id === save.clubId)!;
  const bill = wageBill(save);
  const cap = wageCap(club.rep);
  return (
    <section className="stack">
      <h1 className="word">Финансы</h1>
      <article className="card stack">
        <div className="spread"><span>Трансферный бюджет</span><b>{money(save.budget)}</b></div>
        <div className="spread"><span>Счёт клуба</span><b>{money(save.balance)}</b></div>
        <div className="spread"><span>Зарплаты в неделю</span><b>{wageText(bill)}</b></div>
        <div className="spread"><span>Потолок</span><b>{wageText(cap)}</b></div>
        <div className="bar"><span style={{ width: `${Math.min(100, bill / cap * 100)}%` }} /></div>
        <p className="tiny">Спонсор приходит 1-го числа. Зарплаты списываются по понедельникам. Долг на счёте злит совет.</p>
      </article>
      <article className="card">
        <div className="spread"><span>Доверие</span><b>{save.confidence}</b></div>
        <div className="bar"><span style={{ width: `${save.confidence}%` }} /></div>
        <p className="tiny">Ниже 16 после восьми туров совет увольняет. Победа крупного клуба ценится выше, чем ничья аутсайдера.</p>
      </article>
    </section>
  );
}

function Calendar() {
  const save = useFm((s) => s.save)!;
  const club = save.clubs.find((c) => c.id === save.clubId)!;
  const rows = save.fixtures.filter((f) => f.home === club.id || f.away === club.id);
  return (
    <section className="stack">
      <div className="spread">
        <h1 className="word">Календарь</h1>
        <button className="btn quiet" onClick={() => useFm.getState().advanceDay()}>+ день</button>
      </div>
      <p className="tiny">Зимняя пауза с 7 декабря по 1 марта. Если уйти с игрового дня кнопкой «+ день», матч досимулирует помощник.</p>
      <div className="plist">
        {rows.map((f) => {
          const opp = save.clubs.find((c) => c.id === (f.home === club.id ? f.away : f.home));
          const home = f.home === club.id;
          return (
            <div key={f.id} className="spread card" style={{ padding: 10 }}>
              <span className="tiny">{f.date.slice(8)}.{f.date.slice(5, 7)} · {f.label ?? f.comp ?? "лига"}</span>
              <b>{home ? "Д" : "Г"} {opp?.short}</b>
              <span>{f.played ? `${home ? f.hg : f.ag}:${home ? f.ag : f.hg}` : "—"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Sacked() {
  const save = useFm((s) => s.save)!;
  return (
    <section className="stack" style={{ paddingTop: 28 }}>
      <p className="kicker">Совет директоров</p>
      <h1 className="word">Вы уволены</h1>
      <p>Доверие упало до {save.confidence}. Ниже — клубы, которые готовы поговорить.</p>
      {save.offers.map((o) => {
        const c = save.clubs.find((x) => x.id === o.clubId);
        if (!c) return null;
        return (
          <button key={c.id} className="club" onClick={() => useFm.getState().job(c.id)}>
            <Badge club={c} />
            <span>
              <b>{c.name}</b>
              <small style={{ display: "block" }}>{leagueMeta(c.league).short} · {c.city}</small>
            </span>
          </button>
        );
      })}
      <button className="btn ghost" onClick={() => useFm.getState().go("pick")}>Начать заново</button>
    </section>
  );
}

function Cups() {
  const save = useFm((s) => s.save)!;
  const mine = save.fixtures.filter((f) => (f.home === save.clubId || f.away === save.clubId) && f.comp && f.comp !== "league");
  return (
    <section className="stack">
      <h1 className="word">Кубки</h1>
      <article className="card stack">
        <p className="kicker">FONBET Кубок России</p>
        <p className="tiny">102 клуба: 16 РПЛ — 4 группы по 4, два круга. Путь регионов: Первая лига, ФНЛ-2, ФНЛ-3, любители и четыре клуба медийной лиги по жребию сезона ({mediaInCup(save).map((c) => c.short).join(", ")}). Дальше сетка 1/8, четверть, полуфинал и финал.</p>
        {["A", "B", "C", "D"].map((letter) => {
          const games = save.fixtures.filter((f) => f.comp === "cup" && f.label?.includes(`группа ${letter}`));
          if (!games.length) return null;
          const ids = new Set<string>();
          games.forEach((f) => {
            ids.add(f.home);
            ids.add(f.away);
          });
          const rows = [...ids].map((id) => ({ id, pts: 0, gf: 0, ga: 0 }));
          for (const f of games) {
            if (!f.played || f.hg == null || f.ag == null) continue;
            const h = rows.find((r) => r.id === f.home)!;
            const a = rows.find((r) => r.id === f.away)!;
            h.gf += f.hg;
            h.ga += f.ag;
            a.gf += f.ag;
            a.ga += f.hg;
            if (f.hg > f.ag) h.pts += 3;
            else if (f.hg < f.ag) a.pts += 3;
            else {
              h.pts++;
              a.pts++;
            }
          }
          rows.sort((a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga));
          return (
            <div key={letter}>
              <b>Группа {letter}</b>
              {rows.map((r, i) => (
                <div key={r.id} className="spread tiny">
                  <span>{i + 1}. {save.clubs.find((c) => c.id === r.id)?.short ?? r.id}</span>
                  <span>{r.pts}</span>
                </div>
              ))}
            </div>
          );
        })}
      </article>
      <article className="card stack">
        <p className="kicker">Еврокубки · сетка</p>
        <p className="tiny">{save.euro.comp ? `${save.euro.comp === "ucl" ? "Лига чемпионов" : save.euro.comp === "uel" ? "Лига Европы" : "Лига конференций"} · ${save.euro.stage === "qual" ? "квалификация" : save.euro.stage === "league" ? "общий этап" : save.euro.stage === "ko" ? "плей-офф" : save.euro.stage === "out" ? "вылет" : "турнир закрыт"}. Очки ${save.euro.pts}, мячи ${save.euro.gf}:${save.euro.ga}. 3-е место РПЛ начинает с квалификации: не прошли — падаете в Лигу Европы. Сетка дальше как в большом симуляторе: общий этап, 1/8, 1/4, 1/2, финал.` : "В этом сезоне еврокубков нет. Они открываются местами РПЛ: 1–2 ЛЧ, 3-е квалификация, 4-е Лига Европы, 5–6 Лига конференций."}</p>
        <div className="bracket">
          {["Квалификация", "Общий этап", "1/8", "1/4", "1/2", "Финал"].map((name) => (
            <span key={name} className="chip">{name}</span>
          ))}
        </div>
      </article>
      <div className="plist">
        {mine.map((f) => {
          const opp = save.clubs.find((c) => c.id === (f.home === save.clubId ? f.away : f.home));
          const home = f.home === save.clubId;
          return (
            <div key={f.id} className="spread card" style={{ padding: 10 }}>
              <span className="tiny">{f.date.slice(8)}.{f.date.slice(5, 7)} · {f.label ?? f.comp}</span>
              <b>{home ? "Д" : "Г"} {opp?.short ?? "?"}</b>
              <span>{f.played ? `${home ? f.hg : f.ag}:${home ? f.ag : f.hg}` : "—"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Nav() {
  const screen = useFm((s) => s.screen);
  const save = useFm((s) => s.save);
  const items = [
    ["desk", "Кабинет"],
    ["squad", "Состав"],
    ["tactics", "Тактика"],
    ["table", "Лига"],
    ["more", "Прочее"],
  ] as const;
  const [more, setMore] = useState(false);
  const [saved, setSaved] = useState("");
  const [confirm, setConfirm] = useState(false);
  const diff = save?.difficulty ?? "experienced";
  const mins = save?.matchMins === 3 || save?.matchMins === 5 ? save.matchMins : 2;
  const diffs = [
    ["novice", "Новичок", "Почти все ваши матчи заканчиваются победой. Так весь сезон."],
    ["experienced", "Опытный", "Решает рейтинг состава. Равный соперник может забрать очки."],
    ["pro", "Профессионал", "Нужен заметный перевес. Близкие команды чаще играют вничью."],
    ["world", "Мировой класс", "80 против 75 — тяжело. 85 против 75 уже легче. С сильным соперником ничьих больше, чем побед."],
  ] as const;
  return (
    <>
      {more ? (
        <div className="sheet stack">
          <div className="grid2">
            <button className="btn ghost" onClick={() => { setMore(false); useFm.getState().go("market"); }}>Рынок</button>
            <button className="btn ghost" onClick={() => { setMore(false); useFm.getState().go("inbox"); }}>Почта</button>
            <button className="btn ghost" onClick={() => { setMore(false); useFm.getState().go("money"); }}>Финансы</button>
            <button className="btn ghost" onClick={() => { setMore(false); useFm.getState().go("calendar"); }}>Календарь</button>
            <button className="btn ghost" onClick={() => { setMore(false); useFm.getState().go("cups"); }}>Кубки</button>
            <button className="btn ghost" onClick={() => { setMore(false); useFm.getState().go("honors"); }}>Заслуги</button>
          </div>
          <button className="btn wide" onClick={() => setSaved(useFm.getState().manualSave() ? "Карьера записана в этот кабинет." : "Сначала выберите клуб.")}>Сохранить</button>
          {saved ? <p className="tiny" style={{ margin: 0 }}>{saved}</p> : null}
          <p className="tiny" style={{ margin: 0 }}>Сложность ботов на все матчи и сезоны</p>
          <div className="chips">
            {diffs.map(([id, label]) => (
              <button key={id} className={diff === id ? "chip on" : "chip"} onClick={() => useFm.getState().setOption({ difficulty: id })}>{label}</button>
            ))}
          </div>
          <p className="tiny" style={{ margin: 0 }}>{diffs.find((d) => d[0] === diff)?.[2]}</p>
          <p className="tiny" style={{ margin: 0 }}>Время матча, оба тайма</p>
          <div className="chips">
            {([2, 3, 5] as const).map((n) => (
              <button key={n} className={mins === n ? "chip on" : "chip"} onClick={() => useFm.getState().setOption({ matchMins: n })}>{n} мин</button>
            ))}
          </div>
          <button className="danger" onClick={() => { if (!confirm) { setConfirm(true); return; } useFm.getState().wipeCareer(); setMore(false); }}>{confirm ? "Точно удалить карьеру" : "Удалить карьеру"}</button>
        </div>
      ) : null}
      <nav className="nav">
        {items.map(([id, label]) => (
          <button key={id} className={id === "more" ? more ? "on" : "" : screen === id ? "on" : ""} onClick={() => id === "more" ? (setSaved(""), setConfirm(false), setMore((v) => !v)) : (setMore(false), useFm.getState().go(id))}>{label}</button>
        ))}
      </nav>
    </>
  );
}

function mark(short: string) {
  const parts = short.replace(/\./g, "").split(/\s+/).filter(Boolean);
  if (parts.length > 1) return parts.map((p) => p[0]).join("").slice(0, 3);
  return short.slice(0, 3);
}

function Badge({ club, size = 44 }: { club: Club; size?: number }) {
  return (
    <span className="badge" style={{ background: club.color, color: club.color2 === "#ffffff" ? "#fff" : club.color2, width: size, height: size }}>{mark(club.short)}</span>
  );
}
