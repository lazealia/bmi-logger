const ENTRIES_KEY = 'bmi-entries';
const SETTINGS_KEY = 'settings';

export function getEntries() {
  const raw = localStorage.getItem(ENTRIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setEntries(entries) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function addEntry(entry) {
  const list = getEntries();
  const id = crypto.randomUUID();
  const next = { id, ...entry };
  list.push(next);
  setEntries(list);
  return next;
}

export function updateEntry(id, patch) {
  const list = getEntries();
  const next = list.map(e => e.id === id ? { ...e, ...patch } : e);
  setEntries(next);
}

export function deleteEntry(id) {
  const list = getEntries().filter(e => e.id !== id);
  setEntries(list);
}

export function getSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : { unit: 'metric', theme: 'dark' };
}

export function setSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
