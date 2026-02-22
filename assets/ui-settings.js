import { getSettings, setSettings } from './storage.js';
import { refreshLogs } from './ui-logs.js';
import { refreshSummary } from './ui-summary.js';

export function initSettings(applyTheme) {
  const form = document.getElementById('settings-form');
  const s = getSettings();
  form.unit.value = s.unit;
  form.theme.value = s.theme;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const next = { unit: form.unit.value, theme: form.theme.value };
    setSettings(next);
    applyTheme(next.theme);
    refreshLogs();
    refreshSummary();
  });
}
