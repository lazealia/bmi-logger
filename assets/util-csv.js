export function downloadCSV(rows) {
  const header = ['date','weight','height','bmi','note'];
  const lines = [header.join(',')].concat(
    rows.map(r => [r.date, r.weight, r.height, r.bmi, escapeCSV(r.note || '')].join(','))
  );
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bmi-entries.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escapeCSV(s) {
  if (s == null) return '';
  const needQuote = /[",\n]/.test(s);
  const t = String(s).replace(/"/g, '""');
  return needQuote ? `"${t}"` : t;
}
