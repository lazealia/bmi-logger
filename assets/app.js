import { getSettings, setSettings } from './storage.js';
import { initCalc } from './ui-calc.js';
import { initLogs } from './ui-logs.js';
import { initSummary } from './ui-summary.js';
import { initSettings } from './ui-settings.js';

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.style.setProperty('--bg', '#f1f5f9');
    document.documentElement.style.setProperty('--fg', '#0f172a');
    document.documentElement.style.setProperty('--card', '#ffffff');
    document.documentElement.style.setProperty('--muted', '#334155');
    document.documentElement.style.setProperty('--accent', '#0284c7');
    document.documentElement.style.setProperty('--input-bg', '#ffffff');
    document.documentElement.style.setProperty('--input-border', '#cbd5e1');
    document.documentElement.style.setProperty('--button-bg', '#0284c7');
    document.documentElement.style.setProperty('--button-fg', '#ffffff');
    document.documentElement.style.setProperty('--header-bg', '#ffffff');
    document.documentElement.style.setProperty('--nav-active-bg', '#e2e8f0');
    document.documentElement.style.setProperty('--panel-bg', '#f8fafc');
    document.documentElement.style.setProperty('--panel-border', '#e2e8f0');
    document.documentElement.style.setProperty('--table-border', '#e2e8f0');
  } else {
    document.documentElement.style.removeProperty('--bg');
    document.documentElement.style.removeProperty('--fg');
    document.documentElement.style.removeProperty('--card');
    document.documentElement.style.removeProperty('--muted');
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--input-bg');
    document.documentElement.style.removeProperty('--input-border');
    document.documentElement.style.removeProperty('--button-bg');
    document.documentElement.style.removeProperty('--button-fg');
    document.documentElement.style.removeProperty('--header-bg');
    document.documentElement.style.removeProperty('--nav-active-bg');
    document.documentElement.style.removeProperty('--panel-bg');
    document.documentElement.style.removeProperty('--panel-border');
    document.documentElement.style.removeProperty('--table-border');
  }
}

function route() {
  const hash = location.hash || '#calculate';
  document.querySelectorAll('[data-route]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === hash);
  });
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const id = {
    '#calculate': 'view-calculate',
    '#logs': 'view-logs',
    '#summary': 'view-summary',
    '#settings': 'view-settings',
  }[hash] || 'view-calculate';
  document.getElementById(id).classList.remove('hidden');
}

function init() {
  const settings = getSettings();
  applyTheme(settings.theme);
  initCalc();
  initLogs();
  initSummary();
  initSettings(applyTheme);
  route();
  window.addEventListener('hashchange', route);
}

init();
