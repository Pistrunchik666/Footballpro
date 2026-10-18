import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Download,
  FolderOpen,
  Pause,
  Play,
  RotateCcw,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { canJoin, nextUserFixture, table } from "@/game/career";
import { clubById, CLUBS, kitColor, kitsClash, PLAYER_NAME } from "@/game/clubs";
import { unlockAudio } from "@/game/audio";
import { commitShot, previewAim, world } from "@/game/runtime";
import { clashNow, ensurePlayable, saveNow, useGame } from "@/game/store";
import type { KitSide } from "@/game/types";

export function Overlay() {
  const screen = useGame((s) => s.screen);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") useGame.getState().togglePause();
    };
    window.addEventListener("keydown", onKey);
    const hide = () => {
      if (document.visibilityState === "hidden") saveNow();
    };
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("pagehide", saveNow);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", saveNow);
    };
  }, []);

  return (
    <div className="ui">
      {screen === "menu" ? <Menu /> : null}
      {screen === "saves" ? <Saves /> : null}
      {screen === "clubs" ? <Clubs /> : null}
      {screen === "hub" ? <Hub /> : null}
      {screen === "kits" ? <Kits /> : null}
      {screen === "season" ? <Season /> : null}
      {screen === "match" ? <MatchHud /> : null}
    </div>
  );
}

function Menu() {
  const level = useGame((s) => s.level);
  const goals = useGame((s) => s.fkGoals);
  const career = useGame((s) => s.career);
  const cont = useGame((s) => s.continueGame);
  const free = useGame((s) => s.startFreekick);
  const train = useGame((s) => s.startTraining);
  const clubs = useGame((s) => s.openClubs);
  const hub = useGame((s) => s.openHub);
  const saves = useGame((s) => s.openSaves);
  const canContinue = Boolean(career) || level > 1 || goals > 0;

  return (
    <section className="panel menu-panel">
      <p className="eyebrow">Штрафные</p>
      <h1 className="display logo">Football Pro</h1>
      <p className="lede">Сезон за клуб, удар со стандарта и папка сохранений. Свайп вверх — сила, изгиб — закрутка.</p>
      <div className="stack">
        {canContinue ? (
          <button className="btn btn-primary" onClick={cont}>
            Продолжить
          </button>
        ) : null}
        <button className="btn btn-primary" onClick={free}>
          Штрафные · {level}/100
        </button>
        <button className="btn btn-ghost" onClick={career ? hub : clubs}>
          Карьера
        </button>
        <button className="btn btn-ghost" onClick={train}>
          Тренировка
        </button>
        <button className="btn btn-quiet" onClick={saves}>
          <FolderOpen size={16} /> Папка сохранений
        </button>
      </div>
    </section>
  );
}

function SwipeLane() {
  const start = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);

  const aim = (dx: number, dy: number) => {
    const power = Math.max(0, Math.min(1, -dy / 140));
    const side = Math.max(-1, Math.min(1, dx / 110));
    world.power = power;
    if (power > 0.05) previewAim(side * 0.82, power, side);
    else world.spin = side;
  };

  return (
    <div
      className="swipe-lane hud-hit"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        unlockAudio();
        ensurePlayable();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* already captured */
        }
        start.current = { x: e.clientX, y: e.clientY };
        moved.current = false;
      }}
      onPointerMove={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;
        if (Math.hypot(dx, dy) > 8) moved.current = true;
        aim(dx, dy);
      }}
      onPointerUp={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;
        start.current = null;
        ensurePlayable();
        const power = Math.max(0, Math.min(1, -dy / 140));
        const side = Math.max(-1, Math.min(1, dx / 110));
        if (power > 0.12) {
          previewAim(side * 0.82, power, side);
          commitShot(power);
        } else if (!moved.current) {
          previewAim(0, 0.66, 0);
          commitShot(0.66);
        } else {
          world.power = 0;
          world.showAim = false;
          world.launchDraft = null;
        }
      }}
      onPointerCancel={() => {
        start.current = null;
      }}
      onClick={() => {
        if (start.current) return;
        ensurePlayable();
        previewAim(0, 0.66, 0);
        commitShot(0.66);
      }}
    >
      Тяни вверх — удар
    </div>
  );
}

