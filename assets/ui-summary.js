import { getEntries } from './storage.js';

let chart;

function stats(list) {
  if (!list.length) return { avg: '-', min: '-', max: '-' };
  const vals = list.map(x => x.bmi);
  const sum = vals.reduce((a,b) => a+b, 0);
  const avg = Math.round((sum / vals.length) * 100) / 100;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  return { avg, min, max };
}

function filterByRange(list, range) {
  if (range === 'all') return list;
  const days = parseInt(range);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return list.filter(x => new Date(x.date) >= cutoff);
}

export function refreshSummary() {
  const range = document.getElementById('range').value;
  const list = filterByRange(getEntries().sort((a,b) => a.date.localeCompare(b.date)), range);
  const s = stats(list);
  document.getElementById('avg-bmi').textContent = s.avg;
  document.getElementById('min-bmi').textContent = s.min;
  document.getElementById('max-bmi').textContent = s.max;
  const ctx = document.getElementById('bmi-chart');
  const labels = list.map(x => x.date);
  const data = list.map(x => x.bmi);
  const config = {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'BMI', data, borderColor: '#38bdf8', backgroundColor: '#0ea5e9' }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: false } }
    }
  };
  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    chart = new Chart(ctx, config);
  }
}

export function initSummary() {
  document.getElementById('range').addEventListener('change', refreshSummary);
  refreshSummary();
}
