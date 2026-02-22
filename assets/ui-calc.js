import { getSettings } from './storage.js';
import { toMetric, calcBMI, category, round } from './bmi.js';
import { addEntry } from './storage.js';
import { refreshLogs } from './ui-logs.js';
import { refreshSummary } from './ui-summary.js';

let lastComputed = null;

export function initCalc() {
  const form = document.getElementById('calc-form');
  const weight = document.getElementById('weight');
  const height = document.getElementById('height');
  const btnSave = document.getElementById('btn-save');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const s = getSettings();
    const m = toMetric({ weight: parseFloat(weight.value), height: parseFloat(height.value) }, s.unit);
    const bmi = calcBMI(m.kg, m.m);
    lastComputed = { bmi, weight: parseFloat(weight.value), height: parseFloat(height.value) };
    const r = isNaN(bmi) ? '-' : String(round(bmi));
    bmiValue.textContent = r;
    bmiCategory.textContent = category(bmi);
    btnSave.disabled = isNaN(bmi);
  });

  btnSave.addEventListener('click', () => {
    if (!lastComputed || isNaN(lastComputed.bmi)) return;
    const date = new Date().toISOString().slice(0,10);
    addEntry({
      date,
      weight: lastComputed.weight,
      height: lastComputed.height,
      bmi: round(lastComputed.bmi),
      note: ''
    });
    btnSave.disabled = true;
    refreshLogs();
    refreshSummary();
    location.hash = '#logs';
  });
}