function Saves() {
  const folder = useGame((s) => s.folder);
  const note = useGame((s) => s.note);
  const confirmNew = useGame((s) => s.confirmNew);
  const back = useGame((s) => s.openMenu);
  const saveInto = useGame((s) => s.saveInto);
  const loadSlot = useGame((s) => s.loadSlot);
  const clearSlot = useGame((s) => s.clearSlot);
  const exportSlot = useGame((s) => s.exportSlot);
  const importSlot = useGame((s) => s.importSlot);
  const ask = useGame((s) => s.askNewGame);
  const fresh = useGame((s) => s.newGame);

  return (
    <section className="panel wide-panel">
      <header className="row">
        <button className="btn btn-quiet" onClick={back}>
          <ArrowLeft size={16} /> Меню
        </button>
        <h2 className="display section-title">Папка сохранений</h2>
      </header>
      <p className="muted">Четыре слота в браузере. Экспорт скачивает файл, импорт возвращает его.</p>
      <ul className="slots">
        {folder.slots.map((slot, i) => (
          <li key={i} className={i === folder.active ? "slot active" : "slot"}>
            <div>
              <strong>{slot?.name ?? `Слот ${i + 1}`}</strong>
              <p className="muted">
                {slot
                  ? `${slot.career ? clubById(slot.career.clubId).name : "Без клуба"} · ур. ${slot.freekick.level} · ${new Date(slot.updatedAt).toLocaleString("ru-RU")}`
                  : "Пусто"}
              </p>
            </div>
            <div className="row wrap">
              <button className="btn btn-ghost" onClick={() => saveInto(i)}>
                <Save size={16} /> Сохранить
              </button>
              <button className="btn btn-ghost" disabled={!slot} onClick={() => loadSlot(i)}>
                Загрузить
              </button>
              <button className="btn btn-quiet" disabled={!slot} onClick={() => exportSlot(i)}>
                <Download size={16} />
              </button>
              <label className="btn btn-quiet">
                <Upload size={16} />
                <input
                  className="file"
                  type="file"
                  accept="application/json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    void file.text().then((text) => {
                      try {
                        importSlot(i, JSON.parse(text) as unknown);
                      } catch {
                        useGame.setState({ note: "Это не файл сохранения" });
                      }
                    });
                    e.target.value = "";
                  }}
                />
              </label>
              <button className="btn btn-quiet" disabled={!slot} onClick={() => clearSlot(i)}>
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {note ? <p className="muted">{note}</p> : null}
      {confirmNew ? (
        <div className="stack">
          <p>Сбросить активный слот и начать заново? Карьера и уровни в нём пропадут.</p>
          <button className="btn btn-primary" onClick={fresh}>
            Да, начать заново
          </button>
          <button className="btn btn-ghost" onClick={ask}>
            Отмена
          </button>
        </div>
      ) : (
        <button className="btn btn-ghost" onClick={ask}>
          <RotateCcw size={16} /> Новая игра в активном слоте
        </button>
      )}
    </section>
  );
}

