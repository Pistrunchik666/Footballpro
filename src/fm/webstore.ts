/** Сохранения только в Web Storage этого браузера. На сервер ничего не уходит. */

const DEVICE = "kabinet-device";

export function openWebStorage(): Storage | null {
  try {
    const store = globalThis.localStorage;
    if (!store) return null;
    const probe = "kabinet-probe";
    store.setItem(probe, "1");
    store.removeItem(probe);
    return store;
  } catch {
    return null;
  }
}

export function deviceId(): string {
  const store = openWebStorage();
  if (!store) return "guest";
  const existing = store.getItem(DEVICE);
  if (existing && /^[a-z0-9]{8}$/.test(existing)) return existing;
  const raw = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
  const id = raw.replace(/-/g, "").toLowerCase().slice(0, 8).padEnd(8, "0");
  store.setItem(DEVICE, id);
  return id;
}

export function cabinetCode(): string {
  return deviceId().slice(0, 4).toUpperCase();
}

export function folderKey(): string {
  return `kabinet-folder-v2:${deviceId()}`;
}

export function readRaw(key: string): string | null {
  try {
    return openWebStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: string): boolean {
  const store = openWebStorage();
  if (!store) return false;
  try {
    store.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeRaw(key: string) {
  try {
    openWebStorage()?.removeItem(key);
  } catch {
    /* квота или запрет */
  }
}
