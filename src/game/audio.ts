let ctx: AudioContext | null = null;
let crowd: GainNode | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (crowd) crowd.gain.value = on ? 0.03 : 0;
}

export function unlockAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctx();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    crowd = ctx.createGain();
    crowd.gain.value = enabled ? 0.028 : 0;
    src.connect(filter);
    filter.connect(crowd);
    crowd.connect(ctx.destination);
    src.start();
  }
  if (ctx.state === "suspended") void ctx.resume();
}

function env(freq: number, dur: number, type: OscillatorType, gain: number, toFreq?: number) {
  if (!ctx || !enabled) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (toFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(40, toFreq), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function noise(dur: number, gain: number, freq: number) {
  if (!ctx || !enabled) return;
  const t = ctx.currentTime;
  const length = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);
  src.start(t);
}

export function whistle() {
  env(1800, 0.18, "sine", 0.05, 1400);
  env(1760, 0.22, "triangle", 0.03, 1500);
}

export function kickSound() {
  env(160, 0.14, "sine", 0.28, 55);
  noise(0.08, 0.18, 240);
}

export function postSound() {
  env(540, 0.12, "triangle", 0.12, 220);
  noise(0.06, 0.08, 900);
}

export function saveSound() {
  noise(0.1, 0.16, 500);
  env(120, 0.12, "sine", 0.16, 60);
}

export function goalSound() {
  env(220, 0.3, "sine", 0.12, 90);
  noise(0.25, 0.1, 300);
  if (crowd && enabled) {
    crowd.gain.cancelScheduledValues(ctx!.currentTime);
    crowd.gain.setValueAtTime(0.11, ctx!.currentTime);
    crowd.gain.linearRampToValueAtTime(0.03, ctx!.currentTime + 2.4);
  }
}

export function missSound() {
  env(180, 0.2, "sine", 0.05, 90);
}