function Clubs() {
  const back = useGame((s) => s.openMenu);
  const pick = useGame((s) => s.pickClub);
  return (
    <section className="panel wide-panel">
      <header className="row">
        <button className="btn btn-quiet" onClick={back}>
          <ArrowLeft size={16} /> Меню
        </button>
        <h2 className="display section-title">Выбор клуба</h2>
      </header>
      <p className="muted">Восемь клубов, каждый с каждым дома и в гостях. Это полный сезон.</p>
      <ul className="club-list">
        {CLUBS.map((club) => (
          <li key={club.id}>
            <button className="btn btn-ghost club" onClick={() => pick(club.id)}>
              <i className="pip" style={{ background: club.color }} />
              <span>{club.name}</span>
              <span className="muted">{club.short}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Hub() {
  const career = useGame((s) => s.career);
  const back = useGame((s) => s.openMenu);
  const kits = useGame((s) => s.openKits);
  const sim = useGame((s) => s.simulateMatch);
  const rest = useGame((s) => s.simulateRest);
  const saves = useGame((s) => s.openSaves);
  const season = useGame((s) => s.openSeason);
  const cont = useGame((s) => s.continueGame);
  if (!career) return null;
  const rows = table(career);
  const you = rows.find((r) => r.id === career.clubId);
  const fx = nextUserFixture(career);
  const opp = fx ? clubById(fx.homeId === career.clubId ? fx.awayId : fx.homeId) : null;
  const home = fx ? fx.homeId === career.clubId : false;

  return (
    <section className="panel wide-panel">
      <header className="row">
        <button className="btn btn-quiet" onClick={back}>
          <ArrowLeft size={16} /> Меню
        </button>
        <h2 className="display section-title">{clubById(career.clubId).name}</h2>
      </header>
      <p className="lede">
        Сезон {2025 + career.season}/{String(26 + career.season).slice(-2)} · {PLAYER_NAME} ·{" "}
        {you ? `${you.pos} место, ${you.pts} очк.` : "таблица пуста"} · голы со стандартов: {career.seasonFkGoals}
      </p>
      {career.pending ? (
        <div className="stack">
          <button className="btn btn-primary" onClick={cont}>
            <Play size={16} /> Продолжить матч
          </button>
          <button className="btn btn-ghost" onClick={sim}>
            Симулировать этот матч
          </button>
        </div>
      ) : fx && opp ? (
        <div className="stack">
          <p>
            Тур {fx.round}. {home ? "Дома" : "В гостях"} против {opp.name}.
          </p>
          <button className="btn btn-primary" onClick={kits}>
            На поле
          </button>
          <button className="btn btn-ghost" onClick={sim}>
            Симулировать матч
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={season}>
          Итоги сезона
        </button>
      )}
      <button className="btn btn-ghost" onClick={rest}>
        Симулировать остаток сезона
      </button>
      <Table rows={rows} you={career.clubId} />
      <button className="btn btn-quiet" onClick={saves}>
        <FolderOpen size={16} /> Сохранения
      </button>
    </section>
  );
}

function Kits() {
  const career = useGame((s) => s.career);
  const draft = useGame((s) => s.draft);
  const kitYou = useGame((s) => s.kitYou);
  const kitOpp = useGame((s) => s.kitOpp);
  const note = useGame((s) => s.note);
  const setKit = useGame((s) => s.setKit);
  const confirm = useGame((s) => s.confirmKits);
  const back = useGame((s) => s.openHub);
  if (!career || !draft) return null;
  const fx = career.fixtures.find((f) => f.id === draft.fixtureId);
  if (!fx) return null;
  const you = clubById(career.clubId);
  const opp = clubById(fx.homeId === career.clubId ? fx.awayId : fx.homeId);
  const youColor = kitColor(you, kitYou);
  const oppColor = kitColor(opp, kitOpp);
  const bad = kitsClash(youColor, oppColor) || clashNow();
  const youHome = fx.homeId === career.clubId;

  return (
    <section className="panel wide-panel">
      <header className="row">
        <button className="btn btn-quiet" onClick={back}>
          <ArrowLeft size={16} /> Назад
        </button>
        <h2 className="display section-title">Перед матчем</h2>
      </header>
      <p className="lede">
        {draft.minute}′ · {youHome ? you.short : opp.short} {draft.preHome}:{draft.preAway}{" "}
        {youHome ? opp.short : you.short}. Штрафной {PLAYER_NAME.split(" ")[1]}. Если мяч пересечёт линию целиком — это гол.
      </p>
      <KitPick
        label={you.name}
        clubColor={you.color}
        away={you.away}
        side={kitYou}
        onPick={(side) => setKit("you", side)}
      />
      <KitPick
        label={opp.name}
        clubColor={opp.color}
        away={opp.away}
        side={kitOpp}
        onPick={(side) => setKit("opp", side)}
      />
      {bad ? <p>Формы совпадают. Возьми инверсию себе или сопернику.</p> : <p className="muted">Цвета различаются, можно выходить.</p>}
      {note ? <p className="muted">{note}</p> : null}
      <button className="btn btn-primary" disabled={bad} onClick={confirm}>
        Пробить
      </button>
    </section>
  );
}

function KitPick({
  label,
  clubColor,
  away,
  side,
  onPick,
}: {
  label: string;
  clubColor: string;
  away: string;
  side: KitSide;
  onPick: (side: KitSide) => void;
}) {
  return (
    <div className="kit-block">
      <p>{label}</p>
      <div className="row">
        <button className={side === "home" ? "btn btn-primary" : "btn btn-ghost"} onClick={() => onPick("home")}>
          <i className="pip" style={{ background: clubColor }} /> Основная
        </button>
        <button className={side === "away" ? "btn btn-primary" : "btn btn-ghost"} onClick={() => onPick("away")}>
          <i className="pip" style={{ background: away }} /> Инверсия
        </button>
      </div>
    </div>
  );
}

function Season() {
  const career = useGame((s) => s.career);
  const note = useGame((s) => s.note);
  const ask = useGame((s) => s.requestTransfer);
  const stay = useGame((s) => s.stayOn);
  const hub = useGame((s) => s.openHub);
  if (!career) return null;
  const rows = table(career);
  const you = rows.find((r) => r.id === career.clubId);
  const champ = rows[0];
  const done = nextUserFixture(career) === null;

  return (
    <section className="panel wide-panel">
      <header className="row">
        <button className="btn btn-quiet" onClick={hub}>
          <ArrowLeft size={16} /> Хаб
        </button>
        <h2 className="display section-title">{done ? "Конец сезона" : "Сезон"}</h2>
      </header>
      {done && champ && you ? (
        <p className="lede">
          Чемпион: {clubById(champ.id).name}. Вы {you.pos}-е, {career.seasonFkGoals} гол. со стандартов. Репутация {Math.round(career.reputation)}.
        </p>
      ) : (
        <p className="muted">Сезон ещё идёт.</p>
      )}
      <Table rows={rows} you={career.clubId} />
      {career.history.length ? (
        <ul className="history">
          {career.history.map((h) => (
            <li key={`${h.season}-${h.clubId}`}>
              Сезон {h.season}: {clubById(h.clubId).short}, {h.position} место, {h.goals} гол.
            </li>
          ))}
        </ul>
      ) : null}
      {done ? (
        <div className="stack">
          <h3>Трансфер</h3>
          <ul className="club-list">
            {CLUBS.filter((c) => c.id !== career.clubId).map((club) => {
              const ok = canJoin(club, career);
              return (
                <li key={club.id}>
                  <button className="btn btn-ghost club" disabled={!ok} onClick={() => ask(club.id)}>
                    <i className="pip" style={{ background: club.color }} />
                    <span>{club.name}</span>
                    <span className="muted">{ok ? "согласны" : "отказ"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="btn btn-primary" onClick={stay}>
            Остаться и начать новый сезон
          </button>
        </div>
      ) : null}
      {note ? <p className="muted">{note}</p> : null}
    </section>
  );
}

function Table({ rows, you }: { rows: ReturnType<typeof table>; you: string }) {
  return (
    <div className="table-wrap">
      <div className="table-head">
        <span>#</span>
        <span>Клуб</span>
        <span>И</span>
        <span>Р</span>
        <span>О</span>
      </div>
      {rows.map((r) => (
        <div key={r.id} className={r.id === you ? "table-row you" : "table-row"}>
          <span>{r.pos}</span>
          <span>
            <i className="pip" style={{ background: clubById(r.id).color }} /> {clubById(r.id).short}
          </span>
          <span>{r.p}</span>
          <span>{r.gd > 0 ? `+${r.gd}` : r.gd}</span>
          <span>{r.pts}</span>
        </div>
      ))}
    </div>
  );
}

function MatchHud() {
  const mode = useGame((s) => s.mode);
  const level = useGame((s) => s.level);
  const goals = useGame((s) => s.fkGoals);
  const score = useGame((s) => s.fkScore);
  const live = useGame((s) => s.live);
  const result = useGame((s) => s.result);
  const paused = useGame((s) => s.paused);
  const settings = useGame((s) => s.settings);
  const pause = useGame((s) => s.togglePause);
  const resume = useGame((s) => s.resume);
  const restart = useGame((s) => s.restartKick);
  const menu = useGame((s) => s.leaveToMenu);
  const primary = useGame((s) => s.resolvePrimary);
  const sound = useGame((s) => s.toggleSound);
  const shake = useGame((s) => s.toggleShake);
  const bar = useRef<HTMLSpanElement>(null);
  const spin = useRef<HTMLParagraphElement>(null);
  const timer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ensurePlayable();
    let frame = 0;
    const loop = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${world.power})`;
      if (spin.current) {
        const s = world.spin;
        spin.current.textContent =
          Math.abs(s) < 0.12 ? "Прямой" : s > 0 ? "Закрутка вправо" : "Закрутка влево";
      }
      if (timer.current) {
        timer.current.textContent = world.timeLeft == null ? "" : world.timeLeft.toFixed(1);
        timer.current.dataset.hot = world.timeLeft != null && world.timeLeft < 2 ? "1" : "0";
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const minute =
    live == null
      ? ""
      : live.ft
        ? `90+${live.added}`
        : `${live.minute}′`;

  return (
    <>
      <header className="hud-top">
        {live ? (
          <div className="scorebug">
            <span>
              <i className="pip" style={{ background: live.homeColor }} /> {live.homeShort}
            </span>
            <strong>
              {live.homeGoals}:{live.awayGoals}
            </strong>
            <span>
              {live.awayShort} <i className="pip" style={{ background: live.awayColor }} />
            </span>
            <em>{minute}</em>
          </div>
        ) : (
          <div className="scorebug">
            <span>{mode === "training" ? "Тренировка" : `Уровень ${level}/100`}</span>
            <strong>{goals}</strong>
            <span>{score}</span>
          </div>
        )}
        <span ref={timer} className="timer" />
        {!result ? (
          <button className="btn btn-ghost hud-hit icon-btn" onClick={pause} aria-label="Пауза">
            <Pause size={18} />
          </button>
        ) : (
          <span />
        )}
      </header>

      {!result && !paused ? (
        <footer className="hud-bottom">
          <p className="hint">По полю: свайп вверх — сила, в сторону — закрутка.</p>
          <SwipeLane />
          <div className="meter">
            <span ref={bar} />
          </div>
          <p ref={spin} className="hint">
            Прямой
          </p>
        </footer>
      ) : null}

      {paused && !result ? (
        <div className="scrim">
          <section className="panel modal">
            <h2 className="display section-title">Пауза</h2>
            <div className="stack">
              <button className="btn btn-primary" onClick={resume}>
                <Play size={16} /> Продолжить
              </button>
              <button className="btn btn-ghost" onClick={restart}>
                <RotateCcw size={16} /> Начать удар заново
              </button>
              <button className="btn btn-ghost" onClick={menu}>
                В главное меню
              </button>
              <button className="btn btn-quiet" onClick={sound}>
                Звук: {settings.sound ? "вкл" : "выкл"}
              </button>
              <button className="btn btn-quiet" onClick={shake}>
                Тряска: {settings.shake ? "вкл" : "выкл"}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {result ? (
        <div className="scrim">
          <section className="panel modal">
            <h2 className="display goal-title">{result.title}</h2>
            {result.score ? <p className="score-line">{result.score}</p> : null}
            <p className="lede">{result.detail}</p>
            <div className="stack">
              <button className="btn btn-primary" onClick={primary}>
                {result.primary}
              </button>
              <button className="btn btn-ghost" onClick={menu}>
                В главное меню
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
