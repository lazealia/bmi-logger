import { getEntries, deleteEntry, updateEntry, addEntry, getSettings } from './storage.js';
import { toMetric, calcBMI, round } from './bmi.js';
import { downloadCSV } from './util-csv.js';

function rowHTML(e) {
  return `<tr data-id="${e.id}">
    <td><input type="date" value="${e.date}"></td>
    <td><input type="number" step="0.1" value="${e.weight}"></td>
    <td><input type="number" step="0.1" value="${e.height}"></td>
    <td>${e.bmi}</td>
    <td><input type="text" maxlength="200" value="${e.note || ''}"></td>
    <td class="actions">
      <button data-action="save">บันทึก</button>
      <button data-action="delete">ลบ</button>
    </td>
  </tr>`;
}

export function refreshLogs() {
  const tbody = document.querySelector('#logs-table tbody');
  const list = getEntries().sort((a,b) => a.date.localeCompare(b.date));
  tbody.innerHTML = list.map(rowHTML).join('');
}

export function initLogs() {
  refreshLogs();
  const tbody = document.querySelector('#logs-table tbody');
  tbody.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const tr = btn.closest('tr');
    const id = tr.getAttribute('data-id');
    if (btn.getAttribute('data-action') === 'delete') {
      deleteEntry(id);
      refreshLogs();
      return;
    }
    if (btn.getAttribute('data-action') === 'save') {
      const inputs = tr.querySelectorAll('input');
      const date = inputs[0].value;
      const weight = parseFloat(inputs[1].value);
      const height = parseFloat(inputs[2].value);
      const note = inputs[4].value;
      const s = getSettings();
      const m = toMetric({ weight, height }, s.unit);
      const bmi = round(calcBMI(m.kg, m.m));
      updateEntry(id, { date, weight, height, bmi, note });
      refreshLogs();
    }
  });

  const addForm = document.getElementById('add-form');
  addForm.addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('add-date').value;
    const weight = parseFloat(document.getElementById('add-weight').value);
    const height = parseFloat(document.getElementById('add-height').value);
    const note = document.getElementById('add-note').value;
    const s = getSettings();
    const m = toMetric({ weight, height }, s.unit);
    const bmi = round(calcBMI(m.kg, m.m));
    addEntry({ date, weight, height, bmi, note });
    addForm.reset();
    refreshLogs();
  });

  document.getElementById('btn-export').addEventListener('click', () => {
    const list = getEntries();
    downloadCSV(list);
  });
}
